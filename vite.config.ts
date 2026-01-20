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
    vitePrerender({
      staticDir: path.resolve(__dirname, "dist"),
      routes: [
        "/",
        "/about",
        "/support",
        "/privacy-policy",
        "/blog",
        "/blog/hit-songs-written-in-under-30-minutes",
        "/blog/rhyme-schemes-that-make-songs-unforgettable",
        "/blog/songwriting-mistakes-killing-your-songs",
        "/blog/co-writing-secrets-from-nashville",
        "/blog/voice-memos-to-finished-songs",
        "/blog/songwriting-tools-guide-2026",
        "/blog/ai-music-tools-2026",
      ],
      renderer: new PuppeteerRenderer({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      }),
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  base: "/",
}));
