'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from './google-analytics'
import { GoogleTagManager } from './google-tag-manager'
import { MetaPixel } from './meta-pixel'
import { MicrosoftClarity } from './microsoft-clarity'
import { CONSENT_BANNER_ENABLED, CONSENT_KEY, CONSENT_OPEN_EVENT, readConsent, consentSignals, clearTrackingCookies, type Consent } from '@/lib/consent'
import { consentCopy } from '@/lib/i18n/consent'
import { localeFromPathname } from '@/lib/i18n/config'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const button = 'rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
const denied = { analytics: false, marketing: false }

export function ConsentManager({ lang }: { lang: string }) {
  const locale = localeFromPathname('/' + lang.split('-')[0] + '/')
  const copy = consentCopy[locale]
  const [ready, setReady] = useState(false)
  const [consent, setConsent] = useState<Consent | null>(null)
  const [open, setOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments) }
    window.gtag('consent', 'default', consentSignals(denied))
    const saved = readConsent()
    if (saved) window.gtag('consent', 'update', consentSignals(saved))
    else clearTrackingCookies()
    setConsent(saved)
    setReady(true)
    const show = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      setOpen(true)
    }
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) window.location.reload()
    }
    window.addEventListener(CONSENT_OPEN_EVENT, show)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, show)
      window.removeEventListener('storage', sync)
    }
  }, [])

  function save(next: typeof denied) {
    const value: Consent = { ...next, version: 1, savedAt: Date.now() }
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(value)) } catch {
      // Without persistence, a reload still returns to denied defaults.
    }
    window.gtag?.('consent', 'update', consentSignals(value))
    const withdrawing = (consent?.analytics && !next.analytics) || (consent?.marketing && !next.marketing)
    if (withdrawing) {
      clearTrackingCookies()
      // Removing a script does not stop its running code. Reload to stop all vendors.
      window.location.reload()
      return
    }
    setConsent(value)
    setOpen(false)
  }

  return <>
    {ready && consent?.analytics ? <><GoogleAnalytics /><MicrosoftClarity /></> : null}
    {ready && consent?.marketing ? <MetaPixel /> : null}
    {/* Until the remote container is audited, only load it with both permissions. */}
    {ready && consent?.analytics && consent.marketing ? <GoogleTagManager /> : null}
    {ready && !consent && !open && CONSENT_BANNER_ENABLED ?
      <section aria-label={copy.title} className="fixed inset-x-3 bottom-3 z-[10000] mx-auto max-w-5xl rounded-2xl border border-white/15 bg-[#11141b]/95 p-4 text-white shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-6 sm:p-5" style={{ bottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="flex-1"><h2 className="text-sm font-semibold">{copy.title}</h2><p className="mt-1 text-xs leading-relaxed text-gray-300">{copy.description}</p></div>
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
          <button type="button" className={button} onClick={() => save({ analytics: true, marketing: true })}>{copy.accept}</button>
          <button type="button" className={button} onClick={() => save(denied)}>{copy.reject}</button>
          <button type="button" className={button} onClick={() => { setAnalytics(false); setMarketing(false); setOpen(true) }}>{copy.configure}</button>
        </div>
      </section> : null}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[10002] max-h-[85dvh] overflow-y-auto" showCloseButton={false}>
        <DialogTitle>{copy.preferences}</DialogTitle>
        <DialogDescription>{copy.details}</DialogDescription>
        <p className="text-sm text-muted-foreground">{copy.necessary}</p>
        <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"><input className="size-4 accent-yellow-400" type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />{copy.analytics}</label>
        <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"><input className="size-4 accent-yellow-400" type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} />{copy.marketing}</label>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={button} onClick={() => save({ analytics, marketing })}>{copy.save}</button>
          <button type="button" className={button} onClick={() => save(denied)}>{copy.reject}</button>
          <button type="button" className={button} onClick={() => setOpen(false)}>{copy.close}</button>
        </div>
      </DialogContent>
    </Dialog>
  </>
}

export function CookiePreferences() {
  const [locale, setLocale] = useState<'en' | 'es' | 'fr'>('en')
  useEffect(() => { setLocale(localeFromPathname(window.location.pathname)) }, [])
  return <button type="button" className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>{consentCopy[locale].preferences}</button>
}
