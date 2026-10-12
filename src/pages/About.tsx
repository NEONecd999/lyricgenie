import { Eyebrow, FinalCTA, Glow, Reveal, StudioPage } from "@/components/studio/Studio";

/** /about: who built it and why, short. The rest of the site carries the features. */
const About = () => (
  <StudioPage
    current="/about/"
    title="About — Lyric Genie"
    description="Lyric Genie was built by Edan Dover, an LA producer and songwriter and one half of The Score, as the songwriting tool he always needed."
  >
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <Glow className="left-1/2 top-[-240px] h-[620px] w-[1000px] -translate-x-1/2" strength={28} />
      <div className="container relative z-10 mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <Eyebrow>About</Eyebrow>
          <h1 className="font-display text-[42px] font-bold leading-[1.05] tracking-tight text-white md:text-[58px]">
            Built by a songwriter, <span className="text-[#F6ECC9]">for songwriters.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <img
            src="/lovable-uploads/25d869a9-59be-49cc-afa7-9343c0f9f5b6.jpg"
            alt="Edan Dover"
            className="size-40 shrink-0 rounded-3xl object-cover object-top ring-1 ring-white/10 md:size-44"
          />
          <div className="space-y-5 text-[17px] leading-relaxed text-white/75">
            <p className="text-white">
              Hey, I'm Edan Dover. I'm a producer and songwriter in Los Angeles, and one half of the multi-platinum band <strong>The Score</strong>.
            </p>
            <p>
              After thousands of sessions, I kept hitting the same wall: the tools weren't built for how songs actually get written. Back-to-back sessions, co-writers in the room and on the phone,
              ideas that disappear if you don't catch them.
            </p>
            <p>
              So I built the one I wanted. One place for the song and everyone on it, a rhyme engine that thinks like a writer, and AI that helps when you ask and stays quiet when you don't. The
              words, and every decision, stay yours.
            </p>
            <p className="font-display text-xl text-[#F6ECC9]">— Edan</p>
          </div>
        </Reveal>
      </div>
    </section>
    <FinalCTA />
  </StudioPage>
);

export default About;
