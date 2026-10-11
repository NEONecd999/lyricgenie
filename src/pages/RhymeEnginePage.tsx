import { ArrowRight, AudioLines, BookOpen, Quote, Sparkles } from "lucide-react";
import { FeatureKeyframes } from "@/components/Features";
import { Eyebrow, FinalCTA, Glow, Head, Reveal, RhymeSlidesMock, StudioPage, Window } from "@/components/studio/Studio";

/**
 * /rhyme-engine: the rhyme technology behind Lyric Genie, the same engine that runs free at
 * RhymeGold.com. Gold. Facts from RhymeGold's own credits (public/rhymegold) and /rhymes.
 */

const RHYMEGOLD = "https://rhymegold.com";

function RhymeHero() {
  return (
    <section className="lg-mock-dark relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
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

function HowItWorks() {
  const items: [typeof AudioLines, string, string][] = [
    [AudioLines, "Phonetic, not spelling", "Every word is matched by its sounds, from the CMU Pronouncing Dictionary. \"Through\" rhymes with \"blue\", not \"rough\"."],
    [Sparkles, "Multi-syllable and slant", "Rhymes across two and three syllables, and near rhymes when a perfect one won't do. Slant rhymes are a switch away."],
    [Quote, "Phrases, not just words", "Phrase rhymes drawn from how 5,646 songs use language (statistics only; no lyrics are kept), plus idioms from Wiktionary."],
    [BookOpen, "Free, fast, no sign-up", "RhymeGold runs in your browser and works as you type. No account needed."],
  ];
  return (
    <section className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="How it works" title="A rhyming dictionary built for songwriters." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map(([Icon, title, text], i) => (
            <Reveal key={title} delay={(i % 2) * 0.06} className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
              <Icon className="size-5 text-[var(--acc)]" />
              <p className="mt-3 text-lg font-semibold text-white">{title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inside() {
  return (
    <section id="inside" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Head
          center
          eyebrow="Inside Lyric Genie"
          title={
            <>
              The same engine, <span className="text-[#F6ECC9]">right in your song.</span>
            </>
          }
          lead="Select any word in Lyric Genie, on the web or iPhone, and RhymeGold's rhymes are there. In the app, AI Picks highlights the ones that fit your song's mood, theme and lyrics so far."
        />
        <Reveal className="mx-auto mt-12 max-w-5xl">
          <Window>
            <img src="/images/web/rhymes.jpg" alt="Rhymes for a selected word in the Lyric Genie web app" width={1920} height={1200} loading="lazy" className="block w-full" />
          </Window>
        </Reveal>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/web/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F6ECC9]">
            Lyric Genie for the web <ArrowRight className="size-4" />
          </a>
          <a href="/iphone/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F6ECC9]">
            Lyric Genie for iPhone <ArrowRight className="size-4" />
          </a>
        </div>
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
    <Inside />
    <FinalCTA />
  </StudioPage>
);

export default RhymeEnginePage;
