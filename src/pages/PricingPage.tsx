import { Check, Minus } from "lucide-react";
import { FAQ, FinalCTA, Head, Pricing, Reveal, StudioPage } from "@/components/studio/Studio";

/**
 * /pricing: the two plans, the full comparison and the FAQ. The rows mirror the main page's Pricing
 * (components/Pricing.tsx: FREE_FEATURES / PRO_FEATURES); keep them in step.
 */

const ROWS: [string, string | boolean, string | boolean][] = [
  ["Songs", "Unlimited", "Unlimited"],
  ["Real-time co-writing", true, true],
  ["Lyric sheets, linked recordings, arranging", true, true],
  ["AI calls", "15 + 50 quick", "5,000 a month + 20,000 quick"],
  ["Rhyme lookups", "30 a day", "Unlimited"],
  ["Wish Workshop", false, true],
  ["In-line suggestions", false, true],
  ["Smart dictionaries", false, true],
  ["AI song titles & concepts", false, true],
  ["Syllable control", false, true],
  ["Video sessions with your DAW", "Join", "Host & join"],
  ["Voice recording", "60 min (5 min a take)", "10,000 min (60 min a take)"],
];

const Cell = ({ v }: { v: string | boolean }) =>
  v === true ? <Check className="mx-auto size-4 text-[var(--acc)]" /> : v === false ? <Minus className="mx-auto size-4 text-white/25" /> : <span className="text-white/80">{v}</span>;

function Compare() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="Compare" title="Everything in each plan." />
        <Reveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1B1B]">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="px-5 py-4 font-semibold" />
                <th className="w-[28%] px-5 py-4 text-center font-semibold">Free</th>
                <th className="w-[28%] px-5 py-4 text-center font-semibold text-[#F6ECC9]">Pro</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, free, pro]) => (
                <tr key={label} className="border-b border-white/[0.06] last:border-0">
                  <td className="px-5 py-3.5 text-white/75">{label}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell v={free} />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Cell v={pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-5 text-center text-sm text-white/45">One account across the web, iPhone and iPad. One Pro subscription covers them all.</p>
      </div>
    </section>
  );
}

const PricingPage = () => (
  <StudioPage
    current="/pricing/"
    title="Pricing — Lyric Genie"
    description="Start free with unlimited songs and real-time co-writing. Pro adds Wish Workshop, in-line suggestions and 5,000 AI calls a month, with a 14-day free trial."
  >
    {/* The page's one h1 (the Pricing section's own heading is an h2, as on the home page). */}
    <h1 className="sr-only">Lyric Genie pricing: Free and Pro plans</h1>
    <div className="pt-[5.5rem]">
      <Pricing />
    </div>
    <Compare />
    <FAQ />
    <FinalCTA />
  </StudioPage>
);

export default PricingPage;
