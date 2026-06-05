"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const flameRef = useRef<SVGGElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDir, setScrollDir] = useState<"up" | "down" | null>(null)
  const lastPosition = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastScrollY = useRef(0)
  const lastScrollDir = useRef<"up" | "down">("down")
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const rocket = rocketRef.current
    const flame = flameRef.current
    if (!cursor || !rocket) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Calculate velocity for rotation
      velocity.current.x = mouseX - lastPosition.current.x
      velocity.current.y = mouseY - lastPosition.current.y
      lastPosition.current.x = mouseX
      lastPosition.current.y = mouseY

      if (!isVisible) setIsVisible(true)

      // Calculate rotation based on movement direction
      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      
      // Smooth cursor follow
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: "power2.out"
      })

      // Rotate rocket based on movement direction (only when moving fast enough and not scrolling)
      if (!isScrolling) {
        if (speed > 2) {
          gsap.to(rocket, {
            rotation: angle + 90, // +90 because rocket points up by default
            duration: 0.2,
            ease: "power2.out"
          })
        }
        // Always keep flame visible and scale with speed when not scrolling
        if (flame) {
          gsap.to(flame, {
            scaleY: speed > 2 ? Math.min(1 + speed * 0.04, 1.8) : 1,
            opacity: speed > 2 ? Math.min(0.75 + speed * 0.02, 1) : 0.75,
            duration: 0.15,
            transformOrigin: "16px 27px"
          })
        }
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      const dir = delta > 0 ? "down" : "up"
      lastScrollY.current = currentScrollY

      setScrollDir(dir)
      setIsScrolling(true)
      lastScrollDir.current = dir

      // Boost rocket on scroll
      if (rocket && flame) {
        // Point rocket in scroll direction
        gsap.to(rocket, {
          rotation: dir === "down" ? 180 : 0,
          scale: 1.2,
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Hide flame when scrolling down (rocket points down), show intensified when scrolling up
        gsap.to(flame, {
          scaleY: dir === "down" ? 0 : 2.2,
          opacity: dir === "down" ? 0 : 1,
          duration: 0.15,
          transformOrigin: "16px 27px"
        })
      }

      // After scroll stops: keep direction, just reset scale and flame back to calm
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setScrollDir(null)
        setIsScrolling(false)

        if (rocket && flame) {
          // Keep the last scroll direction rotation — don't snap back to 0
          gsap.to(rocket, {
            rotation: lastScrollDir.current === "down" ? 180 : 0,
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
          })
          // Keep flame hidden if pointing down, show if pointing up
          gsap.to(flame, {
            scaleY: lastScrollDir.current === "down" ? 0 : 1,
            opacity: lastScrollDir.current === "down" ? 0 : 0.85,
            duration: 0.3,
            transformOrigin: "16px 27px"
          })
        }
      }, 150)
    }

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", handleElementHover)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: 0, top: 0 }}
      >
        {/* Rocket with integrated flame */}
        <div
          ref={rocketRef}
          className={`transition-transform duration-150 ${
            isClicking ? "scale-75" : isHovering && !isScrolling ? "scale-125" : "scale-100"
          }`}
          style={{ 
            filter: isScrolling 
              ? "drop-shadow(0 0 12px #FEC700) drop-shadow(0 0 20px rgba(255, 107, 53, 0.8))" 
              : isHovering 
                ? "drop-shadow(0 0 8px #FEC700)"
                : "drop-shadow(0 0 4px rgba(254, 199, 0, 0.5))"
          }}
        >
          <svg
            width="40"
            height="52"
            viewBox="0 0 32 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="flameGrad" x1="16" y1="28" x2="16" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEC700" stopOpacity="1" />
                <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FF4433" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flameGradCore" x1="16" y1="28" x2="16" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE066" stopOpacity="1" />
                <stop offset="100%" stopColor="#FEC700" stopOpacity="0" />
              </linearGradient>
              <clipPath id="flameClip">
                <rect x="0" y="27" width="32" height="20" />
              </clipPath>
            </defs>

            {/* Flame — clipped to only render below y=27 */}
            <g ref={flameRef} clipPath="url(#flameClip)" style={{ transformOrigin: "16px 27px" }}>
              <path d="M12 28 C10.5 32 10 36 12.5 40 C14 42.5 16 44 16 44 C16 44 18 42.5 19.5 40 C22 36 21.5 32 20 28 Z" fill="url(#flameGrad)" />
              <path d="M13.5 28 C13 31 12.5 34 14.5 37 C15.2 38.5 16 40 16 40 C16 40 16.8 38.5 17.5 37 C19.5 34 19 31 18.5 28 Z" fill="url(#flameGradCore)" opacity="0.8" />
            </g>

            {/* Left fin - perfectly symmetrical */}
            <path d="M9 16 L7 22 C7 24 8 25.5 9.5 26 L12 24 C11 22 10 19 9 16 Z" fill="#E6B800" />
            {/* Right fin - perfectly symmetrical mirror */}
            <path d="M23 16 L25 22 C25 24 24 25.5 22.5 26 L20 24 C21 22 22 19 23 16 Z" fill="#E6B800" />

            {/* Clean pointed rocket body - symmetrical cone */}
            <path 
              d="M16 2 L24 18 L24 26 L8 26 L8 18 Z" 
              fill="#FEC700" 
            />

            {/* Body highlight - clean vertical stripe */}
            <path d="M16 3 L21 17 L21 25 L16 25 Z" fill="#FFE880" opacity="0.4" />

            {/* Exhaust nozzle - clean horizontal band */}
            <rect x="14" y="25.5" width="4" height="1" rx="0.5" fill="#C89A00" />

            {/* Thruster ports on sides */}
            <circle cx="10" cy="24" r="0.8" fill="#D4AF37" opacity="0.7" />
            <circle cx="22" cy="24" r="0.8" fill="#D4AF37" opacity="0.7" />

            {/* Window - clean circle */}
            <circle cx="16" cy="11" r="2.5" fill="#0d0d1a" />
            <circle cx="16" cy="11" r="1.8" fill="#111827" />
            <circle cx="15.5" cy="10.5" r="0.7" fill="#3B9EFF" opacity="0.95" />
          </svg>
        </div>
      </div>
    </>
  )
}
