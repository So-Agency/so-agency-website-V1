import { DISCOVERY_LINKS } from "../lib/markdown-negotiation.mjs"

/**
 * Language negotiation for "/": sends each visitor to the page in their language.
 *
 * The rule in public/_redirects sent everyone to /en/, whatever their browser said.
 * app/page.tsx has always contained the logic to do better - stored preference first,
 * then browser language - but it is client-side code in a page that was never served:
 * the redirect rule answered "/" before any HTML did. This is the same logic, moved to
 * where the request is actually answered.
 *
 * A file named index.js in functions/ matches "/" and nothing else, so this costs one
 * Function invocation per visit to the bare domain and none for any page or asset. That
 * is the same reasoning that keeps the markdown middleware scoped to one locale each;
 * see functions/en/_middleware.js.
 */

/** Keep in step with localeMeta in lib/i18n/config.ts. A Function cannot import TypeScript. */
const LOCALES = ["en", "es", "fr"]
const DEFAULT_LOCALE = "en"

/** Written by components/language-switcher.tsx when a visitor picks a language. */
const PREFERENCE_COOKIE = "so-agency-locale"

/** The language the visitor chose with the switcher, if it is still one we publish. */
function fromCookie(header) {
  if (!header) return null

  for (const pair of header.split(";")) {
    const [name, value] = pair.trim().split("=")
    if (name === PREFERENCE_COOKIE && LOCALES.includes(value)) return value
  }

  return null
}

/**
 * The first published language in the browser's Accept-Language, by descending weight.
 * Only the primary subtag is compared, so "es-CO" and "fr-CA" are served "es" and "fr".
 */
function fromAcceptLanguage(header) {
  if (!header) return null

  const ranked = header
    .split(",")
    .map((entry, position) => {
      const [tag, ...params] = entry.trim().split(";")
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="))
      const weight = q ? Number.parseFloat(q.slice(2)) : 1

      return {
        language: tag.trim().toLowerCase().split("-")[0],
        weight: Number.isNaN(weight) ? 0 : weight,
        position,
      }
    })
    .filter((entry) => entry.weight > 0)
    // Equal weights keep the order the browser listed them in.
    .sort((a, b) => b.weight - a.weight || a.position - b.position)

  return ranked.find((entry) => LOCALES.includes(entry.language))?.language ?? null
}

export function onRequest({ request }) {
  const { search } = new URL(request.url)

  let locale = DEFAULT_LOCALE
  try {
    locale =
      fromCookie(request.headers.get("cookie")) ??
      fromAcceptLanguage(request.headers.get("accept-language")) ??
      DEFAULT_LOCALE
  } catch {
    // A header we cannot parse must not take the homepage down. English is the default.
  }

  return new Response(null, {
    // Temporary, unlike the rule it replaces: the answer depends on who is asking, and a
    // browser that cached a permanent redirect would never ask again.
    status: 302,
    headers: {
      // The query string travels with the visitor - ad links arrive here carrying
      // utm_* and fbclid, and the Meta Pixel reads them on the page they land on.
      Location: `/${locale}/${search}`,
      Vary: "Accept-Language, Cookie",
      "Cache-Control": "no-store",
      // public/_headers does not apply to Function responses, so the discovery links
      // an agent expects on the homepage are restated here.
      Link: DISCOVERY_LINKS,
    },
  })
}
