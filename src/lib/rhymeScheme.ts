// Rhyme scheme analysis for the free Rhyme Scheme Finder (/rhyme-scheme-finder/, 2026-11-14). Uses the same
// rhyme sounds as the app (CMU rhymeKey: the sounds from the last stressed vowel to the end, as in the web
// app's src/engine/syllables rhymeQuality): two line endings rhyme perfectly when the keys match ("night" /
// "light"), and nearly when only the vowels after the stress match ("night" / "time"). Data:
// public/tools/rhymekeys.json, rhymeKey -> the words with that key (space-separated).

export type RhymeKeys = Map<string, string>;

let pending: Promise<RhymeKeys> | null = null;

export function loadRhymeKeys(url = "/tools/rhymekeys.json"): Promise<RhymeKeys> {
  if (!pending) {
    pending = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`rhyme keys: HTTP ${res.status}`);
        return res.json() as Promise<Record<string, string>>;
      })
      .then((obj) => {
        const map: RhymeKeys = new Map();
        for (const [key, words] of Object.entries(obj)) for (const w of words.split(" ")) map.set(w, key);
        return map;
      })
      .catch((err: unknown) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}

const VOWEL = /^(AA|AE|AH|AO|AW|AY|EH|ER|EY|IH|IY|OW|OY|UH|UW)$/;
const vowelsOf = (key: string) => key.split(" ").filter((p) => VOWEL.test(p)).join(" ");

/** The last word of a line, lowercased, without punctuation ("Tonight!" -> "tonight", "runnin'" -> "runnin'"). */
export function endWord(line: string): string {
  const words = line.replace(/[‘’ʼ]/g, "'").trim().split(/\s+/);
  const last = (words[words.length - 1] ?? "").toLowerCase();
  return last.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "").replace(/^'+/, "");
}

/** A word's rhyme sound: the dictionary's, else a dropped g's full word ("runnin'" -> "running"). */
function keyOf(word: string, keys: RhymeKeys): string | undefined {
  const w = word.replace(/'+$/, "");
  // A dropped g sings like the full word: try "running" for "runnin'" before the dictionary's own "runnin".
  const full = w.endsWith("in") && (word.endsWith("'") || !keys.has(w)) ? keys.get(`${w}g`) : undefined;
  return full ?? keys.get(word) ?? keys.get(w);
}

/** How two endings rhyme: 2 perfect, 1 near (same vowels from the stress on), 0 not. Unknown words: spelling. */
export function rhymeLevel(a: string, b: string, keys: RhymeKeys): 0 | 1 | 2 {
  if (!a || !b) return 0;
  if (a === b) return 2; // the same word: an identical rhyme, but it still ties the lines together
  const ka = keyOf(a, keys);
  const kb = keyOf(b, keys);
  if (ka && kb) {
    if (ka === kb) return 2;
    return vowelsOf(ka) === vowelsOf(kb) ? 1 : 0;
  }
  // Not in the dictionary (a name, a made-up word): the last three letters.
  return a.length >= 3 && b.length >= 3 && a.slice(-3) === b.slice(-3) ? 1 : 0;
}

export interface SchemeLine {
  text: string;
  word: string;
  /** "A", "B"…; "" for a line with no word. */
  letter: string;
  /** How it rhymes with the first line of its letter: 2 perfect, 1 near, 0 the first of its letter. */
  level: 0 | 1 | 2;
  /** True when no other line in the stanza shares its letter. */
  alone: boolean;
}

export interface Stanza {
  header: string | null;
  lines: SchemeLine[];
  scheme: string;
  name: string | null;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const isHeader = (line: string) => /^\s*\[.*\]\s*$/.test(line);

/** Splits lyrics into stanzas (blank lines and [Section] headers) and letters each line's ending. */
export function analyzeScheme(text: string, keys: RhymeKeys): Stanza[] {
  const stanzas: Stanza[] = [];
  let cur: Stanza | null = null;
  for (const raw of text.split("\n")) {
    if (!raw.trim()) {
      cur = null;
      continue;
    }
    if (isHeader(raw)) {
      cur = { header: raw.trim().slice(1, -1).trim(), lines: [], scheme: "", name: null };
      stanzas.push(cur);
      continue;
    }
    if (!cur) {
      cur = { header: null, lines: [], scheme: "", name: null };
      stanzas.push(cur);
    }
    cur.lines.push({ text: raw, word: endWord(raw), letter: "", level: 0, alone: true });
  }
  for (const s of stanzas) {
    const firsts: { letter: string; word: string }[] = [];
    for (const line of s.lines) {
      if (!line.word) continue;
      // The best match among the letters so far: perfect beats near, earlier beats later.
      let best: { letter: string; level: 0 | 1 | 2 } | null = null;
      for (const f of firsts) {
        const lv = rhymeLevel(line.word, f.word, keys);
        if (lv && (!best || lv > best.level)) best = { letter: f.letter, level: lv };
      }
      // Also against every earlier line of a letter (a B line may rhyme better with the second B).
      for (const other of s.lines) {
        if (other === line) break;
        if (!other.letter) continue;
        const lv = rhymeLevel(line.word, other.word, keys);
        if (lv && (!best || lv > best.level)) best = { letter: other.letter, level: lv };
      }
      if (best) {
        line.letter = best.letter;
        line.level = best.level;
      } else {
        const letter = LETTERS[firsts.length % 26];
        firsts.push({ letter, word: line.word });
        line.letter = letter;
      }
    }
    const counts = new Map<string, number>();
    for (const l of s.lines) if (l.letter) counts.set(l.letter, (counts.get(l.letter) ?? 0) + 1);
    for (const l of s.lines) l.alone = (counts.get(l.letter) ?? 0) < 2;
    s.scheme = s.lines.map((l) => l.letter || "-").join("");
    s.name = schemeName(s.scheme);
  }
  return stanzas.filter((s) => s.lines.length > 0);
}

/** The common names for a stanza's pattern, when it has one. */
export function schemeName(scheme: string): string | null {
  const names: Record<string, string> = {
    AA: "Couplet",
    AAA: "Triplet",
    ABA: "Enclosed tercet",
    AABB: "Couplets (AABB)",
    ABAB: "Alternate rhyme (ABAB)",
    ABCB: "Ballad stanza (ABCB)",
    ABBA: "Enclosed rhyme (ABBA)",
    AAAA: "Monorhyme (AAAA)",
    AABA: "Rubaiyat stanza (AABA)",
    AAAB: "AAAB",
    ABAC: "ABAC",
    AABBCC: "Couplets (AABBCC)",
    ABABCC: "ABABCC",
    AABBCCDD: "Couplets",
    ABABCDCD: "Alternate rhyme",
    ABCBDEFE: "Ballad stanzas",
  };
  if (names[scheme]) return names[scheme];
  if (scheme.length >= 4 && /^A+$/.test(scheme)) return "Monorhyme";
  if (scheme.length >= 4 && scheme.length % 2 === 0 && [...scheme].every((c, i) => i % 2 === 0 || c === scheme[i - 1]) && new Set(scheme).size === scheme.length / 2) return "Couplets";
  return null;
}
