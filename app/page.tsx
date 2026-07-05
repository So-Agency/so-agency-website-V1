'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    // For static export on Vercel, we need client-side redirect
    // Server-side _redirects will handle bots and JS-disabled browsers
    // This is a fallback for when the browser runs JavaScript
    
    // Check stored locale preference first
    const stored = localStorage.getItem('so-agency-locale')
    if (stored === 'es' || stored === 'en') {
      window.location.replace(`/${stored}/`)
      return
    }

    // Fall back to browser language detection
    const lang = navigator.language?.toLowerCase() ?? 'en'
    const locale = lang.startsWith('es') ? 'es' : 'en'
    
    // Use a small delay to prevent flash of blank page
    const timer = setTimeout(() => {
      window.location.replace(`/${locale}/`)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Render a minimal loading state while redirect happens
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-foreground">Redirecting...</div>
    </div>
  )
}
