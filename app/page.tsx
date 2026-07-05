'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Check stored preference first
    const stored = typeof window !== 'undefined'
      ? localStorage.getItem('so-agency-locale')
      : null

    if (stored === 'es' || stored === 'en') {
      router.replace(`/${stored}/`)
      return
    }

    // Fall back to browser language
    const lang = navigator.language?.toLowerCase() ?? 'en'
    const locale = lang.startsWith('es') ? 'es' : 'en'
    router.replace(`/${locale}/`)
  }, [router])

  // Render nothing while redirecting — Cloudflare _redirects handles bots
  return null
}
