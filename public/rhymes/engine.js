// Rhyme engine — phonetic analysis + multi-syllabic rhyme matching.
// Pure functions on data — no DOM here so this layer is portable to Swift later.

// ARPAbet vowel set used by CMU Pronouncing Dictionary.
const VOWEL_SET = new Set([
  'AA','AE','AH','AO','AW','AY','EH','ER','EY','IH','IY','OW','OY','UH','UW'
]);

// Per-vowel slant neighbors (always includes self). These are intentionally
// pairwise — not disjoint groups — so each vowel's "close enough" set is just
// its acoustic neighbors. Looser sets cause noise (B-anchor fan-out floods
// results with schwa-ending words); this targets the slant rhymes songwriters
// actually reach for.
//
// Note we only fan out the A (upstream stressed) anchor — never B (the
// line-ending anchor). Fuzzing B's vowel is what lets in noise. This is set
// up at the query layer, not here.
// Pairwise vowel slants. Symmetric: if X lists Y, Y lists X.
const VOWEL_SLANT = {
  EH: ['EH','IH','AE','AH','EY'],
  IH: ['IH','EH','IY'],
  IY: ['IY','IH'],
  EY: ['EY','EH'],
  AE: ['AE','EH','AH'],

  AH: ['AH','ER','EH','AE'],
  ER: ['ER','AH'],

  AA: ['AA','AH','AO','AY','AW'],
  AO: ['AO','AA','OW'],
  OW: ['OW','AO','OY'],
  UH: ['UH','UW'],
  UW: ['UW','UH'],

  AY: ['AY','AA'],
  AW: ['AW','AA'],
  OY: ['OY','OW']
};

function slantVowelsFor(vowel) {
  return VOWEL_SLANT[vowel] || [vowel];
}

// Per-consonant slant groups for line-ending coda matching. Songwriters
// routinely substitute consonants with similar place/manner: P↔B↔T↔D
// (stops), F↔V↔TH (fricatives), M↔N↔NG (nasals). These groups let
// "what's up" (-uhp) slant-match -uhd (mud), -uhk (luck), -uhf (stuff).
//
// Multi-character codas (NS, ND, NT, MP, NTS, etc.) only match exactly —
// substituting consonants WITHIN a cluster gets noisy fast. Empty coda
// only matches empty.
const CODA_SLANT = {
  // Stops — voicing pairs slant freely; cross-place is also common
  'P':  ['P','B','T','D','K','G','F'],
  'B':  ['B','P','D','T','G','V'],
  'T':  ['T','D','P','B','K','CH'],
  'D':  ['D','T','B','P','G','JH','TH','DH'],
  'K':  ['K','G','T','D','P'],
  'G':  ['G','K','D','B'],
  // Fricatives — voicing pairs + place neighbors
  'F':  ['F','V','P','TH','S'],
  'V':  ['V','F','B','DH','Z'],
  'S':  ['S','Z','F','SH','TH'],
  'Z':  ['Z','S','V','D','DH'],
  'TH': ['TH','F','S','DH'],
  'DH': ['DH','V','Z','TH'],
  'SH': ['SH','S','CH','ZH'],
  'ZH': ['ZH','Z','SH','JH'],
  'CH': ['CH','SH','T','TS','JH'],
  'JH': ['JH','ZH','D','Z'],
  // Nasals — these slant freely with each other
  'M':  ['M','N','NG'],
  'N':  ['N','M','NG'],
  'NG': ['NG','N','M'],
  // Liquids — closer than people think, especially for unstressed codas
  'L':  ['L','R'],
  'R':  ['R','L','ER']
};

function slantCodasFor(coda) {
  // Empty coda matches only empty (no slant)
  if (!coda) return [''];
  // Multi-character codas: exact match only (slanting clusters causes too
  // much noise — searchable as exact rhymes via the strict path).
  if (coda.length > 2 || (coda.length === 2 && !CODA_SLANT[coda])) {
    return [coda];
  }
  return CODA_SLANT[coda] || [coda];
}

// ─── Phrase construction with function-word destressing ───
//
// CMU marks every word's lexical stress (in isolation), but in actual sung
// speech FUNCTION WORDS reduce — articles, prepositions, pronouns, and
// auxiliaries lose their stress to surrounding content words. Without this,
// "break my heart" picks "my" (CMU = M AY1) as the A anchor when songwriters
// would clearly hear "break" as the upstream rhyme target. We zero the stress
// digits on any word in this set when constructing phrase phonemes.

const FUNCTION_WORDS = new Set([
  // Articles
  'a','an','the',
  // "Pure" prepositions — these are reliably weak in English. The ambiguous
  // ones (out, in, on, off, up, down, by, over, under) were removed because
  // they're often content / phrasal-verb particles ("out of mind", "down on
  // me", "by my side", "over the top") and destressing them produces wrong
  // anchor selections. CMU's stress=1 marking holds up better for these.
  'of','to','at','for','from','with','into','onto',
  'through','between','about','around',
  // Conjunctions
  'and','or','but','so','as','if','than','that','because','while','when',
  // Pronouns
  'i','me','my','mine','you','your','yours',
  'he','him','his','she','her','hers',
  'it','its','we','us','our','ours',
  'they','them','their','theirs',
  'this','these','those',
  // Auxiliaries / copulas
  'is','am','are','was','were','be','been','being',
  'do','does','did','done','doing',
  'has','have','had','having',
  'will','would','shall','should','can','could','may','might','must',
  // Negation (often destressed)
  'not'
]);

function destressWord(phonemeArr) {
  return phonemeArr.map(p => p.replace(/[12]/g, '0'));
}

