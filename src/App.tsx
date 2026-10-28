import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProHome from "./pages/ProHome";
import WebPage from "./pages/WebPage";
import IPhonePage from "./pages/IPhonePage";
import RhymeEnginePage from "./pages/RhymeEnginePage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import HitSongsWrittenFast from "./pages/blog/HitSongsWrittenFast";
import RhymeSchemesThatWork from "./pages/blog/RhymeSchemesThatWork";
import SongwritingMistakes from "./pages/blog/SongwritingMistakes";
import CoWritingSecrets from "./pages/blog/CoWritingSecrets";
import VoiceMemoWorkflow from "./pages/blog/VoiceMemoWorkflow";
import SongwritingToolsGuide from "./pages/blog/SongwritingToolsGuide";
import AIMusicTools2026 from "./pages/blog/AIMusicTools2026";
import CoWriteRemotely from "./pages/blog/CoWriteRemotely";
import MultisyllabicRhymes from "./pages/blog/MultisyllabicRhymes";
import RhymeSchemesExplained from "./pages/blog/RhymeSchemesExplained";
import CreditsAndLyricSheets from "./pages/blog/CreditsAndLyricSheets";
import BestSongwritingAppsMacPC from "./pages/blog/BestSongwritingAppsMacPC";
import AISongwritingAppPage from "./pages/AISongwritingAppPage";
import CoWritingAppPage from "./pages/CoWritingAppPage";
import RhymeAppPage from "./pages/RhymeAppPage";
import NotFound from "./pages/NotFound";
import ScrollToHash from "./components/ScrollToHash";

const queryClient = new QueryClient();

// Detect if we're being prerendered by react-snap
const isPrerendering = navigator.userAgent.includes('ReactSnap');

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(isPrerendering); // Skip font wait during prerender

  useEffect(() => {
    // Skip font loading check during prerendering
    if (isPrerendering) {
      setFontsLoaded(true);
      return;
    }

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
            <Route path="/" element={<ProHome />} />
            <Route path="/pro" element={<Navigate to="/" replace />} />
            <Route path="/web" element={<WebPage />} />
            <Route path="/iphone" element={<IPhonePage />} />
            <Route path="/rhyme-engine" element={<RhymeEnginePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/help" element={<Navigate to="/support" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/hit-songs-written-in-under-30-minutes" element={<HitSongsWrittenFast />} />
            <Route path="/blog/rhyme-schemes-that-make-songs-unforgettable" element={<RhymeSchemesThatWork />} />
            <Route path="/blog/songwriting-mistakes-killing-your-songs" element={<SongwritingMistakes />} />
            <Route path="/blog/co-writing-secrets-from-nashville" element={<CoWritingSecrets />} />
            <Route path="/blog/voice-memos-to-finished-songs" element={<VoiceMemoWorkflow />} />
            <Route path="/blog/songwriting-tools-guide-2026" element={<SongwritingToolsGuide />} />
            <Route path="/blog/ai-music-tools-2026" element={<AIMusicTools2026 />} />
            {/* Drafts for review (noindex until published) */}
            <Route path="/blog/how-to-co-write-a-song-remotely" element={<CoWriteRemotely />} />
            <Route path="/blog/multisyllabic-rhymes-examples" element={<MultisyllabicRhymes />} />
            <Route path="/blog/rhyme-schemes-explained" element={<RhymeSchemesExplained />} />
            <Route path="/blog/songwriting-credits-splits-lyric-sheet" element={<CreditsAndLyricSheets />} />
            <Route path="/blog/best-songwriting-apps-mac-pc-2026" element={<BestSongwritingAppsMacPC />} />
            {/* Answer-first pages (components/studio/Landing.tsx), published 2026-10-28 */}
            <Route path="/ai-songwriting-app" element={<AISongwritingAppPage />} />
            <Route path="/co-writing-app" element={<CoWritingAppPage />} />
            <Route path="/rhyme-app-for-songwriters" element={<RhymeAppPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
