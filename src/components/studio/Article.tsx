import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { Eyebrow, FinalCTA, Glow, Reveal, StudioPage } from "@/components/studio/Studio";

/**
 * The blog's reading layout in the studio theme: one ~68ch column, off-white 18px body, white headings,
 * lavender links. Articles pass plain HTML (p, h2, h3, ul, ol, blockquote, table, img); this styles it.
 * Two classes are recognised in the body: "lead" (the opening paragraph) and "lyric" (example lines,
 * set in the serif).
 */
const BODY = [
  "prose prose-invert prose-lg max-w-none",
  // body
  "prose-p:text-[18px] prose-p:text-white/80 [&_p]:my-[1.1em] [&_p]:leading-[1.75]",
  "prose-li:text-[18px] prose-li:leading-[1.7] prose-li:text-white/80 [&_li]:my-1.5 [&_ol]:my-6 [&_ul]:my-6",
  "prose-li:marker:text-[#AB8EE2]",
  "prose-strong:text-white prose-em:text-white/90",
  // headings
  "prose-headings:font-display prose-headings:tracking-tight prose-headings:text-white",
  "prose-h2:mt-14 prose-h2:mb-4 prose-h2:text-[28px] prose-h2:leading-[1.15] md:prose-h2:text-[32px]",
  "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[21px]",
  // links
  "prose-a:font-medium prose-a:text-[#C9B5F0] prose-a:underline prose-a:decoration-[#AB8EE2]/50 prose-a:underline-offset-[3px] hover:prose-a:text-[#F6ECC9] hover:prose-a:decoration-[#F6ECC9]",
  // quotes, rules, images, tables
  "prose-blockquote:border-l-2 prose-blockquote:border-[#AB8EE2] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-white/85",
  "prose-hr:border-white/10",
  "prose-img:rounded-2xl prose-img:ring-1 prose-img:ring-white/10",
  "prose-table:text-[16px] prose-thead:border-white/20 prose-tr:border-white/10 prose-th:text-white prose-td:text-white/80",
  // the opening paragraph, and example lyric lines
  "[&_.lead]:text-[21px] [&_.lead]:leading-[1.6] [&_.lead]:text-white",
  "[&_.lyric]:my-6 [&_.lyric]:rounded-2xl [&_.lyric]:border [&_.lyric]:border-white/10 [&_.lyric]:bg-white/[0.04] [&_.lyric]:px-6 [&_.lyric]:py-5",
  "[&_.lyric]:font-serif [&_.lyric]:not-italic [&_.lyric]:text-[19px] [&_.lyric]:leading-[1.7] [&_.lyric]:text-[#F6ECC9]",
].join(" ");

export interface ArticleProps {
  /** The page title and H1. */
  title: string;
  /** The meta description. */
  description?: string;
  date?: string;
  readTime?: string;
  category?: string;
  /** Not yet published: a Draft chip, and noindex. */
  draft?: boolean;
  children: ReactNode;
}

/** Keeps a draft out of search results while it's being reviewed on the preview. */
function NoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  return null;
}

export const DraftChip = () => (
  <span className="rounded-full border border-[#F6ECC9]/40 bg-[#F6ECC9]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#F6ECC9]">Draft</span>
);

export function Article({ title, description, date, readTime, category, draft = false, children }: ArticleProps) {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  const metaDescription = description || `${title} - Tips and insights for songwriters from Lyric Genie.`;
  // Two more to read: the next published posts after this one, wrapping round.
  const published = blogPosts.filter((p) => !p.draft);
  const at = published.findIndex((p) => p.slug === slug);
  const related = published.filter((p) => p.slug !== slug).slice(Math.max(at, 0)).concat(published.filter((p) => p.slug !== slug)).slice(0, 2);
  const meta = [date && !draft ? date : null, readTime].filter(Boolean) as string[];

  return (
    <StudioPage current="/blog/" title={title} description={metaDescription}>
      <SEO title={title} description={metaDescription} ogType="article" publishedTime={draft ? undefined : date} />
      {draft && <NoIndex />}
      <article className="relative overflow-hidden pb-20 pt-28 md:pt-36">
        <Glow className="left-1/2 top-[-260px] h-[560px] w-[900px] -translate-x-1/2" strength={22} />
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-[68ch]">
            <Link to="/blog/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white">
              <ArrowLeft className="size-4" /> All articles
            </Link>
            <Reveal>
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>{category || "Blog"}</Eyebrow>
                  {draft && <span className="mb-3"><DraftChip /></span>}
                </div>
                <h1 className="text-balance font-display text-[36px] font-bold leading-[1.08] tracking-tight text-white md:text-[48px]">{title}</h1>
                {meta.length > 0 && <p className="mt-5 text-sm text-white/50">{meta.join(" · ")}</p>}
              </header>
            </Reveal>
            <div className={BODY}>{children}</div>

            {related.length > 0 && (
              <aside className="mt-20 border-t border-white/[0.08] pt-10">
                <Eyebrow>Keep reading</Eyebrow>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}/`} className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-[#AB8EE2]/50 hover:bg-white/[0.05]">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">{p.category}</p>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">{p.title}</h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9B5F0] transition-all group-hover:gap-2.5">
                        Read <ArrowRight className="size-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
      <FinalCTA />
    </StudioPage>
  );
}

export default Article;
