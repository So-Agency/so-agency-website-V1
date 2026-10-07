# SO Agency website

The marketing site for [SO Agency](https://soagency.dev), a digital agency that designs,
builds and launches websites, online stores and brand identities.

It is a single landing page published once per language — currently English (`/en/`) and
Spanish (`/es/`) — and exported as static HTML. There is no server, no API and no database.
The only way a visitor makes contact is WhatsApp.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) with `output: 'export'` |
| UI | React 19, Tailwind CSS 4, shadcn/ui primitives, lucide icons |
| Motion | GSAP, Lenis (smooth scroll) |
| Hosting | Cloudflare Pages, plus two small Pages Functions |
| Analytics | Meta Pixel, Vercel Analytics |
| Package manager | pnpm |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000, redirects to /en/ or /es/
```

Before committing:

```bash
npx tsc --noEmit  # type-check
pnpm build        # writes the static site to out/
```

Run the type-check yourself. `next.config.mjs` sets `typescript.ignoreBuildErrors`, so a
build succeeds even when the types are wrong.

`pnpm start` and `pnpm lint` are leftovers from the project template and do not work:
`next start` cannot serve a static export, and ESLint is not installed. To preview the
export the way Cloudflare serves it, headers and Functions included, see
[AGENT-READINESS.md](AGENT-READINESS.md#testing-it-locally).

## Project structure

```
app/
  layout.tsx            Root layout. Renders no <html>: it cannot know the language.
  page.tsx              "/" — sends the visitor to their language.
  not-found.tsx         The 404 for every unmatched URL.
  [locale]/
    layout.tsx          The document for one language: <html lang>, metadata, JSON-LD.
    page.tsx            The landing page: navbar, hero, services, … footer.
components/             One file per page section, plus shared pieces.
  site-document.tsx     <html>, fonts, Meta Pixel and the chrome every page shares.
  schema-markup.tsx     JSON-LD structured data.
  webmcp-tools.tsx      Tools exposed to in-browser AI agents.
  ui/                   shadcn/ui primitives.
lib/
  i18n/                 Languages: configuration, types and one dictionary each.
  brand.ts              Tagline and page title. Never translated.
  contact.ts            The WhatsApp link and contact-click tracking.
  site.ts               The site's canonical URL.
functions/              Cloudflare Pages Functions (markdown for AI agents).
public/                 Static files, including the agent-discovery documents.
out/                    The built site.
```

## Languages

All copy lives in `lib/i18n/`, one dictionary per language (`en.ts`, `es.ts`). Each is
typed as `Dictionary` (`types.ts`), so a language that is missing a string does not
compile. Components receive the dictionary as a `dict` prop and never choose text
themselves.

`lib/i18n/config.ts` holds what is configuration rather than copy: the list of locales,
the default, and the tags each locale publishes — its BCP 47 tag (`<html lang>`,
`hreflang`), its Open Graph locale and its name. The URL segment stays short (`/es/`)
while those tags can be as specific as a market needs.

Three rules keep the languages from drifting apart:

- **No text in components.** Visible copy, `aria-label`s and prefilled WhatsApp messages
  all go through the dictionary. Strings with a variable use a `{placeholder}` that the
  component replaces.
- **No branching on the locale.** `locale === 'en' ? … : …` is right for two languages
  and silently wrong for a third. Add a dictionary key instead.
- **The tagline is not copy.** `DESIGN. BUILD. LAUNCH.` is the same in every language and
  lives in `lib/brand.ts`, outside the dictionaries, so there is no slot to translate.

### Adding a language

The compiler walks you through the first three steps: once the code is in the `Locale`
type, the project does not type-check until the other two are done. The rest are plain
files it cannot see.

1. Add the code to the `Locale` type in `lib/i18n/types.ts`.
2. Write its dictionary in `lib/i18n/<code>.ts` and register it in `lib/i18n/index.ts`.
3. Describe it in `localeMeta` in `lib/i18n/config.ts`. That alone adds it to the
   routes, the language switcher, the `hreflang` alternates and the languages the
   JSON-LD says the agency can be contacted in.
4. Run `npx tsc --noEmit` until it passes.
5. Add `public/<code>/index.md`, the markdown twin of the page, and
   `functions/<code>/_middleware.js` to serve it (copy an existing one).
6. Add the page and its alternates to `public/sitemap.xml`, and a rule for it to
   `public/_headers`.
7. List it in `public/llms.txt`, `public/.well-known/ai-catalog.json`, `public/auth.md`
   and the agent skill. Editing the skill invalidates its checksum — see
   [AGENT-READINESS.md](AGENT-READINESS.md#maintenance).

Pricing, timelines and FAQ answers are repeated outside the dictionaries, in the markdown
twins, `llms.txt` and the agent skill. Changing one means changing all of them.

## Contact and tracking

Every contact link is built by `whatsappUrl()` in `lib/contact.ts` and rendered through
`<WhatsAppLink>`, which opens the chat in a new tab with a message already written and
reports a `Contact` event to the Meta Pixel. Link to WhatsApp any other way and the click
goes untracked.

## Deployment

Cloudflare Pages builds the site with `pnpm run build` and serves `out/`. Setup and
troubleshooting are in [CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md). `main` is the
production branch.

`out/` is also committed, rebuilt with each change, so a commit shows what it did to the
published HTML.

On Cloudflare, `/` is redirected to `/en/` by `public/_redirects` before any page loads.
The language detection in `app/page.tsx` only runs where that rule does not apply, such
as local development.

## AI agents

The site publishes machine-readable descriptions of itself: `llms.txt`, a capability
catalog, an agent skill, a markdown version of each page, and in-browser tools.
[AGENT-READINESS.md](AGENT-READINESS.md) explains what exists, what is deliberately
absent, and how to verify a deploy.

## Origins

The project was bootstrapped with [v0](https://v0.app) and is linked to a
[v0 project](https://v0.app/chat/projects/prj_wvnFzXrnlufoBOw71xP3wPzIJ4ov), which can
push commits to this repository.
