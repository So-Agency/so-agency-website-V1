import { GuideCard } from "@/components/guide-card"
import type { Dictionary } from "@/lib/i18n/types"

// Repeats the Services guide card right after the hero, for the visitor who arrives
// unsure and would otherwise scroll past all six services before being offered the
// free diagnostic. No section header: the card carries its own heading (an h2 here,
// since it directly follows the hero's h1).
export function GuideSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="start" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <GuideCard dict={dict} source="start-guide" headingLevel="h2" />
      </div>
    </section>
  )
}
