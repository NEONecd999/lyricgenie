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
              Lyric Genie isn't an AI generator. You write — lyrics, melodies, and ideas in one clean workspace — and AI suggests lines, rewrites, and rhymes based on what you've actually written.
            </p>
            <p>
              Your voice stays intact. No more juggling Notes, Voice Memos, and a stack of external tools.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
