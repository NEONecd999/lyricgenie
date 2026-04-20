import { motion } from "framer-motion";
import { Star } from "lucide-react";
import derekFuhrmann from "@/assets/derek-fuhrmann.jpg";
import codyTarpley from "@/assets/cody-tarpley.jpg";
import royEnglish from "@/assets/roy-english.jpg";

const testimonials = [
  {
    name: "Cody Tarpley",
    role: "Grammy-Winning Producer",
    credits: "Megan Thee Stallion, Aespa, Chris Brown",
    content: "Lyric Genie is such an inspiring tool that helps keep writing creative, quick and fun.",
    rating: 5,
    image: codyTarpley,
  },
  {
    name: "Derek Fuhrmann",
    role: "Songwriter & Producer",
    credits: "Philip Phillips, OAR, Goo Goo Dolls",
    content:
      "As a professional songwriter this is easily the closest AI has come to making me feel like I have a cowriter in the room. A+",
    rating: 5,
    image: derekFuhrmann,
  },
  {
    name: "Roy English",
    role: "Artist & Songwriter",
    credits: "Jagwar Twin, Alesso, Michaël Brun",
    content:
      "I love how collaborators edit the lyrics in separate tabs, so we don't step on each others' toes. Big vibe.",
    rating: 5,
    image: royEnglish,
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-[#FBFAFD]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
            Loved by songwriters
          </div>
          <h2 className="font-display mx-auto max-w-3xl text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1E1324]">
            Used in writing rooms behind{" "}
            <span className="bg-gradient-to-r from-[#6F50B8] to-[#C48AE3] bg-clip-text text-transparent">
              platinum hits
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-[#E5E4E8] bg-card p-8 shadow-[0_4px_20px_-4px_rgba(30,19,36,0.08)] transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(127,98,196,0.2)] hover:-translate-y-0.5"
            >
              {/* Name + photo + credits header (original layout) */}
              <div className="flex items-start gap-5 mb-5">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
                />
                <div className="pt-1">
                  <p className="text-lg font-semibold text-[#1E1324]">{t.name}</p>
                  <p className="text-sm text-[#5D5065]">{t.role}</p>
                  {t.credits && (
                    <p className="mt-1 text-xs font-medium text-primary">{t.credits}</p>
                  )}
                </div>
              </div>

              {/* Gold stars */}
              <div className="mb-4 flex gap-1 text-[#D9A23A]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="leading-relaxed text-[#1E1324]">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
