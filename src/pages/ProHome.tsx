import { ArrowRight, Check } from "lucide-react";
import { FeatureKeyframes } from "@/components/Features";
import { AllInOneMock, BrowserArt, LiveMasterMock, FinalCTA, Head, Hero, More, PhoneArt, Pricing, Reveal, Row, Scaled, StudioPage, Testimonials, ToolsTabs } from "@/components/studio/Studio";

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
        {/* One section, not two intros: the apps a song is scattered across become one studio, and the
            studio's two ways in follow straight on. */}
        <Head
          center
          eyebrow="One studio"
          title={
            <>
              Eight apps, <span className="text-[#F6ECC9]">all in one.</span>
            </>
          }
          lead="All the apps songwriters juggle, no longer scattered in different places. Your lyrics, ideas, voice memos, rhymes, AI help, files, conversations and video sessions live together, right in the song."
        />
        <div className="mt-8">
          <AllInOneMock />
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          <AppCard href="/web/" eyebrow="On your computer" title="Lyric Genie for the web" points={["A full workspace in your browser", "Co-write live, every writer on a tab", "Live sessions, with your DAW"]} cta="Explore the web app">
            <div className="w-full">
              <Scaled w={580} h={300}>
                <BrowserArt />
              </Scaled>
            </div>
          </AppCard>
          <AppCard href="/iphone/" eyebrow="On your iPhone" title="Lyric Genie for iPhone" points={["Catch ideas the moment they land", "Chats and live sessions with your collaborators", "Freestyle a melody into lyrics"]} cta="Explore the iPhone app">
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
          eyebrow={
            <span className="inline-flex items-center gap-2">
              Live editing <span className="rounded-full bg-[#30D158]/15 px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#30D158]">New</span>
            </span>
          }
          tint="rgba(232,102,60,.22)"
          title={
            <>
              Write together, <span className="text-[#F6ECC9]">live.</span>
            </>
          }
          text="One shared version of the song that everyone writes in at once, like a shared doc, with every writer's cursor in their colour. Plus a tab of your own to try ideas first. On the web or iPhone."
        >
          {() => <LiveMasterMock />}
        </Row>
      </div>
    </section>
  );
}

const ProHome = () => (
  <StudioPage title="Lyric Genie — The Songwriting Studio and Lyric Writing App" description="Lyric Genie is a songwriting app for writing lyrics, co-writing live and recording ideas, in your browser on Mac or PC and on iPhone. Rhymes and AI help built in.">
    <FeatureKeyframes />
    <Hero />
    <TwoWays />
    <CoWriting />
    <Testimonials />
    <ToolsTabs
      variant="home"
      eyebrow="Tools that help"
      title={
        <>
          Help when you ask. <span className="text-[#F6ECC9]">Your words stay yours.</span>
        </>
      }
    />
    <More
      eyebrow="The details"
      keys={["versions", "alternates", "notes", "sheets", "siri", "blanks"]}
      title={
        <>
          We thought of <span className="text-[#F6ECC9]">everything.</span>
        </>
      }
    />
    <Pricing />
    <FinalCTA />
  </StudioPage>
);

export default ProHome;
