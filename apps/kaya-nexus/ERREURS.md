# Journal des erreurs et particularités

## Couverture de `index.ts` dans `subsidiaries`

- Les fichiers d'exports purs (`index.ts`) peuvent apparaître à 0% de couverture dans les rapports Jest/Istanbul, même s'ils sont bien importés dans des tests.
- Ce comportement est documenté ici : https://github.com/istanbuljs/nyc/issues/116
- Tous les exports sont cependant testés via `index.coverage.test.ts`.
- Décision : ce fichier est ignoré dans le calcul de couverture ou son cas est documenté ici.

## Fichiers et modules exclus de la couverture

Afin de ne pas compromettre la couverture globale avec du code non testé ou généré, les éléments suivants sont exclus :

- `src/app/`, `src/app/api/` : pages et routes Next.js
- `src/lib/firebase/`, `src/lib/supabase/` : clients Firebase et Supabase (configuration, initialisation)
- `src/lib/schemas/` : schémas partagés déjà testés via modules dédiés
- `src/types/` : définitions de types purs
- `src/instrumentation.ts`, `src/instrumentation-client.ts` : code d'instrumentation (Sentry)
- `src/i18n.ts` : configuration i18n

Chacun de ces motifs est ajouté dans `coveragePathIgnorePatterns` du fichier `jest.config.js` pour documenter les raisons de leur exclusion.

## Actions menées
- Tous les schémas Zod et types sont validés par des tests unitaires.
- Les guards et fonctions utilitaires sont testés sur des cas valides et invalides.
- Les tests sont systématiquement mis à jour en cas d’évolution du schéma ou des types.

## Problèmes d'internationalisation (21/04/2025)

### Conflit entre `next-intl` et `next-international`
- **Symptôme** : Erreur `Couldn't find next-intl config file` malgré la présence de `next-intl.config.js`
- **Cause** : Deux bibliothèques d'internationalisation installées simultanément (`next-intl` et `next-international`)
- **Solution** : 
  1. Suppression de `next-intl` (`pnpm remove next-intl`)
  2. Utilisation exclusive de `next-international` via `src/i18n.ts`
  3. Synchronisation du contexte de langue local avec `next-international`

### Problèmes de compatibilité ESM/CJS dans les fichiers de configuration
- **Symptôme** : Erreur `SyntaxError: Unexpected token 'export'` dans `next.config.js`
- **Cause** : Tentative d'utiliser la syntaxe ESM dans un environnement CJS
- **Solution** : 
  1. Conversion des fichiers en `.mjs` ou ajout de `"type": "module"` dans `package.json`
  2. Utilisation de la syntaxe CJS (`module.exports`) pour les fichiers de configuration

### Tests E2E échouant sur les sélecteurs de langue
- **Symptôme** : Tests Cypress échouant sur les valeurs de langue (`en-US` vs `en`)
- **Cause** : Incohérence entre les codes de langue dans les tests et l'implémentation
- **Solution** : 
  1. Standardisation des codes de langue (`fr`, `en`) dans toute l'application
  2. Mise à jour des tests pour utiliser les mêmes valeurs

## Problèmes CSS et compatibilité navigateurs

### Propriété `backdrop-filter` non supportée par Safari
- **Symptôme** : Avertissement du linter CSS concernant Safari
- **Cause** : Safari nécessite le préfixe `-webkit-backdrop-filter`
- **Solution** : Ajout du préfixe pour assurer la compatibilité cross-browser
  ```css
  .nav {
    -webkit-backdrop-filter: blur(8px); /* Pour Safari */
    backdrop-filter: blur(8px);
  }
  ```
