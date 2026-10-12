import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AudioWaveform, Bell, BookOpen, CassetteTape, Check, ChevronDown, ChevronUp, Compass, Ellipsis, Eye, FileText, ListOrdered, Maximize2, Menu, MessageSquareText, MessagesSquare, Mic, Moon, NotebookPen, PanelLeft, PanelRight, Presentation, Redo2, ScrollText, Search, Share, SlidersVertical, Sparkles, Undo2, Users, Video, X } from "lucide-react";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import SfIcon from "@/components/SfIcon";
import {
  AiContextSpotlight,
  CompactConcepts,
  CompactImport,
  CompactPerformance,
  CompactProjects,
  CompactSheet,
  CompactVoice,
  FeatureKeyframes,
  FreestyleSpotlight,
  RhymeSpotlight,
  WishWorkshopSpotlight,
} from "@/components/Features";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { APP_STORE, WEB_APP, WEB_SIGNIN, WEB_SIGNUP, webTrial } from "@/lib/links";
import codyTarpley from "@/assets/cody-tarpley.jpg";
import royEnglish from "@/assets/roy-english.jpg";

/**
 * The building blocks of the dark "studio" pages (/pro, /web, /iphone, /rhyme-engine, /pricing): the
 * nav, headings, frames, the interface mockups and the shared sections. Each page sets its accent with
 * the --acc CSS variable (StudioPage); everything else is the same on every page.
 */

export const C = { accent: "#AB8EE2", coral: "#FF8A65", blue: "#64A8FF", amber: "#F5B642", green: "#30D158" };
export const MONTHLY = 4.99;
export const YEARLY = 29.99;

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

export const Eyebrow = ({ children }: { children: ReactNode }) => <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--acc,#AB8EE2)]">{children}</p>;

export function Head({ eyebrow, title, lead, center = false }: { eyebrow: ReactNode; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-md"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-[34px] font-bold leading-[1.08] tracking-tight text-white md:text-[46px]">{title}</h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-white/65">{lead}</p>}
    </Reveal>
  );
}

export function Window({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#141015] shadow-[0_40px_120px_-30px_rgba(111,80,184,0.55)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded-md bg-white/5 px-10 py-1 text-xs text-white/50">app.lyricgenie.app</span>
      </div>
      {children}
    </div>
  );
}

export const Avatar = ({ letter, color }: { letter: string; color: string }) => (
  <span className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: color, boxShadow: "0 0 0 2px #1B1B1B" }}>
    {letter}
  </span>
);

export const PrimaryCTA = ({ children = "Start free in your browser" }: { children?: ReactNode }) => (
  <a href={WEB_SIGNUP} className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-7 py-3.5 text-[15.5px] font-semibold text-[#6F50B8] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all hover:bg-[#FBF2D6]">
    {children} <ArrowRight className="size-5" />
  </a>
);

export const AppStoreCTA = ({ children = "Download for iPhone" }: { children?: ReactNode }) => (
  <a href={APP_STORE} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-white/5">
    {children}
  </a>
);

// ─── Nav ────────────────────────────────────────────────────────────────────

const NAV = [
  ["Web", "/web/"],
  ["iPhone", "/iphone/"],
  ["RhymeGold", "/rhyme-engine/"],
  ["Pricing", "/pricing/"],
  ["Help", "/help/"],
] as const;

/** The studio pages' nav: the wordmark, the pages (the current one lit), Sign in and Start free. Phones: a
 *  menu button that opens the pages in a panel under the bar. */
export function StudioNav({ current }: { current?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Open: Escape closes it, and the page behind doesn't scroll. The lock goes on <html>, not <body>:
  // html and body have overflow-x: clip (index.css), so overflow on body would make it its own scroll box
  // and the sticky bar would jump to the top of the page, out of sight when scrolled down.
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      root.style.overflow = overflow;
    };
  }, [open]);
  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled || open ? "border-b border-white/10 bg-[#1E1324]/95 backdrop-blur-lg" : "border-b border-transparent"}`}>
      <div className="container mx-auto flex h-16 items-center gap-4 px-6 md:gap-8">
        <a href="/" className="flex shrink-0 items-center text-[#F6ECC9]" aria-label="Lyric Genie home">
          <Wordmark className="h-6 w-auto sm:h-7" />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} aria-current={current === href ? "page" : undefined} className={`text-sm font-medium transition-colors hover:text-white ${current === href ? "text-white" : "text-white/60"}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <a href={WEB_SIGNIN} className="hidden text-sm font-semibold text-white/75 hover:text-white md:block">
            Sign in
          </a>
          <a href={WEB_SIGNUP} className="whitespace-nowrap rounded-full bg-[#F6ECC9] px-3.5 py-2 text-sm font-semibold text-[#6F50B8] hover:bg-[#FBF2D6] sm:px-4">
            Start free
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="studio-menu"
            className="-mr-2 flex size-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open &&
        // Fixed to the screen, under the bar: there wherever the page is scrolled to. Rendered into <body>:
        // the bar's backdrop blur would otherwise make the bar the box `fixed` is measured from.
        createPortal(
        <div id="studio-menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto overscroll-contain border-t border-white/10 bg-[#1E1324] md:hidden">
          <nav className="container mx-auto flex flex-col px-6 py-4">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={current === href ? "page" : undefined}
                className={`flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-2xl font-semibold ${current === href ? "text-[#F6ECC9]" : "text-white"}`}
              >
                {label}
                <ArrowRight className="size-5 text-white/30" />
              </a>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href={WEB_SIGNUP} className="rounded-full bg-[#F6ECC9] py-3.5 text-center text-[15.5px] font-semibold text-[#6F50B8]">
                Start free in your browser
              </a>
              <a href={APP_STORE} className="rounded-full border border-white/20 py-3.5 text-center text-[15.5px] font-semibold text-white">
                Download for iPhone
              </a>
              <a href={WEB_SIGNIN} className="py-2 text-center text-sm font-semibold text-white/70">
                Sign in
              </a>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </header>
  );
}

/** A soft glow in the page's colour (--glow), for behind heroes and pictures. */
export const Glow = ({ className, strength = 30 }: { className: string; strength?: number }) => (
  <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} style={{ background: `color-mix(in srgb, var(--glow, #6F50B8) ${strength}%, transparent)` }} />
);

/**
 * One studio page: dark plum throughout, its own accent (eyebrows, highlights) and glow colour, the nav
 * and the footer. Kept out of search while these are drafts.
 */
export function StudioPage({ title, description, current, accent = "#AB8EE2", glow = "#6F50B8", children }: { title: string; description: string; current?: string; accent?: string; glow?: string; children: ReactNode }) {
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <div className="min-h-screen bg-[#1E1324] font-sans text-white antialiased" style={{ ["--acc" as string]: accent, ["--glow" as string]: glow }}>
      <SEO title={title} description={description} />
      <StudioNav current={current} />
      {/* Up under the sticky bar (h-16), so the hero shows through it while it's transparent; heroes add 4rem to their top padding */}
      <div className="-mt-16">{children}</div>
      <Footer />
    </div>
  );
}

// ─── Hero art: the desk and the pocket ──────────────────────────────────────

export const LYRICS = ["I became another stranger", "No way that I could be forgiven", "Oh what have I done", "Now I'm lost, like a ghost,", "bleeding out for your love"];
// As the iPhone app colours them (App Store screenshots, 2026-10): the owner green, a co-writer purple,
// Master amber. Both devices use the same, so it reads as one song.
export const WRITERS = [
  { name: "Edan", color: "#8BC34A" },
  { name: "Anton", color: C.accent },
  { name: "Master", color: C.amber },
];

