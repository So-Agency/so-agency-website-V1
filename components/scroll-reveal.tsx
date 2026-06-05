"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur"
}

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getInitialStyles = () => {
    switch (direction) {
      case "up":
        return "translate-y-10 opacity-0"
      case "down":
        return "-translate-y-10 opacity-0"
      case "left":
        return "translate-x-10 opacity-0"
      case "right":
        return "-translate-x-10 opacity-0"
      case "scale":
        return "scale-90 opacity-0"
      case "blur":
        return "translate-y-5 opacity-0 blur-sm"
      default:
        return "translate-y-10 opacity-0"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100 blur-0" : getInitialStyles()
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Section header with reveal animation
export function SectionHeader({ 
  title, 
  description 
}: { 
  title: string
  description: string 
}) {
  return (
    <div className="text-center mb-16">
      <ScrollReveal direction="blur">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {title}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <div className="w-20 h-[3px] bg-gradient-to-r from-[#3B9EFF] to-[#FEC700] mx-auto mt-4 rounded-full" />
      </ScrollReveal>
    </div>
  )
}
