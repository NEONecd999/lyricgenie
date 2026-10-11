import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AudioWaveform, Check, MessageSquareText, Mic, SlidersVertical, Video } from "lucide-react";
import Footer from "@/components/Footer";
import Wordmark from "@/components/Wordmark";
import { HeroDeviceArt } from "@/components/HeroEnhanced";
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
 * /pro: the alternate home page, Lyric Genie as the songwriting studio (desktop at the centre, the
 * iPhone app as its partner). Same order as the main home page (hero, desktop showcase, feature rows,
 * "and more", philosophy, testimonials, pricing, FAQ, call to action), dark throughout, short copy.
 */

const C = { accent: "#AB8EE2", coral: "#FF8A65", blue: "#64A8FF", amber: "#F5B642", green: "#30D158" };
const MONTHLY = 4.99;
const YEARLY = 29.99;

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const Eyebrow = ({ children }: { children: ReactNode }) => <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#AB8EE2]">{children}</p>;

function Head({ eyebrow, title, lead, center = false }: { eyebrow: ReactNode; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-md"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-[34px] font-bold leading-[1.08] tracking-tight text-white md:text-[46px]">{title}</h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-white/65">{lead}</p>}
    </Reveal>
  );
}

function Window({ children, className = "" }: { children: ReactNode; className?: string }) {
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

const Avatar = ({ letter, color }: { letter: string; color: string }) => (
  <span className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: color, boxShadow: "0 0 0 2px #1B1B1B" }}>
    {letter}
  </span>
);

