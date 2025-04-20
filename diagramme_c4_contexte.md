# Diagramme C4 — Contexte (niveau 1)

## Vue d’ensemble du système Kaya Nexus

```mermaid
C4Context
    title Système Kaya Nexus — Diagramme de Contexte
    Person(admin, "Administrateur KK Holding", "Gère la plateforme et les accès")
    Person(manager, "Manager", "Supervise les opérations et les projets")
    Person(viewer, "Viewer", "Consulte les données et rapports")
    System_Boundary(s1, "Kaya Nexus") {
      System(crm, "CRM Créatif", "Gestion des contacts et campagnes")
      System(projects, "Gestion Projets", "Suivi des tâches et deadlines")
      System(ia, "IA Collaboratif", "Outils d’automatisation et génération de contenu")
      System(finances, "Finances", "Paiements, comptabilité, rapports")
      System(analytics, "Analytics", "Tableaux de bord et KPIs")
    }
    System_Ext(supabase, "Supabase", "Base de données et API sécurisée")
    System_Ext(firebase, "Firebase Auth", "Authentification MFA")
    System_Ext(brevo, "Brevo", "Campagnes emailing")
    System_Ext(stripe, "Stripe", "Paiements en ligne")
    System_Ext(notion, "Notion", "Gestion des tâches")
    System_Ext(pipedrive, "Pipedrive", "Opportunités commerciales")
    System_Ext(quickbooks, "QuickBooks", "Comptabilité")
    System_Ext(metabase, "Metabase", "Analytique avancée")

    Rel(admin, s1, "Gère et configure")
    Rel(manager, s1, "Supervise et pilote")
    Rel(viewer, s1, "Consulte")
    Rel(s1, supabase, "Lecture/écriture données")
    Rel(s1, firebase, "Authentification utilisateurs")
    Rel(s1, brevo, "Synchronisation campagnes")
    Rel(s1, stripe, "Paiements et rapports")
    Rel(s1, notion, "Tâches et notes")
    Rel(s1, pipedrive, "Opportunités CRM")
    Rel(s1, quickbooks, "Comptabilité")
    Rel(s1, metabase, "Tableaux de bord avancés")
```

---

## Légende
- **Person** : Acteur humain
- **System** : Module interne Kaya Nexus
- **System_Ext** : Système externe/API
- **Rel** : Relation/interaction

> **Pour aller plus loin** :
> - [C4 Model — Documentation officielle](https://c4model.com/)
> - [Mermaid.js — Syntaxe C4](https://mermaid.js.org/syntax/c4c4.html)
