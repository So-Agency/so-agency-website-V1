import type { Metadata, Viewport } from 'next'
import { BRAND_TITLE } from '@/lib/brand'
import { BASE_URL } from '@/lib/site'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5c000',
}

// Defaults for the two routes that sit outside a locale: the root redirect and
// the global 404. app/[locale]/layout.tsx replaces the language-dependent fields
// (description, keywords, Open Graph, Twitter) for the real pages.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: BRAND_TITLE,
  description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
  keywords: ['web design', 'digital agency', 'web development', 'branding', 'digital marketing', 'SO Agency'],
  generator: 'v0.app',
  openGraph: {
    title: BRAND_TITLE,
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    url: BASE_URL,
    siteName: 'SO Agency',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_TITLE,
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  authors: [{ name: 'SO Agency', url: BASE_URL }],
}

/**
 * Deliberately renders no <html>. This layout sits above the [locale] segment,
 * so it cannot know which language a page is in; the document itself is
 * rendered one level down by <SiteDocument>, where the language is known.
 *
 * It still has to exist: Next requires a root layout, the global stylesheet is
 * imported here, and the metadata above is the fallback every route inherits.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
