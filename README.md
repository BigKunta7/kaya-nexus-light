# Kaya Nexus

[![Build Status](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/deploy.yml/badge.svg)](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/deploy.yml)
[![Coverage Status](https://codecov.io/gh/BigKunta7/kaya-nexus-light/branch/main/graph/badge.svg)](https://codecov.io/gh/BigKunta7/kaya-nexus-light)
[![Lighthouse CI](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/lighthouse.yml)
[![Accessibility](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/a11y.yml/badge.svg)](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/a11y.yml)
[![Security Audit](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/security.yml/badge.svg)](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/security.yml)
[![E2E Cypress](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/e2e-cypress.yml/badge.svg)](https://github.com/BigKunta7/kaya-nexus-light/actions/workflows/e2e-cypress.yml)

Plateforme centralisée de gestion pour KK Holding, intégrant CRM, gestion de projets, IA, finances et analytiques.

## Structure du Monorepo

- `/apps/kaya-nexus` : Application Next.js principale
- `/packages/design-system` : Design System partagé (à venir)
- `/scripts` : Seed, migrations, outils de maintenance

## Workflows CI/CD
- **Build & Deploy** : Automatique sur chaque push/PR
- **Coverage** : Badge dynamique, seuil >80%
- **Lighthouse** : Audit perf, a11y, SEO, best practices
- **Accessibility** : Audit axe-core
- **Security** : Audit pnpm audit
- **E2E** : Tests Cypress sur parcours critiques

## Prérequis

- Node.js 18.x ou supérieur
- pnpm 8.x ou supérieur
- Compte Firebase (pour l'authentification)
- Compte Supabase (pour la base de données)

## Installation

```bash
# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp apps/kaya-nexus/.env.example apps/kaya-nexus/.env.local
# Éditer .env.local avec vos clés API
```

## Commandes Disponibles

### Développement

```bash
# Lancer le serveur de développement
pnpm dev

# Lancer le serveur de développement avec storybook pour le design system
pnpm --filter design-system storybook
```

### Tests

```bash
# Exécuter tous les tests
pnpm test

# Exécuter uniquement les tests unitaires
pnpm test:unit

# Exécuter les tests end-to-end
pnpm test:e2e

# Vérifier la couverture des tests
pnpm test:coverage
```

### Build et Déploiement

```bash
# Construire tous les packages
pnpm build

# Préparer pour le déploiement (build + tests)
pnpm prepare-deploy
```

## Sécurité
- Headers HTTP de sécurité (CSP, HSTS, etc.) dans `next.config.js`
- Secrets gérés via GitHub, jamais en clair
- Monitoring Sentry côté client/serveur (voir workflows)

## Accessibilité
- Audit axe-core automatisé
- Contraste, focus, navigation clavier vérifiés
- Labels et ARIA systématiques

## Qualité
- ESLint, Prettier, règles strictes sur les imports et contextes
- Tests unitaires et E2E, coverage >80%

## Documentation

Pour plus d'informations sur l'architecture, les modules et le déploiement, consultez :

- [Architecture Technique](./ARCHITECTURE.md)
- [Guide de Déploiement](./DEPLOYMENT.md)
- [Diagramme C4 de Contexte](./diagramme_c4_contexte.md)

## Internationalisation

L'application est configurée pour supporter le français (par défaut) et l'anglais. L'implémentation actuelle utilise des textes statiques en attendant une mise à jour vers Next.js 15.4+ qui offrira une meilleure compatibilité avec les bibliothèques d'internationalisation.

## Contribution

1. Créez une branche à partir de `develop` : `git checkout -b feature/nom-de-la-fonctionnalite`
2. Effectuez vos modifications
3. Exécutez les tests : `pnpm test`
4. Soumettez une pull request vers `develop`

## Licence

Propriétaire - KK Holding 2025
