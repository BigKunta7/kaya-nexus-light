# Kaya Nexus

Plateforme collaborative multi-hubs (Next.js 15, TypeScript, Firestore, Stripe)

## 🚀 Démarrage

```bash
pnpm install
pnpm dev
```

- Accès : http://localhost:3000
- Changer de langue et de hub via le header.

## 🌍 Fonctionnalités principales
- Authentification MFA (Firebase)
- Multi-hubs (branding, modules)
- Internationalisation (fr, en)
- Modules : CRM, Projets, Finance, IA, Analytics
- Paiements Stripe
- API REST versionnées (`/api/v1/...`)
- Documentation Swagger (`swagger.config.js`)
- Tests unitaires (Jest, React Testing Library)
- Tests E2E (Cypress)

## 🔒 Sécurité
- MFA obligatoire
- Validation stricte des schémas (Zod)
- Stockage sécurisé des secrets (env)

## 📝 Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ERREURS.md](./ERREURS.md)

## 🚀 Déploiement
- Configuration CI/CD via GitHub Actions
- Déploiement automatisé sur Vercel

## 📚 Références
- [Next.js Docs](https://nextjs.org/docs)
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Cypress](https://docs.cypress.io/)
- [Vercel Deployment](https://vercel.com/docs)
