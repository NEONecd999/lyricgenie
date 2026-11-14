import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LandingPage } from "@/components/studio/Landing";
import { WEB_APP } from "@/lib/links";
import { loadSyllableDict, wordCounts, type SyllableDict, type WordCount } from "@/lib/syllables";

/**
 * /syllable-counter: a free syllable counter for lyrics (SEO plan 2026-11-14, "syllable counter" 27k/mo).
 * Counts like the app's editor (src/lib/syllables.ts), line by line, with sung ranges ("fire" 1-2).
 * Works without signing in; the dictionary loads after the page shows.
 */

const SAMPLE = `[Verse]
I became another stranger
No way that I could be forgiven
Oh what have I done
Now I'm lost, like a ghost,
bleeding out for your love

[Chorus]
Every fire I been feeding
burns a little higher every night`;

const isHeader = (line: string) => /^\s*\[.*\]\s*$/.test(line);

function sum(words: WordCount[]) {
  return words.reduce((t, w) => ({ count: t.count + w.count, min: t.min + w.min, max: t.max + w.max }), { count: 0, min: 0, max: 0 });
}

const span = (min: number, max: number) => (min === max ? `${min}` : `${min}–${max}`);

function SyllableCounter() {
  const [text, setText] = useState(SAMPLE);
  const [dict, setDict] = useState<SyllableDict | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadSyllableDict().then(setDict, () => setFailed(true));
  }, []);

  const lines = useMemo(
    () =>
      text.split("\n").map((line) => {
        if (!line.trim()) return { kind: "gap" as const };
        if (isHeader(line)) return { kind: "header" as const, line: line.trim() };
        const words = dict ? wordCounts(line, dict).filter((w) => w.max > 0) : [];
        return { kind: "line" as const, line, words, total: sum(words) };
      }),
    [text, dict],
  );
  const counted = lines.filter((l) => l.kind === "line");
  const total = counted.reduce((t, l) => (l.kind === "line" ? { min: t.min + l.total.min, max: t.max + l.total.max } : t), { min: 0, max: 0 });
  const words = counted.reduce((n, l) => n + (l.kind === "line" ? l.words.length : 0), 0);

  return (
    <section className="pb-20" aria-label="Syllable counter">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <label htmlFor="lyrics" className="text-sm font-semibold text-white">
                Your lyrics
              </label>
              <button type="button" onClick={() => setText("")} className="text-sm text-white/55 hover:text-white">
                Clear
              </button>
            </div>
            <textarea
              id="lyrics"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your lyrics, one line per line."
              spellCheck={false}
              className="min-h-[220px] flex-1 resize-y bg-transparent px-4 py-3 font-sans text-[16px] leading-7 text-white placeholder:text-white/35 focus:outline-none md:min-h-[420px]"
            />
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04]" aria-live="polite">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm">
              <span className="font-semibold text-white">Syllables per line</span>
              {dict && counted.length > 0 && (
                <span className="text-white/55">
                  {span(total.min, total.max)} syllables · {words} words · {counted.length} lines
                </span>
              )}
            </div>
            <div className="min-h-[160px] flex-1 overflow-y-auto px-4 py-3 md:max-h-[520px] md:min-h-[420px]">
              {failed ? (
                <p className="text-sm text-white/60">The dictionary didn't load. Check your connection and reload the page.</p>
              ) : !dict ? (
                <p className="text-sm text-white/50">Loading the dictionary…</p>
              ) : counted.length === 0 ? (
                <p className="text-sm text-white/50">Type or paste lyrics on the left and each line's count shows here.</p>
              ) : (
                <ol className="space-y-1">
                  {lines.map((l, i) =>
                    l.kind === "gap" ? (
                      <li key={i} className="h-3" aria-hidden />
                    ) : l.kind === "header" ? (
                      <li key={i} className="pt-1 text-xs font-bold uppercase tracking-wider text-[#F6ECC9]/80">
                        {l.line}
                      </li>
                    ) : (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex h-7 min-w-[2.5rem] shrink-0 items-center justify-center rounded-full px-2 text-sm font-bold tabular-nums ${l.total.min === l.total.max ? "bg-[#AB8EE2]/20 text-[#D9C9F6]" : "bg-[#F6ECC9]/15 text-[#F6ECC9]"}`}
                          title={l.total.min === l.total.max ? `${l.total.count} syllables` : `${l.total.min} to ${l.total.max} syllables, depending on how it's sung`}
                        >
                          {span(l.total.min, l.total.max)}
                        </span>
                        <p className="flex flex-wrap gap-x-2 gap-y-0.5 text-[15px] leading-7 text-white/85">
                          {l.words.map((w, j) => (
                            <span key={j} className="whitespace-nowrap">
                              {w.text}
                              <sup className={`ml-0.5 text-[10px] font-semibold ${w.min === w.max ? "text-white/40" : "text-[#F6ECC9]"}`}>{span(w.min, w.max)}</sup>
                            </span>
                          ))}
                        </p>
                      </li>
                    ),
                  )}
                </ol>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-white/55">
          Gold counts can be sung more than one way, like “fire” (1 or 2). Lines in [brackets] are section names and aren't counted.{" "}
          <a href={WEB_APP} className="text-[#F6ECC9] underline">
            See counts beside every line as you write in Lyric Genie
          </a>
          .
        </p>
      </div>
    </section>
  );
}

