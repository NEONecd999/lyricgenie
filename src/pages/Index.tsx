import Navbar from "@/components/Navbar";
import HeroEnhanced from "@/components/HeroEnhanced";
import AppStoreBar from "@/components/AppStoreBar";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Lyric Genie - Your All-in-One Songwriting Notepad"
        description="Capture ideas, shape lyrics, and co-write in real-time. Built for the flow of professional sessions. Rhyme dictionaries, voice memos, arrange mode, and more."
      />
      <AppStoreBar />
      <Navbar />
      <HeroEnhanced />
      <div id="features">
        <Features />
      </div>
      <Testimonials />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
