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
      // Drift animation parameters - slow universe movement
      driftX: (Math.random() - 0.5) * 30, // -15 to 15 pixels drift
      driftY: (Math.random() - 0.5) * 30,
      driftDuration: 20 + Math.random() * 20, // 20-40 seconds per cycle
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style jsx>{`
        @keyframes star-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--dx), var(--dy)); }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.4,
            animation: `twinkle 3s ease-in-out infinite ${star.delay}s, star-drift ${star.driftDuration}s ease-in-out infinite`,
            // @ts-expect-error CSS custom properties
            '--dx': `${star.driftX}px`,
            '--dy': `${star.driftY}px`,
          }}
        />
      ))}
    </div>
  )
}
