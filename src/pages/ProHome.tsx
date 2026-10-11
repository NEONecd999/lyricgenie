import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AudioWaveform, Check, Command, FileText, GitBranch, Keyboard, Lightbulb, MessageSquareText, MessagesSquare, Mic, Music, Search, SlidersVertical, Video, Voicemail } from "lucide-react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { APP_STORE, WEB_APP, WEB_SIGNIN, WEB_SIGNUP, webTrial } from "@/lib/links";

/**
 * /pro: the alternate home page that presents Lyric Genie as a professional songwriting tool, the
 * desktop web app at the centre and the iPhone app as its partner. Dark throughout (the WebShowcase
 * section's plum, expanded). Real screenshots where we have them; small faithful mockups of the real
 * interface (writer tabs, sessions, lyric sheet, ⌘K) where we don't yet.
 */

// The palette: the web app's dark tokens (LYRICGENIE-APP src/design/tokens.css) on the site's plum.
const C = {
  bg: "#1E1324",
  deep: "#170E1C",
  panel: "#252525",
  panel2: "#1B1B1B",
  line: "rgba(255,255,255,0.09)",
  cream: "#F6ECC9",
  accent: "#AB8EE2",
  purple: "#6F50B8",
  green: "#30D158",
  coral: "#FF8A65",
  blue: "#64A8FF",
  amber: "#F5B642",
};

const MONTHLY = 4.99;
const YEARLY = 29.99;

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay }} viewport={{ once: true, margin: "-60px" }} className={className}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#AB8EE2]">{children}</p>;
}

