---
name: psi-audit
description: Run or interpret a PageSpeed Insights / Lighthouse audit for soagency.dev and apply the targeted fixes that moved it to Mobile 92 / Desktop 99 / A11y+BP+SEO 100 / Agentic 4/4 on 2026-10-07. Trigger when the user asks about PSI, Lighthouse, Core Web Vitals, mobile/desktop performance, agent-readiness audits (ARD / ai-catalog), or any site-speed concern. Also trigger when the user shares a pagespeed.web.dev screenshot or URL.
---

# PageSpeed Insights / agent-readiness audit for soagency.dev

A playbook distilled from the 2026-10-07 optimization pass. Read it before touching performance work on this site — most of the obvious "fixes" are either already done, deliberately not done, or counterproductive.

Related memory: [[psi-perf-baseline-2026-10-07]], [[trust-cloudflare-rum-over-psi]].

## 1. Measurement — before touching code

**Trust order:** Cloudflare dashboard RUM > PSI (one official run) > local `npx lighthouse` (3-run median) > single local Lighthouse run.

- The Cloudflare dashboard carries a real-user Performance score. On 2026-10-07 it read 98 while PSI mobile swung between 70 and 92 across runs minutes apart. If RUM is green, synthetic noise is noise.
- The public PSI API (`https://www.googleapis.com/pagespeedonline/v5/runPagespeed`) is rate-limited at 0/day for anonymous callers. Don't retry — go local.
- Local Lighthouse with Chrome headless gives usable numbers only as a 3-run **median**; single runs can vary by 20+ performance points.
- Lighthouse's auto-scroll fires any `scroll` event listener installed by trackers (see §4). That's why TBT swings so wildly between runs.

Baseline command for a 3-run median:
```bash
for i in 1 2 3; do
  npx --yes lighthouse https://soagency.dev/en/ --quiet \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
    --output=json --output-path=./lh-$i.json \
    --form-factor=mobile --screenEmulation.mobile
done
```

## 2. What's already fixed — do NOT re-do

Every item here has a dedicated commit. `git log --grep="PageSpeed\|PSI\|LCP\|TBT\|font\|cache"` will show them.

| Item | Where | Why it's done |
|---|---|---|
| `@vercel/analytics` removed | `components/site-document.tsx` | Site is on Cloudflare Pages, the Vercel script 404'd and failed MIME type |
| Logo PNG → SVG | `components/navbar.tsx`, `components/footer.tsx` | 33 KB PNG at 32 px display → 9 KB SVG |
| Hero founders image resized | `public/images/soa_founders1.webp` | 3024×2160 (702 KB) → 1344×960 (84 KB) |
| 3 portfolio images resized | `public/images/projects/*.webp` | 1897px wide → 1200px; 687 KB → 235 KB total |
| Portfolio carousel lazy-loaded | `components/portfolio.tsx` | `loading="lazy" decoding="async" width height` |
| Hero intro animation skipped on mobile | `components/hero.tsx` + `hooks/use-gsap-animations.tsx` | GSAP `opacity:0` fade was eating 3.65s of LCP delay. `md:opacity-0` + `matchMedia("(max-width: 767px)")` early-return |
| 4 trackers deferred | `components/{meta-pixel,google-analytics,microsoft-clarity,google-tag-manager}.tsx` | Each one loads on first interaction OR 3s fallback. Queues (fbq.queue, dataLayer, clarity.q) seed synchronously so events are not lost |
| Font weights pruned | `components/site-document.tsx` | 23 declared weights → 8 (Geist 400/500/600/700, Mono 400, Audiowide 400, Roboto 400/700). `display: 'swap'` on all. |
| Cache lifetimes tuned | `public/_headers` | `/_next/static/*` max-age=1y immutable; `/images/*` + logo + favicon max-age=1d must-revalidate (24h chosen deliberately so in-place swaps propagate — see §5) |
| ard-schema v1.0 compliance | `public/.well-known/ai-catalog.json` | `specVersion: "1.0"`, entries use `identifier` (not `id`), host carries only `displayName` + `documentationUrl` |
| hreflang scrubbed from Link headers | `public/_headers` | sitemap.xml is the authoritative source; locale Link headers only advertise markdown twins |
| Language switcher aria-label | `components/language-switcher.tsx` | WCAG 2.5.3 "label in name" — prefixed with EN/ES/FR to match visible text |
| Footer disabled service color-contrast | `components/footer.tsx` | /60 opacity → italic + full opacity |
| IndexNow key | `public/ef709ddbe88b54e0c9504fa1a76cc87b.txt` + `robots.txt` | Bing/Yandex push indexing |
| Content Signals in robots.txt | `public/robots.txt` | `ai-train=no, search=yes, ai-input=yes` under each User-agent |

## 3. What's deliberately NOT fixed — don't be "helpful"

