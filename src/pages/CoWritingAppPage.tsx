import { Link } from "react-router-dom";
import { LandingPage } from "@/components/studio/Landing";

/** /co-writing-app: answer-first, for "co-writing app" / "write songs with collaborators" searches (2026-10-28). */
const CoWritingAppPage = () => (
  <LandingPage
    draft
    path="/co-writing-app/"
    title="A Co-Writing App for Songwriters — Lyric Genie"
    description="Write songs with collaborators in real time, in the room or remotely. Every writer gets their own tab, plus a shared Master version, with chat, recordings and video sessions in the song. Free to join."
    eyebrow="Co-writing app"
    heading="Write together,"
    accent="in real time."
    answer={
      <p>
        Lyric Genie is a songwriting app built for co-writing. Invite your collaborators and everyone writes in the same song at once, each writer on their own tab, plus a shared Master version you agree on together. It works in the browser on Mac or PC and on iPhone and iPad, and collaborators join free.
      </p>
    }
    sections={[
      {
        title: "Room for everyone, one version you agree on",
        body: (
          <>
            <p>
              Co-writing in one shared document gets messy: people type over each other and good ideas get lost. In Lyric Genie every writer has their own tab to try things, updating live for everyone, and the Master tab holds the version the room agrees on. Move the keepers into Master as you go; one writer edits it at a time while everyone watches it change.
            </p>
            <p>On the web, open a collaborator's tab beside your own to watch it change as they type.</p>
          </>
        ),
      },
      {
        title: "Everything the session needs, in the song",
        body: (
          <ul>
            <li><strong>Chat beside the lyrics</strong>, with voice memos, bounces and photos. Audio lands in the song's recordings too.</li>
            <li><strong>Notes on the words.</strong> Highlight a phrase to leave a note for your co-writers.</li>
            <li><strong>Alternate lines.</strong> Keep two versions of a line side by side until you decide.</li>
            <li><strong>Recordings linked to lines</strong>, so the melody idea stays next to the words.</li>
            <li><strong>Video sessions</strong> with voice and your DAW streaming in through our plugin for Logic, Ableton, Cubase, FL Studio and more. Pro writers host; anyone can join.</li>
            <li><strong>Lyric sheets with writer credits</strong>, so splits and publishing info are written down before everyone leaves.</li>
          </ul>
        ),
      },
      {
        title: "Remote or in the room",
        body: (
          <p>
            Remote writers see each other's changes live, wherever they are. In the room, everyone can write on their own phone or laptop and pull the best lines into Master. An invite is all a collaborator needs, in their browser or the iPhone app. See the guide to <Link to="/blog/co-writing-secrets-from-nashville/">co-writing like Nashville writers</Link>.
          </p>
        ),
      },
      {
        title: "What it costs",
        body: (
          <p>
            Co-writing is free: unlimited songs and collaborators' tabs on the free plan. Pro is $4.99 a month or $29.99 a year, with a 14-day free trial, and adds Genie's AI help, unlimited rhymes, more recording and hosting video sessions. <Link to="/pricing/">See pricing</Link>.
          </p>
        ),
      },
    ]}
    faqs={[
      ["Do my co-writers need to pay?", "No. Co-writing is free, and collaborators can accept an invite in their browser or the iPhone app. Joining a video session is free too while a Pro writer is in it."],
      ["Do co-writers need the app?", "No. They can write in their browser on any Mac or PC, or use the iPhone and iPad app."],
      ["How many people can write on one song?", "Up to 8 writers on a song."],
      ["Can we write at the same time?", "Yes. Every writer's tab updates live for everyone. The shared Master version is edited by one writer at a time, and everyone sees the changes as they happen."],
    ]}
  />
);

export default CoWritingAppPage;
