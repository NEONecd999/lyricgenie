// Syllable counting for the free Syllable Counter (/syllable-counter/, 2026-11-14). Copied from the web app's
// src/engine/syllables/counter.ts (~/Sites/LYRICGENIE-APP-live, itself a port of the iPhone app's
// CMUDictSyllableCounter.swift), syllable functions only, so the page counts exactly like the editor.
// Keep it in step by hand if the app's counter changes. The dictionary is public/tools/syllables.json,
// a slim copy of the app's public/cmudict/syllables.json: word -> count, or [count, min, max] for words
// that can be sung more than one way ("fire" 1-2).

/** [canonical syllables, min across sung variants, max across sung variants]. */
export type SyllableEntry = readonly [canonical: number, min: number, max: number];
export type SyllableDict = Map<string, SyllableEntry>;

let pending: Promise<SyllableDict> | null = null;

/** Fetches and parses the dictionary once per page load. */
export function loadSyllableDict(url = "/tools/syllables.json"): Promise<SyllableDict> {
  if (!pending) {
    pending = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`syllable dictionary: HTTP ${res.status}`);
        return res.json() as Promise<Record<string, number | [number, number, number]>>;
      })
      .then((obj) => {
        const dict: SyllableDict = new Map();
        for (const [w, e] of Object.entries(obj)) dict.set(w, typeof e === "number" ? [e, e, e] : [e[0], e[1], e[2]]);
        return dict;
      })
      .catch((err: unknown) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}

/** One word of a line: its count, and its range when it can be sung more than one way. */
export interface WordCount {
  text: string;
  count: number;
  min: number;
  max: number;
}

/** Each whitespace-separated word of `line` with its count (punctuation-only tokens count 0). */
export function wordCounts(line: string, dict: SyllableDict): WordCount[] {
  return tokens(line).map((w) => {
    const r = wordSyllableRange(w, dict);
    return { text: w, count: wordSyllableCount(w, dict), min: r.min, max: r.max };
  });
}

export interface SyllableSpan {
  min: number;
  max: number;
}

export interface AmbiguousWord extends SyllableSpan {
  word: string;
}

// Swift CharacterSet.whitespacesAndNewlines (Zs + tab + LF..CR + U+0085 + U+2028/9).
const WS = new RegExp("[\\t\\n\\v\\f\\r \\u0085\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000]+");
// Swift .punctuationCharacters == Unicode general categories P*; trimmed from BOTH ends.
const PUNCT_ENDS = /^\p{P}+|\p{P}+$/gu;
const CURLY_APOSTROPHES = /[‘’ʼ]/g;

const VOWEL_PHONEMES: ReadonlySet<string> = new Set([
  "AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW",
]);

/** Smart-quote normalisation (see difference 1 above). */
export function normalizeApostrophes(text: string): string {
  return text.replace(CURLY_APOSTROPHES, "'");
}

function tokens(text: string): string[] {
  return normalizeApostrophes(text).split(WS).filter((w) => w.length > 0);
}

/** lowercase + trim punctuation both ends (+ surrounding whitespace), as Swift's `clean`. */
function clean(word: string): string {
  return normalizeApostrophes(word).toLowerCase().replace(PUNCT_ENDS, "").trim();
}

/** BlankWords.split: 2 underscores = 1 syllable per run, an odd leftover counts for nothing. */
export function splitBlanks(word: string): { blankSyllables: number; rest: string } {
  if (!word.includes("_")) return { blankSyllables: 0, rest: word };
  let blanks = 0;
  let run = 0;
  let rest = "";
  for (const ch of word) {
    if (ch === "_") {
      run++;
    } else {
      blanks += Math.floor(run / 2);
      run = 0;
      rest += ch;
    }
  }
  blanks += Math.floor(run / 2);
  return { blankSyllables: blanks, rest };
}

function adjustForSuffix(baseCount: number, original: string, base: string): number {
  const suffix = original.slice(base.length);
  const last = base.slice(-1);
  switch (suffix) {
    case "s":
      // Plural 's' only adds a syllable after sibilants.
      return last === "s" || last === "x" || last === "z" || base.endsWith("ch") || base.endsWith("sh")
        ? baseCount + 1
        : baseCount;
    case "ed":
      return last === "t" || last === "d" ? baseCount + 1 : baseCount;
    case "ing":
    case "er":
    case "est":
      return baseCount + 1;
    default:
      return baseCount;
  }
}

function vowelBasedEstimate(word: string): number {
  const lower = word.toLowerCase();
  let n = 0;
  let prevVowel = false;
  for (const c of lower) {
    const isVowel = "aeiouy".includes(c);
    if (isVowel && !prevVowel) n++;
    prevVowel = isVowel;
  }
  if (lower.endsWith("e") && n > 1) n--; // silent e
  return Math.max(1, n);
}

