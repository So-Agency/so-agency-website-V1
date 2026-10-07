export type { Dictionary, Locale } from './types'
export { en } from './en'
export { es } from './es'
export { fr } from './fr'
export { defaultLocale, locales, localeMeta, isLocale, localeFromPathname } from './config'

import type { Locale, Dictionary } from './types'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'

export const dictionaries: Record<Locale, Dictionary> = { en, es, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en
}
