"use client"

import { Zap, DollarSign, Users, Layers } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"

const benefits = [
  {
    icon: Users,
    title: "Partner-Driven",
    description: "We work alongside you, not just for you. Your success is our mission — we are invested in your growth.",
    gradient: "from-[#3B9EFF] to-cyan-400",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quality at speed. We move efficiently to hit your milestones without compromising on results.",
    gradient: "from-[#FEC700] to-amber-400",
  },
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Premium quality at accessible rates. Packages designed to fit businesses of all sizes.",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    icon: Layers,
    title: "End-to-End",
    description: "One team for branding, web, and marketing. Seamless execution across all your digital needs.",
    gradient: "from-violet-400 to-purple-400",
  },
]

export function Benefits() {
  const gridRef = useStaggerChildren<HTMLDivElement>(0.1)
  // Lifted state: only ONE card can be active at a time on mobile.
  const [activeCard, setActiveCard] = useState<string | null>(null)
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
    <section id="benefits" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <SectionHeader 
          title="Why Clients Choose Us"
          description="We are not just another agency. We are your launch partners, invested in your success."
        />

        {/* Benefits grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              benefit={benefit}
              index={index}
              isMobile={isMobile}
              isActive={activeCard === benefit.title}
              onActivate={setActiveCard}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefit card: desktop uses CSS :hover (unchanged). Mobile simulates hover
// via in-view activation, driven by a single shared "active" state so only one
// card is active at a time.
function BenefitCard({
  benefit,
  index,
  isMobile,
  isActive,
  onActivate,
}: {
  benefit: typeof benefits[0]
  index: number
  isMobile: boolean
  isActive: boolean
  onActivate: (title: string | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mobile: activate when the card enters the central interaction band.
  useEffect(() => {
    if (!cardRef.current || !isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(benefit.title)
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: 0,
      }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isMobile, benefit.title, onActivate])

  // Tap toggles this card on mobile.
  const handleClick = () => {
    if (!isMobile) return
    onActivate(isActive ? null : benefit.title)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive

  return (
    <ScrollReveal delay={index * 100}>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`group text-center p-6 rounded-xl bg-card/30 border transition-all duration-500 card-hover-3d card-shine h-full ${
          isMobile
            ? `cursor-pointer ${showActive ? "border-primary/30" : "border-border/30"}`
            : "border-border/30 hover:border-primary/30"
        }`}
      >
        {/* Icon with gradient background on hover */}
        <div
          className={`size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
            isMobile
              ? showActive
                ? `bg-gradient-to-br ${benefit.gradient} shadow-lg`
                : ""
              : `group-hover:bg-gradient-to-br group-hover:${benefit.gradient} group-hover:shadow-lg`
          }`}
        >
          <benefit.icon
            className={`size-7 text-primary transition-colors duration-300 ${
              isMobile ? (showActive ? "text-white" : "") : "group-hover:text-white"
            }`}
          />
        </div>

        <h3
          className={`text-lg font-semibold mb-2 transition-colors ${
            isMobile ? (showActive ? "text-[#FEC700]" : "text-foreground") : "text-foreground group-hover:text-[#FEC700]"
          }`}
        >
          {benefit.title}
        </h3>
        <p className="text-sm text-muted-foreground">{benefit.description}</p>
      </div>
    </ScrollReveal>
  )
}
