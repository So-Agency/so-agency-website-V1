'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDictionary, defaultLocale, localeMeta, localeFromPathname } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/types'
import { SiteDocument } from '@/components/site-document'
import { RightClickCTA } from '@/components/right-click-cta'
import { RocketCrash } from '@/components/rocket-crash'
import { Button } from '@/components/ui/button'

// Root-level 404 page — handles all undefined routes
// Automatically detects locale from URL and displays appropriate language
export default function NotFound() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Detect locale from current URL pathname
    setLocale(localeFromPathname(window.location.pathname))
  }, [])

  const dict = getDictionary(locale)
  const homeLink = `/${locale}/`
  const contactLink = `/${locale}/#contact`

  // One static 404.html serves every locale, so it is exported as English and
  // corrected here once the URL has revealed which language the visitor was in.
  return (
    <SiteDocument lang={localeMeta[locale].langTag}>
    <RightClickCTA dict={dict} />
    <div className="h-screen overflow-hidden bg-background flex flex-col items-center justify-center px-4">
      {/* Background gradient accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
        {/* Animated Rocket */}
        <RocketCrash />

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
          {dict.notFound.headline}
        </h1>

        {/* Subheading */}
        <h2 className="text-lg sm:text-xl text-accent font-semibold">
          {dict.notFound.subheading}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
          {dict.notFound.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-2 text-base font-semibold"
          >
            <Link href={homeLink}>
              {dict.notFound.backHome}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border hover:bg-card px-8 py-2 text-base font-semibold"
          >
            <Link href={contactLink}>
              {dict.notFound.contactUs}
            </Link>
          </Button>
        </div>

        {/* Easter egg text */}
        <p className="text-xs text-muted-foreground opacity-40 pt-2">
          {dict.notFound.easterEgg}
        </p>
      </div>
    </div>
    </SiteDocument>
  )
}
