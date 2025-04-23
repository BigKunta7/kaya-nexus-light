# Documentation Technique du Projet Kaya Nexus

## 1. Introduction

### 1.1 Présentation du Projet
Kaya Nexus est une plateforme web centrale développée pour **KK Holding**, conçue pour unifier et optimiser la gestion des opérations de l’entreprise. Elle sert de hub interne regroupant :  
- Un **CRM** pour la gestion des relations avec les clients et les créateurs.  
- Des outils de **gestion de projets** pour le suivi des tâches et des deadlines.  
- Des fonctionnalités d’**intelligence artificielle** pour assister la collaboration et l’automatisation.  
- Un module de **finances** pour la comptabilité, les paiements et les rapports financiers.  
- Des **analyses** pour le suivi des performances via des tableaux de bord et des KPIs.  

L’objectif principal est de fournir une vue en temps réel des activités de KK Holding, d’automatiser les tâches répétitives, et de faciliter la collaboration entre les équipes et les filiales de l’entreprise.

### 1.2 Importance du Projet
- **Centralisation des données** : Toutes les informations et processus des filiales sont regroupés en un seul endroit.  
- **Efficacité opérationnelle** : Les outils IA et les intégrations automatisent les workflows, réduisant les tâches manuelles.  
- **Visibilité accrue** : Les rapports et tableaux de bord offrent une vue complète des performances pour la direction.  
- **Sécurité renforcée** : Des niveaux d’accès contrôlés et des données protégées via des politiques de sécurité strictes.

### 1.3 Portée Technique
- **Type de projet** : Application web basée sur une architecture **microservices**.  
- **Technologies principales** :  
  - **Frontend** : React avec Next.js pour une interface utilisateur réactive et optimisée.  
  - **Backend** : Supabase (base de données PostgreSQL) pour la gestion des données.  
  - **Authentification** : Firebase avec authentification multi-facteurs (MFA).  
- **Modules principaux** : 5 modules clés (CRM Créatif, Gestion Projets, IA Collaboratif, Finances, Analytics).  
- **Intégrations** : 18 APIs externes critiques (ex. : Brevo, Stripe, Notion, Pipedrive).  
- **Niveaux d’accès utilisateurs** : 3 rôles (admin, manager, viewer) avec des permissions granulaires.

---

## 2. Architecture Technique

### 2.1 Vue d’Ensemble
Kaya Nexus repose sur une architecture moderne, modulaire et scalable, conçue pour supporter les besoins croissants de KK Holding. L’architecture est divisée en plusieurs couches :  
- **Frontend** : Application Next.js pour une expérience utilisateur fluide et rapide.  
- **Backend** : Supabase pour la gestion des données avec des politiques de sécurité basées sur les rôles (RLS).  
- **Authentification** : Firebase pour une gestion sécurisée des utilisateurs avec MFA.  
- **Communication en temps réel** : WebSockets pour les mises à jour instantanées entre les filiales et les modules.  
- **Déploiement** : Automatisé via GitHub Actions, avec des environnements de staging (Vercel) et de production (Firebase Hosting).

### 2.2 Diagramme d’Architecture
```
+-----------------+     +-----------------+     +-----------------+
|    Frontend     |     |     Backend     |     |  Intégrations   |
|   (Next.js)     |<--->|   (Supabase)    |<--->|   (APIs externes)|
+-----------------+     +-----------------+     +-----------------+
          |                      |                      |
          |                      |                      |
+-----------------+     +-----------------+     +-----------------+
|  Authentification|     |  WebSockets     |     |  Déploiement    |
|    (Firebase)    |     |  (Temps réel)   |     |  (GitHub Actions)|
+-----------------+     +-----------------+     +-----------------+
```

### 2.3 Technologies Utilisées
- **Frontend** : React, Next.js, Tailwind CSS, React Query, FullCalendar, Chart.js.  
- **Backend** : Supabase (PostgreSQL), Node.js pour les workers et microservices.  
- **Authentification** : Firebase Auth avec MFA et gestion des rôles.  
- **Intégrations** : APIs comme Brevo, Stripe, Notion, Pipedrive, QuickBooks, etc.  
- **Outils DevOps** : GitHub Actions pour CI/CD, Vercel pour staging, Firebase Hosting pour production.

