import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import HitSongsWrittenFast from "./pages/blog/HitSongsWrittenFast";
import RhymeSchemesThatWork from "./pages/blog/RhymeSchemesThatWork";
import SongwritingMistakes from "./pages/blog/SongwritingMistakes";
import CoWritingSecrets from "./pages/blog/CoWritingSecrets";
import VoiceMemoWorkflow from "./pages/blog/VoiceMemoWorkflow";
import SongwritingToolsGuide from "./pages/blog/SongwritingToolsGuide";
import AIMusicTools2026 from "./pages/blog/AIMusicTools2026";
import NotFound from "./pages/NotFound";
import ScrollToHash from "./components/ScrollToHash";

const queryClient = new QueryClient();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Wait for Lufga font to load before showing content
    document.fonts.ready.then(() => {
      // Check if Lufga is loaded, or set a small timeout as fallback
      const lufgaLoaded = document.fonts.check('16px Lufga');
      if (lufgaLoaded) {
        setFontsLoaded(true);
      } else {
        // Fallback: wait a bit more for font to load
        setTimeout(() => setFontsLoaded(true), 100);
      }
    });

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => setFontsLoaded(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Remove initial loader when fonts are ready
  useEffect(() => {
    if (fontsLoaded) {
      const loader = document.getElementById('initial-loader');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.2s ease-out';
        setTimeout(() => loader.remove(), 200);
      }
    }
  }, [fontsLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/hit-songs-written-in-under-30-minutes" element={<HitSongsWrittenFast />} />
            <Route path="/blog/rhyme-schemes-that-make-songs-unforgettable" element={<RhymeSchemesThatWork />} />
            <Route path="/blog/songwriting-mistakes-killing-your-songs" element={<SongwritingMistakes />} />
            <Route path="/blog/co-writing-secrets-from-nashville" element={<CoWritingSecrets />} />
            <Route path="/blog/voice-memos-to-finished-songs" element={<VoiceMemoWorkflow />} />
            <Route path="/blog/songwriting-tools-guide-2026" element={<SongwritingToolsGuide />} />
            <Route path="/blog/ai-music-tools-2026" element={<AIMusicTools2026 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
