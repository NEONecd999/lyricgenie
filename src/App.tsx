import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
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

  if (!fontsLoaded) {
    return null; // Keep showing the HTML loader
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
