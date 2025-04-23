# Sécurité

Module pour auth avancée, rôles/permissions, audit logs, chiffrement, conformité.

## API publique
- `hashPassword(password)`
- `encryptData(data)`
- `checkPermission(user, action)`

## Bonnes pratiques
- Hash avec bcrypt, chiffrement AES-256.
- Logs d’audit centralisés.
- Validation Zod systématique.

## Exemple d’intégration
```ts
import { hashPassword } from './index';
hashPassword('motdepasse');
```
