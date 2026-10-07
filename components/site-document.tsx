import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { BRAND_TITLE } from '@/lib/brand'
import { BASE_URL } from '@/lib/site'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'
import { MetaPixel } from '@/components/meta-pixel'
import { GoogleAnalytics } from '@/components/google-analytics'
import { MicrosoftClarity } from '@/components/microsoft-clarity'
import { GoogleTagManager } from '@/components/google-tag-manager'

// Initialize fonts. Weight lists are the ones we actually use (grep-verified):
//   Tailwind classes in components/*: font-normal (400), font-medium (500),
//   font-semibold (600), font-bold (700). No thin/extralight/light/extrabold/
//   black. Each extra weight is a separate woff2 file, which on throttled 4G
//   showed up disproportionately in Mobile Lighthouse (desktop was already 99).
// display: 'swap' lets the hero H1 and other display text paint with a
//   fallback immediately and swap to the custom face when it arrives, which
//   is what moves LCP out of the font-blocking window.
const _geist = Geist({ subsets: ['latin'], weight: ["400","500","600","700"], display: 'swap' })
// Geist_Mono is only used in components/process.tsx (step number, default
// weight) - components/ui/chart.tsx references it too but is shadcn/ui dead
// code not imported anywhere. Weight 400 is enough.
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["400"], display: 'swap' })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display", display: 'swap' })
// Roboto is applied with font-bold (700) in components/hero.tsx and
// components/footer.tsx. Keeping 400 as a safe default fallback.
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","700"], variable: "--font-roboto", display: 'swap' })

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
        <MicrosoftClarity />
        <GoogleTagManager />

        <StarBackground />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
