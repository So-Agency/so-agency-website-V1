'use client'

import { useEffect } from 'react'

/**
 * Meta (Facebook) Pixel, loaded late so it does not steal main-thread time
 * during the critical path. PageSpeed Insights was pinning most of the 450 ms
 * TBT to connect.facebook.net/en_US/fbevents.js parsing on initial load.
 *
 * The pixel initialises on the first user interaction (pointerdown / keydown /
 * scroll / touchstart) OR 3000 ms after mount, whichever comes first. Both the
 * noscript <img> fallback and the queue trampoline are kept so events logged
 * before the real script finishes still make it through.
 *
 * Why a 3 s floor at all: visitors who read the hero and leave without ever
 * scrolling still need to be counted on landing-page Meta ad campaigns, which
 * this site runs (see utm_* / fbclid handling in functions/index.js). 3 s is
 * long enough that the pixel sits outside the TBT window, short enough that
 * the fast-bounce rate it misses is dominated by bots.
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

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}
