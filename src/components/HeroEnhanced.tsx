import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

const HeroEnhanced = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      image: "/images/screenshot_editor.jpeg",
      title: "Real-time co-writing",
      description: "Edit lyrics together from anywhere. See changes live and keep the flow going."
    },
    {
      image: "/images/screenshot_voicerecordings.jpeg",
      title: "Voice Recordings",
      description: "Keep all your melodic ideas organized with your lyrics."
    },
    {
      image: "/images/screenshot_wishworkshop.jpeg",
      title: "Wish Workshop",
      description: "Brainstorm lines, rhyme ideas, and variations without breaking flow."
    },
    {
      image: "/images/screenshot_arrangemode.jpeg",
      title: "Arrange Mode",
      description: "Move verses and choruses like cards to shape your song fast."
    },
    {
      image: "/images/screenshot_rhyme.jpeg",
      title: "Smart Dictionaries",
      description: "Rhyme, synonym, phrase, and multi-syllable dictionaries to find the perfect word."
    },
    {
      image: "/images/screenshot_invite.jpeg",
      title: "Invite Collaborators",
      description: "Easily invite and manage collaborators on your songs."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const startCarousel = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    };
    startCarousel();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-32 md:pt-20">
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
            className="hidden md:inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Built by pro songwriters in LA</span>
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
            Capture ideas, shape lyrics, and co-write in real-time – built for the flow of professional sessions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="https://apps.apple.com/us/app/lyric-genie/id6739787614">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download on App Store
              </a>
            </Button>
            {/* Uncomment when ready to link to a demo/video:
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#demo">
                <Music className="w-5 h-5" />
                See How It Works
              </a>
            </Button>
            */}
          </motion.div>

          {/* App preview with iPhone Slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pb-16 relative"
          >
            <div className="relative mx-auto w-[300px] md:w-[360px]">
              {/* Music notes around iPhone */}
              <span className="absolute -left-20 top-[10%] text-3xl text-primary/30 animate-float z-30">♪</span>
              <span className="absolute -right-16 top-[20%] text-2xl text-accent/30 animate-float z-30" style={{ animationDelay: "0.3s" }}>♫</span>
              <span className="absolute -left-12 top-[45%] text-4xl text-primary/25 animate-float z-30" style={{ animationDelay: "0.7s" }}>♬</span>
              <span className="absolute -right-14 top-[50%] text-3xl text-accent/25 animate-float z-30" style={{ animationDelay: "1.1s" }}>♩</span>
              <span className="absolute -left-16 top-[75%] text-2xl text-primary/30 animate-float z-30" style={{ animationDelay: "1.4s" }}>♫</span>
              <span className="absolute -right-20 top-[80%] text-4xl text-accent/20 animate-float z-30" style={{ animationDelay: "1.8s" }}>♪</span>
              <span className="absolute left-[20%] -top-8 text-2xl text-primary/25 animate-float z-30" style={{ animationDelay: "2.1s" }}>♬</span>
              <span className="absolute right-[25%] -top-6 text-3xl text-accent/30 animate-float z-30" style={{ animationDelay: "0.9s" }}>♩</span>

              {/* Floating feature cards - matching old website structure */}
              <div className="absolute -left-44 lg:-left-72 top-[5%] z-30 animate-float hidden md:block min-w-[220px]">
                <div className="text-xs text-primary/80 uppercase tracking-wider font-semibold mb-1">Smart Dictionaries</div>
                <div className="bg-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-sm text-foreground">display → <span className="text-primary">overlay, gateway, replay</span></span>
                    <span className="text-xs text-muted-foreground">Multi & Phrases: fade away</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-44 lg:-right-72 top-[20%] z-30 animate-float hidden md:block min-w-[200px]" style={{ animationDelay: "2s" }}>
                <div className="text-xs text-primary/80 uppercase tracking-wider font-semibold mb-1">Syllable Tool</div>
                <div className="bg-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                  <div className="text-sm text-foreground mb-2 text-left">Remove 1 syllable</div>
                  <div className="flex gap-2">
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-xl text-xs">might be real</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-xl text-xs">could be real</span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-40 lg:-left-64 top-[35%] z-30 animate-float hidden md:block min-w-[200px]" style={{ animationDelay: "1s" }}>
                <div className="text-xs text-primary/80 uppercase tracking-wider font-semibold mb-1">Voice Recording</div>
                <div className="bg-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                  <div className="text-sm text-foreground mb-2 text-left">Verse Melody Idea</div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-[3px] items-center h-6">
                      <span className="w-[3px] bg-primary rounded-sm animate-[wave_1.2s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0s' }}></span>
                      <span className="w-[3px] bg-primary rounded-sm animate-[wave_1.2s_ease-in-out_infinite]" style={{ height: '14px', animationDelay: '0.1s' }}></span>
                      <span className="w-[3px] bg-primary rounded-sm animate-[wave_1.2s_ease-in-out_infinite]" style={{ height: '20px', animationDelay: '0.2s' }}></span>
                      <span className="w-[3px] bg-primary rounded-sm animate-[wave_1.2s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0.3s' }}></span>
                      <span className="w-[3px] bg-primary rounded-sm animate-[wave_1.2s_ease-in-out_infinite]" style={{ height: '16px', animationDelay: '0.4s' }}></span>
                    </div>
                    <span className="text-sm text-muted-foreground">0:42</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-40 lg:-right-72 top-[55%] z-30 animate-float hidden md:block min-w-[200px]" style={{ animationDelay: "3s" }}>
                <div className="text-xs text-primary/80 uppercase tracking-wider font-semibold mb-1">Wish Workshop</div>
                <div className="bg-card rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col gap-1.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.7rem] text-primary">✨</span>
                      <span className="text-[0.8rem] text-muted-foreground">dancing in the moonlight</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.7rem] text-primary">✨</span>
                      <span className="text-[0.8rem] text-muted-foreground">swaying through the starlight</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* iPhone Frame */}
              <div className="relative z-20">
                {/* Outer frame - black bezel */}
                <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[50px] p-[12px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)]">
                  {/* Inner bezel with subtle shine */}
                  <div className="absolute inset-[3px] rounded-[47px] bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] pointer-events-none" />
                  
                  {/* Screen area */}
                  <div className="relative bg-black rounded-[38px] overflow-hidden aspect-[9/19.5]">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-30" />
                    
                    {/* Carousel slides */}
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                      >
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    
                    {/* Caption overlay */}
                    <div className="absolute left-0 right-0 bottom-12 px-3 flex justify-center text-center z-20">
                      <div className="inline-flex flex-col gap-1 items-center px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-xl">
                        <strong className="text-white font-bold text-sm">{slides[currentSlide].title}</strong>
                        <small className="text-white/80 text-[11px] leading-snug max-w-[200px]">{slides[currentSlide].description}</small>
                      </div>
                    </div>

                    {/* Navigation dots */}
                    <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-1.5 z-20">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-white w-4' 
                              : 'bg-white/40 w-1.5 hover:bg-white/60'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Side buttons */}
                <div className="absolute right-[-2px] top-[120px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r-sm" />
                <div className="absolute left-[-2px] top-[100px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[145px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[205px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroEnhanced;
