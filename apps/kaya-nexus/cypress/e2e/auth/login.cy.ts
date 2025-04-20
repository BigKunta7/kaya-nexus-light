describe('Authentification', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('permet à un utilisateur de se connecter avec des identifiants valides', () => {
    // Intercepte les appels API pour simuler une connexion réussie
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/verifyPassword*', {
      statusCode: 200,
      body: {
        idToken: 'fake-token',
        email: 'utilisateur@exemple.com',
        refreshToken: 'fake-refresh-token',
        expiresIn: '3600',
        localId: 'fake-local-id',
      },
    }).as('loginRequest');

    // Clique sur le bouton de connexion dans la navigation
    cy.get('[data-testid="login-button"]').click();

    // Remplit le formulaire de connexion
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('motdepasse123');
    cy.get('[data-testid="login-submit"]').click();

    // Vérifie que la requête de connexion a été envoyée
    cy.wait('@loginRequest');

    // Vérifie que l'utilisateur est redirigé vers le tableau de bord
    cy.url().should('include', '/dashboard');
    
    // Vérifie que l'interface affiche le nom de l'utilisateur
    cy.get('[data-testid="user-menu"]').should('contain', 'utilisateur@exemple.com');
  });

  it('affiche un message d\'erreur avec des identifiants invalides', () => {
    // Intercepte les appels API pour simuler une erreur d'authentification
    cy.intercept('POST', '**/identitytoolkit/v3/relyingparty/verifyPassword*', {
      statusCode: 400,
      body: {
        error: {
          code: 400,
          message: 'INVALID_PASSWORD',
        },
      },
    }).as('loginRequest');

    // Clique sur le bouton de connexion dans la navigation
    cy.get('[data-testid="login-button"]').click();

    // Remplit le formulaire de connexion avec des identifiants invalides
    cy.get('[data-testid="email-input"]').type('utilisateur@exemple.com');
    cy.get('[data-testid="password-input"]').type('mauvais_motdepasse');
    cy.get('[data-testid="login-submit"]').click();

    // Vérifie que la requête de connexion a été envoyée
    cy.wait('@loginRequest');

    // Vérifie que le message d'erreur est affiché
    cy.get('[data-testid="login-error"]').should('be.visible');
    cy.get('[data-testid="login-error"]').should('contain', 'Identifiants invalides');
    
    // Vérifie que l'utilisateur reste sur la page de connexion
    cy.url().should('include', '/login');
  });
});
