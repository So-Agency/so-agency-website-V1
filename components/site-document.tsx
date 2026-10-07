import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { BRAND_TITLE } from '@/lib/brand'
import { BASE_URL } from '@/lib/site'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'
import { MetaPixel } from '@/components/meta-pixel'
import { GoogleAnalytics } from '@/components/google-analytics'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display" })
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","500","700","900"], variable: "--font-roboto" })

/**
 * The <html> document every route renders into: head tags, fonts, the Meta
 * Pixel and the chrome shared by every page (stars, cursor, smooth scroll).
 *
 * This used to be the body of app/layout.tsx. It moved out because the root
 * layout sits above the [locale] segment and so can never know the language:
 * it stamped lang="en" on every page, Spanish included. Each route now renders
 * this itself and passes the language it actually is.
 */
export function SiteDocument({
  lang,
  children,
}: {
  /** BCP 47 tag for <html lang>. */
  lang: string
  children: React.ReactNode
}) {
  return (
    <html lang={lang} className="dark bg-background scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={BRAND_TITLE} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
      </head>
      <body className={`font-sans antialiased ${_audiowide.variable} ${_roboto.variable}`}>
        <MetaPixel />
        <GoogleAnalytics />

        <StarBackground />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
