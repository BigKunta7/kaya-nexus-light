// Test E2E minimaliste pour vérifier le fonctionnement de l'app Kaya Nexus

describe('Smoke test Kaya Nexus', () => {
  it('Affiche la page d\'accueil et change la langue', () => {
    cy.visit('/');
    cy.get('[data-cy=language-switcher]').select('English').should('have.value', 'en');
  });

  it('Sélectionne un hub', () => {
    cy.visit('/');
    cy.get('[data-cy=hub-selector]').select('Guadeloupe').should('have.value', 'gwp');
  });
});
