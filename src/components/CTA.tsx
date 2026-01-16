import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Musical notes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <span className="absolute top-20 left-[20%] text-5xl text-white animate-float">♪</span>
        <span className="absolute bottom-20 right-[25%] text-4xl text-white animate-float" style={{ animationDelay: "0.5s" }}>♫</span>
        <span className="absolute top-1/2 right-[10%] text-6xl text-white animate-float" style={{ animationDelay: "1s" }}>♬</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Write Your Next Hit?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10">
            Join professional songwriters who trust Lyric Genie for every session. 
            Start free today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
              className="inline-flex items-center justify-center gap-2 bg-[#F6ECC9] text-purple-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#F6ECC9]/90 hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download Free on App Store
            </a>
          
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
