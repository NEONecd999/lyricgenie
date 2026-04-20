import { useEffect, useRef, useState, ReactElement } from "react";
import { motion } from "framer-motion";

// ── Palette (from design reference) ─────────────────────────
const LG_PAPER = "#F5EFD9";
const LG_INK = "#1E1324";
const LG_INK_SOFT = "#635468";
const LG_INK_MUTED = "rgba(30,19,36,0.55)";
const LG_PURPLE = "#6F50B8";
const LG_PURPLE_SOFT = "#B19BE2";
const LG_GREEN = "#6FA83C";
const LG_CORAL = "#E8663C";
const LG_AMBER = "#C9932E";
const LG_BLUE = "#3A7BD0";

// ── In-view hook ────────────────────────────────────────────
function useInView(threshold = 0.25): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Reusable UI frame ───────────────────────────────────────
const UIFrame = ({ children, tone = "paper" }: { children: React.ReactNode; tone?: "paper" | "white" }) => (
  <div
    className="relative w-full max-w-[520px]"
    style={{
      aspectRatio: "5/6",
      background: tone === "paper" ? LG_PAPER : "#fff",
      borderRadius: 28,
      overflow: "hidden",
      boxShadow:
        "0 30px 80px -20px rgba(30,19,36,.35), 0 0 0 1px rgba(30,19,36,.06), inset 0 1px 0 rgba(255,255,255,.5)",
    }}
  >
    {children}
  </div>
);

// ══════════════════════════════════════════════════════════
// Spotlight 1 · Write Lyrics — typewriter
// ══════════════════════════════════════════════════════════
const WRITE_LINES = [
  "I became another stranger",
  "No way that I could be forgiven",
  "Oh what have I done",
  "Now I'm lost, like a ghost,",
  "bleeding out for your love",
];

const WriterChip = ({ color, name, active }: { color: string; name: string; active?: boolean }) => (
  <div
    className="inline-flex items-center gap-1.5"
    style={{
      padding: "5px 10px 5px 8px",
      borderRadius: 9999,
      background: active ? `${color}22` : "transparent",
      color: active ? color : LG_INK_MUTED,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "-0.005em",
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 9999,
        background: color,
        boxShadow: active ? `0 0 0 3px ${color}33` : "none",
      }}
    />
    {name}
  </div>
);

