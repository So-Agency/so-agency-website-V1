"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { ScrollReveal, SectionHeader } from "@/components/scroll-reveal"
import type { Dictionary } from "@/lib/i18n/types"

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const answerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (answerRef.current) {
      setHeight(answerRef.current.scrollHeight)
    }
  }, [answer])

  return (
    <ScrollReveal delay={index * 60} direction="up">
      <div className="border-b border-border/40 last:border-b-0">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm"
        >
          <span
            className={`text-base sm:text-lg font-medium leading-snug transition-colors duration-200 ${
              isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
            }`}
          >
            {question}
          </span>

          <span
            className={`shrink-0 size-7 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
              isOpen
                ? "border-primary bg-primary text-primary-foreground rotate-0"
                : "border-border/60 text-muted-foreground group-hover:border-primary/60 group-hover:text-foreground"
            }`}
            aria-hidden="true"
          >
            {isOpen ? (
              <Minus className="size-3.5" strokeWidth={2.5} />
            ) : (
              <Plus className="size-3.5" strokeWidth={2.5} />
            )}
          </span>
        </button>

        <div
          style={{
            maxHeight: isOpen ? `${height}px` : "0px",
            overflow: "hidden",
            transition: "max-height 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          aria-hidden={!isOpen}
        >
          <div ref={answerRef} className="pb-6 pr-12">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function FAQ({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section id="faq" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Mobile/tablet: standard section header */}
        <div className="lg:hidden mb-12">
          <SectionHeader
            title={dict.faq.sectionTitle}
            description={dict.faq.sectionDescription}
          />
        </div>

        {/* Desktop: split layout */}
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-20 xl:gap-28">

          {/* Left column — sticky label (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <ScrollReveal direction="left">
                <div className="space-y-5">
                  {/* Large display label */}
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {dict.faq.sectionTitle}
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-7xl xl:text-8xl font-bold text-foreground leading-none tracking-tight">
                    FAQ
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-[220px]">
                    {dict.faq.sectionDescription}
                  </p>

                  {/* Decorative accent line */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-xs text-muted-foreground">
                      {dict.faq.items.length} questions
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column — accordion */}
          <div>
            {/* Top divider */}
            <div className="hidden lg:block h-px bg-border/40 mb-2" />

            {dict.faq.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}

            {/* Bottom CTA hint */}
            <ScrollReveal delay={dict.faq.items.length * 60 + 60}>
              <div className="pt-8 pb-2">
                <p className="text-sm text-muted-foreground">
                  {dict.locale === "en"
                    ? "Still have questions? "
                    : "¿Aún tienes preguntas? "}
                  <a
                    href="#contact"
                    className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    {dict.locale === "en" ? "Send us a message." : "Envíanos un mensaje."}
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