// Constructs phrase phonemes from a spelling + per-word phoneme groups.
// Used by phrases.js for hand-curated entries (where we want to verify the
// per-word phonemes by hand) and internally by buildPhrasePhonemes for the
// dynamic fallback path used at query time.
function phrase(spelling, phonemeStr) {
  const words = spelling.split(/\s+/);
  const phonemeWords = phonemeStr.split('|').map(s => s.trim().split(/\s+/));
  if (words.length !== phonemeWords.length) {
    throw new Error(`phrase("${spelling}"): ${words.length} words but ${phonemeWords.length} phoneme groups`);
  }
  const out = phonemeWords.map((ws, i) =>
    FUNCTION_WORDS.has(words[i].toLowerCase()) ? destressWord(ws) : ws
  );
  return out.map(ws => ws.join(' ')).join(' | ');
}

// Dynamically construct a phrase's phoneme sequence by looking up each word
// in the dictionary. Returns null if any word isn't in the dictionary —
// caller should fall back to the "not found" UI.
function buildPhrasePhonemes(spelling, dictionary) {
  const words = spelling.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 2) return null;
  const phonemeWords = [];
  for (const w of words) {
    const entry = dictionary[w.toUpperCase()];
    if (!entry) return null;
    // Dictionary entries can be a string or an array (homographs). For phrase
    // construction we use the FIRST pronunciation — the canonical/most-common
    // one. Per-pronunciation phrase variants would be possible but add complexity.
    const phon = Array.isArray(entry) ? entry[0] : entry;
    phonemeWords.push(phon.split(/\s+/));
  }
  const out = phonemeWords.map((ws, i) =>
    FUNCTION_WORDS.has(words[i]) ? destressWord(ws) : ws
  );
  return out.map(ws => ws.join(' ')).join(' | ');
}

// ARPAbet phoneme → human-readable letter approximation, for displaying coda groups.
const PHONEME_TO_LETTERS = {
  AA: 'ah', AE: 'a', AH: 'uh', AO: 'aw', AW: 'ow', AY: 'eye',
  B: 'b', CH: 'ch', D: 'd', DH: 'th', EH: 'e', ER: 'er',
  EY: 'ay', F: 'f', G: 'g', HH: 'h', IH: 'i', IY: 'ee',
  JH: 'j', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ng',
  OW: 'oh', OY: 'oy', P: 'p', R: 'r', S: 's', SH: 'sh',
  T: 't', TH: 'th', UH: 'oo', UW: 'oo', V: 'v', W: 'w',
  Y: 'y', Z: 'z', ZH: 'zh'
};

function isVowel(phoneme) {
  return VOWEL_SET.has(stripStress(phoneme));
}

// "|" is our optional word-boundary marker (only used in multi-word phrase
// entries). It's not a real phoneme — it tells the syllabifier "force the
// coda to end here" so that the consonants in the preceding word stay
// attached to that word's last syllable instead of leaking into the next
// word's onset (which is what naive Max Onset Principle would do).
const WORD_BOUNDARY = '|';
function isBoundary(p) { return p === WORD_BOUNDARY; }

function stripStress(phoneme) {
  return phoneme.replace(/[0-9]/g, '');
}

function getStress(phoneme) {
  const m = phoneme.match(/(\d)$/);
  return m ? parseInt(m[1], 10) : null;
}

// Parse a CMU-format string ("R IH0 M EH1 M B ER0") into a phoneme array.
function parsePhonemes(str) {
  return str.trim().split(/\s+/);
}

// Dictionary entries are EITHER a single phoneme string (most words) or an
// array of strings (homographs like READ → ["R IY1 D", "R EH1 D"]). This
// helper normalizes both cases to an array of phoneme arrays so callers
// don't have to special-case.
function pronunciationsFor(entry) {
  if (Array.isArray(entry)) return entry.map(parsePhonemes);
  return [parsePhonemes(entry)];
}

// For a given vowel index in a phoneme array, build a "rhyme" object:
// the vowel itself + the coda (consonants belonging to THIS syllable).
// Uses the Maximum Onset Principle: when N consonants sit between this vowel
// and the next, the trailing consonants prefer to attach as the onset of the
// next syllable. Simple rule: 1 intervocalic consonant → fully onset of next
// syllable (this coda is empty); 2+ → split, keep the first as our coda and
// pass the rest to the next syllable's onset.
function rhymeAt(phonemes, vowelIdx) {
  const vowel = stripStress(phonemes[vowelIdx]);
  // Collect consonants until next vowel, end of word, or word boundary marker.
  const intervocalic = [];
  let nextVowelIdx = -1;
  let hitBoundary = false;
  for (let j = vowelIdx + 1; j < phonemes.length; j++) {
    if (isBoundary(phonemes[j])) { hitBoundary = true; break; }
    if (isVowel(phonemes[j])) { nextVowelIdx = j; break; }
    intervocalic.push(stripStress(phonemes[j]));
  }
  let coda;
  if (nextVowelIdx === -1 || hitBoundary) {
    // End of word OR hit a word boundary in a phrase: everything collected so
    // far is this syllable's coda. The boundary case is what keeps "brand"'s
    // ND with AE in "brand new" instead of pushing N to "new"'s onset.
    coda = intervocalic;
  } else if (intervocalic.length === 0) {
    coda = [];
  } else if (intervocalic[0] === 'R') {
    // R after a vowel is "R-colored" — it stays with the preceding syllable
    // in English (`fire`, `tire`, `mire`, `inter-FERE-nce`). Without this,
    // interference's anchor reads as "-i" instead of "-ir".
    coda = ['R'];
  } else if (intervocalic.length === 1) {
    // Single non-R consonant → goes to next syllable's onset (Max Onset).
    coda = [];
  } else {
    // Multiple consonants: keep first as coda, rest go to next onset.
    coda = intervocalic.slice(0, 1);
  }
  return {
    vowel,
    coda: coda.join(''),
    key: `${vowel}_${coda.join('')}`,  // canonical bucket id (vowel + coda)
    vowelKey: vowel,                   // looser key for vowel-only matching
    label: codaLabel(vowel, coda)      // human-readable like "-em" or "-end"
  };
}

