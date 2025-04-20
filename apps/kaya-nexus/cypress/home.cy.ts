/// <reference types="cypress" />

describe('Accueil Kaya Nexus', () => {
  it('affiche le titre et permet de changer de langue et de hub', () => {
    cy.visit('/');
    cy.contains('Kaya Nexus').should('exist');
    // Test du sélecteur de langue
    cy.get('select#lang-switcher').select('en-US');
    cy.contains('Welcome to the Kaya Nexus platform').should('exist');
    cy.get('select#lang-switcher').select('fr-FR');
    cy.contains('Bienvenue sur la plateforme Kaya Nexus').should('exist');
    // Test du sélecteur de hub
    cy.get('select#hub-selector').select('gwp');
    cy.get('body').should('exist'); // À adapter selon affichage spécifique hub
  });
});
