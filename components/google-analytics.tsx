'use client'

import { useEffect } from 'react'

/**
 * Google Analytics 4 (gtag.js), loaded with the same first-interaction-or-3s
 * deferral as the Meta Pixel (components/meta-pixel.tsx). The two together
 * were going to add ~130 KB of blocking script to the critical path if left
 * at Google's recommended "put it in <head>" placement; the deferral keeps
 * the TBT win from the Meta Pixel commit intact.
 *
 * The gtag queue (window.dataLayer) and the `js` / `config` calls fire
 * immediately on mount, because they are only array pushes - no network -
 * and because the `js` timestamp records when the page view actually
 * happened in the visitor's browser, which we want to be the real mount
 * time, not three seconds later. The gtag.js script itself is injected on
 * the first real interaction or after a 3-second fallback, and drains the
 * queue when it loads.
 *
 * Measurement ID is pinned here rather than read from an env var: this is
 * a static export with no runtime config, and the ID is public anyway (it
 * is embedded in every GA hit). Change it here if the GA property changes.
 */

const MEASUREMENT_ID = 'G-FQ89VPJT4H'
const FALLBACK_DELAY_MS = 3000

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    // Set up the queue + gtag shim synchronously. Both are free of network
    // activity and must exist before any `gtag(...)` call is made.
    window.dataLayer = window.dataLayer || []
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args)
      }
    window.gtag('js', new Date())
    window.gtag('config', MEASUREMENT_ID)

    let loaded = false
    const timers: number[] = []
    const listeners: Array<[keyof WindowEventMap, EventListener]> = []

    function load() {
      if (loaded) return
      loaded = true

      for (const timer of timers) window.clearTimeout(timer)
      for (const [event, handler] of listeners) {
        window.removeEventListener(event, handler, { capture: true } as EventListenerOptions)
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
      document.head.appendChild(script)
    }

    const triggerEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'scroll',
      'touchstart',
    ]
    for (const event of triggerEvents) {
      const handler: EventListener = () => load()
      window.addEventListener(event, handler, { capture: true, once: true, passive: true })
      listeners.push([event, handler])
    }

    timers.push(window.setTimeout(load, FALLBACK_DELAY_MS))

    return () => {
      for (const timer of timers) window.clearTimeout(timer)
      for (const [event, handler] of listeners) {
        window.removeEventListener(event, handler, { capture: true } as EventListenerOptions)
      }
    }
  }, [])

  return null
}
