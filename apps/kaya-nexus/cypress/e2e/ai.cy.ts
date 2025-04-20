/// <reference types="cypress" />

describe('Module IA', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('motdepasse123');
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="user-menu"]').should('contain', 'utilisateur@exemple.com');
  });

  it('accède à la page IA', () => {
    cy.get('nav').contains('IA').click();
    cy.url().should('include', '/ai');
    cy.contains('IA').should('exist');
  });

  it('affiche une erreur si accès interdit', () => {
    cy.visit('/ai');
    cy.contains(/accès refusé|forbidden|unauthorized/i).should('exist');
  });
});
