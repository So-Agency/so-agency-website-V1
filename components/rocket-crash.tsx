'use client'

import { useEffect, useRef } from 'react'

export function RocketCrash() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Generate random particles on crash
    const createParticles = () => {
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div')
        const size = Math.random() * 8 + 4
        const x = Math.random() * 100 - 50
        const y = Math.random() * 100 - 50
        const duration = Math.random() * 0.5 + 0.8

        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: #FEC700;
          border-radius: 50%;
          left: 50%;
          top: 60%;
          pointer-events: none;
          animation: particleFloat ${duration}s ease-out forwards;
          --x: ${x}px;
          --y: ${y}px;
        `
        container.appendChild(particle)

        setTimeout(() => particle.remove(), duration * 1000)
      }
    }

    // Trigger particles periodically
    const interval = setInterval(createParticles, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
          }
        }

        @keyframes rocketTilt {
          0% {
            transform: translateY(-20px) rotate(-15deg);
            opacity: 0;
          }
          40% {
            transform: translateY(20px) rotate(-15deg);
            opacity: 1;
          }
          60% {
            transform: translateY(40px) rotate(25deg);
          }
          100% {
            transform: translateY(120px) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes smokePuff {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(2);
            opacity: 0;
          }
        }

        @keyframes fireFlicker {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(1.1);
          }
        }
      `}</style>

      {/* Smoke puffs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={`smoke-${i}`}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-t from-gray-400 to-transparent"
            style={{
              left: '50%',
              top: '55%',
              animation: `smokePuff 2s ease-out ${i * 0.3}s infinite`,
              marginLeft: `${-40 + i * 20}px`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Rocket SVG */}
      <svg
        className="w-32 sm:w-40"
        viewBox="0 0 100 200"
        style={{
          animation: 'rocketTilt 3s ease-in infinite',
          filter: 'drop-shadow(0 0 20px rgba(254, 199, 0, 0.3))',
        }}
      >
        {/* Rocket body */}
        <rect x="35" y="20" width="30" height="80" fill="#1a1a2e" stroke="#FEC700" strokeWidth="2" rx="4" />

        {/* Window */}
        <circle cx="50" cy="35" r="6" fill="#FEC700" />

        {/* Fins */}
        <path d="M 35 85 L 25 100 L 30 90 Z" fill="#FEC700" />
        <path d="M 65 85 L 75 100 L 70 90 Z" fill="#FEC700" />

        {/* Fire flames */}
        <g style={{ animation: 'fireFlicker 0.2s infinite' }}>
          <polygon points="40,100 45,130 50,125 55,130 60,100" fill="#FF6B35" opacity="0.8" />
          <polygon points="42,105 48,125 50,120 52,125 58,105" fill="#FEC700" opacity="0.9" />
        </g>
      </svg>

      {/* Crash impact effect */}
      <div
        className="absolute bottom-0 left-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
        style={{
          animation: `pulse 2s ease-out infinite`,
          marginLeft: '-96px',
        }}
      />
    </div>
  )
}
