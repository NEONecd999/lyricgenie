import { FeatureKeyframes } from "@/components/Features";
import { CoWriteMock, Desk, Eyebrow, FinalCTA, Glow, More, PrimaryCTA, Reveal, Row, SearchMock, SessionMock, StudioPage, ChatAttachMock, ExplodedWorkspace, ImportMock, NotesMock, ToolsTabs } from "@/components/studio/Studio";
import { WEB_SIGNIN } from "@/lib/links";

/** /web: Lyric Genie on your computer. Lavender, like the desktop app's accent. */

function WebHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-[7.5rem] md:pb-28 md:pt-36">
      <Glow className="left-1/2 top-[-220px] h-[700px] w-[1100px] -translate-x-1/2" strength={32} />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Lyric Genie for the web</Eyebrow>
          <h1 className="font-display text-[46px] font-bold leading-[1.03] tracking-tight text-white md:text-[68px]">
            Your desk is <span className="text-[#F6ECC9]">the studio.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70 md:text-xl">A full songwriting workspace in your browser. Mac, PC, any computer.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryCTA>Start free in your browser</PrimaryCTA>
            <a href={WEB_SIGNIN} className="text-sm font-semibold text-white/70 hover:text-white">
              Already writing? Sign in
            </a>
          </div>
        </Reveal>
        {/* The workspace's panels, coming together (the next section shows the real thing) */}
        <Reveal delay={0.15} className="mx-auto mt-10 max-w-5xl">
          <ExplodedWorkspace />
        </Reveal>
      </div>
    </section>
  );
}

/** Write together: co-writing and sessions, the desk at its best with other people. */
function Together() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto space-y-28 px-6 md:space-y-36">
        <Row
          eyebrow="Write together"
          tint="rgba(232,102,60,.22)"
          title={
            <>
              Every writer <span className="text-[#F6ECC9]">gets a tab.</span>
            </>
          }
          text="Try ideas on your own tab, agree on the Master. See who's here and where they're typing."
        >
          {() => <CoWriteMock />}
        </Row>
        <Row
          flip
          eyebrow="Notes"
          tint="rgba(245,182,66,.18)"
          title={
            <>
              Notes on <span className="text-[#F6ECC9]">the words.</span>
            </>
          }
          text="Highlight a phrase and leave a note. Co-writers reply, and anyone resolves it. Keep options right on the line, main / alt, and swap one in when you decide."
        >
          {() => <NotesMock />}
        </Row>
        <Row
          eyebrow="Chat"
          tint="rgba(171,142,226,.25)"
          title={
            <>
              Chat beside the song, <span className="text-[#F6ECC9]">with everything attached.</span>
            </>
          }
          text="Drop in a voice memo, a bounce, the artwork or a photo. Audio you send lands in the song's Recordings too."
        >
          {() => <ChatAttachMock />}
        </Row>
        <Row
          flip
          tint="rgba(48,209,88,.16)"
          eyebrow={
            <span className="inline-flex items-center gap-2">
              Sessions <span className="rounded-full bg-[#30D158]/15 px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#30D158]">Coming soon</span>
            </span>
          }
          title={
            <>
              The session, <span className="text-[#F6ECC9]">without the commute.</span>
            </>
          }
          text="Video and voice inside the song, with your DAW streaming in full quality through our VST3 and AU plugin."
        >
          {() => <SessionMock />}
        </Row>
      </div>
    </section>
  );
}

/** Bring your audio in: bounces, voice memos and demos dropped onto a song (Pro keeps the originals). */
function ImportAudio() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Row
          eyebrow="Import audio"
          tint="rgba(58,123,208,.22)"
          title={
            <>
              Drop in your bounces. <span className="text-[#F6ECC9]">Keep the originals.</span>
            </>
          }
          text="Drag a mix out of your DAW, a voice memo or a demo onto the song. Each becomes a take you can play and link to a line. On Pro, the original file is kept as you uploaded it."
        >
          {() => <ImportMock />}
        </Row>
      </div>
    </section>
  );
}

/** Fast: search and shortcuts. */
function Fast() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <Row
          eyebrow="Fast"
          tint="rgba(127,98,196,.25)"
          title={
            <>
              Fast like a pro tool, <span className="text-[#F6ECC9]">because it is one.</span>
            </>
          }
          text="⌘K finds any song, any line any writer wrote, every note, chat and take. Shortcuts for everything you do a hundred times a day."
        >
          {() => <SearchMock />}
        </Row>
      </div>
    </section>
  );
}

const WebPage = () => (
  <StudioPage
    current="/web/"
    accent="#AB8EE2"
    glow="#6F50B8"
    title="Lyric Genie for the Web — Songwriting Workspace for Mac & PC"
    description="A full songwriting workspace in your browser: co-write live with every writer on their own tab, AI tools that know your song, rhymes, search and shortcuts, and sessions with your DAW."
  >
    <FeatureKeyframes />
    <WebHero />
    <Desk />
    <Together />
    <ToolsTabs
      variant="web"
      eyebrow="Tools in the side panel"
      title={
        <>
          Help when you ask. <span className="text-[#F6ECC9]">Quiet when you don't.</span>
        </>
      }
    />
    <ImportAudio />
    <Fast />
    <More keys={["sheets", "projects", "concepts"]} title="Ready to send." />
    <FinalCTA />
  </StudioPage>
);

export default WebPage;
