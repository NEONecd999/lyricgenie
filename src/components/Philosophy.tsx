import { motion } from "framer-motion";

const Philosophy = () => {
  return (
    <section className="py-24 bg-[hsl(47_60%_94%)] relative overflow-hidden">
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
              Lyric Genie keeps the writer in control, preserving their voice while removing the friction of jumping between Notes, Voice Memos, and external tools. It's built around how songs actually come together — capture, refine, structure, and collaborate — making it the place <strong className="font-semibold text-foreground">where songs are written, not generated.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
