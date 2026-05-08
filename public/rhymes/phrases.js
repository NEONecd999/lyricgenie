// Hand-curated multi-word phrases AND modern slang single-words missing from
// CMU. Anything in this file gets merged into window.DICTIONARY by
// dictionary.js, so phrases here are searchable AND show up as rhyme results
// for other queries.
//
// The "|" marker between words is a SYLLABLE BOUNDARY hint — see engine.js
// for the rationale (keeps each word's final consonants attached to its own
// last syllable rather than leaking into the next word's onset).
//
// FUNCTION_WORDS list and the phrase() helper live in engine.js so the
// query layer can apply the same destressing rules when building phrase
// phonemes dynamically (for arbitrary phrases not in this curated set).
//
// A production version would replace this hand-curated set with phrases mined
// from a song-lyric corpus (line-ending n-grams, frequency-filtered, POS-checked).

// Wrapped in an IIFE so the `phrase` binding is module-scoped — prevents
// "Identifier 'phrase' has already been declared" if this file is loaded
// twice (e.g. dev hot-reload) and isolates any internal failures.
(function () {
const phrase = window.RhymeEngine.phrase;

window.PHRASES = {

  // ─── Common idioms & "of-the" patterns ───
  "OUT OF THE QUESTION":   phrase("OUT OF THE QUESTION",   "AW1 T | AH1 V | DH AH0 | K W EH1 S CH AH0 N"),
  "HOLD ALL THE CARDS":    phrase("HOLD ALL THE CARDS",    "HH OW1 L D | AO1 L | DH AH0 | K AA1 R D Z"),
  "KNOW WHO YOU ARE":      phrase("KNOW WHO YOU ARE",      "N OW1 | HH UW1 | Y UW1 | AA1 R"),
  "WHO I AM":              phrase("WHO I AM",              "HH UW1 | AY1 | AE1 M"),
  "KEEP IT TOGETHER":      phrase("KEEP IT TOGETHER",      "K IY1 P | IH1 T | T AH0 G EH1 DH ER0"),
  "GET YOUR ACT TOGETHER": phrase("GET YOUR ACT TOGETHER", "G EH1 T | Y AO1 R | AE1 K T | T AH0 G EH1 DH ER0"),
  "REIGN OF TERROR":       phrase("REIGN OF TERROR",       "R EY1 N | AH1 V | T EH1 R ER0"),
  "TURN OF EVENTS":        phrase("TURN OF EVENTS",        "T ER1 N | AH1 V | IH0 V EH1 N T S"),
  "WORD OF MOUTH":         phrase("WORD OF MOUTH",         "W ER1 D | AH1 V | M AW1 TH"),
  "WORK OF ART":           phrase("WORK OF ART",           "W ER1 K | AH1 V | AA1 R T"),
  "MATTER OF TIME":        phrase("MATTER OF TIME",        "M AE1 T ER0 | AH1 V | T AY1 M"),
  "STATE OF MIND":         phrase("STATE OF MIND",         "S T EY1 T | AH1 V | M AY1 N D"),
  "PEACE OF MIND":         phrase("PEACE OF MIND",         "P IY1 S | AH1 V | M AY1 N D"),
  "OUT OF MIND":           phrase("OUT OF MIND",           "AW1 T | AH1 V | M AY1 N D"),
  "FRAME OF MIND":         phrase("FRAME OF MIND",         "F R EY1 M | AH1 V | M AY1 N D"),
  "AS A MATTER OF FACT":   phrase("AS A MATTER OF FACT",   "AE1 Z | AH1 | M AE1 T ER0 | AH1 V | F AE1 K T"),
  "BACK TO BACK":          phrase("BACK TO BACK",          "B AE1 K | T UW1 | B AE1 K"),
  "BLOOD PRESSURE":        phrase("BLOOD PRESSURE",        "B L AH1 D | P R EH1 SH ER0"),
  "HIGH PRESSURE":         phrase("HIGH PRESSURE",         "HH AY1 | P R EH1 SH ER0"),
  "MADE TO MEASURE":       phrase("MADE TO MEASURE",       "M EY1 D | T UW1 | M EH1 ZH ER0"),
  "SECRET AGENT":          phrase("SECRET AGENT",          "S IY1 K R AH0 T | EY1 JH AH0 N T"),
  "SECRET AGENDA":         phrase("SECRET AGENDA",         "S IY1 K R AH0 T | AH0 JH EH1 N D AH0"),
  "HIDDEN AGENDA":         phrase("HIDDEN AGENDA",         "HH IH1 D AH0 N | AH0 JH EH1 N D AH0"),
  "OWN AGENDA":            phrase("OWN AGENDA",            "OW1 N | AH0 JH EH1 N D AH0"),
  "RUDE AWAKENING":        phrase("RUDE AWAKENING",        "R UW1 D | AH0 W EY1 K AH0 N IH0 NG"),
  "BRAND NEW":             phrase("BRAND NEW",             "B R AE1 N D | N UW1"),
  "NIGHT AND DAY":         phrase("NIGHT AND DAY",         "N AY1 T | AH1 N D | D EY1"),
  "SECRET WEAPON":         phrase("SECRET WEAPON",         "S IY1 K R AH0 T | W EH1 P AH0 N"),
  "BURNING QUESTION":      phrase("BURNING QUESTION",      "B ER1 N IH0 NG | K W EH1 S CH AH0 N"),
  "BREAK A SWEAT":         phrase("BREAK A SWEAT",         "B R EY1 K | AH1 | S W EH1 T"),
  "BREAK MY HEART":        phrase("BREAK MY HEART",        "B R EY1 K | M AY1 | HH AA1 R T"),
  "MAKE IT RAIN":          phrase("MAKE IT RAIN",          "M EY1 K | IH1 T | R EY1 N"),

  // ─── Modern everyday phrases ───
  "HOT TAKE":              phrase("HOT TAKE",              "HH AA1 T | T EY1 K"),
  "DEEP DIVE":             phrase("DEEP DIVE",             "D IY1 P | D AY1 V"),
  "SIDE HUSTLE":           phrase("SIDE HUSTLE",           "S AY1 D | HH AH1 S AH0 L"),
  "SELF CARE":             phrase("SELF CARE",             "S EH1 L F | K EH1 R"),
  "RED FLAG":              phrase("RED FLAG",              "R EH1 D | F L AE1 G"),
  "GREEN FLAG":            phrase("GREEN FLAG",            "G R IY1 N | F L AE1 G"),
  "LOVE BOMB":             phrase("LOVE BOMB",             "L AH1 V | B AA1 M"),
  "SOFT LAUNCH":           phrase("SOFT LAUNCH",           "S AO1 F T | L AO1 N CH"),
  "HARD LAUNCH":           phrase("HARD LAUNCH",           "HH AA1 R D | L AO1 N CH"),
  "SOFT LIFE":             phrase("SOFT LIFE",             "S AO1 F T | L AY1 F"),
  "SUGAR DADDY":           phrase("SUGAR DADDY",           "SH UH1 G ER0 | D AE1 D IY0"),
  "SUGAR HIGH":            phrase("SUGAR HIGH",            "SH UH1 G ER0 | HH AY1"),
  "PLOT TWIST":            phrase("PLOT TWIST",            "P L AA1 T | T W IH1 S T"),
  "GUT FEELING":           phrase("GUT FEELING",           "G AH1 T | F IY1 L IH0 NG"),
  "SECOND CHANCE":         phrase("SECOND CHANCE",         "S EH1 K AH0 N D | CH AE1 N S"),
  "FRESH START":           phrase("FRESH START",           "F R EH1 SH | S T AA1 R T"),
  "CLEAN SLATE":           phrase("CLEAN SLATE",           "K L IY1 N | S L EY1 T"),
  "GAME CHANGER":          phrase("GAME CHANGER",          "G EY1 M | CH EY1 N JH ER0"),
  "DEAL BREAKER":          phrase("DEAL BREAKER",          "D IY1 L | B R EY1 K ER0"),
  "TEAM PLAYER":           phrase("TEAM PLAYER",           "T IY1 M | P L EY1 ER0"),
  "BIG DEAL":              phrase("BIG DEAL",              "B IH1 G | D IY1 L"),
  "BIG DREAM":             phrase("BIG DREAM",             "B IH1 G | D R IY1 M"),
  "BIG MOOD":              phrase("BIG MOOD",              "B IH1 G | M UW1 D"),
  "FAR GONE":              phrase("FAR GONE",              "F AA1 R | G AO1 N"),
  "WIDE OPEN":             phrase("WIDE OPEN",             "W AY1 D | OW1 P AH0 N"),
  "WIDE AWAKE":            phrase("WIDE AWAKE",            "W AY1 D | AH0 W EY1 K"),
  "FAST ASLEEP":           phrase("FAST ASLEEP",           "F AE1 S T | AH0 S L IY1 P"),
  "DEAD TIRED":            phrase("DEAD TIRED",            "D EH1 D | T AY1 ER0 D"),
  "DEAD SET":              phrase("DEAD SET",              "D EH1 D | S EH1 T"),
  "STONE COLD":            phrase("STONE COLD",            "S T OW1 N | K OW1 L D"),
  "ICE COLD":              phrase("ICE COLD",              "AY1 S | K OW1 L D"),
  "RED HOT":               phrase("RED HOT",               "R EH1 D | HH AA1 T"),
  "WHITE HOT":             phrase("WHITE HOT",             "W AY1 T | HH AA1 T"),

  // ─── Movement / direction phrases ───
  "RUN AWAY":              phrase("RUN AWAY",              "R AH1 N | AH0 W EY1"),
  "RUN AROUND":            phrase("RUN AROUND",            "R AH1 N | ER0 AW1 N D"),
  "WALK AWAY":             phrase("WALK AWAY",             "W AO1 K | AH0 W EY1"),
  "WALK AROUND":           phrase("WALK AROUND",           "W AO1 K | ER0 AW1 N D"),
  "FALL APART":            phrase("FALL APART",            "F AO1 L | AH0 P AA1 R T"),
  "FALL IN LOVE":          phrase("FALL IN LOVE",          "F AO1 L | IH1 N | L AH1 V"),
  "FALL FROM GRACE":       phrase("FALL FROM GRACE",       "F AO1 L | F R AH1 M | G R EY1 S"),
  "MOVE ON":               phrase("MOVE ON",               "M UW1 V | AA1 N"),
  "MOVING ON":             phrase("MOVING ON",             "M UW1 V IH0 NG | AA1 N"),
  "LET GO":                phrase("LET GO",                "L EH1 T | G OW1"),
  "LET DOWN":              phrase("LET DOWN",              "L EH1 T | D AW1 N"),
  "HOLD ON":               phrase("HOLD ON",               "HH OW1 L D | AA1 N"),
  "HOLD UP":               phrase("HOLD UP",               "HH OW1 L D | AH1 P"),
  "SHUT DOWN":             phrase("SHUT DOWN",             "SH AH1 T | D AW1 N"),
  "SHUT UP":               phrase("SHUT UP",               "SH AH1 T | AH1 P"),
  "CALM DOWN":             phrase("CALM DOWN",             "K AA1 M | D AW1 N"),
  "BURN OUT":              phrase("BURN OUT",              "B ER1 N | AW1 T"),
  "BURN BRIGHT":           phrase("BURN BRIGHT",           "B ER1 N | B R AY1 T"),
  "BURN OUT BRIGHT":       phrase("BURN OUT BRIGHT",       "B ER1 N | AW1 T | B R AY1 T"),
  "BLOW UP":               phrase("BLOW UP",               "B L OW1 | AH1 P"),
  "GO OFF":                phrase("GO OFF",                "G OW1 | AO1 F"),
  "TURN AROUND":           phrase("TURN AROUND",           "T ER1 N | ER0 AW1 N D"),
  "TURN UP":               phrase("TURN UP",               "T ER1 N | AH1 P"),
  "TURN DOWN":             phrase("TURN DOWN",             "T ER1 N | D AW1 N"),
  "RISE UP":               phrase("RISE UP",               "R AY1 Z | AH1 P"),
  "BREAK FREE":            phrase("BREAK FREE",            "B R EY1 K | F R IY1"),
  "BREAK DOWN":            phrase("BREAK DOWN",            "B R EY1 K | D AW1 N"),
  "BROKE DOWN":            phrase("BROKE DOWN",            "B R OW1 K | D AW1 N"),
  "RUNNING LATE":          phrase("RUNNING LATE",          "R AH1 N IH0 NG | L EY1 T"),
  "RUNNING OUT":           phrase("RUNNING OUT",           "R AH1 N IH0 NG | AW1 T"),
  "RUNNING WILD":          phrase("RUNNING WILD",          "R AH1 N IH0 NG | W AY1 L D"),
  "TAKE A TRIP":           phrase("TAKE A TRIP",           "T EY1 K | AH1 | T R IH1 P"),
  "TAKE OFF":              phrase("TAKE OFF",              "T EY1 K | AO1 F"),
  "TAKE OVER":             phrase("TAKE OVER",             "T EY1 K | OW1 V ER0"),
  "TAKE A CHANCE":         phrase("TAKE A CHANCE",         "T EY1 K | AH1 | CH AE1 N S"),
  "ON MY WAY":             phrase("ON MY WAY",             "AA1 N | M AY1 | W EY1"),
  "ON MY MIND":            phrase("ON MY MIND",            "AA1 N | M AY1 | M AY1 N D"),
  "IN MY HEAD":            phrase("IN MY HEAD",            "IH1 N | M AY1 | HH EH1 D"),
  "IN MY HEART":           phrase("IN MY HEART",           "IH1 N | M AY1 | HH AA1 R T"),
  "IN MY DREAMS":          phrase("IN MY DREAMS",          "IH1 N | M AY1 | D R IY1 M Z"),
  "IN MY ZONE":            phrase("IN MY ZONE",            "IH1 N | M AY1 | Z OW1 N"),
  "IN THE DARK":           phrase("IN THE DARK",           "IH1 N | DH AH0 | D AA1 R K"),
  "IN THE LIGHT":          phrase("IN THE LIGHT",          "IH1 N | DH AH0 | L AY1 T"),
  "ALL NIGHT LONG":        phrase("ALL NIGHT LONG",        "AO1 L | N AY1 T | L AO1 NG"),
  "ALL DAY LONG":          phrase("ALL DAY LONG",          "AO1 L | D EY1 | L AO1 NG"),

  // ─── Music / lyric-coded line-endings ───
  "TILL THE END":          phrase("TILL THE END",          "T IH1 L | DH AH0 | EH1 N D"),
  "AT THE END":            phrase("AT THE END",            "AE1 T | DH AH0 | EH1 N D"),
  "TO THE END":            phrase("TO THE END",            "T UW1 | DH AH0 | EH1 N D"),
  "ON THE EDGE":           phrase("ON THE EDGE",           "AA1 N | DH AH0 | EH1 JH"),
  "OVER THE EDGE":         phrase("OVER THE EDGE",         "OW1 V ER0 | DH AH0 | EH1 JH"),
  "ABOVE THE CLOUDS":      phrase("ABOVE THE CLOUDS",      "AH0 B AH1 V | DH AH0 | K L AW1 D Z"),
  "UNDER THE STARS":       phrase("UNDER THE STARS",       "AH1 N D ER0 | DH AH0 | S T AA1 R Z"),
  "UNDER THE MOON":        phrase("UNDER THE MOON",        "AH1 N D ER0 | DH AH0 | M UW1 N"),
  "UNDER MY SKIN":         phrase("UNDER MY SKIN",         "AH1 N D ER0 | M AY1 | S K IH1 N"),
  "UNDER PRESSURE":        phrase("UNDER PRESSURE",        "AH1 N D ER0 | P R EH1 SH ER0"),
  "OUT OF TIME":           phrase("OUT OF TIME",           "AW1 T | AH1 V | T AY1 M"),
  "OUT OF LOVE":           phrase("OUT OF LOVE",           "AW1 T | AH1 V | L AH1 V"),
  "OUT OF REACH":          phrase("OUT OF REACH",          "AW1 T | AH1 V | R IY1 CH"),
  "OUT OF LINE":           phrase("OUT OF LINE",           "AW1 T | AH1 V | L AY1 N"),
  "OUT OF SIGHT":          phrase("OUT OF SIGHT",          "AW1 T | AH1 V | S AY1 T"),
  "OUT OF CONTROL":        phrase("OUT OF CONTROL",        "AW1 T | AH1 V | K AH0 N T R OW1 L"),
  "BACK IN TIME":          phrase("BACK IN TIME",          "B AE1 K | IH1 N | T AY1 M"),
  "BACK ON TRACK":         phrase("BACK ON TRACK",         "B AE1 K | AA1 N | T R AE1 K"),
  "BACK TO LIFE":          phrase("BACK TO LIFE",          "B AE1 K | T UW1 | L AY1 F"),
  "BACK TO YOU":           phrase("BACK TO YOU",           "B AE1 K | T UW1 | Y UW1"),
  "BACK TO ME":            phrase("BACK TO ME",            "B AE1 K | T UW1 | M IY1"),
  "ONE MORE TIME":         phrase("ONE MORE TIME",         "W AH1 N | M AO1 R | T AY1 M"),
  "ONE MORE NIGHT":        phrase("ONE MORE NIGHT",        "W AH1 N | M AO1 R | N AY1 T"),
  "ONE MORE CHANCE":       phrase("ONE MORE CHANCE",       "W AH1 N | M AO1 R | CH AE1 N S"),
  "ONE LAST TIME":         phrase("ONE LAST TIME",         "W AH1 N | L AE1 S T | T AY1 M"),
  "ONE OF A KIND":         phrase("ONE OF A KIND",         "W AH1 N | AH1 V | AH1 | K AY1 N D"),
  "BY MY SIDE":            phrase("BY MY SIDE",            "B AY1 | M AY1 | S AY1 D"),
  "ON THE LINE":           phrase("ON THE LINE",           "AA1 N | DH AH0 | L AY1 N"),
  "ON THE RUN":            phrase("ON THE RUN",            "AA1 N | DH AH0 | R AH1 N"),
  "ON FIRE":               phrase("ON FIRE",               "AA1 N | F AY1 ER0"),
  "ON ICE":                phrase("ON ICE",                "AA1 N | AY1 S"),
  "ON CLOUD NINE":         phrase("ON CLOUD NINE",         "AA1 N | K L AW1 D | N AY1 N"),
  "DOWN BAD":              phrase("DOWN BAD",              "D AW1 N | B AE1 D"),
  "DOWN LOW":              phrase("DOWN LOW",              "D AW1 N | L OW1"),
  "DOWN TO EARTH":         phrase("DOWN TO EARTH",         "D AW1 N | T UW1 | ER1 TH"),
  "RIGHT ON TIME":         phrase("RIGHT ON TIME",         "R AY1 T | AA1 N | T AY1 M"),
  "ALL THE WAY":           phrase("ALL THE WAY",           "AO1 L | DH AH0 | W EY1"),
  "ALL ALONE":             phrase("ALL ALONE",             "AO1 L | AH0 L OW1 N"),
  "ALL NIGHT":             phrase("ALL NIGHT",             "AO1 L | N AY1 T"),

  // ─── Gen-Z slang phrases ───
  "NO CAP":                phrase("NO CAP",                "N OW1 | K AE1 P"),
  "BIG CAP":               phrase("BIG CAP",               "B IH1 G | K AE1 P"),
  "MAIN CHARACTER":        phrase("MAIN CHARACTER",        "M EY1 N | K EH1 R IH0 K T ER0"),
  "MAIN CHARACTER ENERGY": phrase("MAIN CHARACTER ENERGY", "M EY1 N | K EH1 R IH0 K T ER0 | EH1 N ER0 JH IY0"),
  "RENT FREE":             phrase("RENT FREE",             "R EH1 N T | F R IY1"),
  "VIBE CHECK":            phrase("VIBE CHECK",            "V AY1 B | CH EH1 K"),
  "SAY LESS":              phrase("SAY LESS",              "S EY1 | L EH1 S"),
  "HITS DIFFERENT":        phrase("HITS DIFFERENT",        "HH IH1 T S | D IH1 F R AH0 N T"),
  "DEAD ASS":              phrase("DEAD ASS",              "D EH1 D | AE1 S"),
  "FOR REAL":              phrase("FOR REAL",              "F AO1 R | R IY1 L"),
  "FOR SURE":              phrase("FOR SURE",              "F AO1 R | SH UH1 R"),
  "ON GOD":                phrase("ON GOD",                "AA1 N | G AA1 D"),
  "ON SIGHT":              phrase("ON SIGHT",              "AA1 N | S AY1 T"),
  "STRAIGHT UP":           phrase("STRAIGHT UP",           "S T R EY1 T | AH1 P"),
  "TRUE THAT":             phrase("TRUE THAT",             "T R UW1 | DH AE1 T"),
  "GHOSTED ME":            phrase("GHOSTED ME",            "G OW1 S T IH0 D | M IY1"),
  "LEFT ON READ":          phrase("LEFT ON READ",          "L EH1 F T | AA1 N | R EH1 D"),
  "THE ICK":               phrase("THE ICK",               "DH AH0 | IH1 K"),
  "BIG MAD":               phrase("BIG MAD",               "B IH1 G | M AE1 D"),
  "LOW KEY":               phrase("LOW KEY",               "L OW1 | K IY1"),
  "HIGH KEY":              phrase("HIGH KEY",              "HH AY1 | K IY1"),
  "BIG YIKES":             phrase("BIG YIKES",             "B IH1 G | Y AY1 K S"),
  "HARD PASS":             phrase("HARD PASS",             "HH AA1 R D | P AE1 S"),
  "SOFT BOY":              phrase("SOFT BOY",              "S AO1 F T | B OY1"),
  "SOFT GIRL":             phrase("SOFT GIRL",             "S AO1 F T | G ER1 L"),
  "BAD VIBES":             phrase("BAD VIBES",             "B AE1 D | V AY1 B Z"),
  "GOOD VIBES":            phrase("GOOD VIBES",            "G UH1 D | V AY1 B Z"),
  "PURE VIBES":            phrase("PURE VIBES",            "P Y UH1 R | V AY1 B Z"),
  "TOXIC TRAIT":           phrase("TOXIC TRAIT",           "T AA1 K S IH0 K | T R EY1 T"),
  "FINAL BOSS":            phrase("FINAL BOSS",            "F AY1 N AH0 L | B AO1 S"),
  "GOLDEN HOUR":           phrase("GOLDEN HOUR",           "G OW1 L D AH0 N | AW1 ER0"),
  "POWER MOVE":            phrase("POWER MOVE",            "P AW1 ER0 | M UW1 V"),
  "BOSS MOVE":             phrase("BOSS MOVE",             "B AO1 S | M UW1 V"),
  "SLOW BURN":             phrase("SLOW BURN",             "S L OW1 | B ER1 N"),
  "SLOW CLAP":             phrase("SLOW CLAP",             "S L OW1 | K L AE1 P"),
  "GLOW UP":               phrase("GLOW UP",               "G L OW1 | AH1 P"),
  "LEVEL UP":              phrase("LEVEL UP",              "L EH1 V AH0 L | AH1 P"),
  "LIVING RENT FREE":      phrase("LIVING RENT FREE",      "L IH1 V IH0 NG | R EH1 N T | F R IY1"),
  "SAVAGE MODE":           phrase("SAVAGE MODE",           "S AE1 V AH0 JH | M OW1 D"),
  "GOD MODE":              phrase("GOD MODE",              "G AA1 D | M OW1 D"),
  "BEAST MODE":            phrase("BEAST MODE",            "B IY1 S T | M OW1 D"),
  "CHEAT CODE":            phrase("CHEAT CODE",            "CH IY1 T | K OW1 D"),
  "BACK BURNER":           phrase("BACK BURNER",           "B AE1 K | B ER1 N ER0"),
  "PAGE TURNER":           phrase("PAGE TURNER",           "P EY1 JH | T ER1 N ER0"),
  "EYE CONTACT":           phrase("EYE CONTACT",           "AY1 | K AA1 N T AE2 K T"),
  "REAL ONE":              phrase("REAL ONE",              "R IY1 L | W AH1 N"),
  "REAL TALK":             phrase("REAL TALK",             "R IY1 L | T AO1 K"),
  "BIG TALK":              phrase("BIG TALK",              "B IH1 G | T AO1 K"),
  "SMALL TALK":            phrase("SMALL TALK",            "S M AO1 L | T AO1 K"),
  "PILLOW TALK":           phrase("PILLOW TALK",           "P IH1 L OW0 | T AO1 K"),
  "DEAD WEIGHT":           phrase("DEAD WEIGHT",           "D EH1 D | W EY1 T"),
  "DEAD END":              phrase("DEAD END",              "D EH1 D | EH1 N D"),
  "OLD SOUL":              phrase("OLD SOUL",              "OW1 L D | S OW1 L"),
  "OLD FLAME":             phrase("OLD FLAME",             "OW1 L D | F L EY1 M"),
  "NEW WAVE":              phrase("NEW WAVE",              "N UW1 | W EY1 V"),
  "TIDAL WAVE":            phrase("TIDAL WAVE",            "T AY1 D AH0 L | W EY1 V"),
  "HEAT WAVE":             phrase("HEAT WAVE",             "HH IY1 T | W EY1 V"),
  "BRAIN WAVE":            phrase("BRAIN WAVE",            "B R EY1 N | W EY1 V"),

  // ─── Compound words missing from CMU ───
  // CMU treats some common compound nouns as separate words. We add the
  // closed-form compounds with primary stress on the first syllable +
  // secondary on the second (matching the CMU pattern for "spotlight",
  // "moonlight", "daylight", etc.).
  "NIGHTLIGHT":            "N AY1 T L AY2 T",

  // ─── CMU pronunciation overrides ───
  // CMU lists "mic" as M IH1 K (rhymes with "Mick"), but in songwriter
  // / pop usage "mic" is short for "microphone" and pronounced M AY1 K
  // (rhymes with "Mike" / "like" / "bike"). Override here so phrases
  // like "drop the mic" match -ike rhymes correctly.
  "MIC":                   "M AY1 K",
  "MICS":                  "M AY1 K S",

  // ─── Standalone modern slang single-words missing from CMU ───
  // (CMU was last updated ~2014, so post-2015 coinages need manual entries.)
  "RIZZ":                  "R IH1 Z",
  "DELULU":                "D AH0 L UW1 L UW0",
  "BUSSIN":                "B AH1 S IH0 N",
  "PERIODT":               "P IH1 R IY0 AH0 D T",
  "BESTIE":                "B EH1 S T IY0",
  "BESTIES":               "B EH1 S T IY0 Z",
  "SIMP":                  "S IH1 M P",
  "SIMPING":               "S IH1 M P IH0 NG",
  "SIMPED":                "S IH1 M P T",
  "THICC":                 "TH IH1 K",
  "FINSTA":                "F IH1 N S T AH0",
  "STAN":                  "S T AE1 N",
  "STANNED":               "S T AE1 N D",
  "STANNING":              "S T AE1 N IH0 NG",
  "YEET":                  "Y IY1 T",
  "YEETED":                "Y IY1 T IH0 D",
  "GHOSTING":              "G OW1 S T IH0 NG",
  "FLEX":                  "F L EH1 K S",  // already in CMU but adding for safety
  "FLEXING":               "F L EH1 K S IH0 NG",
  "FLEXED":                "F L EH1 K S T",
  "SLAY":                  "S L EY1",
  "SLAYED":                "S L EY1 D",
  "SLAYING":               "S L EY1 IH0 NG",
  "SHIP":                  "SH IH1 P",   // verb sense (in CMU as noun)
  "SHIPPED":               "SH IH1 P T",
  "SHIPPING":              "SH IH1 P IH0 NG",
  "VIBE":                  "V AY1 B",
  "VIBES":                 "V AY1 B Z",
  "VIBED":                 "V AY1 B D",
  "VIBING":                "V AY1 B IH0 NG",
  "BAE":                   "B EY1",
  "FAM":                   "F AE1 M",
  "TBH":                   "T IY1 B IY1 EY1 CH",  // initialism — questionable as a rhyme target but let users find it
  "ASF":                   "EY1 EH1 S EH1 F",
  "OG":                    "OW1 JH IY1",
  "GOAT":                  "G OW1 T",  // already in CMU
  "AESTHETIC":             "EH0 S TH EH1 T IH0 K",  // in CMU but ensuring correct phonemes

  // ─── Common initialisms — pronounced as spelled-out letters ───
  // CMU often has these mapped to the full expansion (e.g. "fyi" → "for your
  // information") or treats them inconsistently. Hand-spell them here so the
  // correct letter sequence wins. dictionary.js merges PHRASES last so these
  // override CMU.
  // Letter sounds: A=EY1, B=B IY1, C=S IY1, D=D IY1, E=IY1, F=EH1 F,
  // G=JH IY1, H=EY1 CH, I=AY1, J=JH EY1, K=K EY1, L=EH1 L, M=EH1 M,
  // N=EH1 N, O=OW1, P=P IY1, Q=K Y UW1, R=AA1 R, S=EH1 S, T=T IY1,
  // U=Y UW1, V=V IY1, W=D AH1 B AH0 L Y UW0, X=EH1 K S, Y=W AY1, Z=Z IY1
  "FYI":                   "EH1 F | W AY1 | AY1",
  "AKA":                   "EY1 | K EY1 | EY1",
  "BRB":                   "B IY1 | AA1 R | B IY1",
  "BTW":                   "B IY1 | T IY1 | D AH1 B AH0 L Y UW0",
  "IDK":                   "AY1 | D IY1 | K EY1",
  "IDC":                   "AY1 | D IY1 | S IY1",
  "IMO":                   "AY1 | EH1 M | OW1",
  "IMHO":                  "AY1 | EH1 M | EY1 CH | OW1",
  "OMG":                   "OW1 | EH1 M | JH IY1",
  "SMH":                   "EH1 S | EH1 M | EY1 CH",
  "IRL":                   "AY1 | AA1 R | EH1 L",
  "TLDR":                  "T IY1 | EH1 L | D IY1 | AA1 R",
  "WTF":                   "D AH1 B AH0 L Y UW0 | T IY1 | EH1 F",
  "DM":                    "D IY1 | EH1 M",
  "DMS":                   "D IY1 | EH1 M Z",
  "AF":                    "EY1 | EH1 F",
  "POV":                   "P IY1 | OW1 | V IY1",
  "GOAT'D":                "G OW1 T IH0 D",
  "NPC":                   "EH1 N | P IY1 | S IY1",

  // ─── More letter-by-letter acronyms ───
  // Each capital letter pronounced as its English name (S = "ess", M =
  // "em", B = "bee", etc.). Word boundaries between letters so the
  // syllabifier treats each as its own anchor candidate.
  "SMS":                   "EH1 S | EH1 M | EH1 S",
  "BFF":                   "B IY1 | EH1 F | EH1 F",
  "BTC":                   "B IY1 | T IY1 | S IY1",
  "LMK":                   "EH1 L | EH1 M | K EY1",
  "NDA":                   "EH1 N | D IY1 | EY1",
  "PDA":                   "P IY1 | D IY1 | EY1",

  // ─── Modern cultural / brand terms ───
  // Pronunciations match how songwriters actually say these words —
  // FaceTime as the verb, AirPods as a compound noun, Bitcoin as one
  // word with primary stress on the first syllable, etc.
  "FACETIME":              "F EY1 S T AY2 M",
  "FACETIMING":            "F EY1 S T AY2 M IH0 NG",
  "FACETIMED":             "F EY1 S T AY2 M D",
  "AIRPODS":               "EH1 R P AA2 D Z",
  "AIRPOD":                "EH1 R P AA2 D",
  "VENMO":                 "V EH1 N M OW0",
  "VENMOED":               "V EH1 N M OW0 D",
  "BITCOIN":               "B IH1 T K OY2 N",
  "BITCOINS":              "B IH1 T K OY2 N Z",
  "SNAPCHAT":              "S N AE1 P CH AE2 T",
  "SNAPCHATTING":          "S N AE1 P CH AE2 T IH0 NG",
  "INSTA":                 "IH1 N S T AH0",
  "LYFT":                  "L IH1 F T",
  "CASHAPP":               "K AE1 SH AE2 P",
  "GHOSTED":               "G OW1 S T IH0 D",
  "CRINGE":                "K R IH1 N JH",
  "CRINGED":               "K R IH1 N JH D",
  "CRINGEY":               "K R IH1 N JH IY0",
  "CRINGY":                "K R IH1 N JH IY0",

  // ─── Modern slang single-words ───
  // Generation-specific informal vocabulary missing from CMU.
  "HELLA":                 "HH EH1 L AH0",
  "FINNA":                 "F IH1 N AH0",
  "LOWKEY":                "L OW1 K IY2",
  "HIGHKEY":               "HH AY1 K IY2",
  "GUCCI":                 "G UW1 CH IY0",
  "LIT":                   "L IH1 T",          // already in CMU but reinforce
  "SUS":                   "S AH1 S",
  "PERIOD":                "P IH1 R IY0 AH0 D",  // already in CMU; "period" used as exclamation in lyrics
  "DEADASS":               "D EH1 D AE2 S",
  "CLOUT":                 "K L AW1 T",         // already in CMU but reinforce
  "EMOJI":                 "IH0 M OW1 JH IY0",
  "SELFIE":                "S EH1 L F IY2",     // already in CMU but reinforce
  "HASHTAG":               "HH AE1 SH T AE2 G", // already in CMU but reinforce
  "SIRI":                  "S IH1 R IY0",       // already in CMU but reinforce
  "ANDROID":               "AE1 N D R OY2 D",   // already in CMU but reinforce
  "UBERED":                "Y UW1 B ER0 D",
  "UBERING":               "Y UW1 B ER0 IH0 NG",

  // Letter-spelling acronyms not yet covered. LMAO and STFU and OMW are
  // sometimes pronounced as letters in lyrics (or improvised words).
  "LMAO":                  "EH1 L | EH1 M | EY1 | OW1",
  "STFU":                  "EH1 S | T IY1 | EH1 F | Y UW1",
  "OMW":                   "OW1 | EH1 M | D AH1 B AH0 L Y UW0",

  // Multi-word slang phrases common in 2020s lyrics. ("DEAD ASS" and
  // "VIBE CHECK" already live higher up in this file with the same
  // pronunciation — not duplicating here.)
  "DEAD TO ME":            phrase("DEAD TO ME",            "D EH1 D | T UW1 | M IY1"),
  "CLOUT CHASING":         phrase("CLOUT CHASING",         "K L AW1 T | CH EY1 S IH0 NG"),
  "CLOUT CHASER":          phrase("CLOUT CHASER",          "K L AW1 T | CH EY1 S ER0"),
  "MAIN CHARACTER":        phrase("MAIN CHARACTER",        "M EY1 N | K EH1 R IH0 K T ER0"),
  "IT GIRL":               phrase("IT GIRL",               "IH1 T | G ER1 L"),
  "IT BOY":                phrase("IT BOY",                "IH1 T | B OY1"),
  "BIG MAD":               phrase("BIG MAD",               "B IH1 G | M AE1 D"),
  "ATE THAT":              phrase("ATE THAT",              "EY1 T | DH AE1 T"),
  "LINK IN BIO":           phrase("LINK IN BIO",           "L IH1 NG K | IH0 N | B AY1 OW0"),

  // ─── PROPER-NOUN MARKER ───
  // Everything from the cities/celebs/brands sections below should render
  // capitalized in the UI ("Katy Perry" not "katy perry"). Maintained by
  // the PROPER_NOUN_KEYS set defined at the bottom of this file.
  // (No phrase entries here — just a marker for the next section.)

  // ─── Cities, places, regions ───
  // Songs reference these constantly. CMU has many already (paris, boston,
  // tokyo, etc.) with correct phonemes — those entries override these on
  // single-word collisions. Multi-word entries always win because they
  // wouldn't be in CMU as a single key.
  "NEW YORK":              phrase("NEW YORK",              "N UW1 | Y AO1 R K"),
  "NEW YORK CITY":         phrase("NEW YORK CITY",         "N UW1 | Y AO1 R K | S IH1 T IY0"),
  "LOS ANGELES":           phrase("LOS ANGELES",           "L AO1 S | AE1 N JH AH0 L AH0 S"),
  "LA":                    "EH1 L | EY1",  // letter spelling for "L.A."
  "SAN FRANCISCO":         phrase("SAN FRANCISCO",         "S AE0 N | F R AE0 N S IH1 S K OW0"),
  "SAN DIEGO":             phrase("SAN DIEGO",             "S AE0 N | D IY0 EY1 G OW0"),
  "LAS VEGAS":             phrase("LAS VEGAS",             "L AA1 S | V EY1 G AH0 S"),
  "NEW ORLEANS":           phrase("NEW ORLEANS",           "N UW1 | AO1 R L IY0 N Z"),
  "NORTH HOLLYWOOD":       phrase("NORTH HOLLYWOOD",       "N AO1 R TH | HH AA1 L IY0 W UH2 D"),
  "WEST COAST":            phrase("WEST COAST",            "W EH1 S T | K OW1 S T"),
  "EAST COAST":            phrase("EAST COAST",            "IY1 S T | K OW1 S T"),
  "DOWN SOUTH":            phrase("DOWN SOUTH",            "D AW1 N | S AW1 TH"),
  "THE BRONX":             phrase("THE BRONX",             "DH AH0 | B R AA1 NG K S"),
  "BROOKLYN":              "B R UH1 K L AH0 N",
  "MANHATTAN":             "M AE0 N HH AE1 T AH0 N",
  "QUEENS":                "K W IY1 N Z",
  "HARLEM":                "HH AA1 R L AH0 M",
  "COMPTON":               "K AA1 M P T AH0 N",
  "HOLLYWOOD":             "HH AA1 L IY0 W UH2 D",
  "MALIBU":                "M AE1 L AH0 B UW2",
  "BEVERLY HILLS":         phrase("BEVERLY HILLS",         "B EH1 V ER0 L IY0 | HH IH1 L Z"),
  "MIAMI BEACH":           phrase("MIAMI BEACH",           "M AY0 AE1 M IY0 | B IY1 CH"),
  "MEXICO CITY":           phrase("MEXICO CITY",           "M EH1 K S AH0 K OW0 | S IH1 T IY0"),
  "RIO":                   "R IY1 OW0",
  "RIO DE JANEIRO":        phrase("RIO DE JANEIRO",        "R IY1 OW0 | D IY0 | ZH AH0 N EH1 R OW0"),
  "BUENOS AIRES":          phrase("BUENOS AIRES",          "B W EY1 N OW0 S | EH1 R IY2 Z"),
  "TEL AVIV":              phrase("TEL AVIV",              "T EH1 L | AH0 V IY1 V"),
  "HONG KONG":             phrase("HONG KONG",             "HH AO1 NG | K AO1 NG"),
  "TIMES SQUARE":          phrase("TIMES SQUARE",          "T AY1 M Z | S K W EH1 R"),

  // Single-word place names CMU may or may not cover; included here defensively.
  "BARCELONA":             "B AA2 R S AH0 L OW1 N AH0",
  "AMSTERDAM":             "AE1 M S T ER0 D AE2 M",
  "DUBAI":                 "D UW0 B AY1",
  "MUMBAI":                "M AH0 M B AY1",
  "BANGKOK":               "B AE2 NG K AA1 K",
  "ISTANBUL":              "IH2 S T AE0 N B UW1 L",
  "MARRAKECH":             "M EH2 R AH0 K EH1 SH",
  "JAMAICA":               "JH AH0 M EY1 K AH0",
  "JAMAICAN":              "JH AH0 M EY1 K AH0 N",
  "PUERTO RICO":           phrase("PUERTO RICO",           "P W EH1 R T OW0 | R IY1 K OW0"),

  // ─── Pop / rock celebrities ───
  // CMU has many surnames; multi-word entries here add the full stage names.
  "TAYLOR SWIFT":          phrase("TAYLOR SWIFT",          "T EY1 L ER0 | S W IH1 F T"),
  "ARIANA GRANDE":         phrase("ARIANA GRANDE",         "AA2 R IY0 AE1 N AH0 | G R AA1 N D EY0"),
  "BILLIE EILISH":         phrase("BILLIE EILISH",         "B IH1 L IY0 | AY1 L IH0 SH"),
  "OLIVIA RODRIGO":        phrase("OLIVIA RODRIGO",        "OW0 L IH1 V IY0 AH0 | R OW0 D R IY1 G OW0"),
  "DUA LIPA":              phrase("DUA LIPA",              "D UW1 AH0 | L IY1 P AH0"),
  "KATY PERRY":            phrase("KATY PERRY",            "K EY1 T IY0 | P EH1 R IY0"),
  "LANA DEL REY":          phrase("LANA DEL REY",          "L AA1 N AH0 | D EH1 L | R EY1"),
  "HARRY STYLES":          phrase("HARRY STYLES",          "HH EH1 R IY0 | S T AY1 L Z"),
  "ED SHEERAN":            phrase("ED SHEERAN",            "EH1 D | SH IH1 R AH0 N"),
  "BRUNO MARS":            phrase("BRUNO MARS",            "B R UW1 N OW0 | M AA1 R Z"),
  "SABRINA CARPENTER":     phrase("SABRINA CARPENTER",     "S AH0 B R IY1 N AH0 | K AA1 R P AH0 N T ER0"),
  "MILEY CYRUS":           phrase("MILEY CYRUS",           "M AY1 L IY0 | S AY1 R AH0 S"),
  "BEYONCE":               "B IY0 AA1 N S EY0",
  "RIHANNA":               "R IY0 AE1 N AH0",
  "ADELE":                 "AH0 D EH1 L",
  "MADONNA":               "M AH0 D AA1 N AH0",
  "BRITNEY SPEARS":        phrase("BRITNEY SPEARS",        "B R IH1 T N IY0 | S P IH1 R Z"),
  "LADY GAGA":             phrase("LADY GAGA",             "L EY1 D IY0 | G AA1 G AA0"),
  "MICHAEL JACKSON":       phrase("MICHAEL JACKSON",       "M AY1 K AH0 L | JH AE1 K S AH0 N"),
  "ELVIS PRESLEY":         phrase("ELVIS PRESLEY",         "EH1 L V AH0 S | P R EH1 S L IY0"),
  "ELVIS":                 "EH1 L V AH0 S",
  "SINATRA":               "S AH0 N AA1 T R AH0",
  "DAVID BOWIE":           phrase("DAVID BOWIE",           "D EY1 V IH0 D | B OW1 IY0"),
  "BOB DYLAN":             phrase("BOB DYLAN",             "B AA1 B | D IH1 L AH0 N"),
  "PRINCE":                "P R IH1 N S",
  "FREDDIE MERCURY":       phrase("FREDDIE MERCURY",       "F R EH1 D IY0 | M ER1 K Y ER0 IY0"),
  "MICK JAGGER":           phrase("MICK JAGGER",           "M IH1 K | JH AE1 G ER0"),
  "MARILYN MONROE":        phrase("MARILYN MONROE",        "M EH1 R AH0 L IH0 N | M AH0 N R OW1"),

  // ─── Hip-hop celebrities ───
  "DRAKE":                 "D R EY1 K",
  "KANYE":                 "K AA1 N Y EY0",
  "KANYE WEST":            phrase("KANYE WEST",            "K AA1 N Y EY0 | W EH1 S T"),
  "KENDRICK":              "K EH1 N D R IH0 K",
  "KENDRICK LAMAR":        phrase("KENDRICK LAMAR",        "K EH1 N D R IH0 K | L AH0 M AA1 R"),
  "JAY Z":                 phrase("JAY Z",                 "JH EY1 | Z IY1"),
  "JAY-Z":                 phrase("JAY Z",                 "JH EY1 | Z IY1"),
  "TUPAC":                 "T UW1 P AA0 K",
  "BIGGIE":                "B IH1 G IY0",
  "EMINEM":                "EH1 M AH0 N EH2 M",
  "SNOOP":                 "S N UW1 P",
  "SNOOP DOGG":            phrase("SNOOP DOGG",            "S N UW1 P | D AO1 G"),
  "TYLER THE CREATOR":     phrase("TYLER THE CREATOR",     "T AY1 L ER0 | DH AH0 | K R IY0 EY1 T ER0"),
  "DOJA CAT":              phrase("DOJA CAT",              "D OW1 JH AH0 | K AE1 T"),
  "TRAVIS SCOTT":          phrase("TRAVIS SCOTT",          "T R AE1 V AH0 S | S K AA1 T"),
  "FUTURE":                "F Y UW1 CH ER0",
  "SZA":                   "S IH1 Z AH0",
  "J COLE":                phrase("J COLE",                "JH EY1 | K OW1 L"),
  "LIL WAYNE":             phrase("LIL WAYNE",             "L IH1 L | W EY1 N"),
  "LIL NAS X":             phrase("LIL NAS X",             "L IH1 L | N AE1 Z | EH1 K S"),
  "NICKI MINAJ":           phrase("NICKI MINAJ",           "N IH1 K IY0 | M IH0 N AA1 ZH"),
  "CARDI B":               phrase("CARDI B",               "K AA1 R D IY0 | B IY1"),
  "MEGAN THEE STALLION":   phrase("MEGAN THEE STALLION",   "M EH1 G AH0 N | DH IY0 | S T AE1 L Y AH0 N"),
  "POST MALONE":           phrase("POST MALONE",           "P OW1 S T | M AH0 L OW1 N"),
  "THE WEEKND":            phrase("THE WEEKND",            "DH AH0 | W IY1 K AH0 N D"),
  "FRANK OCEAN":           phrase("FRANK OCEAN",           "F R AE1 NG K | OW1 SH AH0 N"),
  "BAD BUNNY":             phrase("BAD BUNNY",             "B AE1 D | B AH1 N IY0"),

  // ─── Brands & products ───
  "COCA COLA":             phrase("COCA COLA",             "K OW1 K AH0 | K OW1 L AH0"),
  "PEPSI":                 "P EH1 P S IY0",
  "STARBUCKS":             "S T AA1 R B AH2 K S",
  "MCDONALDS":             "M AH0 K D AA1 N AH0 L D Z",
  "TESLA":                 "T EH1 S L AH0",
  "IPHONE":                "AY0 F OW1 N",
  "IPAD":                  "AY0 P AE1 D",
  "MACBOOK":               "M AE1 K B UH2 K",
  "MERCEDES":              "M ER0 S EY1 D IY0 Z",
  // BMW is one token but pronounced as 3 letters. Skip phrase() (which validates
  // word-count == phoneme-group-count) and write the phonemes directly with
  // boundary markers so the syllabifier still treats each letter as its own syllable.
  "BMW":                   "B IY1 | EH1 M | D AH1 B AH0 L Y UW0",
  "FERRARI":               "F ER0 AA1 R IY0",
  "PORSCHE":               "P AO1 R SH",
  "LAMBORGHINI":           "L AE2 M B AO0 R G IY1 N IY0",
  "LAMBO":                 "L AE1 M B OW0",
  "BUGATTI":               "B UW0 G AA1 T IY0",
  "ROLLS ROYCE":           phrase("ROLLS ROYCE",           "R OW1 L Z | R OY1 S"),
  "MASERATI":              "M AE2 S ER0 AA1 T IY0",
  "ROLEX":                 "R OW1 L EH2 K S",
  "VERSACE":               "V ER0 S AA1 CH IY0",
  "GUCCI":                 "G UW1 CH IY0",
  "PRADA":                 "P R AA1 D AH0",
  "CHANEL":                "SH AH0 N EH1 L",
  "LOUIS VUITTON":         phrase("LOUIS VUITTON",         "L UW1 IY0 | V W IY0 T AA1 N"),
  "CARTIER":               "K AA1 R T IY0 EY0",
  "BALENCIAGA":            "B AH0 L EH2 N S IY0 AA1 G AH0",
  "SUPREME":               "S AH0 P R IY1 M",
  "NIKE":                  "N AY1 K IY0",
  "ADIDAS":                "AH0 D IY1 D AH0 S",
  "NETFLIX":               "N EH1 T F L IH0 K S",
  "SPOTIFY":               "S P AA1 T AH0 F AY2",
  "INSTAGRAM":             "IH1 N S T AH0 G R AE2 M",
  "TIKTOK":                "T IH1 K T AA2 K",

  // ─── Cultural references / proper nouns added in batch 4 ───
  "MARDI GRAS":            phrase("MARDI GRAS",            "M AA1 R D IY0 | G R AA1"),
  "MENAGE A TROIS":        phrase("MENAGE A TROIS",        "M EY1 N AA0 ZH | AA1 | T R W AA1"),
  "AVANT GARDE":           phrase("AVANT GARDE",           "AH0 V AA1 N T | G AA1 R D"),
  "AVATAR":                "AE1 V AH0 T AA2 R",
  "MARIO KART":            phrase("MARIO KART",            "M AA1 R IY0 OW0 | K AA1 R T"),
  "FORTNITE":              "F AO1 R T N AY2 T",
  "ADMIRAL ACKBAR":        phrase("ADMIRAL ACKBAR",        "AE1 D M ER0 AH0 L | AE1 K B AA0 R"),
  // VIP written directly (not via phrase()) — phrase() would destress the
  // middle "I" since it matches the pronoun in FUNCTION_WORDS, which we
  // don't want for letter-spelled acronyms.
  "VIP":                   "V IY1 | AY1 | P IY1",
  "STAR WARS":             phrase("STAR WARS",             "S T AA1 R | W AO1 R Z"),
  "JEDI":                  "JH EH1 D AY0",
  "SITH":                  "S IH1 TH",
  "POKEMON":               "P OW1 K IY0 M AA2 N",
  // Interjection — written directly so engine treats as one word with three syllables
  "MWAHAHA":               "M W AA0 HH AA0 HH AA1",
  "ALACAZAM":              "AE2 L AH0 K AH0 Z AE1 M",
  "ALAKAZAM":              "AE2 L AH0 K AH0 Z AE1 M",
  "ABRACADABRA":           "AE2 B R AH0 K AH0 D AE1 B R AH0",
  "CAMEO":                 "K AE1 M IY0 OW0",
  "BRUH":                  "B R AH1",
  "INDUSTRY PLANT":        phrase("INDUSTRY PLANT",        "IH1 N D AH0 S T R IY0 | P L AE1 N T"),

  // ─── Homograph context overrides ───
  // Several phrases auto-generate as arrays of both pronunciations of a
  // homograph, but only one makes sense in context. These overrides force
  // the correct single pronunciation. (Hand-curated phrases.js wins the
  // merge over the auto-generated phrases-idioms.js / Wiktionary entries.)
  //
  // wind = W IH1 N D (the breeze noun) — NOT W AY1 N D (verb to wind/coil)
  "AGAINST THE WIND":      phrase("AGAINST THE WIND",      "AH0 G EH1 N S T | DH AH0 | W IH1 N D"),
  "INTO THE WIND":         phrase("INTO THE WIND",         "IH1 N T UW1 | DH AH0 | W IH1 N D"),
  "SECOND WIND":           phrase("SECOND WIND",           "S EH1 K AH0 N D | W IH1 N D"),
  "WINDS OF CHANGE":       phrase("WINDS OF CHANGE",       "W IH1 N D Z | AH1 V | CH EY1 N JH"),
  "WINDS OF WAR":          phrase("WINDS OF WAR",          "W IH1 N D Z | AH1 V | W AO1 R"),
  "FOUR WINDS":            phrase("FOUR WINDS",            "F AO1 R | W IH1 N D Z"),
  "GONE WITH THE WIND":    phrase("GONE WITH THE WIND",    "G AO1 N | W IH1 DH | DH AH0 | W IH1 N D"),
  "CANDLE IN THE WIND":    phrase("CANDLE IN THE WIND",    "K AE1 N D AH0 L | IH1 N | DH AH0 | W IH1 N D"),
  "BREAK WIND":            phrase("BREAK WIND",            "B R EY1 K | W IH1 N D"),
  "BREATH OF WIND":        phrase("BREATH OF WIND",        "B R EH1 TH | AH1 V | W IH1 N D"),
  "WIND CHIME":            phrase("WIND CHIME",            "W IH1 N D | CH AY1 M"),
  "WIND CHIMES":           phrase("WIND CHIMES",           "W IH1 N D | CH AY1 M Z"),
  "WIND TUNNEL":           phrase("WIND TUNNEL",           "W IH1 N D | T AH1 N AH0 L"),
  "WIND POWER":            phrase("WIND POWER",            "W IH1 N D | P AW1 ER0"),
  "WIND FARM":             phrase("WIND FARM",             "W IH1 N D | F AA1 R M"),
  // wind = W AY1 N D (verb, to coil/wrap or curve)
  "WIND IT UP":            phrase("WIND IT UP",            "W AY1 N D | IH1 T | AH1 P"),
  "WIND DOWN":             phrase("WIND DOWN",             "W AY1 N D | D AW1 N"),
  "WIND UP":               phrase("WIND UP",               "W AY1 N D | AH1 P"),

  // lead = L IY1 D (verb, also "guidance" noun) in these contexts
  "FOLLOW MY LEAD":        phrase("FOLLOW MY LEAD",        "F AA1 L OW0 | M AY1 | L IY1 D"),
  "LEAD THE WAY":          phrase("LEAD THE WAY",          "L IY1 D | DH AH0 | W EY1"),
  "LEAD BY EXAMPLE":       phrase("LEAD BY EXAMPLE",       "L IY1 D | B AY1 | IH0 G Z AE1 M P AH0 L"),
  "TAKE THE LEAD":         phrase("TAKE THE LEAD",         "T EY1 K | DH AH0 | L IY1 D"),
  "IN THE LEAD":           phrase("IN THE LEAD",           "IH1 N | DH AH0 | L IY1 D"),
  // lead = L EH1 D (the metal)
  "LEAD PIPE":             phrase("LEAD PIPE",             "L EH1 D | P AY1 P"),
  "LEAD PENCIL":           phrase("LEAD PENCIL",           "L EH1 D | P EH1 N S AH0 L"),

  // tear = T IH1 R (cry, the noun) in these contexts
  "SHED A TEAR":           phrase("SHED A TEAR",           "SH EH1 D | AH1 | T IH1 R"),
  "CROCODILE TEARS":       phrase("CROCODILE TEARS",       "K R AA1 K AH0 D AY2 L | T IH1 R Z"),
  "BRING A TEAR":          phrase("BRING A TEAR",          "B R IH1 NG | AH1 | T IH1 R"),
  "TEAR IN MY EYE":        phrase("TEAR IN MY EYE",        "T IH1 R | IH1 N | M AY1 | AY1"),
  // tear = T EH1 R (rip, the verb)
  "TEAR IT APART":         phrase("TEAR IT APART",         "T EH1 R | IH1 T | AH0 P AA1 R T"),
  "TEAR DOWN":             phrase("TEAR DOWN",             "T EH1 R | D AW1 N"),
  "WEAR AND TEAR":         phrase("WEAR AND TEAR",         "W EH1 R | AH1 N D | T EH1 R"),
  "TEAR APART":            phrase("TEAR APART",            "T EH1 R | AH0 P AA1 R T"),
  "TEAR TO PIECES":        phrase("TEAR TO PIECES",        "T EH1 R | T UW1 | P IY1 S AH0 Z"),

  // live = L IH1 V (verb, to live)
  "LIVE AND LET LIVE":     phrase("LIVE AND LET LIVE",     "L IH1 V | AH1 N D | L EH1 T | L IH1 V"),
  "LONG MAY YOU LIVE":     phrase("LONG MAY YOU LIVE",     "L AO1 NG | M EY1 | Y UW1 | L IH1 V"),
  // live = L AY1 V (adjective, in real-time)
  "LIVE CONCERT":          phrase("LIVE CONCERT",          "L AY1 V | K AA1 N S ER2 T"),
  "LIVE PERFORMANCE":      phrase("LIVE PERFORMANCE",      "L AY1 V | P ER0 F AO1 R M AH0 N S"),

  // bow = B OW1 (the ribbon / instrument bow / decorative)
  "BOW TIE":               phrase("BOW TIE",               "B OW1 | T AY1"),
  "BOW AND ARROW":         phrase("BOW AND ARROW",         "B OW1 | AH1 N D | EH1 R OW0"),
  // bow = B AW1 (verb, to bend down)
  "TAKE A BOW":            phrase("TAKE A BOW",            "T EY1 K | AH1 | B AW1"),
  "BOW YOUR HEAD":         phrase("BOW YOUR HEAD",         "B AW1 | Y AO1 R | HH EH1 D"),

  // bass = B EY1 S (musical, deep voice)
  "BASS GUITAR":           phrase("BASS GUITAR",           "B EY1 S | G IH0 T AA1 R"),
  "BASS LINE":             phrase("BASS LINE",             "B EY1 S | L AY1 N"),
  "DRUM AND BASS":         phrase("DRUM AND BASS",         "D R AH1 M | AH1 N D | B EY1 S"),
  // bass = B AE1 S (the fish)
  "STRIPED BASS":          phrase("STRIPED BASS",          "S T R AY1 P T | B AE1 S"),

  // close = K L OW1 Z (verb)
  "CLOSE THE DOOR":        phrase("CLOSE THE DOOR",        "K L OW1 Z | DH AH0 | D AO1 R"),
  "CLOSE YOUR EYES":       phrase("CLOSE YOUR EYES",       "K L OW1 Z | Y AO1 R | AY1 Z"),
  // close = K L OW1 S (adjective)
  "CLOSE TO HOME":         phrase("CLOSE TO HOME",         "K L OW1 S | T UW1 | HH OW1 M"),
  "CLOSE CALL":            phrase("CLOSE CALL",            "K L OW1 S | K AO1 L"),
  "TOO CLOSE":             phrase("TOO CLOSE",             "T UW1 | K L OW1 S"),

  // wound = W UW1 N D (injury, noun)
  "OPEN WOUND":            phrase("OPEN WOUND",            "OW1 P AH0 N | W UW1 N D"),
  "DEEP WOUND":            phrase("DEEP WOUND",            "D IY1 P | W UW1 N D"),
  "FRESH WOUND":           phrase("FRESH WOUND",           "F R EH1 SH | W UW1 N D"),
  // wound = W AW1 N D (past tense of wind, the verb)
  "WOUND UP":              phrase("WOUND UP",              "W AW1 N D | AH1 P"),
  "TIGHTLY WOUND":         phrase("TIGHTLY WOUND",         "T AY1 T L IY0 | W AW1 N D"),

  // read = R IY1 D (present tense / well-educated noun sense)
  "MUST READ":             phrase("MUST READ",             "M AH1 S T | R IY1 D"),
  "SPEED READ":            phrase("SPEED READ",            "S P IY1 D | R IY1 D"),
  "READ BETWEEN THE LINES": phrase("READ BETWEEN THE LINES", "R IY1 D | B IH0 T W IY1 N | DH AH0 | L AY1 N Z"),
  "READ MY MIND":          phrase("READ MY MIND",          "R IY1 D | M AY1 | M AY1 N D"),
  // read = R EH1 D (past tense)
  "WELL READ":             phrase("WELL READ",             "W EH1 L | R EH1 D"),
  "WIDELY READ":           phrase("WIDELY READ",           "W AY1 D L IY0 | R EH1 D"),
  "SPONGEBOB SQUAREPANTS": phrase("SPONGEBOB SQUAREPANTS", "S P AH1 N JH B AA2 B | S K W EH1 R P AE2 N T S"),
  "PHARAOH'S REVENGE":     phrase("PHARAOH'S REVENGE",     "F EH1 R OW0 Z | R IH0 V EH1 N JH"),
  // Words missing from CMU — direct phonemes
  "SCAREDY":               "S K EH1 R IY0",
  "SCAREDY CAT":           phrase("SCAREDY CAT",           "S K EH1 R IY0 | K AE1 T"),
  "DERRIERE":              "D EH2 R IY0 EH1 R",
  "JOHANN SEBASTIAN BACH": phrase("JOHANN SEBASTIAN BACH", "Y OW1 HH AA2 N | S AH0 B AE1 S CH AH0 N | B AA1 K"),
  "BACH":                  "B AA1 K"
};

// ─── Proper-noun display info ───
// Keys here render capitalized in the UI (proper title case) instead of as
// flat lowercase. Built by enumerating the keys in the cities/celebs/brands
// sections above. If you add new proper nouns, add their KEYS here too.
window.PROPER_NOUN_KEYS = new Set([
  // Cities, places, regions
  "NEW YORK", "NEW YORK CITY", "LOS ANGELES", "LA", "SAN FRANCISCO",
  "SAN DIEGO", "LAS VEGAS", "NEW ORLEANS", "NORTH HOLLYWOOD", "WEST COAST",
  "EAST COAST", "DOWN SOUTH", "THE BRONX", "BROOKLYN", "MANHATTAN", "QUEENS",
  "HARLEM", "COMPTON", "HOLLYWOOD", "MALIBU", "BEVERLY HILLS", "MIAMI BEACH",
  "MEXICO CITY", "RIO", "RIO DE JANEIRO", "BUENOS AIRES", "TEL AVIV",
  "HONG KONG", "TIMES SQUARE", "BARCELONA", "AMSTERDAM", "DUBAI", "MUMBAI",
  "BANGKOK", "ISTANBUL", "MARRAKECH", "JAMAICA", "JAMAICAN", "PUERTO RICO",
  // Pop / rock celebrities
  "TAYLOR SWIFT", "ARIANA GRANDE", "BILLIE EILISH", "OLIVIA RODRIGO",
  "DUA LIPA", "KATY PERRY", "LANA DEL REY", "HARRY STYLES", "ED SHEERAN",
  "BRUNO MARS", "SABRINA CARPENTER", "MILEY CYRUS", "BEYONCE", "RIHANNA",
  "ADELE", "MADONNA", "BRITNEY SPEARS", "LADY GAGA", "MICHAEL JACKSON",
  "ELVIS PRESLEY", "ELVIS", "SINATRA", "DAVID BOWIE", "BOB DYLAN", "PRINCE",
  "FREDDIE MERCURY", "MICK JAGGER", "MARILYN MONROE",
  // Hip-hop celebrities
  "DRAKE", "KANYE", "KANYE WEST", "KENDRICK", "KENDRICK LAMAR", "JAY Z", "JAY-Z",
  "TUPAC", "BIGGIE", "EMINEM", "SNOOP", "SNOOP DOGG", "TYLER THE CREATOR",
  "DOJA CAT", "TRAVIS SCOTT", "FUTURE", "SZA", "J COLE", "LIL WAYNE",
  "LIL NAS X", "NICKI MINAJ", "CARDI B", "MEGAN THEE STALLION", "POST MALONE",
  "THE WEEKND", "FRANK OCEAN", "BAD BUNNY",
  // Brands & products
  "COCA COLA", "PEPSI", "STARBUCKS", "MCDONALDS", "TESLA", "IPHONE", "IPAD",
  "MACBOOK", "MERCEDES", "BMW", "FERRARI", "PORSCHE", "LAMBORGHINI", "LAMBO",
  "BUGATTI", "ROLLS ROYCE", "MASERATI", "ROLEX", "VERSACE", "GUCCI", "PRADA",
  "CHANEL", "LOUIS VUITTON", "CARTIER", "BALENCIAGA", "SUPREME", "NIKE",
  "ADIDAS", "NETFLIX", "SPOTIFY", "INSTAGRAM", "TIKTOK",
  // Cultural / batch 4
  "MARDI GRAS", "MENAGE A TROIS", "AVANT GARDE", "AVATAR", "MARIO KART",
  "FORTNITE", "ADMIRAL ACKBAR", "VIP", "STAR WARS", "JEDI", "SITH", "POKEMON",
  "JOHANN SEBASTIAN BACH", "BACH", "BAGHDAD", "BANGERS AND MASH", "ADIDAS",
  "SPONGEBOB SQUAREPANTS", "PHARAOH'S REVENGE",

  // ─── Auto-added proper nouns from corpus capitalization analysis ───
  "AALIYAH", "ABBY", "ACURA", "ADAM", "AFRICA", "AFRICAN",
  "AGUILERA", "ALABAMA", "ALADDIN", "ALEX", "ALEXANDER", "ALI",
  "ALICE", "ALICIA", "ALLAH", "ALLEN", "AMELIA", "AMERICANA",
  "AMY", "ANDRE", "ANDREW", "ANDY", "ANGELES", "ANNA",
  "ANNIE", "ANTHONY", "APHRODITE", "ARAB", "ARABIAN", "ARABIC",
  "ARISTOTLE", "ARIZONA", "ARKANSAS", "ARTHUR", "ASHLEY", "ASHTON",
  "ASIAN", "ASIANS", "ASTON", "ATLANTA", "ATLANTIC", "AUDI",
  "AUGUST", "AURORA", "AUSTIN", "AUSTRALIAN", "BABYLON", "BALDWIN",
  "BALTIMORE", "BARBIE", "BARBIES", "BARRY", "BATMAN", "BEAMER",
  "BEATLES", "BELGIUM", "BENJAMIN", "BENTLEY", "BENZ", "BENZES",
  "BERLIN", "BERNIE", "BETTY", "BEVERLY", "BILLIE", "BIRMINGHAM",
  "BISHOP", "BONNIE", "BOSTON", "BOYZ", "BRADLEY", "BRADY",
  "BRASIL", "BRAVES", "BRAZIL", "BRETT", "BRIAN", "BRITISH",
  "BRITNEY", "BRONX", "BRUCE", "BRUNO", "BUDDHIST", "BUICK",
  "BUTTE", "CADILLACS", "CAIN", "CALGARY", "CALIFORNIA", "CANADA",
  "CAREY", "CARIBBEAN", "CARL", "CARLO", "CARMEN", "CAROLINA",
  "CAROLINE", "CATHOLICS", "CELINE", "CHAN", "CHARLES", "CHARLIE",
  "CHARLOTTE", "CHELSEA", "CHEROKEE", "CHEVY", "CHEYENNE", "CHICAGO",
  "CHINESE", "CHRIS", "CHRIST", "CHRISTIAN", "CHRISTINA", "CHRISTMAS",
  "CHRISTOPHER", "CINDERELLA", "CLARK", "CLAUS", "CLIFTON", "CLINTON",
  "CLYDE", "CODY", "COHEN", "COLE", "COLLINS", "COLOMBIA",
  "COLORADO", "COLTER", "COLUMBUS", "CRAIG", "CREST", "CUBA",
  "CUBAN", "CYRUS", "DALE", "DALLAS", "DANIEL", "DANNY",
  "DAVE", "DAVID", "DAVIDSON", "DAVIS", "DECATUR", "DECEMBER",
  "DEMI", "DENNIS", "DEPOT", "DEREK", "DESTIN", "DETROIT",
  "DEVILLE", "DIDDY", "DIEGO", "DIOR", "DISNEY", "DOLCE",
  "DONALD", "DOUG", "DUNDEE", "DYLAN", "EARL", "EASTER",
  "EDDIE", "EDDY", "EDEN", "EGYPTIAN", "ELI", "ELIZABETH",
  "ELLIOT", "EMILY", "EMORY", "ENGLAND", "ERIC", "ERICA",
  "EUROPE", "EUROPEAN", "FAIRFAX", "FEBRUARY", "FEDEX", "FERRARIS",
  "FIJI", "FIONA", "FLORIDA", "FLOYD", "FORBES", "FORDS",
  "FORREST", "FRANCE", "FRANCISCO", "FRANKLIN", "FRED", "FREDDIE",
  "FREDDY", "FRIDAY", "FRIDAYS", "GALWAY", "GANDHI", "GARFIELD",
  "GARY", "GEMINI", "GEORGE", "GEORGIA", "GERMAN", "GHANA",
  "GIBBS", "GIL", "GINA", "GLORIA", "GLOVER", "GRAMMY",
  "GRANDE", "GREEK", "GREENVILLE", "GREYHOUND", "GUINNESS", "HAITI",
  "HAITIANS", "HALLOWEEN", "HAMILTON", "HAMPTON", "HAMPTONS", "HARRY",
  "HART", "HARVARD", "HARVEY", "HAVANA", "HAWAII", "HAWAIIAN",
  "HENDRIX", "HENRY", "HERCULES", "HILFIGER", "HILLARY", "HOGAN",
  "HOLLAND", "HONDA", "HOUSTON", "HOWARD", "HUGH", "HULK",
  "HUMMER", "IBIZA", "IGOR", "ILLINOIS", "INDIA", "INDIAN",
  "INDIANA", "INDIANS", "INDIGO", "INTERSCOPE", "IRAQ", "ISAIAH",
  "ISRAEL", "ITALIAN", "ITALY", "JACKIE", "JACKSON", "JACOB",
  "JAGUAR", "JAMES", "JAMESON", "JAMESTOWN", "JAMIE", "JANET",
  "JANUARY", "JAPAN", "JAPANESE", "JASON", "JASPER", "JEFF",
  "JEFFERSON", "JEFFREY", "JENNIFER", "JENNY", "JEROME", "JERRY",
  "JERUSALEM", "JESSE", "JESUS", "JEWISH", "JEWS", "JILL",
  "JIM", "JOEY", "JOHNNY", "JOHNSON", "JON", "JONAS",
  "JORDAN", "JORDANS", "JOSEPH", "JOSH", "JUAN", "JUDY",
  "JULIET", "JULIO", "JULIUS", "JULY", "JUNE", "JUSTIN",
  "KANE", "KANSAS", "KARL", "KATE", "KATRINA", "KATY",
  "KEITH", "KELLY", "KEN", "KENNEDY", "KENNY", "KENTUCKY",
  "KEVIN", "KHAN", "KIM", "KINGSTON", "KIRBY", "KOBE",
  "KOCH", "KODAK", "KONG", "KOOL", "KURT", "KYOTO",
  "LAFAYETTE", "LAKER", "LAKERS", "LAMAR", "LAMBORGHINIS", "LAN",
  "LARRY", "LAURENT", "LENNON", "LEO", "LEWIS", "LEXUS",
  "LINCOLN", "LINDA", "LINDSEY", "LIONEL", "LISA", "LIZ",
  "LIZZY", "LOIS", "LONDON", "LOUIS", "LOUISIANA", "LUCY",
  "LUTHER", "LYDIA", "MADDEN", "MADISON", "MAE", "MAGGIE",
  "MALCOLM", "MANSON", "MARCUS", "MARIA", "MARIANNE", "MARIE",
  "MARILYN", "MARIO", "MARLBORO", "MARLEY", "MARS", "MARSHALL",
  "MARTHA", "MARTIN", "MARVIN", "MARY", "MATT", "MATTHEW",
  "MAVERICKS", "MAZDA", "MCCOY", "MCGRAW", "MCLAREN", "MEGAN",
  "MEL", "MELLY", "MELVIN", "MEMPHIS", "MEXICAN", "MEXICO",
  "MIAMI", "MICHAEL", "MICHIGAN", "MICK", "MIKE", "MILAN",
  "MILLER", "MINNEAPOLIS", "MINNESOTA", "MIRANDA", "MISSISSIPPI", "MONA",
  "MONDAY", "MONDAYS", "MONICA", "MONROE", "MONTANA", "MONTREAL",
  "MORGAN", "MORRISON", "MOSES", "MOTOROLA", "MOZART", "MRS",
  "MUHAMMAD", "MYERS", "NANCY", "NAPOLEON", "NASHVILLE", "NATE",
  "NATHAN", "NAZI", "NEBRASKA", "NEIL", "NEPTUNE", "NEVADA",
  "NEWTON", "NICOLE", "NIKES", "NIKKI", "NINTENDO", "NISSAN",
  "NOAH", "NORMA", "NOVA", "NOVEMBER", "OAKLAND", "OCTOBER",
  "ODESSA", "OHIO", "OKLAHOMA", "OLYMPICS", "OPRAH", "ORLEANS",
  "OSAMA", "OSCAR", "OSCARS", "OTIS", "OWENS", "PABLO",
  "PAC", "PAM", "PARIS", "PARKER", "PATRICK", "PATTI",
  "PAUL", "PERRY", "PERSIAN", "PETE", "PHELPS", "PHIL",
  "PHILADELPHIA", "PHILIPPE", "PICASSO", "PITTSBURGH", "PLUTO", "PORSCHES",
  "PORTLAND", "POTTER", "PUERTO", "RAE", "RANDY", "REAGAN",
  "REDD", "REGINA", "REGIS", "REN", "RENDER", "REPUBLICAN",
  "RICAN", "RICHARD", "RICK", "RICKY", "ROBERT", "RODDY",
  "ROGER", "ROME", "ROMEO", "RON", "RONNIE", "ROSA",
  "ROSS", "ROY", "ROYCE", "RUBIN", "RUGER", "RUSSELL",
  "RUSSIA", "RUSSIAN", "RYAN", "SALLY", "SAM", "SAMMY",
  "SANTA", "SANTO", "SARA", "SARAH", "SATAN", "SATURDAY",
  "SATURDAYS", "SATURN", "SAUDI", "SAVANNAH", "SCORPIO", "SCOTIA",
  "SCOTT", "SEAN", "SEPTEMBER", "SERENA", "SHAKESPEARE", "SHARON",
  "SHAWN", "SIERRA", "SIMON", "SIMONE", "SINGAPORE", "SMALLS",
  "SMITH", "SPAIN", "STAN", "STANLEY", "STEPHEN", "STEVE",
  "STEVEN", "STEVIE", "SUNDAYS", "SUP", "SUPERMAN", "SUSAN",
  "SUZANNE", "TAHOE", "TALIBAN", "TAMMY", "TATE", "TAYLOR",
  "TAYLORS", "TENNESSEE", "TEXAN", "TEXAS", "THAILAND", "THOMAS",
  "THURSDAY", "TIFFANY", "TIMBERLANDS", "TINA", "TODD", "TOKYO",
  "TOM", "TOMMY", "TONY", "TORONTO", "TOYOTA", "TRAVIS",
  "TRINIDAD", "TROJAN", "TROJANS", "TROY", "TUESDAY", "TURNER",
  "TYLER", "TYSON", "UTAH", "VALENTINO", "VATICAN", "VEGAS",
  "VENICE", "VENUS", "VIETNAM", "VIKINGS", "VINCE", "VINCENT",
  "VIRGINIA", "VUITTON", "WALLACE", "WALMART", "WALT", "WALTER",
  "WASHINGTON", "WAYNE", "WEDNESDAY", "WENDY", "WESLEY", "WESTWOOD",
  "WHITNEY", "WILLIAM", "WILLIAMS", "WILLIS", "WILSON", "WOODSTOCK",
  "XANAX", "YORK", "YVES",
]);

// Display-case overrides for proper nouns whose canonical form doesn't follow
// simple "capitalize each word" rules (camelCase brands, Mc-names, etc.).
// Key = the dictionary key (uppercase); value = the display string.
window.PROPER_NOUN_DISPLAY = {
  "LA": "L.A.",
  "IPHONE": "iPhone",
  "IPAD": "iPad",
  "MACBOOK": "MacBook",
  "MCDONALDS": "McDonald's",
  "BMW": "BMW",
  "SZA": "SZA",
  "BEYONCE": "Beyoncé",
  "JAY Z": "Jay-Z",
  "JAY-Z": "Jay-Z",
  "J COLE": "J. Cole",
  "LIL NAS X": "Lil Nas X",
  "TYLER THE CREATOR": "Tyler, the Creator",
  "MEGAN THEE STALLION": "Megan Thee Stallion",
  "THE WEEKND": "The Weeknd",
  "TIKTOK": "TikTok",
  "MILEY CYRUS": "Miley Cyrus",
  "RIO DE JANEIRO": "Rio de Janeiro",
  "TIMES SQUARE": "Times Square",
  "MARDI GRAS": "Mardi Gras",
  "MENAGE A TROIS": "Ménage à Trois",
  "AVANT GARDE": "Avant-garde",
  "AVATAR": "Avatar",
  "MARIO KART": "Mario Kart",
  "FORTNITE": "Fortnite",
  "ADMIRAL ACKBAR": "Admiral Ackbar",
  "VIP": "VIP",
  "STAR WARS": "Star Wars",
  "JEDI": "Jedi",
  "SITH": "Sith",
  "POKEMON": "Pokémon",
  "JOHANN SEBASTIAN BACH": "Johann Sebastian Bach",
  "BACH": "Bach",
  "BAGHDAD": "Baghdad",
  "BANGERS AND MASH": "Bangers and Mash",
  "ADIDAS": "Adidas",
  "SPONGEBOB SQUAREPANTS": "SpongeBob SquarePants",
  "PHARAOH'S REVENGE": "Pharaoh's Revenge",

  // ─── Acronyms ───
  // These display in ALL CAPS rather than title-case. Without an explicit
  // entry, "AF" would render as either "af" (default lowercase) or "Af"
  // (title-case if listed in PROPER_NOUN_KEYS) — both wrong.
  "AF":   "AF",
  "DJ":   "DJ",
  "MC":   "MC",
  "USA":  "USA",
  "UK":   "UK",
  "NYC":  "NYC",
  "LAX":  "LAX",
  "JFK":  "JFK",
  "FBI":  "FBI",
  "CIA":  "CIA",
  "NASA": "NASA",
  "TV":   "TV",
  "AC":   "AC",
  "OK":   "OK",
  "OKAY": "Okay",
  "AKA":  "AKA",
  "ETA":  "ETA",
  "BBQ":  "BBQ",
  "CEO":  "CEO",
  "IDK":  "IDK",
  "LOL":  "LOL",
  "OMG":  "OMG",
  "WTF":  "WTF",
  "ASAP": "ASAP",
  "RIP":  "RIP",
  "PSA":  "PSA",
  "TBH":  "TBH",
  "ATM":  "ATM",
  "DNA":  "DNA"
};
})();
