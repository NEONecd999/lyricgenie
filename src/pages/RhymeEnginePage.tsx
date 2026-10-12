import { ArrowRight, Sparkles } from "lucide-react";
import { FeatureKeyframes } from "@/components/Features";
import { Eyebrow, FinalCTA, Glow, Head, Reveal, RhymeColumnsMock, RhymeSlidesMock, StudioPage } from "@/components/studio/Studio";

/**
 * /rhyme-engine: the rhyme technology behind Lyric Genie, the same engine that runs free at
 * RhymeGold.com. Gold. Facts from RhymeGold's own credits (public/rhymegold) and /rhymes.
 */

const RHYMEGOLD = "https://rhymegold.com";

function RhymeHero() {
  return (
    <section className="lg-mock-dark relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <Glow className="left-[-140px] top-[-160px] h-[560px] w-[560px]" strength={30} />
      <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <Eyebrow>RhymeGold · the rhyme engine</Eyebrow>
          <h1 className="font-display text-[46px] font-bold leading-[1.03] tracking-tight text-white md:text-[64px]">
            Rhymes that <span className="text-[#F6ECC9]">sound right.</span>
          </h1>
          <p className="mt-5 text-lg text-white/70">Built on how words sound, not how they're spelled. 135,000 words and phrases, with the multi-syllable and slant rhymes songs actually use.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a href={RHYMEGOLD} className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-7 py-3.5 text-[15.5px] font-semibold text-[#6F50B8] hover:bg-[#FBF2D6]">
              Try RhymeGold free <ArrowRight className="size-5" />
            </a>
            <a href="#inside" className="text-sm font-semibold text-white/70 hover:text-white sm:self-center">
              It's built into Lyric Genie ↓
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="relative mx-auto w-full max-w-[520px]">
          <RhymeSlidesMock />
        </Reveal>
      </div>
    </section>
  );
}

const A = "#64A8FF";
const B = "#FF8A65";

/** One syllable: stressed ones carry their anchor's colour and label; weak ones are plain. */
function Syl({ text, anchor }: { text: string; anchor?: "A" | "B" }) {
  const c = anchor === "A" ? A : anchor === "B" ? B : null;
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span
        className="rounded-lg px-2 py-1 text-[15px] font-semibold"
        style={c ? { color: c, background: `${c}1f`, boxShadow: `inset 0 0 0 1.5px ${c}` } : { color: "rgba(242,237,228,0.55)", background: "rgba(255,255,255,0.05)" }}
      >
        {text}
      </span>
      <span className="h-3 text-[10px] font-bold" style={{ color: c ?? "rgba(255,255,255,0.35)" }}>
        {anchor ?? "•"}
      </span>
    </span>
  );
}

/** The column shapes, each with a real result for "highway" spelled out by syllable. */
const SHAPES: { label: string; what: string; example: { text: string; anchor?: "A" | "B" }[] }[] = [
  { label: "A", what: "rhymes with the first stressed syllable", example: [{ text: "fly", anchor: "A" }] },
  { label: "B", what: "rhymes with the second", example: [{ text: "day", anchor: "B" }] },
  { label: "A B", what: "both, side by side", example: [{ text: "drive", anchor: "A" }, { text: "way", anchor: "B" }] },
  { label: "A • B", what: "both, one syllable between", example: [{ text: "by", anchor: "A" }, { text: "the" }, { text: "way", anchor: "B" }] },
  { label: "A • • B", what: "both, two or more between", example: [{ text: "like", anchor: "A" }, { text: "ev" }, { text: "ery" }, { text: "day", anchor: "B" }] },
];

/**
 * "highway" as the engine reads it: the word split into syllables, each syllable's phonemes under it
 * (CMU notation; the numbers mark stress), the stressed vowels lit as A and B, and the dictionary entry
 * they came from. Phonemes from the real engine (public/rhymes, 2026-10-11).
 */
