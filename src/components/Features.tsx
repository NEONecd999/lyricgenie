import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import SfIcon from "@/components/SfIcon";
import { ReactNode } from "react";

type Feature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <SfIcon name="person.2.fill" size={28} color="#ffffff" />,
    title: "Real-time Co-writing",
    description:
      "Edit lyrics together from anywhere – just like being in the same room. Built for the pace of professional sessions.",
  },
  {
    icon: <SfIcon name="music.microphone" size={28} color="#ffffff" />,
    title: "Voice Recordings",
    description:
      "Hum a melody, record a hook – keep every idea linked to your lyrics so nothing gets lost between sessions.",
  },
  {
    icon: <SfIcon name="sparkles" size={28} color="#ffffff" />,
    title: "Wish Workshop",
    description:
      "Stuck on a line? Get suggestions, rewrites, and rhymes grounded in your actual song — that retain your voice.",
  },
  {
    icon: <LayoutGrid className="h-7 w-7 text-white" strokeWidth={2} />,
    title: "Arrange Mode",
    description:
      "Drag verses, choruses, and bridges like cards to find the perfect structure. See your song take shape visually.",
  },
  {
    icon: <SfIcon name="character.book.closed.fill" size={28} color="#ffffff" />,
    title: "Smart Dictionaries",
    description:
      "Rhyme, synonym, and multi-syllable dictionaries built for songwriters. Find the perfect word without leaving your flow.",
  },
  {
    icon: <SfIcon name="lightbulb.fill" size={28} color="#ffffff" />,
    title: "Concepts & Scratchpad",
    description:
      "Park half-formed ideas, hooks, and titles before they become songs. Your songwriter's notebook — always with you.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden py-24 bg-background">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary">
            Features
          </div>
          <h2 className="font-display mx-auto max-w-3xl text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight text-[#1E1324]">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#6F50B8] to-[#C48AE3] bg-clip-text text-transparent">
              Write Great Songs
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-[28px] border border-[#E5E4E8] bg-card p-8 shadow-[0_4px_20px_-4px_rgba(30,19,36,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D0C2EE] hover:shadow-[0_20px_40px_-12px_rgba(127,98,196,0.2)]"
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] shadow-[0_10px_22px_-8px_rgba(127,98,196,0.5)]"
                style={{ background: "linear-gradient(135deg,#6F50B8,#C48AE3)" }}
              >
                {feature.icon}
              </div>
              <h3 className="font-display mb-3 text-[22px] font-bold leading-tight tracking-tight text-[#1E1324]">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#5D5065]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
