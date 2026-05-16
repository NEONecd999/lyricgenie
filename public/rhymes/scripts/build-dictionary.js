// Builds dictionary.js from CMU + a frequency-filtered common-words list.
//
// Inputs:
//   data/cmudict.dict      — full CMU Pronouncing Dictionary (~125K entries)
//   data/common-20k.txt    — Google's top-20K most common English words
//
// Output:
//   dictionary.js          — JS file exporting window.DICTIONARY (uppercase keys)
//
// Filter pipeline:
//   1. Skip CMU comment lines (`;;;`)
//   2. Skip alt-pronunciation entries (those ending in `(2)`, `(3)`, etc.)
//   3. Skip entries with periods (abbreviations like A. / U.S.A.)
//   4. Skip single-char entries except a/i (they're "letter A says ay" entries)
//   5. Cross-reference against the common-20k list — keep only words in both
//
// Run with:  node scripts/build-dictionary.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CMU_PATH = path.join(ROOT, 'data', 'cmudict.dict');
const COMMON_PATH = path.join(ROOT, 'data', 'common-20k.txt');
const OUT_PATH = path.join(ROOT, 'dictionary.js');

// ─── Load common-words allowlist ───
const commonRaw = fs.readFileSync(COMMON_PATH, 'utf8');
const COMMON = new Set(
  commonRaw.split(/\r?\n/).map(s => s.trim().toLowerCase()).filter(Boolean)
);
console.log(`Loaded ${COMMON.size} common words.`);

// Songwriter-friendly extras the web-frequency list tends to miss. Web text
// is dominated by news / blogs / technical writing — emotion-leaning,
// poetic, and archaic-feeling vocabulary is undercounted. This is the gap we
// patch by hand until we can switch to a song-lyric-derived frequency list.
const ALWAYS_KEEP = new Set([
  // Contractions and clipped forms CMU lists with leading apostrophes
  "'bout", "'cause", "'em", "'round", "'til", "'tis", "'twas",
  // Emotion / introspection
  "lonesome", "sorrow", "longing", "yearning", "weary", "weariness", "rapture",
  "anguish", "elation", "euphoria", "melancholy", "wistful", "wistfulness",
  "tender", "tenderness", "regret", "regrets", "remorse", "solace", "yearn",
  "ache", "aches", "aching", "sorrowful", "mournful", "forsaken", "forsake",
  // Movement / direction
  "astray", "yonder", "drifter", "drift", "drifting", "wander", "wandering",
  "wanderer", "roam", "roaming", "stray", "straying", "veering", "veer",
  // Light / dark / sky / nature
  "ember", "embers", "ablaze", "smolder", "smoldering", "shimmer", "shimmering",
  "moonlit", "starlit", "midnight", "twilight", "dusk", "nightfall", "daybreak",
  "silken", "molten", "gilded", "windswept", "stormy", "stormswept",
  "wildfire", "wildfires", "kindling", "thunderhead",
  // Body / sensation
  "kindred", "cradle", "cradling", "whisper", "whispers", "whispered",
  "whispering", "echoes", "echoed", "trembling", "tremor", "shudder",
  "savior", "saviour", "broken", "brokenhearted", "heartbeat", "heartbreak",
  "heartache", "heartstrings",
  // Time / fate / arc-of-life
  "evermore", "nevermore", "forever", "forevermore", "always", "eternal",
  "eternity", "destiny", "destined", "reverie", "reveries", "halcyon",
  // Common lyric verbs
  "lingering", "linger", "lingered", "soothe", "soothing", "weep", "weeping",
  "wept", "mend", "mending", "mended", "shatter", "shattering", "shattered",
  "tremble", "trembled", "yearned", "burned", "burning", "drowning",
  "blaming", "blames", "blamed", "blamer", "blaming",
  // Common lyric phrasing words
  "wherever", "whenever", "however", "whoever", "whatever", "whatsoever",
  "anywhere", "everywhere", "nowhere", "somewhere",
  // Common base words the top-20K underweights (so prefix expansion can find
  // words like "rekindle", "reawaken" that depend on them).
  "kindle", "kindled", "awaken", "awakened", "awakens",
  // Common contractions — top-20K is web-text and strips apostrophes, so
  // these never make the cut despite being everywhere in songs.
  "i'm","i'll","i'd","i've",
  "you're","you'll","you'd","you've",
  "he's","she's","it's","we're","we'll","we'd","we've",
  "they're","they'll","they'd","they've",
  "isn't","aren't","wasn't","weren't",
  "don't","doesn't","didn't",
  "hasn't","haven't","hadn't",
  "won't","wouldn't","can't","couldn't","shouldn't","mustn't",
  "ain't","gonna","gotta","wanna","kinda","sorta","outta",
  "y'all","ma'am",
  "let's","that's","there's","here's","what's","where's","who's","how's",
  "could've","should've","would've","might've","must've",
  // Songwriter-relevant single words the top-20K filter misses
  "monologue","molotov","earshot","contrast","bodyguard",
  "soliloquy","epilogue","prologue","dialogue","analog","analogue",
  "cease","cease-fire","ceasefire","cessation",
  "reverb","reverberation","crescendo","decrescendo",
  "valor","vigil","void","vacant","vacancy",
  // -INKLE family — common but didn't make the top-20K. Adding the whole
  // family so queries like "wrinkle" actually return rhyme partners.
  "wrinkle","wrinkled","wrinkles","wrinkling",
  "twinkle","twinkled","twinkles","twinkling",
  "sprinkle","sprinkled","sprinkles","sprinkling","sprinkler","sprinklers",
  "crinkle","crinkled","crinkles","crinkling",
  "tinkle","tinkled","tinkles","tinkling"
]);
ALWAYS_KEEP.forEach(w => COMMON.add(w));

