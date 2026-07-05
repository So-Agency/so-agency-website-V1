'use client'

import { useEffect, useRef } from 'react'

export function RocketCrash() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticles = () => {
      for (let i = 0; i < 14; i++) {
        const particle = document.createElement('div')
        const size = Math.random() * 10 + 4
        const x = (Math.random() - 0.5) * 140
        const y = -(Math.random() * 100 + 40)
        const duration = Math.random() * 0.6 + 0.7

        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${Math.random() > 0.5 ? '#FEC700' : '#FF6B35'};
          border-radius: 50%;
          left: 50%;
          top: 62%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: particleBurst ${duration}s ease-out forwards;
          --tx: ${x}px;
          --ty: ${y}px;
        `
        container.appendChild(particle)
        setTimeout(() => particle.remove(), duration * 1000)
      }
    }

    const interval = setInterval(createParticles, 2800)
    createParticles()

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-52 sm:h-60 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes particleBurst {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }

        @keyframes rocketFall {
          0%   { transform: translateY(-200px) rotate(20deg); opacity: 0; }
          18%  { transform: translateY(-60px)  rotate(12deg); opacity: 1; }
          55%  { transform: translateY(20px)   rotate(-8deg); opacity: 1; }
          75%  { transform: translateY(55px)   rotate(35deg); opacity: 1; }
          90%  { transform: translateY(80px)   rotate(55deg); opacity: 0.5; }
          100% { transform: translateY(110px)  rotate(65deg); opacity: 0; }
        }

        @keyframes smokeDrift {
          0%   { transform: translate(var(--sx), 0px) scale(0.4); opacity: 0.55; }
          100% { transform: translate(var(--sx), -70px) scale(2.2); opacity: 0; }
        }

        @keyframes thrusterFlicker {
          0%, 100% { transform: scaleX(1) scaleY(1);   opacity: 1;    }
          25%       { transform: scaleX(0.9) scaleY(1.15); opacity: 0.8; }
          50%       { transform: scaleX(1.05) scaleY(0.9); opacity: 0.95; }
          75%       { transform: scaleX(0.95) scaleY(1.1); opacity: 0.85; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; transform: scaleX(1);   }
          50%       { opacity: 0.9;  transform: scaleX(1.15); }
        }

        @keyframes groundShake {
          0%, 100% { transform: scaleX(1);   opacity: 0.6; }
          50%       { transform: scaleX(1.2); opacity: 1;   }
        }
      `}</style>

      {/* Smoke clouds */}
      {[
        { sx: '-22px', delay: '0s',    size: 'w-16 h-16', top: '62%', left: '48%' },
        { sx: '18px',  delay: '0.45s', size: 'w-20 h-20', top: '60%', left: '43%' },
        { sx: '-10px', delay: '0.9s',  size: 'w-14 h-14', top: '64%', left: '52%' },
      ].map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.size} rounded-full pointer-events-none`}
          style={{
            background: 'radial-gradient(circle, rgba(120,120,140,0.7) 0%, transparent 70%)',
            top: s.top,
            left: s.left,
            animation: `smokeDrift 2.2s ease-out ${s.delay} infinite`,
            ['--sx' as string]: s.sx,
          }}
        />
      ))}

      {/* Rocket SVG — proper silhouette */}
      <svg
        viewBox="0 0 80 180"
        className="w-20 sm:w-24 relative z-10"
        style={{
          animation: 'rocketFall 2.8s cubic-bezier(.4,0,.6,1) infinite',
          filter: 'drop-shadow(0 0 18px rgba(254,199,0,0.45))',
          transformOrigin: '50% 60%',
        }}
      >
        {/* ── Nose cone (pointed triangle top) ── */}
        <path
          d="M 40 4 C 40 4, 28 30, 26 52 L 54 52 C 52 30, 40 4, 40 4 Z"
          fill="#1a1a2e"
          stroke="#FEC700"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Nose tip highlight */}
        <ellipse cx="40" cy="12" rx="3" ry="5" fill="#FEC700" opacity="0.25" />

        {/* ── Body ── */}
        <rect x="26" y="51" width="28" height="72" rx="3" fill="#1a1a2e" stroke="#FEC700" strokeWidth="1.6" />

        {/* Body stripe accent */}
        <rect x="26" y="75" width="28" height="4" fill="#FEC700" opacity="0.18" />
        <rect x="26" y="98" width="28" height="3" fill="#FEC700" opacity="0.12" />

        {/* Porthole window */}
        <circle cx="40" cy="65" r="7.5" fill="#0d1117" stroke="#FEC700" strokeWidth="1.5" />
        <circle cx="40" cy="65" r="4.5" fill="#FEC700" opacity="0.85" />
        <circle cx="38" cy="63" r="1.5" fill="white" opacity="0.5" />

        {/* ── Left fin ── */}
        <path
          d="M 26 100 L 12 128 L 22 120 L 26 124 Z"
          fill="#FEC700"
          stroke="#FEC700"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* ── Right fin ── */}
        <path
          d="M 54 100 L 68 128 L 58 120 L 54 124 Z"
          fill="#FEC700"
          stroke="#FEC700"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* ── Engine nozzle bell ── */}
        <path
          d="M 30 123 L 27 134 L 53 134 L 50 123 Z"
          fill="#2a2a3e"
          stroke="#FEC700"
          strokeWidth="1.2"
        />
        {/* Nozzle inner */}
        <ellipse cx="40" cy="134" rx="13" ry="3" fill="#1a1a2e" stroke="#FEC700" strokeWidth="1" />

        {/* ── Thruster flames ── */}
        <g style={{ animation: 'thrusterFlicker 0.18s ease-in-out infinite', transformOrigin: '40px 134px' }}>
          {/* Outer flame — orange */}
          <path
            d="M 30 134 C 28 148, 34 162, 40 170 C 46 162, 52 148, 50 134 Z"
            fill="#FF6B35"
            opacity="0.9"
          />
          {/* Mid flame — yellow */}
          <path
            d="M 33 134 C 32 146, 37 158, 40 165 C 43 158, 48 146, 47 134 Z"
            fill="#FEC700"
            opacity="0.95"
          />
          {/* Inner core — white-hot */}
          <path
            d="M 36 134 C 35 143, 38 153, 40 158 C 42 153, 45 143, 44 134 Z"
            fill="white"
            opacity="0.7"
          />
        </g>
      </svg>

      {/* Ground impact glow */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 rounded-full"
        style={{
          width: '160px',
          background: 'linear-gradient(90deg, transparent, #FEC700, transparent)',
          animation: 'groundShake 1.4s ease-in-out infinite',
        }}
      />
    </div>
  )
}
