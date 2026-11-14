// Builds the "Words that rhyme with X" pages at lyricgenie.app/rhymes-with/{word}/ (SEO plan, 2026-11-14), from
// the live rhyme engine (public/rhymes, the one the app and the Rhyme Generator use). They replace
// rhymegold.com/r/{word}/: those, and lyricgenie.app/r/{word}/, become redirect stubs to the new pages.
//
//   node tools/rhymes/build-word-pages.mjs
//
// Writes public/rhymes-with/{word}/index.html, the hub public/rhymes-with/index.html, the stubs in public/r/,
// and public/sitemap-rhymes.xml. Static HTML (not React): a thousand prerendered pages would be too slow
// for react-snap. Rhymes are filtered (no proper nouns, abbreviations or crude words) and common words come
// first, so each page reads like a songwriter's list rather than a dictionary dump.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEngine } from "./engine-node.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const pub = path.join(root, "public");
const ORIGIN = "https://lyricgenie.app";
const TODAY = new Date().toISOString().slice(0, 10);

// ─── Word lists ────────────────────────────────────────────────────────────
const rankList = fs.readFileSync(path.join(here, "common-20k.txt"), "utf8").split("\n").map((w) => w.trim().toLowerCase()).filter(Boolean);
const RANK = new Map(rankList.map((w, i) => [w, i]));
const WEB2 = new Set(fs.existsSync("/usr/share/dict/words") ? fs.readFileSync("/usr/share/dict/words", "utf8").split("\n").filter((w) => w && w === w.toLowerCase()) : []);
const rank = (w) => RANK.get(w) ?? 50000;

// Kept off the pages: crude words and slurs (the tool itself still finds them).
const CRUDE = /^(fuck|fucks|fucked|fucking|fucker|cunt|cunts|slut|sluts|shit|shits|bitch|bitches|whore|whores|nigga|niggas|nigger|fag|fags|faggot|dyke|spic|chink|kike|tits|twat|wank|pussy|porn|porno|rape|raped|rapist|retard|retarded|cum|anal|anus|dick|dicks|cock|cocks|penis|vagina|sex|sexy|nude|nudes|horny|boob|boobs|butt|butts|ass|asses|jizz|dildo|gay|hoe|hoes|coon|homo|tranny)$/;
const crude = (s) => s.split(/\s+/).some((t) => CRUDE.test(t.replace(/[^a-z]/g, "")));

/** A word worth showing: a real lowercase word (not a name or an abbreviation), with a vowel. */
function goodWord(w) {
  if (crude(w)) return false;
  if (!/[aeiouy]/.test(w)) return false;
  if (w.includes(" ")) return true; // curated phrases
  if (w.includes("'")) return /^[a-z]+'[a-z]+$/.test(w) && rank(w) < 20000;
  if (!/^[a-z]+$/.test(w)) return false;
  if (w.length <= 2) return SHORT_OK.has(w);
  if (WEB2.has(w)) return true;
  // Inflections ("drugs", "comes") aren't in web2: allow common ones of 4+ letters.
  return w.length >= 4 && rank(w) < 10000;
}

const SHORT_OK = new Set(["of", "up", "us", "by", "my", "go", "no", "so", "me", "he", "we", "be", "do", "oh", "hi", "ok", "ah", "ow", "aw", "ya", "yo"]);
// Common on the web, rare in songs: shown, but after the words songs use.
const WEBBY = new Set("site sites website websites online offline copyright byte bytes lite mart carte hart wright meyer non john la results result newsletter newsletters sector sectors seller sellers members member identifier purifier enquire enquiry tyre tyres centre centres provider providers supplier suppliers advertiser advertisers director directors database software hardware download downloads upload email emails login click clicks server servers browser user users admin inc ltd corp llc dept info faq pdf url html blog blogs forum forums".split(" "));
const score = (w) => rank(w) + (WEBBY.has(w) ? 30000 : 0);
const byCommon = (a, b) => score(a) - score(b) || a.length - b.length || a.localeCompare(b);

