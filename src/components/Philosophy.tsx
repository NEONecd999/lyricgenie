import { motion } from "framer-motion";
import edanPhoto from "@/assets/edan-dover-small.jpg";

const Philosophy = () => {
  return (
    <section id="philosophy" className="relative overflow-hidden py-24 md:py-28 bg-[#FAF4DD]">
      {/* Soft purple glow orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-[340px] w-[340px] rounded-full bg-[#B19BE2]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-[280px] w-[280px] rounded-full bg-[#6F50B8]/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-20">
          {/* Left column — eyebrow, headline, body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-primary">
              Our Philosophy
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.08] tracking-tight text-[#1E1324] mb-6">
              Real craft,<br />
              <span className="bg-gradient-to-r from-[#6F50B8] to-[#B167D1] bg-clip-text text-transparent">
                not AI slop.
              </span>
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#5D5065]">
              Lyric Genie was built by working songwriters, not AI techies. We've developed tools
              that help you brainstorm ideas, explore new perspectives and push past writer's
              block — tools that help you, not replace you.
            </p>
          </motion.div>

          {/* Right column — quote card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-[28px] border border-[#E5E4E8]/80 bg-white p-10 shadow-[0_20px_48px_-12px_rgba(30,19,36,0.12)]"
          >
            {/* Decorative quote mark — larger and dropped further from the top */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-9 select-none text-[140px] font-serif leading-none text-primary/30"
              style={{ top: 28 }}
            >
              &ldquo;
            </div>
            <p className="font-serif italic text-[22px] leading-[1.5] text-[#1E1324] mt-14 mb-6">
              One-shot prompting isn't songwriting. Songwriting is editing, revising, iterating,
              exploring. AI should help writers say something real in their own unique voice, not
              replace it.
            </p>
            <div className="flex items-center gap-3 border-t border-[#E5E4E8] pt-4">
              <img
                src={edanPhoto}
                alt="Edan Dover"
                loading="lazy"
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold text-[#1E1324]">Edan Dover</div>
                <div className="text-xs text-[#5D5065]">Producer &amp; Songwriter · Founder, Lyric Genie</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