function SectionHead({ eyebrow, title, lead, center = false }: { eyebrow: string; title: ReactNode; lead: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-[34px] font-bold leading-[1.1] tracking-tight text-white md:text-[44px]">{title}</h2>
      <p className="mt-5 text-[17px] leading-relaxed text-white/70">{lead}</p>
    </Reveal>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[15px] text-white/85">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#AB8EE2]/15 text-[#AB8EE2]">
            <Check className="size-3.5" />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** A dark app window: the browser chrome, then whatever's inside. */
function Window({ children, url = "app.lyricgenie.app", className = "" }: { children: ReactNode; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#141015] shadow-[0_40px_120px_-30px_rgba(111,80,184,0.55)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded-md bg-white/5 px-10 py-1 text-xs text-white/50">{url}</span>
      </div>
      {children}
    </div>
  );
}

const PrimaryCTA = ({ children = "Start free in your browser" }: { children?: ReactNode }) => (
  <a
    href={WEB_SIGNUP}
    className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-7 py-3.5 text-[15.5px] font-semibold text-[#6F50B8] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all hover:bg-[#FBF2D6]"
  >
    {children} <ArrowRight className="size-5" />
  </a>
);

// ─── Nav ────────────────────────────────────────────────────────────────────

function ProNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Workspace", "#workspace"],
    ["Co-writing", "#cowriting"],
    ["Sessions", "#sessions"],
    ["iPhone", "#iphone"],
    ["Pricing", "#pricing"],
  ];
  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled ? "border-b border-white/10 bg-[#1E1324]/85 backdrop-blur-lg" : "border-b border-transparent"}`}>
      <div className="container mx-auto flex h-16 items-center gap-8 px-6">
        <a href="/pro/" className="flex items-center gap-2.5" aria-label="Lyric Genie">
          <img src="/images/genie-icon.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[15px] font-bold uppercase tracking-[0.08em] text-[#F6ECC9]">Lyric Genie</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-white/65 transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <a href={WEB_SIGNIN} className="hidden text-sm font-semibold text-white/75 hover:text-white sm:block">
            Sign in
          </a>
          <a href={WEB_SIGNUP} className="rounded-full bg-[#F6ECC9] px-4 py-2 text-sm font-semibold text-[#6F50B8] hover:bg-[#FBF2D6]">
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[#6F50B8]/30 blur-3xl" />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>For songwriters who finish songs</Eyebrow>
          <h1 className="font-display text-[48px] font-bold leading-[1.02] tracking-tight text-white md:text-[76px]">
            The songwriting <span className="text-[#F6ECC9]">studio.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            A professional workspace for lyrics, co-writes and demos. Every writer, every take and every version in one place, at your desk, with your iPhone in your pocket.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryCTA />
            <a href="#workspace" className="text-sm font-semibold text-white/75 hover:text-white">
              See how it works ↓
            </a>
          </div>
          <p className="mt-5 text-[13px] text-white/45">Free plan · No card needed · Syncs with the iPhone app</p>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto mt-16 max-w-6xl">
          <Window>
            <div className="relative aspect-[16/10]">
              <img src="/images/web/editor.jpg" alt="The Lyric Genie workspace: a song in the editor, with its context and sections on the left and writing tools on the right" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover object-top" />
              {/* Who's here: the co-write, live. */}
              <div className="absolute right-[34%] top-[18.5%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#1B1B1B]/90 py-1 pl-1 pr-3 shadow-xl backdrop-blur md:flex">
                <span className="flex -space-x-2">
                  <Avatar letter="E" color={C.accent} />
                  <Avatar letter="S" color={C.coral} />
                  <Avatar letter="M" color={C.blue} />
                </span>
                <span className="text-xs font-medium text-white/80">3 writers here</span>
              </div>
              {/* Sam's caret at the end of "I'm the conductor of this beautiful mess", the name beside it. */}
              <div className="absolute left-[47.9%] top-[58%] hidden items-center gap-1 md:flex">
                <span className="block h-[2.4vw] max-h-7 w-0.5 rounded-full" style={{ background: C.coral }} />
                <span className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-[#1B0F31]" style={{ background: C.coral }}>
                  Sam
                </span>
              </div>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}

function Avatar({ letter, color, ring = C.panel2 }: { letter: string; color: string; ring?: string }) {
  return (
    <span className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: color, boxShadow: `0 0 0 2px ${ring}` }}>
      {letter}
    </span>
  );
}

// ─── Pillars strip ──────────────────────────────────────────────────────────

function Pillars() {
  const items: [typeof Music, string, string][] = [
    [Music, "Built for the desk", "A full workspace in your browser, Mac or PC."],
    [MessagesSquare, "Built for the room", "Every co-writer on their own tab, live."],
    [GitBranch, "Built to keep", "Takes, versions and credits, all with the song."],
    [Command, "Built for speed", "Shortcuts and search for everything."],
  ];
  return (
    <section className="border-y border-white/[0.07] bg-[#170E1C]">
      <div className="container mx-auto grid gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, title, text]) => (
          <div key={title} className="flex items-start gap-3.5">
            <Icon className="mt-0.5 size-5 shrink-0 text-[#AB8EE2]" />
            <div>
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-white/60">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Workspace ──────────────────────────────────────────────────────────────

const TOOL_SHOTS = [
  { key: "genie", tab: "Genie", src: "/images/web/genie-chat.jpg", alt: "Genie suggesting a line edit for the chorus in a side panel", caption: "Genie reads the song as it is right now and helps you think it through. You decide what stays." },
  { key: "wish", tab: "Wish Workshop", src: "/images/web/wish.jpg", alt: "Wish Workshop rewrites of a phrase, previewed in the lyrics", caption: "Rewrite a word, a line or a section, and preview every option in place before you keep one." },
  { key: "rhymes", tab: "Rhymes", src: "/images/web/rhymes.jpg", alt: "Rhymes for a selected word, single and multi-syllable", caption: "Select anything for rhymes, multi-syllable rhymes, synonyms and syllable counts." },
] as const;

function Workspace() {
  const [active, setActive] = useState<(typeof TOOL_SHOTS)[number]["key"]>("genie");
  const shot = TOOL_SHOTS.find((s) => s.key === active)!;
  return (
    <section id="workspace" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHead
          center
          eyebrow="The workspace"
          title={
            <>
              Your song in the middle. <span className="text-[#F6ECC9]">Every tool in reach.</span>
            </>
          }
          lead="Context and sections on one side, writing tools on the other, the lyrics front and centre. Panels you can rearrange, resize and hide, so the screen fits the way you work."
        />
        <div className="mb-5 mt-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Writing tools">
          {TOOL_SHOTS.map((s) => (
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
              {TOOL_SHOTS.map((s) => (
                <img key={s.key} src={s.src} alt={s.alt} width={1920} height={1200} loading="lazy" className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${active === s.key ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
          </Window>
        </Reveal>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] text-white/65">{shot.caption}</p>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/45">
          The AI tools help when you ask and stay out of the way when you don't. Your words stay yours.
        </p>
      </div>
    </section>
  );
}

// ─── Co-writing ─────────────────────────────────────────────────────────────

function CoWriting() {
  const tabs = [
    { name: "You", color: C.accent, on: true },
    { name: "Sam", color: C.coral },
    { name: "Maya", color: C.blue },
    { name: "Master", color: C.amber },
  ];
  return (
    <section id="cowriting" className="bg-[#170E1C] py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <SectionHead
            eyebrow="Co-writing"
            title={
              <>
                Built for the room, <span className="text-[#F6ECC9]">even when it's three cities.</span>
              </>
            }
            lead="Every writer gets their own tab to try things without stepping on anyone, and a shared Master holds the version you all agree on. See who's here, where they're typing and what they changed."
          />
          <Points
            items={[
              "A tab per writer, plus a shared Master",
              "Live cursors and presence, no refresh",
              "Notes pinned to the exact words, with replies",
              "Chat beside the song, with takes and photos",
              "Invite by link or code, on web or iPhone",
            ]}
          />
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] md:p-7">
            <div className="flex items-center gap-1 border-b border-white/10 pb-3">
              {tabs.map((t) => (
                <span key={t.name} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${t.on ? "bg-white/10 text-white" : "text-white/55"}`}>
                  <span className="size-2 rounded-full" style={{ background: t.color }} />
                  {t.name}
                </span>
              ))}
              <span className="ml-auto flex -space-x-2">
                <Avatar letter="S" color={C.coral} />
                <Avatar letter="M" color={C.blue} />
              </span>
            </div>
            {/* The lyrics, and the note in a margin beside them (like comments in a doc). */}
            <div className="grid gap-5 pt-6 md:grid-cols-[minmax(0,1fr)_12.5rem]">
              <div className="font-serif text-[16.5px] not-italic leading-[1.85] text-white/90 md:whitespace-nowrap">
                <p className="font-bold text-[#AB8EE2]">Chorus</p>
                <p>Brain fog symphony playing all day</p>
                <p>
                  Nothing makes sense in the{" "}
                  <span className="rounded-sm bg-[#F5B642]/20 underline decoration-[#F5B642] decoration-2 underline-offset-4">most beautiful way</span>
                </p>
                <p className="flex items-center">
                  I'm the conductor of this beautiful mess
                  <span className="ml-0.5 inline-block h-5 w-0.5 rounded-full" style={{ background: C.coral }} />
                  <span className="ml-1 rounded-md px-1.5 py-0.5 font-sans text-[11px] font-semibold leading-none text-[#1B0F31]" style={{ background: C.coral }}>
                    Sam
                  </span>
                </p>
                <p>Waving my arms in a wrinkled vest</p>
              </div>
              <div className="self-start rounded-xl border border-white/10 bg-[#252525] p-3.5 text-sm shadow-xl md:mt-8">
                <p className="flex items-center gap-2 text-xs font-semibold text-[#F5B642]">
                  <MessageSquareText className="size-3.5" /> Maya · note
                </p>
                <p className="mt-1.5 text-white/85">"Beautiful" twice in two lines. Swap one?</p>
                <p className="mt-2 border-t border-white/10 pt-2 text-white/60">
                  <span className="font-semibold text-[#AB8EE2]">You</span> Trying "most uncertain way" on my tab
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 text-[13px]">
              <span className="size-1.5 rounded-full bg-[#30D158]" />
              <span className="text-white/70">
                <span className="font-semibold text-white">Sam</span> is writing in Chorus
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Takes, versions, credits ───────────────────────────────────────────────

