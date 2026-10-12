import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Eyebrow, FinalCTA, Glow, Reveal, StudioPage } from "@/components/studio/Studio";
import { DraftChip } from "@/components/studio/Article";

/** /blog: the articles as a list of cards, drafts (for review) marked with a chip. */
const Blog = () => (
  <StudioPage
    current="/blog/"
    title="Blog"
    description="Songwriting tips, techniques, and insights from Lyric Genie. Learn about co-writing, lyric writing, and using AI tools for music creation."
  >
    <section className="relative overflow-hidden pb-24 pt-28 md:pt-36">
      <Glow className="left-1/2 top-[-240px] h-[620px] w-[1000px] -translate-x-1/2" strength={26} />
      <div className="container relative z-10 mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="font-display text-[42px] font-bold leading-[1.05] tracking-tight text-white md:text-[58px]">
            Notes on <span className="text-[#F6ECC9]">the craft.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">Writing, rhyming, co-writing and the business side, from people who write songs.</p>
        </Reveal>

        <ul className="mt-16 space-y-4">
          {blogPosts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(i, 6) * 0.04}>
                <Link
                  to={`/blog/${post.slug}/`}
                  className="group block rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-[#AB8EE2]/50 hover:bg-white/[0.05] md:p-7"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px]">
                    <span className="font-bold uppercase tracking-[0.14em] text-[#AB8EE2]">{post.category}</span>
                    {post.draft && <DraftChip />}
                    <span className="text-white/45">{[post.draft ? null : post.date, post.readTime].filter(Boolean).join(" · ")}</span>
                  </div>
                  <h2 className="mt-3 text-balance font-display text-[22px] font-bold leading-snug text-white md:text-[26px]">{post.title}</h2>
                  <p className="mt-2 text-[16px] leading-relaxed text-white/65">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9B5F0] transition-all group-hover:gap-2.5">
                    Read <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <FinalCTA />
  </StudioPage>
);

export default Blog;
