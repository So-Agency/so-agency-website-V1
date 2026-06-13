"use client"

import { useRef, useEffect, useState } from "react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { TiltCard } from "@/components/tilt-card"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"

const team = [
  {
    name: "Oscar Carabali",
    role: "Strategy & Developer",
    image: "/images/soa_founders1.webp",
  },
]

export function Team() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.15)
  // Lifted state: only ONE member can be active at a time on mobile.
  const [activeMember, setActiveMember] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect touch/mobile once at the section level.
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
            <TeamMember
              key={member.name}
              member={member}
              index={index}
              isMobile={isMobile}
              isActive={activeMember === member.name}
              onActivate={setActiveMember}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Team member: desktop uses CSS :hover + TiltCard (unchanged). Mobile simulates
// the hover visual via in-view activation, driven by a single shared "active"
// state so only one member is active at a time.
function TeamMember({
  member,
  index,
  isMobile,
  isActive,
  onActivate,
}: {
  member: typeof team[0]
  index: number
  isMobile: boolean
  isActive: boolean
  onActivate: (name: string | null) => void
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Mobile: activate when the member card enters the central interaction band.
  useEffect(() => {
    if (!wrapperRef.current || !isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(member.name)
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: 0,
      }
    )

    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [isMobile, member.name, onActivate])

  // Tap toggles this member on mobile.
  const handleClick = () => {
    if (!isMobile) return
    onActivate(isActive ? null : member.name)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive

  return (
    <ScrollReveal delay={index * 150}>
      <div ref={wrapperRef} onClick={handleClick} className={`group ${isMobile ? "cursor-pointer" : ""}`}>
        <TiltCard
          className={`relative aspect-[7/5] rounded-xl overflow-hidden border bg-card/30 mb-4 transition-colors duration-300 ${
            isMobile
              ? showActive
                ? "border-[#FEC700]/50 shadow-[0_0_40px_-10px] shadow-[#FEC700]/30"
                : "border-border/50"
              : "border-border/50 group-hover:border-[#FEC700]/50 group-hover:shadow-[0_0_40px_-10px] group-hover:shadow-[#FEC700]/30"
          }`}
          max={8}
          scale={1.02}
        >
          <img
            src={member.image}
            alt={member.name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isMobile
                ? showActive
                  ? "grayscale-0 scale-105"
                  : "grayscale"
                : "grayscale group-hover:grayscale-0 group-hover:scale-105"
            }`}
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
              isMobile
                ? showActive
                  ? "opacity-60"
                  : "opacity-80"
                : "opacity-80 group-hover:opacity-60"
            }`}
          />

          {/* Hover accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] transition-transform duration-500 origin-left ${
              isMobile
                ? showActive
                  ? "scale-x-100"
                  : "scale-x-0"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </TiltCard>
        <h3
          className={`text-lg font-semibold transition-colors ${
            isMobile ? (showActive ? "text-[#FEC700]" : "text-foreground") : "text-foreground group-hover:text-[#FEC700]"
          }`}
        >
          {member.name}
        </h3>
        <p className="text-sm text-[#3B9EFF]">{member.role}</p>
      </div>
    </ScrollReveal>
  )
}
