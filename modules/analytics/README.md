# Analytics

Module pour dashboards custom, export, alertes KPIs, IA/ML et historique/versionning.

## API publique
- `trackEvent(event, data)`
- `generateReport(type, params)`

## Bonnes pratiques
- Toutes les données sont anonymisées.
- Validation stricte des schémas.
- Tests unitaires systématiques.

## Exemple d’intégration
```ts
import { trackEvent } from './index';
trackEvent('login', { user: 'user1' });
```
