import { isContactInput } from './schema';
import { describe, it, expect } from '@jest/globals';

describe('isContactInput', () => {
  it('valide un contact conforme', () => {
    expect(isContactInput({ firstName: 'Jean', lastName: 'Dupont', email: 'jean@exemple.com' })).toBe(true);
    expect(isContactInput({ firstName: 'Anna', lastName: 'Smith', email: 'anna@exemple.com', phone: '+33600000000' })).toBe(true);
  });
  it('rejette un contact sans nom', () => {
    expect(isContactInput({ lastName: 'Dupont', email: 'jean@exemple.com' })).toBe(false);
  });
  it('rejette un contact avec un email invalide', () => {
    expect(isContactInput({ firstName: 'Jean', lastName: 'Dupont', email: 'invalid' })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isContactInput(null)).toBe(false);
    expect(isContactInput(undefined)).toBe(false);
    expect(isContactInput(123)).toBe(false);
  });
});
