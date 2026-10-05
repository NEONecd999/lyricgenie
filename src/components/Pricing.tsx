import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  isFree?: boolean;
};

// Feature lists mirror the iOS paywall (SubscriptionView.swift comparisonRows + free banner) and
// the web app's paywall; keep all three in step.
const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with songwriting",
    features: [
      "Unlimited songs",
      "Real-time collaboration",
      "Lyric sheets, lyrics-linked recordings & drag-and-drop arranging",
      "Try every AI tool: 7 AI calls + 40 quick AI calls",
      "30 rhyme lookups a day",
      "60 minutes of voice recording (5 min per take)",
    ],
    cta: "Download Now",
    isFree: true,
  },
  {
    name: "Pro Monthly",
    price: "$4.99",
    period: "/month",
    description: "AI built for songwriting, woven into a powerful lyrics editor",
    features: [
      "Everything in Free, plus:",
      "In-line suggestions",
      "Wish Workshop AI",
      "Smart dictionaries",
      "AI song titles & song concepts",
      "Syllable control",
      "5,000 AI calls a month + 20,000 quick AI calls (suggestions, rhyme picks)",
      "Unlimited rhyme lookups",
      "10,000 minutes of voice recording (60 min per take)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro Yearly",
    price: "$29.99",
    period: "/year",
    description: "Best value, save 50%",
    features: [
      "Everything in Pro Monthly",
      "Six months free",
    ],
    cta: "Start Free Trial",
  },
];

const Pricing = () => {
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

        <div className="mx-auto grid max-w-6xl items-start gap-8 pt-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-[28px] bg-card p-9 transition-all duration-300 ${
                plan.popular
                  ? "scale-[1.04] border-2 border-primary shadow-[0_18px_44px_-12px_rgba(127,98,196,0.32)]"
                  : "border border-[#E5E4E8] shadow-[0_4px_20px_-4px_rgba(30,19,36,0.08)] hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#6F50B8] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
                {plan.name}
              </div>
              <div className="mb-2 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold tracking-tight text-[#1E1324]">
                  {plan.price}
                </span>
                <span className="text-sm text-[#5D5065]">{plan.period}</span>
              </div>
              {plan.isFree ? (
                <div className="mb-6 text-sm text-[#5D5065]">
                  ✨ Free forever, no credit card
                </div>
              ) : (
                <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-primary">
                  <span>✦</span> 14-day free trial, cancel anytime
                </div>
              )}

              <a
                href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </a>

              <ul className="mt-7 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#1E1324]"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#F4EEFE] text-xs font-bold text-primary">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
