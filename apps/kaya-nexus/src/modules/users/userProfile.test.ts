import { expect, describe, it } from '@jest/globals';
import { isUserProfile } from './userProfile';

describe('isUserProfile', () => {
  it('valide un profil conforme', () => {
    expect(isUserProfile({
      id: 'a3e1f7b2-2d6c-4e3d-8b2b-2e3d8b2b2e3d',
      name: 'Alice',
      email: 'alice@exemple.com',
      role: 'admin',
      createdAt: '2024-04-20T12:00:00.000Z',
    })).toBe(true);
  });
  it('rejette un profil avec un email invalide', () => {
    expect(isUserProfile({
      id: 'a3e1f7b2-2d6c-4e3d-8b2b-2e3d8b2b2e3d',
      name: 'Alice',
      email: 'not-an-email',
      role: 'admin',
      createdAt: '2024-04-20T12:00:00.000Z',
    })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isUserProfile(null)).toBe(false);
    expect(isUserProfile(undefined)).toBe(false);
    expect(isUserProfile(123)).toBe(false);
  });
});
