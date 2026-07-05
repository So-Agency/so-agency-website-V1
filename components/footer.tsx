import Image from "next/image"
import type { Dictionary } from "@/lib/i18n/types"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 text-foreground mb-4">
              <Image
                src="/logo.png"
                alt="SO Agency"
                width={120}
                height={45}
                className="h-10 w-auto"
              />
            </a>
            <p className="font-[family-name:var(--font-roboto)] text-xl font-bold tracking-widest uppercase text-foreground mb-2">
              {dict.footer.tagline}
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              {dict.footer.description}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              {dict.footer.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {dict.footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-foreground mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {dict.footer.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {dict.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
