import { isTransactionInput } from './schema';
import { describe, it, expect } from 'vitest';

describe('isTransactionInput', () => {
  it('valide une transaction conforme', () => {
    expect(isTransactionInput({ amount: 100, currency: 'EUR', date: '2024-01-01' })).toBe(true);
    expect(isTransactionInput({ amount: 50, currency: 'USD', date: '2024-02-01', description: 'note' })).toBe(true);
  });
  it('rejette une transaction sans montant', () => {
    expect(isTransactionInput({ currency: 'EUR', date: '2024-01-01' })).toBe(false);
  });
  it('rejette une transaction avec une devise invalide', () => {
    expect(isTransactionInput({ amount: 100, currency: 'EURO', date: '2024-01-01' })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isTransactionInput(null)).toBe(false);
    expect(isTransactionInput(undefined)).toBe(false);
    expect(isTransactionInput(123)).toBe(false);
  });
});
