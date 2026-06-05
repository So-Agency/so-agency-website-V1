"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import { useScrollFadeIn } from "@/hooks/use-gsap-animations"
import { ScrollReveal } from "@/components/scroll-reveal"

export function CTASection() {
  const sectionRef = useScrollFadeIn<HTMLDivElement>()

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={sectionRef}
          className="relative rounded-2xl bg-primary/10 backdrop-blur-lg border border-white/10 p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 size-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            {/* Icon */}
            <ScrollReveal direction="scale">
              <div className="size-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Rocket className="size-8 text-primary" />
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal direction="blur" delay={100}>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                Ready to Launch Your Digital Presence?
              </h2>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={200}>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Let&apos;s talk about your project and how we can help you reach new heights. Book a free diagnostic call today.
              </p>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="comet-border rounded-lg">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all text-base px-8">
                  <a href="mailto:hello@soagency.dev">
                    Let&apos;s Make It Happen
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
              </div>
              <Button asChild variant="outline" size="lg" className="text-base px-8 border-foreground/30 hover:border-accent hover:shadow-lg hover:shadow-accent/40">
                <a href="mailto:hello@soagency.dev">
                  Send a Message
                </a>
              </Button>
            </div>
            </ScrollReveal>

            {/* Response time */}
            <ScrollReveal delay={400}>
              <p className="text-sm text-muted-foreground mt-6">
                We typically respond within 24 hours
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
