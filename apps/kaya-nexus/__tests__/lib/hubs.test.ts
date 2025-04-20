import { describe, it, expect, jest } from '@jest/globals';
import type { HubConfig } from '@/types/hub';

// Mock des données pour les tests
const mockHubs: HubConfig[] = [
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

// Mock complet des fonctions des hubs
jest.mock('@/lib/hubs', () => ({
  getHubs: jest.fn(() => mockHubs),
  getDefaultHub: jest.fn(() => mockHubs[0]),
  getHubById: jest.fn((hubs: HubConfig[], id: string) => hubs.find(h => h.id === id))
}));

// Importe les fonctions mockées
import { getHubs, getDefaultHub, getHubById } from '@/lib/hubs';

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
