"use client"

import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "@/components/whatsapp-link"
import { ArrowRight, ChevronDown, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { useHeroAnimation } from "@/hooks/use-gsap-animations"
import { BRAND_TAGLINE } from "@/lib/brand"
import type { Dictionary } from "@/lib/i18n/types"

export function Hero({ dict }: { dict: Dictionary }) {
  const heroRef = useHeroAnimation<HTMLDivElement>()
  // The scroll cue only makes sense while the visitor is still at the top.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // the page can load already scrolled (reload, #hash, restored position)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The hero stops short of the first screen on purpose: the strip taken off is where
  // the top of the guide card right below peeks in, hinting that there is more to
  // scroll to. Desktop keeps it subtle (4.5rem) to leave the hero room to breathe;
  // mobile gives it 5.5rem. svh, not vh: on iOS vh includes the browser toolbar, and
  // the peek would end up hidden behind it.
  return (
    <section className="relative min-h-[calc(100svh-5.5rem)] md:min-h-[calc(100svh-4.5rem)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

      {/* Content. md:pt-28 keeps the floating pill clear of the fixed navbar; pb-16 leaves
          room under the CTAs for the scroll cue below. */}
      <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 md:pt-28 pb-16">
        {/* Badge with blinking rocket; the pill opens WhatsApp with the guide card's message.
            opacity-0 is gated behind md: so mobile paints the hero immediately
            (opacity 1 is the browser default). PageSpeed Insights pinned 3.65s
            of "element render delay" on the LCP element (hero-description)
            because every hero-* block started invisible and only became paintable
            after React hydrated and GSAP ran its fade-in - 96% of LCP was that
            delay. Desktop keeps the animation; its PSI score is already 99.
            useHeroAnimation() in hooks/use-gsap-animations.tsx is the counterpart:
            it skips the timeline entirely on mobile.
            The wrapper carries the endless float (.pill-float in globals.css); it
            cannot go on .hero-badge, whose transform GSAP owns during the intro. */}
        <div className="pill-float inline-block mb-8">
          <WhatsAppLink
            source="hero-pill"
            message={dict.services.guide.whatsappMessage}
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm md:opacity-0 transition-colors hover:bg-primary/10 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Rocket className="size-4 animate-pulse-glow text-[#FEC700]" aria-hidden="true" />
            <span>{dict.hero.badge}</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </WhatsAppLink>
        </div>

        {/* Main headline */}
        <h1 className="hero-title font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance mb-4 md:opacity-0">
          {dict.hero.headline}
        </h1>

        {/* Slogan */}
        <div className="hero-subtitle mb-6 md:opacity-0">
          <p className="font-[family-name:var(--font-roboto)] text-xl sm:text-2xl md:text-3xl font-bold tracking-widest uppercase text-foreground">
            {BRAND_TAGLINE}
          </p>
        </div>

        {/* Description */}
        <p className="hero-description text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty md:opacity-0">
          {dict.hero.description}
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 md:opacity-0">
          {/* Comet border button */}
          <div className="comet-border rounded-lg">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-base px-8 relative z-10">
              <a href="#contact">
                {dict.hero.ctaPrimary}
                <ArrowRight className="size-4 ml-2" />
              </a>
            </Button>
          </div>
          <Button asChild variant="outline" size="lg" className="text-base px-8 hover-scale border-[#FEC700] text-foreground hover:bg-[#FEC700]/10 hover:text-foreground hover:border-[#FEC700]">
            <a href="#services">{dict.hero.ctaSecondary}</a>
          </Button>
        </div>
      </div>

      {/* Scroll cue: a floating arrow just above the guide card's peek. Not a hero-*
          block, so it takes no part in the GSAP intro and paints immediately. The
          wrapper centres it with flex because .scroll-cue-float writes transform and
          would overwrite a -translate-x-1/2. It fades out (and leaves the tab order
          and the accessibility tree) as soon as the visitor scrolls. */}
      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center">
        <a
          href="#start"
          aria-label={dict.hero.scrollHint}
          tabIndex={scrolled ? -1 : undefined}
          aria-hidden={scrolled ? true : undefined}
          className={`scroll-cue-float flex size-10 items-center justify-center rounded-full border border-foreground/20 bg-background/40 backdrop-blur-sm text-muted-foreground transition-[opacity,color,border-color] duration-500 hover:text-accent hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent${
            scrolled ? " opacity-0 pointer-events-none" : ""
          }`}
        >
          <ChevronDown className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
