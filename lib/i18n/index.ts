export type { Dictionary, Locale } from './types'
export { en } from './en'
export { es } from './es'

import type { Locale, Dictionary } from './types'
import { en } from './en'
import { es } from './es'

export const dictionaries: Record<Locale, Dictionary> = { en, es }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en
}

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'es']
