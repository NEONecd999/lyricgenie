/* Lyric Genie docs — search, navigation, theme. No framework, no build step. */

(() => {
  'use strict';

  /* ───────────────────────── theme toggle ───────────────────────── */
  // The initial value is set by an inline script in <head> so there is no
  // flash; this only handles the user flipping it afterwards.
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('lg-docs-theme', next); } catch (e) { /* private mode */ }
    });
  }

  /* ──────────────────── land at the top of a new page ────────────────────

     Every link here is a real page load, and a browser is free to restore the
     previous scroll position on one. That makes the pager at the foot of a
     page feel broken: you tap Next and arrive at the foot of the next page
     rather than its start. Turning restoration off and scrolling up on load
     fixes it. A link with a #hash still lands on its heading. */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  {
    /* `html` has scroll-behavior: smooth so in-page anchors glide, and that
       applies to this jump too, which reads as the new page scrolling itself
       up while you watch. Ask for an instant jump explicitly. */
    const toTop = () => {
      if (window.location.hash) return;
      try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }
      catch (e) { window.scrollTo(0, 0); }
    };
    toTop();
    window.addEventListener('pageshow', toTop);
  }

  /* ───────────── keep the left nav where you left it ─────────────

     The nav is its own scroll container, and every click on it is a real page
     load, so by default the new page draws it back at the top. Click an editor
     page from the bottom of the list and the list jumps away from where you
     were reading.

     The hard part is not storing the number, it is knowing which scrolls are
     yours. The browser scrolls this list itself: clicking a link brings that
     link into view, and a fresh page brings the current entry into view. Those
     arrive as ordinary scroll events, and recording one means the next page
     restores a position you never chose — which is what made the first attempt
     at this land in the wrong place every time.

     So there is a live window. A wheel, a key, a touch or a drag of the
     scrollbar opens it, and scrolling keeps it open; it closes a fifth of a
     second after the movement stops. Only a scroll inside that window is
     written down. A pointer going down on a link closes it immediately, which
     is the moment you are leaving and the position should freeze.

     Restoring has to beat the first paint or it reads as a jump. `pagereveal`
     is that moment for a cross-document view transition, and the position is
     re-applied for a few frames after so the browser's own adjustment does not
     win it back. Touching the list ends that window at once.

     Saving is also guarded on the nav being scrollable, so the mobile overlay,
     which is display:none while closed and reports a scrollTop of 0, cannot
     overwrite a real desktop position with zero. */
  {
    const KEY = 'lg-docs-nav-scroll';
    const LIVE_MS = 200;
    const SETTLE_MS = 400;
    const nav = document.getElementById('sidebar');

    if (nav) {
      let liveUntil = 0;
      let dragging = false;
      let settling = false;

      const isLive = () => dragging || performance.now() <= liveUntil;
      const ping = () => { liveUntil = performance.now() + LIVE_MS; settling = false; };

      const save = () => {
        if (nav.scrollHeight <= nav.clientHeight) return;
        try { sessionStorage.setItem(KEY, String(nav.scrollTop)); } catch (e) { /* private mode */ }
      };

      const restore = () => {
        let stored;
        try { stored = sessionStorage.getItem(KEY); } catch (e) { return; }
        const top = Number(stored);
        if (Number.isFinite(top) && top > 0) nav.scrollTop = top;
      };

      const settle = () => {
        settling = true;
        const until = performance.now() + SETTLE_MS;
        const again = () => {
          if (!settling) return;
          restore();
          if (performance.now() < until) requestAnimationFrame(again);
          else settling = false;
        };
        requestAnimationFrame(again);
      };

      restore();
      settle();
      window.addEventListener('pagereveal', () => { restore(); settle(); });
      window.addEventListener('pageshow', () => { restore(); settle(); });

      nav.addEventListener('wheel', ping, { passive: true });
      nav.addEventListener('keydown', ping, { passive: true });
      nav.addEventListener('touchstart', () => { dragging = true; settling = false; }, { passive: true });
      nav.addEventListener('pointerdown', (e) => {
        /* On a link this is the click that navigates. Freeze here. */
        if (e.target.closest('a')) { liveUntil = 0; dragging = false; return; }
        dragging = true;
        settling = false;
      }, { passive: true });
      for (const evt of ['pointerup', 'pointercancel', 'touchend', 'touchcancel']) {
        window.addEventListener(evt, () => { dragging = false; ping(); }, { passive: true });
      }

      let queued = false;
      nav.addEventListener('scroll', () => {
        if (!isLive() || queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          if (!isLive()) return;
          save();
          ping();  /* momentum and wheel inertia keep the window open */
        });
      }, { passive: true });
    }
  }

  /* ─────────────────── chrome that gets out of the way ───────────────────

     Scrolling down collapses the search row, scrolling up brings it back.
     Phones do this because a search field you are not using is screen you
     could be reading with.

     The trap here, and it bit: the bar is in the flow, so collapsing it makes
     the page about eighteen pixels shorter and the browser shifts scrollY to
     match. That shift arrives as a scroll event in the opposite direction,
     which expands the bar, which lengthens the page, which shifts scrollY
     back. Measured at 374 flips in two and a half seconds off a single nudge
     of the wheel.

     So a toggle opens a settling window. Scroll events inside it only move the
     baseline and never change the state, which throws away the movement the
     bar caused itself. The window outlasts the CSS transition, because scrollY
     keeps drifting for as long as the bar is animating.

     Three older guards remain: nothing happens in the first stretch of the
     page, a movement under the deadzone is ignored so a shaky thumb does not
     flip it, and it never collapses while the menu is open. */
  (() => {
    const root = document.documentElement;
    const REVEAL_ABOVE = 120;   // px from the top where the bar is always full
    const DEADZONE = 24;        // px of movement before a direction counts
    const SETTLE_MS = 400;      // longer than the bar takes to resize
    let last = window.scrollY;
    let ticking = false;
    let settleUntil = 0;

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      if (performance.now() < settleUntil) { last = y; return; }

      const moved = y - last;
      if (Math.abs(moved) < DEADZONE) return;
      last = y;
      if (document.getElementById('sidebar')?.classList.contains('open')) return;
      // Nor while search results are up. Collapsing the bar takes the field
      // and the panel with it, so a scroll made the answers vanish mid-read.
      if (document.getElementById('search-results')?.hidden === false) return;

      const compact = moved > 0 && y > REVEAL_ABOVE;
      if (compact === root.classList.contains('chrome-compact')) return;
      root.classList.toggle('chrome-compact', compact);
      settleUntil = performance.now() + SETTLE_MS;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  })();

  /* ──────────────────── the bar's real height ────────────────────

     `--topbar-h` is what the mobile menu, the sticky sidebar, the table of
     contents and scroll-padding all measure down from. It was two guesses,
     7.5rem expanded and 3.25rem collapsed, against a bar whose height is
     `auto`. Both were a few pixels out, so the menu hung 8px below the bar
     expanded and 7px below it collapsed.

     Measuring the bar removes the guess, and because a ResizeObserver fires
     throughout the collapse animation the menu stays welded to the bar's
     bottom edge while it moves rather than jumping at the end. The CSS values
     stay as the fallback if this never runs. */
  {
    const bar = document.querySelector('.topbar');
    if (bar && 'ResizeObserver' in window) {
      const sync = () => {
        const h = bar.getBoundingClientRect().height;
        if (h > 0) document.documentElement.style.setProperty('--topbar-h', `${h}px`);
      };
      new ResizeObserver(sync).observe(bar);
      sync();
    }
  }

  /* ───────────────────────── mobile sidebar ───────────────────────── */
  const navBtn = document.querySelector('.nav-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.querySelector('.sidebar-close');
  if (closeBtn && sidebar && navBtn) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      navBtn.setAttribute('aria-expanded', 'false');
      navBtn.focus();
    });
  }
  if (navBtn && sidebar) {
    navBtn.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ───────────────────────── table of contents ─────────────────────────

     A section stays highlighted until the reader reaches the NEXT one. The
     obvious IntersectionObserver version does not do that: it only knows
     whether a heading element is on screen, so the highlight drops away as
     soon as you scroll past the heading itself and the middle of every long
     section is left with nothing selected.

     So this reads position directly. The active heading is the last one whose
     top has crossed the line just under the top bar, which is the same thing
     as "the section I am currently reading".
     ───────────────────────────────────────────────────────────────────── */

  const tocLinks = [...document.querySelectorAll('.toc a')];
  if (tocLinks.length) {
    const targets = tocLinks
      .map((link) => ({ link, el: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
      .filter((t) => t.el);

    let active = null;
    const setActive = (link) => {
      // Checking the DOM as well as the cached value, so that if the class is
      // ever cleared by something else the highlight comes back on the next
      // scroll instead of staying gone for the rest of the session.
      if (link === active && (!link || link.classList.contains('active'))) return;
      if (active) active.classList.remove('active');
      if (link) link.classList.add('active');
      active = link;
    };

    /* Clicking an entry pins it. Without this, jumping to a section near the
       foot of the page scrolls as far as the page can go, which is not far
       enough to put that heading under the reading line, and the highlight
       lands on whatever section the scroll position implies instead of the one
       that was asked for. The pin is released the moment the reader scrolls
       under their own steam, so ambient tracking resumes straight away.

       Only real input clears it. Listening for `scroll` would not work: the
       jump itself fires scroll events. */
    let pinned = null;

    const update = () => {
      if (pinned) { setActive(pinned); return; }

      const chrome = document.querySelector('.topbar')?.offsetHeight || 0;

      // The reading line sits just below the sticky top bar, so a heading
      // counts as reached once it has settled into view rather than while it
      // is still sliding under the chrome.
      let line = window.scrollY + chrome + 24;

      // At the very bottom the remaining sections are all on screen at once and
      // no further scrolling can pull them up to that line, so a short trailing
      // section could never be selected at all. There the line drops to the
      // foot of the viewport: the last heading you can see is the one you are
      // on. A pinned click still wins over this, which is the case that made
      // the old version pick the wrong entry.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) line = Math.max(line, window.scrollY + window.innerHeight);

      let current = targets[0];
      for (let i = 0; i < targets.length; i++) {
        if (tops[i] <= line) current = targets[i]; else break;
      }
      // Above the first heading, nothing is being read yet.
      setActive(window.scrollY < tops[0] - 200 ? null : current.link);
    };

    // Heading offsets are cached so the scroll handler is pure arithmetic and
    // can run on every event. The obvious alternative, throttling with
    // requestAnimationFrame, has a trap: if a frame never arrives (a
    // background tab, a hidden pane) the "already scheduled" flag is never
    // cleared and the highlight stops updating for the rest of the session.
    let tops = [];
    const measure = () => { tops = targets.map((t) => t.el.offsetTop); update(); };

    const onScroll = () => update();

    for (const t of targets) {
      t.link.addEventListener('click', () => { pinned = t.link; setActive(t.link); });
    }
    for (const evt of ['wheel', 'touchmove', 'keydown']) {
      window.addEventListener(evt, () => {
        if (!pinned) return;
        pinned = null;
        update();
      }, { passive: true });
    }

    // Arriving on a deep link should light that section up too.
    if (location.hash) {
      const landed = targets.find((t) => t.link.hash === location.hash);
      if (landed) pinned = landed.link;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    // Web fonts change every heading's position when they swap in, so measure
    // again once they have landed rather than trusting the first pass.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  }

  /* ───────────────────── prefetch on intent ─────────────────────

     A view transition can only be smooth if the next document is already in
     hand. Hovering a link (or touching it) is a reliable half-second of
     warning, so the page is fetched then and the click has nothing left to
     wait for. Each URL is fetched at most once.
     ───────────────────────────────────────────────────────────── */

  const prefetched = new Set();
  const prefetch = (url) => {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };

  const sameOrigin = (a) => {
    try { return new URL(a.href, location.href).origin === location.origin; }
    catch (e) { return false; }
  };

  for (const evt of ['mouseover', 'touchstart', 'focusin']) {
    document.addEventListener(evt, (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || !sameOrigin(a)) return;
      const url = new URL(a.href, location.href);
      if (url.pathname === location.pathname) return;   // same page, just an anchor
      prefetch(url.href);
    }, { passive: true, capture: true });
  }

  /* ───────────────────────── search ───────────────────────── */

  const input = document.getElementById('search-input');
  const panel = document.getElementById('search-results');
  if (!input || !panel) return;

  let index = null;
  let loading = null;
  let results = [];
  let cursor = -1;

  /* The index stores site-absolute urls like /tabs/songs/. That is right for a
     site served at a domain root and wrong everywhere else: in a /docs/
     subfolder build, and inside a Claude artifact, the site sits under a path
     prefix and those urls land outside it. The pages themselves are rewritten
     at build or staging time, but the index is data and was not, so search
     found the page and then navigated to a 404. */
  const BASE = (window.LG_DOCS_BASE || '/').replace(/\/$/, '');
  const resolve = (u) => (u && u.startsWith('/') ? BASE + u : u);

  const loadIndex = () => {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch(BASE + '/search-index.json')
        .then((r) => r.json())
        .then((data) => { index = data; return index; })
        .catch(() => { index = []; return index; });
    }
    return loading;
  };

  // Load on first focus rather than on page load — the index is only needed
  // if somebody actually searches.
  input.addEventListener('focus', loadIndex, { once: true });

  const escHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /**
   * Scoring is deliberately crude: every query word must appear somewhere,
   * and matches in the title count for far more than matches in the body.
   * For a few dozen pages that beats shipping a search library.
   */
  const score = (entry, words) => {
    const title = entry.title.toLowerCase();
    const section = (entry.section || '').toLowerCase();
    const text = entry.text.toLowerCase();
    let total = 0;
    for (const w of words) {
      if (title.startsWith(w)) total += 12;
      else if (title.includes(w)) total += 8;
      else if (section.includes(w)) total += 3;
      else if (text.includes(w)) total += 1;
      else return 0;              // every word has to land somewhere
    }
    return total;
  };

  const highlight = (title, words) => {
    let out = escHtml(title);
    for (const w of words) {
      if (!w) continue;
      const re = new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      out = out.replace(re, '<mark>$1</mark>');
    }
    return out;
  };

  const render = () => {
    if (!results.length) {
      panel.innerHTML = '<p class="search-empty">No matches.</p>';
      panel.hidden = false;
      return;
    }
    const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    panel.innerHTML = results.map((r, i) =>
      `<a href="${resolve(r.url)}" class="${i === cursor ? 'sel' : ''}">
         <span class="sr-title">${highlight(r.title, words)}</span>
         <span class="sr-section">${escHtml(r.section || '')}</span>
       </a>`).join('');
    panel.hidden = false;
  };

  const run = async () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { panel.hidden = true; results = []; return; }
    const data = await loadIndex();
    const words = q.split(/\s+/).filter(Boolean);
    results = data
      .map((e) => ({ e, s: score(e, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.e);
    cursor = -1;
    render();
  };

  let timer;
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 100); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { panel.hidden = true; input.blur(); return; }
    if (!results.length || panel.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); cursor = (cursor + 1) % results.length; render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cursor = (cursor - 1 + results.length) % results.length; render(); }
    else if (e.key === 'Enter' && cursor >= 0) { e.preventDefault(); window.location.href = resolve(results[cursor].url); }
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== input) panel.hidden = true;
  });

  // "/" focuses search, the convention on every docs site worth using.
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
})();