### 2.4 Unicité des Contextes React : Language & Hub

#### Décision d'architecture (avril 2025)

Afin d'éviter tout bug de duplication de contexte et garantir la stabilité de l'internationalisation et de la gestion multi-hubs, **tous les contextes React (LanguageContext, HubContext, etc.) sont centralisés dans le dossier unique :**

```
/apps/kaya-nexus/src/contexts/
```

- **Aucun doublon n'est toléré** dans `/components/contexts` ou ailleurs.
- **Tous les composants et tests** doivent importer les contextes via un chemin relatif unique, par exemple :
  ```typescript
  import { useLanguage, LanguageProvider } from '../../contexts/LanguageContext';
  ```
- Cette règle s'applique également aux hooks personnalisés (`useLanguage`, `useHub`, etc.).

#### Pourquoi ?
- **Évite les collisions de contextes** (erreur : « useLanguage doit être utilisé dans un LanguageProvider »).
- **Garantie de persistance et de cohérence de l'état** (localStorage, etc.).
- **Facilite la maintenance et la montée en version**.

#### Bonnes pratiques
- **Vérification systématique** lors de la création de nouveaux composants :
  - Toujours importer les contextes depuis `/src/contexts/`.
  - Ne jamais recréer de provider/hook dans un sous-dossier.
- **Tests unitaires** :
  - Toujours wrapper les composants testés avec le bon Provider importé depuis `/src/contexts/`.
- **Contrôle qualité** :
  - Tout nouveau composant ou test utilisant un contexte doit être relu pour vérifier le chemin d'import.

#### Exemple correct
```typescript
import { useLanguage } from '../../contexts/LanguageContext';
```

### 2.5 Couverture de tests

- Objectif : **maintenir une couverture de tests supérieure à 80%** sur l’ensemble du code métier et des composants critiques.
- Utilisation de **Jest** et **Testing Library** pour les tests unitaires et d’intégration.
- Les rapports de couverture sont générés à chaque CI/CD et doivent être consultés avant chaque merge.

---

## 3. Modules Clés

### 3.1 CRM Créatif
- **Description** : Gestion des contacts, des campagnes marketing et du suivi des relations avec les clients et créateurs.  
- **Fonctionnalités** :  
  - Liste des contacts avec filtres (prospects, clients, partenaires).  
  - Synchronisation avec **Brevo** pour les campagnes d’emailing automatisées.  
  - Intégration avec **Pipedrive** pour le suivi des opportunités de vente.  
- **Technologies** : React Table pour l’affichage des données, React Query pour la gestion des requêtes.  
- **Exemple de Code** :  
  ```typescript
  const { data: contacts } = useQuery(['contacts', page], async () => {
    const { data } = await supabase.from('contacts').select('*').range((page - 1) * 10, page * 10 - 1);
    await integrateBrevo(data);
    return data;
  });
  ```

### 3.2 Gestion Projets
- **Description** : Suivi des projets, des tâches et des deadlines avec un calendrier interactif.  
- **Fonctionnalités** :  
  - Calendrier avec drag-and-drop pour ajuster les dates des événements.  
  - Synchronisation en temps réel avec **Notion** et **Trello** pour la gestion des tâches.  
- **Technologies** : FullCalendar pour le calendrier, WebSockets pour les mises à jour en direct.  
- **Exemple de Code** :  
  ```typescript
  useEffect(() => {
    const channel = supabase.channel('events').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' }, (payload) => {
      setEvents((prev) => [...prev, { id: payload.new.id, title: payload.new.title, start: payload.new.start_time }]);
    }).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);
  ```

### 3.3 IA Collaboratif
- **Description** : Outils d’intelligence artificielle pour assister la création de contenu et l’automatisation des tâches.  
- **Fonctionnalités** :  
  - Génération de contenu via **GPT-4 Turbo**.  
  - Suggestions intelligentes basées sur l’analyse des données avec **Pinecone Vector DB**.  
