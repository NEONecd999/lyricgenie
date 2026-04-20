import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import SfIcon from "@/components/SfIcon";

/**
 * Hero — ported from design reference (ui_kits/marketing_site/index v2.html).
 * Purple gradient, editor-style phone mockup on the right, floating bubbles
 * pulled from the original site's content (Smart Dictionaries, Syllable Tool,
 * Voice Recording, Wish Workshop) so they retain the bobbing animation.
 */

const FloatingNotes = () => {
  const notes = [
    { g: "♪", top: "6%", left: "5%", size: 84, opacity: 0.22, rot: -8, delay: 0 },
    { g: "♫", top: "14%", right: "6%", size: 108, opacity: 0.18, rot: 6, delay: 0.4 },
    { g: "♬", bottom: "12%", left: "8%", size: 68, opacity: 0.24, rot: -14, delay: 0.8 },
    { g: "♩", bottom: "8%", right: "10%", size: 52, opacity: 0.28, rot: 18, delay: 1.2 },
    { g: "♪", top: "62%", left: "2%", size: 72, opacity: 0.15, rot: 4, delay: 1.6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {notes.map((n, i) => (
        <span
          key={i}
          className="absolute font-serif italic text-[#F6ECC9] animate-float"
          style={{
            top: n.top,
            bottom: n.bottom,
            left: n.left,
            right: n.right,
            fontSize: n.size,
            opacity: n.opacity,
            transform: `rotate(${n.rot}deg)`,
            animationDelay: `${n.delay}s`,
          }}
        >
          {n.g}
        </span>
      ))}
    </div>
  );
};

const PhoneMockup = () => {
  return (
    <div
      className="relative"
      style={{
        width: 276,
        height: 572,
        background: "#1E1324",
        borderRadius: 46,
        padding: 7,
        boxShadow: "0 40px 80px -20px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.08)",
      }}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden"
        style={{ background: "#F5EFD9", borderRadius: 40, position: "relative" }}
      >
        {/* Dynamic island */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 10, width: 92, height: 22, background: "#1E1324", borderRadius: 9999 }}
        />
        {/* iOS status bar */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "14px 22px 6px", fontSize: 12, fontWeight: 600, color: "#1E1324" }}
        >
          <span>3:50</span>
          <span className="inline-flex items-center gap-1" style={{ fontSize: 11 }}>
            ●●● <span style={{ letterSpacing: 1 }}>▮▮▮</span> 64
          </span>
        </div>

        {/* Top toolbar */}
        <div className="flex items-center gap-2" style={{ padding: "6px 14px 8px" }}>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#6F50B8" }}>
            ‹
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#8B6FC9", fontSize: 17 }}>
            ↶
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#8B6FC9", fontSize: 17 }}>
            ↷
          </div>
          <div
            className="mx-auto flex items-center gap-0.5"
            style={{ background: "#EFE6C3", borderRadius: 9999, padding: 3 }}
          >
            <div
              className="flex h-[26px] w-[30px] items-center justify-center rounded-full"
              style={{ color: "#8B6FC9" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h2l2-4 4 8 4-8 2 4h4" />
              </svg>
            </div>
            <div
              className="flex h-[26px] w-[30px] items-center justify-center rounded-full"
              style={{ background: "#FCF7E1", color: "#6F50B8", boxShadow: "0 1px 2px rgba(30,19,36,.08)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <div
              className="flex h-[26px] w-[30px] items-center justify-center rounded-full"
              style={{ color: "#8B6FC9" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </div>
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#8B6FC9", fontSize: 14 }}>
            ▦
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#8B6FC9", fontSize: 14 }}>
            ≡
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center" style={{ color: "#8B6FC9", fontSize: 16 }}>
            ⋯
          </div>
        </div>

        {/* AI context band */}
        <div
          className="flex items-center gap-2"
          style={{
            padding: "5px 16px 9px",
            fontSize: 11,
            color: "rgba(30,19,36,.72)",
            borderBottom: "1px solid rgba(30,19,36,.08)",
          }}
        >
          <span
            style={{
              background: "rgba(127,98,196,.16)",
              color: "#6F50B8",
              padding: "2px 7px",
              borderRadius: 5,
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: ".01em",
            }}
          >
            AI Context
          </span>
          <span
            className="flex-1 overflow-hidden whitespace-nowrap"
            style={{ textOverflow: "ellipsis" }}
          >
            High speed car chase · No turning back, end…
          </span>
          <span style={{ color: "rgba(30,19,36,.5)" }}>⌄</span>
        </div>

        {/* Song title + sparkle */}
        <div className="flex items-center gap-2.5" style={{ padding: "12px 18px 8px" }}>
          <div
            className="flex-1 font-display"
            style={{ fontWeight: 700, fontSize: 22, color: "#1E1324", letterSpacing: "-0.015em" }}
          >
            Night Ride
          </div>
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: "#EFE6C3", color: "#6F50B8" }}
          >
            <SfIcon name="sparkles" size={16} color="#6F50B8" />
          </div>
        </div>

        {/* Writer tabs */}
        <div
          className="flex"
          style={{ padding: "0 14px", borderBottom: "1px solid rgba(30,19,36,.08)" }}
        >
          {[
            { name: "Edan (You)", active: true, dotColor: "#6FA83C" },
            { name: "Anton", active: false, dotColor: "#8B6FC9" },
            { name: "Master", active: false, dotColor: "#C9932E" },
          ].map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-1"
              style={{
                padding: "7px 10px",
                fontSize: 10.5,
                fontWeight: 700,
                color: t.active ? "#6FA83C" : "rgba(30,19,36,.42)",
                borderBottom: `2.5px solid ${t.active ? "#6FA83C" : "transparent"}`,
                letterSpacing: "-0.005em",
                marginRight: 3,
              }}
            >
              <span style={{ fontSize: 9, color: t.dotColor }}>●</span>
              {t.name}
            </div>
          ))}
        </div>

        {/* Verse 1 header */}
        <div className="flex items-center gap-1.5" style={{ padding: "10px 18px 2px" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ color: "rgba(30,19,36,.38)" }}
          >
            <path d="M3 12h2l2-4 4 8 4-8 2 4h4" />
          </svg>
          <div style={{ color: "#6FA83C", fontWeight: 700, fontSize: 14, letterSpacing: "-0.005em" }}>Verse 1</div>
          <div
            className="ml-auto flex items-center justify-center"
            style={{
              width: 22,
              height: 16,
              borderRadius: 5,
              background: "#6FA83C",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            ⋯
          </div>
        </div>

        {/* Stanza 1 with purple rail */}
        <div
          style={{
            padding: "4px 18px 14px 18px",
            borderLeft: "2px solid #B19BE2",
            margin: "0 0 0 18px",
          }}
        >
          {["I became another stranger", "No way that id ever be forgiven", "Oh What have I done"].map((line) => (
            <div key={line} style={{ fontSize: 12, lineHeight: 1.5, color: "#1E1324", padding: "2px 0" }}>
              {line}
            </div>
          ))}
          <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(30,19,36,.88)", padding: "2px 0" }}>
            Now I am lost, like a ghost, bleeding out for your love
          </div>
        </div>

        {/* Stanza 2 */}
        <div style={{ padding: "4px 20px 14px 20px" }}>
          {["I fell deep into the madness", "Chasing the smell of smoke and burning ashes"].map((line) => (
            <div key={line} style={{ fontSize: 12, lineHeight: 1.5, color: "#1E1324", padding: "2px 0" }}>
              {line}
            </div>
          ))}
        </div>

        {/* FAB cluster */}
        <div className="absolute flex flex-col gap-2" style={{ right: 12, bottom: 18 }}>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "#B19BE2",
              color: "#fff",
              boxShadow: "0 10px 22px -6px rgba(127,98,196,.55), 0 1px 3px rgba(30,19,36,.15)",
            }}
            title="Wish Workshop"
          >
            <svg width="20" height="20" viewBox="0 0 24 22" fill="currentColor">
              <path d="M9 4V2h3v2h1.5a3.5 3.5 0 0 1 3 5.2l-.5.8H7l-.5-.8A3.5 3.5 0 0 1 9.5 4H9zm-6 8c.5 2 2.5 3 5 3.2.3 1.6 1.2 3 2.5 3.8H4v2h16v-2h-6.5c1.3-.8 2.2-2.2 2.5-3.8 2.5-.2 4.5-1.2 5-3.2H3zM4.5 10c-1.5 0-1.5 2 0 2H6v-2H4.5z" />
            </svg>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "#B19BE2",
              color: "#fff",
              boxShadow: "0 10px 22px -6px rgba(127,98,196,.55), 0 1px 3px rgba(30,19,36,.15)",
            }}
            title="Grid"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="8" height="8" rx="1.5" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" />
              <rect x="3" y="13" width="8" height="8" rx="1.5" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroEnhanced = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#6F50B8 0%, #7F62C4 55%, #B19BE2 100%)",
        color: "#fff",
        padding: "120px 0 110px",
      }}
    >
      {/* Orbs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ width: 420, height: 420, background: "#C48AE3", opacity: 0.5, filter: "blur(80px)", top: -120, left: -100 }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ width: 360, height: 360, background: "#F6ECC9", opacity: 0.18, filter: "blur(80px)", bottom: -140, right: -80 }}
      />
      <FloatingNotes />

      <div
        className="container relative z-10 mx-auto grid items-center gap-10 px-6 lg:gap-14"
        style={{ gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)" }}
      >
        {/* Left column — copy */}
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] text-[#F6ECC9] backdrop-blur-md"
          >
            <SfIcon name="sparkles" size={14} color="#F6ECC9" />
            Built by pro songwriters in LA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-white"
            style={{
              fontWeight: 700,
              fontSize: "clamp(48px, 6.5vw, 82px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              margin: "0 0 22px",
            }}
          >
            Your All-in-One
            <br />
            Songwriting{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F6ECC9 0%,#FFFFFF 60%,#F6ECC9 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Notepad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,.85)",
              maxWidth: 560,
              margin: "0 0 12px",
            }}
          >
            Capture ideas, shape lyrics, and co-write in real-time – built for the flow of professional sessions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-9"
            style={{ fontSize: 15, color: "rgba(255,255,255,.7)" }}
          >
            A native iOS app for iPhone, iPad, and Mac.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="hero" size="xl" asChild className="bg-[#F6ECC9] !text-[#6F50B8] hover:bg-[#F6ECC9]/90">
              <a href="https://apps.apple.com/us/app/lyric-genie/id6739787614">
                <Download className="h-5 w-5" />
                Download on App Store
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Right column — phone mockup + floating bubbles (existing site content) */}
        <div className="relative mx-auto flex w-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            <PhoneMockup />

            {/* Floating bubbles — original site content with bobbing animation */}
            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 24, left: -220, width: 220 }}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#F6ECC9]/80">
                Smart Dictionaries
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[13px] text-[#1E1324]">
                    display → <span className="text-primary">overlay, gateway, replay</span>
                  </span>
                  <span className="text-[11px] text-[#5D5065]">Multi &amp; Phrases: fade away</span>
                </div>
              </div>
            </div>

            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 160, right: -210, width: 210, animationDelay: "0.6s" }}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#F6ECC9]/80">
                Syllable Tool
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]">
                <div className="mb-2 text-[13px] text-[#1E1324]">Remove 1 syllable</div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-xl bg-[#F4EEFE] px-2 py-1 text-[11px] text-[#5D5065] line-through">
                    might be real
                  </span>
                  <span className="rounded-xl bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                    could be real
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 320, left: -200, width: 210, animationDelay: "1.2s" }}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#F6ECC9]/80">
                Voice Recording
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]">
                <div className="mb-2 text-[13px] text-[#1E1324]">Verse Melody Idea</div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 items-center gap-[3px]">
                    {[8, 14, 20, 12, 16].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-sm bg-primary"
                        style={{
                          height: h,
                          animation: `wave 1.2s ease-in-out ${i * 0.1}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#5D5065]">0:42</span>
                </div>
              </div>
            </div>

            <div
              className="absolute hidden lg:block animate-float"
              style={{ bottom: 40, right: -220, width: 220, animationDelay: "1.8s" }}
            >
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#F6ECC9]/80">
                Wish Workshop
              </div>
              <div className="rounded-2xl bg-white p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]">
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <SfIcon name="sparkles" size={12} color="#6F50B8" />
                    <span className="text-[12px] text-[#5D5065]">dancing in the moonlight</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <SfIcon name="sparkles" size={12} color="#6F50B8" />
                    <span className="text-[12px] text-[#5D5065]">swaying through the starlight</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroEnhanced;
