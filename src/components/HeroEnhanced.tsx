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
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <SfIcon name="chevron.left" size={16} color="#6F50B8" />
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <SfIcon name="arrow.uturn.backward" size={14} color="#8B6FC9" />
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <SfIcon name="arrow.uturn.forward" size={14} color="#8B6FC9" />
          </div>
          <div
            className="mx-auto flex items-center gap-0.5"
            style={{ background: "#EFE6C3", borderRadius: 9999, padding: 3 }}
          >
            <div className="flex h-[26px] w-[30px] items-center justify-center rounded-full">
              <SfIcon name="recordingtape" size={14} color="#8B6FC9" />
            </div>
            <div
              className="flex h-[26px] w-[30px] items-center justify-center rounded-full"
              style={{ background: "#FCF7E1", boxShadow: "0 1px 2px rgba(30,19,36,.08)" }}
            >
              <SfIcon name="record.circle" size={15} color="#6F50B8" />
            </div>
            <div className="flex h-[26px] w-[30px] items-center justify-center rounded-full">
              <SfIcon name="music.microphone" size={14} color="#8B6FC9" />
            </div>
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <SfIcon name="person.2.fill" size={16} color="#8B6FC9" />
          </div>
          <div className="flex h-[22px] w-[22px] items-center justify-center">
            <SfIcon name="ellipsis.circle" size={18} color="#8B6FC9" />
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
          <SfIcon name="chevron.down" size={11} color="rgba(30,19,36,.5)" />
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
          <SfIcon name="recordingtape" size={14} color="rgba(30,19,36,.38)" />
          <div style={{ color: "#6FA83C", fontWeight: 700, fontSize: 14, letterSpacing: "-0.005em" }}>Verse 1</div>
          <div
            className="ml-auto flex items-center justify-center"
            style={{
              width: 22,
              height: 16,
              borderRadius: 5,
              background: "#6FA83C",
            }}
          >
            <SfIcon name="ellipsis" size={11} color="#fff" />
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
              boxShadow: "0 10px 22px -6px rgba(127,98,196,.55), 0 1px 3px rgba(30,19,36,.15)",
            }}
            title="Wish Workshop"
          >
            <SfIcon src="/images/lamp.svg" size={22} color="#fff" />
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "#B19BE2",
              boxShadow: "0 10px 22px -6px rgba(127,98,196,.55), 0 1px 3px rgba(30,19,36,.15)",
            }}
            title="Arrange"
          >
            <SfIcon name="square.grid.2x2" size={18} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroEnhanced = () => {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16 lg:pb-28 lg:pt-16"
      style={{
        background: "linear-gradient(135deg,#6F50B8 0%, #7F62C4 55%, #B19BE2 100%)",
        color: "#fff",
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

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
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
              fontSize: "clamp(40px, 9vw, 82px)",
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
            <a
              href="https://apps.apple.com/us/app/lyric-genie/id6739787614"
              className="inline-flex items-center gap-2 rounded-full bg-[#F6ECC9] px-9 py-4 text-[15.5px] font-semibold text-[#6F50B8] shadow-[0_10px_30px_-10px_rgba(30,19,36,0.35)] transition-all duration-300 hover:bg-[#FBF2D6] hover:shadow-[0_14px_40px_-10px_rgba(30,19,36,0.45)]"
            >
              <Download className="h-5 w-5" />
              Download on App Store
            </a>
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

            {/* Floating bubbles — each one mirrors a spotlight below so the hero
                previews the visual language of the rest of the page.
                Cream paper surface, SF symbols, verse-green / writer colors,
                Academico italic for lyric lines. */}

            {/* Wish Workshop — purple eyebrow, filled Darker pill, one blue-highlighted rewrite */}
            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 24, left: -260, width: 240 }}
            >
              <div
                className="rounded-2xl p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]"
                style={{ background: "#F5EFD9" }}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <SfIcon name="sparkles" size={11} color="#6F50B8" />
                  <span
                    className="text-[9.5px] font-bold uppercase"
                    style={{ letterSpacing: ".12em", color: "#6F50B8" }}
                  >
                    Wish Workshop
                  </span>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
                    style={{ background: "#6F50B8" }}
                  >
                    Darker
                  </span>
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{ borderColor: "#6F50B8", color: "#6F50B8" }}
                  >
                    Happier
                  </span>
                </div>
                <div
                  className="font-serif italic"
                  style={{
                    fontSize: 13.5,
                    color: "#1E1324",
                    background: "rgba(58,123,208,0.12)",
                    borderRadius: 10,
                    padding: "7px 10px",
                    lineHeight: 1.35,
                  }}
                >
                  I dove straight into the blackness
                </div>
              </div>
            </div>

            {/* Rhymes — mini rhyme sheet with the lookup word big, 4 tokens in a 2-col grid */}
            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 170, right: -240, width: 210, animationDelay: "0.6s" }}
            >
              <div
                className="rounded-2xl p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]"
                style={{ background: "#F5EFD9" }}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <SfIcon name="character.book.closed.fill" size={11} color="#6F50B8" />
                  <span
                    className="text-[9.5px] font-bold uppercase"
                    style={{ letterSpacing: ".12em", color: "#6F50B8" }}
                  >
                    Rhymes
                  </span>
                </div>
                <div
                  className="mb-2 font-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1E1324",
                    letterSpacing: "-0.015em",
                    lineHeight: 1,
                  }}
                >
                  home
                </div>
                <div
                  className="grid grid-cols-2"
                  style={{ gap: "3px 12px", fontSize: 12, color: "#6F50B8" }}
                >
                  <span>alone</span>
                  <span>stone</span>
                  <span>chrome</span>
                  <span>zone</span>
                </div>
              </div>
            </div>

            {/* Co-write — three colored writer dots + verse rail + session status */}
            <div
              className="absolute hidden lg:block animate-float"
              style={{ top: 330, left: -240, width: 220, animationDelay: "1.2s" }}
            >
              <div
                className="rounded-2xl p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]"
                style={{ background: "#F5EFD9" }}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <SfIcon name="person.2.fill" size={11} color="#6F50B8" />
                  <span
                    className="text-[9.5px] font-bold uppercase"
                    style={{ letterSpacing: ".12em", color: "#6F50B8" }}
                  >
                    Live Session
                  </span>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                  {[
                    { c: "#6FA83C", n: "Edan" },
                    { c: "#6F50B8", n: "Anton" },
                    { c: "#C9932E", n: "Kasper" },
                  ].map((p) => (
                    <span
                      key={p.n}
                      className="inline-flex items-center gap-1 rounded-full"
                      style={{
                        padding: "2px 7px 2px 5px",
                        background: `${p.c}22`,
                        color: p.c,
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 9999,
                          background: p.c,
                        }}
                      />
                      {p.n}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 3, height: 14, background: "#6FA83C", borderRadius: 2 }} />
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "#6FA83C", letterSpacing: ".05em" }}
                  >
                    CHORUS · 3 writers
                  </span>
                </div>
              </div>
            </div>

            {/* Recordings — coral recordingtape + waveform + duration */}
            <div
              className="absolute hidden lg:block animate-float"
              style={{ bottom: 40, right: -250, width: 230, animationDelay: "1.8s" }}
            >
              <div
                className="rounded-2xl p-3.5 shadow-[0_20px_40px_-12px_rgba(30,19,36,0.35)]"
                style={{ background: "#F5EFD9" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex flex-shrink-0 items-center justify-center"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "#E8663C",
                    }}
                  >
                    <SfIcon name="recordingtape" size={18} color="#fff" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="mb-1"
                      style={{ fontSize: 11.5, fontWeight: 700, color: "#1E1324", lineHeight: 1 }}
                    >
                      Verse Melody
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-[2px]" style={{ height: 14 }}>
                        {[5, 10, 16, 9, 13, 6, 11, 4, 14, 8].map((h, i) => (
                          <span
                            key={i}
                            className="rounded-sm bg-primary"
                            style={{
                              width: 2,
                              height: h,
                              animation: `wave 1.2s ease-in-out ${i * 0.08}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: 10, color: "#5D5065" }}>0:42</span>
                    </div>
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
