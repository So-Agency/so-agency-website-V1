import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/types'
import { locales } from '@/lib/i18n'
import { SchemaMarkup } from '@/components/schema-markup'

const BASE_URL = 'https://soagency.dev'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = locale as Locale

  const titles: Record<Locale, string> = {
    en: 'SO Agency | Design. Build. Launch.',
    es: 'SO Agency | Diseña. Construye. Lanza.',
  }
  const descriptions: Record<Locale, string> = {
    en: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    es: 'Transformamos tus ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas.',
  }

  return {
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
    alternates: {
      canonical: `${BASE_URL}/${lang}/`,
      languages: {
        'en': `${BASE_URL}/en/`,
        'es': `${BASE_URL}/es/`,
        'x-default': `${BASE_URL}/en/`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = (locales.includes(locale as Locale) ? locale : 'en') as Locale

  return (
    <>
      <SchemaMarkup locale={lang} baseUrl={BASE_URL} />
      {children}
    </>
  )
}
