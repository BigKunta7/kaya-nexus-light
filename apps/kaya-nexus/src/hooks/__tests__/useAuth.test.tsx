/**
 * Tests pour le hook useAuth
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { AuthProvider, useAuth } from '../useAuth';

// Mock du module firebase/auth
let authCallbackRef: any = null;
const mockUnsubscribe = jest.fn();

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((_auth, callback) => {
    // Stocke le callback pour pouvoir le déclencher dans les tests
    authCallbackRef = callback;
    return mockUnsubscribe;
  })
}));

jest.mock('@/lib/firebase/client', () => ({
  auth: { currentUser: null }
}));

// Composant de test pour accéder au hook
function TestComponent() {
  const { user, loading } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.uid : 'non connecté'}</div>
      <div data-testid="loading">{loading ? 'chargement' : 'prêt'}</div>
    </div>
  );
}

describe('useAuth hook', () => {
  beforeEach(() => {
    // Réinitialiser les mocks et le callback
    jest.clearAllMocks();
    authCallbackRef = null;
  });

  it('initialise avec user = null et loading = true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Vérifie l'état initial
    expect(screen.getByTestId('user').textContent).toBe('non connecté');
    expect(screen.getByTestId('loading').textContent).toBe('chargement');
  });

  it('met à jour user et loading quand l\'état d\'authentification change', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Vérifie que le callback a été enregistré
    expect(authCallbackRef).not.toBeNull();
    
    // Simuler la connexion d'un utilisateur (important: utiliser act pour les mises à jour d'état React)
    const mockUser = { uid: 'test-uid-123' };
    await act(async () => {
      authCallbackRef(mockUser);
    });
    
    // Vérifie que l'état a été mis à jour
    expect(screen.getByTestId('user').textContent).toBe('test-uid-123');
    expect(screen.getByTestId('loading').textContent).toBe('prêt');
  });

  it('met à jour user à null quand l\'utilisateur se déconnecte', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // D'abord, simuler une connexion avec act
    const mockUser = { uid: 'test-uid-123' };
    await act(async () => {
      authCallbackRef(mockUser);
    });
    
    // Vérifie que l'utilisateur est connecté
    expect(screen.getByTestId('user').textContent).toBe('test-uid-123');
    
    // Simuler une déconnexion avec act
    await act(async () => {
      authCallbackRef(null);
    });
    
    // Vérifie que l'utilisateur est déconnecté
    expect(screen.getByTestId('user').textContent).toBe('non connecté');
  });

  it('se désabonne de l\'écouteur onAuthStateChanged à la désinscription', () => {
    // Reset le mock pour ce test spécifique
    mockUnsubscribe.mockClear();
    
    const { unmount } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Démonter le composant
    unmount();
    
    // Vérifie que la fonction de désinscription a été appelée
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
