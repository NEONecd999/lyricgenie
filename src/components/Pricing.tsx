import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with songwriting",
    features: [
      "Unlimited songs",
      "Basic rhymes and synonyms",
      "60 minutes of voice recordings",
      "Real-time collaboration",
    ],
    cta: "Get Started Free",
    popular: false,
    hasTrial: false,
  },
  {
    name: "Pro Monthly",
    price: "$4.99",
    period: "/month",
    description: "For songwriters and professional collaborators",
    features: [
      "Everything in Free, plus:",
      "Wish Workshop — AI-powered brainstorming",
      "Spark — creative ideas & song concepts",
      "Smart rhyming, thesaurus & sound-alikes",
      "Smart syllable adjustments",
      "1,000 minutes of voice recordings",
      "5,000 AI requests per month",
    ],
    cta: "Start Free Trial",
    popular: true,
    hasTrial: true,
  },
  {
    name: "Pro Yearly",
    price: "$49.99",
    period: "/year",
    description: "Best value — save over 15%",
    features: [
      "Everything in Free, plus:",
      "Wish Workshop — AI-powered brainstorming",
      "Spark — creative ideas & song concepts",
      "Smart rhyming, thesaurus & sound-alikes",
      "Smart syllable adjustments",
      "1,000 minutes of voice recordings",
      "5,000 AI requests per month",
    ],
    cta: "Start Free Trial",
    popular: false,
    hasTrial: true,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-4">PRICING</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Affordable</span>{" "}
            Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your creative journey. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-card rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10 scale-105"
                  : "border-border hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                {plan.hasTrial && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/30 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                    <span>✦</span> Free 14-day trial
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant={plan.popular ? "hero" : "outline"} className="w-full" size="lg">
                  {plan.cta}
                </Button>
              </a>
              {plan.hasTrial && (
                <p className="text-muted-foreground text-xs text-center mt-3">Trial starts in-app after download</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
