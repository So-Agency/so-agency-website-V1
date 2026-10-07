import { negotiateMarkdown } from "../../lib/markdown-negotiation.mjs"

/** Scoped to /fr/* — see functions/en/_middleware.js for why this is not at the root. */
export async function onRequest(context) {
  const { pathname } = new URL(context.request.url)

  if (pathname !== "/fr" && pathname !== "/fr/") return context.next()

  return negotiateMarkdown(context, "/fr/index.md")
}
