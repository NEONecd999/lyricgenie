export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  category: string;
  image?: string;
  /** Written, not yet published: listed with a Draft chip for review, kept out of related links. */
  draft?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-co-write-a-song-remotely",
    title: "How to Co-Write a Song Remotely: A Working Guide",
    excerpt: "Who holds the pen, how to keep one version of the lyric, and how to finish the song when you're not in the same room.",
    readTime: "5 min read",
    date: "",
    category: "Co-writing",
    draft: true,
  },
  {
    slug: "multisyllabic-rhymes-examples",
    title: "Multisyllabic Rhymes: What They Are, With Examples",
    excerpt: "Why rhymes that match two or three syllables land harder, and how to find them, with original lines taken apart.",
    readTime: "5 min read",
    date: "",
    category: "Craft",
    draft: true,
  },
  {
    slug: "rhyme-schemes-explained",
    title: "Rhyme Schemes Explained: AABB, ABAB, ABCB and More",
    excerpt: "The patterns you'll use most, what each one does to a section, and when to switch between them.",
    readTime: "5 min read",
    date: "",
    category: "Craft",
    draft: true,
  },
  {
    slug: "songwriting-credits-splits-lyric-sheet",
    title: "Splitting Songwriting Credits (and What Your Lyric Sheet Should Include)",
    excerpt: "Talking splits on the day, PROs and IPI numbers in plain terms, and the fields every lyric sheet should carry.",
    readTime: "5 min read",
    date: "",
    category: "Business",
    draft: true,
  },
  {
    slug: "best-songwriting-apps-mac-pc-2026",
    title: "The Best Songwriting Apps for Mac and PC in 2026",
    excerpt: "Documents, rhyming dictionaries, DAWs and songwriting workspaces: what each is good at, and how to choose.",
    readTime: "5 min read",
    date: "",
    category: "Tools & Resources",
    draft: true,
  },
  {
    slug: "ai-music-tools-2026",
    title: "AI Music Tools in 2026: What's Real, What's Hype, and What Songwriters Actually Need",
    excerpt: "From Suno's Warner deal to the latest creative writing assistants—here's a clear-eyed look at how AI is reshaping songwriting.",
    readTime: "8 min read",
    date: "January 18, 2026",
    category: "AI & Technology",
    image: "/src/assets/blog-ai-music.jpg",
  },
  {
    slug: "songwriting-tools-guide-2026",
    title: "The Ultimate Songwriter's Toolkit: Every Tool You Need in 2026",
    excerpt: "From rhyme finders to collaboration apps—a comprehensive breakdown of what working songwriters are actually using right now.",
    readTime: "7 min read",
    date: "January 15, 2026",
    category: "Tools & Resources",
    image: "/src/assets/blog-songwriting-tools.jpg",
  },
  {
    slug: "hit-songs-written-in-under-30-minutes",
    title: "7 Hit Songs That Were Written in Under 30 Minutes",
    excerpt: "Some of the biggest songs in history were written faster than your lunch break. Here's what these lightning-fast hits reveal.",
    readTime: "5 min read",
    date: "January 15, 2025",
    category: "Inspiration",
  },
  {
    slug: "rhyme-schemes-that-make-songs-unforgettable",
    title: "The Secret Rhyme Schemes That Make Songs Impossible to Forget",
    excerpt: "Why do some lyrics stick in your head for decades while others fade instantly? The answer lies in patterns.",
    readTime: "7 min read",
    date: "January 12, 2025",
    category: "Craft",
  },
  {
    slug: "songwriting-mistakes-killing-your-songs",
    title: "5 Songwriting Mistakes That Are Killing Your Songs",
    excerpt: "Professional songwriters have learned these lessons the hard way. Here's how to skip years of trial and error.",
    readTime: "6 min read",
    date: "January 8, 2025",
    category: "Tips",
  },
  {
    slug: "co-writing-secrets-from-nashville",
    title: "Inside the Room: Co-Writing Secrets from Nashville's Top Songwriters",
    excerpt: "What actually happens in a professional co-write? We break down the unwritten rules and techniques.",
    readTime: "8 min read",
    date: "January 5, 2025",
    category: "Industry",
    image: "/src/assets/blog-cowriting.jpg",
  },
  {
    slug: "voice-memos-to-finished-songs",
    title: "From Voice Memo to Finished Song: The Workflow That Changed Everything",
    excerpt: "That melody in your head at 2am could be your next great song—if you capture it right.",
    readTime: "6 min read",
    date: "January 2, 2025",
    category: "Workflow",
  },
];

export const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
  const otherPosts = blogPosts.filter(post => post.slug !== currentSlug);
  // Shuffle and pick the first `count` posts
  const shuffled = otherPosts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