function Phonetics() {
  const syllables: { text: string; phones: { p: string; stress?: string }[]; anchor: "A" | "B" }[] = [
    { text: "high", phones: [{ p: "HH" }, { p: "AY", stress: "1" }], anchor: "A" },
    { text: "way", phones: [{ p: "W" }, { p: "EY", stress: "2" }], anchor: "B" },
  ];
  return (
    <div className="flex w-full flex-col items-center">
      {/* The word, by syllable */}
      <p className="flex items-baseline gap-2 font-display text-[44px] font-bold leading-none sm:gap-3 sm:text-[56px] md:text-[72px]">
        {syllables.map((sy, i) => (
          <span key={sy.text} className="flex items-baseline gap-3">
            {i > 0 && <span className="text-[32px] text-white/25 sm:text-[40px]">·</span>}
            <span style={{ color: sy.anchor === "A" ? A : B }}>{sy.text}</span>
          </span>
        ))}
      </p>
      <p className="mt-2 text-sm text-white/45">2 syllables · both stressed</p>
      {/* Each syllable's sounds */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {syllables.map((sy) => {
          const c = sy.anchor === "A" ? A : B;
          return (
            <div key={sy.text} className="flex flex-col items-center gap-2">
              <div className="flex gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono">
                {sy.phones.map((x) => (
                  <span
                    key={x.p}
                    className="rounded-md px-2 py-1 text-[17px]"
                    style={x.stress ? { color: c, background: `${c}1f`, boxShadow: `inset 0 0 0 1.5px ${c}` } : { color: "rgba(242,237,228,0.55)" }}
                  >
                    {x.p}
                    {x.stress && <sup className="ml-px text-[11px]">{x.stress}</sup>}
                  </span>
                ))}
              </div>
              <span className="text-[12px] font-bold" style={{ color: c }}>
                {sy.anchor} · stressed {sy.anchor === "A" ? "“eye”" : "“ay”"}
              </span>
            </div>
          );
        })}
      </div>
      {/* Where the sounds came from */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl bg-black/25 px-4 py-2.5 font-mono text-[13px]">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">CMU Pronouncing Dictionary</span>
        <span className="text-white/80">
          HIGHWAY&nbsp;&nbsp;HH <span style={{ color: A }}>AY1</span> W <span style={{ color: B }}>EY2</span>
        </span>
        <span className="font-sans text-[12px] font-semibold text-[#30D158]">✓ match</span>
      </div>
    </div>
  );
}

/** One step of how it works: its number on the connecting line, the words, and the picture beside them. */
function Step({ n, title, text, last = false, children }: { n: number; title: string; text: React.ReactNode; last?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-5 md:grid-cols-[56px_minmax(0,1fr)] md:gap-x-8">
      {/* The number, and the line on to the next step */}
      <div className="relative flex justify-center">
        <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-[var(--acc)] bg-[#170E1C] font-display text-lg font-bold text-[var(--acc)] md:size-12 md:text-xl">{n}</span>
        {!last && <span className="absolute bottom-[-4rem] top-12 w-px bg-gradient-to-b from-[var(--acc)] to-white/10" aria-hidden />}
      </div>
      <Reveal className={`grid items-center gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12 ${last ? "" : "pb-16"}`}>
        <div className="pt-1.5">
          <p className="text-2xl font-semibold text-white md:text-[28px]">{title}</p>
          <div className="mt-2 text-[16px] leading-relaxed text-white/60">{text}</div>
        </div>
        <div className="min-w-0">{children}</div>
      </Reveal>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="bg-[#170E1C] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Head
          center
          eyebrow="How it works"
          title={
            <>
              Two stressed syllables. <span className="text-[#F6ECC9]">135,000 places to land.</span>
            </>
          }
          lead="A rhyme lives in the stressed syllables. RhymeGold finds them, then searches every word and phrase for the same sounds in the same shape."
        />
        <div className="mx-auto mt-16 max-w-6xl">
          <Step n={1} title="Find the stresses" text="It looks your word or phrase up in the CMU Pronouncing Dictionary, splits it into syllables and sounds, and finds the stressed vowels that carry the rhyme: A and B.">
            <Phonetics />
          </Step>
          <Step
            n={2}
            title="Match by sound"
            text={
              <>
                Every word and phrase is matched on those vowels and what follows them, never on spelling, so <span className="text-white">“through”</span> rhymes with{" "}
                <span className="text-white">“blue”</span>, not <span className="text-white">“rough”</span>. Near and slant rhymes too, when a perfect one won't do.
              </>
            }
          >
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-[64px] font-bold leading-none text-[#F6ECC9] md:text-[88px]">135,000</span>
              <span className="mt-2 text-lg text-white/70">words and phrases</span>
            </div>
          </Step>
          <Step n={3} last title="Sort by shape" text="Results land in columns by where the rhymes fall: on A, on B, or on both, with nothing, one, or two or more syllables between. Here's one from each for highway.">
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {SHAPES.map((sh) => (
                <div key={sh.label} className="grid items-center gap-x-4 gap-y-2 py-3.5 sm:grid-cols-[84px_minmax(0,1fr)_auto]">
                  <span className="font-mono text-[15px] font-bold text-white">{sh.label}</span>
                  <span className="text-[15px] text-white/55">{sh.what}</span>
                  <span className="flex items-end gap-1.5">
                    {sh.example.map((x, i) => (
                      <Syl key={i} text={x.text} anchor={x.anchor} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </Step>
        </div>
        <p className="mx-auto mt-14 max-w-xl text-center text-sm text-white/50">
          Free at RhymeGold.com, in your browser as you type. No sign-up.
        </p>
      </div>
    </section>
  );
}

/** "Night Ride" as AI Picks reads it: what the song is about, so the picks fit. */
function SongContext() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-4">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
        <Sparkles className="size-3 text-[#AB8EE2]" /> Reading your song
      </p>
      <div className="mt-2.5 grid grid-cols-3 gap-2 text-[11px]">
        {[
          ["Title", "Night Ride"],
          ["Mood", "Cinematic, late-night"],
          ["Theme", "Chasing a ghost down the highway"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/[0.05] px-2.5 py-2">
            <p className="text-white/40">{k}</p>
            <p className="mt-0.5 leading-snug text-[#F2EDE4]">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 rounded-lg bg-white/[0.05] px-2.5 py-2 font-serif text-[12px] not-italic leading-snug text-white/60">
        I became another stranger / No way that I could be forgiven / Now I'm lost, like a ghost…
      </p>
    </div>
  );
}

function AiPicks() {
  const steps: [string, string][] = [
    ["Every rhyme first", "The engine's full columns."],
    ["Read against your song", "Its mood, story and lyrics so far."],
    ["Picks, with a reason", "A sparkle and a line on why."],
  ];
  return (
    <section id="inside" className="relative overflow-hidden py-24 md:py-32">
      <Glow className="right-[-200px] top-20 h-[520px] w-[700px]" strength={16} />
      <div className="container relative z-10 mx-auto px-6">
        <Head
          center
          eyebrow="AI Picks · in Lyric Genie"
          title={
            <>
              Not just rhymes. <span className="text-[#F6ECC9]">The ones that fit your song.</span>
            </>
          }
          lead="AI Picks highlights the rhymes that suit the song you're writing."
        />
        <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <ol className="space-y-7">
            {steps.map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.06} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#AB8EE2]/60 font-display text-base font-bold text-[#AB8EE2]">{i + 1}</span>
                <span>
                  <span className="block text-lg font-semibold text-white">{title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-white/60">{text}</span>
                </span>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="pl-[52px] text-sm text-white/45">
              Automatic, and free plans included.
            </Reveal>
          </ol>
          <Reveal delay={0.1} className="flex flex-col items-center gap-3">
            <SongContext />
            <span className="text-white/30" aria-hidden>
              ↓
            </span>
            <RhymeColumnsMock aiPicks />
          </Reveal>
        </div>
        {/* Where it is */}
        <Reveal className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-5 border-t border-white/10 pt-10 text-center">
          <p className="text-[15px] text-white/65">
            Only in <span className="font-semibold text-white">Lyric Genie, on the web and iPhone</span>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="/web/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F6ECC9]">
              Lyric Genie for the web <ArrowRight className="size-4" />
            </a>
            <a href="/iphone/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F6ECC9]">
              Lyric Genie for iPhone <ArrowRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const RhymeEnginePage = () => (
  <StudioPage
    current="/rhyme-engine/"
    accent="#F5B642"
    glow="#C9932E"
    title="RhymeGold — The Rhyme Engine Behind Lyric Genie"
    description="RhymeGold is a phonetic rhyming dictionary for songwriters: 135,000 words and phrases, multi-syllable, slant and phrase rhymes. Free at RhymeGold.com, and built into Lyric Genie."
  >
    <FeatureKeyframes />
    <RhymeHero />
    <HowItWorks />
    <AiPicks />
    <FinalCTA />
  </StudioPage>
);

export default RhymeEnginePage;
