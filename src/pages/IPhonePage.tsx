import { FeatureKeyframes, FreestyleSpotlight } from "@/components/Features";
import { AppStoreCTA, CaptureMock, RecordingsMock, ChatMock, Eyebrow, FinalCTA, Glow, Head, PerformMock, PhoneArt, Reveal, Row, StudioPage, ToolsTabs } from "@/components/studio/Studio";
import { WEB_SIGNUP } from "@/lib/links";

/** /iphone: Lyric Genie for iPhone, iPad and Mac. Warm coral, the mobile side's colour. */

function IPhoneHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
      <Glow className="left-[-140px] top-[-160px] h-[560px] w-[560px]" strength={34} />
      <Glow className="bottom-[-220px] right-[-140px] h-[560px] w-[560px]" strength={18} />
      <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <Eyebrow>Lyric Genie for iPhone, iPad &amp; Mac</Eyebrow>
          <h1 className="font-display text-[46px] font-bold leading-[1.03] tracking-tight text-white md:text-[68px]">
            Your studio, <span className="text-[#F6ECC9]">in your pocket.</span>
          </h1>
          <p className="mt-5 text-lg text-white/70 md:text-xl">Catch the line in the car and the melody on a walk. It's on your desk when you sit down.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <AppStoreCTA>Download on the App Store</AppStoreCTA>
            <a href={WEB_SIGNUP} className="text-sm font-semibold text-white/70 hover:text-white sm:self-center">
              Or start in your browser
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center">
          <div className="w-[250px]" style={{ animation: "lgFloatFront 6s ease-in-out infinite" }}>
            <style>{`@keyframes lgFloatFront { 0%,100% { transform: translateY(0) rotate(2deg) } 50% { transform: translateY(-12px) rotate(2deg) } }`}</style>
            <PhoneArt />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The phone's moments: catching an idea, Freestyle (iPhone only), the stage, your co-writers. */
function Moments({ children }: { children: React.ReactNode }) {
  return (
    <section className="lg-mock-dark py-24 md:py-32">
      <div className="container mx-auto space-y-28 px-6 md:space-y-36">{children}</div>
    </section>
  );
}

function AppleDevices() {
  return (
    <section className="bg-[#170E1C] py-20">
      <div className="container mx-auto px-6">
        <Head center eyebrow="iPhone, iPad and Mac" title="One app. Every Apple device." lead="A native app for iPhone, iPad and Mac, and the same account on the web. Everything syncs live." />
        <div className="mt-8 flex justify-center">
          <AppStoreCTA>Download on the App Store</AppStoreCTA>
        </div>
      </div>
    </section>
  );
}

const IPhonePage = () => (
  <StudioPage
    current="/iphone/"
    accent="#FF8A65"
    glow="#E45C7A"
    title="Lyric Genie for iPhone, iPad & Mac — Songwriting App"
    description="Catch ideas anywhere: voice memos transcribed and linked to your lyrics, Freestyle mode, rhymes and Wish Workshop on the go, Perform on stage, and your co-writers in your pocket."
  >
    <FeatureKeyframes />
    <IPhoneHero />
    <Moments>
      <Row
        eyebrow="Catch it"
        tint="rgba(255,138,101,.22)"
        title={
          <>
            The idea, caught <span className="text-[#F6ECC9]">before it's gone.</span>
          </>
        }
        text="Hum it into a voice memo. It's transcribed, waits in your Ideas inbox, and links to the line it belongs to."
      >
        {() => <CaptureMock />}
      </Row>
      <Row
        flip
        eyebrow="Recordings"
        tint="rgba(232,102,60,.22)"
        title={
          <>
            Every melody, <span className="text-[#F6ECC9]">right in the song.</span>
          </>
        }
        text="Record a take from any line and it's linked there. Waveforms, transcripts, and playback while you keep writing."
      >
        {() => <RecordingsMock />}
      </Row>
      <Row
        eyebrow="Freestyle · iPhone only"
        tint="rgba(228,92,122,.22)"
        title={
          <>
            Mumble the melody. <span className="text-[#F6ECC9]">Get real lyrics.</span>
          </>
        }
        text="Sing placeholder sounds on the melody in your head. Lyric Genie keeps the phrasing and turns it into words that fit your song."
      >
        {(a) => <FreestyleSpotlight active={a} />}
      </Row>
    </Moments>
    <ToolsTabs
      variant="iphone"
      eyebrow="Finish it anywhere"
      title={
        <>
          The whole toolkit, <span className="text-[#F6ECC9]">in your pocket.</span>
        </>
      }
    />
    <Moments>
      <Row
        eyebrow="On stage"
        tint="rgba(48,209,88,.16)"
        title={
          <>
            Your lyrics, <span className="text-[#F6ECC9]">stage-ready.</span>
          </>
        }
        text="Perform puts the song in big type on a black screen, readable from behind the mic."
      >
        {() => <PerformMock />}
      </Row>
      <Row
        flip
        eyebrow="Co-writers in your pocket"
        tint="rgba(171,142,226,.25)"
        title={
          <>
            The room, <span className="text-[#F6ECC9]">wherever you are.</span>
          </>
        }
        text="Chat, notes and takes from your co-writers, wherever you are. See when they're writing. Join a song with a code."
      >
        {() => <ChatMock />}
      </Row>
    </Moments>
    <AppleDevices />
    <FinalCTA />
  </StudioPage>
);

export default IPhonePage;
