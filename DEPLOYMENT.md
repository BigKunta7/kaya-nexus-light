# Guide de Déploiement - Kaya Nexus

Ce document détaille les étapes nécessaires pour déployer la plateforme Kaya Nexus en production.

## Table des matières

1. [Prérequis](#prérequis)
2. [Environnements de déploiement](#environnements-de-déploiement)
3. [Variables d'environnement](#variables-denvironnement)
4. [Déploiement sur Vercel](#déploiement-sur-vercel)
5. [Déploiement sur Firebase Hosting](#déploiement-sur-firebase-hosting)
6. [Configuration CI/CD](#configuration-cicd)
7. [Vérifications post-déploiement](#vérifications-post-déploiement)
8. [Rollback en cas de problème](#rollback-en-cas-de-problème)

## Prérequis

- Node.js 18.x ou supérieur
- pnpm 8.x ou supérieur
- Compte Vercel (pour le déploiement frontend)
- Compte Firebase (pour l'authentification et le déploiement backend)
- Compte Supabase (pour la base de données)

## Environnements de déploiement

Kaya Nexus utilise trois environnements distincts :

| Environnement | URL | Branche Git | Description |
|---------------|-----|-------------|-------------|
| Développement | `dev.kaya-nexus.com` | `develop` | Pour les tests internes |
| Préproduction | `staging.kaya-nexus.com` | `staging` | Pour la validation client |
| Production | `kaya-nexus.com` | `main` | Environnement de production |

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
# Firebase (Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Supabase (Base de données)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Ces variables doivent être configurées dans les paramètres de votre projet sur Vercel.

## Déploiement sur Vercel

1. Connectez-vous à votre compte Vercel
2. Importez votre projet depuis GitHub
3. Configurez les variables d'environnement
4. Sélectionnez les options suivantes :
   - Framework Preset: Next.js
   - Root Directory: apps/kaya-nexus
   - Build Command: pnpm build
   - Output Directory: .next
5. Cliquez sur "Deploy"

### Configuration du domaine personnalisé

1. Dans les paramètres du projet Vercel, accédez à "Domains"
2. Ajoutez votre domaine et suivez les instructions pour configurer les DNS

## Déploiement sur Firebase Hosting

Pour déployer les fonctions Firebase et configurer l'hébergement :

1. Installez Firebase CLI : `npm install -g firebase-tools`
2. Connectez-vous à Firebase : `firebase login`
3. Initialisez Firebase dans votre projet : `firebase init`
4. Sélectionnez les services Firebase à utiliser (Hosting, Functions, etc.)
5. Déployez sur Firebase : `firebase deploy`

## Configuration CI/CD

### GitHub Actions

Créez un fichier `.github/workflows/deploy.yml` avec la configuration suivante :

```yaml
name: Deploy Kaya Nexus

on:
  push:
    branches: [main, staging, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Run tests
        run: pnpm test
      - name: Build
        run: pnpm build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Vérifications post-déploiement

Après chaque déploiement, vérifiez les points suivants :

1. L'application se charge correctement
2. L'authentification fonctionne
3. Les API renvoient les données attendues
4. Les formulaires fonctionnent correctement
5. La navigation et les routes sont accessibles
6. Les performances sont satisfaisantes (Lighthouse score > 90)

## Rollback en cas de problème

En cas de problème après déploiement :

1. Sur Vercel, accédez à l'onglet "Deployments"
2. Identifiez le dernier déploiement stable
3. Cliquez sur les trois points (⋮) et sélectionnez "Promote to Production"

Pour Firebase :

```bash
firebase hosting:clone <SOURCE_SITE_ID>:<SOURCE_VERSION> <TARGET_SITE_ID>:live
```

---

Ce guide sera mis à jour régulièrement avec les nouvelles procédures de déploiement.
