'use client'

import { useEffect } from 'react'

/**
 * Google Tag Manager, loaded with the same first-interaction-or-3s deferral
 * as the other three trackers (Meta Pixel, GA4, Microsoft Clarity). GTM's own
 * recommended placement is in <head>, which would add another ~50-100 KB of
 * blocking fetch + eval during the critical path and undo the TBT recovery.
 *
 * The dataLayer seed and the gtm.start event push run synchronously inside
 * useEffect: both are in-memory array operations and GTM's own tags, when
 * they load, read gtm.start to measure how long before the container was
 * ready. Keeping the push immediate preserves that timing.
 *
 * ---------------------------------------------------------------------------
 * IMPORTANT - avoid duplicate hits.
 *
 * This component shares window.dataLayer with components/google-analytics.tsx
 * on purpose: that is GTM's design. The risk is if the GTM container
 * GTM-MNTQG72X is configured with its own GA4 Configuration tag using the
 * same measurement ID (G-FQ89VPJT4H) as components/google-analytics.tsx, OR
 * with its own Meta Pixel / Microsoft Clarity tags using the same IDs as the
 * two sibling trackers in this folder, every PageView will fire twice.
 *
 * One of two choices:
 *   1. Keep the direct trackers here and only use GTM for other tags
 *      (ad conversions, custom events, third-party pixels we don't own).
 *   2. Delete components/{google-analytics,meta-pixel,microsoft-clarity}.tsx
 *      and let the GTM container own all three. Keeps attribution in one
 *      place but loses the deferred-load pattern unless the tags inside the
 *      container are configured to fire on an interaction trigger.
 *
 * The repo today has option 1 wired by default (both the direct trackers and
 * the GTM container ship). Pick deliberately in the GTM console.
 * ---------------------------------------------------------------------------
 */

const CONTAINER_ID = 'GTM-MNTQG72X'
const FALLBACK_DELAY_MS = 3000

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function GoogleTagManager() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })

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
      script.src = `https://www.googletagmanager.com/gtm.js?id=${CONTAINER_ID}`
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
