// Cloudflare Pages Function — handles requests to "/" only.
//
// The Pages project serves rhymegold.com via Cloudflare's _redirects file
// for all non-root paths, but Cloudflare Pages explicitly does NOT support
// 200-status rewrites in _redirects (only 301/302 redirects). So for the
// root path we use this Function to fetch the rhymegold shell from static
// assets and return it transparently — the URL bar stays as rhymegold.com/.
//
// File-based routing: this file lives at functions/index.js and Cloudflare
// Pages routes the literal path "/" through here (and only "/"). Other
// paths bypass this function and hit static assets directly.
export async function onRequest({ request, env }) {
  // Fetch the CANONICAL path "/rhymegold/" (with trailing slash, no
  // explicit index.html). Cloudflare Pages auto-308-redirects
  // "/rhymegold/index.html" → "/rhymegold/" for canonicalization, and
  // that 308 would propagate up to the browser and change the URL bar —
  // defeating the whole point of this transparent rewrite.
  const url = new URL("/rhymegold/", request.url);
  return env.ASSETS.fetch(new Request(url, request));
}
