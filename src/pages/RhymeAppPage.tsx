import { Link } from "react-router-dom";
import { LandingPage } from "@/components/studio/Landing";

/** /rhyme-app-for-songwriters: answer-first, for "rhyme app for songwriters" searches (2026-10-28). */
const RhymeAppPage = () => (
  <LandingPage
    path="/rhyme-app-for-songwriters/"
    title="A Rhyme App for Songwriters — Lyric Genie"
    description="Rhymes for whole phrases, not just the last word: multi-syllable, slant and phrase rhymes built on how words sound, inside a lyrics editor with rhyme colors. Free to start."
    eyebrow="Rhyme app for songwriters"
    heading="Rhymes that sound right,"
    accent="for whole phrases."
    answer={
      <p>
        Lyric Genie is a lyrics editor with a rhyme engine built for songwriting. Select a word or a whole phrase and it finds multi-syllable, slant and phrase rhymes that match how it sounds, not how it's spelled. Rhyme colors show the rhymes in every verse as you write. Free for 30 lookups a day; unlimited with Pro.
      </p>
    }
    sections={[
      {
        title: "Built for the rhymes songs actually use",
        body: (
          <>
            <p>
              Most rhyming dictionaries take one word and give you words that end the same way. Lyric Genie takes your phrase, works out which syllables carry the rhyme, and finds words and phrases that match all of them. That's how you find the internal and multi-syllable rhymes that make a line stick.
            </p>
            <p>
              The same engine runs free at <a href="https://rhymegold.com">RhymeGold</a>, with 135,000 words and phrases. <Link to="/rhyme-engine/">How the rhyme engine works</Link>.
            </p>
          </>
        ),
      },
      {
        title: "Rhymes where you write",
        body: (
          <ul>
            <li><strong>Rhyme lookups in the editor.</strong> Select a line or a word and the rhymes open beside your lyrics.</li>
            <li><strong>Rhyme colors.</strong> The rhymes in each verse light up, internal ones included, with the rhyme scheme in the margin.</li>
            <li><strong>Genie when you're stuck.</strong> Ask for a rhyme that fits the meaning of the line, not just the sound.</li>
            <li><strong>Syllable control</strong> to make the line fit the melody once the rhyme is right.</li>
          </ul>
        ),
      },
      {
        title: "What it costs",
        body: (
          <p>
            Free includes 30 rhyme lookups a day, unlimited songs and co-writing. Pro is $4.99 a month or $29.99 a year, with a 14-day free trial, and makes rhyme lookups unlimited. <Link to="/pricing/">See pricing</Link>.
          </p>
        ),
      },
    ]}
    faqs={[
      ["Does it find multi-syllable rhymes?", "Yes. It matches every stressed syllable in a phrase, so it finds multi-syllable and internal rhymes, not just words that end the same way."],
      ["Does it find slant rhymes?", "Yes. Slant (near) rhymes are included, because songs use them as much as perfect rhymes."],
      ["Is it free?", "Yes, for 30 rhyme lookups a day. Pro makes them unlimited. The same engine is free to use at RhymeGold.com."],
      ["Does it work on a computer?", "Yes. Lyric Genie runs in the browser on any Mac or PC, and there's an app for iPhone and iPad."],
    ]}
  />
);

export default RhymeAppPage;
