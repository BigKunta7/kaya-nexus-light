import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { useAuth } from '../../hooks/useAuth';

// Mock du hook useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockSignIn = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      user: null,
      loading: false,
      error: null,
    });
  });

  test('affiche correctement le formulaire de connexion', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  test('soumet le formulaire avec les valeurs correctes', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /connexion/i });
    
    fireEvent.change(emailInput, { target: { value: 'utilisateur@exemple.com' } });
    fireEvent.change(passwordInput, { target: { value: 'motdepasse123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('utilisateur@exemple.com', 'motdepasse123');
    });
  });

  test('affiche un message d\'erreur lorsque la connexion échoue', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      user: null,
      loading: false,
      error: 'Identifiants invalides',
    });
    
    render(<LoginForm />);
    
    expect(screen.getByText('Identifiants invalides')).toBeInTheDocument();
  });

  test('désactive le bouton pendant le chargement', () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      user: null,
      loading: true,
      error: null,
    });
    
    render(<LoginForm />);
    
    expect(screen.getByRole('button', { name: /connexion/i })).toBeDisabled();
  });
});
