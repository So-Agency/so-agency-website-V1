'use client'

import { useEffect } from 'react'

/**
 * Microsoft Clarity (session recording + heatmaps), loaded with the same
 * first-interaction-or-3s deferral as the Meta Pixel and GA4. Clarity's own
 * snippet injects the ~70 KB tag script into <head> immediately; left as-is
 * on top of the other two trackers that would push TBT right back where it
 * started.
 *
 * Clarity's own shim queues calls as clarity.q before the real tag arrives,
 * so defining it synchronously on mount is safe and lets any clarity('set',
 * ...) call made during the first few seconds survive and replay once the
 * network script lands. The script tag is the only thing deferred.
 *
 * Clarity reconstructs the session timeline from the first event it sees
 * after it loads - it does not require being present during the paint - so
 * the 3-second floor only costs the first 3 s of mouse-movement data, not
 * the entire session.
 *
 * Project ID is pinned here. Same reasoning as components/google-analytics.tsx:
 * static export, the ID is public in every outbound hit, no runtime env.
 */

const PROJECT_ID = 'schuea25do'
const FALLBACK_DELAY_MS = 3000

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

export function MicrosoftClarity() {
  useEffect(() => {
    // Shim: queue calls until the real tag script arrives.
    if (!window.clarity) {
      const shim = function clarity(...args: unknown[]) {
        ;(shim.q = shim.q || []).push(args)
      } as Window['clarity'] & { q: unknown[][] }
      shim.q = []
      window.clarity = shim
    }

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
      script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`
      const first = document.getElementsByTagName('script')[0]
      if (first && first.parentNode) {
        first.parentNode.insertBefore(script, first)
      } else {
        document.head.appendChild(script)
      }
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
