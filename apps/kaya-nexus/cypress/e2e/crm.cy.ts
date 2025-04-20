/// <reference types="cypress" />

describe('Module CRM', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('motdepasse123');
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="user-menu"]').should('contain', 'utilisateur@exemple.com');
  });

  it('accède à la page CRM', () => {
    cy.get('nav').contains('CRM').click();
    cy.url().should('include', '/crm');
    cy.contains('CRM').should('exist');
  });

  it('affiche une erreur si accès interdit', () => {
    // Supposons qu'on simule un utilisateur sans droits CRM
    // À adapter selon la logique d'authentification réelle
    cy.visit('/crm');
    cy.contains(/accès refusé|forbidden|unauthorized/i).should('exist');
  });
});
