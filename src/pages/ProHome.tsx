import { ArrowRight, Check } from "lucide-react";
import { FeatureKeyframes } from "@/components/Features";
import { BrowserArt, CoWriteMock, FinalCTA, Glow, Head, Hero, PhoneArt, Pricing, Reveal, Row, Scaled, StudioPage, Testimonials, RhymeColumnsMock, ToolsTabs } from "@/components/studio/Studio";

/**
 * /pro: the new home page (to become /). The pitch in half a minute: the studio on both devices, a door
 * to each app's page, co-writing (the "Figma for songwriting" claim), the rhyme engine, proof and price.
 * The features live on /web and /iphone.
 */

/** A door to one app's page: what it is, three reasons, a small picture of it. */
function AppCard({ href, eyebrow, title, points, cta, children }: { href: string; eyebrow: string; title: string; points: string[]; cta: string; children: React.ReactNode }) {
  return (
    <Reveal className="h-full">
      <a href={href} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1B] transition-colors hover:border-white/25">
        <div className="relative flex h-64 items-start justify-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#2A1D3A] to-[#1B1B1B] px-8 pt-8">{children}</div>
        <div className="flex flex-1 flex-col p-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#AB8EE2]">{eyebrow}</p>
          <p className="mt-2 font-display text-[28px] font-bold leading-tight tracking-tight text-white">{title}</p>
          <ul className="mt-4 space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px] text-white/75">
                <Check className="mt-0.5 size-4 shrink-0 text-[#AB8EE2]" />
                {p}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#F6ECC9]">
            {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function TwoWays() {
  return (
    <section className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head
          center
          eyebrow="One studio, two ways in"
          title={
            <>
              At your desk. <span className="text-[#F6ECC9]">On the go.</span>
            </>
          }
          lead="The same songs, synced live. Start a line on your phone, finish the song at your desk."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          <AppCard href="/web/" eyebrow="On your computer" title="Lyric Genie for the web" points={["A full workspace in your browser", "Co-write live, every writer on a tab", "Sessions with video and your DAW"]} cta="Explore the web app">
            <div className="w-full">
              <Scaled w={580} h={300}>
                <BrowserArt />
              </Scaled>
            </div>
          </AppCard>
          <AppCard href="/iphone/" eyebrow="On your iPhone" title="Lyric Genie for iPhone" points={["Catch ideas the moment they land", "Freestyle a melody into lyrics", "Also on iPad and Mac"]} cta="Explore the iPhone app">
            <div className="w-[170px]">
              <PhoneArt />
            </div>
          </AppCard>
        </div>
      </div>
    </section>
  );
}

function CoWriting() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Row
          eyebrow="Co-write in real time"
          tint="rgba(232,102,60,.22)"
          title={
            <>
              Every writer <span className="text-[#F6ECC9]">gets a tab.</span>
            </>
          }
          text="Try ideas on your own tab, agree on the Master, leave notes on the words. See who's here and where they're typing, on the web or iPhone."
        >
          {() => <CoWriteMock />}
        </Row>
      </div>
    </section>
  );
}

function RhymeTeaser() {
  return (
    <section className="lg-mock-dark relative overflow-hidden bg-[#170E1C] py-24">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="w-full max-w-md justify-self-center">
          <Head
            eyebrow="RhymeGold"
            title={
              <>
                The rhyme engine <span className="text-[#F6ECC9]">inside.</span>
              </>
            }
            lead="Multi-syllable, slant and phrase rhymes from 135,000 words and phrases. The same engine runs free at RhymeGold.com."
          />
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a href="/rhyme-engine/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F6ECC9]">
              How it works <ArrowRight className="size-4" />
            </a>
            <a href="https://rhymegold.com" className="text-sm font-semibold text-white/60 hover:text-white">
              Try RhymeGold free
            </a>
          </div>
        </div>
        <Reveal delay={0.1} className="relative flex w-full max-w-[520px] justify-center justify-self-center">
          <Glow className="inset-[-8%_-4%] opacity-60" strength={20} />
          <div className="relative z-10 w-full max-w-[520px]">
            <RhymeColumnsMock aiPicks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const ProHome = () => (
  <StudioPage title="Lyric Genie — The Songwriting Studio" description="Write, co-write and record, at your desk and on your iPhone. The professional songwriting workspace, with the iPhone app as its partner.">
    <FeatureKeyframes />
    <Hero />
    <TwoWays />
    <CoWriting />
    <ToolsTabs
      variant="home"
      eyebrow="Tools that help"
      title={
        <>
          Help when you ask. <span className="text-[#F6ECC9]">Your words stay yours.</span>
        </>
      }
    />
    <RhymeTeaser />
    <Testimonials />
    <Pricing />
    <FinalCTA />
  </StudioPage>
);

export default ProHome;
