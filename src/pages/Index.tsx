import Navbar from "@/components/Navbar";
import HeroEnhanced from "@/components/HeroEnhanced";
import AppStoreBar from "@/components/AppStoreBar";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
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
