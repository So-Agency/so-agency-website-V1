'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import type { Dictionary, Locale } from '@/lib/i18n/types'
import { locales, localeMeta, localeFromPathname, LOCALE_PREFERENCE_KEY } from '@/lib/i18n/config'

export function LanguageSwitcher({ dict }: { dict: Dictionary }) {
  const pathname = usePathname()
  const router = useRouter()

  // Derive the current locale from the URL path (e.g. /en/ or /es/contact)
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = localeFromPathname(pathname)

  function switchLocale(next: Locale) {
    if (next === currentLocale) return

    // Persist preference. localStorage is what the client-side redirect in
    // app/page.tsx reads; the cookie carries the same choice to the server, which
    // on Cloudflare answers "/" before any page loads (functions/index.js).
    localStorage.setItem(LOCALE_PREFERENCE_KEY, next)
    document.cookie = `${LOCALE_PREFERENCE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`

    // Replace the locale segment in the current path
    const rest = segments.slice(1).join('/')
    const target = `/${next}/${rest}${rest ? '' : ''}`
    router.push(target)
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label={dict.languageSwitcher.label}>
      <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            // The accessible name starts with the visible label (EN/ES/FR) so
            // screen readers and voice-control match it to what the user says.
            // WCAG 2.5.3 - label in name; Lighthouse flagged this as a mismatch.
            aria-label={`${locale.toUpperCase()} - ${dict.languageSwitcher.switchTo.replace('{language}', localeMeta[locale].nativeName)}`}
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
          {i < locales.length - 1 && (
            <span className="text-muted-foreground/40 text-xs select-none">|</span>
          )}
        </span>
      ))}
    </div>
  )
}