// Drop these even if they're common — they're either dictionary noise or
// not useful as rhyme search targets.
const ALWAYS_DROP = new Set([
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]);
// Re-allow common single-letter content words. "a" is the article ("take a
// trip"), "i" is the pronoun ("if i could"), "o" is the vocative ("o brother"
// — borderline but let it through). Without these, dynamic phrase construction
// fails on any phrase containing them.
['a','i','o'].forEach(w => ALWAYS_DROP.delete(w));

// Two-letter ALLOWLIST: only the 2-char tokens here are kept. Everything
// else CMU has at length 2 (proper-noun stems like "fi", "ji", musical
// fragments like "mi", foreign loanwords, etc.) gets dropped, regardless
// of whether it's in the common-20K list. The list below is hand-curated
// to be the 2-letter words an English-language songwriter actually reaches
// for. Add to this list when a genuine omission is noticed; do NOT add
// fragments / proper-noun stems.
const TWO_LETTER_ALLOWLIST = new Set([
  // Articles, conjunctions, prepositions, pronouns
  'an','as','at','by','do','go','he','if','in','is','it','me','my','no',
  'of','oh','ok','on','or','so','to','up','us','we',
  // Interjections and short content words
  'ah','am','aw','eh','ha','hi','ho','la','lo','ma','oi','ow','pa',
  'ta','uh','um','ya','yo',
  // Modals
  'be'
  // Note: 'ye' (archaic) intentionally excluded — songwriters rarely
  // reach for it and it crowded the -ee rhyme group with noise.
]);

// Three-letter blocklist: 3-char CMU entries that are hand-flagged as
// noise (proper-noun stems, foreign borrowings, alphabetical fragments
// from CMU). Most 3-letter words are real English (cat / dog / sun /
// big / etc.), so we use a blocklist here, not an allowlist.
const THREE_LETTER_BLOCK = new Set([
  // Proper-noun stems / surname fragments ending in long-vowel sounds
  'dee','hee','jee','lea','lee','nee','pee','ree','tee','wee',  // -ee
  'leigh','jen','lem','liu','lou','luc','luz','mah','mai',
  // Tiny foreign-borrowing or fragment "words" ending in IY / EY
  'pri','qui','sri','sie','nie','rie','vie','tie',
  // Alphabet abbreviations / musical fragments
  'eee','tee','que',
  // From the user's flagged list (phrases.js review)
  'reeh','shi','xus','yan'
]);

