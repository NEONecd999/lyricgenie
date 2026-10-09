import { useState } from "react";
import { APP_STORE, WEB_SIGNUP, webTrial } from "@/lib/links";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Feature lists mirror the iOS paywall (SubscriptionView.swift comparisonRows + free banner) and
// the web app's paywall (LYRICGENIE-APP src/data/billing.ts); keep all three in step.
const FREE_FEATURES = [
  "Unlimited songs",
  "Real-time collaboration",
  "Lyric sheets, lyrics-linked recordings & drag-and-drop arranging",
  "Try every AI tool: 15 AI calls + 50 quick AI calls",
  "30 rhyme lookups a day",
  "60 minutes of voice recording (5 min per take)",
];

const PRO_FEATURES = [
  "Everything in Free, plus:",
  "In-line suggestions",
  "Wish Workshop AI",
  "Smart dictionaries",
  "AI song titles & song concepts",
  "Syllable control",
  "5,000 AI calls a month + 20,000 quick AI calls (suggestions, rhyme picks)",
  "Unlimited rhyme lookups",
  "10,000 minutes of voice recording (60 min per take)",
];

const MONTHLY = 4.99;
const YEARLY = 29.99;
// Yearly vs twelve monthly payments: 1 - 29.99 / 59.88 ≈ 50%.
const SAVINGS = Math.round((1 - YEARLY / (MONTHLY * 12)) * 100);

type Billing = "monthly" | "yearly";


const Check = () => (
  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F4EEFE] text-xs font-bold text-primary">
    ✓
  </span>
);

const Pricing = () => {
  // Yearly first: it's the better deal and the plan we'd rather sell.
  const [billing, setBilling] = useState<Billing>("yearly");
  return (
    <section className="relative overflow-hidden py-24 bg-background">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="mb-4 inline-block rounded-full uppercase"
            style={{
              padding: "6px 14px",
              background: "rgba(127,98,196,.1)",
              color: "#6F50B8",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".12em",
            }}
          >
            Pricing
          </div>
          <h2 className="font-display mx-auto max-w-3xl text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1E1324] mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-[#6F50B8] to-[#C48AE3] bg-clip-text text-transparent">
              Affordable
            </span>{" "}
            Pricing
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#5D5065]">
            Get access to Lyric Genie's AI tools, risk-free. Cancel anytime.
          </p>
        </motion.div>

        {/* Monthly / Yearly switch, with the yearly saving on it. */}
        <div className="mb-10 flex justify-center">
          <div role="radiogroup" aria-label="Billing period" className="inline-flex items-center rounded-full border border-[#E5E4E8] bg-card p-1 shadow-[0_4px_20px_-4px_rgba(30,19,36,0.08)]">
            {(["monthly", "yearly"] as const).map((b) => {
              const on = billing === b;
              return (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setBilling(b)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    on ? "bg-[#6F50B8] text-white" : "text-[#5D5065] hover:text-[#1E1324]"
                  }`}
                >
                  {b === "monthly" ? "Monthly" : "Yearly"}
                  {b === "yearly" && (
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${on ? "bg-white/20 text-white" : "bg-yellow-400/25 text-primary"}`}>
                      Save {SAVINGS}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl items-start gap-8 md:grid-cols-2">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] border border-[#E5E4E8] bg-card p-9 shadow-[0_4px_20px_-4px_rgba(30,19,36,0.08)] transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">Free</div>
            {/* Same rows as the Pro card (lead line, price, note) so the two prices line up. */}
            <div className="mb-1 font-display text-xl font-bold text-[#1E1324]">Free forever</div>
            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-bold tracking-tight text-[#1E1324]">$0</span>
            </div>
            <div className="mb-4 h-5 text-sm text-[#5D5065]">No credit card needed</div>
            <div className="mb-6 h-5" aria-hidden />
            <a href={WEB_SIGNUP} className="block">
              <Button variant="outline" size="lg" className="w-full justify-center">
                Start Writing Free
              </Button>
            </a>
            <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-sm font-medium text-primary hover:underline">
              or download for iPhone, iPad &amp; Mac
            </a>
            <ul className="mt-7 flex flex-col gap-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#1E1324]">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro: one plan, priced by the switch above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative scale-[1.03] rounded-[28px] border-2 border-primary bg-card p-9 shadow-[0_18px_44px_-12px_rgba(127,98,196,0.32)] transition-all duration-300"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-[#6F50B8] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                {billing === "yearly" ? "Best Value" : "Most Popular"}
              </span>
            </div>
            <div className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">Pro</div>
            {/* The trial leads the price: "14 days free, then $29.99/year". */}
            <div className="mb-1 font-display text-xl font-bold">
              <span className="bg-gradient-to-r from-[#E8663C] to-[#E45C7A] bg-clip-text text-transparent">14 days free</span>
              <span className="text-[#5D5065]">, then</span>
            </div>
            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-bold tracking-tight text-[#1E1324]">
                ${billing === "yearly" ? YEARLY : MONTHLY}
              </span>
              <span className="text-sm text-[#5D5065]">{billing === "yearly" ? "/year" : "/month"}</span>
            </div>
            <div className="mb-4 h-5 text-sm text-[#5D5065]">
              {billing === "yearly" ? (
                <>
                  Just ${(YEARLY / 12).toFixed(2)}/month{" "}
                  <span className="text-[#9A92A0] line-through">${MONTHLY}</span>
                </>
              ) : (
                <>
                  Or ${YEARLY}/year and save {SAVINGS}%
                </>
              )}
            </div>
            <div className="mb-6 text-sm text-[#5D5065]">No charge for 14 days. Cancel anytime.</div>
            {/* The web: sign up (or in), then straight into Stripe checkout on this plan. */}
            <a href={webTrial(billing)} className="block">
              <Button variant="hero" size="lg" className="w-full justify-center">
                Start Free Trial
              </Button>
            </a>
            <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-sm font-medium text-primary hover:underline">
              or subscribe in the iPhone app
            </a>
            <ul className="mt-7 flex flex-col gap-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#1E1324]">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
