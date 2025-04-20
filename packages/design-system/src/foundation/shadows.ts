/**
 * Système d'ombres et d'élévation du Design System Kaya Nexus.
 * Définit les ombres standardisées pour créer une hiérarchie visuelle cohérente.
 * @module DesignSystem/Foundation/Shadows
 */

// Ombres de base (avec opacité variable pour s'adapter aux thèmes clairs et sombres)
export const shadows = {
  // Aucune ombre
  none: 'none',
  
  // Élévation subtile (cartes plates, éléments discrets)
  xs: '0 1px 2px rgba(16, 24, 40, 0.05)',
  
  // Élévation légère (cartes, boutons au repos)
  sm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
  
  // Élévation moyenne (cartes interactives, dropdowns)
  md: '0 4px 6px -1px rgba(16, 24, 40, 0.1), 0 2px 4px -1px rgba(16, 24, 40, 0.06)',
  
  // Élévation prononcée (cartes en survol, popovers)
  lg: '0 10px 15px -3px rgba(16, 24, 40, 0.1), 0 4px 6px -2px rgba(16, 24, 40, 0.05)',
  
  // Élévation importante (modales, dialogs)
  xl: '0 20px 25px -5px rgba(16, 24, 40, 0.1), 0 10px 10px -5px rgba(16, 24, 40, 0.04)',
  
  // Élévation maximale (éléments flottants, menus contextuels importants)
  '2xl': '0 25px 50px -12px rgba(16, 24, 40, 0.25)',
  
  // Ombre interne (inputs, boutons pressés)
  inner: 'inset 0 2px 4px rgba(16, 24, 40, 0.06)',
};

// Niveaux d'élévation pour les composants
export const elevations = {
  // Niveau 0 - Base (fond de page, éléments plats)
  base: shadows.none,
  
  // Niveau 1 - Légèrement élevé (cartes, sections)
  raised: shadows.sm,
  
  // Niveau 2 - Interactif (boutons, inputs, cartes interactives)
  interactive: shadows.md,
  
  // Niveau 3 - Flottant (dropdowns, tooltips)
  floating: shadows.lg,
  
  // Niveau 4 - Superposé (modales, dialogs)
  overlay: shadows.xl,
  
  // Niveau 5 - Suprême (éléments critiques, notifications importantes)
  supreme: shadows['2xl'],
};

// Transitions d'ombre pour les interactions
export const shadowTransitions = {
  fast: 'box-shadow 150ms ease-in-out',
  normal: 'box-shadow 200ms ease-in-out',
  slow: 'box-shadow 300ms ease-in-out',
};

// Préréglages pour les états des composants
export const componentStates = {
  // État par défaut
  default: {
    shadow: elevations.raised,
    transition: shadowTransitions.normal,
  },
  
  // État au survol
  hover: {
    shadow: elevations.interactive,
    transition: shadowTransitions.fast,
  },
  
  // État actif/pressé
  active: {
    shadow: shadows.inner,
    transition: shadowTransitions.fast,
  },
  
  // État focus
  focus: {
    shadow: `${elevations.interactive}, 0 0 0 3px rgba(77, 114, 255, 0.3)`,
    transition: shadowTransitions.fast,
  },
  
  // État désactivé
  disabled: {
    shadow: shadows.none,
    transition: shadowTransitions.normal,
  },
};

// Export de tous les systèmes d'ombre
export default {
  shadows,
  elevations,
  shadowTransitions,
  componentStates,
};
