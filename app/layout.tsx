import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'
import { RightClickCTA } from '@/components/right-click-cta'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display" })
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","500","700","900"], variable: "--font-roboto" })

const BASE_URL = 'https://soagency.dev'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5c000',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'SO Agency | Design. Build. Launch.',
  description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
  keywords: ['web design', 'digital agency', 'web development', 'branding', 'digital marketing', 'SO Agency'],
  generator: 'v0.app',
  openGraph: {
    title: 'SO Agency | Design. Build. Launch.',
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    url: BASE_URL,
    siteName: 'SO Agency',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SO Agency | Design. Build. Launch.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SO Agency | Design. Build. Launch." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
      </head>
      <body className={`font-sans antialiased ${_audiowide.variable} ${_roboto.variable}`}>
        <StarBackground />
        <CustomCursor />
        <RightClickCTA />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