- **Technologies** : LangChain pour la gestion des modèles IA, Supabase pour stocker les prompts et réponses.  
- **Exemple de Code** :  
  ```typescript
  const handleGenerate = async () => {
    const result = await generateContent(prompt);
    setResponse(result.content);
  };
  ```

### 3.4 Finances
- **Description** : Gestion des transactions financières, des paiements et des rapports comptables.  
- **Fonctionnalités** :  
  - Tableau de bord des transactions récentes.  
  - Synchronisation avec **Stripe** pour les paiements et **QuickBooks** pour la comptabilité.  
- **Technologies** : React Query pour les requêtes, Chart.js pour les visualisations financières.  
- **Exemple de Code** :  
  ```typescript
  const { data: transactions } = useQuery('transactions', async () => {
    const { data } = await supabase.from('transactions').select('*').limit(10);
    await integrateStripe(data);
    await integrateQuickBooks(data);
    return data;
  });
  ```

### 3.5 Analytics
- **Description** : Suivi des performances via des tableaux de bord et des KPIs consolidés.  
- **Fonctionnalités** :  
  - Graphiques et métriques en temps réel.  
  - Intégration avec **Metabase** pour des analyses avancées.  
- **Technologies** : Chart.js pour les graphiques, Supabase pour les données.  
- **Exemple de Code** :  
  ```typescript
  const { data: metrics } = useQuery('metrics', async () => {
    const { data } = await supabase.from('metrics').select('*').limit(5);
    return data;
  });
  ```

---

## 4. Intégrations Externes

Kaya Nexus s’intègre avec 18 APIs critiques pour étendre ses fonctionnalités. Voici un aperçu des intégrations clés :

| **Intégration** | **Module Concerné** | **Description**                  |
|-----------------|---------------------|----------------------------------|
| Brevo           | CRM Créatif         | Automatisation des campagnes emailing. |
| Pipedrive       | CRM Créatif         | Suivi des opportunités de vente. |
| Notion          | Gestion Projets     | Synchronisation des tâches et notes. |
| Trello          | Gestion Projets     | Gestion visuelle des projets.    |
| Stripe          | Finances            | Traitement des paiements.        |
| QuickBooks      | Finances            | Comptabilité et rapports financiers. |
| GPT-4 Turbo     | IA Collaboratif     | Génération de contenu automatisé. |
| Pinecone        | IA Collaboratif     | Suggestions basées sur des vecteurs. |
| Metabase        | Analytics           | Analyses avancées et tableaux de bord. |

Chaque intégration est gérée via des fonctions dédiées dans `/lib/integrations.ts`, qui appellent les APIs externes et synchronisent les données avec Supabase.

---

## 5. Sécurité et Authentification

### 5.1 Authentification
- **Firebase Auth** : Utilisé pour gérer les utilisateurs avec MFA (authentification multi-facteurs).  
- **Rôles** : 3 niveaux (admin, manager, viewer) avec des permissions granulaires définies dans Supabase via RLS (Row Level Security).

### 5.2 Politiques de Sécurité
- **RLS dans Supabase** : Les tables sont protégées par des politiques comme :  
  ```sql
  CREATE POLICY "Admin Access" ON contacts FOR SELECT USING (auth.role() = 'admin');
  ```  
- **Gestion des clés** : Les clés API sont stockées dans des variables d’environnement et gérées via GitHub Secrets pour les déploiements.

---

## 6. Déploiement et Maintenance

### 6.1 Pipeline CI/CD
- **GitHub Actions** : Automatise les tests, les builds et les déploiements.  
- **Environnements** :  
  - **Staging** : Déployé sur Vercel pour les tests.  
  - **Production** : Hébergé sur Firebase Hosting.

### 6.2 Monitoring et Sauvegarde
- **Monitoring** : Sentry pour les erreurs, LogRocket pour les sessions utilisateurs.  
- **Sauvegarde** : Backups automatisés des données Supabase vers S3 et GCS.

