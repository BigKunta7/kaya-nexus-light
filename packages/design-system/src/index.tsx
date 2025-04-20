/**
 * Point d'entrée du Design System Kaya Nexus.
 * Tous les composants réutilisables seront exportés ici.
 * @module DesignSystem
 */

// Export des fondations
export * from './foundation';

// Export des composants
export * from './components';

// Export des utilitaires
export { cn } from './utils/cn';

// Import pour l'export par défaut
import * as foundation from './foundation';
import * as components from './components';
import { cn } from './utils/cn';

// Export par défaut
export default {
  // Fondations
  ...foundation.default,
  // Composants
  ...components,
  // Utilitaires
  cn,
};
