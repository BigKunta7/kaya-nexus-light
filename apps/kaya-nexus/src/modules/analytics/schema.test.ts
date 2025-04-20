import { isAnalyticsEventInput } from './schema';
import { describe, it, expect } from '@jest/globals';

describe('isAnalyticsEventInput', () => {
  it('valide un event conforme', () => {
    expect(isAnalyticsEventInput({ type: 'click', timestamp: '2024-01-01T00:00:00Z' })).toBe(true);
    expect(isAnalyticsEventInput({ type: 'view', timestamp: '2024-01-01T00:00:00Z', userId: 'u1', details: { foo: 'bar' } })).toBe(true);
  });
  it('rejette un event sans type', () => {
    expect(isAnalyticsEventInput({ timestamp: '2024-01-01T00:00:00Z' })).toBe(false);
  });
  it('rejette un event sans timestamp', () => {
    expect(isAnalyticsEventInput({ type: 'click' })).toBe(false);
  });
  it('rejette un type inattendu', () => {
    expect(isAnalyticsEventInput(null)).toBe(false);
    expect(isAnalyticsEventInput(undefined)).toBe(false);
    expect(isAnalyticsEventInput(123)).toBe(false);
  });
});
