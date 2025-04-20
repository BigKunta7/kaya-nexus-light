// ***********************************************************
// Ce fichier est traité et chargé automatiquement avant vos tests e2e
// Vous pouvez lire plus d'informations ici :
// https://on.cypress.io/configuration
// ***********************************************************

// Import des commandes pour les rendre disponibles globalement
import './commands';

// Déclaration globale des types Cypress
declare global {
  namespace Cypress {
    interface Chainable {
      // Ajoutez vos commandes personnalisées ici
      login(email: string, password: string): Chainable<Element>;
      logout(): Chainable<Element>;
    }
  }
}
