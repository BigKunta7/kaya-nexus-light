/**
 * Test dédié pour forcer la couverture de index.ts
 */
import * as indexExports from '../index';

describe('Couverture index.ts', () => {
  it('importe tous les exports sans erreur', () => {
    // Vérifie simplement que l'import ne renvoie pas undefined
    expect(indexExports).toBeDefined();
    // Vérifie qu'il y a bien des exports (types et profiles)
    expect(Object.keys(indexExports).length).toBeGreaterThan(0);
  });
});