const PrimaryCTA = ({ children = "Start free in your browser" }: { children?: ReactNode }) => (
  <a href={WEB_SIGNUP} className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-7 py-3.5 text-[15.5px] font-semibold text-[#6F50B8] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all hover:bg-[#FBF2D6]">
    {children} <ArrowRight className="size-5" />
  </a>
);

const AppStoreCTA = ({ children = "Download for iPhone" }: { children?: ReactNode }) => (
  <a href={APP_STORE} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-white/5">
    {children}
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
  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled ? "border-b border-white/10 bg-[#1E1324]/85 backdrop-blur-lg" : "border-b border-transparent"}`}>
      <div className="container mx-auto flex h-16 items-center gap-8 px-6">
        <a href="/pro/" className="flex items-center text-[#F6ECC9]" aria-label="Lyric Genie">
          <Wordmark className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {[
            ["Features", "#features"],
            ["iPhone", "#iphone"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
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

// ─── Hero: the desk and the pocket ──────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="pointer-events-none absolute left-[-120px] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#6F50B8]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-200px] right-[-120px] h-[560px] w-[560px] rounded-full bg-[#C48AE3]/20 blur-3xl" />
      {/* As the main home page: words on the left, the iPhone and its floating cards on the right, with the
          desktop workspace behind them (the studio, and its partner). */}
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
        <div className="relative mx-auto flex w-full justify-center">
          {/* The desk, behind */}
          <div className="pointer-events-none absolute left-[18%] top-6 hidden w-[760px] opacity-60 lg:block" aria-hidden>
            <Window>
              <img src="/images/web/editor.jpg" alt="" width={1920} height={1200} className="block w-full" />
            </Window>
          </div>
          <div className="relative">
            <HeroDeviceArt />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── On the desk (as WebShowcase) ───────────────────────────────────────────

const SHOTS = [
  { key: "workspace", tab: "Workspace", src: "/images/web/editor.jpg", caption: "Your song in the middle, every tool around it." },
  { key: "genie", tab: "Genie", src: "/images/web/genie-chat.jpg", caption: "An assistant that reads your song. You decide what stays." },
  { key: "wish", tab: "Wish Workshop", src: "/images/web/wish.jpg", caption: "Rewrites previewed right in your lyrics." },
  { key: "rhymes", tab: "Rhymes", src: "/images/web/rhymes.jpg", caption: "Rhymes, synonyms and syllables for anything you select." },
] as const;

function Desk() {
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
function useInView(threshold = 0.25): [React.RefObject<HTMLDivElement>, boolean] {
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
function Row({ eyebrow, title, text, flip = false, tint, children }: { eyebrow: ReactNode; title: ReactNode; text: string; flip?: boolean; tint: string; children: (active: boolean) => ReactNode }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={flip ? "lg:order-2" : ""}>
        <Head eyebrow={eyebrow} title={title} lead={text} />
      </div>
      <Reveal delay={0.1} className={`relative flex justify-center ${flip ? "lg:order-1" : ""}`}>
        <div className="pointer-events-none absolute inset-[-8%_-4%] rounded-full opacity-60 blur-[80px]" style={{ background: tint }} />
        <div className="relative z-10 flex w-full max-w-[520px] justify-center">{children(inView)}</div>
      </Reveal>
    </div>
  );
}

function CoWriteMock() {
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

function SessionMock() {
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

function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
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

function More() {
  const items: { eyebrow: string; title: string; text: string; preview: ReactNode; tint: string }[] = [
    { eyebrow: "Recordings", title: "Hum it. Keep it linked.", text: "Takes pinned to the line they belong to.", preview: <CompactVoice />, tint: "#E8663C" },
    { eyebrow: "Concepts", title: "Capture half-formed ideas.", text: "Titles, themes and hooks for later.", preview: <CompactConcepts />, tint: "#7F62C4" },
    { eyebrow: "Lyric sheets", title: "Ready to send.", text: "Credits, PROs and IPIs, at a link or as a PDF.", preview: <CompactSheet />, tint: "#F5B642" },
    { eyebrow: "Perform", title: "Stage-ready lyrics.", text: "Big type on a black screen.", preview: <CompactPerformance />, tint: "#30D158" },
    { eyebrow: "Import audio", title: "Demos from anywhere.", text: "Logic bounces, voice memos, files.", preview: <CompactImport />, tint: "#3A7BD0" },
    { eyebrow: "Projects", title: "Your catalog, organised.", text: "Group songs by album, EP or client.", preview: <CompactProjects />, tint: "#E45C7A" },
  ];
  return (
    <section className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="And more" title="Built for how songs get finished." />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1B1B1B]">
              {/* The preview keeps the app's own paper look, as in the main home page. */}
              <div className="relative h-[170px] overflow-hidden border-b border-white/10" style={{ background: `linear-gradient(160deg, ${it.tint}26 0%, ${it.tint}0d 100%), #F6F1E3` }}>
                {it.preview}
              </div>
              <div className="px-6 pb-6 pt-5">
                <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#AB8EE2]">{it.eyebrow}</p>
                <p className="font-display text-xl font-bold tracking-tight text-white">{it.title}</p>
                <p className="mt-1.5 text-sm text-white/55">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── iPhone ─────────────────────────────────────────────────────────────────

function IPhone() {
  const [ref, inView] = useInView();
  return (
    <section id="iphone" className="relative overflow-hidden py-24 md:py-32">
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

function Philosophy() {
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

const QUOTES = [
  { name: "Cody Tarpley", role: "Grammy-Winning Producer", credits: "Megan Thee Stallion, Aespa, Chris Brown", text: "Lyric Genie is such an inspiring tool that helps keep writing creative, quick and fun.", image: codyTarpley },
  { name: "Roy English", role: "Artist & Songwriter", credits: "Jagwar Twin, Alesso, Michaël Brun", text: "I love how collaborators edit the lyrics in separate tabs, so we don't step on each others' toes. Big vibe.", image: royEnglish },
];

function Testimonials() {
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

function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] text-white/80">
      <Check className="mt-0.5 size-4 shrink-0 text-[#AB8EE2]" />
      {children}
    </li>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-[#170E1C] py-24">
      <div className="container mx-auto px-6">
        <Head center eyebrow="Pricing" title="Start free. Go Pro when you're ready." lead="One account for the web and iPhone." />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-7">
            <p className="text-lg font-semibold text-white">Free</p>
            <p className="mt-3 font-display text-4xl font-bold text-white">$0</p>
            <ul className="mt-6 space-y-2.5">
              <Tick>Unlimited songs</Tick>
              <Tick>Real-time co-writing</Tick>
              <Tick>Try every AI tool</Tick>
            </ul>
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
            <p className="mt-1 text-sm text-white/50">or ${MONTHLY}/month</p>
            <ul className="mt-6 space-y-2.5">
              <Tick>Wish Workshop and in-line suggestions</Tick>
              <Tick>5,000 AI calls a month, unlimited rhymes</Tick>
              <Tick>10,000 minutes of recording</Tick>
            </ul>
            <a href={webTrial("yearly")} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#F6ECC9] py-3 text-sm font-semibold text-[#6F50B8] hover:bg-[#FBF2D6]">
              Start your free trial
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ["Is my lyric data used to train AI?", "No. We never train on your lyrics and never share them. Your songs are private by default."],
  ["Can co-writers join without the app?", "Yes. Send a link and they can write with you in their browser or on iPhone, free."],
  ["Does it work on iPad and Mac?", "Yes. There's a native app for iPhone, iPad and Mac, and the web app runs on any computer. Everything syncs."],
  ["Is there a free trial?", "Yes. Pro starts with 14 days free, on the web or iPhone. One subscription covers both."],
  ["Can I export my lyrics?", "Yes. Lyric sheets open at their own link, with publishing info if you want it."],
];

function FAQ() {
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

function FinalCTA() {
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
      <SEO title="Lyric Genie — The Songwriting Studio" description="Write, co-write and record, at your desk and on your iPhone. The professional songwriting workspace, with the iPhone app as its partner." />
      <ProNav />
      <Hero />
      <Desk />
      <Features />
      <More />
      <IPhone />
      <Philosophy />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default ProHome;
