import { isProjectInput } from './schema';

// Utilise Jest pour une compatibilité universelle avec pnpm monorepo et Next.js
import { describe, it, expect } from '@jest/globals';

describe('isProjectInput', () => {
  it('valide un projet conforme', () => {
    expect(isProjectInput({ name: 'Projet A', status: 'active' })).toBe(true);
    expect(isProjectInput({ name: 'Projet B', status: 'archived', description: 'desc' })).toBe(true);
  });
  it('rejette un projet sans nom', () => {
    expect(isProjectInput({ status: 'active' })).toBe(false);
  });
  it('rejette un projet avec un mauvais statut', () => {
    expect(isProjectInput({ name: 'Projet', status: 'invalid' })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isProjectInput(null)).toBe(false);
    expect(isProjectInput(undefined)).toBe(false);
    expect(isProjectInput(123)).toBe(false);
  });
});
