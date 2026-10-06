import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { WEB_APP, WEB_SIGNUP } from "@/lib/links";

/**
 * "Now on the web": real screenshots of the web app (app.lyricgenie.app) in a browser frame, one
 * per tab, with a caption each and a sign-up button. Dark, like the hero, so the dark-mode shots sit
 * in their own light.
 */
const SHOTS = [
  {
    key: "workspace",
    tab: "Workspace",
    src: "/images/web/editor.jpg",
    alt: "The Lyric Genie web app: a song in the editor, with AI context and sections on the left and brainstorming tools on the right",
    caption: "A desktop workspace for long sessions: your song in the middle, its context and sections on one side, every writing tool on the other.",
  },
  {
    key: "genie",
    tab: "Genie",
    src: "/images/web/genie-chat.jpg",
    alt: "Genie, the AI co-writer, suggesting a line edit for the chorus in a side panel",
    caption: "Genie reads the song as it is right now and talks it through with you. Its line edits apply in one click.",
  },
  {
    key: "wish",
    tab: "Wish Workshop",
    src: "/images/web/wish.jpg",
    alt: "Wish Workshop showing rewrites of a phrase, with the chosen one previewed right in the lyrics",
    caption: "Wish Workshop rewrites a word, a phrase or a whole section, and previews each option right in your lyrics.",
  },
  {
    key: "rhymes",
    tab: "Rhymes",
    src: "/images/web/rhymes.jpg",
    alt: "Rhymes for a selected word, with single-syllable and multi-word rhymes side by side",
    caption: "Select anything for rhymes, multi-syllable rhymes, synonyms and syllable counts, without leaving the page.",
  },
] as const;

const POINTS = [
  "The same songs as your iPhone, synced live",
  "Genie, your AI co-writer, in the side panel",
  "Recordings with waveforms, transcripts and linked lyrics",
  "Keyboard shortcuts, bulk select and a full-screen Perform mode",
];

const WebShowcase = () => {
  const [active, setActive] = useState<(typeof SHOTS)[number]["key"]>("workspace");
  const shot = SHOTS.find((s) => s.key === active)!;
  return (
    <section id="web" className="relative overflow-hidden bg-[#1E1324] py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#6F50B8]/25 blur-3xl" />
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-[#F6ECC9]/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#F6ECC9]">
            New · Now on the web
          </div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Write at your desk, <span className="text-[#F6ECC9]">with everything in reach.</span>
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Lyric Genie now runs in your browser on any computer. Sign in with the account you use on your phone and pick up right where you left off.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-5 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Web app screenshots">
          {SHOTS.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active === s.key}
              onClick={() => setActive(s.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === s.key ? "bg-[#F6ECC9] text-[#6F50B8]" : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Browser frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#141015] shadow-[0_40px_120px_-30px_rgba(111,80,184,0.55)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-[#FF5F57]" />
            <span className="size-3 rounded-full bg-[#FEBC2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
            <span className="mx-auto rounded-md bg-white/5 px-10 py-1 text-xs text-white/50">app.lyricgenie.app</span>
          </div>
          <div className="relative aspect-[16/10]">
            {SHOTS.map((s) => (
              <img
                key={s.key}
                src={s.src}
                alt={s.alt}
                width={1920}
                height={1200}
                loading={s.key === "workspace" ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${active === s.key ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </motion.div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] text-white/70">{shot.caption}</p>

        <div className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p} className="flex items-start gap-3 text-[15px] text-white/85">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F6ECC9]/15 text-[#F6ECC9]">
                <Check className="size-3.5" />
              </span>
              {p}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={WEB_SIGNUP}
            className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-8 py-4 text-[15.5px] font-semibold text-[#6F50B8] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all hover:bg-[#FBF2D6]"
          >
            Start writing free in your browser <ArrowRight className="size-5" />
          </a>
          <a href={WEB_APP} className="text-sm font-semibold text-white/75 hover:text-white">
            Already have an account? Open the web app
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebShowcase;
