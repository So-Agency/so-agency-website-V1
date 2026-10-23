"use client"

import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { WhatsAppLink } from "@/components/whatsapp-link"
import type { ContactSource } from "@/lib/contact"
import type { Dictionary } from "@/lib/i18n/types"

// Guide card: for the visitor who cannot tell which service they need, and who is
// sent to the free diagnostic the rest of the page offers. It is not a service - it
// sits in the Services grid, in the two columns beside the last service, and again as
// its own section right after the hero, so it takes its place in the layout from the
// caller (`className`) and reports where a click came from (`source`).
//
// It shares the service cards' shell (radius, border, padding, bottom-pinned
// actions) so the row reads as one grid, and differs where it has to: it carries
// full-size buttons instead of a text link, so it has no tilt to make them drift
// under the pointer, and it takes no part in the mobile "one active card" sequence -
// there is nothing to reveal on it, it is always lit.
//
// `headingLevel` keeps the heading outline unbroken wherever the card lands: h3 under
// the Services heading, h2 where it directly follows the hero's h1 (an h3 there would
// skip a level and fail the Lighthouse heading-order audit).
export function GuideCard({
  dict,
  source,
  headingLevel: Heading = "h3",
  className,
}: {
  dict: Dictionary
  source: ContactSource
  headingLevel?: "h2" | "h3"
  className?: string
}) {
  const { title, description, faqLink, whatsappMessage } = dict.services.guide
  // "Not Sure [Where to Start]?" - the bracketed part takes the accent colour.
  const [before, highlight = "", after = ""] = title.split(/\[|\]/)

  return (
    <ScrollReveal delay={100} className={className}>
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#3B9EFF]/[0.07] via-white/[0.01] to-accent/[0.06] p-6 backdrop-blur-[2px] flex flex-col">
        {/* Soft blurred glows in the two brand colours, as in the contact section.
            Decorative, and kept behind the content by the z-10 below. */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-[#3B9EFF]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-1/3 size-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
            <Compass className="size-6 text-accent" aria-hidden="true" />
          </div>

          <Heading className="text-card-title-lg font-semibold text-foreground mb-3 text-balance">
            {before}
            <span className="text-accent">{highlight}</span>
            {after}
          </Heading>
          <p className="text-card-body text-muted-foreground max-w-xl">{description}</p>

          {/* Stacked and full-width on a phone, where each is a thumb target; side by
              side from sm, wrapping if a longer language does not fit on one line. */}
          <div className="mt-auto pt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <div className="comet-border rounded-lg w-full sm:w-auto">
              <Button asChild size="lg" className="w-full h-11 sm:h-10 bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                <WhatsAppLink source={source} message={whatsappMessage}>
                  {dict.hero.ctaPrimary}
                  <ArrowRight className="size-4 ml-2" />
                </WhatsAppLink>
              </Button>
            </div>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-11 sm:h-10 text-base border-foreground/30 hover:border-accent hover:shadow-lg hover:shadow-accent/40">
              <a href="#faq">{faqLink}</a>
            </Button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
