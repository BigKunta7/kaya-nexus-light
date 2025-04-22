/**
 * Tests pour le module subsidiaries
 */
import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Import direct du module pour vérifier ses exportations
import * as subsidiariesModule from '../index';
import * as subsidiariesTypes from '../types';
import * as subsidiaryProfileModule from '../subsidiaryProfile';

describe('Module subsidiaries - Index', () => {
  it('exporte correctement tous les éléments du fichier types.ts', () => {
    // Vérifier que tous les exports de types.ts sont présents dans index.ts
    const typeExports = Object.keys(subsidiariesTypes);
    for (const exportName of typeExports) {
      expect(subsidiariesModule).toHaveProperty(exportName);
    }

  });

  it('exporte correctement tous les éléments du fichier subsidiaryProfile.ts', () => {
    // Vérifier que tous les exports de subsidiaryProfile.ts sont présents dans index.ts
    const profileExports = Object.keys(subsidiaryProfileModule);
    for (const exportName of profileExports) {
      expect(subsidiariesModule).toHaveProperty(exportName);
    }
  });

  it('contient exactement toutes les exportations prévues', () => {
    // Combiner toutes les exportations attendues
    const allExpectedExports = [
      ...Object.keys(subsidiariesTypes),
      ...Object.keys(subsidiaryProfileModule)
    ];

    // Obtenez les exportations réelles du module index
    const actualExports = Object.keys(subsidiariesModule);

    // Vérifier que toutes les exportations attendues sont présentes
    for (const expectedExport of allExpectedExports) {
      expect(actualExports).toContain(expectedExport);
    }

    // Vérifier qu'il n'y a pas d'exportations supplémentaires non attendues
    for (const actualExport of actualExports) {
      expect(allExpectedExports).toContain(actualExport);
    }

    // Vérifier que le nombre total d'exportations correspond
    expect(actualExports.length).toBe(allExpectedExports.length);
  });

  it('analyse le contenu du fichier index.ts pour garantir qu\'il exporte bien les bons modules', () => {
    // Lire le contenu du fichier index.ts
    const indexPath = path.resolve(__dirname, '../index.ts');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    // Vérifier que le fichier contient les bonnes exportations
    expect(indexContent).toContain("export * from './types';");
    expect(indexContent).toContain("Module de gestion des filiales");
    
    // Vérifier que subsidiaryProfile est exporté
    expect(indexContent).toContain("export * from './subsidiaryProfile';");
    
    // Vérifier les commentaires pour les modules non implémentés
    expect(indexContent).toContain("// export * from './utils';");
    expect(indexContent).toContain("// export * from './hooks';");
    expect(indexContent).toContain("// export * from './components';");
    expect(indexContent).toContain("// export * from './services';");
  });
});
