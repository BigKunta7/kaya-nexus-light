/// <reference types="cypress" />

describe('Module Finance', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('motdepasse123');
    cy.get('[data-testid="login-submit"]').click();
    cy.get('[data-testid="user-menu"]').should('contain', 'utilisateur@exemple.com');
  });

  it('accède à la page Finance', () => {
    cy.get('nav').contains('Finance').click();
    cy.url().should('include', '/finance');
    cy.contains('Finance').should('exist');
  });

  it('affiche une erreur si accès interdit', () => {
    cy.visit('/finance');
    cy.contains(/accès refusé|forbidden|unauthorized/i).should('exist');
  });
});
