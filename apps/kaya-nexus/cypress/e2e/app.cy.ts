/**
 * Test End-to-End (E2E) pour l'application Kaya Nexus
 */
describe('Navigation de l\'application', () => {
  it('devrait afficher la page d\'accueil', () => {
    // Visiter la racine de l'application
    cy.visit('/');
    // Vérifier si le titre 'Kaya Nexus' est visible
    cy.contains('Kaya Nexus').should('be.visible');
  });

  // Ajoutez d'autres tests E2E ici (ex: login, navigation entre modules)
});
