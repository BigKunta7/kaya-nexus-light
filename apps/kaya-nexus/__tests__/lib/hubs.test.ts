import { getHubs, getDefaultHub, getHubById } from '@/lib/hubs';
import { describe, it, expect } from 'vitest';

describe('Hubs service', () => {
  it('retourne au moins un hub', async () => {
    const hubs = await getHubs();
    expect(Array.isArray(hubs)).toBe(true);
    expect(hubs.length).toBeGreaterThan(0);
  });
  it('retourne un hub par défaut', async () => {
    const hub = await getDefaultHub();
    expect(hub).toBeDefined();
    expect(hub).toHaveProperty('id');
  });
  it('retourne un hub par id', async () => {
    const hubs = await getHubs();
    const hub = await getHubById(hubs[0]?.id || '');
    expect(hub).toBeDefined();
    expect(hub?.id).toBe(hubs[0]?.id);
  });
});
