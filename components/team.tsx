"use client"

import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { TiltCard } from "@/components/tilt-card"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"

const team = [
  {
    name: "Oscar Carabali",
    role: "Strategy & Developer",
    image: "/images/oscar.jpg",
  },
  {
    name: "Miguel Angel",
    role: "UX/UI Designer",
    image: "/images/miguel.jpg",
  },
]

export function Team() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.15)

  return (
    <section id="team" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <SectionHeader 
          title="Our Leadership"
          description="The crew behind your mission to success."
        />

        {/* Team grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Team members */}
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 150}>
              <div className="group">
              <TiltCard
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border/50 bg-card/30 mb-4 transition-colors duration-300 group-hover:border-[#FEC700]/50 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-[#FEC700]/30"
                max={8}
                scale={1.02}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </TiltCard>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-[#FEC700] transition-colors">{member.name}</h3>
              <p className="text-sm text-[#3B9EFF]">{member.role}</p>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
