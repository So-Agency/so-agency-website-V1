'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import type { Locale } from '@/lib/i18n/types'

const LOCALES: Locale[] = ['en', 'es']

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Derive the current locale from the URL path (e.g. /en/ or /es/contact)
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale: Locale =
    LOCALES.includes(segments[0] as Locale) ? (segments[0] as Locale) : 'en'

  function switchLocale(next: Locale) {
    if (next === currentLocale) return

    // Persist preference
    localStorage.setItem('so-agency-locale', next)

    // Replace the locale segment in the current path
    const rest = segments.slice(1).join('/')
    const target = `/${next}/${rest}${rest ? '' : ''}`
    router.push(target)
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
      {LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            aria-label={`Switch to ${locale === 'en' ? 'English' : 'Español'}`}
            aria-pressed={currentLocale === locale}
            className={[
              'text-sm font-medium px-1 transition-colors',
              currentLocale === locale
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            {locale.toUpperCase()}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="text-muted-foreground/40 text-xs select-none">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
