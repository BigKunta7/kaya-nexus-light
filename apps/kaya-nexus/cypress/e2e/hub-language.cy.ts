describe('Hub & Language Switcher', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('affiche le sélecteur de hub et permet de le changer', () => {
    cy.get('[data-testid="hub-selector"]').should('exist');
    cy.get('[data-testid="hub-selector"]').select('gwp');
    cy.get('[data-testid="hub-selector"]').should('have.value', 'gwp');
  });

  it('affiche le sélecteur de langue et permet de le changer', () => {
    cy.get('[data-testid="language-switcher"]').should('exist');
    cy.get('[data-testid="language-switcher"]').select('en');
    cy.get('[data-testid="language-switcher"]').should('have.value', 'en');
  });
});