### 6.3 Playbook d’Urgence
Le projet inclut un playbook avec 15 scénarios critiques, comme :  
- **Panne de Supabase** : Basculer vers une cache S3 en lecture seule.  
- **Échec d’authentification Firebase** : Activer une validation JWT locale.

---

## 7. Comment Utiliser Cette Documentation
Ce document est conçu pour être votre guide complet pour le projet Kaya Nexus. Voici comment l’utiliser :  
- **Pour les développeurs** : Consultez les sections sur l’architecture, les modules, et les intégrations pour comprendre le code.  
- **Pour les gestionnaires** : Lisez l’introduction et les sections sur les modules pour une vue d’ensemble.  
- **Pour la maintenance** : Référez-vous aux sections sur la sécurité, le déploiement, et le playbook d’urgence.

---

## 8. Évolutions Techniques Récentes

### 8.1 Migration vers Next.js 15
- **Description** : Migration de l'application vers Next.js 15.3.1 avec App Router.
- **Avantages** :
  - Amélioration des performances de rendu côté serveur (SSR).
  - Support natif des React Server Components.
  - Optimisation automatique des images et des polices.
- **Défis rencontrés** :
  - Adaptation de la structure du projet pour l'App Router.
  - Résolution des conflits de dépendances React dans le monorepo.
  - Gestion temporaire de l'internationalisation sans routes dynamiques.

### 8.2 Architecture Monorepo
- **Structure actuelle** :
  ```
  /
  ├── apps/
  │   └── kaya-nexus/       # Application Next.js principale
  ├── packages/
  │   └── design-system/    # Bibliothèque de composants partagés
  └── scripts/              # Scripts de migration et de seed
  ```
- **Avantages du monorepo** :
  - Partage de code et de composants entre applications.
  - Versionnement cohérent des dépendances.
  - Facilité de maintenance et de tests.
- **Outils utilisés** :
  - pnpm workspaces pour la gestion des packages.
  - TypeScript pour la vérification de types entre packages.

### 8.3 Design System
- **Objectifs** :
  - Garantir la cohérence visuelle et fonctionnelle.
  - Faciliter le développement de nouvelles fonctionnalités.
  - Améliorer l'accessibilité de l'interface utilisateur.
- **Composants principaux** :
  - Boutons, formulaires, cartes, tableaux, modales.
  - Système de grille responsive.
  - Thème sombre/clair avec variables CSS.
- **Technologies** :
  - CSS Modules pour l'encapsulation des styles.
  - Tailwind CSS pour l'utilitaire de classes.

### 8.4 Stratégie d'Internationalisation
- **État actuel** :
  - Support du français comme langue principale.
  - Structure préparée pour l'ajout de langues supplémentaires.
- **Plan d'implémentation** :
  - Utilisation future de `next-intl` pour la compatibilité App Router.
  - Fichiers de traduction JSON organisés par module.
  - Détection automatique de la langue du navigateur.

### 8.5 Optimisations de Performance
- **Métriques cibles** :
  - Lighthouse score > 90 pour toutes les catégories.
  - First Contentful Paint < 1.2s.
  - Time to Interactive < 3.5s.
- **Techniques implémentées** :
  - Lazy loading des composants non critiques.
  - Optimisation des images avec Next.js Image.
  - Préchargement des données critiques avec `getStaticProps`.
  - Mise en cache des requêtes API avec React Query.

---

## 9. Roadmap Technique

### 9.1 Court Terme (Q2 2025)
- Finalisation de l'internationalisation avec support complet FR/EN.
- Implémentation des tests E2E avec Cypress.
- Optimisation des requêtes Supabase avec mise en cache avancée.

### 9.2 Moyen Terme (Q3-Q4 2025)
- Migration vers React 19 pour exploiter les nouvelles fonctionnalités.
- Implémentation d'une PWA pour l'accès hors ligne.
- Intégration de l'authentification biométrique pour les appareils mobiles.

### 9.3 Long Terme (2026)
- Architecture micro-frontends pour les modules complexes.
- Implémentation d'une couche GraphQL pour unifier les API.
- Exploration des technologies Edge Computing pour réduire la latence.

---