function codaLabel(vowel, codaArr) {
  const v = (PHONEME_TO_LETTERS[vowel] || vowel).toLowerCase();
  const c = codaArr.map(p => PHONEME_TO_LETTERS[p] || p).join('').toLowerCase();
  return '-' + v + c;
}

// Find all vowel indices in a phoneme array. (Word boundary markers are not
// vowels, so they're naturally skipped — the array of indices points at real
// vowel phoneme positions only.)
function vowelIndices(phonemes) {
  const out = [];
  phonemes.forEach((p, i) => { if (isVowel(p)) out.push(i); });
  return out;
}

// Split a phoneme array into per-syllable groups for DISPLAY purposes (the
// engine's rhyme matching only needs the rhyme tail, not the full onset).
// Each syllable: { vowelPos, onset, nucleus, coda, stress, label }.
//
// Onset assignment uses the same rules as rhymeAt's coda computation —
// R-coloring keeps R with the preceding syllable, single intervocalic
// consonants pass to the next syllable's onset (Maximum Onset Principle),
// and "|" word boundaries hard-stop the coda.
function syllabify(phonemes) {
  const vIdxs = vowelIndices(phonemes);
  const syllables = [];
  let onsetStart = 0;  // index where the current syllable's onset starts

  for (let i = 0; i < vIdxs.length; i++) {
    const vIdx = vIdxs[i];
    const isLast = i === vIdxs.length - 1;

    // Onset: phonemes from `onsetStart` up to (but not including) the vowel,
    // skipping any boundary markers.
    const onset = [];
    for (let j = onsetStart; j < vIdx; j++) {
      if (!isBoundary(phonemes[j])) onset.push(stripStress(phonemes[j]));
    }

    // Walk forward to find the next vowel / boundary / end so we can compute
    // this syllable's coda using the same rules as rhymeAt.
    const intervocalic = [];
    let nextStart = phonemes.length;
    let hitBoundary = false;
    let hitNextVowel = false;
    for (let j = vIdx + 1; j < phonemes.length; j++) {
      if (isBoundary(phonemes[j])) {
        hitBoundary = true;
        nextStart = j + 1;
        break;
      }
      if (isVowel(phonemes[j])) {
        hitNextVowel = true;
        nextStart = j;
        break;
      }
      intervocalic.push(stripStress(phonemes[j]));
    }

    let coda;
    let codaEnd;
    if (isLast || hitBoundary || !hitNextVowel) {
      // End of word OR word boundary: this syllable swallows everything.
      coda = intervocalic;
      codaEnd = vIdx + 1 + intervocalic.length;
    } else if (intervocalic.length === 0) {
      coda = []; codaEnd = vIdx + 1;
    } else if (intervocalic[0] === 'R') {
      coda = ['R']; codaEnd = vIdx + 2;
    } else if (intervocalic.length === 1) {
      coda = []; codaEnd = vIdx + 1;
    } else {
      coda = intervocalic.slice(0, 1);
      codaEnd = vIdx + 2;
    }

    const nucleus = stripStress(phonemes[vIdx]);
    const stress = getStress(phonemes[vIdx]);

    // Special-case AO + R coda: songwriters read this combination as
    // "or" (as in 'for', 'forth', 'born', 'horn', 'torn'), not "awr"
    // (which is what the literal AO→'aw' + R→'r' mapping produces).
    // Apply only when AO is the nucleus AND R is the first coda
    // phoneme — preserves any consonants AFTER the R correctly
    // (e.g. 'forth' → 'forth', 'born' → 'born', 'thorn' → 'thorn').
    let nucleusLabel;
    let codaTail;
    if (nucleus === 'AO' && coda[0] === 'R') {
      nucleusLabel = 'or';
      codaTail = coda.slice(1);
    } else {
      nucleusLabel = (PHONEME_TO_LETTERS[nucleus] || nucleus).toLowerCase();
      codaTail = coda;
    }
    const labelLetters = [
      ...onset.map(p => (PHONEME_TO_LETTERS[p] || p).toLowerCase()),
      nucleusLabel,
      ...codaTail.map(p => (PHONEME_TO_LETTERS[p] || p).toLowerCase())
    ];

    syllables.push({
      vowelPos: vIdx,
      onset, nucleus, coda, stress,
      label: labelLetters.join('')
    });

    // Next syllable's onset begins right after this one's coda. If we hit a
    // word boundary, jump past it (nextStart already accounts for that).
    onsetStart = hitBoundary ? nextStart : codaEnd;
  }

  return syllables;
}

