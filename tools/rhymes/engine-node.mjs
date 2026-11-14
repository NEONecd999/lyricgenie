// Loads the live rhyme engine (public/rhymes/*.js) into Node, as the rhyme tool loads it in the browser.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/rhymes");
export function loadEngine() {
  const ctx = { console };
  ctx.window = ctx;
  ctx.self = ctx;
  vm.createContext(ctx);
  for (const f of ["engine.js", "phrases-mined.js", "phrases-wiktionary.js", "phrases-idioms.js", "phrases.js", "dictionary.js"]) {
    vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
  }
  const E = ctx.RhymeEngine;
  const dict = ctx.DICTIONARY;
  const index = E.buildIndex(dict);
  return { E, dict, index, query: (w, opts = {}) => E.query(w, dict, index, opts) };
}
