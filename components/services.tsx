"use client"

import { Code, Palette, ShoppingCart, Fingerprint, Megaphone, Bot } from "lucide-react"
import { useStaggerChildren } from "@/hooks/use-gsap-animations"
import { TiltCard } from "@/components/tilt-card"
import { SectionHeader, ScrollReveal } from "@/components/scroll-reveal"
import { useState, useEffect } from "react"

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
  const [isMobile, setIsMobile] = useState(false)
  const gridRef = useStaggerChildren<HTMLDivElement>(0.1)

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
              <ScrollReveal key={service.title} delay={index * 100}>
                <TiltCard
                  className={`relative group rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-[2px] p-6 transition-colors duration-300 card-shine overflow-hidden ${
                    service.disabled 
                      ? "opacity-60" 
                      : `${!isMobile ? `hover:border-accent/50 hover:bg-white/[0.03] ${service.borderGlow}` : ""}`
                  }`}
                  max={service.disabled || isMobile ? 0 : 6}
                  scale={service.disabled || isMobile ? 1 : 1.02}
                >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {service.badge}
                  </span>
                )}

                {/* Icon with animation on hover */}
                <div className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-all duration-300 ${!isMobile ? "group-hover:scale-110 group-hover:rotate-6" : ""}`}>
                  <service.icon className={`size-6 ${service.color} transition-transform duration-300 ${!isMobile ? "group-hover:scale-110" : ""}`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 ${service.disabled ? "text-muted-foreground" : "text-foreground"}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover accent line - gradient border bottom */}
                {!service.disabled && !isMobile && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                )}
              </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2: Next 3 cards - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(2, 5).map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 100}>
                <TiltCard
                  className={`relative group rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-[2px] p-6 transition-colors duration-300 card-shine overflow-hidden h-full ${
                    service.disabled 
                      ? "opacity-60" 
                      : `${!isMobile ? `hover:border-accent/50 hover:bg-white/[0.03] ${service.borderGlow}` : ""}`
                  }`}
                  max={service.disabled || isMobile ? 0 : 6}
                  scale={service.disabled || isMobile ? 1 : 1.02}
                >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {service.badge}
                  </span>
                )}

                {/* Icon with animation on hover */}
                <div className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-all duration-300 ${!isMobile ? "group-hover:scale-110 group-hover:rotate-6" : ""}`}>
                  <service.icon className={`size-6 ${service.color} transition-transform duration-300 ${!isMobile ? "group-hover:scale-110" : ""}`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 ${service.disabled ? "text-muted-foreground" : "text-foreground"}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover accent line - gradient border bottom */}
                {!service.disabled && !isMobile && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                )}
              </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 3: Last card - 3 columns, card aligned left */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.slice(5).map((service) => (
              <ScrollReveal key={service.title}>
                <TiltCard
                  className={`relative group rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-[2px] p-6 transition-colors duration-300 card-shine overflow-hidden ${
                    service.disabled 
                      ? "opacity-60" 
                      : `${!isMobile ? `hover:border-accent/50 hover:bg-white/[0.03] ${service.borderGlow}` : ""}`
                  }`}
                  max={service.disabled || isMobile ? 0 : 6}
                  scale={service.disabled || isMobile ? 1 : 1.02}
                >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {service.badge}
                  </span>
                )}

                {/* Icon with animation on hover */}
                <div className={`size-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-6 transition-all duration-300 ${!isMobile ? "group-hover:scale-110 group-hover:rotate-6" : ""}`}>
                  <service.icon className={`size-6 ${service.color} transition-transform duration-300 ${!isMobile ? "group-hover:scale-110" : ""}`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 ${service.disabled ? "text-muted-foreground" : "text-foreground"}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover accent line - gradient border bottom */}
                {!service.disabled && !isMobile && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B9EFF] to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                )}
              </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