// Identify the two anchor syllables for a word/phrase.
//
// B (line-ending anchor) = always the final vowel.
// A (upstream anchor)    = the highest-stressed vowel BEFORE the final.
//                          Prefers primary stress (1), then secondary (2),
//                          falling back to "just the previous vowel" so we
//                          always return a second anchor when there's more
//                          than one syllable in total.
//
// Earlier this function looked at all vowels (including the final) when
// hunting for primary stress — that meant phrases like "brand new" (both AE1
// and UW1 marked stress=1) collapsed to a single anchor because the loop's
// last hit was the final vowel itself. Restricting the stress search to
// earlier vowels fixes that.
function anchorsFor(phonemes, options = {}) {
  const vIdx = vowelIndices(phonemes);
  if (vIdx.length === 0) return { anchors: [], allVowels: [] };

  // ─── User-promoted A anchor via syllable index ────────────────
  // overrideASyllableIndex says "the A anchor should be the Nth
  // syllable from the start" (0-based). We syllabify THIS
  // pronunciation independently, look up the Nth syllable's vowel
  // position, and use that as A. B always stays the line-ending
  // syllable. This is per-pronunciation safe — homograph
  // pronunciations with different phoneme array shapes (e.g.
  // "F ER0 EH1 V ER0" vs "F AO0 R EH1 V ER0" for FOREVER) each get
  // their own correctly-mapped anchors. The previous override API
  // (overrideAnchorIndices = absolute phoneme positions) crashed
  // when applied to a pronunciation with a different array length.
  if (options.overrideASyllableIndex != null) {
    const sylls = syllabify(phonemes);
    const aSyllIdx = options.overrideASyllableIndex;
    const lastSyllIdx = sylls.length - 1;
    // If the override points outside this pronunciation's syllables,
    // fall back to default anchor selection (skip the override pass).
    if (aSyllIdx >= 0 && aSyllIdx < sylls.length && aSyllIdx !== lastSyllIdx) {
      const aPos = sylls[aSyllIdx].vowelPos;
      const bPos = sylls[lastSyllIdx].vowelPos;
      return {
        anchors: [
          { ...rhymeAt(phonemes, aPos), vowelPos: aPos },
          { ...rhymeAt(phonemes, bPos), vowelPos: bPos },
        ],
        allVowels: vIdx
      };
    }
    // Fall through to default anchor logic if override is invalid.
  }

  const lastIdx = vIdx[vIdx.length - 1];

  if (vIdx.length === 1) {
    return {
      anchors: [{ ...rhymeAt(phonemes, lastIdx), vowelPos: lastIdx }],
      allVowels: vIdx
    };
  }

  const earlierVowels = vIdx.slice(0, -1);
  const bVowel = stripStress(phonemes[lastIdx]);
  let aIdx = -1;
  // Pass 1: latest primary-stress vowel that's a DIFFERENT vowel from B.
  // (Otherwise A = B and the "two anchors" collapse to one rhyme target —
  // happens with letter-spelled acronyms like FYI where Y and I both = AY.)
  for (const i of earlierVowels) {
    if (getStress(phonemes[i]) === 1 && stripStress(phonemes[i]) !== bVowel) aIdx = i;
  }
  // Pass 2: latest primary-stress vowel, even if it matches B (better than nothing).
  if (aIdx === -1) {
    for (const i of earlierVowels) {
      if (getStress(phonemes[i]) === 1) aIdx = i;
    }
  }
  // Pass 3: latest secondary-stress vowel.
  if (aIdx === -1) {
    for (const i of earlierVowels) {
      if (getStress(phonemes[i]) === 2) aIdx = i;
    }
  }
  // Pass 4: immediately-prior vowel, regardless of stress.
  if (aIdx === -1) aIdx = earlierVowels[earlierVowels.length - 1];

  return {
    anchors: [
      { ...rhymeAt(phonemes, aIdx), vowelPos: aIdx },
      { ...rhymeAt(phonemes, lastIdx), vowelPos: lastIdx }
    ],
    allVowels: vIdx
  };
}

// Count how many vowels separate two vowel indices (for A-to-B spacing).
function vowelGapBetween(phonemes, idxA, idxB) {
  let gap = 0;
  for (let i = idxA + 1; i < idxB; i++) {
    if (isVowel(phonemes[i])) gap++;
  }
  return gap;
}

// Build the inverted indices once at startup. Returns:
//   single: Map<anchorKey, [{word, phonemes}]>
//          → all words/phrases whose FINAL anchor matches this key (one-syllable rhymes)
//   pairs: Map<"keyA||keyB||gap", [{word, phonemes}]>
//          → all words/phrases that contain anchorA followed by anchorB with `gap` weak vowels between them
//   byKey: Map<word, {phonemes, anchors}>
function buildIndex(dictionary) {
  const single = new Map();
  const pairs = new Map();      // B is final vowel only (line-ending mode)
  const pairsAny = new Map();   // B can be any vowel (internal-rhyme mode)
  const byWord = new Map();

  for (const [rawWord, entry] of Object.entries(dictionary)) {
    const word = rawWord.toLowerCase();
    const allProns = pronunciationsFor(entry);

    // Per-word state: collect ALL pronunciations' anchor data so byWord can
    // expose them at query time.
    const pronInfos = [];

    // Index EVERY pronunciation. So a homograph like "read" appears in both
    // the -eed bucket (R IY1 D) AND the -ed bucket (R EH1 D). When someone
    // queries "head" (EH+D), they'll now find "read" as a rhyme thanks to its
    // alt pronunciation.
    for (const phonemes of allProns) {
      const { anchors, allVowels } = anchorsFor(phonemes);
      if (anchors.length === 0) continue;
      pronInfos.push({ phonemes, anchors, allVowels });

      // Single-anchor index: bucket by the LAST anchor (rhyme-bearing tail).
      const last = anchors[anchors.length - 1];
      pushBucket(single, last.key, { word, phonemes });

      // Pair index: only (a, b) pairs where B is the FINAL vowel of this word.
      // For a line-ending rhyme to work, the B anchor must land at the end of
      // the candidate — otherwise trailing syllables (like the -ate in
      // "accelerate") break the rhyme. Earlier mid-word vowels can serve as A,
      // since A is the upstream multi-syllabic anchor.
      //
      // A keys on vowel-only (so EH+M matches EH+N etc.); B keys on full
      // vowel+coda so line-ending consonants must match too — otherwise
      // "interference" rhymes with "antarctica" because both end in AH.
      // We push TWO bucket entries per (a, b) pair: one keyed by B's full
      // vowel+coda (tight rhymes) and one by B's vowel only (rhymewave-style
      // breadth — "out of mind" matches "outline" because both end in AY-sound).
      // Query picks which bucket to look in based on options.strictCoda.
      if (allVowels.length >= 2) {
        const lastVIdx = allVowels[allVowels.length - 1];
        const b = rhymeAt(phonemes, lastVIdx);
        for (let i = 0; i < allVowels.length - 1; i++) {
          const a = rhymeAt(phonemes, allVowels[i]);
          const gap = vowelGapBetween(phonemes, allVowels[i], lastVIdx);
          pushBucket(pairs, `${a.vowelKey}||${b.key}||${gap}`, { word, phonemes });
          pushBucket(pairs, `${a.vowelKey}||${b.vowelKey}||${gap}`, { word, phonemes });
        }
      }
      for (let i = 0; i < allVowels.length; i++) {
        for (let j = i + 1; j < allVowels.length; j++) {
          const a = rhymeAt(phonemes, allVowels[i]);
          const b = rhymeAt(phonemes, allVowels[j]);
          const gap = vowelGapBetween(phonemes, allVowels[i], allVowels[j]);
          pushBucket(pairsAny, `${a.vowelKey}||${b.key}||${gap}`, { word, phonemes });
          pushBucket(pairsAny, `${a.vowelKey}||${b.vowelKey}||${gap}`, { word, phonemes });
        }
      }
    }

    if (pronInfos.length > 0) {
      byWord.set(word, {
        // Convenience: expose first pronunciation's data at the top level so
        // existing callers that read .phonemes / .anchors keep working.
        phonemes: pronInfos[0].phonemes,
        anchors: pronInfos[0].anchors,
        allVowels: pronInfos[0].allVowels,
        pronunciations: pronInfos,  // all pronunciations for callers that care
      });
    }
  }

  return { single, pairs, pairsAny, byWord };
}

