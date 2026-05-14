// ─── Engine setup ───
    const INDEX = window.RhymeEngine.buildIndex(window.DICTIONARY);

    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');
    const resultsEl = document.getElementById('results');
    const anchorStripEl = document.getElementById('anchorStrip');
    const headlineStatusEl = document.getElementById('headlineStatus');
    const slantToggle = document.getElementById('slantMode');
    const smartSortBtn = document.getElementById('smartSortBtn');
    const smartSortModal = document.getElementById('smartSortModal');
    const modalCloseBtn = document.getElementById('modalClose');
    const themeToggleBtn = document.getElementById('themeToggle');

    // ─── Theme toggle ────────────────────────────────────────────
    // The inline <head> script applied any saved override to <html>
    // before CSS resolved (no flash). Here we just wire the click:
    // flip the EFFECTIVE current theme and persist the choice. The
    // theme-color meta tags below are also updated so the iOS Safari
    // address bar matches the new theme.
    function getEffectiveTheme() {
      const t = document.documentElement.getAttribute('data-theme');
      if (t === 'light' || t === 'dark') return t;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    function applyTheme(t) {
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('lg-theme', t); } catch (_) { /* ignore */ }
      // Update the address-bar tint on iOS Safari to match the theme.
      const themeColor = t === 'dark' ? '#1A1322' : '#F4EFD8';
      document.querySelectorAll('meta[name="theme-color"]').forEach(m => {
        // Strip the media attribute so our explicit value wins
        // regardless of OS preference.
        m.removeAttribute('media');
        m.setAttribute('content', themeColor);
      });
    }
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        applyTheme(getEffectiveTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    let activeColumnId = null;     // which pill is active on mobile (null = first by default)
    let lastQuery = '';            // most recent query string actually searched
    let lastResult = null;         // most recent successful result (used by override re-search)
    let anchorOverride = null;     // { aSyllIdx } or null — user-promoted A-anchor (syllable index from start; B is always line-ending)
    let searchDebounceTimer = null;

    // ─── Browser history (back/forward to cycle through queries) ─
    // We push a fresh history entry only after the user has "settled"
    // on a query (~600ms with no new typing). Each entry encodes the
    // query as ?q=… in the URL. Back/forward then re-runs the search
    // for the URL's query without pushing a new entry — the
    // suppressHistoryPush flag guards against the recursive push that
    // would otherwise fire from runSearch().
    let historyPushTimer = null;
    let lastPushedQuery = (() => {
      try { return (new URLSearchParams(location.search).get('q') || '').trim(); }
      catch (_) { return ''; }
    })();
    let suppressHistoryPush = false;
    function scheduleHistoryPush(q) {
      if (suppressHistoryPush) return;
      clearTimeout(historyPushTimer);
      historyPushTimer = setTimeout(() => {
        if (q === lastPushedQuery) return;
        const url = q
          ? `${location.pathname}?q=${encodeURIComponent(q)}`
          : location.pathname;
        try { history.pushState({ q }, '', url); }
        catch (_) { return; }
        lastPushedQuery = q;
      }, 600);
    }
    // Stamp {q} state onto the initial entry so popstate can later
    // detect "back to the original page state" cleanly.
    try { history.replaceState({ q: lastPushedQuery }, '', location.href); }
    catch (_) { /* ignore */ }
    // Back/forward → re-hydrate input + re-run search WITHOUT pushing.
    window.addEventListener('popstate', () => {
      let q = '';
      try { q = (new URLSearchParams(location.search).get('q') || '').trim(); }
      catch (_) {}
      lastPushedQuery = q;
      clearTimeout(historyPushTimer);
      clearTimeout(searchDebounceTimer);
      anchorOverride = null;
      suppressHistoryPush = true;
      try {
        if (input.value !== q) input.value = q;
        updateClearBtn();
        if (q) {
          runSearch(q);
        } else {
          renderEmpty();
        }
      } finally {
        suppressHistoryPush = false;
      }
    });

    // ─── Responsive placeholder ──────────────────────────────────
    // Desktop has room for "Type a word or phrase…" (the canonical
    // copy + default in the HTML). Below 720px we swap to the
    // shorter "Type a word/phrase…" so the placeholder fits the
    // smaller headline-input width without truncation. Listening to
    // the media query handles orientation changes + window resizing.
    const PLACEHOLDER_DESKTOP = 'Type a word or phrase…';
    const PLACEHOLDER_MOBILE = 'Type a word/phrase…';
    const mobilePlaceholderMQ = window.matchMedia('(max-width: 720px)');
    const syncPlaceholder = () => {
      input.placeholder = mobilePlaceholderMQ.matches ? PLACEHOLDER_MOBILE : PLACEHOLDER_DESKTOP;
    };
    syncPlaceholder();
    mobilePlaceholderMQ.addEventListener('change', syncPlaceholder);

    // ─── Event wiring ───
    // Live debounced search on every keystroke. Switching the search
    // word ALWAYS clears any anchor override (the override only makes
    // sense for the word the user picked it on). The clear (×) button
    // visibility tracks input.value.length — visible only when there's
    // something to clear.
    const updateClearBtn = () => {
      clearBtn.classList.toggle('is-visible', input.value.length > 0);
    };
    input.addEventListener('input', () => {
      clearTimeout(searchDebounceTimer);
      anchorOverride = null;
      updateClearBtn();
      const q = input.value.trim();
      if (!q) {
        renderEmpty();
        // Backspaced to empty — schedule an empty history entry so
        // the URL stays in sync with the visible state.
        scheduleHistoryPush('');
        return;
      }
      searchDebounceTimer = setTimeout(() => runSearch(q), 200);
    });
    // Clear button: empty the input + render the initial state +
    // refocus so the user can immediately start typing again.
    clearBtn.addEventListener('click', () => {
      input.value = '';
      anchorOverride = null;
      clearTimeout(searchDebounceTimer);
      updateClearBtn();
      renderEmpty();
      // Also push an "empty" state so back/forward includes the
      // cleared moment in the navigation history.
      scheduleHistoryPush('');
      input.focus();
    });
    // Sync once on load in case the browser restored a value (e.g.
    // after a reload with form-restore enabled).
    updateClearBtn();
    // Pressing Enter flushes immediately (skips the debounce window).
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearTimeout(searchDebounceTimer);
      anchorOverride = null;
      const q = input.value.trim();
      if (q) runSearch(q);
      input.blur();  // dismiss the iOS keyboard so results are visible
    });
    // Slant toggle re-runs the search with the current option state.
    // Read the input directly (not lastQuery) so toggling with an
    // empty input is a no-op and toggling with a typed word doesn't
    // resurrect a stale search from earlier in the session. Anchor
    // override is preserved — slant is orthogonal to anchor choice.
    slantToggle.addEventListener('change', () => {
      const q = input.value.trim();
      if (!q) return;
      runSearch(q);
    });
    smartSortBtn.addEventListener('click', openSmartSortModal);
    modalCloseBtn.addEventListener('click', closeSmartSortModal);
    smartSortModal.addEventListener('click', (e) => {
      if (e.target === smartSortModal) closeSmartSortModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && smartSortModal.getAttribute('aria-hidden') === 'false') {
        closeSmartSortModal();
      }
    });

    function openSmartSortModal() {
      smartSortModal.setAttribute('aria-hidden', 'false');
      // Don't clobber body overflow on open — body is already overflow:hidden
      // for the app-shell layout. The original toggle was harmless on the
      // old (scrollable) layout but unnecessary now.
    }
    function closeSmartSortModal() {
      smartSortModal.setAttribute('aria-hidden', 'true');
    }

    // ─── Search + render ───
    function runSearch(query) {
      lastQuery = query;
      // Sync this query into browser history (debounced — only after
      // the user has stopped typing for ~600ms). Skipped when called
      // from the popstate handler (it sets suppressHistoryPush).
      scheduleHistoryPush(query);
      // NOTE: activeColumnId is intentionally NOT reset here.
      // Songwriters tend to dwell on a particular shape (e.g. the
      // 'A·B' / one-weak-between column) while iterating across many
      // query words — clearing the pill on every search makes them
      // re-tap the same pill repeatedly. render() validates that the
      // remembered pill still exists in the new result and falls
      // back to a default only if it doesn't.
      const opts = {
        mustEndWithB: true,
        slant: slantToggle.checked
      };
      if (anchorOverride) {
        opts.overrideASyllableIndex = anchorOverride.aSyllIdx;
      }
      const result = window.RhymeEngine.query(query, window.DICTIONARY, INDEX, opts);
      render(result);
    }

    // Closed-book SF Symbol (character.book.closed.fill) — inlined so
    // the empty-state illustrations require no external asset fetch.
    // Pairs naturally with "we don't have that in our dictionary".
    const BOOK_ICON_SVG = `<svg viewBox="0 0 419.336 538.477" aria-hidden="true">
      <path d="M74.0234 538.477L402.148 538.477C411.719 538.477 419.336 530.859 419.336 521.094C419.336 513.867 414.258 507.227 407.617 504.688C374.414 489.453 367.188 447.656 399.023 414.648C408.789 404.688 419.336 391.406 419.336 366.992L419.336 76.3672C419.336 25.9766 394.141 0.390625 344.141 0.390625L75.1953 0.390625C25.1953 0.390625 0 25.7812 0 76.3672L0 464.648C0 513.281 25.3906 538.477 74.0234 538.477ZM75.7812 503.906C49.2188 503.906 34.5703 489.453 34.5703 464.258C34.5703 440.43 51.1719 425.391 77.5391 425.391L339.844 425.391C344.727 425.391 348.828 424.805 352.734 423.828C338.867 451.953 341.797 481.641 358.984 503.906ZM67.5781 389.648C60.7422 389.648 54.8828 383.984 54.8828 376.953L54.8828 49.8047C54.8828 42.5781 60.7422 36.9141 67.5781 36.9141C74.6094 36.9141 80.4688 42.5781 80.4688 49.8047L80.4688 376.953C80.4688 383.984 74.6094 389.648 67.5781 389.648ZM165.039 311.719C155.859 311.719 150 306.25 150 298.047C150 294.922 150.391 292.188 152.148 287.891L218.555 110.156C222.461 99.8047 229.688 94.5312 240.43 94.5312C251.367 94.5312 258.789 99.8047 262.695 110.156L329.102 287.891C330.859 292.188 331.25 294.922 331.25 298.242C331.25 306.25 325.391 311.719 316.406 311.719C308.984 311.719 304.102 308.398 300.781 299.023L282.617 247.266L198.633 247.266L180.273 299.023C177.148 308.594 172.266 311.719 165.039 311.719ZM206.836 222.656L274.414 222.656L241.602 129.883L239.648 129.883Z"/>
    </svg>`;

    // Sparkles SF Symbol (decorative for the initial empty state).
    const SPARKLES_ICON_SVG = `<svg viewBox="0 0 463 620" aria-hidden="true">
      <path d="M217.4 121.5c3.1 0 4.7-2 5.3-4.9 6.8-40 6.2-43.4 50.7-50.8 2.9-.4 4.7-2.2 4.7-5.1s-1.8-4.9-4.7-5.3c-44.5-7.4-44-10.7-50.7-50.7C222 1.8 220.5 0 217.4 0c-3.1 0-4.7 1.8-5.3 4.7-6.8 40-6.2 43.4-50.8 50.8-2.9.4-4.7 2.2-4.7 5.3s1.8 4.9 4.7 5.3c44.5 7.4 44 10.7 50.8 50.7.6 2.9 2.2 4.9 5.3 4.9zM94.5 293.6c3.9 0 6.8-2.7 7.4-6.6 9.4-67.6 11-67 80.5-80.3 3.7-.8 6.6-3.3 6.6-7.4s-3-6.8-6.6-7.4c-69.5-10.5-71.3-11.9-80.5-80.1-.6-4.1-3.5-6.8-7.4-6.8s-6.8 2.7-7.4 7c-8.8 67.4-11.3 66.6-80.5 79.9-3.7.8-6.6 3.3-6.6 7.4 0 4.3 2.9 6.6 7.4 7.4 68.8 11.5 71 12.5 79.7 79.9.6 4.3 3.5 7 7.4 7zM265.4 573.6c6.1 0 10.5-4.1 11.4-10.4 17.2-142 35.5-160.7 175.2-175.4 6.4-.6 10.7-5.1 10.7-11.1s-4.3-10.7-10.7-11.3c-139.6-14.6-158-33.4-175.2-175.4-.8-6-5.3-10.3-11.4-10.3s-10.3 4.3-11.3 10.3c-17.2 142-35.5 160.7-175.2 175.4-6.4.6-10.7 5.1-10.7 11.1s4.3 10.5 10.7 11.1c139.3 18 156.9 33.6 175.2 175.4 1 6.3 4.4 10.6 10.5 10.6z"/>
    </svg>`;

    // ─── Curated suggestion pool ──────────────────────────────────
    // Hand-picked for breadth + songwriter resonance. Mix of single
    // multi-syllable words, 2-word phrases, and longer phrases.
    // Every entry has been validated against the dictionary so users
    // never get a not-found from a suggestion.
    //
    // The pool itself is defined in the small inline <script> ABOVE
    // the engine/dictionary <script> tags (window.__STARTER_SUGGESTIONS),
    // so the initial chips render INSTANTLY before the heavy 2.7MB
    // of dictionary JS loads. We just alias it here for the rest of
    // the app. Subsequent renderEmpty() calls (when the user clears
    // the input) re-pick from the same pool.
    const STARTER_SUGGESTIONS = window.__STARTER_SUGGESTIONS;

    function pickRandomSuggestions(n) {
      // Fisher-Yates partial shuffle: O(n) and produces n distinct
      // picks even when STARTER_SUGGESTIONS is much larger than n.
      const arr = STARTER_SUGGESTIONS.slice();
      for (let i = arr.length - 1; i > arr.length - 1 - n; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.slice(arr.length - n);
    }

    function renderEmpty() {
      lastResult = null;
      anchorStripEl.innerHTML = '';
      headlineStatusEl.innerHTML = '';
      // Minimal initial state: just a "Try:" label + 3 random
      // suggestion chips. The giant headline-input above already
      // says "Type a word or phrase…" — repeating that here would
      // just compete for visual attention. Repeat visitors see a
      // different set of suggestions on each load.
      const picks = pickRandomSuggestions(3);
      const chips = picks.map(s =>
        `<button type="button" class="es-suggestion" data-q="${escapeHtml(s)}">${escapeHtml(s)}</button>`
      ).join('');
      resultsEl.innerHTML = `
        <div class="empty-state initial">
          <p class="es-label">Or try:</p>
          <div class="es-suggestions" id="esSuggestions">
            ${chips}
          </div>
        </div>
      `;
      wireSuggestionClicks();
    }

    // Track which words have already been requested so the user
    // can't double-submit the same word from the same session.
    const requestedWords = new Set();

    function renderNotFound(result) {
      // Clear the anchor strip — it would still show the LAST successful
      // word's syllables, which is misleading next to a "not found"
      // message about a different word.
      anchorStripEl.innerHTML = '';
      headlineStatusEl.innerHTML = '';
      lastResult = null;

      const word = escapeHtml(result.word);
      const isPhrase = result.reason === 'unknown_word_in_phrase';
      const headline = isPhrase
        ? `Hmm, one of those words is missing`
        : `Hmm, no rhymes for <span class="word">${word}</span> yet`;
      const body = isPhrase
        ? `“${word}” contains a word we don't recognize. Try replacing it with a more common word — our dictionary has 135K English words and phrases.`
        : `It might be a typo, a proper noun we haven't catalogued, or a regional/slang form. Try a different spelling, an inflected form, or one of these:`;

      // "Suggest" CTA: explicit user-driven submission. Shown for
      // BOTH single-word and phrase misses — a phrase miss might mean
      // the user wants to flag the unknown word inside the phrase OR
      // the phrase itself as an idiom we should add. The submission
      // captures the full typed input either way; we triage on review.
      const alreadyRequested = requestedWords.has(result.word);
      const suggestBtn = `
        <button type="button" class="suggest-word" id="suggestWordBtn"
          data-word="${word}" data-reason="${result.reason || 'unknown'}"
          ${alreadyRequested ? 'disabled' : ''}>
          ${alreadyRequested ? '✓ Thanks — we’ll review it' : `Suggest <span class="suggest-word-name">${word}</span> for our dictionary`}
        </button>
      `;

      resultsEl.innerHTML = `
        <div class="empty-state not-found">
          <div class="es-icon">${BOOK_ICON_SVG}</div>
          <h2 class="es-headline">${headline}</h2>
          <p class="es-body">${body}</p>
          ${isPhrase ? '' : `
            <div class="es-suggestions" id="esSuggestions">
              <button type="button" class="es-suggestion" data-q="remember">remember</button>
              <button type="button" class="es-suggestion" data-q="midnight">midnight</button>
              <button type="button" class="es-suggestion" data-q="forever young">forever young</button>
            </div>
          `}
          ${suggestBtn}
        </div>
      `;
      wireSuggestionClicks();
      wireSuggestWordButton();
    }

    // ─── "Suggest this word" submission ─────────────────────────
    // Single explicit click → one GA4 event. We use GA4 rather than
    // a Firestore write so there's no Firestore rules / spam-filter
    // overhead; aggregated reports in Firebase Console (or BigQuery
    // export) tell us which words users want most. The button locks
    // after one click per session-per-word so a user can't spam the
    // same submission.
    function wireSuggestWordButton() {
      const btn = document.getElementById('suggestWordBtn');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const word = btn.getAttribute('data-word') || '';
        const reason = btn.getAttribute('data-reason') || 'unknown';
        if (!word || requestedWords.has(word)) return;
        try {
          if (typeof gtag === 'function') {
            gtag('event', 'dictionary_request', {
              word: word.slice(0, 100),
              reason,
              word_length: word.length
            });
          }
        } catch (_) { /* never break UX over telemetry */ }
        requestedWords.add(word);
        btn.disabled = true;
        btn.innerHTML = '✓ Thanks — we’ll review it';
      });
    }

    // Wire the suggestion chips inside the empty / not-found states
    // so clicking one fills the input + triggers a fresh search.
    function wireSuggestionClicks() {
      const container = document.getElementById('esSuggestions');
      if (!container) return;
      container.querySelectorAll('.es-suggestion').forEach(btn => {
        btn.addEventListener('click', () => {
          const q = btn.getAttribute('data-q') || btn.textContent.trim();
          anchorOverride = null;
          input.value = q;
          runSearch(q);
        });
      });
    }

    function render(result) {
      if (!result.found) {
        renderNotFound(result);
        return;
      }

      lastResult = result;
      const cols = buildColumns(result);

      // Validate the persisted pill against the new query's columns.
      // The synthetic 'A_B' pill needs BOTH A and B columns to exist;
      // every other pill just needs its own ID present. If the
      // remembered pill is invalid for this query (e.g. user had
      // 'A·B' selected — a two-anchor column — then searched a
      // single-anchor word like "light"), fall through to the
      // default-picker so they land somewhere productive.
      if (activeColumnId !== null) {
        const validIds = new Set(cols.map(c => c.id));
        const stillValid = activeColumnId === 'A_B'
          ? (validIds.has('A') && validIds.has('B'))
          : validIds.has(activeColumnId);
        if (!stillValid) activeColumnId = null;
      }
      if (activeColumnId === null) {
        activeColumnId = pickDefaultMobileColumn(result, cols);
      }

      renderAnchorStrip(result);
      renderStatus(result);
      resultsEl.innerHTML = `
        ${renderPillRow(cols)}
        ${renderColumnRow(cols)}
      `;
      wireUpInteractions();
    }

    function renderStatus(result) {
      // When the user has an active anchor override, show the "↻ reset"
      // chip so they can easily return to the engine's default stress
      // pattern. Otherwise the status row is empty (claims no space —
      // min-height keeps the input from jumping when text appears).
      if (anchorOverride) {
        headlineStatusEl.innerHTML = `
          <span>Custom stress · </span>
          <button type="button" class="reset-anchor" id="resetAnchorBtn" title="Restore the engine's default stress pattern">
            ↻ reset
          </button>
        `;
        const btn = document.getElementById('resetAnchorBtn');
        if (btn) {
          btn.addEventListener('click', () => {
            anchorOverride = null;
            if (lastQuery) runSearch(lastQuery);
          });
        }
      } else {
        headlineStatusEl.innerHTML = '';
      }
    }

    function pickDefaultMobileColumn(result, cols) {
      // Two-anchor queries: default to the synthesized "A & B" combined
      // tab so users land on the most useful pair view (single-syllable
      // rhymes for both anchors side-by-side).
      if (result.anchors.length >= 2 && cols.find(c => c.id === 'A') && cols.find(c => c.id === 'B')) {
        return 'A_B';
      }
      // Single-anchor queries: Multi column is the default landing.
      return cols.find(c => c.id === 'Multi')?.id || cols[0]?.id;
    }

    /// Returns the set of column IDs that should be VISIBLE for the
    /// current activeColumnId. The synthetic 'A_B' tab maps to BOTH the
    /// A and B columns rendering side-by-side; every other tab maps to
    /// just itself.
    function activeColumnSet() {
      if (activeColumnId === 'A_B') return new Set(['A', 'B']);
      if (activeColumnId) return new Set([activeColumnId]);
      return new Set();
    }

    // ─── Column construction ───
    function buildColumns(result) {
      const cols = [];
      const hasTwoAnchors = result.anchors.length >= 2;
      const a = result.anchors[0];

      // Full-rhyme set: words where every syllable rhymes (3+ syl queries)
      const fullSet = new Set([
        ...((result.fullRhyme && result.fullRhyme.strict) || []),
        ...((result.fullRhyme && result.fullRhyme.near) || []),
        ...((result.fullRhyme && result.fullRhyme.slant) || [])
      ]);

      if (a && result.singleAnchorA) {
        cols.push({
          id: 'A', label: 'A',
          title: a.label,
          subtitle: hasTwoAnchors ? 'first anchor' : 'rhymes',
          words: flattenSingleAnchor(result.singleAnchorA, a.label, fullSet)
        });
      }

      if (hasTwoAnchors) {
        const b = result.anchors[1];
        if (b && result.singleAnchorB) {
          cols.push({
            id: 'B', label: 'B',
            title: b.label,
            subtitle: 'second anchor',
            words: flattenSingleAnchor(result.singleAnchorB, b.label, fullSet)
          });
        }
        if (result.multiSyllable) {
          const m = result.multiSyllable;
          const aL = a.label, bL = result.anchors[1].label;
          cols.push({
            id: 'AB', label: 'A B',
            title: `${aL} ${bL}`,
            subtitle: 'adjacent',
            words: tieredWords(m.adjacent, m.adjacentLoose, m.adjacentSlant, fullSet)
          });
          cols.push({
            id: 'A.B', label: 'A · B',
            title: `${aL} · ${bL}`,
            subtitle: 'one weak between',
            words: tieredWords(m.gap1, m.gap1Loose, m.gap1Slant, fullSet)
          });
          cols.push({
            id: 'A..B', label: 'A · · B',
            title: `${aL} · · ${bL}`,
            subtitle: 'two+ weak between',
            words: tieredWords(m.gap2plus, m.gap2plusLoose, m.gap2plusSlant, fullSet)
          });
        }
      } else if (result.multiSyllableEndings) {
        const me = result.multiSyllableEndings;
        cols.push({
          id: 'Multi', label: 'Multi',
          title: a ? `… ${a.label}` : 'multi-syllable',
          subtitle: a ? `phrases ending in ${a.label}` : 'multi-syllable',
          words: tieredWords(me.strict, me.loose, me.slant, fullSet)
        });
      }

      return cols.filter(c => c.words.length > 0);
    }

    function flattenSingleAnchor(anchor, exact, fullSet) {
      if (!anchor || !anchor.byCategory) return [];
      const cats = Object.keys(anchor.byCategory).sort((x, y) => {
        if (x === exact) return -1;
        if (y === exact) return 1;
        if (x.length !== y.length) return x.length - y.length;
        return x.localeCompare(y);
      });
      const out = [];
      for (const cat of cats) {
        const tier = (cat === exact) ? 'strict' : 'loose';
        for (const w of anchor.byCategory[cat]) {
          out.push({ word: w, tier, isFullRhyme: fullSet && fullSet.has(w) });
        }
      }
      return out;
    }

    function tieredWords(strict, loose, slant, fullSet) {
      const fs = fullSet || new Set();
      const partition = (arr) => {
        const fulls = [], rest = [];
        for (const w of (arr || [])) (fs.has(w) ? fulls : rest).push(w);
        return [fulls.slice().sort(), rest.slice().sort()];
      };
      const [sF, sR] = partition(strict);
      const [lF, lR] = partition(loose);
      const [slF, slR] = partition(slant);
      const out = [], seen = new Set();
      const push = (w, tier, isFull) => {
        if (seen.has(w)) return;
        seen.add(w);
        out.push({ word: w, tier, isFullRhyme: isFull });
      };
      for (const w of sF) push(w, 'strict', true);
      for (const w of sR) push(w, 'strict', false);
      for (const w of lF) push(w, 'loose', true);
      for (const w of lR) push(w, 'loose', false);
      for (const w of slF) push(w, 'slant', true);
      for (const w of slR) push(w, 'slant', false);
      return out;
    }

    // ─── Anchor strip ───
    // Renders the syllable structure of the queried word into the
    // standalone #anchorStrip element (which lives under the headline
    // input, not inside #results). Stressed anchors are highlighted in
    // brand purple; weak syllables are GRAY and CLICKABLE — tapping a
    // weak syllable promotes it to the A-anchor and re-runs the search
    // via `overrideAnchorIndices`. Homographs render as multiple
    // pronunciation strips joined by " / ".
    //
    // Each tappable weak syllable carries:
    //   data-vowel-pos  — the syllable's vowel index in phonemes[]
    //   data-pron-idx   — which pronunciation strip it belongs to
    // Tap → handleSyllableTap looks up the B anchor for that
    // pronunciation and rebuilds the override.
    function renderAnchorStrip(result) {
      const allSylls = (result.syllablesByPronunciation || []).filter(s => s && s.length);
      const allAnchors = result.anchorsByPronunciation || [result.anchors || []];

      // The override is stored as a SYLLABLE INDEX (0-based, from the
      // start of the syllable list). A given syllable index points to
      // the same logical syllable across all pronunciations of the
      // word, so the override marker renders consistently on every
      // pron's strip — even when their phoneme array shapes differ
      // (e.g. FOREVER pron 1 vs pron 2 have different array lengths
      // but both have 3 syllables: tap "fer"/"for" → both highlight).
      const overrideSyllIdx = anchorOverride ? anchorOverride.aSyllIdx : null;

      const pronStrips = allSylls.map((sylls, pronIdx) => {
        const anchors = allAnchors[pronIdx] || [];
        const anchorByPos = new Map();
        anchors.forEach((a, i) => { if (a.vowelPos != null) anchorByPos.set(a.vowelPos, i); });

        const inner = sylls.map((s, i) => {
          const isAnchor = anchorByPos.has(s.vowelPos);
          const isOverride = isAnchor && overrideSyllIdx === i;
          const sep = i > 0 ? '<span class="syllable-divider">·</span>' : '';
          if (isAnchor) {
            const overrideCls = isOverride ? ' is-override' : '';
            return `${sep}<span class="syllable anchor${overrideCls}" title="Anchor (drives the rhyme search)">${escapeHtml(s.label)}</span>`;
          } else {
            // data-syll-idx is the syllable's position in this
            // pronunciation's syllable list (0-based). data-pron-idx
            // is preserved for click → handler routing only.
            return `${sep}<button type="button" class="syllable weak" ` +
              `data-syll-idx="${i}" data-pron-idx="${pronIdx}" ` +
              `title="Tap to make this the A-anchor">${escapeHtml(s.label)}</button>`;
          }
        }).join('');
        return `<span class="pron-strip">${inner}</span>`;
      });

      anchorStripEl.innerHTML = pronStrips.join('<span class="pron-divider">/</span>');

      // Wire up tap-to-promote. The handler stores the SYLLABLE index
      // (not a phoneme position) so it applies safely across all
      // pronunciations regardless of their array shapes.
      anchorStripEl.querySelectorAll('.syllable.weak').forEach(el => {
        el.addEventListener('click', () => {
          const syllIdx = parseInt(el.getAttribute('data-syll-idx'), 10);
          handleSyllableTap(syllIdx);
        });
      });
    }

    function handleSyllableTap(syllIdx) {
      if (!lastResult) return;
      // Sanity: syllable index must be valid in at least the first
      // pronunciation, and not be the line-ending syllable (which is
      // the B anchor — overriding that doesn't make sense in this
      // mode; this code only swaps A).
      const sylls = (lastResult.syllablesByPronunciation && lastResult.syllablesByPronunciation[0]) || [];
      if (syllIdx < 0 || syllIdx >= sylls.length - 1) return;
      anchorOverride = { aSyllIdx: syllIdx };
      runSearch(lastQuery);
    }

    // ─── Pill row ───
    // On mobile the pills are also tab switchers. The A and B columns
    // are merged into a single synthetic "A & B" pill so the user lands
    // on the dual-column pair view by default — replacing two pills
    // (each opening a single column) with one (opening both side-by-side).
    function renderPillRow(cols) {
      const aCol = cols.find(c => c.id === 'A');
      const bCol = cols.find(c => c.id === 'B');
      // Synthetic combined pill goes first; then every column EXCEPT
      // the original A and B (which are subsumed by the combined pill).
      const pills = [];
      if (aCol && bCol) {
        pills.push({
          id: 'A_B',
          label: 'A | B',
          count: aCol.words.length + bCol.words.length
        });
        for (const c of cols) {
          if (c.id !== 'A' && c.id !== 'B') {
            pills.push({ id: c.id, label: c.label, count: c.words.length });
          }
        }
      } else {
        // Single-anchor query — no merging needed.
        for (const c of cols) {
          pills.push({ id: c.id, label: c.label, count: c.words.length });
        }
      }
      return `
        <div class="pill-row">
          ${pills.map(p => `
            <button class="pill ${p.id === activeColumnId ? 'active' : ''}" data-col="${escapeHtml(p.id)}">
              ${escapeHtml(p.label)}
              <span class="count">${p.count}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    // ─── Column row ───
    // On mobile: when activeColumnId is "A_B" (synthetic combined tab),
    // both A and B columns render in a 2-up grid — handled via the
    // .dual modifier class on .column-row. Other tabs render a single
    // full-width column (default mobile single-col layout).
    function renderColumnRow(cols) {
      const isDual = activeColumnId === 'A_B';
      return `
        <div class="column-row ${isDual ? 'dual' : ''}">
          ${cols.map(c => renderColumn(c)).join('')}
        </div>
      `;
    }

    function renderColumn(col) {
      const visible = activeColumnSet();
      const isMobileHidden = activeColumnId && !visible.has(col.id);
      const perfectCount = col.words.filter(w => w.tier === 'strict').length;
      const totalCount = col.words.length;
      const chips = col.words.map(item => renderChip(item)).join('') ||
        '<div class="empty-col-note">— no matches —</div>';
      return `
        <div class="column ${isMobileHidden ? 'is-mobile-hidden' : ''}" data-col-id="${escapeHtml(col.id)}">
          <div class="column-header">
            <div class="row">
              <div class="title">${escapeHtml(col.title)}</div>
              <div class="count"><span class="perfect">${perfectCount}</span> / ${totalCount}</div>
            </div>
            <div class="subtitle">${escapeHtml(col.subtitle)}</div>
          </div>
          <div class="column-body">${chips}</div>
        </div>
      `;
    }

    function renderChip(item) {
      const classes = ['chip'];
      if (item.word.includes(' ')) classes.push('phrase');
      if (item.tier === 'loose') classes.push('tier-loose');
      else if (item.tier === 'slant') classes.push('tier-slant');
      const badge = item.isFullRhyme
        ? `<span class="full-badge" title="Every syllable rhymes">all</span>`
        : '';
      // Badge AFTER the word — right-aligned via margin-left:auto in CSS.
      return `<div class="${classes.join(' ')}" data-q="${escapeHtml(item.word)}">` +
        `<span class="chip-text">${escapeHtml(displayName(item.word))}</span>${badge}` +
      `</div>`;
    }

    // ─── Interactions: chip click → re-search; pill click → switch mobile column ───
    function wireUpInteractions() {
      resultsEl.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const q = chip.getAttribute('data-q') || chip.textContent.trim();
          // Tapping a chip = a fresh query on a different word, so the
          // anchor override (which was scoped to the previous word)
          // must be cleared. Otherwise the engine would try to apply
          // the old vowelPos to a totally different phoneme array.
          anchorOverride = null;
          input.value = displayName(q);
          runSearch(q);
        });
      });
      resultsEl.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
          activeColumnId = pill.getAttribute('data-col');
          // Update active state on pills
          resultsEl.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p === pill));
          // Toggle column visibility on mobile based on the active set
          // (handles the synthetic "A | B" tab where two columns are visible).
          const visible = activeColumnSet();
          resultsEl.querySelectorAll('.column').forEach(c => {
            c.classList.toggle('is-mobile-hidden', !visible.has(c.getAttribute('data-col-id')));
          });
          // Toggle the .dual modifier on column-row so the grid switches
          // between 1-column and 2-column layouts. Without this, the
          // grid stays 1fr 1fr after switching FROM A|B and the single
          // visible column ends up at half-width.
          const colRow = resultsEl.querySelector('.column-row');
          if (colRow) colRow.classList.toggle('dual', activeColumnId === 'A_B');
        });
      });
    }

    // ─── Display-name helper (proper-noun casing) ───
    function displayName(word) {
      if (!word) return word;
      const upperKey = word.toUpperCase();
      if (window.PROPER_NOUN_DISPLAY && window.PROPER_NOUN_DISPLAY[upperKey]) {
        return window.PROPER_NOUN_DISPLAY[upperKey];
      }
      if (window.PROPER_NOUN_KEYS && window.PROPER_NOUN_KEYS.has(upperKey)) {
        return word.toLowerCase().replace(/(^|[\s\-])([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase());
      }
      return word;
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // The initial OR-TRY chips were already rendered into #results
    // by the small inline <script> above the engine tags (so users
    // see them in <100ms instead of after the dictionary loads).
    // Wire the click handlers now that the engine is ready.
    wireSuggestionClicks();

    // ─── Engine ready: dismiss splash + flush pending search ─────
    // The static <div id="loadingSplash"> overlays everything below
    // the topbar from first paint. CSS fades it out when body has
    // .engine-ready. We enforce a 400ms minimum display window so
    // cached visits get a visible "loaded" beat instead of a 5ms
    // flash. After the fade transition the element is removed from
    // the DOM (cleanup; not strictly needed for layout).
    window.__engineReady = true;
    const pendingQuery = (input.value || '').trim();
    const dismissSplash = () => {
      document.body.classList.add('engine-ready');
      // Remove from DOM after the CSS transition (350ms) finishes.
      setTimeout(() => {
        const splash = document.getElementById('loadingSplash');
        if (splash) splash.remove();
      }, 400);
    };
    if (pendingQuery) {
      // User interacted during load — dismiss splash immediately + run
      // search. They've already shown they want results NOW.
      dismissSplash();
      runSearch(pendingQuery);
    } else {
      // No interaction yet — enforce min display so the spinner is
      // visible for at least 400ms total (counted from the early-bird
      // inline script that ran at first paint).
      const elapsed = Date.now() - (window.__warmupStart || Date.now());
      const minDuration = 400;
      setTimeout(dismissSplash, Math.max(0, minDuration - elapsed));
    }
