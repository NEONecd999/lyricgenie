import "./index.css";
import { ViteSSG } from "vite-plugin-ssg";
import App from "./App";
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

export const createApp = ViteSSG(
  App,
  {
    routes: [
      { path: "/", element: <Index /> },
      { path: "/about", element: <About /> },
      { path: "/support", element: <Support /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },

      // blog
      { path: "/blog", element: <Blog /> },
      { path: "/blog/hit-songs-written-in-under-30-minutes", element: <HitSongsWrittenFast /> },
      { path: "/blog/rhyme-schemes-that-make-songs-unforgettable", element: <RhymeSchemesThatWork /> },
      { path: "/blog/songwriting-mistakes-killing-your-songs", element: <SongwritingMistakes /> },
      { path: "/blog/co-writing-secrets-from-nashville", element: <CoWritingSecrets /> },
      { path: "/blog/voice-memos-to-finished-songs", element: <VoiceMemoWorkflow /> },
      { path: "/blog/songwriting-tools-guide-2026", element: <SongwritingToolsGuide /> },
      { path: "/blog/ai-music-tools-2026", element: <AIMusicTools2026 /> },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  }
);
