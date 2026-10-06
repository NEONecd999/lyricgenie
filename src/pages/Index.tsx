import Navbar from "@/components/Navbar";
import HeroEnhanced from "@/components/HeroEnhanced";
import WebShowcase from "@/components/WebShowcase";
import AnnouncementStrip from "@/components/AnnouncementStrip";
import AppStoreBar from "@/components/AppStoreBar";
import Philosophy from "@/components/Philosophy";
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
        title="Lyric Genie — Songwriting App for iPhone, iPad, Mac & the Web"
        description="Lyric Genie is a songwriting app for iPhone, iPad, Mac and the web. Capture ideas, shape lyrics with AI that writes in your voice, record takes and co-write in real time, with your songs synced everywhere. Start free in your browser or download it on the App Store."
      />
      <AppStoreBar />
      <AnnouncementStrip />
      <Navbar />
      <HeroEnhanced />
      <WebShowcase />
      <div id="features">
        <Features />
      </div>
      <div id="philosophy">
        <Philosophy />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
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
