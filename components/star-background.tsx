"use client"

import { useEffect, useState } from "react"

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
      // Drift animation parameters - very slow universe movement
      driftX: (Math.random() - 0.5) * 20, // -10 to 10 pixels drift
      driftY: (Math.random() - 0.5) * 20,
      driftDuration: 60 + Math.random() * 60, // 60-120 seconds per cycle
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            opacity: 0.4,
            // Add slow drift animation
            animation: `twinkle 3s ease-in-out infinite ${star.delay}s, star-drift ${star.driftDuration}s ease-in-out infinite`,
            ["--drift-x" as string]: `${star.driftX}px`,
            ["--drift-y" as string]: `${star.driftY}px`,
          }}
        />
      ))}
    </div>
  )
}
