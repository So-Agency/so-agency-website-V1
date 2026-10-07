import type { Locale } from '@/lib/i18n/types'
import { getDictionary, locales, localeMeta } from '@/lib/i18n'
import { WHATSAPP_URL } from '@/lib/contact'
import { BRAND_TITLE } from '@/lib/brand'

type Props = {
  locale: Locale
  baseUrl: string
}

// The languages the agency can be contacted in are the languages the site is
// published in. Deriving them keeps the two from disagreeing - and means that
// adding a locale is also a public statement that enquiries in it are answered.
const availableLanguage = locales.map((l) => localeMeta[l].englishName)
const knowsLanguage = locales.map((l) => localeMeta[l].langTag)

export function SchemaMarkup({ locale, baseUrl }: Props) {
  const dict = getDictionary(locale)
  const { description, catalogName, home, services } = dict.structuredData
  // The same entries the visitor reads in the FAQ section. Google requires FAQ
  // markup to match the visible page, and one source cannot drift from itself.
  const faqs = dict.faq.items
  const { langTag } = localeMeta[locale]
  const pageUrl = `${baseUrl}/${locale}/`

  const graph = [
    // 1. Organization
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'SO Agency',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      description,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage,
        url: WHATSAPP_URL,
      },
      sameAs: [
        'https://soagency.dev',
        'https://www.instagram.com/soagency.dev',
      ],
      foundingDate: '2023',
      knowsLanguage,
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide',
      },
    },
    // 2. WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'SO Agency',
      description,
      publisher: { '@id': `${baseUrl}/#organization` },
      inLanguage: [langTag],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/${locale}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: BRAND_TITLE,
      description,
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#organization` },
      inLanguage: langTag,
    },
    // 4. ProfessionalService with OfferCatalog
    {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#service`,
      name: 'SO Agency',
      url: pageUrl,
      image: `${baseUrl}/og-image.png`,
      description,
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Credit Card, Bank Transfer',
      openingHours: 'Mo-Fr 09:00-18:00',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: catalogName,
        itemListElement: services.map((svc, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            provider: { '@id': `${baseUrl}/#organization` },
            url: pageUrl,
          },
        })),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage,
        url: WHATSAPP_URL,
      },
    },
    // 5. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: home,
          item: pageUrl,
        },
      ],
    },
    // 6. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
