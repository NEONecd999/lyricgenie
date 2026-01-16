import { Button } from "@/components/ui/button";
import { Music, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Musical notes decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-32 left-[15%] text-4xl opacity-20 animate-float">♪</span>
        <span className="absolute top-48 right-[20%] text-3xl opacity-15 animate-float" style={{ animationDelay: "0.5s" }}>♫</span>
        <span className="absolute bottom-40 left-[25%] text-5xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>♬</span>
        <span className="absolute bottom-60 right-[15%] text-4xl opacity-20 animate-float" style={{ animationDelay: "1.5s" }}>♩</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Made by songwriters, for songwriters</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All-in-One
            </span>
            <br />
            Songwriting Notepad
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Capture ideas, shape lyrics, and create together – wherever inspiration hits.
            The ultimate companion for turning your musical thoughts into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="group">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download on App Store
            </Button>
            <Button variant="hero-outline" size="xl">
              <Music className="w-5 h-5" />
              See How It Works
            </Button>
          </motion.div>

          {/* App preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Phone mockup */}
              <div className="relative bg-card rounded-[3rem] p-3 shadow-2xl border border-border/50">
                <div className="bg-foreground/5 rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                        <Music className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">Lyric Genie</h3>
                      <p className="text-sm text-muted-foreground">Real-time co-writing</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating feature cards */}
              <div className="absolute -left-8 top-1/4 bg-card rounded-2xl p-4 shadow-lg border border-border animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Wish Workshop</p>
                    <p className="text-xs text-muted-foreground">✨ AI-powered</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-8 top-1/2 bg-card rounded-2xl p-4 shadow-lg border border-border animate-float hidden md:block" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Music className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Smart Rhymes</p>
                    <p className="text-xs text-muted-foreground">Find the perfect word</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
