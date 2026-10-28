import type { ReactNode } from "react";
import { Eyebrow, FinalCTA, Glow, Reveal, StudioPage } from "@/components/studio/Studio";
import { NoIndex } from "@/components/studio/Article";

/**
 * Answer-first pages for the questions people ask search engines and AI assistants ("AI songwriting app",
 * "co-writing app", "Lyric Genie vs RhymeBook"), 2026-10-28. The answer comes first, in plain words, then
 * sections and an FAQ (with FAQPage structured data). `draft`: noindex, kept out of the sitemap and the
 * prerender list until the owner approves it.
 */

export type LandingSection = { title: string; body: ReactNode };

export function LandingPage({
  path,
  title,
  description,
  eyebrow,
  heading,
  accent,
  answer,
  sections,
  faqs,
  draft = false,
  children,
}: {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  accent: string;
  /** The answer, first, in plain words: what it is, who it's for, what it costs. */
  answer: ReactNode;
  sections: LandingSection[];
  faqs: [string, string][];
  draft?: boolean;
  /** Anything after the sections and before the FAQ (a comparison table, say). */
  children?: ReactNode;
}) {
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  });
  return (
    <StudioPage current={path} title={title} description={description}>
      {draft && <NoIndex />}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36">
        <Glow className="left-1/2 top-[-260px] h-[560px] w-[900px] -translate-x-1/2" strength={22} />
        <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            {draft && <span className="mb-5 inline-block rounded-full border border-[#F6ECC9]/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F6ECC9]">Draft</span>}
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-tight text-white md:text-[58px]">
              {heading} <span className="text-[#F6ECC9]">{accent}</span>
            </h1>
            <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{answer}</div>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight text-white md:text-[30px]">{s.title}</h2>
              <div className="landing-body mt-4 space-y-4 text-[16px] leading-relaxed text-white/70 [&_a]:text-[#F6ECC9] [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-white [&_ul]:space-y-2">
                {s.body}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {children}

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
          <h2 className="font-display text-[26px] font-bold tracking-tight text-white md:text-[30px]">Questions</h2>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {faqs.map(([q, a]) => (
              <div key={q} className="py-5">
                <dt className="text-[16px] font-semibold text-white">{q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-white/65">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCTA />
    </StudioPage>
  );
}
