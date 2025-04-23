# ERREURS & CORRECTIFS Kaya Nexus

Ce fichier documente les erreurs critiques rencontrées, leurs causes, les correctifs appliqués et les bonnes pratiques pour éviter leur réapparition.

---

## Historique des erreurs majeures

### 1. CI/CD – Sentry release échoue
- **Problème** : Mauvaise configuration des variables Sentry (`SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`).
- **Correctif** : Désactivation temporaire du job Sentry dans le workflow GitHub Actions, documentation des variables nécessaires.
- **Bonnes pratiques** : Toujours valider les secrets et la config avant push.

### 2. Tests Jest échouent (modules manquants)
- **Problème** : Import de modules non mockés (`@/lib/firebase/client`, `@/i18n`), alias mal configurés.
- **Correctif** : Création de mocks, configuration de `moduleNameMapper`, ajout de `jest.setup.js`.
- **Bonnes pratiques** : Mock systématique des dépendances externes, vérification des alias.

### 3. Erreur “expected app router to be mounted”
- **Problème** : Tests de composants Next.js utilisant `useRouter` sans contexte router.
- **Correctif** : Mock du module `next/navigation` dans les tests concernés.
- **Bonnes pratiques** : Toujours mocker le router dans les tests Next.js.

### 4. `toBeInTheDocument` n’est pas reconnu
- **Problème** : Oubli d’importer `@testing-library/jest-dom`.
- **Correctif** : Ajout de `jest.setup.js` et de l’import global.
- **Bonnes pratiques** : Centraliser tous les setups de tests dans un fichier unique.

---

## Conseils généraux
- Toujours viser >80% de couverture de tests.
- Documenter chaque incident critique et sa résolution.
- Mettre à jour ce fichier à chaque correctif majeur.
- Sécuriser les secrets et vérifier la conformité RGPD.

---

> "L’excellence, c’est corriger vite, documenter mieux, et ne jamais refaire la même erreur deux fois."

## Journal des erreurs critiques et correctifs appliqués

### Table des matières
- [1. Introduction](#1-introduction)
- [2. Journal des erreurs](#2-journal-des-erreurs)
- [3. Bonnes pratiques](#3-bonnes-pratiques)
- [4. Erreurs liées à l’internationalisation (i18n) et au multi-hub](#4-erreurs-liées-à-linternationalisation-i18n-et-au-multi-hub)
- [5. Journal des erreurs E2E Cypress](#5-journal-des-erreurs-e2e-cypress)

---

## 1. Introduction
Ce fichier recense les incidents critiques, bugs majeurs et correctifs appliqués sur le projet Kaya Nexus. Il permet d’assurer la traçabilité, la communication et l’amélioration continue.

---

## 2. Journal des erreurs

| Date       | Module        | Gravité | Description succincte                   | Correctif / Patch         | Statut    |
|------------|--------------|---------|-----------------------------------------|--------------------------|-----------|
| 2025-04-16 | Authentification | Haute   | MFA non déclenché pour certains comptes | Correction logique MFA   | Résolu    |
| 2025-04-10 | Finances      | Moyenne | Erreur d’arrondi sur les totaux Stripe  | Patch calcul backend     | Résolu    |
| 2025-03-28 | CRM           | Haute   | Perte de données lors de la synchro Brevo | Ajout rollback + logs    | Résolu    |
| 2025-03-15 | Analytics     | Basse   | KPI affiché avec 24h de retard          | Correction requête SQL   | Résolu    |

---

## 3. Bonnes pratiques
- Documenter chaque bug critique et sa résolution.
- Préciser la date, le module, la gravité, la description, le patch et le statut.
- Utiliser des statuts clairs : `Résolu`, `En cours`, `À investiguer`.
- Ajouter des liens vers les commits ou tickets GitHub si possible.

> **Référence** : [Guide gestion des erreurs](https://www.atlassian.com/fr/incident-management)

---

## 4. Erreurs liées à l’internationalisation (i18n) et au multi-hub

### Problèmes courants
- **Clé de traduction manquante** :
  - Symptôme : message d’erreur dans la console Next.js ou affichage de la clé brute.
  - Correction : vérifier que la clé existe dans tous les fichiers de locale concernés.
- **Locale non supportée** :
  - Symptôme : redirection vers la locale par défaut ou erreur 404.
  - Correction : ajouter la locale dans `next.config.ts` et fournir les fichiers de traduction nécessaires.
- **Contexte React non initialisé** :
  - Symptôme : erreur "useHub doit être utilisé dans un HubProvider" ou "useLanguage doit être utilisé dans un LanguageProvider".
  - Correction : bien envelopper l’application avec les providers dans `app/providers.tsx`.

### Bonnes pratiques
- Toujours fournir des valeurs par défaut pour les contextes.
- Ajouter des tests unitaires pour la gestion des erreurs (voir `__tests__/`).
- Documenter toute erreur critique rencontrée ici avec la date et le correctif appliqué.

---

## 5. Journal des erreurs E2E Cypress

### Avril 2025 - Journal des erreurs E2E Cypress

- **Problème** : Les tests de connexion échouent car certains attributs `data-testid` sont absents dans les composants React (login-button, email-input, etc.).
  - **Correctif** : Ajout systématique des attributs `data-testid` dans les composants concernés (formulaire de login, navigation, menu utilisateur).
  - **Statut** : À valider lors du prochain run Cypress.

- **Problème** : Cypress ne trouve pas le serveur Next.js (`Cypress could not verify that this server is running`).
  - **Correctif** : Toujours démarrer Next.js (`pnpm dev`) avant de lancer les tests E2E.

### Avril 2025 - Échecs des tests E2E métiers Cypress

- **Problème** : Les tests Cypress (navigation, login, modules métiers) échouent.
  - **Fichiers impactés** : navigation.cy.ts, auth/login.cy.ts, crm.cy.ts, finance.cy.ts, projects.cy.ts, analytics.cy.ts, ai.cy.ts
  - **Causes probables** :
    - Les routes (pages) des modules métiers (CRM, Finance, Projets, Analytique, IA) ne sont pas encore implémentées dans l’application Next.js.
    - Les éléments de navigation (`<nav>`, liens, titres) ou les selectors Cypress (`data-testid`) sont absents ou incorrects.
    - Les messages d’erreur d’accès interdit ne sont pas présents ou pas internationalisés.
  - **Correctif suggéré** :
    - Implémenter les pages Next.js pour chaque module métier avec un titre et une gestion d’accès.
    - Ajouter les liens de navigation dans la barre de navigation (`<nav>`).
    - S’assurer que tous les selectors Cypress attendus existent dans le DOM.
    - Internationaliser les messages d’erreur pour les accès interdits.
  - **Statut** : En attente de résolution lors de l’implémentation des modules métiers.

---