function Wave({ bars = 64, played = 0.4, color = C.accent }: { bars?: number; played?: number; color?: string }) {
  const h = (i: number) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1));
  return (
    <div className="flex h-9 items-center gap-[2px]">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className="w-[3px] rounded-full" style={{ height: `${h(i) * 100}%`, background: i / bars < played ? color : "rgba(255,255,255,0.22)" }} />
      ))}
    </div>
  );
}

function KeepIt() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHead
          center
          eyebrow="Takes, versions, credits"
          title={
            <>
              Nothing gets lost. <span className="text-[#F6ECC9]">Everything stays with the song.</span>
            </>
          }
          lead="The melody you hummed at 2 AM, the bridge you cut last week, the writer credits for the pitch. All of it lives inside the song it belongs to."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
            <Voicemail className="size-5 text-[#AB8EE2]" />
            <p className="mt-4 text-lg font-semibold text-white">Takes linked to lines</p>
            <p className="mt-1.5 text-sm text-white/60">Record or import a take and pin it to the lyrics it belongs to. Put your cursor on the line and it's ready to play.</p>
            <div className="mt-6 rounded-xl bg-white/[0.04] p-3.5">
              <p className="flex items-center justify-between text-[13px] font-medium text-white">
                Chorus melody idea <span className="font-mono text-xs text-white/50">0:42</span>
              </p>
              <p className="mt-0.5 font-serif text-sm italic text-white/55">"Brain fog symphony playing all day"</p>
              <div className="mt-2.5">
                <Wave />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
            <GitBranch className="size-5 text-[#AB8EE2]" />
            <p className="mt-4 text-lg font-semibold text-white">Versions, side by side</p>
            <p className="mt-1.5 text-sm text-white/60">Save a version before a big rewrite, compare any two side by side, and bring back the line you shouldn't have cut.</p>
            <ul className="mt-6 space-y-1.5 text-[13px]">
              {[
                ["Main", "Edited now", true],
                ["Before the bridge rewrite", "Yesterday", false],
                ["Pitch version", "Oct 3", false],
              ].map(([name, when, on]) => (
                <li key={name as string} className={`flex items-center justify-between rounded-lg px-3 py-2 ${on ? "bg-[#AB8EE2]/15 text-white" : "bg-white/[0.04] text-white/70"}`}>
                  {name}
                  <span className="text-xs text-white/45">{when}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16} className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
            <FileText className="size-5 text-[#AB8EE2]" />
            <p className="mt-4 text-lg font-semibold text-white">Lyric sheets, ready to send</p>
            <p className="mt-1.5 text-sm text-white/60">Share a clean lyric sheet link with every writer's legal name, PRO, IPI and publisher already on it.</p>
            <div className="mt-6 rounded-xl bg-[#F6ECC9] p-4 text-[#2A1B33]">
              <p className="font-serif text-lg font-bold not-italic">Brain Fog Symphony</p>
              <div className="mt-2 space-y-1 text-[11px] leading-snug">
                <p>
                  <span className="font-semibold">Jordan Avery</span> · ASCAP · IPI 00123456789
                </p>
                <p>
                  <span className="font-semibold">Sam Rivera</span> · BMI · IPI 00987654321
                </p>
              </div>
              <div className="mt-3 space-y-1">
                {[90, 75, 82, 60].map((w, i) => (
                  <span key={i} className="block h-1.5 rounded-full bg-[#2A1B33]/15" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Speed: shortcuts and search ────────────────────────────────────────────

function Speed() {
  const results: [typeof Music, string, string, string][] = [
    [Music, "Songs", "Brain Fog Symphony", "Edited today"],
    [FileText, "Lyrics", "Nothing makes sense in the most beautiful way", "Brain Fog Symphony · Master"],
    [MessageSquareText, "Notes", "\"Beautiful\" twice in two lines. Swap one?", "Brain Fog Symphony · note by Maya"],
    [Voicemail, "Recordings", "Beautiful mess, chorus take", "Brain Fog Symphony"],
    [Lightbulb, "Concepts", "Beautiful mess", "Chaotic calm · self-aware"],
  ];
  const keys: [string, string][] = [
    ["⌘ K", "Search everything"],
    ["N", "New song"],
    ["⌘ ↵", "Wish Workshop on the selection"],
    ["⌥ ⌘ M", "Record a take"],
    ["⌥ ⌘ P", "Perform mode"],
  ];
  return (
    <section className="bg-[#170E1C] py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-14 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1B1B1B] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="size-4 text-white/50" />
              <span className="text-[15px] text-white">beautiful</span>
              <span className="h-5 w-px animate-pulse bg-[#AB8EE2]" />
              <kbd className="ml-auto rounded-md border border-white/15 px-1.5 py-0.5 font-sans text-[11px] font-semibold text-white/50">esc</kbd>
            </div>
            <div className="p-2">
              {results.map(([Icon, group, title, detail], i) => (
                <div key={title}>
                  <p className="px-3 pb-1 pt-2.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/40">{group}</p>
                  <div className={`flex items-center gap-3 rounded-xl px-3 py-2 ${i === 1 ? "bg-[#AB8EE2]/15" : ""}`}>
                    <Icon className="size-4 shrink-0 text-white/45" />
                    <span className="min-w-0">
                      <span className={`block truncate text-sm text-white ${group === "Lyrics" ? "italic" : "font-medium"}`}>{title}</span>
                      <span className="block truncate text-xs text-white/45">{detail}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow="Speed"
            title={
              <>
                Fast like a pro tool, <span className="text-[#F6ECC9]">because it is one.</span>
              </>
            }
            lead="Search every song, every line any writer wrote, every note, chat and take, from anywhere. Keyboard shortcuts for the things you do a hundred times a day."
          />
          <div className="mt-8 grid max-w-md gap-2.5">
            {keys.map(([k, label]) => (
              <div key={label} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-2.5 text-sm text-white/80">
                {label}
                <span className="flex gap-1">
                  {k.split(" ").map((c) => (
                    <kbd key={c} className="min-w-[1.6rem] rounded-md border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-center font-sans text-xs font-semibold text-white/70">
                      {c}
                    </kbd>
                  ))}
                </span>
              </div>
            ))}
            <p className="flex items-center gap-2 pt-1 text-xs text-white/45">
              <Keyboard className="size-3.5" /> Press ⌘ / in the app for every shortcut on the screen you're on.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sessions (early access) ────────────────────────────────────────────────

function Meter({ level, color = C.green }: { level: number; color?: string }) {
  return (
    <span className="relative block h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${level * 100}%`, background: color }} />
    </span>
  );
}

function Sessions() {
  const tiles = [
    { name: "You", color: C.accent, from: "#3a2a55", to: "#1f1830" },
    { name: "Sam", color: C.coral, from: "#55302a", to: "#2a1915" },
    { name: "Maya", color: C.blue, from: "#24364f", to: "#151d29" },
  ];
  return (
    <section id="sessions" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute right-[-200px] top-20 h-[500px] w-[700px] rounded-full bg-[#30D158]/10 blur-3xl" />
      <div className="container relative z-10 mx-auto grid items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#30D158]/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-[#30D158]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#30D158]" /> Early access
            </span>
          </Reveal>
          <SectionHead
            eyebrow="Sessions"
            title={
              <>
                The session, <span className="text-[#F6ECC9]">without the commute.</span>
              </>
            }
            lead="Video and voice with your co-writers, right inside the song. Share your DAW's master bus in full quality with the Lyric Genie Session plugin, so everyone hears the track while you write to it."
          />
          <Points items={["Video and voice inside the song you're writing", "Your DAW, live and full quality (VST3 and AU)", "A level and volume for every input, for everyone", "Record the session straight into the song's takes"]} />
          <p className="mt-6 text-sm text-white/45">Works with Logic Pro, Ableton Live, Cubase, FL Studio, Studio One, Reaper, Bitwig and any host that runs VST3 or AU.</p>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Video className="size-4 text-white/60" /> Session
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#30D158]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#30D158]">
                <span className="size-1.5 rounded-full bg-[#30D158]" /> Live
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {tiles.map((t) => (
                <div key={t.name} className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}>
                  <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: t.color }}>
                    {t.name[0]}
                  </span>
                  <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    <span className="size-1.5 rounded-full" style={{ background: t.color }} />
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-white/[0.04] p-3">
              <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/45">
                <SlidersVertical className="size-3.5" /> Audio inputs
              </p>
              {[
                [<AudioWaveform key="w" className="mr-0.5 inline size-3.5 text-[#AB8EE2]" />, "You · DAW", "Logic Pro · 92 BPM · bar 17", 0.72],
                [<Mic key="m" className="mr-0.5 inline size-3.5 text-white/50" />, "You · Mic", "", 0.38],
                [<Mic key="m2" className="mr-0.5 inline size-3.5 text-white/50" />, "Sam · Mic", "", 0.22],
              ].map(([icon, label, detail, level]) => (
                <div key={label as string} className="flex items-center gap-3 py-1.5 text-[12.5px]">
                  <span className="w-40 shrink-0 truncate text-white/85">
                    {icon}
                    {label as string}
                    {detail && <span className="block text-[11px] text-white/45">{detail as string}</span>}
                  </span>
                  <Meter level={level as number} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── iPhone partner ─────────────────────────────────────────────────────────

function IPhone() {
  return (
    <section id="iphone" className="bg-[#170E1C] py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-14 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="flex justify-center">
          <div className="relative w-[260px] rounded-[44px] border border-white/15 bg-[#0D0910] p-2.5 shadow-[0_40px_100px_-30px_rgba(111,80,184,0.55)]">
            <img src="/images/screenshot_editor.jpeg" alt="The Lyric Genie iPhone app editing a song" className="w-full rounded-[36px]" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="And in your pocket"
            title={
              <>
                Your studio's partner <span className="text-[#F6ECC9]">for everywhere else.</span>
              </>
            }
            lead="The Lyric Genie iPhone app catches the line that shows up in the car and the melody you hum on a walk. Everything syncs live, so it's waiting on your desk when you sit down."
          />
          <Points items={["Voice memos that land in your Ideas inbox", "Every song, every writer's tab, synced live", "Perform mode with your lyrics on stage", "The same account, free plan and Pro"]} />
          <a href={APP_STORE} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5">
             Download on the App Store
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionHead center eyebrow="Pricing" title="Start free. Go Pro when it's your job." lead="One account across the web and iPhone. Pro starts with 14 days free." />
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-7">
            <p className="text-lg font-semibold text-white">Free</p>
            <p className="mt-3 font-display text-4xl font-bold text-white">$0</p>
            <p className="mt-1 text-sm text-white/50">Forever</p>
            <Points items={["Unlimited songs", "Real-time co-writing", "Lyric sheets, linked takes, arranging", "Try every AI tool: 15 AI + 50 quick calls"]} />
            <a href={WEB_SIGNUP} className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-white/20 py-3 text-sm font-semibold text-white hover:bg-white/5">
              Start free
            </a>
          </Reveal>
          <Reveal delay={0.08} className="relative rounded-2xl border border-[#AB8EE2]/50 bg-gradient-to-b from-[#2A1D3A] to-[#1B1B1B] p-7">
            <span className="absolute right-6 top-6 rounded-full bg-[#F6ECC9] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6F50B8]">14 days free</span>
            <p className="text-lg font-semibold text-white">Pro</p>
            <p className="mt-3 font-display text-4xl font-bold text-white">
              ${YEARLY}
              <span className="text-base font-medium text-white/50">/year</span>
            </p>
            <p className="mt-1 text-sm text-white/50">Or ${MONTHLY}/month</p>
            <Points items={["Everything in Free", "Wish Workshop, in-line suggestions, syllable control", "5,000 AI calls a month, unlimited rhymes", "10,000 minutes of recording, 60 min per take"]} />
            <a href={webTrial("yearly")} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#F6ECC9] py-3 text-sm font-semibold text-[#6F50B8] hover:bg-[#FBF2D6]">
              Start your free trial
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ──────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-[-300px] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#6F50B8]/30 blur-3xl" />
      <Reveal className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
        <img src="/images/genie-icon.svg" alt="" className="mx-auto mb-6 h-12 w-12" />
        <h2 className="font-display text-[38px] font-bold leading-[1.08] tracking-tight text-white md:text-[52px]">
          Your next song <span className="text-[#F6ECC9]">starts here.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">Open it in your browser, invite a co-writer, and write. No download needed.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryCTA />
          <a href={WEB_APP} className="text-sm font-semibold text-white/75 hover:text-white">
            Already have an account? Open the app
          </a>
        </div>
      </Reveal>
    </section>
  );
}

const ProHome = () => {
  // A draft for now: kept out of search until it's the home page.
  useEffect(() => {
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  return (
    <div className="min-h-screen bg-[#1E1324] font-sans text-white antialiased">
      <SEO
        title="Lyric Genie — The Songwriting Studio"
        description="A professional songwriting workspace for lyrics, co-writes and demos: every writer, every take and every version in one place, in your browser, with the iPhone app as its partner."
      />
      <ProNav />
      <Hero />
      <Pillars />
      <Workspace />
      <CoWriting />
      <KeepIt />
      <Speed />
      <Sessions />
      <IPhone />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default ProHome;