// The pages: the old RhymeGold set (so every old URL lands on its own page) plus words songs actually end lines on.
const oldWords = fs.existsSync(path.join(pub, "r")) ? fs.readdirSync(path.join(pub, "r")).filter((d) => /^[a-z]+$/.test(d)) : [];
const SONG_WORDS = `love heart night fire rain pain eyes time life mind soul dream dreams world light sky sun moon stars star
home road away day way stay go know show slow low glow alone gone strong long song wrong along
tonight right fight bright sight high fly cry die lie why try goodbye sky alive inside outside side ride
forever never ever together whatever again friend end blue true you through new do two
heart apart start dark spark part free me be see sea believe leave breathe need feel real heal deal
fall call all small wall tall run sun fun done one gun young begun burn turn learn return yearn
kiss miss this lips touch much rush blood flood crazy baby maybe lady lately
door more floor before shore war tore sure your four cold gold old hold told soul whole control
fear tear near here year clear dear disappear heaven seven forgiven given living
water tears river ocean wave waves storm cloud clouds thunder lightning wind winter summer
dance chance chase face place space grace race embrace taste waste hand stand understand land
broken open hope rope cope smoke shadow sorrow tomorrow follow hollow pillow
angel danger stranger lonely only fire desire higher liar money honey funny city pretty
boy girl man woman king queen gold diamond diamonds street streets car drive alive
music sing ring bring thing wing king nothing something everything
feeling healing ceiling running hiding waiting crying dying trying flying
yesterday today away okay remember december september someone somebody nobody everybody
hurt worth earth birth
dead head said bed red bread instead ahead
kind find mind blind behind wild child
lost cost frost
sweet heat beat street feet meet defeat complete
falling calling crawling
hello shine mine line fine wine divine sign design
sound around ground down town crown drown found
light night white
die`;
const extraWords = [...new Set(SONG_WORDS.split(/\s+/).filter(Boolean))];

// ─── Rhymes ────────────────────────────────────────────────────────────────
// Single words come from the full CMU dictionary as the app's syllable counter has it (the web app's
// public/cmudict/syllables.json: word -> [syllables, min, max, rhymeKey], rhymeKey = the sounds from the
// last stressed vowel to the end). Two words rhyme perfectly when their rhymeKeys match (love: glove, dove,
// above); a near rhyme keeps the same vowels with different consonants (love: up, much, enough). Phrases come
// from the rhyme engine's own dictionary (public/rhymes), the one the app and the Rhyme Generator use.
const SYL_JSON = process.env.SYLLABLES_JSON ?? path.join(process.env.HOME, "Sites/LYRICGENIE-APP-live/public/cmudict/syllables.json");
const SYL = JSON.parse(fs.readFileSync(SYL_JSON, "utf8"));
const VOWEL = /^(AA|AE|AH|AO|AW|AY|EH|ER|EY|IH|IY|OW|OY|UH|UW)$/;
const vowelsOf = (key) => key.split(" ").filter((p) => VOWEL.test(p)).join(" ");
// The engine's readable spelling of sounds (engine.js PHONEME_TO_LETTERS): "AH V" -> "-uhv", "AY ER" -> "-eye-er".
const LETTERS = { AA: "ah", AE: "a", AH: "uh", AO: "aw", AW: "ow", AY: "eye", B: "b", CH: "ch", D: "d", DH: "th", EH: "e", ER: "er", EY: "ay", F: "f", G: "g", HH: "h", IH: "i", IY: "ee", JH: "j", K: "k", L: "l", M: "m", N: "n", NG: "ng", OW: "oh", OY: "oy", P: "p", R: "r", S: "s", SH: "sh", T: "t", TH: "th", UH: "oo", UW: "oo", V: "v", W: "w", Y: "y", Z: "z", ZH: "zh" };
const soundLabel = (key) => key.split(" ").map((p) => (VOWEL.test(p) ? "-" : "") + (LETTERS[p] ?? p.toLowerCase())).join("");
const WEAK = new Set(["the", "a", "an", "and", "to", "than", "as"]);

const byKey = new Map();
const byVowels = new Map();
const push = (m, k, v) => (m.has(k) ? m.get(k).push(v) : m.set(k, [v]));
for (const [w, e] of Object.entries(SYL)) {
  const key = e[3];
  if (!key || !goodWord(w) || WEAK.has(w)) continue;
  push(byKey, key, w);
  push(byVowels, vowelsOf(key), w);
}