| PSI complaint | Why we leave it |
|---|---|
| **"Reduce unused JavaScript ~300 KB"** | ~88 % of that is third-party tracker overhead (GTM, GA, Meta, Clarity). The only way to meaningfully reduce it is to turn off a tracker — product decision, not technical. |
| **"Avoid long main-thread tasks"** (the long ones) | All of them are tracker scripts. Same reason. |
| **"Avoid non-composited animations" `scrollbar-color`** | Browser quirk, no fix available in CSS. |
| **"Avoid non-composited animations" `max-height`** on FAQ | FAQ accordion needs animated height. CSS Grid `1fr` tricks don't fit the current implementation. Low impact. |
| **"Legacy JavaScript" from `connect.facebook.net` / `beacon.min.js`** | Not our code. Facebook and Cloudflare ship their own polyfills. |
| **"Third-party cookies"** (BP drops to ~77 when flagged) | `CLID`/`SM` from Clarity + `fr` from Meta Pixel. Inherent to those products. Will be an industry-wide shift when Chrome finishes third-party cookie deprecation. |
| **Agentic "Low" media-type notes** | Our entries serve legitimate `text/markdown`, `application/xml`, `text/plain`, `text/html` payloads. ARD's profile media types (`application/ai-catalog+json`, `text/markdown; profile="urn:air:agent-skills"`) would misrepresent what each file actually is. |
| **The `/` → `/en/` redirect** | Deliberate — `functions/index.js` negotiates language per visitor. Removing it serves everyone English regardless of browser. |

## 4. Pitfalls I ran into

- **Thundering-herd theory was wrong.** When mobile scored low I assumed the 4 trackers were loading simultaneously and spiking TBT. That was NOT the problem — TBT was fine (60-320 ms). The real problem was the hero GSAP animation keeping the LCP element invisible. **Always look at the LCP breakdown's "element render delay" field before theorizing.**
- **Edge cache gotcha.** In-place image swaps don't invalidate Cloudflare's edge cache for the URL. Under `max-age=2592000` (30 days) the stale version served for a month regardless of deploys. Fixed by moving `/images/*` and favicon/logo to `max-age=86400, must-revalidate`. Hashed `_next/static/*` still gets 1-year immutable because the URL changes with the content.
- **Single-run Lighthouse is useless.** Lighthouse's auto-scroll triggers tracker `scroll` listeners at non-deterministic times, so each run captures a different world. Always take the median of ≥3 runs.
- **Deployment delay.** Cloudflare Pages auto-builds on push to `main` and takes ~45-90 s. Then edge cache propagation is another ~30 s. Don't re-measure immediately after push.
- **PSI quota.** Anonymous API quota is zero. Use the UI at pagespeed.web.dev or go local.

## 5. If PSI shows a regression

1. **Open the Cloudflare dashboard first.** If RUM is still ≥90, the user is seeing a good experience and the PSI delta is throttling / variance.
2. **Compare each metric to [[psi-perf-baseline-2026-10-07]].** FCP/LCP/TBT/CLS/SI individually, not just the overall score.
3. **If LCP regressed:** fetch the audit's `largest-contentful-paint-element` field. If "element render delay" is huge, something is keeping the element invisible (opacity, display:none, animation). The hero paragraph is the usual LCP element on mobile.
4. **If TBT regressed:** check if the Lighthouse run captured trackers firing. Look at `bootup-time` audit — if `connect.facebook.net`, `googletagmanager.com` or `clarity.ms` appear in the top items, the deferred-load pattern was defeated by Lighthouse's auto-scroll. That's a measurement issue, not a code issue.
5. **If BP dropped to ~77:** it's the third-party-cookies audit catching Clarity + Meta Pixel cookies in that particular run. Not fixable without disabling a tracker.

## 6. New analytics tracker — the right pattern

If the user wants to add another tracker (TikTok Pixel, LinkedIn Insight, Hotjar, etc.), copy the shape of `components/microsoft-clarity.tsx`:

- `'use client'` component
- `useEffect` that seeds the queue/shim synchronously (no network)
- First-interaction listeners (`pointerdown`, `keydown`, `scroll`, `touchstart`, capture + once + passive) + 3 s fallback timeout
- Inject the real script tag only in the `load()` function
- Clean up timers + listeners on unmount
- Add `<Component />` to `components/site-document.tsx` body

Document the trade-off in the component header: what the tracker is, why it is deferred, and whether it shares `window.dataLayer` with GTM.

## 7. Hard constraints that bound the solution space

- **Next.js `output: 'export'`** — no server, no middleware, no route handlers. All logic is client-side. Response headers via `public/_headers`; agent-aware content negotiation via Pages Functions in `functions/`.
- **Cloudflare Pages Free plan** — Pages Functions quota 100k/day. Scope middleware per-locale (`functions/<locale>/_middleware.js`), never at root.
- **Trilingual (en/es/fr)** — every page edit replicates across three locales. The `functions/index.js` redirect at `/` negotiates language.
- **4 analytics trackers are policy, not accident** — see each component's header comment for the trade-off reasoning.

If a proposed fix bumps against any of these, surface the conflict in the message to the user before implementing.