// Blocklist of CMU keys to always exclude (proper nouns, slurs, weird stuff
// the user has flagged via the in-app "× flag for removal" UI). Sourced from
// scripts/cmu-blocklist.txt; one lowercase key per line. Applied to BOTH the
// base CMU pass and the prefix-expansion pass.
const BLOCKLIST_PATH = path.join(ROOT, 'scripts', 'cmu-blocklist.txt');
const CMU_BLOCKLIST = new Set();
if (fs.existsSync(BLOCKLIST_PATH)) {
  for (const line of fs.readFileSync(BLOCKLIST_PATH, 'utf8').split(/\r?\n/)) {
    const w = line.trim().toLowerCase();
    if (w) CMU_BLOCKLIST.add(w);
  }
}
console.log(`CMU blocklist: ${CMU_BLOCKLIST.size} keys excluded.`);

// ─── Walk CMU once to build word→pronunciation-list lookup ───
//
// CMU lists alt-pronunciations as separate entries with "(2)", "(3)", etc.
// suffixes — e.g. "the DH AH0", "the(2) DH AH1", "the(3) DH IY1". We collect
// ALL pronunciations per word into an array; the engine then indexes each
// pronunciation separately so a homograph like "read" rhymes with both
// "feed" (R IY1 D) and "head" (R EH1 D).
const cmuRaw = fs.readFileSync(CMU_PATH, 'utf8');
const cmuLines = cmuRaw.split(/\r?\n/);

const cmuMap = new Map();  // lowercase word → array of phoneme strings
let skipComment = 0, skipDot = 0;
let altPronunciationCount = 0;

for (const line of cmuLines) {
  if (!line || line.startsWith(';;;')) { skipComment++; continue; }
  const firstSpace = line.indexOf(' ');
  if (firstSpace < 0) continue;
  const rawWord = line.slice(0, firstSpace);
  const phonemes = line.slice(firstSpace + 1).trim();
  if (!phonemes) continue;
  if (rawWord.includes('.')) { skipDot++; continue; }

  // Strip the alt-pronunciation suffix to find the base word.
  // "read(2)" → "read", "the(3)" → "the", "read" → "read".
  const parenIdx = rawWord.indexOf('(');
  const baseWord = parenIdx >= 0 ? rawWord.slice(0, parenIdx) : rawWord;
  const isAlt = parenIdx >= 0;
  const wl = baseWord.toLowerCase();
  if (!cmuMap.has(wl)) cmuMap.set(wl, []);
  cmuMap.get(wl).push(phonemes);
  if (isAlt) altPronunciationCount++;
}

// ─── Inflection expansion ───
//
// Web-frequency lists undercount inflected forms (`blame` is in top-20K but
// `blaming` / `blamed` aren't). For any accepted base word, also include its
// CMU inflections — that catches the gap without needing a bigger allowlist.
//
// Naive English suffix rules: covers most regular cases. Won't catch
// irregulars like child→children, but those are usually independently common
// enough to be in the base wordlist anyway.
function inflectionsOf(word) {
  const w = word.toLowerCase();
  const out = new Set();
  // Direct suffix attach
  for (const s of ['s','es','ed','d','ing','er','est','ly','ies','ied','iest','ier']) {
    out.add(w + s);
  }
  // Drop final 'e' before vowel-initial suffix: "blame" → "blaming" / "blamed"
  if (w.endsWith('e')) {
    const stem = w.slice(0, -1);
    for (const s of ['ed','ing','er','est','able','ible','ation']) {
      out.add(stem + s);
    }
  }
  // Final 'y' → 'i' before suffix: "cry" → "cries" / "cried" / "crier"
  if (/[bcdfghjklmnpqrstvwxz]y$/.test(w)) {
    const stem = w.slice(0, -1) + 'i';
    for (const s of ['es','ed','er','est','ly','ous']) out.add(stem + s);
  }
  // Double final consonant before -ing/-ed: "run" → "running" / "runner"
  // (only single-syllable CVC pattern; common enough to bother with)
  if (/[^aeiou][aeiou][bcdfgklmnprstvz]$/.test(w)) {
    const last = w.slice(-1);
    const doubled = w + last;
    for (const s of ['ed','ing','er','est','y']) out.add(doubled + s);
  }
  return [...out];
}

