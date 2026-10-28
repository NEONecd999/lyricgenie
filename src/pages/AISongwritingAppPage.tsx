import { Link } from "react-router-dom";
import { LandingPage } from "@/components/studio/Landing";

/** /ai-songwriting-app: answer-first, for "AI songwriting app" searches and AI-assistant answers (2026-10-28). */
const AISongwritingAppPage = () => (
  <LandingPage
    path="/ai-songwriting-app/"
    title="An AI Songwriting App That Helps You Write — Lyric Genie"
    description="Lyric Genie is a songwriting app with AI help built in: rhymes, a fresher word, a next-line idea or a title when you ask. It doesn't generate songs; you write them. Free to start."
    eyebrow="AI songwriting app"
    heading="AI that helps you write,"
    accent="not writes for you."
    answer={
      <p>
        Lyric Genie is a songwriting app with AI help built into a full lyrics editor. Genie suggests a next line, a rhyme, a fresher word or a title when you ask, and you decide what stays. It doesn't generate songs. It runs in your browser on Mac or PC and on iPhone and iPad. Free to start; Pro is $4.99 a month or $29.99 a year, with a 14-day free trial.
      </p>
    }
    sections={[
      {
        title: "What Genie does",
        body: (
          <ul>
            <li><strong>In-line suggestions.</strong> Pause while you write and a possible next line appears at your cursor, in purple. Tap to take it, or keep typing and it's gone.</li>
            <li><strong>Wish Workshop.</strong> Select a line to rewrite it a few ways, or open it with nothing selected to find new material when you're stuck.</li>
            <li><strong>Syllable control.</strong> Make a line a syllable or two longer or shorter so it fits the melody, without losing what it says.</li>
            <li><strong>Smart dictionaries.</strong> Synonyms, sound-alikes and associations picked for the song you're writing, not just the word you looked up.</li>
            <li><strong>Song titles and concepts.</strong> Title ideas from your lyrics, and concepts to start a song from.</li>
            <li><strong>Genie chat.</strong> Talk a song through with Genie beside it. It reads the song as it is, so you never paste lyrics in, and it asks questions and offers options rather than writing the song.</li>
          </ul>
        ),
      },
      {
        title: "Not a song generator",
        body: (
          <>
            <p>
              Apps like Suno and Udio make finished songs from a prompt. Lyric Genie is for songwriters who want to write their own. The AI waits until you ask, works on the line you choose, and every suggestion is yours to take, change or ignore.
            </p>
            <p>Your lyrics are never used to train AI and never shared. Songs are private unless you invite someone.</p>
          </>
        ),
      },
      {
        title: "Everything else a songwriter needs",
        body: (
          <ul>
            <li>A <Link to="/rhyme-engine/">rhyme engine</Link> built on how words sound, with multi-syllable, slant and phrase rhymes.</li>
            <li>Real-time co-writing: every writer gets their own tab, plus a shared Master version.</li>
            <li>Voice memos and uploads linked to the lyric lines they belong to.</li>
            <li>Lyric sheets with writer credits, at their own link.</li>
          </ul>
        ),
      },
      {
        title: "What it costs",
        body: (
          <p>
            Free includes unlimited songs, co-writing and 15 AI calls to try every Genie feature. Pro is $4.99 a month or $29.99 a year ($2.50 a month), starts with 14 days free, and gives you 5,000 AI calls a month. One subscription covers the web, iPhone and iPad. <Link to="/pricing/">See pricing</Link>.
          </p>
        ),
      },
    ]}
    faqs={[
      ["Does Lyric Genie write songs for me?", "No. You write the song. Genie suggests when you ask, with a next line, a rhyme, a fresher word or a title, and the words stay yours."],
      ["Is my lyric data used to train AI?", "No. Lyric Genie never trains on your lyrics and never shares them."],
      ["Can I use the AI for free?", "Yes. The free plan includes 15 AI calls, plus 50 lighter ones, so you can try every Genie feature before paying."],
      ["Does it work on a computer?", "Yes. Lyric Genie runs in the browser on any Mac or PC, and there's a native app for iPhone and iPad. One account works everywhere."],
    ]}
  />
);

export default AISongwritingAppPage;
