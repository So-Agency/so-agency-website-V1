import type { Locale } from '@/lib/i18n/types'

type Props = {
  locale: Locale
  baseUrl: string
}

const descriptions: Record<Locale, string> = {
  en: 'SO Agency transforms business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
  es: 'SO Agency transforma ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas. Tu socio de lanzamiento digital.',
}

export function SchemaMarkup({ locale, baseUrl }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SO Agency',
    url: `${baseUrl}/${locale}/`,
    logo: `${baseUrl}/og-image.png`,
    description: descriptions[locale],
    inLanguage: locale,
    serviceType: [
      'Web Design',
      'Web Development',
      'UX/UI Design',
      'E-Commerce',
      'Branding & Identity',
      'Social Media Marketing',
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
      url: 'https://wa.me/message/5MH2JY5B4ERVJ1',
    },
    sameAs: [
      'https://soagency.dev',
    ],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
