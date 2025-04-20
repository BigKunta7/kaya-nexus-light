/**
 * Test d'intégration pour la page d'accueil
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page'; // Assurez-vous que le chemin est correct

describe('Page d\'accueil', () => {
  it('devrait afficher le titre Kaya Nexus', () => {
    render(<Home />);
    // Vérifie si un élément contenant le texte 'Kaya Nexus' est présent
    // Utilisez une regex insensible à la casse pour plus de robustesse
    expect(screen.getByText(/Kaya Nexus/i)).toBeInTheDocument();
  });

  // Ajoutez d'autres tests ici pour vérifier la présence d'autres éléments
});
