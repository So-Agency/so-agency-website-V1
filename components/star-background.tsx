"use client"

import { useEffect, useState, useRef } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  driftX: number
  driftY: number
  driftDuration: number
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile for reduced star count
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const starCount = isMobile ? 40 : 80

    const generatedStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      // Drift animation parameters - slow universe movement
      driftX: (Math.random() - 0.5) * 40, // -20 to 20 pixels drift
      driftY: (Math.random() - 0.5) * 40,
      driftDuration: 15 + Math.random() * 15, // 15-30 seconds per cycle
    }))
    setStars(generatedStars)

    // Inject keyframes into document head
    const styleId = 'star-drift-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes star-drift-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, 15px); } }
        @keyframes star-drift-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-15px, 20px); } }
        @keyframes star-drift-3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(18px, -12px); } }
        @keyframes star-drift-4 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, -18px); } }
        @keyframes star-drift-5 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(12px, 22px); } }
      `
      document.head.appendChild(style)
    }
  }, [])

  const getDriftAnimation = (id: number) => {
    const variant = (id % 5) + 1
    const duration = 15 + (id % 15) // 15-30 seconds
    return `star-drift-${variant} ${duration}s ease-in-out infinite`
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.5,
            animation: `twinkle 3s ease-in-out infinite ${star.delay}s, ${getDriftAnimation(star.id)}`,
          }}
        />
      ))}
    </div>
  )
}
