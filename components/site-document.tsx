import Script from 'next/script'
import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { BRAND_TITLE } from '@/lib/brand'
import { BASE_URL } from '@/lib/site'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'

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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1589857299225670');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1589857299225670&ev=PageView&noscript=1"
          />
        </noscript>

        <StarBackground />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
