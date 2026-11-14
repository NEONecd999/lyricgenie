#!/usr/bin/env python3
"""Builds public/rhyme-generator/index.html (lyricgenie.app/rhyme-generator/, SEO plan 2026-11-14) from the
RhymeGold shell (public/rhymegold/index.html): same tool, with a lyricgenie.app title, description and
canonical, a real H1, and a guide + FAQ below the tool. Re-run after changing the shell:

    python3 tools/rhymes/build-rhyme-generator.py
"""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
src = open(os.path.join(ROOT, "public/rhymegold/index.html")).read()
URL = "https://lyricgenie.app/rhyme-generator/"
TITLE = "Rhyme Generator for Songwriters — Free, With Phrases | Lyric Genie"
DESC = "Free rhyme generator for songwriters: perfect, multi-syllable, slant and phrase rhymes for any word or phrase, built on how words sound. No sign-up."

def sub(pattern, repl, s, count=1, flags=re.S):
    out, n = re.subn(pattern, repl, s, count=count, flags=flags)
    assert n, pattern
    return out

h = src
h = sub(r'<meta name="description" content="[^"]*" />', f'<meta name="description" content="{DESC}" />', h)
h = sub(r"<title>.*?</title>", f"<title>{TITLE}</title>", h)
h = sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{URL}" />', h)
h = sub(r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{URL}" />', h)
h = h.replace('content="RhymeGold — Free Rhyme Tool for Songwriters"', 'content="Rhyme Generator for Songwriters — Lyric Genie"')
h = h.replace("https://rhymegold.com/images/og-rhymegold.png", "https://lyricgenie.app/images/og-rhymegold.png")
h = h.replace('<meta property="og:site_name" content="RhymeGold" />', '<meta property="og:site_name" content="Lyric Genie" />')
h = h.replace("page_title: 'RhymeGold — Home'", "page_title: 'Rhyme Generator'")

FAQS = [
    ("Is the rhyme generator free?", "Yes. It's free with no sign-up and no limit. It runs in your browser."),
    ("What's the difference between a perfect and a slant rhyme?", "A perfect rhyme matches every sound from the stressed vowel on (love, glove). A slant rhyme keeps the vowel but changes a consonant (love, up). Turn on Include Slant Rhymes to see them."),
    ("Does it find multi-syllable rhymes?", "Yes. Type a word or a whole phrase and it matches every stressed syllable, so it finds multi-syllable and phrase rhymes like 'by the way' for 'fly away', not just words that end the same way."),
    ("Where do the rhymes come from?", "Pronunciations from the CMU Pronouncing Dictionary, plus phrases and idioms, including phrases counted from thousands of songs (counts only, no lyrics kept). It's RhymeGold, the rhyme engine in Lyric Genie."),
    ("Can I see rhymes while I write?", "Yes. In Lyric Genie, the songwriting app, select a word or phrase in your lyrics and its rhymes open beside the line. Free on the web and iPhone."),
]
faq_ld = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQS]})
app_ld = json.dumps({"@context": "https://schema.org", "@type": "WebApplication", "name": "Rhyme Generator", "url": URL, "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "publisher": {"@id": "https://lyricgenie.app/#organization"}})

STYLE = """
    /* lyricgenie.app/rhyme-generator: the tool fills the first screen, the guide sits below it. */
    html, body { height: auto; }
    body { overflow-x: hidden; overflow-y: auto; min-height: 100dvh; }
    main { flex: none; height: calc(100vh - 60px); height: calc(100dvh - 60px); }
    .tool-title { text-align: center; margin: 18px 0 0; font-family: var(--font-display); font-size: 14px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); }
    .tool-guide { width: 100%; max-width: 760px; margin: 0 auto; padding: 56px 24px 24px; border-top: 1px solid var(--rule); line-height: 1.65; white-space: normal; }
    .tool-guide h2 { font-family: var(--font-display); font-size: 26px; letter-spacing: -0.01em; margin: 40px 0 12px; color: var(--ink); }
    .tool-guide h2:first-child { margin-top: 0; }
    .tool-guide p, .tool-guide li, .tool-guide dd { color: var(--ink-muted); }
    .tool-guide a { color: var(--accent); }
    .tool-guide strong { color: var(--ink); }
    .tool-guide dt { font-weight: 600; color: var(--ink); margin: 18px 0 6px; }
    .tool-guide dd { margin: 0; }
    .tool-guide .popular a { display: inline-block; margin: 0 10px 8px 0; }
    .topbar-nav a.nav-link.tool-link { margin-right: 4px; }
"""
h = sub(r"(  </style>\n</head>)", STYLE + r"\1", h)
h = sub(r"(</head>)", f'  <script type="application/ld+json">{faq_ld}</script>\n  <script type="application/ld+json">{app_ld}</script>\n\\1', h)

# Nav: the other free tools instead of "Learn more".
h = sub(r'<a href="https://lyricgenie.app" class="nav-link">Learn more</a>', '<a href="/rhymes-with/" class="nav-link tool-link">Rhymes A–Z</a>\n      <a href="/syllable-counter/" class="nav-link tool-link">Syllable Counter</a>', h)
# A real H1 above the input (the input is the headline word).
h = sub(r'(<section class="headline-search">)', r'<h1 class="tool-title">Rhyme Generator</h1>\n    \1', h)

popular = ["love", "heart", "night", "fire", "time", "life", "light", "mind", "soul", "home", "rain", "pain", "forever", "together", "away", "tonight", "dream", "world", "free", "alone"]
popular = [w for w in popular if os.path.exists(os.path.join(ROOT, "public/rhymes-with", w, "index.html"))]
popular_links = " ".join(f'<a href="/rhymes-with/{w}/">Rhymes with {w}</a>' for w in popular)
faq_html = "".join(f"      <dt>{q}</dt>\n      <dd>{a}</dd>\n" for q, a in FAQS)
guide = f"""
  <section class="tool-guide" aria-labelledby="guide-title">
    <h2 id="guide-title">A rhyme generator built for songwriters</h2>
    <p>Type a word or a whole phrase and the rhymes appear as you type, grouped by how they rhyme. It matches how words <strong>sound</strong>, not how they're spelled, and it reads every stressed syllable, so it finds the multi-syllable and phrase rhymes that make a line stick, not just words that end the same way.</p>
    <h2>How to use it</h2>
    <ul>
      <li><strong>Type a phrase, not just a word.</strong> "Fly away" finds "by the way", "find a way" and "I'm okay".</li>
      <li><strong>Tap a syllable</strong> under the word to change which one carries the rhyme.</li>
      <li><strong>Include Slant Rhymes</strong> for near rhymes: the same vowel with a different consonant. Songs use them as much as perfect rhymes.</li>
      <li><strong>Count the syllables</strong> of the line once the rhyme is right, with the free <a href="/syllable-counter/">syllable counter</a>.</li>
    </ul>
    <h2>Popular rhymes</h2>
    <p class="popular">{popular_links} <a href="/rhymes-with/">All words A–Z →</a></p>
    <h2>Rhymes while you write</h2>
    <p>The same rhyme engine is built into <a href="/">Lyric Genie, the songwriting app</a>: select any word or phrase in your lyrics and its rhymes open beside the line, with rhyme colors across the verse and the syllable count of every line. Free on the web and iPhone. <a href="/rhyme-engine/">How the rhyme engine works</a>.</p>
    <h2>Questions</h2>
    <dl>
{faq_html}    </dl>
  </section>
"""
h = sub(r"(  </main>\n)", r"\1" + guide.replace("\\", "\\\\"), h)
h = h.replace("<a href=\"https://lyricgenie.app\">lyricgenie.app</a>\n  </footer>", "<a href=\"https://lyricgenie.app\">lyricgenie.app</a> · <a href=\"/rhymes-with/\">Rhymes A–Z</a> · <a href=\"/syllable-counter/\">Syllable Counter</a>\n  </footer>")

out = os.path.join(ROOT, "public/rhyme-generator")
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "index.html"), "w").write(h)
print("wrote", len(h), "bytes;", len(DESC), "char description")
