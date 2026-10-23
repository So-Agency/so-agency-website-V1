'use client'

import { useEffect } from 'react'

/**
 * Mounted only after marketing consent by ConsentManager. Loading is deferred
 * until interaction or three seconds after consent. No noscript fallback:
 * it would bypass the visitor's choice. Vendor script IDs prevent remount duplicates.
 */

const PIXEL_ID = '1589857299225670'
const FALLBACK_DELAY_MS = 3000

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      queue?: unknown[][]
      callMethod?: (...args: unknown[]) => void
      push?: (...args: unknown[]) => void
      loaded?: boolean
      version?: string
    }
    _fbq?: unknown
  }
}

export function MetaPixel() {
  useEffect(() => {
    if (document.getElementById("so-agency-meta-pixel")) return
    let loaded = false
    const timers: number[] = []
    const listeners: Array<[keyof WindowEventMap, EventListener]> = []

    function load() {
      if (loaded) return
      loaded = true

      // Clean up triggers so the pixel only loads once.
      for (const timer of timers) window.clearTimeout(timer)
      for (const [event, handler] of listeners) {
        window.removeEventListener(event, handler, { capture: true } as EventListenerOptions)
      }

      // The classic Meta Pixel bootstrap, condensed. Queues calls until fbevents.js
      // arrives, then replays them against the real fbq.
      const n: Window['fbq'] = function (...args: unknown[]) {
        n!.callMethod ? n!.callMethod.apply(n, args) : n!.queue!.push(args)
      } as Window['fbq']
      window.fbq = n
      if (!window._fbq) window._fbq = n
      n!.push = n as unknown as (...args: unknown[]) => void
      n!.loaded = true
      n!.version = '2.0'
      n!.queue = []

      const script = document.createElement('script')
      script.id = "so-agency-meta-pixel"
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)

      window.fbq!('init', PIXEL_ID)
      window.fbq!('track', 'PageView')
    }

    // First real interaction wins. Capture-phase listeners so handlers that
    // stopPropagation inside the app do not swallow them.
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

    // Fallback: bounce visitors never interact, so fire after a short wait.
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