const WriteLyricsSpotlight = ({ active }: { active: boolean }) => {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) {
      setIdx(0);
      setTyped("");
      return;
    }
    let cancel = false;
    const run = async () => {
      for (let i = 0; i < WRITE_LINES.length && !cancel; i++) {
        setIdx(i);
        const line = WRITE_LINES[i];
        for (let c = 0; c <= line.length && !cancel; c++) {
          setTyped(line.slice(0, c));
          await new Promise((r) => setTimeout(r, 28));
        }
        await new Promise((r) => setTimeout(r, 520));
      }
      await new Promise((r) => setTimeout(r, 1200));
      if (!cancel) run();
    };
    run();
    return () => {
      cancel = true;
    };
  }, [active]);

  return (
    <UIFrame tone="paper">
      <div className="flex items-center gap-3" style={{ padding: "22px 28px 10px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: LG_PURPLE }}>WRITE LYRICS</div>
        <div className="flex-1" />
        <WriterChip color={LG_GREEN} name="Edan" active />
        <WriterChip color={LG_PURPLE_SOFT} name="Anton" />
        <WriterChip color={LG_AMBER} name="Master" />
      </div>
      <div style={{ padding: "6px 32px 0" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: LG_INK, letterSpacing: "-0.015em" }}>Night Ride</div>
        <div className="mb-2 mt-3.5 flex items-center gap-2">
          <span style={{ width: 4, height: 18, background: LG_GREEN, borderRadius: 2, display: "inline-block" }} />
          <span style={{ color: LG_GREEN, fontWeight: 700, fontSize: 14, letterSpacing: ".04em" }}>VERSE 1</span>
        </div>
        <div style={{ borderLeft: `2px solid ${LG_PURPLE_SOFT}`, paddingLeft: 16, minHeight: 170 }}>
          {WRITE_LINES.map((line, i) => {
            const done = i < idx;
            const current = i === idx;
            return (
              <div
                key={i}
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: done ? LG_INK : current ? LG_INK : "transparent",
                  transition: "color .4s",
                }}
              >
                {done ? (
                  line
                ) : current ? (
                  <>
                    {typed}
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 18,
                        marginLeft: 1,
                        background: LG_GREEN,
                        verticalAlign: "-3px",
                        animation: "lgCaret 0.9s steps(2) infinite",
                      }}
                    />
                  </>
                ) : (
                  "·"
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="absolute flex items-center gap-2.5 rounded-xl bg-white"
        style={{
          bottom: 28,
          right: 26,
          padding: "10px 14px",
          boxShadow: "0 12px 30px -8px rgba(30,19,36,.25), 0 0 0 1px rgba(30,19,36,.05)",
          animation: active ? "lgFloaty 4s ease-in-out infinite" : "none",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: LG_PURPLE }} />
        <span style={{ fontSize: 12, color: LG_INK, fontWeight: 600 }}>
          Tap <span style={{ fontStyle: "italic" }}>stranger</span> for rhymes
        </span>
      </div>
    </UIFrame>
  );
};

// ══════════════════════════════════════════════════════════
// Spotlight 2 · Wish Workshop — pills cycle
// ══════════════════════════════════════════════════════════
const WISH_PILLS = [
  "These summer nights",
  "When the world ignites",
  "Through these neon lights",
  "In electric flights",
  "Where our hearts collide",
  "When the bass takes flight",
  "In these stolen nights",
];

const WishWorkshopSpotlight = ({ active }: { active: boolean }) => {
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSel((s) => (s + 1) % WISH_PILLS.length), 1600);
    return () => clearInterval(id);
  }, [active]);

  return (
    <UIFrame tone="paper">
      <div className="text-center" style={{ padding: "22px 28px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: LG_PURPLE }}>WISH WORKSHOP</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: LG_INK, marginTop: 10, letterSpacing: "-0.01em" }}>
          Rewrite <span style={{ color: LG_INK_MUTED, fontWeight: 500 }}>—</span> These summer nights
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-2.5"
        style={{ padding: "6px 28px 0" }}
      >
        {WISH_PILLS.map((t, i) => {
          const isSel = i === sel;
          return (
            <div
              key={t}
              style={{
                padding: "10px 20px",
                borderRadius: 9999,
                background: isSel ? LG_BLUE : "rgba(127,98,196,0.18)",
                color: isSel ? "#fff" : LG_INK,
                fontSize: 14.5,
                fontWeight: 500,
                border: isSel ? "none" : "1px solid rgba(127,98,196,0.28)",
                boxShadow: isSel ? "0 4px 16px rgba(58,123,208,.45)" : "none",
                transition: "all .35s cubic-bezier(.4,.0,.2,1)",
                transform: isSel ? "scale(1.04)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </div>
          );
        })}
      </div>

      <div
        className="absolute flex flex-wrap justify-center gap-1.5"
        style={{ left: 18, right: 18, bottom: 116 }}
      >
        {["Darker", "More Visual", "Simpler", "More Gen Z"].map((t) => (
          <div
            key={t}
            style={{
              padding: "7px 13px",
              borderRadius: 9999,
              border: "1px solid rgba(127,98,196,0.32)",
              background: "#fff",
              color: LG_INK,
              fontSize: 12,
              fontWeight: 600,
              boxShadow: "0 1px 2px rgba(30,19,36,.04)",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      <div
        className="absolute flex justify-center gap-[18px]"
        style={{ left: 22, right: 22, bottom: 74 }}
      >
        {[
          { l: "Keep end rhyme", on: true },
          { l: "Keep meter", on: true },
        ].map(({ l, on }) => (
          <div key={l} className="flex items-center gap-[7px]" style={{ fontSize: 11.5, color: LG_INK, fontWeight: 600 }}>
            <div
              className="relative"
              style={{
                width: 26,
                height: 15,
                borderRadius: 9999,
                background: on ? LG_PURPLE : "rgba(30,19,36,0.18)",
                boxShadow: "inset 0 1px 2px rgba(30,19,36,.12)",
                transition: "background .3s",
              }}
            >
              <div
                className="absolute"
                style={{
                  top: 1.5,
                  left: on ? 12.5 : 1.5,
                  width: 12,
                  height: 12,
                  borderRadius: 9999,
                  background: "#fff",
                  boxShadow: "0 1px 2px rgba(30,19,36,.2)",
                  transition: "left .3s",
                }}
              />
            </div>
            <span>{l}</span>
          </div>
        ))}
      </div>

      <div
        className="absolute flex items-center gap-2 rounded-full border border-[rgba(30,19,36,0.12)] bg-white"
        style={{ left: 22, right: 22, bottom: 22, padding: "11px 16px" }}
      >
        <span style={{ color: LG_INK_MUTED, fontSize: 13, flex: 1 }}>Describe your wish…</span>
        <span
          style={{
            color: "#fff",
            background: LG_PURPLE,
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: 9999,
            letterSpacing: ".02em",
          }}
        >
          WISH
        </span>
      </div>
    </UIFrame>
  );
};

// ══════════════════════════════════════════════════════════
// Spotlight 3 · Co-write real time
// ══════════════════════════════════════════════════════════
const COWRITE_LINES = [
  { t: "It's just you and I", who: "Edan", color: LG_GREEN },
  { t: "I'll take you on a night ride", who: "Anton", color: LG_PURPLE },
  { t: "It's just you and I", who: "Edan", color: LG_GREEN },
  { t: "We'll drive until the sunlight", who: "Kasper", color: LG_AMBER },
  { t: "Let the city blur behind us", who: "Anton", color: LG_PURPLE },
];

const PresenceDot = ({ color, name, typing }: { color: string; name: string; typing?: boolean }) => (
  <div
    className="inline-flex items-center gap-1.5"
    style={{
      padding: "5px 10px 5px 7px",
      borderRadius: 9999,
      background: `${color}18`,
      color,
      fontSize: 11,
      fontWeight: 700,
    }}
  >
    <span className="relative" style={{ width: 8, height: 8 }}>
      <span className="absolute inset-0 rounded-full" style={{ background: color }} />
      {typing && (
        <span
          className="absolute rounded-full"
          style={{
            inset: -4,
            border: `2px solid ${color}`,
            opacity: 0.6,
            animation: "lgPing 1.4s ease-out infinite",
          }}
        />
      )}
    </span>
    {name}
  </div>
);

const CowriteSpotlight = ({ active }: { active: boolean }) => {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!active) {
      setVisible(0);
      return;
    }
    let cancel = false;
    const run = async () => {
      for (let i = 1; i <= COWRITE_LINES.length; i++) {
        if (cancel) return;
        setVisible(i);
        await new Promise((r) => setTimeout(r, 900));
      }
      await new Promise((r) => setTimeout(r, 1400));
      if (!cancel) {
        setVisible(0);
        run();
      }
    };
    run();
    return () => {
      cancel = true;
    };
  }, [active]);

  return (
    <UIFrame tone="paper">
      <div style={{ padding: "22px 28px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: LG_PURPLE }}>
          LIVE SESSION · 3 WRITERS
        </div>
        <div className="mt-3 flex items-center gap-2">
          <PresenceDot color={LG_GREEN} name="Edan" typing />
          <PresenceDot color={LG_PURPLE} name="Anton" typing />
          <PresenceDot color={LG_AMBER} name="Kasper" />
          <div className="flex-1" />
          <span style={{ fontSize: 11, color: LG_INK_MUTED, fontWeight: 600 }}>Session 00:42:18</span>
        </div>
      </div>

      <div className="mb-2 flex items-center gap-2" style={{ padding: "6px 28px 0" }}>
        <span style={{ width: 4, height: 18, background: LG_GREEN, borderRadius: 2 }} />
        <span style={{ color: LG_GREEN, fontWeight: 700, fontSize: 14, letterSpacing: ".04em" }}>CHORUS</span>
      </div>

      <div className="flex flex-col gap-1.5" style={{ padding: "0 28px" }}>
        {COWRITE_LINES.map((l, i) => {
          const shown = i < visible;
          return (
            <div
              key={i}
              className="flex items-center gap-3"
              style={{
                padding: "8px 12px 8px 14px",
                borderLeft: `3px solid ${shown ? l.color : "transparent"}`,
                background: shown ? `${l.color}10` : "transparent",
                borderRadius: 6,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(8px)",
                transition: "all .4s cubic-bezier(.4,.0,.2,1)",
              }}
            >
              <span style={{ fontSize: 16, color: LG_INK, flex: 1 }}>{l.t}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  color: l.color,
                  padding: "3px 7px",
                  borderRadius: 9999,
                  background: `${l.color}18`,
                }}
              >
                {l.who.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </UIFrame>
  );
};

// ══════════════════════════════════════════════════════════
// Spotlight 4 · Rhymes
// ══════════════════════════════════════════════════════════
const RHYME_TABS = [
  { key: "perfect", label: "Perfect", color: LG_PURPLE },
  { key: "near", label: "Near", color: LG_CORAL },
  { key: "multi", label: "Multi-Syllabic", color: LG_GREEN },
  { key: "phrases", label: "Phrases", color: LG_BLUE },
];
const RHYME_DATA: Record<string, string[]> = {
  perfect: ["light", "bright", "sight", "flight", "might", "right", "fight", "tight"],
  near: ["white", "write", "kite", "quite", "time", "mind", "line", "shine"],
  multi: ["tonight", "delight", "ignite", "excite", "unite", "invite", "daylight", "moonlight"],
  phrases: ["through the night", "into the night", "one last night", "summer night", "starry night", "middle of the night"],
};

const RhymeSpotlight = ({ active }: { active: boolean }) => {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTab((t) => (t + 1) % RHYME_TABS.length), 3000);
    return () => clearInterval(id);
  }, [active]);

  const cur = RHYME_TABS[tab];
  const tokens = RHYME_DATA[cur.key];

  return (
    <UIFrame tone="paper">
      <div className="text-center" style={{ padding: "22px 28px 10px" }}>
        <div
          className="flex flex-wrap justify-center gap-2.5"
          style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em" }}
        >
          <span style={{ color: LG_PURPLE }}>RHYME</span>
          <span style={{ color: LG_INK_MUTED, opacity: 0.45 }}>· THESAURUS</span>
          <span style={{ color: LG_INK_MUTED, opacity: 0.45 }}>· SOUNDS-LIKE</span>
          <span style={{ color: LG_INK_MUTED, opacity: 0.45 }}>· ASSOCIATIONS</span>
        </div>
        <div
          className="mt-3 inline-flex items-baseline gap-2.5 rounded-xl bg-white"
          style={{
            padding: "10px 18px",
            boxShadow: "0 4px 14px rgba(30,19,36,.08), 0 0 0 1px rgba(30,19,36,.05)",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: LG_INK, letterSpacing: "-0.01em" }}>night</span>
          <span style={{ fontSize: 11, color: LG_INK_MUTED }}>∙ Verse 1, line 1</span>
        </div>
      </div>

      <div className="flex justify-center gap-2" style={{ padding: "14px 20px 6px" }}>
        {RHYME_TABS.map((t, i) => {
          const on = i === tab;
          return (
            <div
              key={t.key}
              style={{
                padding: "6px 14px",
                borderRadius: 9999,
                background: on ? `${t.color}22` : "rgba(30,19,36,0.05)",
                color: on ? t.color : LG_INK_MUTED,
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: "-0.005em",
                border: on ? `1px solid ${t.color}45` : "1px solid transparent",
                transition: "all .3s",
              }}
            >
              {t.label}
            </div>
          );
        })}
      </div>

      <div
        key={tab}
        className="grid justify-items-center"
        style={{
          padding: "16px 32px 24px",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 20px",
        }}
      >
        {tokens.map((w, i) => (
          <div
            key={w}
            style={{
              fontSize: 19,
              color: cur.color,
              fontWeight: 500,
              opacity: 0,
              transform: "translateY(8px)",
              animation: active ? `lgFadeUp .45s ${i * 80}ms cubic-bezier(.4,.0,.2,1) forwards` : "none",
            }}
          >
            {w}
          </div>
        ))}
      </div>

      <div
        className="absolute flex items-center gap-2.5"
        style={{ left: 24, right: 24, bottom: 22, color: LG_INK_MUTED, fontSize: 11.5 }}
      >
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: 18,
            height: 18,
            borderRadius: 6,
            background: LG_PURPLE,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          ↵
        </span>
        Tap a rhyme to replace the word in place
      </div>
    </UIFrame>
  );
};

// ══════════════════════════════════════════════════════════
// Compact row (below main spotlights)
// ══════════════════════════════════════════════════════════
const CompactVoice = () => {
  const bars = Array.from({ length: 28 }, (_, i) => 6 + Math.abs(Math.sin(i * 0.9)) * 18);
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: h,
            background: LG_CORAL,
            borderRadius: 2,
            opacity: 0.7,
            animation: `lgWavePulse 1.2s ease-in-out ${i * 50}ms infinite`,
          }}
        />
      ))}
      <div
        className="absolute flex justify-between"
        style={{ bottom: 18, left: 20, right: 20, fontSize: 11, color: LG_INK_SOFT }}
      >
        <span>
          0:04.1 · <span style={{ color: LG_CORAL, fontWeight: 700 }}>Verse 1</span>
        </span>
        <span style={{ fontFamily: "ui-monospace,monospace" }}>3/14/26</span>
      </div>
    </div>
  );
};

const CompactConcepts = () => {
  const cards = [
    { t: "Highway Ghost", g: "linear-gradient(150deg,#3A7BD0,#79B0DC)" },
    { t: "Red Light Runner", g: "linear-gradient(150deg,#E45C7A,#E89C8C)" },
    { t: "Ghost Mode", g: "linear-gradient(150deg,#9B7AD4,#D49ACB)" },
    { t: "Golden Hour", g: "#FCF7E1" },
  ];
  return (
    <div className="absolute grid gap-2" style={{ inset: "18px 22px", gridTemplateColumns: "1fr 1fr" }}>
      {cards.map((c, i) => (
        <div
          key={c.t}
          className="flex items-end"
          style={{
            background: c.g,
            borderRadius: 10,
            padding: "8px 10px",
            color: c.g.startsWith("#") ? LG_INK : "#fff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            boxShadow: "0 2px 8px rgba(30,19,36,.08)",
            border: c.g.startsWith("#") ? "1px solid rgba(30,19,36,.08)" : "none",
            transform: `translateY(${[0, -4, 4, -2][i]}px)`,
          }}
        >
          {c.t}
        </div>
      ))}
    </div>
  );
};

const CompactSheet = () => (
  <div
    className="absolute bg-white"
    style={{
      inset: "18px 30px 0",
      borderRadius: "8px 8px 0 0",
      padding: "14px 16px",
      boxShadow: "0 8px 20px -6px rgba(30,19,36,.18), 0 0 0 1px rgba(30,19,36,.05)",
      fontSize: 8,
      color: LG_INK,
      lineHeight: 1.4,
    }}
  >
    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }}>Night Ride</div>
    <div style={{ fontSize: 6.5, letterSpacing: ".14em", fontWeight: 700, color: LG_INK_MUTED, marginTop: 6 }}>
      MUSIC &amp; LYRICS BY
    </div>
    <div style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>Edan Dover</div>
    <div style={{ color: LG_INK_SOFT, fontSize: 7.5 }}>Universal · ASCAP · 50%</div>
    <div style={{ fontSize: 9, fontWeight: 700, marginTop: 4 }}>Victor Anton</div>
    <div style={{ color: LG_INK_SOFT, fontSize: 7.5 }}>AntonMusic · PRS · 50%</div>
    <div style={{ height: 1, background: "rgba(30,19,36,.1)", margin: "8px 0" }} />
    <div style={{ fontSize: 9, fontWeight: 700 }}>Verse 1</div>
    <div style={{ marginTop: 2, lineHeight: 1.45, fontSize: 7.5 }}>
      I became another stranger
      <br />
      No way that I could be forgiven
      <br />
      Oh what have I done
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// Row wrapper
// ══════════════════════════════════════════════════════════
const SpotlightRow = ({
  eyebrow,
  title,
  body,
  child,
  reverse,
  tint,
}: {
  eyebrow: string;
  title: string;
  body: string;
  child: (active: boolean) => ReactElement;
  reverse?: boolean;
  tint: string;
}) => {
  const [ref, inView] = useInView(0.25);
  return (
    <div
      ref={ref}
      className="grid items-center gap-10 py-[70px] md:grid-cols-2 md:gap-[72px]"
    >
      <div
        className={`relative flex justify-center ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: "-8% -4%",
            background: tint,
            filter: "blur(80px)",
            opacity: 0.55,
          }}
        />
        <div className="relative z-10 w-full max-w-[520px]">{child(inView)}</div>
      </div>
      <div className={`max-w-[440px] ${reverse ? "md:order-1" : "md:order-2"}`}>
        <div
          className="mb-3.5"
          style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: LG_PURPLE }}
        >
          {eyebrow}
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(30px, 3.2vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: "0 0 18px",
            color: LG_INK,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: LG_INK_SOFT, margin: 0 }}>{body}</p>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// The section
// ══════════════════════════════════════════════════════════
const Features = () => {
  const compactItems = [
    {
      eyebrow: "VOICE MEMOS",
      title: "Hum it. Keep it linked.",
      body: "Voice memos attach to the exact lyric line they belong to. Nothing gets lost between sessions.",
      preview: <CompactVoice />,
      tint: LG_CORAL,
    },
    {
      eyebrow: "CONCEPTS",
      title: "Capture half-formed ideas.",
      body: "Mood-colored concept cards for titles, themes, and hooks — without breaking the song you're writing.",
      preview: <CompactConcepts />,
      tint: LG_PURPLE,
    },
    {
      eyebrow: "LYRIC SHEETS",
      title: "Share with anyone, anywhere.",
      body: "Auto-formatted sheets with proper credits, PRO splits, and IPIs — export to PDF or a public URL.",
      preview: <CompactSheet />,
      tint: LG_AMBER,
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden" style={{ padding: "110px 0 90px" }}>
      <style>{`
        @keyframes lgCaret  { 50% { opacity: 0 } }
        @keyframes lgFadeUp { to { opacity: 1; transform: translateY(0) } }
        @keyframes lgFloaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes lgPing   { 0% { transform: scale(1); opacity: .7 } 100% { transform: scale(2); opacity: 0 } }
        @keyframes lgWavePulse { 0%,100% { transform: scaleY(.6); opacity: .5 } 50% { transform: scaleY(1); opacity: .9 } }
      `}</style>

      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          background: "rgba(127,98,196,.05)",
          filter: "blur(100px)",
        }}
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-5 text-center"
        >
          <div
            className="mb-5 inline-block rounded-full"
            style={{
              padding: "6px 14px",
              background: "rgba(127,98,196,.1)",
              color: LG_PURPLE,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".12em",
            }}
          >
            FEATURES
          </div>
          <h2
            className="font-display mx-auto"
            style={{
              fontWeight: 700,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 900,
              color: LG_INK,
            }}
          >
            Built for the flow of{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#6F50B8,#C48AE3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              professional sessions
            </span>
          </h2>
        </motion.div>

        <SpotlightRow
          eyebrow="WRITE LYRICS"
          title="An editor that feels like your favorite notebook — but smarter."
          body="Write the way you actually do: messy stanzas, a verse you'll come back to, a chorus on fire. Tap any word for rhymes, synonyms, or sounds-alikes — never break your flow to open another app."
          tint="rgba(111,168,60,.25)"
          child={(a) => <WriteLyricsSpotlight active={a} />}
        />
        <SpotlightRow
          reverse
          eyebrow="WISH WORKSHOP AI"
          title="Stuck on a line? Make a wish."
          body="Ask for a stronger hook, a moodier bridge, or one more rhyme that actually lands. You stay in the driver's seat — the AI just offers options, in your voice, never rewriting your song."
          tint="rgba(127,98,196,.3)"
          child={(a) => <WishWorkshopSpotlight active={a} />}
        />
        <SpotlightRow
          eyebrow="CO-WRITE IN REAL TIME"
          title="Every writer gets their own color."
          body="See who wrote what, whose idea spawned the chorus, whose voice memo inspired the bridge. Splits and credits stay unambiguous — because the session is the record."
          tint="rgba(232,102,60,.22)"
          child={(a) => <CowriteSpotlight active={a} />}
        />
        <SpotlightRow
          reverse
          eyebrow="RHYME · THESAURUS · SOUNDS-LIKE · ASSOCIATIONS"
          title="A complete lookup suite, in one sheet."
          body="Rhymes, thesaurus, sounds-like and associations — all in one bottom sheet. Jump between perfect, near, multi-syllabic and phrase rhymes without leaving the line you're on."
          tint="rgba(58,123,208,.22)"
          child={(a) => <RhymeSpotlight active={a} />}
        />

        {/* Compact cards — AND MORE */}
        <div className="mt-[60px]">
          <div className="mb-6 text-center">
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: LG_PURPLE }}>AND MORE</div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {compactItems.map((it) => (
              <div
                key={it.title}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#E5E4E8] bg-white"
                style={{ boxShadow: "0 2px 4px rgba(30,19,36,.03), 0 12px 24px -12px rgba(30,19,36,.08)" }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: 170,
                    background: `linear-gradient(160deg, ${it.tint}15 0%, ${it.tint}05 100%)`,
                    borderBottom: "1px solid rgba(30,19,36,.05)",
                  }}
                >
                  {it.preview}
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", color: LG_PURPLE, marginBottom: 10 }}>
                    {it.eyebrow}
                  </div>
                  <h4
                    className="font-display"
                    style={{ fontSize: 20, fontWeight: 700, color: LG_INK, margin: "0 0 10px", letterSpacing: "-0.015em", lineHeight: 1.2 }}
                  >
                    {it.title}
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: LG_INK_SOFT, margin: 0 }}>{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
