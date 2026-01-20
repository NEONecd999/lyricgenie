import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Lightbulb } from "lucide-react";
import edanPhoto from "@/assets/edan-dover.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import AppStoreBar from "@/components/AppStoreBar";

const About = () => {
  return <div className="min-h-screen bg-background font-sans">
      <AppStoreBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-32 pb-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{
          animationDelay: "1s"
        }} />
        </div>

        {/* Musical notes decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-32 left-[15%] text-4xl opacity-20 animate-float">♪</span>
          <span className="absolute top-48 right-[20%] text-3xl opacity-15 animate-float" style={{
          animationDelay: "0.5s"
        }}>♫</span>
          <span className="absolute bottom-40 left-[25%] text-5xl opacity-10 animate-float" style={{
          animationDelay: "1s"
        }}>♬</span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">The story behind Lyric Genie</span>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              {/* Photo */}
              <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="w-56 h-56 md:w-64 md:h-64 flex-shrink-0">
                <img alt="Edan Dover" className="w-full h-full object-cover object-top rounded-3xl shadow-xl ring-4 ring-primary/20" src="/lovable-uploads/25d869a9-59be-49cc-afa7-9343c0f9f5b6.jpg" />
              </motion.div>
              
              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Hey, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Edan Dover </span>
                </motion.h1>
                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  I'm a Los Angeles-based music producer and songwriter, and one half of the 
                  multi-platinum band <strong className="text-foreground">The Score</strong>. Over the years, I've been lucky 
                  enough to write songs that have connected with millions of people around the world.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* The Problem */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">What Was Missing</h2>
            </div>
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">After thousands of sessions, I kept running into the same limitations. The existing tools weren't designed for how professional songwriting actually works—the pace, the pressure, the need for instant inspiration when you're in the room with collaborators and every second counts.</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I needed a rhyme tool that understood context, not just phonetics. A place to 
                organize voice memos alongside lyrics. Tools built for the reality of 
                back-to-back LA writing sessions, where efficiency isn't optional.
              </p>
            </div>
          </motion.div>

          {/* AI Philosophy */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-accent/10">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">AI Tools, Done Right</h2>
            </div>
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                There's understandable skepticism about AI in the creative space. Most AI tools 
                try to replace the writer. That's the wrong approach entirely.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6 font-medium">
                Lyric Genie is designed to enhance your process, not replace it.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Think of it as an always-available collaborator for brainstorming—one that can 
                help you find the line that's eluding you, suggest new directions when you're 
                stuck, and keep up no matter how late the session runs. The creative decisions 
                remain yours. We just remove the friction.
              </p>
            </div>
          </motion.div>

          {/* Collaboration */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Built for Professional Collaboration</h2>
            </div>
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Songwriting at a professional level is inherently collaborative. Whether you're 
                in a room with co-writers, on a call, or trading ideas remotely, your tools 
                need to keep pace with how modern sessions actually function.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Share songs instantly, capture ideas before they disappear, export clean lyrics 
                when you need them. Everything is built to serve the creative process, not 
                interrupt it.
              </p>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-4 font-medium">
              Lyric Genie is the tool I always needed.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              I built it for myself, and now it's here for you.
            </p>
            <p className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">— Edan</p>
          </motion.div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>;
};
export default About;