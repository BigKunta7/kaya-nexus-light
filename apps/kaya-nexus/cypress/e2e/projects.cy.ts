/// <reference types="cypress" />

// Tests Projets mis à jour pour accès autorisé et non autorisé
describe('Module Projets', () => {
  it('affiche un message "Accès refusé" si non connecté', () => {
    cy.clearCookies();
    cy.visit('/projets');
    cy.url().should('include', '/access-denied');
    cy.contains('Accès refusé').should('be.visible');
  });

  it('accède à la page Projets si connecté', () => {
    cy.clearCookies();
    // Initialiser le domaine avant de poser le cookie
    cy.visit('/');
    cy.setCookie('authToken', 'fake-token', { path: '/' });
    cy.visit('/projets');
    cy.contains('Gestion des Projets').should('be.visible');
  });
});
