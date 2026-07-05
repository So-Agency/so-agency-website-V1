import type { Dictionary } from './types'

export const en: Dictionary = {
  locale: 'en',
  navbar: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Team', href: '#team' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Get Started',
  },
  hero: {
    badge: 'Your Digital Launch Partner',
    headline: 'Your vision, our stellar design',
    slogan: 'Design. Build. Launch.',
    description:
      'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    ctaPrimary: 'Book Your Free Diagnostic',
    ctaSecondary: 'See Our Services',
  },
  services: {
    sectionTitle: 'Core Systems',
    sectionDescription:
      'Specialized services designed to ensure total business success across all digital channels.',
    items: [
      {
        title: 'Web Design & Dev',
        description:
          'Custom, performance-driven sites built on modern stacks. We engineer high-performance platforms that keep users engaged.',
      },
      {
        title: 'UX/UI Design',
        description:
          "Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user's journey.",
      },
      {
        title: 'E-Commerce',
        description:
          'End-to-end online store solutions designed for frictionless transactions and maximum conversion.',
      },
      {
        title: 'Branding & Identity',
        description:
          'Full visual identity systems. We forge a unique signature that resonates across your industry, establishing undeniable authority.',
      },
      {
        title: 'Social Media',
        description:
          'Turning engagement into leads through calculated content strategies and data-driven campaigns.',
      },
      {
        title: 'AI Automation',
        description:
          'Streamlining operations with intelligent tools. Next-gen tech currently in development.',
        badge: 'Standby',
      },
    ],
  },
  process: {
    sectionTitle: 'How We Work',
    sectionDescription:
      'A proven process that takes you from idea to impact. Clear, collaborative, and built for speed.',
    steps: [
      {
        number: '01',
        title: 'Discovery',
        subtitle: 'Pre-Flight Check',
        description:
          'We dive deep into your business, understanding your goals, audience, and competitive landscape.',
      },
      {
        number: '02',
        title: 'Strategy',
        subtitle: 'Mission Planning',
        description:
          'Together, we craft a clear roadmap with defined milestones and measurable outcomes.',
      },
      {
        number: '03',
        title: 'Launch',
        subtitle: 'Liftoff',
        description: 'We execute with precision, delivering high-quality work on your timelines.',
      },
      {
        number: '04',
        title: 'Growth',
        subtitle: 'Orbit',
        description:
          'Ongoing support and optimization to keep your business scaling and thriving.',
      },
    ],
  },
  benefits: {
    sectionTitle: 'Why Clients Choose Us',
    sectionDescription:
      'We are not just another agency. We are your launch partners, invested in your success.',
    items: [
      {
        title: 'Partner-Driven',
        description:
          'We work alongside you, not just for you. Your success is our mission — we are invested in your growth.',
      },
      {
        title: 'Fast Delivery',
        description:
          'Quality at speed. We move efficiently to hit your milestones without compromising on results.',
      },
      {
        title: 'Flexible Pricing',
        description:
          'Premium quality at accessible rates. Packages designed to fit businesses of all sizes.',
      },
      {
        title: 'End-to-End',
        description:
          'One team for branding, web, and marketing. Seamless execution across all your digital needs.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Selected Work',
    sectionTitle: 'Turning Ideas Into Masterpieces',
    visitWebsite: 'Visit Website',
    pauseAutoplay: 'Pause autoplay',
    resumeAutoplay: 'Resume autoplay',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    projects: [
      {
        title: 'La Feika',
        subtitle: 'Fresh From China to LatAm',
        description:
          'E-commerce platform connecting Chinese fresh food suppliers with Latin American markets. A complete digital solution for cross-border commerce.',
        tags: ['E-Commerce', 'Web Development', 'Branding'],
      },
      {
        title: "It's Fuluz Time",
        subtitle: 'Cruelty-Free Leather Goods',
        description:
          'A great option for high-quality, completely Cruelty-Free leather goods. Their products range from handbags and wallets to more.',
        tags: ['Web Design', 'Web Development', 'Branding'],
      },
      {
        title: 'Yaku Adventures',
        subtitle: 'Tourism & Hiking Experiences',
        description:
          'Adventure tourism platform showcasing breathtaking hiking experiences and outdoor adventures across South America.',
        tags: ['Web Design', 'E-commerce', 'Web Development'],
      },
      {
        title: 'Singing Rooster',
        subtitle: 'A premium coffee, chocolate, and artisan marketplace',
        description:
          'Singing Rooster is an e-commerce website for coffee, chocolate, art, subscriptions, and wholesale/retail shopping experiences.',
        tags: ['Website Security', 'APP Development', 'Optimization'],
      },
    ],
  },
  team: {
    sectionTitle: 'Our Leadership',
    sectionDescription: 'The crew behind your mission to success.',
    members: [
      {
        name: 'Oscar & Miguel',
        label: 'Founding Partners',
        description:
          'The duo behind SO Agency. We design, build, and launch digital presences that actually perform — blending strategic development with sharp UX/UI design.',
      },
    ],
  },
  cta: {
    headline: 'Ready to Launch Your Digital Presence?',
    description:
      "Let's talk about your project and how we can help you reach new heights. Book a free diagnostic call today.",
    ctaPrimary: "Let's Make It Happen",
    ctaSecondary: 'Send a Message',
    responseTime: 'We typically respond within 24 hours',
  },
  footer: {
    tagline: 'Design. Build. Launch.',
    description:
      'Your digital launch partner. We help businesses launch and grow with strategic branding, web development, and marketing.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Web Design & Dev', href: '#services' },
          { label: 'Branding & Identity', href: '#services' },
          { label: 'E-Commerce', href: '#services' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Process', href: '#process' },
          { label: 'Team', href: '#team' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    social: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
    copyright: 'SO Agency. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
}
