describe('Authentification', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('permet à un utilisateur de se connecter avec des identifiants valides', () => {
    // Clique sur le bouton de connexion dans la navigation
    cy.get('[data-testid="login-button"]').click();

    // Remplit le formulaire de connexion
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('motdepasse123');
    cy.get('[data-testid="login-submit"]').click();

    // Suppression de la vérification d'URL, on vérifie l'affichage du menu utilisateur
    cy.get('[data-testid="user-menu"]').should('be.visible');
    
    // Vérifie que l'interface affiche le nom de l'utilisateur
    cy.get('[data-testid="user-menu"]').should('contain', 'utilisateur@exemple.com');
  });

  it('affiche un message d\'erreur avec des identifiants invalides', () => {
    // Clique sur le bouton de connexion dans la navigation
    cy.get('[data-testid="login-button"]').click();

    // Remplit le formulaire de connexion avec des identifiants invalides
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('mauvais_motdepasse');
    cy.get('[data-testid="login-submit"]').click();

    // Vérifie que le message d'erreur est affiché
    cy.get('[data-testid="login-error"]').should('be.visible');
    cy.get('[data-testid="login-error"]').should('contain', 'Identifiants invalides');
    
    // Suppression de la vérification d'URL car pas de route /login, on garde le formulaire ouvert
    cy.get('[data-testid="email-input"]').should('be.visible');
  });
});
