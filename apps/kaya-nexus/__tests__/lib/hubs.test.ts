import { getHubs, getDefaultHub, getHubById } from '../../src/lib/hubs';

describe('Service de gestion des hubs', () => {
  it('retourne la liste des hubs', () => {
    const hubs = getHubs();
    expect(Array.isArray(hubs)).toBe(true);
    expect(hubs.length).toBeGreaterThan(0);
  });

  it('retourne le hub par défaut', () => {
    const hub = getDefaultHub();
    expect(hub).toHaveProperty('id');
    expect(hub.default).toBe(true);
  });

  it('retourne un hub par son id', () => {
    const hub = getHubById('gwp');
    expect(hub).toBeDefined();
    expect(hub?.id).toBe('gwp');
  });
});
