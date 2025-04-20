/// <reference types="cypress" />

describe('Navigation de l\'application', () => {
  it('permet de naviguer entre les modules', () => {
    cy.visit('/');
    cy.get('nav').contains('CRM').click();
    cy.url().should('include', '/crm');
    cy.get('nav').contains('Accueil').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
