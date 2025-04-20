import fr from './fr';
import en from './en';

export const locales = {
  fr,
  en,
};

export type Locale = keyof typeof locales;
