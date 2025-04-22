// Test E2E minimaliste pour vérifier le fonctionnement de l'app Kaya Nexus

describe('Smoke test Kaya Nexus', () => {
  it('Affiche la page d\'accueil et change la langue', () => {
    cy.visit('/');
    cy.get('[data-cy=language-switcher]').click();
    cy.contains('English').click();
    cy.contains('Welcome').should('exist');
  });

  it('Sélectionne un hub', () => {
    cy.visit('/');
    cy.get('[data-cy=hub-selector]').click();
    cy.contains('Hub A').click();
    cy.contains('Hub A').should('exist');
  });
});
