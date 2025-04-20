import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm Component', () => {
  test('affiche correctement le formulaire de connexion', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  test('affiche un message d\'erreur lorsque la connexion échoue', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'foo@bar.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    await waitFor(() => {
      expect(screen.getByText('Identifiants invalides')).toBeInTheDocument();
    });
  });

  test('désactive le bouton pendant le chargement', async () => {
    const mockSignIn = jest.fn(() => new Promise((resolve) => setTimeout(resolve, 500)));
    render(<LoginForm signIn={mockSignIn} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@kaya.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Le bouton doit être désactivé juste après le clic
    expect(screen.getByRole('button', { name: /connexion/i })).toBeDisabled();
    // On attend la fin de la promesse pour vérifier qu'il est réactivé
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /connexion/i })).not.toBeDisabled();
    });
    expect(mockSignIn).toHaveBeenCalledWith('admin@kaya.com', 'admin');
  });
});
