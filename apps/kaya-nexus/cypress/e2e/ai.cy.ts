/// <reference types="cypress" />

// Tests IA mis à jour pour accès autorisé et non autorisé
describe('Module IA', () => {
  it('affiche un message "Accès refusé" si non connecté', () => {
    cy.clearCookies();
    cy.visit('/ai');
    cy.url().should('include', '/access-denied');
    cy.contains('Accès refusé').should('be.visible');
  });

  it('accède à la page IA si connecté', () => {
    cy.clearCookies();
    cy.visit('/');
    cy.setCookie('authToken', 'fake-token', { path: '/' });
    cy.visit('/ai');
    cy.contains('IA Collaborative').should('be.visible');
  });
});
