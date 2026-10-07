import type { Metadata } from 'next'
import { getDictionary, locales, localeMeta, defaultLocale, isLocale } from '@/lib/i18n'
import { BRAND_TITLE } from '@/lib/brand'
import { BASE_URL } from '@/lib/site'
import { SiteDocument } from '@/components/site-document'
import { SchemaMarkup } from '@/components/schema-markup'
import { RightClickCTA } from '@/components/right-click-cta'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: param } = await params
  const locale = isLocale(param) ? param : defaultLocale
  const { description, keywords } = getDictionary(locale).meta
  const url = `${BASE_URL}/${locale}/`

  // Open Graph and Twitter are restated in full rather than patched: Next replaces
  // a nested metadata object wholesale, so anything left out here would vanish
  // instead of falling back to the root layout's value.
  return {
    title: BRAND_TITLE,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [localeMeta[l].langTag, `${BASE_URL}/${l}/`]),
        ),
        'x-default': `${BASE_URL}/${defaultLocale}/`,
      },
    },
    openGraph: {
      title: BRAND_TITLE,
      description,
      url,
      siteName: 'SO Agency',
      type: 'website',
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeMeta[l].ogLocale),
    },
    twitter: {
      card: 'summary_large_image',
      title: BRAND_TITLE,
      description,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: param } = await params
  const locale = isLocale(param) ? param : defaultLocale

  return (
    <SiteDocument lang={localeMeta[locale].langTag}>
      <RightClickCTA />
      <SchemaMarkup locale={locale} baseUrl={BASE_URL} />
      {children}
    </SiteDocument>
  )
}