/** A phrase's rhymeKey from the engine's phonemes ("F AO1 L | IH1 N | L AH1 V" -> "AH V"). */
function phraseKey(ph) {
  const p = ph.split(/\s+/).filter((x) => x !== "|");
  let i = p.findLastIndex((x) => /1$/.test(x));
  if (i < 0) i = p.findLastIndex((x) => /2$/.test(x));
  if (i < 0) i = p.findLastIndex((x) => /\d$/.test(x));
  return i < 0 ? "" : p.slice(i).map((x) => x.replace(/\d$/, "")).join(" ");
}
const FILLER = new Set("the a an and or but of to in on at by for from with is was were be been am are it it's its this that these those i i'm me my you you're your he him his she her we us our they them their so not no yes just very too right real all".split(" "));
const eng = loadEngine();
const phrasesByKey = new Map();
for (const [k, v] of Object.entries(eng.dict)) {
  if (!k.includes(" ")) continue;
  const phrase = k.toLowerCase();
  if (crude(phrase) || !/^[a-z' ]+$/.test(phrase)) continue;
  // Two-word phrases that are just a filler word plus the rhyme ("you right", "the light") add nothing.
  const parts = phrase.split(" ");
  if (parts.length === 2 && FILLER.has(parts[0])) continue;
  for (const ph of Array.isArray(v) ? v : [v]) push(phrasesByKey, phraseKey(ph), phrase);
}
const phraseScore = (p) => p.split(" ").length * 100000 + p.split(" ").reduce((t, w) => t + Math.min(rank(w), 20000), 0);

/** The rhymes for a word, grouped the way a songwriter reads them. */
function rhymesFor(word) {
  const e = SYL[word];
  if (!e || !e[3]) return null;
  const key = e[3];
  const syl = e[0];
  const notSelf = (w) => w !== word && !w.endsWith(" " + word);
  const perfectAll = [...new Set(byKey.get(key) ?? [])].filter(notSelf).sort(byCommon);
  const short = perfectAll.filter((w) => SYL[w][0] === 1);
  const long = perfectAll.filter((w) => SYL[w][0] > 1);
  const oneSyllable = syl === 1;
  const perfect = (oneSyllable ? short : perfectAll).slice(0, 150);
  const longer = oneSyllable ? long.slice(0, 100) : [];
  const phrases = [...new Set(phrasesByKey.get(key) ?? [])].filter(notSelf).sort((a, b) => phraseScore(a) - phraseScore(b)).slice(0, 60);
  const near = [...new Set(byVowels.get(vowelsOf(key)) ?? [])].filter((w) => notSelf(w) && SYL[w][3] !== key).sort(byCommon).slice(0, 80);
  return { word, syl, oneSyllable, sound: soundLabel(key), perfect, longer, phrases, near };
}

// ─── HTML ──────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const css = fs.readFileSync(path.join(here, "word-page.css"), "utf8") + fs.readFileSync(path.join(here, "word-page-extra.css"), "utf8");
const header = fs.readFileSync(path.join(here, "header.html"), "utf8")
  .replace(/<header class="topbar">/, '<header class="topbar">')
  .replace(/<\/a>\s*<\/header>/, `</a>
    <nav class="topbar-nav word-nav">
      <a href="/rhyme-generator/" class="nav-link">Rhyme Generator</a>
      <a href="/syllable-counter/" class="nav-link">Syllable Counter</a>
      <a href="https://app.lyricgenie.app/signup" data-try-lg class="get-app-btn">Try Lyric Genie</a>
    </nav>
  </header>`);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const listText = (a) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);

function head({ title, description, canonical, jsonLd, gaTitle }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${ORIGIN}/images/og-rhymegold.png" />
  <meta property="og:site_name" content="Lyric Genie" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="apple-touch-icon" href="${ORIGIN}/images/app-icon.jpg" />
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
  <script>(function(){try{var t=localStorage.getItem('lg-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(_){}})();</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XK9NRLWK3K"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XK9NRLWK3K',{anonymize_ip:true,page_title:${JSON.stringify(gaTitle)}});</script>
  <link rel="stylesheet" href="/rhymes/_shared/rhymes.css?v=1" />
  <style>
${css}
  </style>
</head>`;
}

const tail = `  <footer class="page-footer">
    <a href="/rhyme-generator/">Rhyme Generator</a> · <a href="/rhymes-with/">Rhymes A–Z</a> · <a href="/syllable-counter/">Syllable Counter</a> · <a href="/">Lyric Genie, the songwriting app</a><br>
    Rhymes by RhymeGold, the rhyme engine in Lyric Genie. Pronunciations from the <a href="https://github.com/cmusphinx/cmudict" rel="noopener">CMU Pronouncing Dictionary</a>.
  </footer>
<script>/* Try Lyric Genie: the web app on computers, the App Store on iPhone and iPad. */(function(){var ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);if(!ios)return;document.querySelectorAll("a[data-try-lg]").forEach(function(a){a.href="https://apps.apple.com/us/app/lyric-genie/id6739787614";});})();</script>
</body>
</html>
`;

function wordPage(d, pages, neighbours) {
  const W = d.word;
  const link = (w) => (pages.has(w) ? `<a href="/rhymes-with/${w}/" class="rhyme-link has-page">${esc(w)}</a>` : `<a href="/rhyme-generator/?q=${encodeURIComponent(w).replace(/%20/g, "+")}" class="rhyme-link">${esc(w)}</a>`);
  const grid = (list) => `<div class="rhyme-grid">\n        ${list.map(link).join("\n        ")}\n      </div>`;
  const total = d.perfect.length + d.longer.length + d.phrases.length + d.near.length;
  const top = d.perfect.slice(0, 6);
  const topLonger = d.longer.slice(0, 4);
  const best = top.length ? top : d.near.slice(0, 6);

  const title = `Words That Rhyme With ${cap(W)}: ${total}+ Rhymes for Songs | Lyric Genie`;
  let description = `${total}+ words and phrases that rhyme with ${W}${best.length ? `, like ${listText(best.slice(0, 3))}` : ""}. Perfect, multi-syllable and near rhymes for songwriters, free.`;
  if (description.length > 160) description = `${total}+ words and phrases that rhyme with ${W}: perfect, multi-syllable and near rhymes for songwriters, free.`;

  const faqs = [];
  if (best.length) faqs.push([`What rhymes with ${W}?`, `${cap(listText(best.slice(0, 6)))} ${top.length ? "rhyme" : "are close (near) rhymes"} with ${W}.${topLonger.length ? ` Longer rhymes include ${listText(topLonger)}.` : ""}${d.phrases.length ? ` Phrases that end on the same sound include ${listText(d.phrases.slice(0, 3).map((p) => `“${p}”`))}.` : ""}`]);
  faqs.push([`How many syllables are in ${W}?`, `${cap(W)} has ${d.syl} syllable${d.syl === 1 ? "" : "s"}. The rhyme falls on the sound “${d.sound}”.`]);
  if (d.near.length) faqs.push([`What are near rhymes for ${W}?`, `Near (slant) rhymes share the vowel sound but not every consonant: ${listText(d.near.slice(0, 6))}. Songs use them all the time.`]);

  const canonical = `${ORIGIN}/rhymes-with/${W}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Lyric Genie", item: `${ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Rhymes A–Z", item: `${ORIGIN}/rhymes-with/` },
        { "@type": "ListItem", position: 3, name: `Rhymes with ${W}`, item: canonical },
      ] },
      { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  const sections = [];
  if (d.perfect.length)
    sections.push(`    <section class="rhymes-section">
      <h2>${d.oneSyllable ? "One-syllable rhymes" : "Perfect rhymes"} for “${esc(W)}”</h2>
      <p class="section-intro">Words that end on the exact sound of “${esc(W)}” (<code>${esc(d.sound)}</code>), from the stressed vowel on. Most common first.</p>
      ${grid(d.perfect)}
    </section>`);
  if (d.longer.length)
    sections.push(`    <section class="rhymes-section">
      <h2>Longer words that rhyme with “${esc(W)}”</h2>
      <p class="section-intro">Perfect rhymes of two or more syllables, for longer line endings.</p>
      ${grid(d.longer)}
    </section>`);
  if (d.phrases.length)
    sections.push(`    <section class="rhymes-section">
      <h2>Phrases that rhyme with “${esc(W)}”</h2>
      <p class="section-intro">Multi-word endings, for a whole line ending or a set-up rhyme.</p>
      ${grid(d.phrases)}
    </section>`);
  if (d.near.length)
    sections.push(`    <section class="rhymes-section">
      <h2>Near rhymes for “${esc(W)}”</h2>
      <p class="section-intro">Slant rhymes: the same vowel sound${d.syl > 1 ? "s" : ""} with different consonants. Less exact, and often more natural in a song.</p>
      ${grid(d.near)}
    </section>`);

  const intro = best.length
    ? `The best rhymes for “${esc(W)}” are <strong>${esc(listText(best.slice(0, 4)))}</strong>${topLonger.length ? `, with longer ones like ${esc(listText(topLonger.slice(0, 3)))}` : ""}. Below: ${d.perfect.length ? `${d.perfect.length} ${d.oneSyllable ? "one-syllable" : "perfect"} rhymes, ` : ""}${d.longer.length ? `${d.longer.length} longer words, ` : ""}${d.phrases.length ? `${d.phrases.length} phrases ` : ""}${d.near.length ? `and ${d.near.length} near rhymes` : ""}, most common first.`
    : `Here are ${total} words and phrases that rhyme with “${esc(W)}”.`;

  return `${head({ title, description, canonical, jsonLd, gaTitle: `Rhymes with ${W}` })}
<body>
  ${header}

  <main class="word-page">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Lyric Genie</a> › <a href="/rhymes-with/">Rhymes A–Z</a> › ${esc(W)}</nav>
    <section class="word-hero">
      <form class="nav-search" action="/rhyme-generator/" method="get" role="search">
        <input type="search" name="q" placeholder="Rhymes for another word or phrase…" aria-label="Find rhymes for another word" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" />
        <button type="submit" aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
      </form>
      <h1><span class="eyebrow">Words that rhyme with</span> ${esc(W)}</h1>
      <p class="phonetic"><span class="syll">rhymes on ${esc(d.sound)}</span><span class="meta">${d.syl} syllable${d.syl === 1 ? "" : "s"}</span></p>
      <p class="summary">${intro}</p>
      <div class="cta-row">
        <a href="/rhyme-generator/?q=${encodeURIComponent(W)}" class="cta">Open “${esc(W)}” in the Rhyme Generator →</a>
        <a href="https://app.lyricgenie.app/signup" data-try-lg class="cta secondary">Write with these in Lyric Genie</a>
      </div>
    </section>

${sections.join("\n")}

    <section class="rhymes-section faq">
      <h2>Questions about rhymes for “${esc(W)}”</h2>
      <dl>
${faqs.map(([q, a]) => `        <dt>${esc(q)}</dt>\n        <dd>${esc(a)}</dd>`).join("\n")}
      </dl>
    </section>

    <section class="rhymes-section write-with">
      <h2>Find rhymes while you write</h2>
      <p>In <a href="/">Lyric Genie, the songwriting app</a>, select any word or phrase in your lyrics to see its rhymes beside the line, with the syllable count of every line as you write. Free on the web and iPhone.</p>
    </section>

    <section class="rhymes-section related">
      <h2>More rhymes</h2>
      <p class="related-links">${neighbours.map((w) => `<a href="/rhymes-with/${w}/">Rhymes with ${esc(w)}</a>`).join(" · ")}</p>
    </section>
  </main>
${tail}`;
}

function hubPage(words) {
  const letters = [...new Set(words.map((w) => w[0]))].sort();
  const title = "Rhymes A–Z: Words That Rhyme, for Songwriters | Lyric Genie";
  const description = `Rhymes for ${words.length} common words, A to Z: perfect, multi-syllable and near rhymes for songwriters. Or find rhymes for any word in the free Rhyme Generator.`;
  const canonical = `${ORIGIN}/rhymes-with/`;
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Rhymes A–Z", url: canonical, isPartOf: { "@type": "WebSite", name: "Lyric Genie", url: `${ORIGIN}/` } };
  return `${head({ title, description, canonical, jsonLd, gaTitle: "Rhymes A–Z" })}
<body>
  ${header}
  <main class="word-page">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Lyric Genie</a> › Rhymes A–Z</nav>
    <section class="word-hero">
      <h1>Rhymes A–Z</h1>
      <p class="summary">Rhymes for ${words.length} words songs use most, from <a href="/rhymes-with/love/">love</a> and <a href="/rhymes-with/heart/">heart</a> to <a href="/rhymes-with/forever/">forever</a>. For any other word or phrase, use the <a href="/rhyme-generator/">free Rhyme Generator</a>.</p>
      <p class="letters">${letters.map((l) => `<a href="#${l}">${l.toUpperCase()}</a>`).join(" ")}</p>
    </section>
${letters
  .map(
    (l) => `    <section class="rhymes-section" id="${l}">
      <h2>${l.toUpperCase()}</h2>
      <div class="rhyme-grid">
        ${words.filter((w) => w[0] === l).map((w) => `<a href="/rhymes-with/${w}/" class="rhyme-link">${esc(w)}</a>`).join("\n        ")}
      </div>
    </section>`,
  )
  .join("\n")}
  </main>
${tail}`;
}

/** A moved page: tells search engines and browsers where it went (GitHub Pages can't send a 301). */
function stub(to) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" />
<title>Moved</title>
<link rel="canonical" href="${to}" />
<meta name="robots" content="noindex, follow" />
<meta http-equiv="refresh" content="0; url=${to}" />
<script>location.replace(${JSON.stringify(to)});</script>
</head><body><p>This page moved to <a href="${to}">${to}</a>.</p></body></html>
`;
}

// ─── Build ─────────────────────────────────────────────────────────────────
const candidates = [...new Set([...oldWords, ...extraWords])].sort();
const data = new Map();
for (const w of candidates) {
  const d = rhymesFor(w);
  if (!d) continue;
  const total = d.perfect.length + d.longer.length + d.phrases.length + d.near.length;
  if (d.perfect.length + d.longer.length + d.phrases.length < 3 || total < 12) continue; // too thin for a page of its own
  data.set(w, d);
}
const pages = new Set(data.keys());
const sorted = [...pages].sort();

const outDir = path.join(pub, "rhymes-with");
fs.rmSync(outDir, { recursive: true, force: true });
for (const [i, w] of sorted.entries()) {
  const d = data.get(w);
  // Related: rhymes with a page of their own first, then alphabetical neighbours, 12 in all.
  const rel = [...d.perfect, ...d.longer, ...d.near].filter((x) => pages.has(x) && x !== w);
  const around = [...sorted.slice(Math.max(0, i - 4), i), ...sorted.slice(i + 1, i + 5)];
  const neighbours = [...new Set([...rel, ...around])].slice(0, 12);
  fs.mkdirSync(path.join(outDir, w), { recursive: true });
  fs.writeFileSync(path.join(outDir, w, "index.html"), wordPage(d, pages, neighbours));
}
fs.writeFileSync(path.join(outDir, "index.html"), hubPage(sorted));

// Old pages → the new ones (words without a page of their own → the Rhyme Generator).
for (const w of oldWords) {
  const to = pages.has(w) ? `${ORIGIN}/rhymes-with/${w}/` : `${ORIGIN}/rhyme-generator/?q=${encodeURIComponent(w)}`;
  fs.writeFileSync(path.join(pub, "r", w, "index.html"), stub(to));
}
fs.writeFileSync(path.join(here, "redirect-map.json"), JSON.stringify(Object.fromEntries(oldWords.map((w) => [w, pages.has(w) ? `/rhymes-with/${w}/` : `/rhyme-generator/?q=${encodeURIComponent(w)}`])), null, 1));

// rhymegold.com (Cloudflare Pages, serving only that domain): a 301 for every old page.
const thin = oldWords.filter((w) => !pages.has(w)).sort();
fs.writeFileSync(
  path.join(pub, "_redirects"),
  [
    "# Cloudflare Pages routing rules. This Pages project serves only rhymegold.com (lyricgenie.app is on GitHub",
    "# Pages). Since 2026-11-14 RhymeGold lives on lyricgenie.app: every rhymegold.com page 301s to its new home",
    "# (the Rhyme Generator, and the word pages at /rhymes-with/). First match wins.",
    "# Generated by tools/rhymes/build-word-pages.mjs: edit there, not here.",
    `/                   ${ORIGIN}/rhyme-generator/  301`,
    `/index.html         ${ORIGIN}/rhyme-generator/  301`,
    `/rhymes             ${ORIGIN}/rhyme-generator/  301`,
    `/rhymes/            ${ORIGIN}/rhyme-generator/  301`,
    `/rhymes/index.html  ${ORIGIN}/rhyme-generator/  301`,
    `/sitemap.xml        ${ORIGIN}/sitemap.xml  301`,
    "# Old word pages too thin for a page of their own: the Rhyme Generator, looked up.",
    ...thin.flatMap((w) => [`/r/${w}/  ${ORIGIN}/rhyme-generator/?q=${encodeURIComponent(w)}  301`, `/r/${w}  ${ORIGIN}/rhyme-generator/?q=${encodeURIComponent(w)}  301`]),
    "# The rest: the matching word page.",
    `/r/:word/  ${ORIGIN}/rhymes-with/:word/  301`,
    `/r/:word   ${ORIGIN}/rhymes-with/:word/  301`,
    `/r/        ${ORIGIN}/rhymes-with/  301`,
    `/r         ${ORIGIN}/rhymes-with/  301`,
    "",
  ].join("\n"),
);

const urls = [`${ORIGIN}/rhymes-with/`, ...sorted.map((w) => `${ORIGIN}/rhymes-with/${w}/`)];
fs.writeFileSync(
  path.join(pub, "sitemap-rhymes.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join("\n")}\n</urlset>\n`,
);
console.log(`pages ${pages.size} (old ${oldWords.length}, without a page ${oldWords.filter((w) => !pages.has(w)).length}, new ${sorted.filter((w) => !oldWords.includes(w)).length})`);
