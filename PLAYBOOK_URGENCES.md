# Playbook Urgences - Kaya Nexus

Ce document décrit les procédures à suivre en cas d'incident majeur sur la plateforme Kaya Nexus.

## Contacts Clés

- **Responsable Technique Principal:** [Nom] - [Contact]
- **Support Hébergement (Vercel/Firebase):** [Liens/Contacts]
- **Support Base de Données (Supabase):** [Liens/Contacts]

## Scénarios Courants et Procédures

### 1. Indisponibilité Totale de la Plateforme

1.  **Vérifier le statut des services externes:**
    - Statut Vercel: [https://vercel.com/status](https://vercel.com/status)
    - Statut Firebase: [https://status.firebase.google.com/](https://status.firebase.google.com/)
    - Statut Supabase: [https://status.supabase.com/](https://status.supabase.com/)
2.  **Consulter les logs d'application:**
    - Vercel Logs: [Lien vers les logs Vercel du projet]
    - Firebase Functions Logs (si applicable): [Lien]
3.  **Analyser les déploiements récents:** Un rollback est-il nécessaire ?
    - Vercel Deployments: [Lien]
4.  **Contacter le support** si le problème persiste et semble lié à l'infrastructure.
5.  **Communication:** Informer les parties prenantes de l'incident et des étapes de résolution.

### 2. Problème de Connexion Base de Données (Supabase)

1.  **Vérifier le statut Supabase** (voir lien ci-dessus).
2.  **Vérifier les quotas et limites** du projet Supabase.
3.  **Inspecter les logs Supabase** (section Logs dans le tableau de bord Supabase).
4.  **Vérifier les identifiants de connexion** (variables d'environnement) utilisés par l'application.
5.  **Tester la connexion** depuis un outil externe (ex: `psql`, DBeaver).

### 3. Problème d'Authentification (Firebase Auth)

1.  **Vérifier le statut Firebase Auth** (voir lien ci-dessus).
2.  **Vérifier les quotas** d'authentification Firebase.
3.  **Inspecter les règles de sécurité** Firebase (si applicable).
4.  **Consulter les journaux d'audit** Firebase Auth.
5.  **Vérifier la configuration client/serveur** Firebase dans l'application.

### 4. Vulnérabilité de Sécurité Détectée

1.  **Isoler le composant/service affecté** si possible.
2.  **Analyser la vulnérabilité:** Quelle est la portée et l'impact ?
3.  **Développer et tester un correctif** en priorité absolue.
4.  **Déployer le correctif.**
5.  **Auditer les logs** pour détecter toute exploitation passée.
6.  **Communication:** Informer les responsables et potentiellement les utilisateurs si des données ont été compromises.

## Procédures de Sauvegarde et Restauration

- **Supabase:** [Décrire la stratégie de sauvegarde (ex: PITR activé, sauvegardes manuelles)]
- **Firebase (Firestore/Realtime DB):** [Décrire la stratégie de sauvegarde]
- **Code Source (Git):** Assurer des commits et push réguliers sur le dépôt distant.

## Escalade

- Si un incident n'est pas résolu dans [X temps], escalader à [Nom/Rôle Supérieur].

---
*Ce document doit être revu et mis à jour régulièrement.*
