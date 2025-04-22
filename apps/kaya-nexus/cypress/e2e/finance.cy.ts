/// <reference types="cypress" />

// Tests Finance mis à jour pour accès autorisé et non autorisé
describe('Module Finance', () => {
  it('affiche un message "Accès refusé" si non connecté', () => {
    cy.clearCookies();
    cy.visit('/finance');
    cy.url().should('include', '/access-denied');
    cy.contains('Accès refusé').should('be.visible');
  });

  it('accède à la page Finance si connecté', () => {
    cy.clearCookies();
    cy.visit('/');
    cy.setCookie('authToken', 'fake-token', { path: '/' });
    cy.visit('/finance');
    cy.contains('Gestion Financière').should('be.visible');
  });
});
