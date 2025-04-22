# ARCHITECTURE.md – Kaya Nexus

## Vue d’ensemble
Plateforme SaaS Next.js 14, multi-hubs, modulaire, sécurisée, i18n et API REST versionnées.

---

## 1. Structure technique

- **Monorepo** : organisation par apps/modules (pnpm workspaces)
- **App principale** : `/apps/kaya-nexus`
- **Pages modules** : `/app/crm`, `/app/projects`, `/app/finance`, `/app/ai`, `/app/analytics`
- **API REST** : `/app/api/v1/*` (découplage frontend/backend)
- **Contexts React** : `contexts/HubContext.tsx`, gestion multi-hubs
- **i18n** : `next-intl`, fichiers dans `public/locales/`
- **UI** : Tailwind CSS, dark mode, composants modulaires
- **Sécurité** : MFA, validation Zod, gestion des rôles
- **Paiement** : Stripe, abstraction dans `lib/integrations.ts`

---

## 2. Diagramme C4 (niveau conteneur)

```
[Utilisateur] → [Next.js App] → [API REST] → [Firestore] / [Stripe]
                        ↓
                 [Contexts React]
                        ↓
                 [UI Multi-hubs]
```

---

## 3. Choix techniques clés
- **Next.js App Router** pour modularité et SSR
- **Versionnement API** : `/api/v1/`
- **Tests** : Jest, React Testing Library, Cypress E2E
- **CI/CD** : GitHub Actions (tests, lint, déploiement)
- **Swagger-jsdoc** pour documentation API automatique

---

## 4. Sécurité & bonnes pratiques
- MFA obligatoire pour actions sensibles
- Validation stricte des schémas (Zod)
- Stockage sécurisé des secrets (env)
- Centralisation des erreurs (middleware)

---

## 5. Extensions possibles
- Analytics avancés (matomo, plausible)
- IA collaborative (OpenAI, HuggingFace)
- Webhooks Stripe/Firebase

---

## 6. Références
- [Next.js Docs](https://nextjs.org/docs)
- [Next-Intl](https://next-intl.dev/docs/getting-started/app-router)
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Cypress](https://docs.cypress.io/)
