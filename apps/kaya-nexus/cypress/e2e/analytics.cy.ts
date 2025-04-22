/// <reference types="cypress" />

// Tests Analytique mis à jour pour accès autorisé et non autorisé
describe('Module Analytique', () => {
  it('affiche un message "Accès refusé" si non connecté', () => {
    cy.clearCookies();
    cy.visit('/analytics');
    cy.url().should('include', '/access-denied');
    cy.contains('Accès refusé').should('be.visible');
  });

  it('accède à la page Analytique si connecté', () => {
    cy.visit('/');
    cy.setCookie('authToken', 'fake-token', { path: '/' });
    cy.visit('/analytics');
    cy.contains('Analytique').should('be.visible');
  });
});
