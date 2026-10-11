import { AiContextSpotlight, FeatureKeyframes, FreestyleSpotlight, RhymeSpotlight, WishWorkshopSpotlight } from "@/components/Features";
import { AppStoreCTA, CoWriteMock, Eyebrow, Glow, Head, More, PhoneArt, Reveal, Row, StudioPage } from "@/components/studio/Studio";
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

function Rows() {
  return (
    <section className="lg-mock-dark py-24 md:py-32">
      <div className="container mx-auto space-y-28 px-6 md:space-y-36">
        <Row
          eyebrow="Freestyle mode"
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
        <Row
          flip
          eyebrow="Wish Workshop"
          tint="rgba(127,98,196,.3)"
          title={
            <>
              Stuck on a line? <span className="text-[#F6ECC9]">Make a wish.</span>
            </>
          }
          text="Darker, happier, more visual, or your own words. Keep the rhyme and the meter."
        >
          {(a) => <WishWorkshopSpotlight active={a} />}
        </Row>
        <Row
          eyebrow="Rhymes"
          tint="rgba(58,123,208,.22)"
          title={
            <>
              Every rhyme, <span className="text-[#F6ECC9]">one tap away.</span>
            </>
          }
          text="Perfect, near, multi-syllable and phrase rhymes, plus synonyms and sound-alikes, in one sheet."
        >
          {(a) => <RhymeSpotlight active={a} />}
        </Row>
        <Row
          flip
          eyebrow="AI context"
          tint="rgba(177,155,226,.3)"
          title={
            <>
              AI that knows <span className="text-[#F6ECC9]">your song.</span>
            </>
          }
          text="The mood, the story and your references, so every suggestion fits."
        >
          {(a) => <AiContextSpotlight active={a} />}
        </Row>
        <Row
          eyebrow="Co-write anywhere"
          tint="rgba(232,102,60,.22)"
          title={
            <>
              Your co-writers, <span className="text-[#F6ECC9]">on any device.</span>
            </>
          }
          text="Every writer gets a tab, on iPhone or the web. Changes and takes sync live."
        >
          {() => <CoWriteMock />}
        </Row>
      </div>
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
    description="Catch ideas anywhere: voice memos linked to your lyrics, Freestyle mode, Wish Workshop, rhymes and live co-writing, synced with Lyric Genie on the web."
  >
    <FeatureKeyframes />
    <IPhoneHero />
    <Rows />
    <More keys={["recordings", "perform", "concepts", "sheets", "import", "projects"]} title="Everything a song needs." />
    <AppleDevices />
  </StudioPage>
);

export default IPhonePage;
