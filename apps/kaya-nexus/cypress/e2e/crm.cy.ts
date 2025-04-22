/// <reference types="cypress" />

// Tests CRM mis à jour pour accès autorisé et non autorisé
describe('Module CRM', () => {
  it('affiche un message "Accès refusé" si non connecté', () => {
    cy.clearCookies();
    cy.visit('/crm');
    cy.url().should('include', '/access-denied');
    cy.contains('Accès refusé').should('be.visible');
  });

  it('accède à la page CRM si connecté', () => {
    cy.clearCookies();
    cy.visit('/');
    cy.setCookie('authToken', 'fake-token', { path: '/' });
    cy.visit('/crm');
    cy.contains('CRM Créatif').should('be.visible');
  });
});
