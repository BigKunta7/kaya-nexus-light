# Collaboration

Ce module gère le chat interne, les commentaires, l’édition collaborative et le partage de documents.

## API publique
- `sendMessage(userId, message)`
- `addComment(docId, comment)`
- `startCollabSession(docId, userIds[])`

## Bonnes pratiques
- Toutes les actions sont auditées.
- Validation des entrées avec Zod.
- Tests unitaires et E2E systématiques.

## Exemple d’intégration
```ts
import { sendMessage } from './index';
sendMessage('user1', 'Hello!');
```
