/**
 * Tests pour le middleware RBAC requireRole
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { requireRole } from '../requireRole';

// Mocks pour Next.js et Firebase Admin
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      body,
      status: init?.status
    }))
  }
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn()
}));

describe('Middleware requireRole', () => {
  let mockRequest: Partial<NextRequest>;
  let mockHandler: jest.Mock;
  let mockVerifyIdToken: jest.Mock;

  beforeEach(() => {
    // Réinitialisation des mocks
    jest.clearAllMocks();

    // Configuration du mock pour la requête
    mockRequest = {
      headers: {
        get: jest.fn().mockImplementation((header) => {
          if (header === 'authorization') return 'Bearer test-token';
          return null;
        })
      }
    };

    // Mock pour le gestionnaire d'API
    mockHandler = jest.fn().mockResolvedValue(NextResponse.json({ success: true }));

    // Mock pour Firebase verifyIdToken
    mockVerifyIdToken = jest.fn();
    (getAuth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken
    });
  });

  it('retourne 401 si l\'en-tête Authorization est manquant', async () => {
    // Simulation d'une requête sans en-tête Authorization
    (mockRequest.headers!.get as jest.Mock).mockReturnValue(null);

    const middleware = requireRole(['admin'], mockHandler);
    const response = await middleware(mockRequest as NextRequest);

    // Vérifie la réponse d'erreur
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Non authentifié');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('retourne 401 si l\'en-tête Authorization n\'a pas le format Bearer', async () => {
    // Simulation d'une requête avec un format d'en-tête incorrect
    (mockRequest.headers!.get as jest.Mock).mockReturnValue('Basic test-token');

    const middleware = requireRole(['admin'], mockHandler);
    const response = await middleware(mockRequest as NextRequest);

    // Vérifie la réponse d'erreur
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Non authentifié');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('retourne 401 si le token est invalide', async () => {
    // Simulation d'une erreur lors de la vérification du token
    mockVerifyIdToken.mockRejectedValue(new Error('Invalid token'));

    const middleware = requireRole(['admin'], mockHandler);
    const response = await middleware(mockRequest as NextRequest);

    // Vérifie la réponse d'erreur
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token invalide');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('retourne 403 si l\'utilisateur n\'a pas le rôle requis', async () => {
    // Simulation d'un utilisateur authentifié avec un rôle différent
    mockVerifyIdToken.mockResolvedValue({ role: 'user', uid: 'test-uid' });

    const middleware = requireRole(['admin'], mockHandler);
    const response = await middleware(mockRequest as NextRequest);

    // Vérifie la réponse d'erreur
    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Accès refusé (rôle)');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('appelle le handler si l\'utilisateur a le rôle requis', async () => {
    // Simulation d'un utilisateur authentifié avec le bon rôle
    mockVerifyIdToken.mockResolvedValue({ role: 'admin', uid: 'test-uid' });
    mockHandler.mockResolvedValue({ status: 200, body: { success: true } });

    const middleware = requireRole(['admin'], mockHandler);
    await middleware(mockRequest as NextRequest);

    // Vérifie que le handler a été appelé avec la requête
    expect(mockHandler).toHaveBeenCalledWith(mockRequest);
  });

  it('accepte plusieurs rôles autorisés', async () => {
    // Simulation d'un utilisateur authentifié avec un des rôles autorisés
    mockVerifyIdToken.mockResolvedValue({ role: 'editor', uid: 'test-uid' });
    mockHandler.mockResolvedValue({ status: 200, body: { success: true } });

    const middleware = requireRole(['admin', 'editor', 'moderator'], mockHandler);
    await middleware(mockRequest as NextRequest);

    // Vérifie que le handler a été appelé avec la requête
    expect(mockHandler).toHaveBeenCalledWith(mockRequest);
  });
});
