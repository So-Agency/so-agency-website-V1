'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    // Check stored preference first
    const stored = localStorage.getItem('so-agency-locale')

    if (stored === 'es' || stored === 'en') {
      window.location.replace(`/${stored}/`)
      return
    }

    // Fall back to browser language
    const lang = navigator.language?.toLowerCase() ?? 'en'
    const locale = lang.startsWith('es') ? 'es' : 'en'
    window.location.replace(`/${locale}/`)
  }, [])

  // Render nothing while redirecting — Cloudflare _redirects handles bots
  return null
}