## 10. Stratégie de tests End-to-End (E2E) avec Cypress

### Structure des dossiers
- `cypress/e2e/` : contient tous les scénarios E2E, organisés par fonctionnalité (auth, navigation, modules...)
- `cypress/support/` : helpers et commandes personnalisées
- `cypress/fixtures/` : données de test simulées

### Conventions de nommage
- Un fichier par fonctionnalité ou module, suffixé par `.cy.ts` (ex : `login.cy.ts`, `navigation.cy.ts`)
- Utilisation systématique des attributs `data-testid` pour cibler les éléments dans les tests

### Exemples de scénarios
- Authentification (succès/échec)
- Navigation entre modules
- Changement de langue/hub
- Accès interdit, logout, erreurs API

### Bonnes pratiques
- Isoler chaque scénario (utiliser `beforeEach` pour remettre l’état à zéro)
- Mock des APIs externes pour fiabilité
- Vérification systématique des redirections et affichages clés

### Documentation officielle
- [Cypress Docs](https://docs.cypress.io/guides/overview/why-cypress)
- [Bonnes pratiques E2E Cypress](https://docs.cypress.io/guides/references/best-practices)

---

## 11. Comment Utiliser Cette Documentation
Ce document est conçu pour être votre guide complet pour le projet Kaya Nexus. Voici comment l’utiliser :  
- **Pour les développeurs** : Consultez les sections sur l’architecture, les modules, et les intégrations pour comprendre le code.  
- **Pour les gestionnaires** : Lisez l’introduction et les sections sur les modules pour une vue d’ensemble.  
- **Pour la maintenance** : Référez-vous aux sections sur la sécurité, le déploiement, et le playbook d’urgence.

---

## 12. Scénarios E2E métiers générés (avril 2025)

Pour chaque module métier, les tests E2E suivants sont générés :

- Accès à la page du module (CRM, Finance, Projets, Analytique, IA)
- Vérification de la redirection et de l'affichage du titre
- Test d'accès interdit (cas d'erreur, forbidden/unauthorized)

**Convention :**
- Tous les accès nécessitent une authentification préalable (login E2E simulé)
- La présence d'un message d'erreur est vérifiée en cas d'accès interdit

Fichiers générés :
- `cypress/e2e/crm.cy.ts`
- `cypress/e2e/finance.cy.ts`
- `cypress/e2e/projects.cy.ts`
- `cypress/e2e/analytics.cy.ts`
- `cypress/e2e/ai.cy.ts`

---

## ARCHITECTURE.md

## 1. Structure générale
- Monorepo pnpm : `/apps`, `/packages`, `/scripts`
- Next.js 14, TypeScript, Tailwind, ESLint

## 2. Contextes React
- Centralisation dans `/src/contexts`
- Règle ESLint pour l’unicité des imports

## 3. Internationalisation & multi-hubs
- `/locales` multi-langues, multi-hubs
- Types et services séparés (`HubConfig`, `lib/hubs.ts`)
- Sélecteurs UI (`LanguageSwitcher`, `HubSelector`)

## 4. CI/CD & Qualité
- Workflows GitHub Actions : build, deploy, lint, coverage, lighthouse, a11y, security, E2E
- Badges dans le README
- Merge automatique branches “green”

## 5. Sécurité
- Headers HTTP (CSP, HSTS, etc.) dans `next.config.js`
- Audit pnpm audit automatisé
- Monitoring Sentry (voir workflow)
- Secrets via GitHub uniquement

## 6. Accessibilité
- Audit axe-core automatisé
- Tests Cypress sur parcours critiques
- Focus, contraste, labels, ARIA systématiques

## 7. Documentation
- ARCHITECTURE.md : structure, choix, workflows
- ERREURS.md : journal erreurs/correctifs

---

Projet conforme aux standards pro et prêt pour la scalabilité, la sécurité et l’open source.

## 3.3 Convention de validation des données externes

> **Toute donnée externe (requête API, payload, fichier, paramètre d’URL, etc.) doit être validée par un type guard basé sur un schéma Zod avant tout traitement.**

### Exemple de pattern à respecter

```typescript
import { isProjectInput } from '@/modules/projects/schema';

const body = await req.json();
if (!isProjectInput(body)) {
  return NextResponse.json({ error: 'Format projet invalide' }, { status: 400 });
}
// Traitement sécurisé
```

- Les schémas Zod sont définis pour chaque type métier critique (Contact, Project, Transaction, Hub, etc.).
- Un type guard (ex : `isProjectInput`) est généré pour chaque schéma et utilisé systématiquement.
- Cette convention s’applique à tous les endpoints, scripts, services et middlewares.

**But : garantir la sécurité, la robustesse et la maintenabilité du code.**

## 3.4 Tests unitaires des type guards

> **Chaque type guard doit être couvert par des tests unitaires (Jest, Vitest, etc.) pour garantir la détection des cas valides/invalides.**

### Exemple de test Jest

```typescript
import { isProjectInput } from '@/modules/projects/schema';

describe('isProjectInput', () => {
  it('valide un projet conforme', () => {
    expect(isProjectInput({ name: 'Test', status: 'active' })).toBe(true);
  });
  it('rejette un projet incomplet', () => {
    expect(isProjectInput({ name: 'Test' })).toBe(false);
  });
});
```

- Les tests doivent couvrir : cas valides, cas invalides, types inattendus.
- Les fichiers de test sont à placer dans `__tests__` ou à côté du module (`*.test.ts`).

---

```
# ARCHITECTURE Kaya Nexus

> Plateforme SaaS créative, collaborative, multi-filiales, AGI-ready

## 🎯 Objectif crucial
Créer une plateforme universelle, intelligente, ultra-modulaire et sécurisée, adaptée à l’innovation et à la collaboration multi-entreprises.

---

## 🏗️ Vision & principes
- **Smart** : composants réutilisables, IA/ML, automatisations, UX proactive
- **Efficace** : micro-frontends, CI/CD, monitoring, tests >80%, zero-downtime
- **Sûr** : chiffrement, audit, conformité, gestion fine des permissions
- **Scalable** : multi-tenant, multi-filiales, API publique, extensibilité native

---

## 📐 Structure technique (monorepo)

```
/components/ui         # Design System universel (atomic design)
/modules/[nom]         # Modules métiers (collab, analytics, etc.)
/contexts              # Contexts React globaux
/hooks                 # Hooks custom smart
/pages                 # Pages Next.js (App Router)
/api                   # Routes API Next.js
/lib                   # Libs utilitaires, intégrations externes
/types                 # Types globaux TypeScript
/tests                 # Tests unitaires et E2E
```

---

## ⚡ Stack technique
- **Front** : Next.js (App Router), React, TypeScript, Zustand, i18n, Testing Library
- **Design System** : @kaya/design-system (accessibilité, thématisation, responsive, animations)
- **Back/Serverless** : Next.js API routes, Firebase, Node.js, MongoDB (via Mongoose)
- **CI/CD** : GitHub Actions, Netlify, pnpm, tests automatisés, Sentry (optionnel)
- **Tests** : Jest, Cypress, Istanbul (>80% couverture)
- **Sécurité** : JWT, OAuth, bcrypt, AES-256, Zod
- **Monitoring** : Sentry, logs centralisés, alertes

---

## 🧩 Diagramme C4 (simplifié)

- **Users** → [Web App Next.js] → [API Next.js/Firebase] → [MongoDB, services externes]
- **Admin** → [Backoffice] (module admin dédié)

---

## 🌍 Bonnes pratiques
- Hooks fonctionnels, pas de classes (React)
- Routes versionnées `/api/v1/...` (Express/Next)
- Schémas Mongoose stricts, indexation des champs critiques
- Validation systématique avec Zod
- Commentaires et doc en français (JSDoc)
- Tests automatisés, monitoring qualité, feedback utilisateur

---

## 🔗 Références
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/learn)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Testing Library](https://testing-library.com/docs/)

---

> "Kaya Nexus vise l’excellence technique, la sécurité, l’intelligence et l’expérience utilisateur ultime."
