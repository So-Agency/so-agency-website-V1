import type { Locale } from '@/lib/i18n/types'

type Props = {
  locale: Locale
  baseUrl: string
}

const content: Record<Locale, {
  description: string
  services: { name: string; description: string }[]
  faqs: { question: string; answer: string }[]
}> = {
  en: {
    description: 'SO Agency transforms business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
    services: [
      {
        name: 'Web Design & Development',
        description: 'Custom, performance-driven websites built on modern stacks. High-performance platforms that keep users engaged and convert visitors into customers.',
      },
      {
        name: 'UX/UI Design',
        description: 'Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user journey toward your business goals.',
      },
      {
        name: 'E-Commerce Solutions',
        description: 'End-to-end online store design and development for frictionless transactions, maximum conversion, and scalable growth.',
      },
      {
        name: 'Branding & Identity',
        description: 'Full visual identity systems — logos, brand guidelines, typography, and color systems — that establish authority in your industry.',
      },
      {
        name: 'Social Media Marketing',
        description: 'Calculated content strategies and data-driven campaigns that turn social engagement into qualified leads and revenue.',
      },
      {
        name: 'AI Automation',
        description: 'Next-generation workflow automation and intelligent tooling to streamline operations and reduce manual overhead.',
      },
    ],
    faqs: [
      {
        question: 'What services does SO Agency offer?',
        answer: 'SO Agency offers web design and development, UX/UI design, e-commerce solutions, branding and visual identity, social media marketing, and AI automation. We are a full-service digital agency serving businesses worldwide.',
      },
      {
        question: 'How long does it take to build a website with SO Agency?',
        answer: 'Most projects are delivered within 2–6 weeks depending on scope. We work efficiently to hit your milestones without compromising quality. Book a free diagnostic call to get a precise timeline for your project.',
      },
      {
        question: 'How much does SO Agency charge for web design?',
        answer: 'SO Agency offers flexible pricing packages designed to fit businesses of all sizes, from startups to established brands. Contact us for a custom quote tailored to your specific goals and budget.',
      },
    ],
  },
  es: {
    description: 'SO Agency transforma ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas. Tu socio de lanzamiento digital.',
    services: [
      {
        name: 'Diseño y Desarrollo Web',
        description: 'Sitios web personalizados y de alto rendimiento construidos sobre tecnologías modernas. Plataformas que mantienen a los usuarios comprometidos y convierten visitas en clientes.',
      },
      {
        name: 'Diseño UX/UI',
        description: 'Interfaces intuitivas y orientadas a la conversión. Cada píxel tiene un propósito: guiar al usuario hacia los objetivos de tu negocio.',
      },
      {
        name: 'Soluciones E-Commerce',
        description: 'Diseño y desarrollo integral de tiendas en línea para transacciones sin fricciones, máxima conversión y crecimiento escalable.',
      },
      {
        name: 'Branding e Identidad',
        description: 'Sistemas de identidad visual completos — logos, guías de marca, tipografía y sistemas de color — que establecen autoridad en tu industria.',
      },
      {
        name: 'Marketing en Redes Sociales',
        description: 'Estrategias de contenido calculadas y campañas basadas en datos que convierten el engagement social en leads calificados e ingresos.',
      },
      {
        name: 'Automatización con IA',
        description: 'Automatización de flujos de trabajo de próxima generación y herramientas inteligentes para optimizar operaciones y reducir la carga manual.',
      },
    ],
    faqs: [
      {
        question: '¿Qué servicios ofrece SO Agency?',
        answer: 'SO Agency ofrece diseño y desarrollo web, diseño UX/UI, soluciones de e-commerce, branding e identidad visual, marketing en redes sociales y automatización con IA. Somos una agencia digital de servicio completo que atiende empresas a nivel mundial.',
      },
      {
        question: '¿Cuánto tiempo tarda SO Agency en construir un sitio web?',
        answer: 'La mayoría de los proyectos se entregan en 2 a 6 semanas según el alcance. Trabajamos eficientemente para cumplir tus plazos sin comprometer la calidad. Reserva una llamada de diagnóstico gratuita para obtener un cronograma preciso para tu proyecto.',
      },
      {
        question: '¿Cuánto cobra SO Agency por diseño web?',
        answer: 'SO Agency ofrece paquetes de precios flexibles diseñados para empresas de todos los tamaños, desde startups hasta marcas consolidadas. Contáctanos para una cotización personalizada según tus objetivos y presupuesto.',
      },
    ],
  },
}

export function SchemaMarkup({ locale, baseUrl }: Props) {
  const { description, services, faqs } = content[locale]
  const pageUrl = `${baseUrl}/${locale}/`

  const graph = [
    // 1. Organization
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'SO Agency',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      description,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Spanish'],
        url: 'https://wa.me/message/5MH2JY5B4ERVJ1',
      },
      sameAs: [
        'https://soagency.dev',
        'https://www.instagram.com/soagency.dev',
      ],
      foundingDate: '2023',
      knowsLanguage: ['en', 'es'],
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide',
      },
    },
    // 2. WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'SO Agency',
      description,
      publisher: { '@id': `${baseUrl}/#organization` },
      inLanguage: [locale],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/${locale}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: locale === 'en' ? 'SO Agency | Design. Build. Launch.' : 'SO Agency | Diseña. Construye. Lanza.',
      description,
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#organization` },
      inLanguage: locale,
    },
    // 4. ProfessionalService with OfferCatalog
    {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#service`,
      name: 'SO Agency',
      url: pageUrl,
      image: `${baseUrl}/og-image.png`,
      description,
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Credit Card, Bank Transfer',
      openingHours: 'Mo-Fr 09:00-18:00',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'en' ? 'Digital Agency Services' : 'Servicios de Agencia Digital',
        itemListElement: services.map((svc, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            provider: { '@id': `${baseUrl}/#organization` },
            url: pageUrl,
          },
        })),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish'],
        url: 'https://wa.me/message/5MH2JY5B4ERVJ1',
      },
    },
    // 5. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: pageUrl,
        },
      ],
    },
    // 6. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
