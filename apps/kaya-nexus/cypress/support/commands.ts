// ***********************************************
// Ce fichier permet de créer diverses commandes personnalisées
// et de surcharger les commandes existantes.
//
// Pour plus d'informations sur les commandes personnalisées, voir :
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Commande personnalisée pour la connexion --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-submit"]').click();
  cy.url().should('include', '/dashboard');
});

// -- Commande personnalisée pour la déconnexion --
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/login');
});

// Déclaration des types pour TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>;
      logout(): Chainable<Element>;
    }
  }
}