function wordSyllableCount(word: string, dict: SyllableDict): number {
  const { blankSyllables, rest } = splitBlanks(word);
  if (blankSyllables > 0 || rest !== word) {
    return blankSyllables + (rest === "" ? 0 : wordSyllableCount(rest, dict));
  }

  const cleanWord = clean(word);
  if (cleanWord === "") return 0;

  const exact = dict.get(cleanWord);
  if (exact) return exact[0];
  return unknownWordCount(cleanWord, dict);
}

const VOWEL_LETTERS = "aeiouy";

/** Lyric words CMUdict doesn't have, or reads wrong as written (2026-10-07, mirrored in Swift). */
const LYRIC_WORDS: Readonly<Record<string, number>> = {
  "i'ma": 2, ima: 2, imma: 2, finna: 2, "o'er": 1, "e'er": 1, "ne'er": 1,
};

/**
 * A word not in the dictionary (same steps in CMUDictSyllableCounter.swift): known lyric slang; a dropped
 * g ("tryin" read as "trying"); the dictionary word plus an ending (-s, -ed, -ing, -er, -est, or one
 * extra letter, but never a dropped vowel: "I'ma" isn't "I'm"); two dictionary words run together
 * ("situationship"); and only then the vowel-group estimate.
 */
function unknownWordCount(cleanWord: string, dict: SyllableDict): number {
  const slang = LYRIC_WORDS[cleanWord];
  if (slang !== undefined) return slang;
  if (cleanWord.endsWith("in")) {
    const full = dict.get(`${cleanWord}g`);
    if (full) return full[0];
  }
  const droppedVowel = "aiouy".includes(cleanWord.slice(-1));
  // Same order as Swift: word, dropLast(1), -s, -ed, -ing, -er, -est.
  const variations = [
    cleanWord,
    droppedVowel ? "" : cleanWord.slice(0, -1),
    cleanWord.replace(/s$/, ""),
    cleanWord.replace(/ed$/, ""),
    cleanWord.replace(/ing$/, ""),
    cleanWord.replace(/er$/, ""),
    cleanWord.replace(/est$/, ""),
  ];
  for (const v of variations) {
    const hit = v ? dict.get(v) : undefined;
    if (hit) return adjustForSuffix(hit[0], cleanWord, v);
  }
  // Two dictionary words of 3+ letters run together, the longest first part first; never split inside a
  // run of vowels ("yeaaah" isn't "yea" + "aah").
  if (cleanWord.length >= 6) {
    for (let i = cleanWord.length - 3; i >= 3; i--) {
      if (VOWEL_LETTERS.includes(cleanWord[i - 1]) && VOWEL_LETTERS.includes(cleanWord[i])) continue;
      const head = dict.get(cleanWord.slice(0, i));
      const tail = dict.get(cleanWord.slice(i));
      if (head && tail) return head[0] + tail[0];
    }
  }
  return vowelBasedEstimate(cleanWord);
}

function wordSyllableRange(word: string, dict: SyllableDict): SyllableSpan {
  const { blankSyllables, rest } = splitBlanks(word);
  if (blankSyllables > 0 || rest !== word) {
    const r = rest === "" ? { min: 0, max: 0 } : wordSyllableRange(rest, dict);
    return { min: r.min + blankSyllables, max: r.max + blankSyllables };
  }
  const cleanWord = clean(word);
  if (cleanWord === "") return { min: 0, max: 0 };
  const hit = dict.get(cleanWord);
  if (hit) return { min: hit[1], max: hit[2] };
  // A dropped g sings like the full word, either way it can go ("hustlin'" 2 or 3, like "hustling").
  if (cleanWord.endsWith("in") && LYRIC_WORDS[cleanWord] === undefined) {
    const full = dict.get(`${cleanWord}g`);
    if (full) return { min: full[1], max: full[2] };
  }
  const n = wordSyllableCount(word, dict);
  return { min: n, max: n };
}

/** Canonical (single-number) syllable count of whitespace-separated text. */
export function syllableCount(text: string, dict: SyllableDict): number {
  let total = 0;
  for (const w of tokens(text)) total += wordSyllableCount(w, dict);
  return total;
}

/** Span of counts the text can be sung as ("fire" 1..2, "every" 2..3). */
export function syllableRange(text: string, dict: SyllableDict): SyllableSpan {
  const total = { min: 0, max: 0 };
  for (const w of tokens(text)) {
    const r = wordSyllableRange(w, dict);
    total.min += r.min;
    total.max += r.max;
  }
  return total;
}

export function hasAmbiguousSyllableCount(text: string, dict: SyllableDict): boolean {
  const r = syllableRange(text, dict);
  return r.min !== r.max;
}

/** Words whose pronunciation is ambiguous, with each one's span. */
export function ambiguousWords(text: string, dict: SyllableDict): AmbiguousWord[] {
  const out: AmbiguousWord[] = [];
  for (const w of tokens(text)) {
    const r = wordSyllableRange(w, dict);
    if (r.min !== r.max) out.push({ word: clean(w), min: r.min, max: r.max });
  }
  return out;
}

