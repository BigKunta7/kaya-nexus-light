import { expect, test, describe, it } from 'vitest';
import { isSubsidiaryProfile } from './subsidiaryProfile';

describe('isSubsidiaryProfile', () => {
  it('valide une filiale conforme', () => {
    expect(isSubsidiaryProfile({
      id: 'b3e1f7b2-2d6c-4e3d-8b2b-2e3d8b2b2e3d',
      name: 'Filiale Paris',
      country: 'FR',
      siret: '12345678901234',
      createdAt: '2024-04-20T12:00:00.000Z',
      active: true,
    })).toBe(true);
  });
  it('rejette une filiale avec un SIRET invalide', () => {
    expect(isSubsidiaryProfile({
      id: 'b3e1f7b2-2d6c-4e3d-8b2b-2e3d8b2b2e3d',
      name: 'Filiale Paris',
      country: 'FR',
      siret: '123',
      createdAt: '2024-04-20T12:00:00.000Z',
      active: true,
    })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isSubsidiaryProfile(null)).toBe(false);
    expect(isSubsidiaryProfile(undefined)).toBe(false);
    expect(isSubsidiaryProfile(123)).toBe(false);
  });
});
