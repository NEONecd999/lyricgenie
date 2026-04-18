import { motion } from "framer-motion";

const Philosophy = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-primary font-semibold mb-4">OUR PHILOSOPHY</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
            AI should support songwriting,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              not replace it.
            </span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Lyric Genie isn't an AI generator. Instead of prompting a tool to spit out a full song, you write naturally in a clean, distraction-free workspace where lyrics, melodies, and ideas live together. AI sits inside your flow — suggesting lines, rewrites, and rhymes based on your actual song — so you can move forward without it taking over.
            </p>
            <p>
              You stay in control. Your voice stays intact. We just remove the friction of jumping between Notes, Voice Memos, and a stack of external tools — and give you the place where songs are actually written.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