function pushBucket(map, key, value) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
}

// QUERY: given a word (or unknown phrase), return rhyme results.
//   - multiSyllable: words/phrases matching BOTH anchors, grouped by spacing (0/1/2+ weak vowels between)
//   - singleAnchorA: single-syllable rhymes for anchor A, grouped by phonetic category (coda)
//   - singleAnchorB: single-syllable rhymes for anchor B, same
//
// Homograph handling: if the queried word has multiple CMU pronunciations
// (e.g. "read" → R IY1 D + R EH1 D), we run the query against EACH and merge
// the results — so searching "read" surfaces both "feed/need/deed" and
// "head/bed/led" as valid rhymes.
function query(word, dictionary, index, options = {}) {
  const lookup = word.toLowerCase().trim();
  let entry = index.byWord.get(lookup);
  let pronunciations;  // array of phoneme arrays

  if (entry) {
    pronunciations = (entry.pronunciations || []).map(p => p.phonemes);
    if (pronunciations.length === 0) pronunciations = [entry.phonemes];
  } else if (dictionary[lookup.toUpperCase()]) {
    pronunciations = pronunciationsFor(dictionary[lookup.toUpperCase()]);
  } else if (lookup.includes(' ')) {
    // Multi-word phrase not in our curated phrase set — try to build phonemes
    // dynamically by looking up each word in the dictionary and concatenating
    // (with function-word destressing). This is what makes arbitrary phrases
    // like "take a trip" work without needing a pre-cataloged entry.
    const built = buildPhrasePhonemes(lookup, dictionary);
    if (!built) {
      return { found: false, word: lookup, reason: 'unknown_word_in_phrase' };
    }
    pronunciations = [parsePhonemes(built)];
  } else {
    return { found: false, word: lookup };
  }

  // Pre-build merged result; we'll fold each pronunciation's results into it.
  const allAnchors = [];   // accumulated anchor objects across pronunciations
  const result = {
    found: true,
    word: lookup,
    phonemes: pronunciations[0],         // primary, for back-compat with callers that read this
    allVowels: vowelIndices(pronunciations[0]),
    anchors: [],                          // populated below as union of per-pronunciation anchors
    pronunciationCount: pronunciations.length,
    multiSyllable: {
      // Tightest: A vowel exact + B vowel+coda exact (e.g. -aynd matches -aynd)
      adjacent: [], gap1: [], gap2plus: [],
      // Loose: A vowel exact + B vowel-only (e.g. -aynd matches -ayn / -aym)
      adjacentLoose: [], gap1Loose: [], gap2plusLoose: [],
      // Slant: A vowel fanned out to neighbors + B vowel-only
      adjacentSlant: [], gap1Slant: [], gap2plusSlant: []
    },
    // For single-syllable queries: multi-syllable words/phrases that END on
    // the query's vowel+coda (or just the vowel, for loose / slant). Songwriters
    // expect "light" to surface "midnight", "spotlight", "in plain sight" — not
    // just monosyllabic rhymes. Empty for queries with two anchors (handled by
    // multiSyllable above instead).
    multiSyllableEndings: { strict: [], loose: [], slant: [] },
    // "Full" rhymes: 3+ syllable words/phrases where EVERY syllable rhymes
    // — not just the stressed anchors. This is the "stacked rhyme" /
    // "perfect multisyllabic rhyme" mode rappers and craft-focused
    // songwriters reach for. Computed only for 3+ syllable queries since
    // 1-2 syllable queries collapse to the existing single/multi columns.
    //   strict: every syllable's vowel + coda match exactly
    //   near:   every syllable's vowel matches, codas may differ
    //   slant:  every syllable's vowel matches an acoustic neighbor
    fullRhyme: { strict: [], near: [], slant: [] },
    // The query's syllable skeleton — labels per syllable, used by the UI
    // to render the "Full" column header (e.g. "-IH-em-er" for "remember").
    fullRhymeSkeleton: [],
    singleAnchorA: { label: '', vowel: '', byCategory: {} },
    singleAnchorB: { label: '', vowel: '', byCategory: {} }
  };

  // For each pronunciation, compute and merge results into the shared result.
  // We dedupe across pronunciations using a single `seen` set so a word doesn't
  // appear twice if both pronunciations match it.
  const seen = new Set([lookup]);
  // First pronunciation's anchors define the displayed singleAnchor* (UI shape
  // expects two anchor sections). Additional pronunciations contribute extra
  // results into the SAME byCategory maps.

  // anchorsByPronunciation lets the UI render alternate pronunciations as
  // separate stacked rows (instead of a confusing flat list of all anchors
  // mashed together). Shape: [[anchorA, anchorB], [anchorA, anchorB], ...].
  // syllablesByPronunciation gives the FULL syllable structure per pronunciation
  // so the UI can show weak/unstressed syllables in gray alongside the anchor pills.
  const anchorsByPronunciation = [];
  const syllablesByPronunciation = [];
  for (let pIdx = 0; pIdx < pronunciations.length; pIdx++) {
    const phonemes = pronunciations[pIdx];
    const isFirst = pIdx === 0;
    const r = computeResultsForPronunciation(phonemes, index, options, lookup, seen, isFirst);
    anchorsByPronunciation.push(r.anchors);
    syllablesByPronunciation.push(syllabify(phonemes));
    // Merge multiSyllable arrays
    for (const k of Object.keys(result.multiSyllable)) {
      result.multiSyllable[k].push(...r.multiSyllable[k]);
    }
    // Merge multiSyllableEndings (single-syllable query → multi-syllable matches)
    for (const k of Object.keys(result.multiSyllableEndings)) {
      result.multiSyllableEndings[k].push(...r.multiSyllableEndings[k]);
    }
    // Merge fullRhyme (3+ syllable queries → words/phrases where every
    // syllable rhymes). The skeleton from the first pronunciation wins —
    // if a homograph has multiple skeletons we surface only the primary;
    // the alternates are still reachable via their own anchor entries.
    for (const k of Object.keys(result.fullRhyme)) {
      result.fullRhyme[k].push(...r.fullRhyme[k]);
    }
    if (result.fullRhymeSkeleton.length === 0 && r.fullRhymeSkeleton.length > 0) {
      result.fullRhymeSkeleton = r.fullRhymeSkeleton;
    }
    // Anchor list. The first pronunciation contributes ALL its anchors
    // verbatim — even when both anchors share a label (e.g. "night light"
    // → -eyet + -eyet). Earlier we deduped by label here, which collapsed
    // those identical-sounding pairs into a single anchor and broke the
    // header rendering + multi-syllable section detection. Additional
    // pronunciations (homographs) only contribute anchors with NEW labels.
    if (pIdx === 0) {
      for (const a of r.anchors) allAnchors.push(a);
    } else {
      for (const a of r.anchors) {
        if (!allAnchors.some(x => x.label === a.label)) allAnchors.push(a);
      }
    }
    // Single-anchor results: union into the shared maps
    mergeSingleAnchor(result.singleAnchorA, r.singleAnchorA);
    mergeSingleAnchor(result.singleAnchorB, r.singleAnchorB);
  }
  result.anchors = allAnchors;
  result.anchorsByPronunciation = anchorsByPronunciation;
  result.syllablesByPronunciation = syllablesByPronunciation;

  // Syllable counter — used to sort each result bucket "shortest first,
  // then alphabetical". Songwriters generally want 2-syllable rhymes
  // before 6-word phrases. Looks up each word/phrase in the dictionary,
  // counts vowels in its phonemes; for unknown items falls back to
  // counting word boundaries (a 2-word phrase is at least 2 syllables).
  function syllableCountOf(wordOrPhrase) {
    if (!wordOrPhrase) return 99;
    const upper = wordOrPhrase.toUpperCase();
    const entry = dictionary[upper];
    if (entry) {
      const phonemes = parsePhonemes(Array.isArray(entry) ? entry[0] : entry);
      return vowelIndices(phonemes).length;
    }
    // Phrase fallback — sum syllable counts per word.
    if (wordOrPhrase.includes(' ')) {
      let total = 0;
      for (const w of wordOrPhrase.split(/\s+/)) {
        const e = dictionary[w.toUpperCase()];
        if (e) {
          const ph = parsePhonemes(Array.isArray(e) ? e[0] : e);
          total += vowelIndices(ph).length;
        } else {
          total += 1;  // unknown word, assume 1 syllable
        }
      }
      return total || 1;
    }
    return 1;
  }

  // Compare by (syllable count ascending, then alphabetical).
  function bySyllableThenAlpha(a, b) {
    const sa = syllableCountOf(a), sb = syllableCountOf(b);
    if (sa !== sb) return sa - sb;
    return a.localeCompare(b);
  }

  // Final per-bucket sort + dedupe
  for (const k of Object.keys(result.multiSyllable)) {
    result.multiSyllable[k] = [...new Set(result.multiSyllable[k])].sort(bySyllableThenAlpha);
  }
  for (const k of Object.keys(result.multiSyllableEndings)) {
    result.multiSyllableEndings[k] = [...new Set(result.multiSyllableEndings[k])].sort(bySyllableThenAlpha);
  }
  for (const k of Object.keys(result.fullRhyme)) {
    result.fullRhyme[k] = [...new Set(result.fullRhyme[k])].sort(bySyllableThenAlpha);
  }
  // Sort single-anchor categories the same way — "single syllable" columns
  // are mostly 1-syllable words but loose-tier categories can include
  // multi-word phrases, so syllable-count ordering still helps.
  for (const sa of [result.singleAnchorA, result.singleAnchorB]) {
    for (const cat of Object.keys(sa.byCategory)) {
      sa.byCategory[cat] = [...new Set(sa.byCategory[cat])].sort(bySyllableThenAlpha);
    }
  }
  return result;
}

