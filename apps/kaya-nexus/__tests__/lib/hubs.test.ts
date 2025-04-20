import { getHubs, getDefaultHub, getHubById } from '@/lib/hubs';
import { describe, it, expect } from '@jest/globals';

// Mock des données pour les tests
const mockHubs = [
  {
    id: 'test',
    name: 'Test Hub',
    locale: 'fr-FR',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    branding: {
      logoUrl: '/test.png',
      primaryColor: '#000',
      secondaryColor: '#fff'
    },
    enabledModules: ['test'],
    default: true
  }
];

describe('Hubs service', () => {
  it('retourne au moins un hub', async () => {
    const hubs = getHubs(mockHubs);
    expect(hubs.length).toBeGreaterThan(0);
  });

  it('retourne un hub par défaut', () => {
    const defaultHub = getDefaultHub(mockHubs);
    expect(defaultHub).toBeDefined();
    expect(defaultHub?.default).toBe(true);
  });

  it('retourne un hub par id', () => {
    const hubs = getHubs(mockHubs);
    const hub = getHubById(hubs, 'test');
    expect(hub).toBeDefined();
    expect(hub?.id).toBe('test');
  });
});
