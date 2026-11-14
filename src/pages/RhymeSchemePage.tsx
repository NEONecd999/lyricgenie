import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LandingPage } from "@/components/studio/Landing";
import { WEB_APP } from "@/lib/links";
import { analyzeScheme, loadRhymeKeys, type RhymeKeys } from "@/lib/rhymeScheme";
import { loadSyllableDict, syllableRange, type SyllableDict } from "@/lib/syllables";

/**
 * /rhyme-scheme-finder: paste lyrics or a poem, see each stanza's rhyme scheme (AABB, ABAB…) with the rhyming
 * endings coloured, near rhymes marked, and each line's syllables (SEO plan 2026-11-14). Same rhyme sounds as
 * the app (src/lib/rhymeScheme.ts). Works without signing in.
 */

const SAMPLE = `[Verse]
I walked alone into the night
Searching for a little light
The city hummed a broken tune
Beneath a cold and silver moon

[Chorus]
Hold me close, don't let me go
Every fire burns down slow
You're the reason, you're the rhyme
Stay with me one more time`;

// One colour per letter (A, B, C…), readable on the dark page.
const COLORS = ["#AB8EE2", "#F5B642", "#64A8FF", "#FF8A65", "#6FD08C", "#F06FA8", "#4FD1C5", "#E0C26A"];
const colorOf = (letter: string) => COLORS[(letter.charCodeAt(0) - 65) % COLORS.length];