// ─── Reverse-inflection: extend COMMON with base lemmas ───
//
// The web-frequency list often has only the inflected form ("rhymes") and not
// the lemma ("rhyme"). The forward-inflection pass below can't recover the
// lemma — it only walks base→inflected. So before the kept set is built, we
// look at every COMMON word, propose a base lemma, and add it if BOTH the
// orthographic and PHONETIC continuation rules confirm it: lemma's phonemes +
// the expected suffix phonemes should equal the inflected form's phonemes.
// Without this phonetic check the heuristic generates a lot of noise like
// "thi" ← "this" or "numb" ← "number" — accidentally-real CMU entries that
// have nothing to do with the inflected source.
//
// Suffix rules covered: -s/-es/-ies (plurals + 3rd-person singular),
// -ed/-d/-ied (past tense). Skipping -er/-est/-ly because those produce too
// many false positives ("powe" ← "power") and the bigger lemma forms (drive,
// fast, etc.) are usually already in COMMON anyway.
function phonemesEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
function stripStress(arr) { return arr.map(p => p.replace(/[0-9]/g, '')); }

// Suffix phoneme variants (CMU represents these multiple ways depending on
// the preceding sound — voiceless consonants get /S/, voiced get /Z/, etc.)
const SUFFIX_PHONEMES = {
  // -s / -es: /S/ after voiceless ("cats" K AE1 T S), /Z/ after voiced
  // ("dogs" D AO1 G Z), /IH0 Z/ or /AH0 Z/ after sibilants ("boxes")
  'plural': [['S'], ['Z'], ['IH0','Z'], ['AH0','Z']],
  // -ed: /T/ after voiceless ("walked"), /D/ after voiced ("blamed"),
  // /IH0 D/ or /AH0 D/ after T/D ("waited", "added")
  'past':   [['T'], ['D'], ['IH0','D'], ['AH0','D']],
};

// True iff inflectedPhonemes == lemmaPhonemes + one of the suffix variants.
function suffixMatches(lemmaPhonemes, inflectedPhonemes, kind) {
  for (const variant of SUFFIX_PHONEMES[kind]) {
    if (lemmaPhonemes.length + variant.length !== inflectedPhonemes.length) continue;
    // Ignore stress digits when comparing — suffix phonemes don't carry stress
    const lemmaNoStress = stripStress(lemmaPhonemes);
    const inflNoStress = stripStress(inflectedPhonemes);
    if (!phonemesEqual(lemmaNoStress, inflNoStress.slice(0, lemmaPhonemes.length))) continue;
    if (phonemesEqual(variant, inflNoStress.slice(lemmaPhonemes.length))) return true;
  }
  return false;
}

// Generate (lemma, suffixKind) candidate pairs from an inflected word.
// Note: also generates "de-doubled" candidates for consonant-doubling verbs
// like "capped" → "cap" (via "capp" → "cap"), "running" → "run" — without
// this, the candidate list only sees "capp"/"runn" and accepts those weird
// CMU surname spellings as "lemmas".
function lemmaCandidatesOf(word) {
  const w = word.toLowerCase();
  const out = [];
  function addWithDedouble(stem, kind) {
    out.push([stem, kind]);
    // If stem ends in a doubled consonant (single short vowel + CC), also
    // propose the single-consonant form: "capp" → "cap", "runn" → "run".
    if (stem.length >= 3) {
      const last = stem.slice(-1);
      const prev = stem.slice(-2, -1);
      const prevPrev = stem.slice(-3, -2);
      if (last === prev && /[bcdfgklmnprstvz]/.test(last) && /[aeiou]/.test(prevPrev)) {
        out.push([stem.slice(0, -1), kind]);
      }
    }
  }
  // -ies → -y: "cries" → "cry", "stories" → "story"
  if (w.endsWith('ies') && w.length > 4) out.push([w.slice(0, -3) + 'y', 'plural']);
  // -es → "" (after sibilants): "boxes" → "box", "kisses" → "kiss"
  if (w.endsWith('es') && w.length > 3)  addWithDedouble(w.slice(0, -2), 'plural');
  // -s → "": "rhymes" → "rhyme"
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 2) {
    addWithDedouble(w.slice(0, -1), 'plural');
  }
  // -ied → -y: "cried" → "cry", "tried" → "try"
  if (w.endsWith('ied') && w.length > 4) out.push([w.slice(0, -3) + 'y', 'past']);
  // -ed → "" or -ed → "e": "blamed" → "blame" / "stalled" → "stall"
  if (w.endsWith('ed') && w.length > 3) {
    addWithDedouble(w.slice(0, -2), 'past');
    out.push([w.slice(0, -1), 'past']);   // for verbs ending in -e: blame→blamed
  }
  return out;
}

