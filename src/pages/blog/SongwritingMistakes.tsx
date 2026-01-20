import BlogArticle from "@/components/BlogArticle";
import { Link } from "react-router-dom";

const SongwritingMistakes = () => {
  return (
    <BlogArticle
      title="5 Songwriting Mistakes That Are Killing Your Songs (And How Top Writers Avoid Them)"
      date="January 8, 2025"
      readTime="6 min read"
      category="Tips"
    >
      <p className="text-xl leading-relaxed mb-8">
        You've written dozens of songs. Maybe hundreds. But something's not clicking. The songs feel... fine. Just fine. Not memorable. Not the kind of songs that make people stop what they're doing and really listen.
      </p>

      <p>
        After talking to professional songwriters who've written for major artists—and studying what separates album cuts from hits—we've identified the five most common mistakes that hold good songwriters back from becoming great ones.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">Mistake #1: Starting With the Wrong Idea</h2>

      <p>
        Here's a harsh truth: not every song idea deserves to be a song.
      </p>

      <p>
        Many writers fall in love with a clever phrase or a melodic fragment and try to build an entire song around it—even when it doesn't have enough emotional weight to sustain three minutes.
      </p>

      <p>
        <strong>The fix:</strong> Before you commit to a song idea, ask yourself: "Is there a real emotional truth here that other people will connect to?" The best songs aren't about being clever. They're about making people feel something universal through something specific.
      </p>

      <p>
        Professional writers often generate dozens of ideas before committing to one. They use tools like <Link to="/">Lyric Genie</Link> to capture every melody and phrase that comes to them, then review later with fresh ears to identify which ideas have real potential.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">Mistake #2: Telling Instead of Showing</h2>

      <p>
        "I was so sad" tells us nothing. It's abstract. It doesn't create an image or a feeling.
      </p>

      <p>
        "I've been staring at my phone for three hours waiting for a text that's never coming" shows us sadness. We can see it. We've been there.
      </p>

      <p>
        Amateur songwriters state emotions directly. Professional songwriters create scenes that make listeners feel those emotions themselves.
      </p>

      <p>
        <strong>The fix:</strong> For every abstract emotion word in your lyrics (sad, happy, angry, lonely), challenge yourself to replace it with a concrete image or action. What does that emotion look like? What does someone do when they feel it?
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">Mistake #3: Burying the Hook</h2>

      <p>
        Your hook is the most memorable part of your song—the part people sing in the shower, the part that gets stuck in heads. And too many writers hide it.
      </p>

      <p>
        They'll save the best melody for the second half of the chorus. They'll put the title in a throwaway line. They'll write verses that are stronger than their hook.
      </p>

      <p>
        <strong>The fix:</strong> Your hook should be impossible to miss. It should be the first thing people hear in your chorus. It should be the highest melodic point, or the most rhythmically distinctive moment. Make it the star of the show, not a supporting character.
      </p>

      <p>
        Listen to any Top 40 hit. Notice how the hook announces itself immediately. That's not an accident.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">Mistake #4: Forgetting the Second Verse Problem</h2>

      <p>
        First verses are easy. You're introducing the story. You have all the obvious details to work with.
      </p>

      <p>
        Second verses are where songs go to die. Writers either repeat themselves, go off on tangents, or fill space with filler lines that add nothing.
      </p>

      <p>
        <strong>The fix:</strong> Your second verse should develop the story, not repeat it. Ask yourself: "What changes between verse one and verse two? Does time pass? Does the perspective shift? Does the conflict deepen?"
      </p>

      <p>
        Great second verses add new information while maintaining the emotional thread. They make the listener think, "Oh, now I understand more about this situation."
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">Mistake #5: Editing Too Soon (or Not at All)</h2>

      <p>
        This is actually two opposite mistakes, but they come from the same place: not understanding the difference between creative mode and editorial mode.
      </p>

      <p>
        Some writers edit while they write, killing momentum and second-guessing every line before they even finish a draft. Others never edit at all, considering their first draft sacred.
      </p>

      <p>
        <strong>The fix:</strong> Separate creation and revision completely. When you're writing, write. Get messy. Make bad choices. Finish the song. Then—and only then—put on your editor hat and refine.
      </p>

      <p>
        The first pass is about getting something on paper. The second pass is about making it good. The third pass is about making it great. These are different skills that require different mindsets.
      </p>

      <p>
        Many pro writers use <Link to="/">Lyric Genie's</Link> note system to flag lines they're unsure about during writing—without stopping to fix them—then return later specifically to address those flagged moments.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">The Meta-Mistake: Not Writing Enough</h2>

      <p>
        All five of these mistakes have something in common: they get better with practice. The more songs you write, the faster you'll learn to recognize when you're telling instead of showing, or when an idea doesn't have legs.
      </p>

      <p>
        Professional songwriters don't write better because they're more talented. They write better because they've written more songs. They've made these mistakes hundreds of times and developed instincts to avoid them.
      </p>

      <p>
        You can't shortcut that process. But you can accelerate it by being intentional. Pick one of these mistakes to focus on in your next five songs. Really concentrate on it. Then move to the next one.
      </p>

      <p>
        Awareness is the first step. Now you have it. The rest is up to you.
      </p>
    </BlogArticle>
  );
};

export default SongwritingMistakes;
