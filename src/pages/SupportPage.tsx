import { ArrowUpRight, AudioWaveform, BookOpen, Mail, Smartphone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eyebrow, Glow, Head, Reveal, StudioPage } from "@/components/studio/Studio";
import { APP_STORE, WEB_APP } from "@/lib/links";

/**
 * /support (/help redirects here): support email, the docs, downloads and a fuller FAQ. Answers follow the docs (lyricgenie-docs
 * content/faq.md) and the apps as they are on 2026-10-11; the limits match Pricing / PricingPage.
 */

const SUPPORT = "support@lyricgenie.app";

const GROUPS: { title: string; faqs: [string, string][] }[] = [
  {
    title: "Getting started",
    faqs: [
      ["Is there a web version?", "Yes. The web app is at app.lyricgenie.app and runs in any computer's browser. There's also a native app for iPhone and iPad. Almost everything is on both: Freestyle and transcriptions are iPhone only for now, and Sessions are web only for now."],
      ["Do my songs sync between devices?", "Yes. Sign in with the same Google or Apple account everywhere and your songs, recordings, concepts and projects are on every device, live."],
      ["How do I sign in?", "With Google or Apple. There's no separate password to remember."],
      ["I signed in with Google before and now with Apple. Where are my songs?", "In the other account. Google and Apple sign-ins are separate accounts, even with the same email behind them. Sign out and back in with the other button, and nothing is lost."],
      ["Which browsers work?", "Any modern browser for writing. Recording and importing audio need Chrome, Edge or Safari; Firefox can't record or import audio yet."],
    ],
  },
  {
    title: "Plans and billing",
    faqs: [
      ["Do I need Pro?", "Not to write, record or co-write. Free gives you unlimited songs, real-time co-writing, 15 AI calls and 50 quick AI calls to try every tool, 30 rhyme lookups a day and 60 minutes of recording. Pro raises the limits and adds Wish Workshop, in-line suggestions, smart dictionaries and syllable control."],
      ["Is there a free trial?", "Yes. Pro starts with 14 days free, on the web or iPhone. One subscription covers the web, iPhone and iPad."],
      ["Can my co-writer use the free plan?", "Yes. Co-writing is free on both sides, and a free co-writer can do everything on a shared song that a Pro one can."],
      ["How do I cancel?", "Cancel where you subscribed. Subscribed on the web: open Settings in the web app and choose Cancel subscription. Subscribed in the iPhone app: cancel in the App Store's subscriptions on any Apple device. Either way, Pro stays on until the end of the period you paid for."],
      ["I have a promo code. Where does it go?", "On the web, open the upgrade dialog and choose “Have a code?”."],
    ],
  },
  {
    title: "Co-writing",
    faqs: [
      ["Do co-writers need to download anything?", "No. Send an invite link and they can write with you in their browser, or in the app if they have it. It's free for them."],
      ["How many people can write on one song?", "As many as you like. Every writer gets their own tab, so nobody types over anybody."],
      ["What's the Master tab?", "The version you've agreed on. Everyone builds it by sending their best sections to it from their own tab."],
      ["What are Sessions?", "Coming soon: video and voice inside the song, with your DAW streaming in full quality through the Lyric Genie Session plugin. Starting a session will need Pro; any co-writer can join a session a Pro writer is in, free."],
    ],
  },
  {
    title: "Your lyrics and AI",
    faqs: [
      ["Does it write songs for me?", "No. Every AI tool works on what you've already written: a line to rewrite, a word to rhyme, a song with a mood and theme. Your words stay yours."],
      ["Is my lyric data used to train AI?", "No. We never train on your lyrics and never share them. Your songs are private by default."],
      ["Can I get my lyrics out?", "Yes. A lyric sheet publishes a song as a web page with your writer credits, at a link you can send to anyone. You can also share it as plain text."],
      ["Is a lyric sheet public?", "Anyone with the link can open it, but it isn't listed anywhere. It's frozen at the moment you made it, and you can delete it to take the link down."],
      ["Can I import lyrics I wrote somewhere else?", "Yes. Paste them in or import a file. Section headers like [Chorus] or Chorus are recognised on the way in."],
    ],
  },
];

function SupportHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36">
      <Glow className="left-1/2 top-[-260px] h-[620px] w-[1000px] -translate-x-1/2" strength={30} />
      <div className="container relative z-10 mx-auto px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Support</Eyebrow>
          <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-tight text-white md:text-[60px]">
            How can we <span className="text-[#F6ECC9]">help?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">Email us, read the docs, or find a quick answer below.</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 md:grid-cols-2">
          <Reveal>
            <a href={`mailto:${SUPPORT}`} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#1B1B1B] p-6 transition-colors hover:border-white/25">
              <Mail className="size-6 text-[#AB8EE2]" />
              <p className="mt-4 text-lg font-semibold text-white">Email support</p>
              <p className="mt-1 text-[15px] text-white/60">Questions, feedback or something not working. Tell us your device and app version.</p>
              <p className="mt-4 font-semibold text-[#F6ECC9]">{SUPPORT}</p>
            </a>
          </Reveal>
          <Reveal delay={0.06}>
            <a href="/docs/" target="_blank" rel="noopener" className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#1B1B1B] p-6 transition-colors hover:border-white/25">
              <BookOpen className="size-6 text-[#AB8EE2]" />
              <p className="mt-4 text-lg font-semibold text-white">Read the docs</p>
              <p className="mt-1 text-[15px] text-white/60">Every feature on the web and iPhone, step by step, with troubleshooting.</p>
              <p className="mt-4 inline-flex items-center gap-1 font-semibold text-[#F6ECC9]">
                Open the docs <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DownloadRow({ icon, title, text, children }: { icon: React.ReactNode; title: React.ReactNode; text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#AB8EE2]">{icon}</span>
      <div className="flex-1">
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-sm text-white/55">{text}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

const pill = "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold";

function Downloads() {
  return (
    <section id="downloads" className="scroll-mt-20 bg-[#170E1C] py-20">
      <div className="container mx-auto px-6">
        <Head center eyebrow="Downloads" title="Get the apps." />
        <Reveal className="mx-auto mt-10 max-w-3xl divide-y divide-white/[0.07] rounded-2xl border border-white/10 bg-[#1B1B1B]">
          <DownloadRow icon={<Smartphone className="size-5" />} title="Lyric Genie for iPhone & iPad" text="The native app, from the App Store. iOS 17 or later.">
            <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className={`${pill} bg-[#F6ECC9] text-[#6F50B8] hover:bg-[#FBF2D6]`}>
              App Store
            </a>
          </DownloadRow>
          <DownloadRow
            icon={<AudioWaveform className="size-5" />}
            title={
              <span className="inline-flex items-center gap-2">
                Lyric Genie Session plugin
                <span className="rounded-full bg-[#30D158]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#30D158]">Coming soon</span>
              </span>
            }
            text="Streams your DAW into a session. Works in Logic, Ableton, Cubase, FL Studio, Studio One, Reaper and more. Mac: macOS 11 (Big Sur) or later, Apple silicon or Intel (VST3 and AU). Windows: Windows 10 or later, 64-bit (VST3)."
          >
            {/* Sessions aren't open yet (testers get the plugin inside the web app). When they are, link the
                installers here: ${WEB_APP}/downloads/LyricGenieSession-<version>-mac.pkg and -windows.exe. */}
            <span className={`${pill} border border-white/10 text-white/40`}>Coming soon</span>
          </DownloadRow>
        </Reveal>
        <p className="mt-4 text-center text-sm text-white/45">
          No download needed on a computer:{" "}
          <a href={WEB_APP} className="font-semibold text-white/70 hover:text-white">
            the web app
          </a>{" "}
          runs in your browser.
        </p>
      </div>
    </section>
  );
}

function FullFAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <Head center eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 space-y-12">
          {GROUPS.map((g) => (
            <Reveal key={g.title}>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#AB8EE2]">{g.title}</p>
              <Accordion type="single" collapsible className="mt-2">
                {g.faqs.map(([q, a]) => (
                  <AccordionItem key={q} value={q} className="border-white/10">
                    <AccordionTrigger className="text-left text-[16px] font-semibold text-white hover:no-underline">{q}</AccordionTrigger>
                    <AccordionContent className="text-[15px] leading-relaxed text-white/65">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 text-center text-white/60">
          Still stuck?{" "}
          <a href={`mailto:${SUPPORT}`} className="font-semibold text-[#F6ECC9] hover:underline">
            Email {SUPPORT}
          </a>
        </p>
      </div>
    </section>
  );
}

const SupportPage = () => (
  <StudioPage current="/support/" title="Support — Lyric Genie" description="Get help with Lyric Genie: email support, read the docs, download the apps and the Session plugin, and answers to common questions.">
    <SupportHero />
    <Downloads />
    <FullFAQ />
  </StudioPage>
);

export default SupportPage;