// Walk COMMON and pull in any CMU-known lemma whose phonetic continuation
// matches the inflected form's CMU pronunciation.
//
// IMPORTANT: when an inflected word has multiple phonetically-valid lemma
// candidates (e.g. "backed" → "back" or "backe", both pronounced /bæk/),
// prefer the SHORTEST. Without this, we accidentally pull in CMU's surname
// spellings ("backe", "stocke", "walke") just because they share phonemes
// with the real lemma. We also short-circuit when a shorter candidate is
// already in COMMON — the lemma is already covered, so longer alt-spellings
// are pure noise.
let addedByReverseLemma = 0;
for (const inflected of [...COMMON]) {
  if (!cmuMap.has(inflected)) continue;
  const inflPronList = cmuMap.get(inflected).map(p => p.split(' '));
  // Sort candidates by length ascending — try the simplest spelling first.
  const candidates = lemmaCandidatesOf(inflected).slice().sort((a, b) => a[0].length - b[0].length);
  // First scan: is any candidate already in COMMON? If yes, the lemma is
  // already covered — don't add longer alt-spellings.
  let anyAlreadyCovered = false;
  for (const [lemma] of candidates) {
    if (COMMON.has(lemma)) { anyAlreadyCovered = true; break; }
  }
  if (anyAlreadyCovered) continue;
  // Second scan: find the shortest candidate that's in CMU AND phonetically
  // validates, and accept ONLY that one.
  for (const [lemma, kind] of candidates) {
    if (!cmuMap.has(lemma)) continue;
    if (CMU_BLOCKLIST.has(lemma)) continue;
    const lemmaPronList = cmuMap.get(lemma).map(p => p.split(' '));
    let phoneticOk = false;
    outer: for (const lp of lemmaPronList) {
      for (const ip of inflPronList) {
        if (suffixMatches(lp, ip, kind)) { phoneticOk = true; break outer; }
      }
    }
    if (!phoneticOk) continue;
    COMMON.add(lemma);
    addedByReverseLemma++;
    break;  // shortest match accepted; don't add longer alternatives
  }
}
if (addedByReverseLemma > 0) {
  console.log(`Reverse-lemma expansion: added ${addedByReverseLemma} base lemmas to COMMON (phonetically validated).`);
}

// ─── Build the kept set ───
const kept = new Map();
let skipNotCommon = 0, skipDropList = 0, skipBlocklist = 0, skipShortFilter = 0, addedByInflection = 0;

// Helper: short-word check. Returns true if the word should be DROPPED.
// 2-letter: drop unless it's on the explicit allowlist (mostly proper-noun
// fragments like "fi", "ji", "mi" otherwise).
// 3-letter: drop if hand-blocked (proper-noun stems like "dee", "lee", "pri").
function shortWordRejected(word) {
  if (word.length === 2) return !TWO_LETTER_ALLOWLIST.has(word);
  if (word.length === 3) return THREE_LETTER_BLOCK.has(word);
  return false;
}

for (const [wordLower, phonemes] of cmuMap.entries()) {
  if (ALWAYS_DROP.has(wordLower)) { skipDropList++; continue; }
  if (CMU_BLOCKLIST.has(wordLower)) { skipBlocklist++; continue; }
  if (shortWordRejected(wordLower)) { skipShortFilter++; continue; }
  if (!COMMON.has(wordLower)) { skipNotCommon++; continue; }
  kept.set(wordLower.toUpperCase(), phonemes);
}

// Second pass: pull in CMU-known inflections of every accepted base word
// (excluding any that are on the blocklist or fail the short-word filter).
const baseWords = [...kept.keys()].map(k => k.toLowerCase());
for (const base of baseWords) {
  for (const infl of inflectionsOf(base)) {
    if (!cmuMap.has(infl)) continue;
    if (CMU_BLOCKLIST.has(infl)) { skipBlocklist++; continue; }
    if (shortWordRejected(infl)) { skipShortFilter++; continue; }
    const key = infl.toUpperCase();
    if (kept.has(key)) continue;
    kept.set(key, cmuMap.get(infl));
    addedByInflection++;
  }
}

