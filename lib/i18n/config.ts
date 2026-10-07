import type { Locale } from './types'

/**
 * Locale configuration that is not copy: which locales exist, and the standard
 * tags each one maps to.
 *
 * It lives apart from the dictionaries on purpose. Client components that only
 * need the locale list (the language switcher, the root redirect) import from
 * here, so they do not drag every translation into their bundle.
 */
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'es']

type LocaleMeta = {
  /** BCP 47 tag, used for <html lang>, hreflang and JSON-LD inLanguage. */
  langTag: string
  /** Open Graph locale, in its language_TERRITORY form. */
  ogLocale: string
  /** The language's own name. Shown untranslated, so a reader can always find theirs. */
  nativeName: string
  /** English name, the form schema.org expects for availableLanguage. */
  englishName: string
}

/**
 * The route segment stays short (/en/, /es/) while the tags published to
 * browsers, crawlers and social scrapers can be as specific as each market needs.
 * Typed as a Record so adding a Locale without describing it here fails to compile.
 */
export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { langTag: 'en', ogLocale: 'en_US', nativeName: 'English', englishName: 'English' },
  es: { langTag: 'es', ogLocale: 'es_ES', nativeName: 'Español', englishName: 'Spanish' },
}

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale)
}

/** The locale a path belongs to, read from its first segment: "/es/anything" is "es". */
export function localeFromPathname(pathname: string): Locale {
  const [first] = pathname.split('/').filter(Boolean)
  return isLocale(first) ? first : defaultLocale
}
