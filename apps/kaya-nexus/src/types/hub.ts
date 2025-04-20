/**
 * Types et interfaces pour la gestion des hubs territoriaux.
 * @module Types/Hub
 */

export interface HubConfig {
  id: string; // ex: 'fr', 'gwp', 'africa'
  name: string;
  locale: string; // ex: 'fr-FR'
  timezone: string;
  currency: string;
  branding: {
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
  };
  enabledModules: string[];
  default: boolean;
}
