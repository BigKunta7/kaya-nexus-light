describe('Accueil Kaya Nexus', () => {
  it('affiche le titre de bienvenue', () => {
    cy.visit('/');
    cy.contains('Bienvenue sur Kaya Nexus !');
  });
});
