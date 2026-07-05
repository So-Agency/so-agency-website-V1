'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { RocketCrash } from '@/components/rocket-crash'
import { Button } from '@/components/ui/button'

// Bilingual 404 page — automatically detects locale from URL
// Displays Spanish copy when accessed from /es/, English from /en/
export default function NotFound() {
  const [dict, setDict] = useState(getDictionary('en'))
  const [locale, setLocale] = useState<'en' | 'es'>('en')

  useEffect(() => {
    // Detect locale from current URL pathname
    const path = typeof window !== 'undefined' ? window.location.pathname : '/en/'
    const detectedLocale = path.startsWith('/es') ? 'es' : 'en'
    setLocale(detectedLocale)
    setDict(getDictionary(detectedLocale))
  }, [])

  const homeLink = locale === 'es' ? '/es/' : '/en/'
  const contactLink = locale === 'es' ? '/es/#contact' : '/en/#contact'

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Background gradient accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated Rocket */}
        <div className="mb-8 sm:mb-12">
          <RocketCrash />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-2">
          {dict.notFound.headline}
        </h1>

        {/* Subheading */}
        <h2 className="text-xl sm:text-2xl text-accent font-semibold mb-4">
          {dict.notFound.subheading}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-lg mx-auto">
          {dict.notFound.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        <p className="text-xs text-muted-foreground mt-16 opacity-50">
          Houston, we have a problem... 🚀
        </p>
      </div>
    </div>
  )
}
