/** Change to false and rebuild to hide the banner. This never grants consent. */
export const CONSENT_BANNER_ENABLED = true
export const CONSENT_KEY = 'so-agency-consent-v1'
export const CONSENT_OPEN_EVENT = 'so-agency-open-consent'
const MAX_AGE = 180 * 24 * 60 * 60 * 1000
export type Consent = { version: 1; analytics: boolean; marketing: boolean; savedAt: number }

export function readConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
    return value?.version === 1 && typeof value.analytics === 'boolean' &&
      typeof value.marketing === 'boolean' && typeof value.savedAt === 'number' &&
      value.savedAt <= Date.now() && Date.now() - value.savedAt < MAX_AGE ? value : null
  } catch { return null }
}

export function consentSignals(consent: Pick<Consent, 'analytics' | 'marketing'>) {
  return {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  }
}

/** Remove first-party tracker cookies on withdrawal, including parent-domain cookies. */
export function clearTrackingCookies() {
  const host = location.hostname.split('.')
  const domains = ['', ...host.map((_, i) => '.' + host.slice(i).join('.'))]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!/^(_ga($|_)|_gid$|_gat|_gcl_|_fbp$|_fbc$|_clck$|_clsk$)/.test(name)) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}