function RhymeSchemeFinder() {
  const [text, setText] = useState(SAMPLE);
  const [keys, setKeys] = useState<RhymeKeys | null>(null);
  const [syl, setSyl] = useState<SyllableDict | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadRhymeKeys().then(setKeys, () => setFailed(true));
    loadSyllableDict().then(setSyl, () => {});
  }, []);

  const stanzas = useMemo(() => (keys ? analyzeScheme(text, keys) : []), [text, keys]);

  return (
    <section className="pb-20" aria-label="Rhyme scheme finder">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <label htmlFor="lyrics" className="text-sm font-semibold text-white">
                Your lyrics or poem
              </label>
              <button type="button" onClick={() => setText("")} className="text-sm text-white/55 hover:text-white">
                Clear
              </button>
            </div>
            <textarea
              id="lyrics"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your lyrics. Leave a blank line between verses."
              spellCheck={false}
              className="min-h-[220px] flex-1 resize-y bg-transparent px-4 py-3 font-sans text-[16px] leading-7 text-white placeholder:text-white/35 focus:outline-none md:min-h-[420px]"
            />
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04]" aria-live="polite">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm">
              <span className="font-semibold text-white">Rhyme scheme</span>
              {stanzas.length > 0 && <span className="font-mono text-white/55">{stanzas.map((s) => s.scheme).join(" · ")}</span>}
            </div>
            <div className="min-h-[160px] flex-1 overflow-y-auto px-4 py-3 md:max-h-[520px] md:min-h-[420px]">
              {failed ? (
                <p className="text-sm text-white/60">The rhyme dictionary didn't load. Check your connection and reload the page.</p>
              ) : !keys ? (
                <p className="text-sm text-white/50">Loading the rhyme dictionary…</p>
              ) : stanzas.length === 0 ? (
                <p className="text-sm text-white/50">Paste lyrics on the left to see their rhyme scheme.</p>
              ) : (
                <div className="space-y-5">
                  {stanzas.map((s, i) => (
                    <div key={i}>
                      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {s.header && <span className="text-xs font-bold uppercase tracking-wider text-[#F6ECC9]/80">{s.header}</span>}
                        <span className="font-mono text-sm font-bold tracking-[0.2em] text-white">{s.scheme}</span>
                        {s.name && <span className="text-xs text-white/55">{s.name}</span>}
                      </div>
                      <ol className="space-y-1">
                        {s.lines.map((l, j) => {
                          const c = colorOf(l.letter || "A");
                          const at = l.word ? l.text.toLowerCase().lastIndexOf(l.word) : -1;
                          const r = syl ? syllableRange(l.text, syl) : null;
                          return (
                            <li key={j} className="flex items-start gap-3">
                              <span
                                className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                                style={l.alone ? { border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.45)" } : { background: `${c}33`, color: c }}
                                title={l.alone ? "Doesn't rhyme with another line in this stanza" : l.level === 1 ? "Near rhyme" : undefined}
                              >
                                {l.letter || "–"}
                              </span>
                              <p className="min-w-0 flex-1 text-[15px] leading-7 text-white/80">
                                {at >= 0 ? (
                                  <>
                                    {l.text.slice(0, at)}
                                    <span className="font-semibold" style={l.alone ? undefined : { color: c }}>
                                      {l.text.slice(at, at + l.word.length)}
                                    </span>
                                    {l.text.slice(at + l.word.length)}
                                    {l.level === 1 && !l.alone && <span className="ml-1.5 text-xs text-white/45">near</span>}
                                  </>
                                ) : (
                                  l.text
                                )}
                              </p>
                              {r && <span className="mt-1 shrink-0 text-xs tabular-nums text-white/40" title="Syllables">{r.min === r.max ? r.min : `${r.min}–${r.max}`}</span>}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-white/55">
          Each stanza is lettered on its own: leave a blank line between verses, or name them like [Chorus]. The small number on the right is the line's syllable count.{" "}
          <a href={WEB_APP} className="text-[#F6ECC9] underline">
            See rhyme colors as you write in Lyric Genie
          </a>
          .
        </p>
      </div>
    </section>
  );
}

const RhymeSchemePage = () => (
  <LandingPage
    path="/rhyme-scheme-finder/"
    title="Rhyme Scheme Finder — Check Any Song or Poem Free | Lyric Genie"
    description="Free rhyme scheme finder: paste lyrics or a poem and see each verse's rhyme scheme (AABB, ABAB, ABCB), with rhymes colored and near rhymes marked."
    eyebrow="Free rhyme scheme finder"
    heading="Rhyme Scheme Finder"
    accent="for songs and poems."
    answer={<p>Paste your lyrics or a poem and see the rhyme scheme of every verse, with the rhyming words colored. Free, no sign-up, and it hears rhymes by sound, not spelling.</p>}
    tool={<RhymeSchemeFinder />}
    sections={[
      {
        title: "How to read a rhyme scheme",
        body: (
          <>
            <p>
              Each line gets a letter for the sound it ends on. The first ending is A, the next new sound is B, and any line that rhymes with an earlier one takes that line's letter. "Night, light, tune, moon" reads <strong>AABB</strong>.
            </p>
            <p>Lines that don't rhyme with anything else in the verse keep a letter of their own, shown without color, so "red, blue, sweet, you" reads ABCB.</p>
          </>
        ),
      },
      {
        title: "Common rhyme schemes in songs",
        body: (
          <ul>
            <li><strong>AABB (couplets):</strong> pairs of rhyming lines. Punchy and easy to sing along to.</li>
            <li><strong>ABAB (alternate rhyme):</strong> every other line rhymes. Keeps a verse moving.</li>
            <li><strong>ABCB (ballad stanza):</strong> only lines 2 and 4 rhyme. The most common verse shape in pop and folk, because it leaves room to say something before the rhyme lands.</li>
            <li><strong>AAAA (monorhyme):</strong> every line on the same sound. Strong in a hook or chorus.</li>
            <li><strong>ABBA (enclosed rhyme):</strong> the outer lines rhyme around a rhyming pair.</li>
          </ul>
        ),
      },
      {
        title: "Perfect and near rhymes",
        body: (
          <p>
            The finder hears rhymes by sound, using a pronouncing dictionary of over 120,000 words. "Night" and "light" are a perfect rhyme: everything from the stressed vowel on matches. "Night" and "time" are a near (slant) rhyme: the vowel matches but the consonant doesn't. Songs use near rhymes all the time, so they count, and they're marked "near". Find more for any word with the free <Link to="/rhyme-generator/">rhyme generator</Link>.
          </p>
        ),
      },
      {
        title: "Rhyme colors while you write",
        body: (
          <p>
            In <a href={WEB_APP}>Lyric Genie</a>, the songwriting app, rhyme colors light up the rhymes in every verse as you write, internal rhymes included, with the syllable count beside every line. Free on the web and iPhone. <Link to="/syllable-counter/">Syllable counter</Link> · <Link to="/rhymes-with/">Rhymes A–Z</Link>
          </p>
        ),
      },
    ]}
    faqs={[
      ["Is the rhyme scheme finder free?", "Yes. It's free with no sign-up, and it runs in your browser, so your lyrics aren't sent anywhere."],
      ["What does ABCB mean?", "Lines 2 and 4 rhyme with each other, and lines 1 and 3 don't rhyme with anything. It's called a ballad stanza, and it's the most common verse shape in songs."],
      ["Does it count slant rhymes?", "Yes. Near (slant) rhymes, where the vowel matches but the consonant doesn't, count as rhymes and are marked “near”."],
      ["Why does each verse start again at A?", "Rhyme schemes are usually read one stanza at a time. Leave a blank line between verses, or name them like [Chorus], and each gets its own scheme."],
      ["Does it work for poems?", "Yes. It works for any English text in lines: song lyrics, poems, raps and limericks."],
    ]}
  />
);

export default RhymeSchemePage;