// Third pass: prefix expansion. Walk all of CMU and accept any word that's a
// known prefix + an already-accepted base word ("retry" = re + try, "reframe"
// = re + frame). Catches forms the web-frequency list undercounts. Stem must
// be at least 3 chars to avoid junk like "re + d" or "co + un".
const PREFIXES = [
  're','un','mis','over','under','pre','post','dis','out','de','non','sub',
  'co','anti','semi','mid','ex','en','em','im','il','ir','in','self',
  'inter','trans','multi','super','hyper','ultra','micro','macro','fore'
];
let addedByPrefix = 0;
const acceptedBaseSet = new Set([...kept.keys()].map(k => k.toLowerCase()));
for (const [wordLower, phonemes] of cmuMap.entries()) {
  if (kept.has(wordLower.toUpperCase())) continue;
  if (ALWAYS_DROP.has(wordLower)) continue;
  if (CMU_BLOCKLIST.has(wordLower)) { skipBlocklist++; continue; }
  if (shortWordRejected(wordLower)) { skipShortFilter++; continue; }
  for (const prefix of PREFIXES) {
    if (!wordLower.startsWith(prefix)) continue;
    const stem = wordLower.slice(prefix.length);
    // Stem must be 3+ chars to avoid junk like "re + d" or "re + eb"
    // (which yields "reeb"). Bumped from the previous 2-char floor —
    // 2-char stems are almost never the base of a real prefixed word
    // (one or two real cases like "rebuy" = "re+buy" exist but the
    // false-positive rate dwarfs them).
    if (stem.length < 3) continue;
    if (acceptedBaseSet.has(stem)) {
      kept.set(wordLower.toUpperCase(), phonemes);
      addedByPrefix++;
      break;
    }
  }
}

// Stats: count entries with multi-pronunciations (homographs).
const multiPronCount = [...kept.values()].filter(v => v.length > 1).length;
console.log(`CMU loaded: ${cmuMap.size} unique entries with ${altPronunciationCount} alt-pronunciations rolled up; skipped ${skipDot} dotted, ${skipComment} comments.`);
console.log(`Kept ${kept.size} entries: ${baseWords.length} from common-20k + ALWAYS_KEEP, ${addedByInflection} from inflection expansion, ${addedByPrefix} from prefix expansion.`);
console.log(`  → ${multiPronCount} have multiple pronunciations (homographs like "read", "the", "live").`);
console.log(`Dropped: ${skipDropList} from drop-list, ${skipShortFilter} from short-word filter (2-char allowlist + 3-char blocklist), ${skipNotCommon} not in common-20k.`);

// ─── Emit dictionary.js ───
const sortedKeys = [...kept.keys()].sort();
const lines2 = [
  '// AUTO-GENERATED by scripts/build-dictionary.js — do not edit by hand.',
  '// Source: CMU Pronouncing Dictionary, filtered against the Google top-20K',
  '// most common English words plus a small ALWAYS_KEEP list of songwriter-',
  '// friendly extras. See scripts/build-dictionary.js to regenerate.',
  '//',
  `// Entry count: ${kept.size} single words.`,
  '// Phrases live in phrases.js so they survive regeneration.',
  '',
  '// Merge order (later wins on key collision):',
  '//   1. window.MINED_PHRASES        — corpus-mined phrases (lowest priority)',
  '//   2. window.WIKTIONARY_PHRASES   — Wiktionary idioms / phrases / proverbs',
  '//   3. window.IDIOMS               — hand-curated rhyme-group idioms',
  '//   4. CMU single-word entries (this file)',
  '//   5. window.PHRASES              — hand-curated phrases, highest priority',
  'window.DICTIONARY = Object.assign({}, window.MINED_PHRASES || {}, window.WIKTIONARY_PHRASES || {}, window.IDIOMS || {}, {'
];
for (const k of sortedKeys) {
  // Quote the key (some CMU keys contain apostrophes / special chars).
  const safeKey = JSON.stringify(k);
  // Compact representation: emit a bare string for the common case (single
  // pronunciation), an array only for homographs. Engine handles both forms.
  const prons = kept.get(k);
  const safeVal = prons.length === 1 ? JSON.stringify(prons[0]) : JSON.stringify(prons);
  lines2.push(`  ${safeKey}: ${safeVal},`);
}
lines2.push('}, window.PHRASES || {});');
lines2.push('');

fs.writeFileSync(OUT_PATH, lines2.join('\n'));
console.log(`Wrote ${OUT_PATH} (${(fs.statSync(OUT_PATH).size / 1024).toFixed(1)} KB).`);