/** Draws `children` on a fixed design-size canvas, scaled to the width it's given (so it stays crisp). */
export function Scaled({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className="relative w-full" style={{ height: h * k }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${k})` }}>
        {children}
      </div>
    </div>
  );
}

/** A simplified Lyric Genie in a browser window, dark mode: sidebar, the song with writer tabs, tools. */
export function BrowserArt() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#1B1B1B] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#141015] px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded-md bg-white/5 px-8 py-0.5 text-[10px] text-white/45">app.lyricgenie.app</span>
      </div>
      {/* App bar */}
      <div className="flex items-center gap-4 border-b border-white/[0.07] bg-[#252525] px-4 py-2.5">
        <Wordmark className="h-[11px] w-auto text-[#AB8EE2]" />
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-[#AB8EE2]">Songs</span>
        <span className="text-[10px] text-white/55">Concepts</span>
        <span className="text-[10px] text-white/55">Recordings</span>
        <span className="ml-auto flex -space-x-1.5">
          {WRITERS.slice(0, 2).map((w) => (
            <span key={w.name} className="flex size-5 items-center justify-center rounded-full text-[8px] font-bold text-white" style={{ background: w.color, boxShadow: "0 0 0 1.5px #252525" }}>
              {w.name[0]}
            </span>
          ))}
        </span>
      </div>
      <div className="grid h-[318px] grid-cols-[130px_1fr_150px] bg-[#252525]">
        {/* Sidebar */}
        <div className="space-y-3 border-r border-white/[0.07] p-3.5">
          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">AI context</p>
          <div>
            <p className="text-[8px] font-semibold text-white/45">Mood</p>
            <p className="text-[10px] leading-snug text-white/85">Cinematic, late-night</p>
          </div>
          <div>
            <p className="text-[8px] font-semibold text-white/45">Theme</p>
            <p className="text-[10px] leading-snug text-white/85">Chasing an old flame down the highway</p>
          </div>
          <p className="pt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">Sections</p>
          {["Verse 1", "Chorus", "Verse 2", "Bridge"].map((x) => (
            <p key={x} className="text-[10px] font-medium text-white/80">
              {x}
            </p>
          ))}
        </div>
        {/* The song */}
        <div className="p-4">
          <div className="h-full rounded-xl border border-white/[0.07] bg-[#1B1B1B] px-5 py-4">
            <p className="font-serif text-[22px] font-bold not-italic text-[#F2EDE4]">Night Ride</p>
            <div className="mt-2 flex gap-1">
              {WRITERS.map((w, i) => (
                <span key={w.name} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${i === 0 ? "bg-white/10 text-white" : "text-white/55"}`}>
                  <span className="size-1.5 rounded-full" style={{ background: w.color }} />
                  {w.name}
                </span>
              ))}
            </div>
            <p className="mt-3 font-serif text-[12px] font-bold not-italic text-[#AB8EE2]">Verse 1</p>
            <div className="mt-0.5 space-y-[3px] font-serif text-[12.5px] not-italic leading-snug text-[#F2EDE4]/90">
              {LYRICS.map((l, i) => (
                <p key={l} className="flex items-center">
                  {l}
                  {i === 2 && (
                    <>
                      <span className="ml-0.5 inline-block h-3.5 w-[1.5px] rounded-full" style={{ background: WRITERS[1].color }} />
                      <span className="ml-1 rounded px-1 py-px font-sans text-[8px] font-semibold leading-none text-[#1B0F31]" style={{ background: WRITERS[1].color }}>
                        Anton
                      </span>
                    </>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* Tools */}
        <div className="space-y-2 border-l border-white/[0.07] p-3">
          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">Spark</p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ["Sections", "linear-gradient(135deg,#7251BD,#B870DB)"],
              ["Titles", "linear-gradient(135deg,#E05297,#F4845F)"],
              ["Phrases", "linear-gradient(135deg,#2563EB,#38BDF8)"],
              ["Lines", "linear-gradient(135deg,#D97706,#FBBF24)"],
            ].map(([t, g]) => (
              <span key={t} className="flex h-12 items-end rounded-lg p-1.5 text-[8.5px] font-bold text-white" style={{ background: g }}>
                {t}
              </span>
            ))}
          </div>
          <p className="pt-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">Rhymes · stranger</p>
          <div className="flex flex-wrap gap-1">
            {["danger", "anger", "changer", "ranger", "safer"].map((r) => (
              <span key={r} className="rounded-full bg-white/[0.07] px-1.5 py-0.5 text-[9px] text-white/80">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * A simplified Lyric Genie on iPhone, dark mode, as the current editor looks (App Store screenshots,
 * 2026-10): the toolbar with its recording capsule, AI context, the title, folder tabs per writer, the
 * lyrics, and Arrange / Spark / Genie along the bottom.
 */
export function PhoneArt() {
  const ink = "#F2EDE4";
  const icon = (name: string, size = 11, color = "#AB8EE2") => <SfIcon name={name} size={size} color={color} />;
  return (
    // A real iPhone's proportions: the screen is about 9 : 19.5, inside a thin bezel with rounded corners.
    <div className="rounded-[15%/7%] border border-white/15 bg-[#0D0910] p-[3.2%] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[12.5%/5.8%] bg-[#252525]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 text-[9px] font-semibold text-white">
          <span>9:41</span>
          <span className="h-[18px] w-[64px] rounded-full bg-black" />
          <span className="h-1.5 w-3 rounded-sm bg-[#30D158]" />
        </div>
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-3 pt-2.5">
          {icon("chevron.left", 10)}
          {icon("arrow.uturn.backward", 10)}
          {icon("arrow.uturn.forward", 10, "rgba(171,142,226,0.45)")}
          <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/[0.08] px-2 py-1">
            {icon("recordingtape", 10)}
            <span className="flex size-2.5 items-center justify-center rounded-full border border-[#FF5A52]">
              <span className="size-1.5 rounded-full bg-[#FF5A52]" />
            </span>
            {icon("wand.and.sparkles", 10)}
          </span>
          <MessagesSquare className="size-[11px] text-[#AB8EE2]" />
          <ScrollText className="size-[11px] text-[#AB8EE2]" />
          {icon("ellipsis.circle", 11)}
        </div>
        <p className="mt-1.5 truncate px-3.5 text-[7.5px] text-white/45">
          <span className="font-semibold text-white/60">AI Context</span> Cinematic, late-night · No turning back…
        </p>
        <div className="mx-3.5 mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5">
          <p className="text-[15px] font-bold" style={{ color: ink }}>
            Night Ride
          </p>
          <span className="flex size-5 items-center justify-center rounded-full bg-white/[0.08]">{icon("sparkles", 9)}</span>
        </div>
        {/* Folder tabs, one per writer */}
        <div className="mx-3 mt-1.5 flex items-end gap-0.5 border-b border-white/10">
          {WRITERS.map((w, i) => (
            <span
              key={w.name}
              className={`flex items-center gap-1 rounded-t-md border border-b-0 px-1.5 py-1 text-[7.5px] font-semibold ${i === 0 ? "border-white/15 bg-[#2E2E2E]" : "border-white/[0.06] bg-white/[0.03]"}`}
              style={{ color: w.color }}
            >
              {i === 0 ? <span className="size-2.5 rounded-full" style={{ background: w.color }} /> : i === 1 ? "☆" : "▤"}
              {i === 0 ? `${w.name} (You)` : w.name}
            </span>
          ))}
        </div>
        {/* Lyrics */}
        <div className="space-y-[5px] px-3.5 pt-2.5 text-[9.5px] leading-snug" style={{ color: ink }}>
          <p className="text-[9.5px] font-bold" style={{ color: WRITERS[0].color }}>
            Verse 1
          </p>
          {LYRICS.slice(0, 4).map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="pt-1 text-[9.5px] font-bold" style={{ color: WRITERS[0].color }}>
            Chorus
          </p>
          <p>It's just you and I</p>
          <p>I'll take you on a night ride</p>
          <p>It's just you and I</p>
          <p>We'll drive until the sunlight</p>
          <p className="pt-1 text-[9.5px] font-bold" style={{ color: WRITERS[0].color }}>
            Verse 2
          </p>
          <p>Headlights bleed into the rain</p>
          <p className="text-white/40">Chasing your ghost down Fifth again…</p>
        </div>
        {/* Arrange on the left; Spark and Genie on the right */}
        <div className="absolute inset-x-2.5 bottom-4 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-[#3A3A3A]/80 px-2 py-1 text-[8px] font-semibold text-[#C9B6F0] backdrop-blur">
            {icon("square.grid.2x2", 8, "#C9B6F0")} Arrange
          </span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-[#7F62C4] px-2 py-1 text-[8px] font-semibold text-white">
            <SfIcon src="/images/lamp.svg" size={10} color="#fff" /> Spark
          </span>
          <span className="flex items-center gap-1 rounded-full bg-[#7F62C4] px-2 py-1 text-[8px] font-semibold text-white">
            <SfIcon src="/images/genie-icon.svg" size={10} color="#fff" /> Genie
          </span>
        </div>
        <span className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
    </div>
  );
}

/** The hero's picture: the browser app behind, the iPhone app overlapping it in front, a co-writer's chip. */
/** A small floating piece of the app in the hero, at depth `z`. */
const Float = ({ style, className, children }: { style: React.CSSProperties; className: string; children: ReactNode }) => (
  <div className={`absolute flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1B1B1B]/95 px-3 py-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] ${className}`} style={style}>
    {children}
  </div>
);

/**
 * The hero's picture in 3D: the browser app set back in depth, the iPhone app in front of it, a
 * co-writer's chip nearest. The scene turns slowly by itself and leans toward the pointer. One
 * requestAnimationFrame loop writes the transform directly (no re-renders), easing toward its target so
 * it never jitters; with reduced motion it holds a gentle, still angle.
 */
export function HeroDevices() {
  const stage = useRef<HTMLDivElement>(null);
  // Arrival: every layer starts far back and off to a side, then flies to its place in depth, one after
  // another. With reduced motion they're simply there.
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setArrived(true);
    // Two frames, so the starting positions are painted before the move.
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(() => setArrived(true))));
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, []);
  /** A layer at depth `z`, flying in from `from` (x, y, extra depth) after `delay` ms. */
  const fly = (z: number, from: [number, number, number], delay: number): React.CSSProperties => ({
    transform: arrived ? `translateZ(${z}px)` : `translate3d(${from[0]}px, ${from[1]}px, ${z + from[2]}px)`,
    opacity: arrived ? 1 : 0,
    transition: `transform 1.6s cubic-bezier(.16,1,.3,1) ${delay}ms, opacity .9s ease ${delay}ms`,
  });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rest = { x: 6, y: -8 }; // degrees: tipped back a little, turned slightly toward the text
    if (still) {
      el.style.transform = `rotateX(${rest.x}deg) rotateY(${rest.y}deg)`;
      return;
    }
    const pointer = { x: 0, y: 0 }; // -1..1 from the picture's centre
    const now = { x: rest.x, y: rest.y };
    const onMove = (e: PointerEvent) => {
      // -1..1 from the picture's centre to each edge of the window, so it turns as far either way even
      // though the picture sits right of centre.
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      pointer.x = Math.max(-1, Math.min(1, dx / Math.max(1, dx < 0 ? cx : window.innerWidth - cx)));
      pointer.y = Math.max(-1, Math.min(1, dy / Math.max(1, dy < 0 ? cy : window.innerHeight - cy)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const t0 = performance.now();
    const frame = (t: number) => {
      const s = (t - t0) / 1000;
      // The slow drift, plus a lean toward the pointer.
      // Turns well both ways (about -36° to +22°): a slow swing plus the pointer.
      const target = {
        x: rest.x + Math.sin(s * 0.35) * 3 - pointer.y * 7,
        y: rest.y + Math.sin(s * 0.18 + 1) * 14 + pointer.x * 14,
      };
      now.x += (target.x - now.x) * 0.05;
      now.y += (target.y - now.y) * 0.05;
      el.style.transform = `rotateX(${now.x.toFixed(2)}deg) rotateY(${now.y.toFixed(2)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <Scaled w={740} h={530}>
      <div className="absolute inset-0" style={{ perspective: 1500, perspectiveOrigin: "50% 40%" }}>
        <div ref={stage} className="absolute inset-0" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
          {/* Back: the browser */}
          <div className="absolute left-[10px] top-[20px] w-[590px]" style={fly(-90, [-60, 60, -1100], 0)}>
            <BrowserArt />
          </div>
          {/* Front: the iPhone, well forward of the browser */}
          <div className="absolute bottom-[30px] right-[30px] w-[200px]" style={fly(110, [320, 80, -900], 280)}>
            <PhoneArt />
          </div>
          {/* Floating pieces of the app at different depths, so turning shows the layers */}
          <Float style={fly(170, [-260, 60, -800], 650)} className="left-[-34px] top-[300px]">
            <span className="flex -space-x-1.5">
              {WRITERS.slice(0, 2).map((w) => (
                <span key={w.name} className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: w.color, boxShadow: "0 0 0 2px #1B1B1B" }}>
                  {w.name[0]}
                </span>
              ))}
            </span>
            <span className="text-[11px] leading-tight text-white/80">
              <span className="font-semibold text-white">Anton</span> is writing
              <br />
              <span className="text-white/50">on his iPhone</span>
            </span>
          </Float>
          <Float style={fly(150, [-300, -120, -800], 760)} className="left-[-48px] top-[70px] w-[200px] flex-col !items-start !gap-1.5">
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#AB8EE2]">
              <SfIcon name="wand.and.sparkles" size={10} color="#AB8EE2" /> Wish Workshop
            </span>
            <span className="flex gap-1">
              <span className="rounded-full bg-[#7F62C4] px-2 py-0.5 text-[9px] font-semibold text-white">Darker</span>
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] text-white/70">Happier</span>
            </span>
            <span className="w-full rounded-lg bg-[#AB8EE2]/15 px-2 py-1.5 text-[11px] text-[#F2EDE4]">I dove straight into the blackness</span>
          </Float>
          <Float style={fly(120, [0, -260, -800], 870)} className="left-[170px] top-[-34px] flex-col !items-start !gap-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/45">Rhymes · highway</span>
            <span className="flex gap-1">
              {[
                ["driveway", "#AB8EE2"],
                ["by the way", "#6FD08C"],
                ["fly away", "#6FD08C"],
              ].map(([w, c]) => (
                <span key={w} className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: c, color: c }}>
                  {w}
                </span>
              ))}
            </span>
          </Float>
          <Float style={fly(190, [-80, 260, -800], 980)} className="left-[140px] top-[452px]">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#E8663C]">
              <SfIcon name="recordingtape" size={14} color="#fff" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-white">Verse melody</span>
              <span className="flex items-center gap-1.5">
                <span className="flex h-3.5 items-center gap-[2px]">
                  {[5, 10, 14, 8, 12, 6, 11, 4, 13, 7, 9, 5].map((h, i) => (
                    <span key={i} className="w-[2px] rounded-sm bg-[#F6ECC9]" style={{ height: h }} />
                  ))}
                </span>
                <span className="font-mono text-[9px] text-white/55">0:42</span>
              </span>
            </span>
          </Float>
          <Float style={fly(210, [260, -220, -800], 1090)} className="right-[150px] top-[-40px] flex-col !items-stretch !gap-1.5 !p-1.5">
            <span className="relative block h-[62px] w-[96px] overflow-hidden rounded-lg">
              <img src="/images/pro/session-sam.jpg" alt="" className="h-full w-full object-cover" />
              <span className="absolute left-1 top-1 flex items-center gap-1 rounded bg-black/55 px-1 text-[8px] font-bold uppercase text-[#30D158]">
                <span className="size-1 rounded-full bg-[#30D158]" /> Live
              </span>
            </span>
            <span className="px-1 text-[9.5px] font-medium text-white/75">Session · 3 here</span>
          </Float>
        </div>
      </div>
    </Scaled>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <Glow className="left-[-120px] top-[-160px] h-[520px] w-[520px]" strength={40} />
      <Glow className="bottom-[-200px] right-[-120px] h-[560px] w-[560px]" strength={18} />
      {/* As the main home page: words on the left, the picture on the right (here, the browser app and the
          iPhone app together: the studio and its partner). */}
      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <Eyebrow>Built by pro songwriters in LA</Eyebrow>
          <h1 className="font-display text-[48px] font-bold leading-[1.02] tracking-tight text-white md:text-[72px]">
            The songwriting <span className="text-[#F6ECC9]">studio.</span>
          </h1>
          <p className="mt-5 text-lg text-white/70 md:text-xl">Write, co-write and record. At your desk and on your iPhone.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <PrimaryCTA />
            <AppStoreCTA />
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[680px]">
          <HeroDevices />
        </Reveal>
      </div>
    </section>
  );
}

// ─── On the desk (as WebShowcase) ───────────────────────────────────────────

export const SHOTS = [
  { key: "workspace", tab: "Workspace", src: "/images/web/editor.jpg", caption: "Your song in the middle, every tool around it." },
  { key: "genie", tab: "Genie", src: "/images/web/genie-chat.jpg", caption: "An assistant that reads your song. You decide what stays." },
  { key: "wish", tab: "Wish Workshop", src: "/images/web/wish.jpg", caption: "Rewrites previewed right in your lyrics." },
  { key: "rhymes", tab: "Rhymes", src: "/images/web/rhymes.jpg", caption: "Rhymes, synonyms and syllables for anything you select." },
] as const;

export function Desk() {
  const [active, setActive] = useState<(typeof SHOTS)[number]["key"]>("workspace");
  const shot = SHOTS.find((s) => s.key === active)!;
  return (
    <section className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head
          center
          eyebrow="On your desk"
          title={
            <>
              Everything <span className="text-[#F6ECC9]">in reach.</span>
            </>
          }
        />
        <div className="mb-5 mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="The desktop app">
          {SHOTS.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active === s.key}
              onClick={() => setActive(s.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === s.key ? "bg-[#F6ECC9] text-[#6F50B8]" : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"}`}
            >
              {s.tab}
            </button>
          ))}
        </div>
        <Reveal className="mx-auto max-w-6xl">
          <Window>
            <div className="relative aspect-[16/10]">
              {SHOTS.map((s) => (
                <img key={s.key} src={s.src} alt={s.caption} width={1920} height={1200} loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${active === s.key ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
          </Window>
        </Reveal>
        <p className="mx-auto mt-5 max-w-xl text-center text-[15px] text-white/60">{shot.caption}</p>
      </div>
    </section>
  );
}

// ─── Feature rows ───────────────────────────────────────────────────────────

/** Whether the element is on screen (the spotlights animate while they are). */
export function useInView(threshold = 0.25): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** One feature: a short head on one side, its picture on the other (sides alternate), a soft glow behind it. */
export function Row({ eyebrow, title, text, flip = false, tint, children }: { eyebrow: ReactNode; title: ReactNode; text: string; flip?: boolean; tint: string; children: (active: boolean) => ReactNode }) {
  const [ref, inView] = useInView();
  return (
    // Two equal halves in one centred band; the text and the picture each sit centred in their half, so
    // every row lines up the same way whichever side the picture is on.
    <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={`w-full max-w-md justify-self-center ${flip ? "lg:order-2" : ""}`}>
        <Head eyebrow={eyebrow} title={title} lead={text} />
      </div>
      <Reveal delay={0.1} className={`relative flex w-full max-w-[520px] justify-center justify-self-center ${flip ? "lg:order-1" : ""}`}>
        <div className="pointer-events-none absolute inset-[-8%_-4%] rounded-full opacity-60 blur-[80px]" style={{ background: tint }} />
        <div className="relative z-10 flex w-full justify-center">{children(inView)}</div>
      </Reveal>
    </div>
  );
}

export function CoWriteMock() {
  const tabs = [
    { name: "You", color: C.accent, on: true },
    { name: "Sam", color: C.coral },
    { name: "Maya", color: C.blue },
    { name: "Master", color: C.amber },
  ];
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 pb-3">
        {tabs.map((t) => (
          <span key={t.name} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${t.on ? "bg-white/10 text-white" : "text-white/55"}`}>
            <span className="size-2 rounded-full" style={{ background: t.color }} />
            {t.name}
          </span>
        ))}
      </div>
      <div className="pt-5 font-serif text-[17px] not-italic leading-[1.85] text-white/90">
        <p className="font-bold text-[#AB8EE2]">Chorus</p>
        <p>Brain fog symphony playing all day</p>
        <p>
          Nothing makes sense in the <span className="rounded-sm bg-[#F5B642]/20 underline decoration-[#F5B642] decoration-2 underline-offset-4">most beautiful way</span>
        </p>
        <p className="flex items-center">
          I'm the conductor of this beautiful mess
          <span className="ml-0.5 inline-block h-5 w-0.5 rounded-full" style={{ background: C.coral }} />
          <span className="ml-1 rounded-md px-1.5 py-0.5 font-sans text-[11px] font-semibold leading-none text-[#1B0F31]" style={{ background: C.coral }}>
            Sam
          </span>
        </p>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/[0.05] p-3 text-[13px]">
        <MessageSquareText className="mt-0.5 size-3.5 shrink-0 text-[#F5B642]" />
        <span className="text-white/75">
          <span className="font-semibold text-white">Maya</span> "Beautiful" twice. Swap one?
        </span>
      </div>
    </div>
  );
}

export function SessionMock() {
  // Stills of a session: me at the DAW (sharing it), Sam on guitar, Maya with the lyrics.
  const tiles = [
    { name: "You", color: C.accent, src: "/images/pro/session-you.jpg", alt: "A producer at his keyboard and DAW, headphones on" },
    { name: "Sam", color: C.coral, src: "/images/pro/session-sam.jpg", alt: "A songwriter playing acoustic guitar" },
    { name: "Maya", color: C.blue, src: "/images/pro/session-maya.jpg", alt: "A songwriter smiling, pen in hand" },
  ];
  const inputs: [ReactNode, string, string, number][] = [
    [<AudioWaveform key="d" className="mr-1 inline size-3.5 text-[#AB8EE2]" />, "You · DAW", "Logic Pro · 92 BPM", 0.72],
    [<Mic key="m" className="mr-1 inline size-3.5 text-white/50" />, "You · Mic", "", 0.38],
    [<Mic key="s" className="mr-1 inline size-3.5 text-white/50" />, "Sam · Mic", "", 0.22],
  ];
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
          <Video className="size-4 text-white/60" /> Session
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#30D158]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#30D158]">
          <span className="size-1.5 rounded-full bg-[#30D158]" /> Live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.name} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#111]">
            <img src={t.src} alt={t.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              <span className="size-1.5 rounded-full" style={{ background: t.color }} />
              {t.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-white/[0.04] p-3">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/45">
          <SlidersVertical className="size-3.5" /> Audio inputs
        </p>
        {inputs.map(([icon, label, detail, level]) => (
          <div key={label} className="flex items-center gap-3 py-1.5 text-[12.5px]">
            <span className="w-36 shrink-0 truncate text-white/85">
              {icon}
              {label}
              {detail && <span className="block text-[11px] text-white/45">{detail}</span>}
            </span>
            <span className="relative block h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <span className="absolute inset-y-0 left-0 rounded-full bg-[#30D158]" style={{ width: `${level * 100}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="lg-mock-dark py-24 md:py-32">
      <FeatureKeyframes />
      <div className="container mx-auto space-y-28 px-6 md:space-y-36">
        <Row
          eyebrow="Co-write in real time"
          tint="rgba(232,102,60,.22)"
          title={
            <>
              Every writer <span className="text-[#F6ECC9]">gets a tab.</span>
            </>
          }
          text="Try ideas on your own tab, agree on the Master. See who's here and where they're typing."
        >
          {() => <CoWriteMock />}
        </Row>
        <Row
          flip
          tint="rgba(48,209,88,.16)"
          eyebrow={
            <span className="inline-flex items-center gap-2">
              Sessions <span className="rounded-full bg-[#30D158]/15 px-2 py-0.5 text-[10px] tracking-[0.12em] text-[#30D158]">Early access</span>
            </span>
          }
          title={
            <>
              The session, <span className="text-[#F6ECC9]">without the commute.</span>
            </>
          }
          text="Video and voice inside the song, with your DAW streaming in full quality through our VST3 and AU plugin."
        >
          {() => <SessionMock />}
        </Row>
        <Row
          eyebrow="AI context"
          tint="rgba(177,155,226,.3)"
          title={
            <>
              AI that knows <span className="text-[#F6ECC9]">your song.</span>
            </>
          }
          text="Give it the mood, the story and your references. Every suggestion starts from there."
        >
          {(a) => <AiContextSpotlight active={a} />}
        </Row>
        <Row
          flip
          eyebrow="Wish Workshop"
          tint="rgba(127,98,196,.3)"
          title={
            <>
              Stuck on a line? <span className="text-[#F6ECC9]">Make a wish.</span>
            </>
          }
          text="Darker, happier, more visual, or your own words. Keep the rhyme and the meter."
        >
          {(a) => <WishWorkshopSpotlight active={a} />}
        </Row>
        <Row
          eyebrow="Rhymes"
          tint="rgba(58,123,208,.22)"
          title={
            <>
              Every rhyme, <span className="text-[#F6ECC9]">one tap away.</span>
            </>
          }
          text="Perfect, near, multi-syllable and phrase rhymes, plus synonyms and sound-alikes."
        >
          {(a) => <RhymeSpotlight active={a} />}
        </Row>
      </div>
    </section>
  );
}

// ─── And more ───────────────────────────────────────────────────────────────

export const MORE = {
  recordings: { eyebrow: "Recordings", title: "Hum it. Keep it linked.", text: "Takes pinned to the line they belong to.", preview: <CompactVoice />, tint: "#E8663C" },
  concepts: { eyebrow: "Concepts", title: "Capture half-formed ideas.", text: "Titles, themes and hooks for later.", preview: <CompactConcepts />, tint: "#7F62C4" },
  sheets: { eyebrow: "Lyric sheets", title: "Ready to send.", text: "Credits, PROs and IPIs, at a link or as a PDF.", preview: <CompactSheet />, tint: "#F5B642" },
  perform: { eyebrow: "Perform", title: "Stage-ready lyrics.", text: "Big type on a black screen.", preview: <CompactPerformance />, tint: "#30D158" },
  import: { eyebrow: "Import audio", title: "Demos from anywhere.", text: "Logic bounces, voice memos, files.", preview: <CompactImport />, tint: "#3A7BD0" },
  projects: { eyebrow: "Projects", title: "Your catalog, organised.", text: "Group songs by album, EP or client.", preview: <CompactProjects />, tint: "#E45C7A" },
};

/** "And more": small cards with the main home page's previews, in dark mode. */
export function More({ keys, title = "Built for how songs get finished." }: { keys: (keyof typeof MORE)[]; title?: string }) {
  return (
    <section className="lg-mock-dark bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="And more" title={title} />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {keys.map((k, i) => {
            const it = MORE[k];
            return (
              <Reveal key={k} delay={(i % 3) * 0.06} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1B]">
                <div className="relative h-[170px] overflow-hidden border-b border-white/10" style={{ background: `linear-gradient(160deg, ${it.tint}2e 0%, ${it.tint}0a 100%), #202020` }}>
                  {it.preview}
                </div>
                <div className="px-6 pb-6 pt-5">
                  <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--acc,#AB8EE2)]">{it.eyebrow}</p>
                  <p className="font-display text-xl font-bold tracking-tight text-white">{it.title}</p>
                  <p className="mt-1.5 text-sm text-white/55">{it.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── iPhone ─────────────────────────────────────────────────────────────────

export function IPhone() {
  const [ref, inView] = useInView();
  return (
    <section id="iphone" className="lg-mock-dark relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#6F50B8]/25 blur-3xl" />
      <div ref={ref} className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Head
            eyebrow="On your iPhone"
            title={
              <>
                Your studio, <span className="text-[#F6ECC9]">in your pocket.</span>
              </>
            }
            lead="Catch the line in the car and the melody on a walk. Freestyle a melody and get real lyrics in its phrasing. It's all on your desk when you sit down."
          />
          <div className="mt-8">
            <AppStoreCTA>Download on the App Store</AppStoreCTA>
          </div>
          <p className="mt-6 text-sm text-white/45">iPhone, iPad and Mac · One account, synced live with the web</p>
        </div>
        <Reveal delay={0.1} className="relative flex justify-center">
          <div className="pointer-events-none absolute inset-[-8%_-4%] rounded-full bg-[#E45C7A]/20 opacity-60 blur-[80px]" />
          <div className="relative z-10 w-full max-w-[520px]">
            <FreestyleSpotlight active={inView} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Philosophy + testimonials ──────────────────────────────────────────────

export function Philosophy() {
  return (
    <section className="bg-[#170E1C] py-24">
      <Reveal className="container mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Our philosophy</Eyebrow>
        <h2 className="font-display text-[34px] font-bold leading-[1.1] tracking-tight text-white md:text-[46px]">
          Real craft, <span className="text-[#F6ECC9]">not AI slop.</span>
        </h2>
        <blockquote className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-white/80">
          "AI should help writers say something real in their own unique voice, not replace it."
        </blockquote>
        <p className="mt-4 text-sm text-white/50">Edan Dover · Producer &amp; Songwriter · Founder, Lyric Genie</p>
      </Reveal>
    </section>
  );
}

export const QUOTES = [
  { name: "Cody Tarpley", role: "Grammy-Winning Producer", credits: "Megan Thee Stallion, Aespa, Chris Brown", text: "Lyric Genie is such an inspiring tool that helps keep writing creative, quick and fun.", image: codyTarpley },
  { name: "Roy English", role: "Artist & Songwriter", credits: "Jagwar Twin, Alesso, Michaël Brun", text: "I love how collaborators edit the lyrics in separate tabs, so we don't step on each others' toes. Big vibe.", image: royEnglish },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="Loved by songwriters" title="Used in rooms behind platinum hits." />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-7">
              <p className="text-[17px] leading-relaxed text-white/85">"{q.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={q.image} alt="" className="size-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="font-semibold text-white">{q.name}</p>
                  <p className="text-xs text-white/50">
                    {q.role} · {q.credits}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing, FAQ, CTA ──────────────────────────────────────────────────────

export function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] text-white/80">
      <Check className="mt-0.5 size-4 shrink-0 text-[#AB8EE2]" />
      {children}
    </li>
  );
}

// Yearly vs twelve monthly payments: 1 - 29.99 / 59.88 ≈ 50%.
const SAVINGS = Math.round((1 - YEARLY / (MONTHLY * 12)) * 100);

/** The two plans, with a Monthly / Yearly switch that sets the Pro price and which checkout the trial opens. */
export function Pricing() {
  // Yearly first: it's the better deal and the plan we'd rather sell (as the main site).
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const yearly = billing === "yearly";
  return (
    <section id="pricing" className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="Pricing" title="Start free. Go Pro when you're ready." lead="One account for the web and iPhone." />
        <div className="mt-9 flex justify-center">
          <div role="radiogroup" aria-label="Billing period" className="inline-flex items-center rounded-full border border-white/10 bg-[#1B1B1B] p-1">
            {(["monthly", "yearly"] as const).map((b) => {
              const on = billing === b;
              return (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setBilling(b)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${on ? "bg-[#6F50B8] text-white" : "text-white/60 hover:text-white"}`}
                >
                  {b === "monthly" ? "Monthly" : "Yearly"}
                  {b === "yearly" && <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${on ? "bg-white/20 text-white" : "bg-[#F6ECC9]/15 text-[#F6ECC9]"}`}>Save {SAVINGS}%</span>}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="flex flex-col rounded-2xl border border-white/10 bg-[#1B1B1B] p-7">
            <p className="text-lg font-semibold text-white">Free</p>
            {/* Same rows as the Pro card (lead, price, note) so the two prices line up */}
            <p className="mt-3 text-[15px] font-semibold text-white/60">Free forever</p>
            <p className="mt-1 font-display text-4xl font-bold text-white">$0</p>
            <p className="mt-1 text-sm text-white/50">No credit card needed</p>
            <ul className="mt-6 space-y-2.5">
              <Tick>Unlimited songs</Tick>
              <Tick>Real-time co-writing</Tick>
              <Tick>Try every AI tool</Tick>
            </ul>
            <div className="mt-auto pt-8">
              <a href={WEB_SIGNUP} className="inline-flex w-full items-center justify-center rounded-full border border-white/20 py-3 text-sm font-semibold text-white hover:bg-white/5">
                Start free
              </a>
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-[13px] font-medium text-white/50 hover:text-white">
                or download for iPhone, iPad &amp; Mac
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative flex flex-col rounded-2xl border border-[#AB8EE2]/50 bg-gradient-to-b from-[#2A1D3A] to-[#1B1B1B] p-7">
            <span className="absolute right-6 top-6 rounded-full bg-[#F6ECC9] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6F50B8]">{yearly ? "Best value" : "Most popular"}</span>
            <p className="text-lg font-semibold text-white">Pro</p>
            <p className="mt-3 text-[15px] font-semibold">
              <span className="text-[#FF8A65]">14 days free</span>
              <span className="text-white/60">, then</span>
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-white">
              ${yearly ? YEARLY : MONTHLY}
              <span className="text-base font-medium text-white/50">{yearly ? "/year" : "/month"}</span>
            </p>
            <p className="mt-1 text-sm text-white/50">
              {yearly ? (
                <>
                  Just ${(YEARLY / 12).toFixed(2)}/month <span className="text-white/30 line-through">${MONTHLY}</span>
                </>
              ) : (
                <>
                  Or ${YEARLY}/year and save {SAVINGS}%
                </>
              )}
            </p>
            <ul className="mt-6 space-y-2.5">
              <Tick>Wish Workshop and in-line suggestions</Tick>
              <Tick>5,000 AI calls a month, unlimited rhymes</Tick>
              <Tick>10,000 minutes of recording</Tick>
            </ul>
            <div className="mt-auto pt-8">
              <a href={webTrial(billing)} className="inline-flex w-full items-center justify-center rounded-full bg-[#F6ECC9] py-3 text-sm font-semibold text-[#6F50B8] hover:bg-[#FBF2D6]">
                Start your free trial
              </a>
              <p className="mt-3 text-center text-[13px] text-white/50">
                No charge for 14 days. Cancel anytime.{" "}
                <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-white">
                  Or subscribe in the iPhone app.
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export const FAQS = [
  ["Is my lyric data used to train AI?", "No. We never train on your lyrics and never share them. Your songs are private by default."],
  ["Can co-writers join without the app?", "Yes. Send a link and they can write with you in their browser or on iPhone, free."],
  ["Does it work on iPad and Mac?", "Yes. There's a native app for iPhone, iPad and Mac, and the web app runs on any computer. Everything syncs."],
  ["Is there a free trial?", "Yes. Pro starts with 14 days free, on the web or iPhone. One subscription covers both."],
  ["Can I export my lyrics?", "Yes. Lyric sheets open at their own link, with publishing info if you want it."],
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <Head center eyebrow="FAQ" title="Questions, answered." />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-white/10">
              <AccordionTrigger className="text-left text-[16px] font-semibold text-white hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-white/65">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-[-300px] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#6F50B8]/30 blur-3xl" />
      <Reveal className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
        <img src="/images/genie-icon.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
        <h2 className="font-display text-[38px] font-bold leading-[1.08] tracking-tight text-white md:text-[52px]">
          Your next song <span className="text-[#F6ECC9]">starts here.</span>
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryCTA />
          <AppStoreCTA />
        </div>
        <a href={WEB_APP} className="mt-6 inline-block text-sm font-semibold text-white/60 hover:text-white">
          Already have an account? Open the app
        </a>
      </Reveal>
    </section>
  );
}


// ─── Search and shortcuts (the web app's ⌘K) ───────────────────────────────

export function SearchMock() {
  const results: [string, string, string][] = [
    ["Songs", "Night Ride", "Edited today"],
    ["Lyrics", "Now I'm lost, like a ghost,", "Night Ride · Master"],
    ["Notes", "“Ghost” again? We used it in Verse 1", "Night Ride · note by Anton"],
    ["Recordings", "Ghost melody, take 2", "Night Ride"],
    ["Concepts", "Ghost Mode", "Late-night · haunted"],
  ];
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#1B1B1B] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
        <Search className="size-4 text-white/50" />
        <span className="text-[15px] text-white">ghost</span>
        <span className="h-5 w-px animate-pulse bg-[var(--acc,#AB8EE2)]" />
        <kbd className="ml-auto rounded-md border border-white/15 px-1.5 py-0.5 font-sans text-[11px] font-semibold text-white/50">⌘K</kbd>
      </div>
      <div className="p-2">
        {results.map(([group, title, detail], i) => (
          <div key={group}>
            <p className="px-3 pb-1 pt-2.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/40">{group}</p>
            <div className={`rounded-xl px-3 py-2 ${i === 1 ? "bg-white/[0.08]" : ""}`}>
              <span className={`block truncate text-sm text-white ${group === "Lyrics" ? "font-serif not-italic" : "font-medium"}`}>{title}</span>
              <span className="block truncate text-xs text-white/45">{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Rhymes, as the apps lay them out today ─────────────────────────────────

const RHYME_COLS = [
  {
    ending: "-eyed",
    note: "single syllable",
    total: "439",
    picked: "23",
    color: "#64A8FF",
    sections: [
      { label: "Perfect", words: ["cried", "died", "dried", "guide", "pride", "side", "tide", "wide"] },
      { label: "Near", words: ["time", "light", "mine"] },
    ],
    picks: [
      ["cried", "carries the grief under the speed"],
      ["died", "mirrors the bleeding-out imagery"],
      ["tide", "the night pulling you along"],
    ],
  },
  {
    ending: "… -eyed",
    note: "phrases ending in -eyed",
    total: "4,195",
    picked: "16",
    color: "#FF8A65",
    sections: [{ label: "Perfect", words: ["abide", "aside", "beside", "dark side", "joyride", "worldwide", "high tide", "open wide"] }],
    picks: [
      ["joyride", "the drive, turned reckless"],
      ["beside", "the happier memory of being together"],
      ["dark side", "the ghost you're becoming"],
    ],
  },
];

/**
 * The rhyme panel as the apps lay it out (web and iPhone, 2026-10), dark mode: the word and its sound,
 * family chips, then one outlined column per rhyme family. `aiPicks`: the app's AI Picks (sparkle, a
 * reason each); without it, the plain engine, as RhymeGold.com shows it.
 */
export function RhymeColumnsMock({ aiPicks = false }: { aiPicks?: boolean }) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-3">
        {aiPicks && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#8F6FDC] to-[#B98BE8] px-2.5 py-1 text-xs font-semibold text-white">
            <SfIcon name="sparkles" size={12} color="#fff" /> 39
          </span>
        )}
        <span className="flex items-center gap-2 text-xs text-white/65">
          Slant
          <span className="flex h-4 w-7 items-center justify-end rounded-full bg-[#AB8EE2] px-0.5">
            <span className="size-3 rounded-full bg-white" />
          </span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">Insert ▾</span>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none text-[#F2EDE4]">ride</p>
      <span className="mt-2 inline-block rounded-md bg-[#AB8EE2]/15 px-1.5 py-0.5 font-mono text-[12px] text-[#AB8EE2]">reyed</span>
      <div className="mt-2.5 flex gap-1.5">
        {RHYME_COLS.map((c, i) => (
          <span key={c.ending} className="rounded-full border px-2.5 py-0.5 text-xs font-semibold" style={{ borderColor: c.color, color: c.color }}>
            {i === 0 ? "A" : "Multi"} <span className="font-mono font-normal text-white/60">{c.total}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {RHYME_COLS.map((c) => (
          <div key={c.ending} className="overflow-hidden rounded-xl border-[1.5px]" style={{ borderColor: c.color }}>
            <div className="border-b px-3 py-2" style={{ borderColor: `${c.color}55`, background: `${c.color}14` }}>
              <p className="flex items-baseline justify-between gap-2">
                <span className="text-[15px] font-bold" style={{ color: c.color }}>
                  {c.ending}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/55">
                  {aiPicks && <SfIcon name="sparkle" size={9} color="#AB8EE2" />}
                  {aiPicks ? `${c.picked} of ${c.total}` : c.total}
                </span>
              </p>
              <p className="text-[11px] text-white/50">{c.note}</p>
            </div>
            <div className="relative h-[232px] overflow-hidden px-2 pb-2">
              {aiPicks ? (
                <div className="space-y-1.5 pt-2">
                  {c.picks.map(([w, why]) => (
                    <div key={w} className="rounded-lg bg-white/[0.06] px-2.5 py-2">
                      <p className="flex items-center gap-1.5 text-[14px] font-semibold text-[#F2EDE4]">
                        <SfIcon name="sparkle" size={10} color="#AB8EE2" /> {w}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-white/55">{why}</p>
                    </div>
                  ))}
                </div>
              ) : (
                c.sections.map((sec) => (
                  <div key={sec.label}>
                    <p className="px-1 pb-1 pt-2.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/40">{sec.label}</p>
                    {sec.words.map((w) => (
                      <p key={w} className="px-1.5 py-[5px] text-[14px] text-[#F2EDE4]/90">
                        {w}
                      </p>
                    ))}
                  </div>
                ))
              )}
              {/* The list keeps going */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1B1B1B] to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── A multi-syllable lookup, sliding through its pages ─────────────────────

/** "highway" in the real engine (public/rhymes, run in Node 2026-10-11): anchors -eye and -ay. Counts are
 *  each column's words across Perfect, Near and Slant. */
const HIGHWAY = [
  { id: "A", label: "A", title: "-eye", note: "single syllable", count: 438, color: "#64A8FF", perfect: ["by", "cry", "dry", "eye", "fly", "high", "lie", "my"], near: [] as string[] },
  { id: "B", label: "B", title: "-ay", note: "single syllable", count: 592, color: "#FF8A65", perfect: ["bay", "clay", "day", "fray", "gray", "hey", "lay", "may"], near: [] as string[] },
  { id: "AB", label: "A B", title: "-eye -ay", note: "no weak syllables between", count: 122, color: "#AB8EE2", perfect: ["driveway", "Friday", "child's play", "by day", "I pray", "I stay"], near: ["blind date", "by name"] },
  { id: "A.B", label: "A • B", title: "-eye · -ay", note: "one syllable between", count: 83, color: "#6FD08C", perfect: ["by the way", "fly away", "drive away", "find a way", "final say", "I'm okay"], near: ["brighter days", "crying shame"] },
  { id: "A..B", label: "A • • B", title: "-eye · · -ay", note: "two or more between", count: 36, color: "#F5B642", perfect: ["by a long way", "I hear you say", "like every day", "try as one may", "dry up and blow away"], near: ["I can't explain", "I'm not afraid"] },
];
/** The app's pages: [A, B] / [A B, A • B] / [A • • B]. */
const HIGHWAY_PAGES = [HIGHWAY.slice(0, 2), HIGHWAY.slice(2, 4), HIGHWAY.slice(4)];

/**
 * The rhyme panel for a multi-syllable word ("highway"), the plain engine as RhymeGold.com shows it:
 * the word, a chip per column (the ones on screen lit), then the pages of columns, sliding by themselves
 * (paused while the pointer is over it; still with reduced motion). Dots pick a page.
 */
export function RhymeSlidesMock() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setPage((p) => (p + 1) % HIGHWAY_PAGES.length), 3800);
    return () => clearInterval(t);
  }, [paused]);
  const onPage = new Set(HIGHWAY_PAGES[page].map((c) => c.id));
  return (
    <div
      className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-xs text-white/65">
          Slant
          <span className="flex h-4 w-7 items-center justify-end rounded-full bg-[#AB8EE2] px-0.5">
            <span className="size-3 rounded-full bg-white" />
          </span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">Insert ▾</span>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none text-[#F2EDE4]">highway</p>
      <p className="mt-2 flex items-center gap-1.5 text-[12px] text-white/50">
        <span className="rounded-md bg-[#64A8FF]/15 px-1.5 py-0.5 font-mono text-[#64A8FF]">high</span>
        <span className="rounded-md bg-[#FF8A65]/15 px-1.5 py-0.5 font-mono text-[#FF8A65]">way</span>
        two stressed syllables
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {HIGHWAY.map((c) => {
          const on = onPage.has(c.id);
          return (
            <span
              key={c.id}
              className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-500"
              style={{ borderColor: on ? c.color : "rgba(255,255,255,0.12)", color: on ? c.color : "rgba(255,255,255,0.4)", background: on ? `${c.color}14` : "transparent" }}
            >
              {c.label} <span className="font-mono font-normal opacity-70">{c.count}</span>
            </span>
          );
        })}
      </div>
      {/* The pages, side by side, sliding */}
      <div className="mt-3 overflow-hidden">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]" style={{ transform: `translateX(-${page * 100}%)` }}>
          {HIGHWAY_PAGES.map((cols, pi) => (
            <div key={pi} className="grid w-full shrink-0 gap-2.5" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
              {cols.map((c) => (
                <div key={c.id} className="overflow-hidden rounded-xl border-[1.5px]" style={{ borderColor: c.color }}>
                  <div className="border-b px-3 py-2" style={{ borderColor: `${c.color}55`, background: `${c.color}14` }}>
                    <p className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[15px] font-bold" style={{ color: c.color }}>
                        {c.title}
                      </span>
                      <span className="font-mono text-[11px] text-white/55">{c.count}</span>
                    </p>
                    <p className="truncate text-[11px] text-white/50">{c.note}</p>
                  </div>
                  <div className="relative h-[224px] overflow-hidden px-2 pb-2">
                    <p className="px-1 pb-1 pt-2.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/40">Perfect</p>
                    {c.perfect.map((w) => (
                      <p key={w} className="truncate px-1.5 py-[5px] text-[14px] text-[#F2EDE4]/90">
                        {w}
                      </p>
                    ))}
                    {c.near.length > 0 && (
                      <>
                        <p className="px-1 pb-1 pt-2.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/40">Near</p>
                        {c.near.map((w) => (
                          <p key={w} className="truncate px-1.5 py-[5px] text-[14px] text-[#F2EDE4]/70">
                            {w}
                          </p>
                        ))}
                      </>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1B1B1B] to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {HIGHWAY_PAGES.map((_, i) => (
          <button key={i} type="button" aria-label={`Page ${i + 1}`} onClick={() => setPage(i)} className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-[#F2EDE4]" : "w-1.5 bg-white/25 hover:bg-white/45"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Genie, the tools tabs, and the iPhone moments ──────────────────────────

/** Genie in the side panel, dark mode: a question about the song, a reply, and a line edit to apply. */
export function GenieMock() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
        <SfIcon src="/images/genie-icon.svg" size={13} color="#AB8EE2" /> Genie
      </p>
      <div className="mt-3 ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#AB8EE2]/20 px-3.5 py-2 text-[13.5px] text-[#F2EDE4]">The chorus feels flat after line two. Any ideas to lift it?</div>
      <div className="mt-3 max-w-[92%] text-[13.5px] leading-relaxed text-white/75">
        “Beautiful” shows up in lines two and three, so the second one lands softer. Line three has your strongest image; give it a fresh word:
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <p className="font-serif text-[14px] not-italic text-white/40 line-through">I'm the conductor of this beautiful mess</p>
        <p className="mt-1 font-serif text-[14px] not-italic text-[#F2EDE4]">I'm the conductor of this glorious mess</p>
        <div className="mt-2.5 flex justify-end gap-2">
          <span className="rounded-full px-3 py-1 text-[11px] text-white/55">Dismiss</span>
          <span className="rounded-full bg-[#AB8EE2] px-3 py-1 text-[11px] font-semibold text-[#1B0F31]">Apply</span>
        </div>
      </div>
    </div>
  );
}

const TOOL_TABS = {
  web: [
    { key: "genie", label: "Genie", text: "Ask about the song as it is right now. Suggested edits apply in one click, or not at all.", art: () => <GenieMock /> },
    { key: "wish", label: "Wish Workshop", text: "Select a line, make a wish: darker, more visual, your own words. Keep the rhyme and meter.", art: (a: boolean) => <WishWorkshopSpotlight active={a} /> },
    { key: "rhymes", label: "Rhymes", text: "Select any word for rhymes in columns, with AI Picks for the ones that fit this song.", art: () => <RhymeColumnsMock aiPicks /> },
    { key: "context", label: "AI context", text: "Mood, story and references: every tool starts from your song, not a blank prompt.", art: (a: boolean) => <AiContextSpotlight active={a} /> },
  ],
  // Home has its own rhyme-engine section, so its tabs leave Rhymes out.
  home: [
    { key: "genie", label: "Genie", text: "Ask about the song as it is right now. Suggested edits apply in one click, or not at all.", art: () => <GenieMock /> },
    { key: "wish", label: "Wish Workshop", text: "Select a line, make a wish: darker, more visual, your own words. Keep the rhyme and meter.", art: (a: boolean) => <WishWorkshopSpotlight active={a} /> },
    { key: "context", label: "AI context", text: "Mood, story and references: every tool starts from your song, not a blank prompt.", art: (a: boolean) => <AiContextSpotlight active={a} /> },
  ],
  iphone: [
    { key: "rhymes", label: "Rhymes", text: "The line that came on the walk, finished before you're home. Tap a word for rhymes in columns.", art: () => <RhymeColumnsMock aiPicks /> },
    { key: "wish", label: "Wish Workshop", text: "Stuck in the car? Rewrite a line darker, happier or your way, keeping the rhyme.", art: (a: boolean) => <WishWorkshopSpotlight active={a} /> },
    { key: "genie", label: "Genie", text: "Talk the song through anywhere. Genie knows its mood, story and lyrics so far.", art: () => <GenieMock /> },
  ],
};

/**
 * The writing tools as one section with tabs (not a row each): the same tools on both apps, framed for
 * where you are, the desk (`web`) or on the go (`iphone`).
 */
export function ToolsTabs({ variant, eyebrow, title }: { variant: keyof typeof TOOL_TABS; eyebrow: string; title: ReactNode }) {
  const tabs = TOOL_TABS[variant];
  const [active, setActive] = useState(tabs[0].key);
  const [ref, inView] = useInView();
  const tab = tabs.find((t) => t.key === active)!;
  return (
    <section className="lg-mock-dark bg-[#170E1C] py-24 md:py-32">
      <FeatureKeyframes />
      <div ref={ref} className="container mx-auto px-6">
        <Head center eyebrow={eyebrow} title={title} />
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Writing tools">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === t.key ? "bg-[#F6ECC9] text-[#6F50B8]" : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-xl text-center text-[16px] text-white/60">{tab.text}</p>
        <div key={tab.key} className="lg-fade-up mx-auto mt-10 flex max-w-[520px] justify-center">
          {tab.art(inView)}
        </div>
        <p className="mt-10 text-center text-xs text-white/40">On the web and iPhone, synced.</p>
      </div>
    </section>
  );
}

/** Catching an idea on iPhone: a voice memo, its transcript (iPhone), and the line it's linked to. */
export function CaptureMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Ideas inbox</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FF5A52]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#FF5A52]" /> Recording
        </span>
      </div>
      <p className="mt-3 text-[15px] font-semibold text-[#F2EDE4]">Highway idea</p>
      <div className="mt-2 flex h-10 items-center gap-[2px]">
        {Array.from({ length: 46 }, (_, i) => (
          <span key={i} className="w-[3px] rounded-full bg-[#FF8A65]" style={{ height: `${25 + 70 * Math.abs(Math.sin(i * 0.6) * Math.cos(i * 0.23))}%`, opacity: i < 34 ? 1 : 0.3 }} />
        ))}
      </div>
      <p className="mt-1 font-mono text-[11px] text-white/45">0:42</p>
      <div className="mt-4 rounded-xl bg-white/[0.05] p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">Transcript</p>
        <p className="mt-1 text-[13px] italic leading-relaxed text-white/75">“…we could drive until the morning, let the highway take the blame…”</p>
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#AB8EE2]/15 px-2.5 py-1 text-[11px] font-medium text-[#AB8EE2]">↳ Linked to Night Ride · Chorus</p>
    </div>
  );
}

/** Perform on iPhone: the lyrics big on black, the current line lit, the next one waiting. */
export function PerformMock() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black p-7 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
        <span className="size-1.5 rounded-full bg-[#30D158]" /> Perform · Night Ride
      </p>
      <div className="mt-6 space-y-3 font-bold leading-tight">
        <p className="text-[22px] text-white/25">It's just you and I</p>
        <p className="text-[30px] text-white">I'll take you on a night ride</p>
        <p className="text-[22px] text-white/45">It's just you and I</p>
        <p className="text-[22px] text-white/25">We'll drive until the sunlight</p>
      </div>
    </div>
  );
}

/** Co-writers in your pocket: the song's chat with a take, a session badge, and a reply. */
export function ChatMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Night Ride · chat</p>
      <div className="mt-3 space-y-2.5 text-[13px]">
        <div className="flex items-end gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: WRITERS[1].color }}>
            A
          </span>
          <div className="max-w-[80%]">
            <p className="mb-0.5 text-[11px] font-semibold" style={{ color: WRITERS[1].color }}>
              Anton
            </p>
            <p className="rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-1.5 text-[#F2EDE4]">Hummed this on the drive home. Bridge?</p>
            <p className="mt-1 flex items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2 text-[12px] text-white/80">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#AB8EE2] text-[9px] text-[#1B0F31]">▶</span> Bridge melody · 0:31
            </p>
          </div>
        </div>
        <p className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/55">
            <span className="size-1.5 rounded-full bg-[#30D158]" /> <span className="font-semibold" style={{ color: WRITERS[0].color }}>Edan</span> joined the session
          </span>
        </p>
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[#AB8EE2]/20 px-3 py-1.5 text-[#F2EDE4]">That's the one. Adding it now.</p>
        </div>
      </div>
    </div>
  );
}

/** Notes on the words: a highlighted phrase in the lyrics, and its thread in the margin (reply, Resolve). */
export function NotesMock() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_10.5rem]">
        <div className="font-serif text-[13px] not-italic leading-[1.9] text-[#F2EDE4]/90 min-[390px]:text-[14px]">
          <p className="font-bold text-[#AB8EE2]">Verse 1</p>
          <p>I became another stranger</p>
          <p>No way that I could be forgiven</p>
          <p>Oh what have I done</p>
          <p>
            Now I'm lost, <span className="rounded-sm bg-[#F5B642]/25 underline decoration-[#F5B642] decoration-2 underline-offset-4">like a ghost</span>
            {/* An alternate on the same line: " / " in the accent, the option faded, ⇄ to swap it in */}
            <span className="font-bold text-[#AB8EE2]"> / </span>
            <span className="opacity-50">
              like a shadow<span className="ml-1.5 font-sans text-[12px] text-[#AB8EE2]">⇄</span>
            </span>
          </p>
          <p>bleeding out for your love</p>
        </div>
        {/* The thread, beside the words it's on */}
        <div className="self-center rounded-xl border border-[#F5B642]/40 bg-[#252525] p-3 text-[12.5px] shadow-xl">
          <p className="flex items-center gap-1.5 font-semibold" style={{ color: C.amber }}>
            <span className="flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: WRITERS[1].color }}>
              A
            </span>
            Anton
          </p>
          <p className="mt-1.5 text-white/85">“Ghost” again? We use it in the chorus too.</p>
          <div className="mt-2.5 border-t border-white/10 pt-2.5">
            <p className="flex items-center gap-1.5 font-semibold" style={{ color: WRITERS[0].color }}>
              <span className="flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: WRITERS[0].color }}>
                E
              </span>
              Edan
            </p>
            <p className="mt-1.5 text-white/70">Good catch. Added “like a shadow” as an alt.</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-white/40">Reply…</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white">✓ Resolve</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── The web hero: the workspace, exploded ──────────────────────────────────

/** A panel heading, as the app has them: chevron, small caps, an optional expand at the end. */
function PanelHead({ children, expand }: { children: ReactNode; expand?: boolean }) {
  return (
    <p className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/50">
      <ChevronDown className="size-2.5" />
      {children}
      {expand && <Maximize2 className="ml-auto size-2.5 text-white/35" />}
    </p>
  );
}

/** The left panel: AI context, sections with their first lines, recordings. */
function PanelContext() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#222] px-3.5 py-3">
      <PanelHead expand>AI context</PanelHead>
      <div className="mt-2 space-y-2">
        {[
          ["Mood", "Cinematic, late-night"],
          ["Theme", "Chasing a ghost down the highway"],
          ["Similar artists", "The Weeknd, Phoebe Bridgers"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[8.5px] font-semibold text-white/45">{k}</p>
            <p className="text-[10.5px] leading-snug text-white/85">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-white/[0.07] pt-2.5">
        <PanelHead>Sections</PanelHead>
        <div className="mt-1.5 space-y-1.5">
          {[
            ["Verse 1", "I became another stranger"],
            ["Chorus", "It's just you and I"],
            ["Verse 2", "Headlights on the overpass"],
            ["Bridge", "If I could take it back"],
          ].map(([t, l], i) => (
            <div key={t} className={`rounded-md px-1.5 py-0.5 ${i === 0 ? "bg-white/[0.08]" : ""}`}>
              <p className="text-[10px] font-semibold text-white/90">{t}</p>
              <p className="truncate text-[9px] text-white/45">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 border-t border-white/[0.07] pt-2.5">
        <PanelHead expand>Recordings</PanelHead>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/[0.05] px-2 py-1.5">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#AB8EE2] text-[7px] text-[#1B0F31]">▶</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9.5px] font-medium text-white/85">Verse 1 melody</p>
            <div className="mt-0.5 flex h-2.5 items-center gap-[1.5px]">
              {[3, 6, 4, 8, 5, 9, 6, 4, 7, 5, 8, 3, 6, 4, 7, 5, 3, 6].map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-white/35" style={{ height: h + 1 }} />
              ))}
            </div>
          </div>
          <span className="text-[8.5px] text-white/40">0:42</span>
        </div>
      </div>
    </div>
  );
}

/** The middle: the song, with writer tabs, a co-writer's caret, the scratchpad bar and the Genie. */
function PanelSong() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-[#1B1B1B]">
      <div className="px-6 pt-5">
        <p className="font-serif text-[26px] font-bold not-italic leading-none text-[#F2EDE4]">Night Ride</p>
        <p className="mt-1.5 text-[9.5px] text-white/40">Edited just now</p>
        <div className="mt-2.5 flex gap-1">
          {WRITERS.map((w, i) => (
            <span key={w.name} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${i === 0 ? "bg-white/10 text-white" : "text-white/55"}`}>
              <span className="size-1.5 rounded-full" style={{ background: w.color }} />
              {w.name}
            </span>
          ))}
        </div>
        <p className="mt-3.5 font-serif text-[13px] font-bold not-italic text-[#AB8EE2]">Verse 1</p>
        <div className="mt-1 space-y-1 font-serif text-[14px] not-italic leading-snug text-[#F2EDE4]/90">
          {LYRICS.map((l, i) => (
            <p key={l} className="flex items-center">
              {i === 0 ? (
                <>
                  I became another <span className="ml-1 rounded-sm bg-[#AB8EE2]/30 px-0.5">stranger</span>
                </>
              ) : (
                l
              )}
              {i === 2 && (
                <>
                  <span className="ml-0.5 inline-block h-4 w-[1.5px] rounded-full" style={{ background: WRITERS[1].color }} />
                  <span className="ml-1 rounded px-1 py-px font-sans text-[9px] font-semibold leading-none text-[#1B0F31]" style={{ background: WRITERS[1].color }}>
                    Anton
                  </span>
                </>
              )}
            </p>
          ))}
        </div>
        <p className="mt-3.5 font-serif text-[13px] font-bold not-italic text-[#AB8EE2]">Chorus</p>
        <div className="mt-1 space-y-1 font-serif text-[14px] not-italic leading-snug text-[#F2EDE4]/90">
          <p>It's just you and I</p>
          <p>I'll take you on a night ride</p>
          <p className="text-[#F2EDE4]/40">Windows down, the city's</p>
        </div>
      </div>
      {/* The Genie, floating bottom right, and the scratchpad bar along the bottom */}
      <span className="absolute bottom-10 right-4 flex size-9 items-center justify-center rounded-full bg-[#2A2A2A] shadow-lg ring-1 ring-white/10">
        <img src="/images/genie-icon.svg" alt="" className="h-5 w-auto brightness-150" />
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 border-t border-white/10 bg-[#202020] px-4 py-2 text-[9.5px]">
        <NotebookPen className="size-3 text-white/50" />
        <span className="font-semibold text-white/85">Scratchpad</span>
        <span className="truncate text-white/40">· ghost in the passenger seat? / city lights like…</span>
        <ChevronUp className="ml-auto size-3 text-white/40" />
      </div>
    </div>
  );
}

/** The right panel: Spark, rhymes for the selected word, the song's numbers. */
function PanelTools() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-[#222] px-3.5 py-3">
      <PanelHead>
        Spark <Sparkles className="ml-0.5 size-2.5 text-[#AB8EE2]" />
      </PanelHead>
      <p className="mt-1.5 text-[9.5px] text-white/50">Brainstorm ideas to insert at your cursor.</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[
          ["Sections", "Verse, chorus, bridge", "linear-gradient(135deg,#7251BD,#B870DB)"],
          ["Titles", "Song title ideas", "linear-gradient(135deg,#E05297,#F4845F)"],
          ["Phrases", "Phrases and hooks", "linear-gradient(135deg,#2563EB,#38BDF8)"],
          ["Lines", "Complete lines", "linear-gradient(135deg,#D97706,#FBBF24)"],
        ].map(([t, sub, g]) => (
          <span key={t} className="flex h-[60px] flex-col justify-end rounded-lg p-2 text-white" style={{ background: g }}>
            <span className="text-[10px] font-bold leading-tight">{t}</span>
            <span className="text-[7.5px] leading-tight text-white/85">{sub}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 border-t border-white/[0.07] pt-2.5">
        <PanelHead>Rhymes · stranger</PanelHead>
        <div className="mt-2 flex flex-wrap gap-1">
          {["danger", "anger", "changer", "ranger", "safer", "stranger things"].map((r, i) => (
            <span key={r} className={`rounded-full px-2 py-0.5 text-[9.5px] ${i < 2 ? "bg-[#AB8EE2]/20 text-[#D9CCF5]" : "bg-white/[0.07] text-white/80"}`}>
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 border-t border-white/[0.07] pt-2.5">
        <PanelHead>This song</PanelHead>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {[
            ["Sections", "4"],
            ["Lines", "16"],
            ["Words", "112"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md border border-white/10 px-1.5 py-1">
              <p className="text-[7.5px] text-white/45">{k}</p>
              <p className="text-[12px] font-semibold text-white/90">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The web page's hero: the workspace's three panels (context and sections, the song, the tools) start
 * apart in depth and glide together into one window, then the whole thing drifts and leans toward the
 * pointer, a little layered so the panels still read as panels. One rAF loop for the lean (as HeroDevices);
 * CSS transitions for the assembly. Still with reduced motion.
 */
export function ExplodedWorkspace() {
  const stage = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rest = { x: 10, y: -4 };
    if (still) {
      setAssembled(true);
      el.style.transform = `rotateX(${rest.x}deg) rotateY(${rest.y}deg)`;
      return;
    }
    const t = setTimeout(() => setAssembled(true), 500);
    const pointer = { x: 0, y: 0 };
    const now = { x: rest.x + 8, y: rest.y - 18 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      pointer.x = Math.max(-1, Math.min(1, dx / Math.max(1, dx < 0 ? cx : window.innerWidth - cx)));
      pointer.y = Math.max(-1, Math.min(1, dy / Math.max(1, dy < 0 ? cy : window.innerHeight - cy)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const t0 = performance.now();
    const frame = (time: number) => {
      const s = (time - t0) / 1000;
      const target = { x: rest.x + Math.sin(s * 0.3) * 3 - pointer.y * 6, y: rest.y + Math.sin(s * 0.17 + 1) * 10 + pointer.x * 12 };
      now.x += (target.x - now.x) * 0.04;
      now.y += (target.y - now.y) * 0.04;
      el.style.transform = `rotateX(${now.x.toFixed(2)}deg) rotateY(${now.y.toFixed(2)}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  // Apart: pulled out sideways and forward, turned; together: in the window, slightly layered.
  const part = (apart: string, together: string, delay: number): React.CSSProperties => ({
    transform: assembled ? together : apart,
    transition: `transform 1.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  });
  return (
    <Scaled w={940} h={600}>
      <div className="absolute inset-0" style={{ perspective: 1800, perspectiveOrigin: "50% 35%" }}>
        <div ref={stage} className="absolute inset-0" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
          {/* The window: chrome, the app bar, the song's toolbar and the two icon rails, as in the app */}
          <div
            className="absolute inset-x-[20px] top-[20px] h-[560px] overflow-hidden rounded-[18px] border border-white/10 bg-[#252525] shadow-[0_60px_140px_-30px_rgba(0,0,0,0.85)]"
            style={part("translateZ(-160px)", "translateZ(-30px)", 0)}
          >
            <div className="flex h-[30px] items-center gap-1.5 border-b border-white/10 bg-[#141015] px-4">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
              <span className="mx-auto rounded-md bg-white/5 px-10 py-0.5 text-[10px] text-white/45">app.lyricgenie.app</span>
            </div>
            <div className="flex h-[38px] items-center gap-4 border-b border-white/[0.07] px-5">
              <Wordmark className="h-[12px] w-auto text-[#AB8EE2]" />
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-[#AB8EE2]">Songs</span>
              <span className="text-[10px] text-white/55">Concepts</span>
              <span className="text-[10px] text-white/55">Recordings</span>
              <span className="ml-auto flex items-center gap-3.5 text-white/60">
                <span className="relative">
                  <Bell className="size-3.5" />
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-[#FF5F57]" />
                </span>
                <Moon className="size-3.5" />
                <span className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "#7F62C4" }}>
                  E
                </span>
              </span>
            </div>
            <div className="flex h-[40px] items-center gap-2 border-b border-white/[0.07] px-4 text-[10px] text-white/75">
              <span className="flex items-center gap-1">
                <ArrowLeft className="size-3" /> Songs
              </span>
              <ChevronUp className="size-3 text-white/45" />
              <ChevronDown className="size-3 text-white/45" />
              <span className="mx-1 h-4 w-px bg-white/10" />
              <Undo2 className="size-3 text-white/45" />
              <Redo2 className="size-3 text-white/30" />
              {[
                [<Sparkles key="i" className="size-3" />, "Spark"],
                [<Eye key="i" className="size-3" />, "View ▾"],
                [<ListOrdered key="i" className="size-3" />, "Arrange"],
                [<span key="i" className="h-[2px] w-2.5 rounded-full bg-[#AB8EE2]" />, "Blank"],
                [<span key="i" className="size-2 rounded-full bg-[#FF453A]" />, "Record"],
              ].map(([icon, label]) => (
                <span key={label as string} className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-[3px]">
                  {icon}
                  {label}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-2.5 text-white/60">
                <NotebookPen className="size-3.5" />
                <Users className="size-3.5" />
                <span className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-[3px] text-white/75">
                  <Presentation className="size-3" /> Perform
                </span>
                <Share className="size-3.5" />
                <Ellipsis className="size-3.5" />
              </span>
            </div>
            {/* Icon rails, left and right */}
            <div className="absolute bottom-0 left-0 top-[110px] flex w-[36px] flex-col items-center gap-3.5 border-r border-white/[0.07] pt-3 text-white/45">
              <span className="rounded-md bg-white/10 p-1 text-white/80">
                <PanelLeft className="size-3.5" />
              </span>
              <Compass className="size-3.5" />
              <CassetteTape className="size-3.5" />
            </div>
            <div className="absolute bottom-0 right-0 top-[110px] flex w-[36px] flex-col items-center gap-3.5 border-l border-white/[0.07] pt-3 text-white/45">
              <img src="/images/genie-icon.svg" alt="" className="h-4 w-auto brightness-150" />
              <span className="rounded-md bg-white/10 p-1 text-white/80">
                <PanelRight className="size-3.5" />
              </span>
              <FileText className="size-3.5" />
              <BookOpen className="size-3.5" />
              <Sparkles className="size-3.5" />
            </div>
          </div>
          {/* The panels */}
          <div className="absolute left-[62px] top-[138px] h-[432px] w-[188px]" style={part("translate3d(-150px, 30px, 220px) rotateY(24deg)", "translateZ(10px)", 150)}>
            <PanelContext />
          </div>
          <div className="absolute left-[260px] top-[138px] h-[432px] w-[430px]" style={part("translate3d(0, -40px, 300px)", "translateZ(30px)", 0)}>
            <PanelSong />
          </div>
          <div className="absolute left-[700px] top-[138px] h-[432px] w-[178px]" style={part("translate3d(150px, 30px, 220px) rotateY(-24deg)", "translateZ(10px)", 300)}>
            <PanelTools />
          </div>
        </div>
      </div>
    </Scaled>
  );
}

// ─── Importing audio ────────────────────────────────────────────────────────

/** Dropping files from the desktop onto a song: a bounce, a voice memo, a demo, each becoming a take. */
export function ImportMock() {
  const files = [
    { name: "Night Ride v3 bounce.wav", from: "Logic Pro", size: "48 MB", done: 1, color: "#3A7BD0" },
    { name: "Chorus idea.m4a", from: "Voice Memos", size: "2 MB", done: 1, color: "#E8663C" },
    { name: "Demo_rough.mp3", from: "Files", size: "6 MB", done: 0.6, color: "#6FA83C" },
  ];
  return (
    <div className="w-full max-w-lg rounded-2xl border-2 border-dashed bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]" style={{ borderColor: "color-mix(in srgb, var(--acc, #AB8EE2) 50%, transparent)" }}>
      <p className="text-center text-[13px] font-semibold text-white">Drop audio onto Night Ride</p>
      <p className="mt-0.5 text-center text-[11px] text-white/45">WAV · AIFF · FLAC · MP3 · M4A</p>
      <div className="mt-4 space-y-2">
        {files.map((f) => (
          <div key={f.name} className="rounded-xl bg-white/[0.05] px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg" style={{ background: f.color }}>
                <SfIcon name="recordingtape" size={13} color="#fff" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-[#F2EDE4]">{f.name}</span>
                <span className="block text-[11px] text-white/45">
                  {f.from} · {f.size}
                </span>
              </span>
              <span className="text-[11px] font-semibold" style={{ color: f.done === 1 ? "#30D158" : "rgba(255,255,255,0.55)" }}>
                {f.done === 1 ? "✓ Added" : "Adding…"}
              </span>
            </div>
            <div className="mt-2 flex h-6 items-center gap-[2px]">
              {Array.from({ length: 52 }, (_, i) => (
                <span key={i} className="w-[3px] rounded-full" style={{ height: `${20 + 75 * Math.abs(Math.sin(i * 0.5 + f.name.length) * Math.cos(i * 0.19))}%`, background: i / 52 < f.done ? f.color : "rgba(255,255,255,0.15)" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
        <span className="rounded bg-[#F6ECC9] px-1.5 py-px text-[9px] font-bold text-[#6F50B8]">PRO</span> The original file is kept, untouched
      </p>
    </div>
  );
}

/** The song's chat on the desk: messages with attachments (the single's artwork, a take). */
export function ChatAttachMock() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Night Ride · chat</p>
      <div className="mt-3 space-y-3 text-[13px]">
        <div className="flex items-end gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: WRITERS[1].color }}>
            A
          </span>
          <div className="max-w-[78%] space-y-1.5">
            <p className="text-[11px] font-semibold" style={{ color: WRITERS[1].color }}>
              Anton
            </p>
            {/* An image attachment: the single's artwork (Deane, "Night Ride"; the owner's, shared with permission) */}
            <img src="/images/pro/night-ride-art.jpg" alt="Night Ride single artwork by Deane" width={176} height={176} loading="lazy" className="size-44 rounded-xl object-cover shadow-lg" />
            <p className="rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-1.5 text-[#F2EDE4]">Art's back for Night Ride. Let's write the bridge to this.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[78%] space-y-1.5">
            <p className="flex items-center gap-2 rounded-xl bg-[#AB8EE2]/20 px-3 py-2 text-[12px] text-[#F2EDE4]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#AB8EE2] text-[10px] text-[#1B0F31]">▶</span>
              <span className="flex flex-col">
                <span className="font-medium">Bridge melody</span>
                <span className="text-[10px] text-white/50">0:28 · added to Recordings</span>
              </span>
            </p>
            <p className="rounded-2xl rounded-br-md bg-[#AB8EE2]/20 px-3 py-1.5 text-[#F2EDE4]">Love it. Here's a melody for it 👆</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-1.5">
        <span className="text-white/45">📎</span>
        <span className="flex-1 text-[12px] text-white/40">Message your co-writers…</span>
        <span className="rounded-full bg-[#AB8EE2] px-3 py-1 text-[11px] font-semibold text-[#1B0F31]">Send</span>
      </div>
    </div>
  );
}

/** A song's takes on iPhone: each with its waveform, the line it's linked to, and a transcript; record more. */
export function RecordingsMock() {
  const takes = [
    { title: "Chorus melody", time: "0:42", line: "I'll take you on a night ride", playing: true, color: "#E8663C" },
    { title: "Bridge idea", time: "0:28", line: "Headlights bleed into the rain", playing: false, color: "#AB8EE2" },
    { title: "Verse 2 hum", time: "1:05", line: null, playing: false, color: "#3A7BD0" },
  ];
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Night Ride · recordings</span>
        <span className="font-mono text-[11px] text-white/40">3 takes</span>
      </div>
      <div className="mt-3 space-y-2.5">
        {takes.map((t) => (
          <div key={t.title} className={`rounded-xl px-3 py-2.5 ${t.playing ? "bg-white/[0.08]" : "bg-white/[0.04]"}`}>
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] text-white" style={{ background: t.color }}>
                {t.playing ? "❚❚" : "▶"}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#F2EDE4]">{t.title}</span>
              <span className="font-mono text-[11px] text-white/45">{t.time}</span>
            </div>
            <div className="mt-2 flex h-6 items-center gap-[2px]">
              {Array.from({ length: 44 }, (_, i) => (
                <span key={i} className="w-[3px] rounded-full" style={{ height: `${20 + 75 * Math.abs(Math.sin(i * 0.55 + t.title.length) * Math.cos(i * 0.21))}%`, background: t.playing && i < 18 ? t.color : "rgba(255,255,255,0.18)" }} />
              ))}
            </div>
            {t.line && <p className="mt-1.5 truncate text-[11px] text-[#AB8EE2]">↳ “{t.line}”</p>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-white/25">
          <span className="size-8 rounded-full bg-[#FF5A52]" />
        </span>
      </div>
    </div>
  );
}

/** Concepts on iPhone: mood-coloured cards for titles and hooks, a new one being saved, Spark for more. */
export function ConceptsMock() {
  const cards = [
    { title: "Highway Ghost", note: "haunted by what could have been", g: "linear-gradient(135deg,#2563EB,#38BDF8)" },
    { title: "Red Light Runner", note: "reckless, desperate to feel something", g: "linear-gradient(135deg,#E05297,#F4845F)" },
    { title: "Golden Hour", note: "a perfect moment, slipping away", g: "linear-gradient(135deg,#D97706,#FBBF24)" },
    { title: "Ghost Mode", note: "detached but quietly watching", g: "linear-gradient(135deg,#7251BD,#B870DB)" },
    { title: "Airplane Mode", note: "unreachable, on purpose", g: "linear-gradient(135deg,#059669,#34D399)" },
  ];
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1B1B1B] p-4 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Concepts</span>
        <span className="flex items-center gap-1 rounded-full bg-[#AB8EE2]/15 px-2 py-0.5 text-[10px] font-semibold text-[#AB8EE2]">
          <SfIcon name="sparkles" size={9} color="#AB8EE2" /> Spark more
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {cards.map((c) => (
          <div key={c.title} className="flex h-[88px] flex-col justify-between rounded-xl p-2.5 text-white" style={{ background: c.g }}>
            <p className="text-[13px] font-bold leading-tight">{c.title}</p>
            <p className="text-[10px] leading-snug text-white/85">{c.note}</p>
          </div>
        ))}
        {/* A new one, being saved */}
        <div className="flex h-[88px] flex-col justify-between rounded-xl border-[1.5px] border-dashed border-[#E45C7A]/70 bg-[#E45C7A]/10 p-2.5">
          <p className="text-[13px] font-bold leading-tight text-[#F2EDE4]">
            Nobody Knows Me Here
            <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#F2EDE4] align-[-2px]" />
          </p>
          <p className="text-[10px] text-white/50">New concept</p>
        </div>
      </div>
      <div className="mt-3 rounded-full bg-[#F6ECC9] py-2 text-center text-[12px] font-semibold text-[#6F50B8]">Start a song from Highway Ghost</div>
    </div>
  );
}
