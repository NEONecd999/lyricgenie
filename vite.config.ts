import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";
import prerender from "vite-plugin-prerender";


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
   prerender({
  staticDir: "dist",
  routes: [
    "/",
    "/about",
    "/support",
    "/privacy-policy",
    "/blog",

    // blog posts (you must list each one)
    "/blog/hit-songs-written-in-under-30-minutes",
    "/blog/rhyme-schemes-that-make-songs-unforgettable",
    "/blog/songwriting-mistakes-killing-your-songs",
    "/blog/co-writing-secrets-from-nashville",
    "/blog/voice-memos-to-finished-songs",
    "/blog/songwriting-tools-guide-2026",
    "/blog/ai-music-tools-2026",
  ],
}),
  mode === "development" && componentTagger(),
].filter(Boolean),


  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // You already have this correct for a custom domain:
  base: "/",
}));
