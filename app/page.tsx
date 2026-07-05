import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Benefits } from "@/components/benefits"
import { Portfolio } from "@/components/portfolio"
import { Team } from "@/components/team"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/lib/i18n"

export default function Home() {
  const dict = getDictionary("en")

  return (
    <main className="min-h-screen">
      <Navbar dict={dict} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <Process dict={dict} />
      <Benefits dict={dict} />
      <Portfolio dict={dict} />
      <Team dict={dict} />
      <CTASection dict={dict} />
      <Footer dict={dict} />
    </main>
  )
}