function mergeSingleAnchor(target, source) {
  if (!target.label && source.label) {
    target.label = source.label;
    target.vowel = source.vowel;
  }
  for (const cat of Object.keys(source.byCategory)) {
    if (!target.byCategory[cat]) target.byCategory[cat] = [];
    target.byCategory[cat].push(...source.byCategory[cat]);
  }
}

// Compute the rhyme-result shape for a SINGLE pronunciation's phonemes.
// Pulled out as a helper so query() can call it once per pronunciation and
// merge the outputs to handle homographs.
function computeResultsForPronunciation(phonemes, index, options, lookup, seen, _isFirst) {
  const { anchors } = anchorsFor(phonemes, options);

  const result = {
    anchors,
    multiSyllable: {
      // Tightest: A vowel exact + B vowel+coda exact (e.g. -aynd matches -aynd)
      adjacent: [], gap1: [], gap2plus: [],
      // Loose: A vowel exact + B vowel-only (e.g. -aynd matches -ayn / -aym)
      adjacentLoose: [], gap1Loose: [], gap2plusLoose: [],
      // Slant: A vowel fanned out to neighbors + B vowel-only
      adjacentSlant: [], gap1Slant: [], gap2plusSlant: []
    },
    multiSyllableEndings: { strict: [], loose: [], slant: [] },
    fullRhyme: { strict: [], near: [], slant: [] },
    fullRhymeSkeleton: [],
    singleAnchorA: { label: '', vowel: '', byCategory: {} },
    singleAnchorB: { label: '', vowel: '', byCategory: {} }
  };

  // Single-anchor results.
  // For each anchor, grab all single-syllable words sharing the same vowel,
  // grouped by their coda (= "category"). Single-syllable here means: the word
  // has exactly one vowel, AND that vowel matches our anchor's vowel.
  function singleSyllableMatches(anchor) {
    const out = { label: anchor.label, vowel: anchor.vowel, byCategory: {} };
    for (const [bucketKey, words] of index.single.entries()) {
      const [vowel] = bucketKey.split('_');
      if (vowel !== anchor.vowel) continue;
      // Filter to actual single-syllable entries (one vowel total).
      const monosyllabic = words.filter(w => vowelIndices(w.phonemes).length === 1);
      if (monosyllabic.length === 0) continue;
      // Bucket id is already vowel+coda, so use the coda part as our category label.
      const sample = rhymeAt(monosyllabic[0].phonemes, vowelIndices(monosyllabic[0].phonemes)[0]);
      const cat = sample.label;
      if (!out.byCategory[cat]) out.byCategory[cat] = [];
      out.byCategory[cat].push(...monosyllabic.map(w => w.word).filter(w => w !== lookup));
    }
    // De-dupe + sort within each category.
    for (const cat of Object.keys(out.byCategory)) {
      out.byCategory[cat] = [...new Set(out.byCategory[cat])].sort();
    }
    return out;
  }

  if (anchors.length >= 1) result.singleAnchorA = singleSyllableMatches(anchors[0]);
  if (anchors.length >= 2) result.singleAnchorB = singleSyllableMatches(anchors[1]);

  // Multi-syllable endings: only meaningful for single-syllable queries.
  // Songwriters expect "light" → midnight / spotlight / in plain sight, not
  // just monosyllabic rhymes. The `single` index is keyed by vowel+coda of
  // each entry's FINAL anchor, so polysyllabic words ending in -ayt are
  // already in bucket "AY_T" right alongside "light", "right", etc. — we
  // just need to surface the polysyllabic ones in their own section.
  //
  // Strict tier: same vowel+coda exactly (perfect rhyme on the final syllable).
  // Loose tier:  same vowel, different coda (broader rhymewave-style sweep).
  // Slant tier:  vowel fanned to acoustic neighbors (only when options.slant on).
  if (anchors.length === 1) {
    const a = anchors[0];
    const polysyllabic = (bucket) => bucket.filter(w => vowelIndices(w.phonemes).length > 1);

    // Strict
    const strictBucket = index.single.get(a.key) || [];
    for (const w of polysyllabic(strictBucket)) {
      if (w.word === lookup) continue;
      if (seen.has(w.word)) continue;
      seen.add(w.word);
      result.multiSyllableEndings.strict.push(w.word);
    }

    // Loose: walk every bucket whose vowel matches but coda differs.
    if (!options.strictCoda) {
      for (const [bucketKey, words] of index.single.entries()) {
        const [vowel, coda] = bucketKey.split('_');
        if (vowel !== a.vowel) continue;
        if (coda === a.coda) continue;  // strict tier already covered this
        for (const w of polysyllabic(words)) {
          if (w.word === lookup) continue;
          if (seen.has(w.word)) continue;
          seen.add(w.word);
          result.multiSyllableEndings.loose.push(w.word);
        }
      }
    }

    // Slant: fan out to vowel neighbors. Skips the query's own vowel
    // (handled above by strict / loose tiers).
    if (options.slant) {
      const neighborVowels = slantVowelsFor(a.vowel).filter(v => v !== a.vowel);
      for (const [bucketKey, words] of index.single.entries()) {
        const [vowel] = bucketKey.split('_');
        if (!neighborVowels.includes(vowel)) continue;
        for (const w of polysyllabic(words)) {
          if (w.word === lookup) continue;
          if (seen.has(w.word)) continue;
          seen.add(w.word);
          result.multiSyllableEndings.slant.push(w.word);
        }
      }
    }
  }

  // Multi-syllable results: only meaningful if we have two anchors.
  // We query the pair index by VOWEL pattern (anchor.vowelKey), not by
  // vowel+coda. That's what makes "remember" match "presenter" / "developer"
  // etc. — same vowel sequence, different consonants between.
  if (anchors.length === 2) {
    const a = anchors[0];
    const b = anchors[1];
    // `mustEndWithB` (default true): only return candidates whose B anchor is
    // their final vowel — i.e. real line-ending rhymes. When false, any
    // word containing the (A, B) pattern at any position matches.
    const useIndex = options.mustEndWithB === false ? index.pairsAny : index.pairs;

    // Two-tier default match:
    //   Tier 1 ("strict"): A vowel + B vowel+coda exact. The tightest rhymes.
    //   Tier 2 ("loose"):  A vowel + B vowel-only. Same-vowel-different-coda
    //                       matches that broaden the result like rhymewave does.
    // Each tier populates its own bucket so the UI can render strict first
    // and loose after. Set options.strictCoda=true to skip tier 2 entirely.
    for (let gap = 0; gap <= 4; gap++) {
      const strictKey = `${a.vowelKey}||${b.key}||${gap}`;
      for (const m of useIndex.get(strictKey) || []) {
        if (seen.has(m.word)) continue;
        seen.add(m.word);
        if (gap === 0) result.multiSyllable.adjacent.push(m.word);
        else if (gap === 1) result.multiSyllable.gap1.push(m.word);
        else result.multiSyllable.gap2plus.push(m.word);
      }
      if (!options.strictCoda) {
        const looseKey = `${a.vowelKey}||${b.vowelKey}||${gap}`;
        for (const m of useIndex.get(looseKey) || []) {
          if (seen.has(m.word)) continue;
          seen.add(m.word);
          if (gap === 0) result.multiSyllable.adjacentLoose.push(m.word);
          else if (gap === 1) result.multiSyllable.gap1Loose.push(m.word);
          else result.multiSyllable.gap2plusLoose.push(m.word);
        }
      }
    }

    // Second pass (only if slant requested): fuzz the A anchor's vowel,
    // keep B exact. The line-ending vowel is what carries the rhyme — fuzzing
    // that is what lets noise in. Fuzzing the upstream stressed vowel
    // (lavender → AE+ER, splinter → IH+ER, wonder → AH+ER) is where the
    // real slant value comes from.
    if (options.slant) {
      // Slant pass fans out the A vowel to acoustic neighbors. B is queried
      // vowel-only (or vowel+coda when strictCoda is on) just like the
      // default pass. This catches lavender/remember (AE→EH at A) etc.
      const aSlantVowels = slantVowelsFor(a.vowelKey);
      const slantBKey = options.strictCoda ? b.key : b.vowelKey;
      for (const av of aSlantVowels) {
        if (av === a.vowelKey) continue;  // exact-A handled in default pass
        for (let gap = 0; gap <= 4; gap++) {
          const key = `${av}||${slantBKey}||${gap}`;
          const matches = useIndex.get(key) || [];
          const fresh = [];
          for (const m of matches) {
            if (seen.has(m.word)) continue;
            seen.add(m.word);
            fresh.push(m.word);
          }
          if (gap === 0) result.multiSyllable.adjacentSlant.push(...fresh);
          else if (gap === 1) result.multiSyllable.gap1Slant.push(...fresh);
          else result.multiSyllable.gap2plusSlant.push(...fresh);
        }
      }
    }
  }

  // ─── Full-rhyme matching (3+ syllable queries) ───
  // Find words/phrases that END in the query's full syllable pattern —
  // every syllable from the START of the matching tail must rhyme. The
  // "stacked rhyme" / "perfect multisyllabic rhyme" mode: e.g. "remember"
  // → "december" (3 syllables, last 3 match), "i remember" (4 syllables,
  // last 3 match — the first "i" is extra). The candidate may be LONGER
  // than the query, but its tail must match the query syllable-by-syllable.
  //
  // Algorithm: prefilter by the FINAL syllable's vowel+coda (already
  // bucketed in index.single), then check the candidate's last N
  // syllables against the query's N syllables. Most expensive case is
  // final-syllable buckets like -er with thousands of entries, but each
  // per-candidate compare is microseconds, so total query cost stays
  // under ~10ms.
  //
  // IMPORTANT: full-rhyme matches OVERLAP heavily with multi-syllable
  // bucket matches by design. The shared `seen` set used by the multi-
  // syllable / single-anchor logic above is intentionally NOT consulted
  // here — otherwise full-rhyme would always be empty because every
  // candidate is already in seen by the time we get here. The UI uses
  // these matches to decorate (badge + sort priority) the corresponding
  // entries in the multi-syllable column, not as a separate result list.
  const allVowels = vowelIndices(phonemes);
  if (allVowels.length >= 3) {
    // Compute query's syllable skeleton (one rhyme object per vowel pos).
    const querySyls = allVowels.map(i => rhymeAt(phonemes, i));
    result.fullRhymeSkeleton = querySyls.map(s => s.label);

    const lastSyl = querySyls[querySyls.length - 1];
    const candidates = index.single.get(lastSyl.key) || [];

    // Local seen set — independent of the outer `seen`. We DO want to
    // dedupe across candidates within fullRhyme (the same word could
    // appear in multiple homograph pronunciations), but we DON'T want
    // to be blocked by the outer multi-syllable seen set.
    const fullSeen = new Set([lookup]);

    for (const c of candidates) {
      if (fullSeen.has(c.word)) continue;

      const cVIdxs = vowelIndices(c.phonemes);
      // Candidate must have AT LEAST as many syllables as the query —
      // we compare the candidate's TAIL (last querySyls.length syllables)
      // against the query. Longer candidates are fine; they just have
      // extra syllables before the matching tail.
      if (cVIdxs.length < querySyls.length) continue;

      const tailStart = cVIdxs.length - querySyls.length;
      const cTailVIdxs = cVIdxs.slice(tailStart);
      const cSyls = cTailVIdxs.map(i => rhymeAt(c.phonemes, i));

      // Walk both sequences, tracking the LOOSEST tier the candidate
      // qualifies for. Bail early if any syllable fails even slant.
      let allStrict = true;
      let allNear = true;
      let isMatch = true;
      for (let i = 0; i < querySyls.length; i++) {
        const q = querySyls[i];
        const k = cSyls[i];
        if (q.vowel !== k.vowel) {
          allStrict = false;
          allNear = false;
          if (!options.slant) { isMatch = false; break; }
          // Slant tier: vowel must be in the query syllable's neighbor set.
          if (!slantVowelsFor(q.vowel).includes(k.vowel)) {
            isMatch = false; break;
          }
        } else if (q.coda !== k.coda) {
          allStrict = false;
        }
      }
      if (!isMatch) continue;

      fullSeen.add(c.word);
      if (allStrict) result.fullRhyme.strict.push(c.word);
      else if (allNear) result.fullRhyme.near.push(c.word);
      else result.fullRhyme.slant.push(c.word);
    }
  }

  return result;
}

// Expose to global scope for the static script-tag loading model used in index.html.
window.RhymeEngine = {
  buildIndex, query, anchorsFor, parsePhonemes, pronunciationsFor,
  vowelIndices, rhymeAt, syllabify,
  phrase, buildPhrasePhonemes, FUNCTION_WORDS
};
