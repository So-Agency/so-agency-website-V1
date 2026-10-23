import type { Locale } from './types'

type ConsentCopy = {
  title: string; description: string; accept: string; reject: string; configure: string;
  save: string; close: string; preferences: string; necessary: string; analytics: string;
  marketing: string; details: string;
}
export const consentCopy: Record<Locale, ConsentCopy> = {
  es: {
    title: 'Tu privacidad, tu elección',
    description: 'Usamos cookies opcionales para conocer las visitas y medir nuestras campañas. Tú decides cuáles activar.',
    accept: 'Aceptar todas', reject: 'Rechazar opcionales', configure: 'Configurar',
    save: 'Guardar preferencias', close: 'Cerrar', preferences: 'Preferencias de cookies',
    necessary: 'Necesarias · siempre activas: recuerdan tu idioma y esta elección.',
    analytics: 'Analítica · Google Analytics y Microsoft Clarity',
    marketing: 'Publicidad · Meta y etiquetas publicitarias de Google',
    details: 'La analítica mide visitas e interacciones e incluye mapas de calor y grabaciones de sesión con Clarity. La publicidad mide campañas y permite personalizar anuncios. Las cookies opcionales solo se activan con tu permiso. Puedes cambiar esta elección desde el pie de página. La guardamos durante 180 días. Si retiras permisos, recargaremos la página para detener las herramientas ya cargadas.',
  },
  en: {
    title: 'Your privacy, your choice',
    description: 'We use optional cookies to understand visits and measure our campaigns. You choose which ones to enable.',
    accept: 'Accept all', reject: 'Reject optional', configure: 'Settings',
    save: 'Save preferences', close: 'Close', preferences: 'Cookie preferences',
    necessary: 'Necessary · always active: remember your language and this choice.',
    analytics: 'Analytics · Google Analytics and Microsoft Clarity',
    marketing: 'Advertising · Meta and Google advertising tags',
    details: 'Analytics measures visits and interactions, including heatmaps and session recordings with Clarity. Advertising measures campaigns and enables personalized ads. Optional cookies are enabled only with your permission. You can change your choice in the footer. We remember it for 180 days. Withdrawing permission reloads the page to stop tools already loaded.',
  },
  fr: {
    title: 'Votre vie privée, votre choix',
    description: 'Nous utilisons des cookies facultatifs pour comprendre les visites et mesurer nos campagnes. Vous choisissez lesquels activer.',
    accept: 'Tout accepter', reject: 'Refuser les facultatifs', configure: 'Configurer',
    save: 'Enregistrer mes choix', close: 'Fermer', preferences: 'Préférences des cookies',
    necessary: 'Nécessaires · toujours actifs : mémorisent votre langue et ce choix.',
    analytics: 'Analyse · Google Analytics et Microsoft Clarity',
    marketing: 'Publicité · Meta et balises publicitaires Google',
    details: 'L’analyse mesure les visites et les interactions, avec des cartes de chaleur et des enregistrements de session Clarity. La publicité mesure les campagnes et permet de personnaliser les annonces. Les cookies facultatifs ne sont activés qu’avec votre accord. Vous pouvez modifier ce choix en bas de page. Il est conservé pendant 180 jours. Le retrait d’une autorisation recharge la page pour arrêter les outils déjà chargés.',
  },
}
