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
        title="Lyric Genie - iOS Songwriting App | All-in-One Notepad"
        description="Lyric Genie is the all-in-one iOS songwriting notepad for real writers. Capture lyrics, melodies, and ideas in one workspace, with AI woven into your flow — never replacing your voice."
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
      <Philosophy />
      <div id="faq">
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
