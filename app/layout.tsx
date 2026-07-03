import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display" })
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","500","700","900"], variable: "--font-roboto" })

const BASE_URL = 'https://so-agency.com'

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
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'SO Agency | Design. Build. Launch.',
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    url: BASE_URL,
    siteName: 'SO Agency',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'SO Agency | Design. Build. Launch.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SO Agency | Design. Build. Launch.',
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    images: [`${BASE_URL}/og-image.png`],
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
      <body className={`font-sans antialiased ${_audiowide.variable} ${_roboto.variable}`}>
        <StarBackground />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
