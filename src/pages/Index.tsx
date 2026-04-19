import Navbar from "@/components/Navbar";
import HeroEnhanced from "@/components/HeroEnhanced";
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
        title="Lyric Genie — iOS Songwriting App for iPhone, iPad & Mac"
        description="Lyric Genie is a native iOS songwriting app for iPhone, iPad, Mac, and Vision Pro (iOS, iPadOS, macOS, and visionOS). Built by Edan Dover (Edan Dover Inc) — capture ideas, shape lyrics, and co-write in real-time. Available on the App Store."
      />
      <AppStoreBar />
      <Navbar />
      <HeroEnhanced />
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
