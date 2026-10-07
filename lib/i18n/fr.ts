import type { Dictionary } from './types'

/**
 * French, as written in France (fr-FR), addressing the reader as "vous".
 *
 * Two conventions here differ from the English and Spanish dictionaries:
 *
 *  - French puts a space before ? ! : ; and between a figure and its unit, and
 *    that space must not break across lines. It is written as \u00a0, spelled
 *    out, so that an editor or formatter cannot quietly turn it back into an
 *    ordinary space. Keep it when editing: "Encore des questions\u00a0?".
 *    It is U+00A0 rather than the narrow U+202F that French typography prefers
 *    before ? ! ; - none of the site's four fonts has a glyph for the latter.
 *  - Apostrophes are the typographic ’ (U+2019), which is correct French and
 *    also needs no escaping inside these single-quoted strings.
 *
 * Headings use sentence case. Capitalising Every Word, as the other two
 * languages do, reads as a mistake in French.
 */
export const fr: Dictionary = {
  locale: 'fr',
  meta: {
    description:
      'Nous transformons vos idées en une présence en ligne performante\u00a0: du site web percutant à l’identité de marque complète.',
    keywords: ['création de site web', 'agence digitale', 'développement web', 'branding', 'marketing digital', 'SO Agency'],
  },
  notFound: {
    headline: 'Mission échouée. Crash de fusée détecté.',
    subheading: '404 — Cette page a quitté l’orbite.',
    description:
      'La page que vous cherchez n’existe pas ou s’est perdue dans l’espace. Nous vous remettons sur la bonne trajectoire.',
    backHome: 'Retour en orbite',
    contactUs: 'Nous contacter',
    easterEgg: 'Houston, nous avons un problème…',
  },
  navbar: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Méthode', href: '#process' },
      { label: 'Équipe', href: '#team' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Démarrer',
    toggleMenu: 'Ouvrir ou fermer le menu',
  },
  languageSwitcher: {
    label: 'Sélecteur de langue',
    switchTo: 'Changer de langue\u00a0: {language}',
  },
  hero: {
    badge: 'Votre partenaire de lancement digital',
    headline: 'Votre vision, notre design de haut vol',
    description:
      'Nous transformons vos idées en une présence en ligne performante\u00a0: du site web percutant à l’identité de marque complète.',
    ctaPrimary: 'Réserver mon diagnostic gratuit',
    ctaSecondary: 'Découvrir nos services',
  },
  services: {
    sectionTitle: 'Nos expertises',
    sectionDescription:
      'Des services spécialisés, pensés pour faire réussir votre entreprise sur tous les canaux digitaux.',
    cta: 'Parlons-en',
    ctaMessage:
      'Bonjour SO Agency 👋\n\nVotre offre *{service}* m’intéresse.\n\nMon projet en quelques mots\u00a0:',
    items: [
      {
        title: 'Design & développement web',
        description:
          'Des sites sur mesure, rapides et bâtis sur des technologies modernes. Nous concevons des plateformes performantes qui captent et retiennent vos visiteurs.',
      },
      {
        title: 'Design UX/UI',
        description:
          'Des interfaces intuitives, pensées pour convertir. Chaque pixel a un rôle\u00a0: guider vos utilisateurs tout au long de leur parcours.',
      },
      {
        title: 'E-commerce',
        description:
          'Des boutiques en ligne clés en main, conçues pour fluidifier l’achat et maximiser vos conversions.',
      },
      {
        title: 'Branding & identité',
        description:
          'Des identités visuelles complètes. Nous créons une signature unique, qui résonne dans tout votre secteur et assoit votre autorité.',
      },
      {
        title: 'Réseaux sociaux',
        description:
          'Nous transformons l’engagement en prospects grâce à des stratégies de contenu réfléchies et à des campagnes pilotées par la donnée.',
      },
      {
        title: 'Automatisation par l’IA',
        description:
          'Des outils intelligents pour fluidifier vos opérations. Une technologie de nouvelle génération, actuellement en développement.',
        badge: 'Bientôt',
      },
    ],
    guide: {
      title: 'Vous ne savez pas [par où commencer]\u00a0?',
      description:
        'Dites-nous où en est votre projet\u00a0: nous vous indiquons par où décoller. Lors de votre appel de diagnostic gratuit, nous vous recommandons la trajectoire la mieux adaptée à votre activité.',
      faqLink: 'Voir les questions fréquentes',
      whatsappMessage:
        'Bonjour SO Agency 👋\n\nJe ne sais pas par où commencer et je souhaite réserver un appel de diagnostic gratuit.\n\nMon projet en quelques mots\u00a0:',
    },
  },
  process: {
    sectionTitle: 'Notre méthode',
    sectionDescription:
      'Une méthode éprouvée, qui vous mène de l’idée à l’impact. Claire, collaborative et pensée pour aller vite.',
    steps: [
      {
        number: '01',
        title: 'Découverte',
        subtitle: 'Check-list prévol',
        description:
          'Nous plongeons au cœur de votre activité pour comprendre vos objectifs, votre audience et votre environnement concurrentiel.',
      },
      {
        number: '02',
        title: 'Stratégie',
        subtitle: 'Plan de mission',
        description:
          'Ensemble, nous traçons une feuille de route claire, avec des jalons définis et des résultats mesurables.',
      },
      {
        number: '03',
        title: 'Lancement',
        subtitle: 'Décollage',
        description:
          'Nous exécutons avec précision et livrons un travail de qualité, dans vos délais.',
      },
      {
        number: '04',
        title: 'Croissance',
        subtitle: 'En orbite',
        description:
          'Un accompagnement et une optimisation dans la durée, pour que votre activité continue de grandir et de prospérer.',
      },
    ],
  },
  benefits: {
    sectionTitle: 'Pourquoi nos clients nous choisissent',
    sectionDescription:
      'Nous ne sommes pas une agence de plus. Nous sommes votre partenaire de lancement, pleinement investi dans votre réussite.',
    items: [
      {
        title: 'Un vrai partenaire',
        description:
          'Nous travaillons avec vous, pas seulement pour vous. Votre réussite est notre mission\u00a0: nous nous investissons dans votre croissance.',
      },
      {
        title: 'Livraison rapide',
        description:
          'La qualité, sans attendre. Nous avançons efficacement pour tenir vos échéances, sans compromis sur le résultat.',
      },
      {
        title: 'Tarifs flexibles',
        description:
          'Une qualité premium à des tarifs accessibles. Des formules pensées pour les entreprises de toutes tailles.',
      },
      {
        title: 'De A à Z',
        description:
          'Une seule équipe pour le branding, le web et le marketing. Une exécution fluide, quels que soient vos besoins digitaux.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Nos réalisations',
    sectionTitle: 'De l’idée au chef-d’œuvre',
    visitWebsite: 'Voir le site',
    pauseAutoplay: 'Mettre le défilement automatique en pause',
    resumeAutoplay: 'Reprendre le défilement automatique',
    previousProject: 'Projet précédent',
    nextProject: 'Projet suivant',
    goToProject: 'Aller au projet {number}',
    projects: [
      {
        title: 'La Feika',
        subtitle: 'Produits frais, de la Chine à l’Amérique latine',
        description:
          'Plateforme e-commerce qui relie les fournisseurs chinois de produits frais aux marchés d’Amérique latine. Une solution digitale complète pour le commerce transfrontalier.',
        tags: ['E-commerce', 'Développement web', 'Branding'],
      },
      {
        title: "It's Fuluz Time",
        subtitle: 'Maroquinerie sans cruauté animale',
        description:
          'Une belle adresse pour une maroquinerie de qualité, entièrement sans cruauté animale\u00a0: sacs à main, portefeuilles et bien plus encore.',
        tags: ['Design web', 'Développement web', 'Branding'],
      },
      {
        title: 'Yaku Adventures',
        subtitle: 'Tourisme et expériences de randonnée',
        description:
          'Plateforme de tourisme d’aventure qui met en valeur des randonnées à couper le souffle et des aventures en plein air à travers l’Amérique du Sud.',
        tags: ['Design web', 'E-commerce', 'Développement web'],
      },
      {
        title: 'Singing Rooster',
        subtitle: 'Une marketplace haut de gamme de café, de chocolat et d’artisanat',
        description:
          'Singing Rooster est un site e-commerce dédié au café, au chocolat et à l’art, avec abonnements et vente en gros comme au détail.',
        tags: ['Sécurité web', 'Développement d’applications', 'Optimisation'],
      },
    ],
  },
  team: {
    sectionTitle: 'Aux commandes',
    sectionDescription: 'L’équipage qui pilote votre mission vers la réussite.',
    members: [
      {
        name: 'Oscar & Miguel',
        label: 'Associés fondateurs',
        description:
          'Le duo derrière SO Agency. Nous concevons, développons et lançons des présences en ligne vraiment performantes, en alliant développement stratégique et design UX/UI affûté.',
      },
    ],
  },
  cta: {
    headline: 'Et si nous lancions votre présence en ligne\u00a0?',
    description:
      'Parlons de votre projet et de la façon dont nous pouvons vous aider à atteindre de nouveaux sommets. Réservez dès aujourd’hui votre appel de diagnostic gratuit.',
    ctaPrimary: 'Concrétisons votre projet',
    ctaSecondary: 'Envoyer un message',
    responseTime: 'Nous répondons généralement sous 24\u00a0heures',
    whatsappMessage:
      'Bonjour SO Agency 👋\n\nJe souhaite réserver un appel de diagnostic gratuit.\n\nMon projet en quelques mots\u00a0:',
  },
  faq: {
    sectionTitle: 'Questions fréquentes',
    sectionDescription: 'Tout ce qu’il faut savoir avant de décoller ensemble.',
    count: '{count} questions',
    stillHaveQuestions: 'Encore des questions\u00a0?',
    sendMessage: 'Écrivez-nous.',
    items: [
      {
        question: 'Combien de temps faut-il pour créer un site web\u00a0?',
        answer:
          'La plupart des projets sont livrés en 3 à 6\u00a0semaines, selon leur périmètre et leur complexité. Une landing page ou un site portfolio peut être en ligne en 2\u00a0semaines seulement, tandis qu’une boutique e-commerce complète ou une identité de marque demande généralement 4 à 8\u00a0semaines. Nous convenons toujours d’un calendrier clair avant de commencer.',
      },
      {
        question: 'Combien coûte un projet avec SO Agency\u00a0?',
        answer:
          'Chaque projet est chiffré sur mesure, car aucune entreprise ne ressemble à une autre. À titre indicatif, nos projets de design et de développement web sont accessibles à partir de 1\u00a0500\u00a0€, et nos offres de branding à partir de 800\u00a0€. Nous proposons des modalités de paiement flexibles et pouvons adapter une formule à votre budget. Réservez un appel de diagnostic gratuit\u00a0: vous recevrez un devis précis, sans surprise.',
      },
      {
        question: 'Quels services propose SO Agency\u00a0?',
        answer:
          'Nous couvrons toute la chaîne d’un lancement digital\u00a0: design et développement web, design UX/UI, e-commerce, branding et identité visuelle, stratégie sur les réseaux sociaux et automatisation par l’IA. Que vous ayez besoin d’un seul service ou de l’ensemble, nous travaillons comme une extension de votre équipe.',
      },
      {
        question: 'Faut-il déjà avoir une identité de marque avant de créer un site web\u00a0?',
        answer:
          'Pas du tout. Beaucoup de nos clients nous contactent au tout début de leur aventure. Nous pouvons commencer par le branding, puis décliner cette identité sur votre site web, ou mener les deux de front pour gagner du temps. Nous vous recommanderons la meilleure approche lors de votre appel de diagnostic.',
      },
      {
        question: 'Mon site sera-t-il optimisé pour les moteurs de recherche\u00a0?',
        answer:
          'Oui. Chaque site que nous créons respecte les bonnes pratiques actuelles du référencement naturel (SEO)\u00a0: HTML sémantique, optimisation des performances, métadonnées soignées, balises Open Graph, données structurées (JSON-LD) et sitemap. Si vous avez besoin d’une stratégie SEO ou de contenus dans la durée, nous pouvons les intégrer à un plan de croissance.',
      },
      {
        question: 'Que se passe-t-il après le lancement du projet\u00a0?',
        answer:
          'Le lancement n’est pas une fin\u00a0: c’est le début de la mise en orbite. Nous proposons des formules d’accompagnement après lancement, qui comprennent le suivi des performances, les mises à jour de contenu, les correctifs de sécurité et le marketing en continu. Après la mise en ligne, nous restons à vos côtés.',
      },
      {
        question: 'SO Agency peut-elle travailler avec des clients en France et en Europe\u00a0?',
        answer:
          'Tout à fait. Nous accompagnons des clients en Amérique latine, aux États-Unis, en Europe et au-delà. Notre équipe travaille à distance et échange en français, en anglais et en espagnol\u00a0: la distance n’est jamais un frein à un travail de qualité.',
      },
    ],
  },
  quickContact: {
    label: 'Menu de contact rapide',
    close: 'Fermer le menu',
    heading: 'Créons quelque chose de grand',
    cta: 'Nous contacter',
    whatsappMessage:
      'Bonjour SO Agency 👋\n\nJ’aimerais vous parler d’un projet.\n\nMon projet en quelques mots\u00a0:',
  },
  structuredData: {
    description:
      'SO Agency transforme les idées en présences en ligne performantes\u00a0: du site web percutant à l’identité de marque complète. Votre partenaire de lancement digital.',
    catalogName: 'Services d’agence digitale',
    home: 'Accueil',
    services: [
      {
        name: 'Design et développement web',
        description:
          'Des sites web sur mesure et performants, bâtis sur des technologies modernes. Des plateformes rapides qui retiennent les utilisateurs et transforment les visiteurs en clients.',
      },
      {
        name: 'Design UX/UI',
        description:
          'Des interfaces intuitives, pensées pour la conversion. Chaque pixel a un rôle\u00a0: guider l’utilisateur vers vos objectifs commerciaux.',
      },
      {
        name: 'Solutions e-commerce',
        description:
          'Conception et développement de boutiques en ligne de bout en bout, pour des transactions sans friction, une conversion maximale et une croissance évolutive.',
      },
      {
        name: 'Branding et identité',
        description:
          'Des identités visuelles complètes — logos, chartes graphiques, typographie et palettes de couleurs — qui assoient votre autorité dans votre secteur.',
      },
      {
        name: 'Marketing sur les réseaux sociaux',
        description:
          'Des stratégies de contenu réfléchies et des campagnes pilotées par la donnée, qui transforment l’engagement social en prospects qualifiés et en chiffre d’affaires.',
      },
      {
        name: 'Automatisation par l’IA',
        description:
          'Automatisation des flux de travail et outils intelligents de nouvelle génération, pour fluidifier vos opérations et réduire les tâches manuelles.',
      },
    ],
  },
  agentTools: {
    pricingNote:
      'Remarque\u00a0: ces montants sont des points de départ, pas des devis définitifs.',
    noFaqMatch: 'Aucune entrée de la FAQ ne correspond. Questions disponibles\u00a0:',
    contactOpened:
      'WhatsApp s’est ouvert pour contacter SO Agency. L’équipe répond généralement sous 24\u00a0heures.',
  },
  footer: {
    description:
      'Votre partenaire de lancement digital. Nous aidons les entreprises à se lancer et à grandir grâce à un branding stratégique, au développement web et au marketing.',
    servicesTitle: 'Services',
    columns: [
      {
        title: 'L’agence',
        links: [
          { label: 'Méthode', href: '#process' },
          { label: 'Équipe', href: '#team' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    social: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
    copyright: 'SO Agency. Tous droits réservés.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d’utilisation',
  },
}
