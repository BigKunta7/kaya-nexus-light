# Kaya Nexus

Plateforme centralisée de gestion pour KK Holding, intégrant CRM, gestion de projets, IA, finances et analytiques.

## Structure du Monorepo

```
/
├── apps/
│   └── kaya-nexus/       # Application Next.js principale
├── packages/
│   └── design-system/    # Bibliothèque de composants partagés
└── scripts/              # Scripts de migration et de seed
```

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

Propriétaire - KK Holding © 2025
