import { createI18n } from 'next-international';

// Définition simplifiée pour Next.js 15 App Router
export const { useI18n, useScopedI18n, I18nProvider, useChangeLocale, useCurrentLocale } = createI18n({
  fr: () => import('../locales/fr'),
  en: () => import('../locales/en'),
});

// Fonction utilitaire pour changer de langue côté client
export function switchLocale(locale: 'fr' | 'en') {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
  window.location.reload();
}
