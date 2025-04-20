/**
 * Système de couleurs du Design System Kaya Nexus.
 * Palette de couleurs unifiée pour toutes les filiales de KK Holding.
 * @module DesignSystem/Foundation/Colors
 */

// Couleurs principales (à adapter selon l'identité visuelle de KK Holding)
export const primaryColors = {
  primary100: '#F0F4FF', // Très clair
  primary200: '#D9E2FF',
  primary300: '#B3C6FF',
  primary400: '#809CFF',
  primary500: '#4D72FF', // Couleur principale
  primary600: '#3A58CC',
  primary700: '#263E99',
  primary800: '#132466',
  primary900: '#0A1333', // Très foncé
};

// Couleurs secondaires
export const secondaryColors = {
  secondary100: '#FFF0F4',
  secondary200: '#FFD9E2',
  secondary300: '#FFB3C6',
  secondary400: '#FF809C',
  secondary500: '#FF4D72', // Couleur secondaire principale
  secondary600: '#CC3A58',
  secondary700: '#99263E',
  secondary800: '#661324',
  secondary900: '#330A13',
};

// Couleurs neutres
export const neutralColors = {
  white: '#FFFFFF',
  gray100: '#F7F9FC',
  gray200: '#EDF1F7',
  gray300: '#E4E9F2',
  gray400: '#C5CEE0',
  gray500: '#8F9BB3', // Gris moyen
  gray600: '#6E7A96',
  gray700: '#4E5874',
  gray800: '#2E3A59',
  gray900: '#1E2742',
  black: '#0D1321',
};

// Couleurs sémantiques
export const semanticColors = {
  success100: '#E6FFF0',
  success500: '#00E676', // Succès
  success900: '#00683A',
  
  warning100: '#FFF9E6',
  warning500: '#FFCA28', // Avertissement
  warning900: '#805B00',
  
  error100: '#FFE6E6',
  error500: '#FF4D4D', // Erreur
  error900: '#800000',
  
  info100: '#E6F5FF',
  info500: '#2196F3', // Information
  info900: '#0D3C61',
};

// Couleurs spécifiques aux filiales
export const subsidiaryColors = {
  // 7K (Gestion de carrière musicale)
  sevenK: {
    primary: '#6200EA', // Violet profond
    secondary: '#B388FF',
    accent: '#3D5AFE',
  },
  
  // OLYNEA (Bien-être & transformation personnelle)
  olynea: {
    primary: '#00BFA5', // Turquoise apaisant
    secondary: '#84FFFF',
    accent: '#1DE9B6',
  },
  
  // EVARY (Séjours immersifs culturels)
  evary: {
    primary: '#FF6D00', // Orange chaleureux
    secondary: '#FFAB40',
    accent: '#FFD180',
  },
  
  // KEOPS (Hub business management)
  keops: {
    primary: '#0D47A1', // Bleu professionnel
    secondary: '#42A5F5',
    accent: '#90CAF9',
  },
  
  // KOPILOT (IA & SaaS)
  kopilot: {
    primary: '#2979FF', // Bleu tech
    secondary: '#82B1FF',
    accent: '#448AFF',
  },
  
  // LIFEŸ (Label textile)
  lifey: {
    primary: '#00796B', // Vert émeraude
    secondary: '#4DB6AC',
    accent: '#80CBC4',
  },
};

// Export de toutes les couleurs
export const colors = {
  primary: primaryColors,
  secondary: secondaryColors,
  neutral: neutralColors,
  semantic: semanticColors,
  subsidiary: subsidiaryColors,
};

export default colors;
