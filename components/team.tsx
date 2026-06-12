"use client"

import { TiltCard } from "@/components/tilt-card"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"

export function Team() {
  return (
    <section id="team" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <SectionHeader 
          title="Our Leadership"
          description="The crew behind your mission to success."
        />

        {/* Founding Team Card */}
        <div className="flex justify-center mt-12">
          <ScrollReveal delay={0}>
            <div className="group w-full max-w-2xl">
              <TiltCard
                className="relative rounded-xl overflow-hidden border border-border/50 bg-card/30 transition-colors duration-300 group-hover:border-[#FEC700]/50 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-[#FEC700]/30"
                max={8}
                scale={1.02}
              >
                {/* Wide landscape image container */}
                <div className="relative aspect-video md:aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soa_founders1-87d3abxayrjC6FW7DQhYv7R6JLREOD.webp"
                    alt="Oscar & Miguel - Founding Partners"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  
                  {/* Subtle gradient fading to card background */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/90 to-transparent opacity-100" />
                </div>

                {/* Content section */}
                <div className="p-6 md:p-8 relative z-10">
                  {/* Eyebrow label */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#3B9EFF] mb-2">
                    Founding Partners
                  </p>
                  
                  {/* Name */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 group-hover:text-[#FEC700] transition-colors">
                    Oscar &amp; Miguel
                  </h3>
                  
                  {/* Combined description */}
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                    The duo behind SO Agency. We design, build, and launch digital presences that actually perform — blending strategic development with sharp UX/UI design.
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
