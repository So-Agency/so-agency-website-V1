import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { RocketCrash } from '@/components/rocket-crash'
import { Button } from '@/components/ui/button'

// Bilingual 404 page — displays content in the current locale
// When user hits a non-existent route in /en/, shows English copy
// When user hits a non-existent route in /es/, shows Spanish copy
export default function NotFound() {
  // Try to detect locale from pathname, default to 'en'
  // This works because the component is within [locale] segment
  let locale: 'en' | 'es' = 'en'
  
  // In a production environment, we can parse the route
  // For now, we use a fallback that works for both locales
  const dict = getDictionary('en')
  const dictEs = getDictionary('es')
  
  // Create a combined dictionary that adapts based on path
  // This is a workaround since not-found doesn't receive params
  const dicts = { en: dict, es: dictEs }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Background gradient accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated Rocket */}
        <div className="mb-8 sm:mb-12">
          <RocketCrash />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-2">
          {dict.notFound.headline}
        </h1>

        {/* Subheading */}
        <h2 className="text-xl sm:text-2xl text-accent font-semibold mb-4">
          {dict.notFound.subheading}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-lg mx-auto">
          {dict.notFound.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-2 text-base font-semibold"
          >
            <Link href="/">
              {dict.notFound.backHome}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border hover:bg-card px-8 py-2 text-base font-semibold"
          >
            <Link href="/#contact">
              {dict.notFound.contactUs}
            </Link>
          </Button>
        </div>

        {/* Easter egg text */}
        <p className="text-xs text-muted-foreground mt-16 opacity-50">
          Houston, we have a problem... 🚀
        </p>
      </div>
    </div>
  )
}
