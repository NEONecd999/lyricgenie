import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const { PuppeteerRenderer } = vitePrerender;

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // Only prerender on production builds
    mode !== "development" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/",
          "/about",
          "/support",
          "/privacy-policy",

          // Blog index
          "/blog",

          // Blog articles (from your App.tsx)
          "/blog/hit-songs-written-in-under-30-minutes",
          "/blog/rhyme-schemes-that-make-songs-unforgettable",
          "/blog/songwriting-mistakes-killing-your-songs",
          "/blog/co-writing-secrets-from-nashville",
          "/blog/voice-memos-to-finished-songs",
          "/blog/songwriting-tools-guide-2026",
          "/blog/ai-music-tools-2026",
        ],

        // Puppeteer renders the real page HTML (best for SEO)
        renderer: new PuppeteerRenderer({
          // give your app a moment to finish rendering & remove the loader
          renderAfterTime: 2500,
          // reduces noise + speeds up by skipping nonessential 3rd-party requests
          skipThirdPartyRequests: true,
        }),
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // You already have this correct for a custom domain:
  base: "/",
}));
