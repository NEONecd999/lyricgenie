window.__STARTER_SUGGESTIONS = [
      'remember','midnight','shadow','forever','horizon',
      'hurricane','tomorrow','silhouette','promises','photograph',
      'lonely','broken','whisper','summer','mystery','yesterday',
      'electric','wildfire','memory','everlasting','melancholy',
      'paradise','neon','velvet','porcelain','satellite',
      'replay','getaway','heartbreak','goodbye','sunshine','airplane',
      'downtown','skyline','rhapsody','reverie','wanderer','sympathy',
      'heartache','wonderland','passenger','prisoner','midsummer',
      'heaven','aftermath','rainfall','heartbeat',
      'night light','city lights','moonlight','broken heart','old soul',
      'last call','dead end','highway','ocean blue','silver screen',
      'fading fast','new wave','burning bridges','raining diamonds',
      'stolen moments','summer rain','midnight train','honey moon',
      'chasing dreams',
      'in plain sight','under the sun','end of the road','fire in the sky',
      'the long way home','nothing to lose','back to you','forever young',
      'out of time','kiss me slowly','tale as old as time','love of my life',
      'house of cards','ghost of you','edge of seventeen'
    ];
    (function renderInitialChipsInstantly() {
      const arr = window.__STARTER_SUGGESTIONS.slice();
      // Partial Fisher-Yates shuffle, last 3 = our random picks
      for (let i = arr.length - 1; i > arr.length - 4; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      const picks = arr.slice(arr.length - 3);
      const esc = s => String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const chips = picks.map(s =>
        `<button type="button" class="es-suggestion" data-q="${esc(s)}">${esc(s)}</button>`
      ).join('');
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.innerHTML =
          '<div class="empty-state initial">' +
            '<p class="es-label">Or try:</p>' +
            '<div class="es-suggestions" id="esSuggestions">' + chips + '</div>' +
          '</div>';
      }
    })();

    // ─── Early-bird interaction handlers ─────────────────────────
    // The heavy engine + dictionary scripts below take ~2-12s to
    // download + index on first visit. The page LOOKS ready before
    // then (topbar + headline + chips all rendered above), so users
    // may type or tap a chip before the engine is wired up. Without
    // these handlers their interaction would silently fail.
    //
    // What we do here:
    //   • Track the typed value (input event) so the main script can
    //     pick it up and run the search the moment the engine is ready.
    //   • Catch chip taps via event delegation, copy the chip's word
    //     into the input, dispatch the input event so the same code
    //     path covers both typing AND chip taps.
    //   • Show a subtle "Loading rhyme engine…" hint in the status
    //     row IF (and only if) the user has actually interacted —
    //     no chrome on the empty state for users who don't try to
    //     interact in the first second.
    //
    // The main inline script below clears the hint and runs whatever
    // pending value is in the input as soon as engine is ready.
    // ─── Engine load tracking ──────────────────────────────────
    // The loading splash (id="loadingSplash") is rendered as static
    // HTML below </main> so it appears in the very first paint —
    // no JS required. The early-bird below just captures interactions
    // (typing or chip clicks) that happen before the engine is ready,
    // so the main script can flush them once INDEX is built.
    window.__engineReady = false;
    window.__warmupStart = Date.now();
    (function wireEarlyBird() {
      const inputEl = document.getElementById('searchInput');
      if (!inputEl) return;

      // Hydrate from URL ?q=… so refreshes / shared links / the
      // browser's back-forward cache reach the search engine even
      // before the heavy 2.7MB of dictionary JS is parsed. The main
      // script's pendingQuery flush at engine-ready picks up whatever
      // input.value holds and runs the search automatically.
      try {
        const params = new URLSearchParams(location.search);
        const initialQ = (params.get('q') || '').trim();
        if (initialQ) inputEl.value = initialQ;
      } catch (_) { /* ignore */ }

      // Delegated chip-click for taps that land during load (note:
      // the splash overlays main with pointer-events still active,
      // so chip clicks under the splash actually wouldn't reach the
      // chips. This is mostly a defensive no-op while the splash is
      // shown, but kept for future-proofing if the splash UI changes).
      document.addEventListener('click', (e) => {
        if (window.__engineReady) return;
        const sug = e.target.closest('.es-suggestion');
        if (!sug) return;
        const q = sug.getAttribute('data-q') || sug.textContent.trim();
        inputEl.value = q;
      });
    })();
