"use client";

/**
 * Module d'internationalisation simplifié pour Kaya Nexus
 */

// Types pour l'internationalisation
export type Locale = 'fr' | 'en';

// Fonction utilitaire pour changer de langue
export function switchLocale(locale: Locale): void {
  if (typeof document !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    window.location.reload();
  }
}

// Fonction pour récupérer la locale actuelle
export function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') {
    return 'fr'; // Valeur par défaut côté serveur
  }
  
  const storedLocale = document.cookie
    .split('; ')
    .find(row => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1] as Locale | undefined;
    
  return (storedLocale === 'fr' || storedLocale === 'en') ? storedLocale : 'fr';
}

// Traductions
export const translations = {
  fr: {
    welcome: "Bienvenue sur Kaya Nexus",
    projects: "Projets",
    crm: "Gestion de la relation client",
    finance: "Finance",
    analytics: "Analytiques",
    ai: "Intelligence Artificielle"
  },
  en: {
    welcome: "Welcome to Kaya Nexus",
    projects: "Projects",
    crm: "Customer Relationship Management",
    finance: "Finance",
    analytics: "Analytics",
    ai: "Artificial Intelligence"
  }
};