const SyllableCounterPage = () => (
  <LandingPage
    path="/syllable-counter/"
    title="Syllable Counter for Lyrics — Free, Line by Line | Lyric Genie"
    description="Free syllable counter for song lyrics and poems. Paste your lines and see the syllables in each line and word, including words that can be sung two ways."
    eyebrow="Free syllable counter"
    heading="Syllable Counter"
    accent="for lyrics."
    answer={<p>Paste your lyrics and see how many syllables are in every line and every word. Free, no sign-up, and it counts the way songs are sung.</p>}
    tool={<SyllableCounter />}
    sections={[
      {
        title: "How the syllable counter works",
        body: (
          <>
            <p>
              Each word is looked up in a pronouncing dictionary of over 120,000 English words, the same one the{" "}
              <Link to="/">Lyric Genie songwriting app</Link> uses. Words that aren't in it, like slang and words with a dropped g ("runnin'"), are worked out from the words they come from, so "tryin'" counts like "trying" and "situationship" counts like "situation" plus "ship".
            </p>
            <p>A line's count is the sum of its words. Section names in brackets, like [Chorus], are skipped.</p>
          </>
        ),
      },
      {
        title: "Why some counts are a range",
        body: (
          <p>
            Some words don't have one fixed count when they're sung. "Fire" can be one syllable or two, "every" two or three, "our" one or two. The counter shows these in gold with both counts, so a line might read 7–8. That range is the room you have when you fit the line to a melody.
          </p>
        ),
      },
      {
        title: "Why syllables matter in songwriting",
        body: (
          <>
            <p>
              A melody has a set number of notes, so lines sung to the same melody usually want the same number of syllables, or close to it. When the second verse has three more syllables than the first, the singer has to cram them in. Counting shows you where.
            </p>
            <ul>
              <li><strong>Match your verses.</strong> Line 1 of verse 2 against line 1 of verse 1.</li>
              <li><strong>Keep the chorus consistent</strong> when you change a word.</li>
              <li><strong>Check a rewrite</strong> still fits before you sing it.</li>
            </ul>
          </>
        ),
      },
      {
        title: "Counts beside every line, while you write",
        body: (
          <p>
            In <a href={WEB_APP}>Lyric Genie</a> the syllable count sits beside every line as you write, on the web and on iPhone, with rhymes, a thesaurus and help fitting a line to a count built in. It's free to start. <Link to="/rhyme-app-for-songwriters/">Rhymes for songwriters</Link> · <Link to="/pricing/">Pricing</Link>
          </p>
        ),
      },
    ]}
    faqs={[
      ["Is the syllable counter free?", "Yes. It's free with no sign-up and no limit, and it runs in your browser, so your lyrics aren't sent anywhere."],
      ["How accurate is it?", "It uses a pronouncing dictionary of over 120,000 words, so dictionary words are counted as they're pronounced, not guessed from their spelling. Made-up words and names fall back to an estimate."],
      ["Why does a line show two numbers?", "Some words can be sung with a different number of syllables, like “fire” (1 or 2) or “every” (2 or 3). The line shows the lowest and highest count."],
      ["Does it work for poems and haiku?", "Yes. It counts any English text line by line, so it works for poems, haiku and raps as well as songs."],
      ["Can I see counts while I write songs?", "Yes. Lyric Genie, a songwriting app for the web and iPhone, shows the syllable count beside every line as you write."],
    ]}
  />
);

export default SyllableCounterPage;
