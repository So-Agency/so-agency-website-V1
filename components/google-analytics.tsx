'use client'

import { useEffect } from 'react'

const MEASUREMENT_ID = 'G-FQ89VPJT4H'
const SCRIPT_ID = 'so-agency-google-analytics'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    soAgencyGoogleAnalyticsInitialized?: boolean
  }
}

/** GA4 owns this stream directly; GTM must not configure the same stream again. */
export function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function () {
      // Google consumes commands as Arguments objects, not plain arrays.
      // A regular function supplies its own arguments object.
      window.dataLayer!.push(arguments)
    }

    // Effects can replay or remount. Bootstrap only once per browser document.
    // GA4 enhanced measurement handles subsequent browser history changes.
    if (!window.soAgencyGoogleAnalyticsInitialized) {
      window.gtag('js', new Date())
      window.gtag('config', MEASUREMENT_ID)
      window.soAgencyGoogleAnalyticsInitialized = true
    }

    // Load asynchronously on mount so brief visits can be measured too.
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
      document.head.appendChild(script)
    }
  }, [])

  return null
}
