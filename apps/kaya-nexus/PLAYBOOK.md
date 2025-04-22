# Playbook Kaya Nexus – Scénarios Clés

## 1. Connexion MFA
- **Étapes** : Aller sur /, cliquer sur "Connexion", saisir email/MFA, valider.
- **Résultat attendu** : Utilisateur connecté, accès dashboard.

## 2. Changement de langue
- **Étapes** : Utiliser le sélecteur de langue (header), choisir "English".
- **Résultat attendu** : UI traduite en anglais.

## 3. Changement de hub
- **Étapes** : Utiliser le sélecteur de hub (header), choisir "KAPITAL Publishing".
- **Résultat attendu** : Branding et données du hub changés.

## 4. Création d’un projet
- **Étapes** : Aller sur /projects, cliquer "Nouveau projet", remplir le formulaire, valider.
- **Résultat attendu** : Projet ajouté à Firestore.

## 5. Paiement Stripe
- **Étapes** : Aller sur une page de paiement, saisir montant, valider.
- **Résultat attendu** : Paiement simulé via Stripe, confirmation affichée.

---

**Bonnes pratiques** :
- MFA obligatoire pour toute action sensible.
- Logs d’erreur centralisés.
- Tests E2E pour chaque scénario (Cypress).

**Documentation Swagger** : voir `swagger.config.js` et `/api/docs`.
