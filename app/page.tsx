'use client'

import { useEffect } from 'react'
import { SiteDocument } from '@/components/site-document'
import { defaultLocale, locales, isLocale } from '@/lib/i18n/config'

export default function RootPage() {
  useEffect(() => {
    // For static export on Vercel, we need client-side redirect
    // Server-side _redirects will handle bots and JS-disabled browsers
    // This is a fallback for when the browser runs JavaScript
    
    // Check stored locale preference first
    const stored = localStorage.getItem('so-agency-locale')
    if (isLocale(stored)) {
      window.location.replace(`/${stored}/`)
      return
    }

    // Fall back to browser language detection: the first supported locale the
    // browser's language starts with ("es-CO" is served "es"), English otherwise.
    const lang = navigator.language?.toLowerCase() ?? defaultLocale
    const locale = locales.find((l) => lang.startsWith(l)) ?? defaultLocale

    // Use a small delay to prevent flash of blank page
    const timer = setTimeout(() => {
      window.location.replace(`/${locale}/`)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Render a minimal loading state while redirect happens
  return (
    <SiteDocument lang="en">
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground">Redirecting...</div>
      </div>
    </SiteDocument>
  )
}
