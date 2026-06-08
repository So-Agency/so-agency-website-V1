"use client"

import { Code, Palette, ShoppingCart, Fingerprint, Megaphone, Bot } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Code,
    title: "Web Design & Dev",
    description: "Custom, performance-driven sites built on modern stacks. We engineer high-performance platforms that keep users engaged.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-cyan-400/30",
    size: "col-span-1",
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    description: "Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user's journey.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-accent/30",
    size: "col-span-1",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "End-to-end online store solutions designed for frictionless transactions and maximum conversion.",
    color: "text-foreground",
    bgColor: "bg-foreground/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-white/20",
    size: "col-span-1",
  },
  {
    icon: Fingerprint,
    title: "Branding & Identity",
    description: "Full visual identity systems. We forge a unique signature that resonates across your industry, establishing undeniable authority.",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-teal-400/30",
    size: "col-span-1",
  },
  {
    icon: Megaphone,
    title: "Social Media",
    description: "Turning engagement into leads through calculated content strategies and data-driven campaigns.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderGlow: "hover:shadow-[0_0_30px_-5px] hover:shadow-accent/30",
    size: "col-span-1",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamlining operations with intelligent tools. Next-gen tech currently in development.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    borderGlow: "",
    size: "md:col-span-1",
    badge: "Standby",
    disabled: true,
  },
]

export function Services() {
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
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <SectionHeader 
          title="Core Systems"
          description="Specialized services designed to ensure total business success across all digital channels."
        />

        {/* Bento grid - Row 1: 2 cols | Row 2: 3 cols | Row 3: 3 cols, card left-aligned */}
        <div className="space-y-4">
          {/* Row 1: First 2 cards - 2 columns */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
              />
            ))}
          </div>

          {/* Row 2: Next 3 cards - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(2, 5).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
              />
            ))}
          </div>

          {/* Row 3: Last card - 3 columns, card aligned left */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(5).map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={0}
                isMobile={isMobile}
                isActive={activeCard === service.title}
                onActivate={setActiveCard}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Service card: desktop uses CSS :hover (unchanged). Mobile simulates hover
// via tap + in-view activation, driven by a single shared "active" state so
// only one card is active at a time. Only visual properties animate.
function ServiceCard({
  service,
  index,
  isMobile,
  isActive,
  onActivate,
}: {
  service: typeof services[0]
  index: number
  isMobile: boolean
  isActive: boolean
  onActivate: (title: string | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mobile: soft-activate when the card is at least 40% in view.
  // Because activation lives in the parent's single state, scrolling naturally
  // hands the "active" state from one card to the next (one at a time).
  useEffect(() => {
    if (!cardRef.current || !isMobile || service.disabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActivate(service.title)
        }
      },
      {
        // Interaction zone: a band between ~35vh (top) and ~75vh (bottom).
        // The card activates as it enters this central band and stays active
        // while scrolling, only turning off once its top moves above
        // ~35vh from the top of the viewport (the upper third).
        rootMargin: "-15% 0px -35% 0px",
        threshold: 0,
      }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [isMobile, service.disabled, service.title, onActivate])

  // Tap toggles this card; tapping a different card is handled by the shared
  // state in the parent (the previous card simply stops matching).
  const handleClick = () => {
    if (!isMobile || service.disabled) return
    onActivate(isActive ? null : service.title)
  }

  // Mobile shows the "hover" visual when active. Desktop relies on CSS :hover.
  const showActive = isMobile && isActive && !service.disabled

  return (
    <ScrollReveal delay={index * 100}>
      <div
        ref={cardRef}
        onClick={handleClick}
        className={`relative group rounded-2xl border p-6 backdrop-blur-[2px] card-shine overflow-hidden transition duration-300 ${
          service.disabled
            ? "opacity-60 border-white/[0.08] bg-white/[0.01]"
            : isMobile
              ? `cursor-pointer ${
                  showActive
                    ? "border-accent/50 bg-white/[0.03] shadow-[0_0_30px_-5px_rgba(254,199,0,0.3)]"
                    : "border-white/[0.08] bg-white/[0.01]"
                }`
              : `border-white/[0.08] bg-white/[0.01] hover:border-accent/50 hover:bg-white/[0.03] ${service.borderGlow}`
        }`}
      >
        {/* Badge */}
        {service.badge && (
          <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
            {service.badge}
          </span>
        )}

        {/* Icon with scale/rotate animation (transform only - layout safe) */}
        <div
          className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-transform duration-300 ${
            isMobile
              ? showActive
                ? "scale-110 rotate-6"
                : ""
              : "group-hover:scale-110 group-hover:rotate-6"
          }`}
        >
          <service.icon
            className={`size-6 ${service.color} transition-transform duration-300 ${
              isMobile ? (showActive ? "scale-110" : "") : "group-hover:scale-110"
            }`}
          />
        </div>

        {/* Content */}
        <h3
          className={`text-xl font-semibold mb-3 ${
            service.disabled ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {/* Accent line - gradient border bottom (transform only - layout safe) */}
        {!service.disabled && (
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-accent transition-transform duration-500 origin-left ${
              isMobile
                ? showActive
                  ? "scale-x-100"
                  : "scale-x-0"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        )}
      </div>
    </ScrollReveal>
  )
}
