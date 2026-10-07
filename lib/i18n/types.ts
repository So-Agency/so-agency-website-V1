export type Locale = 'en' | 'es' | 'fr'

export interface Dictionary {
  locale: Locale
  /** Head metadata. The page title is the brand title, which is never translated. */
  meta: {
    description: string
    keywords: string[]
  }
  notFound: {
    headline: string
    subheading: string
    description: string
    backHome: string
    contactUs: string
    /** The small aside under the buttons. */
    easterEgg: string
  }
  navbar: {
    links: { label: string; href: string }[]
    cta: string
    /** Accessible name of the mobile menu button. */
    toggleMenu: string
  }
  languageSwitcher: {
    /** Accessible name of the group of language buttons. */
    label: string
    /** Accessible name of one button. `{language}` is replaced with the language's own name. */
    switchTo: string
  }
  hero: {
    badge: string
    headline: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
  }
  services: {
    sectionTitle: string
    sectionDescription: string
    /** Label of the per-card WhatsApp button. */
    cta: string
    /** WhatsApp message for the per-card button. `{service}` is replaced with the title. */
    ctaMessage: string
    items: {
      title: string
      description: string
      badge?: string
    }[]
    /**
     * The card beside the last service, for a visitor who has read all of them and
     * cannot tell which one they need. Its main button reuses `hero.ctaPrimary`, so
     * the offer carries one name across the page.
     */
    guide: {
      /** The part in [square brackets] is shown in the accent colour. */
      title: string
      description: string
      /** Label of the link down to the FAQ, where prices and timelines are. */
      faqLink: string
      /** WhatsApp message for the card's main button. */
      whatsappMessage: string
    }
  }
  process: {
    sectionTitle: string
    sectionDescription: string
    steps: {
      number: string
      title: string
      subtitle: string
      description: string
    }[]
  }
  benefits: {
    sectionTitle: string
    sectionDescription: string
    items: {
      title: string
      description: string
    }[]
  }
  portfolio: {
    eyebrow: string
    sectionTitle: string
    visitWebsite: string
    pauseAutoplay: string
    resumeAutoplay: string
    previousProject: string
    nextProject: string
    /** Accessible name of a progress-bar segment. `{number}` is replaced with its position. */
    goToProject: string
    projects: {
      title: string
      subtitle: string
      description: string
      tags: string[]
    }[]
  }
  team: {
    sectionTitle: string
    sectionDescription: string
    members: {
      name: string
      label: string
      description: string
    }[]
  }
  cta: {
    headline: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    responseTime: string
    /** WhatsApp message for the contact section's buttons. */
    whatsappMessage: string
  }
  faq: {
    sectionTitle: string
    sectionDescription: string
    /** Counter beside the heading. `{count}` is replaced with the number of questions. */
    count: string
    /** Closing line under the list; `sendMessage` is the link that follows it. */
    stillHaveQuestions: string
    sendMessage: string
    items: {
      question: string
      answer: string
    }[]
  }
  /** The menu that replaces the browser's context menu on right-click. */
  quickContact: {
    /** Accessible name of the menu. */
    label: string
    close: string
    heading: string
    cta: string
    /** WhatsApp message for the menu's button. */
    whatsappMessage: string
  }
  /**
   * Copy for the JSON-LD graph in components/schema-markup.tsx. The service entries
   * are worded for search engines, so they are longer than the cards in `services`.
   * The FAQ entries are not repeated here: the graph reads them from `faq.items`.
   */
  structuredData: {
    description: string
    /** Name of the OfferCatalog that lists the services. */
    catalogName: string
    /** Name of the page's single breadcrumb. */
    home: string
    services: { name: string; description: string }[]
  }
  /** Replies the WebMCP tools give an AI agent acting for a visitor in this language. */
  agentTools: {
    pricingNote: string
    noFaqMatch: string
    contactOpened: string
  }
  footer: {
    description: string
    /** Heading for the services column, whose links come from `services.items`. */
    servicesTitle: string
    columns: {
      title: string
      links: { label: string; href: string }[]
    }[]
    social: { label: string; href: string }[]
    copyright: string
    privacy: string
    terms: string
  }
}
