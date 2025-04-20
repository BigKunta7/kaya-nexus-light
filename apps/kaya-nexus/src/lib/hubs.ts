/**
 * Service de gestion des hubs territoriaux.
 * Permet de charger dynamiquement la configuration des hubs.
 * @module Lib/Hubs
 */

import type { HubConfig, isHubConfig } from '../types/hub';

export const HUBS: HubConfig[] = [
  {
    id: 'fr',
    name: 'France',
    locale: 'fr-FR',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    branding: {
      logoUrl: '/logos/fr.png',
      primaryColor: '#4D72FF',
      secondaryColor: '#FF4D72',
    },
    enabledModules: ['crm', 'finance', 'projects', 'ai', 'analytics'],
    default: true,
  },
  {
    id: 'gwp',
    name: 'Guadeloupe',
    locale: 'fr-FR',
    timezone: 'America/Guadeloupe',
    currency: 'EUR',
    branding: {
      logoUrl: '/logos/gwp.png',
      primaryColor: '#00BFA5',
      secondaryColor: '#FF6D00',
    },
    enabledModules: ['crm', 'finance', 'projects', 'ai', 'analytics', 'mobility'],
    default: false,
  },
  {
    id: 'us',
    name: 'États-Unis',
    locale: 'en-US',
    timezone: 'America/New_York',
    currency: 'USD',
    branding: {
      logoUrl: '/logos/us.png',
      primaryColor: '#2979FF',
      secondaryColor: '#FFAB40',
    },
    enabledModules: ['crm', 'finance', 'projects', 'ai', 'analytics'],
    default: false,
  },
];

/**
 * Retourne la liste des hubs configurés.
 */
export function getHubs(raw: unknown[]): HubConfig[] {
  return raw.filter(isHubConfig);
}

/**
 * Retourne le hub par défaut.
 */
export function getDefaultHub(hubs: HubConfig[]): HubConfig | undefined {
  return hubs.find(h => h.default);
}

/**
 * Retourne un hub par son id.
 */
export function getHubById(hubs: HubConfig[], id: string): HubConfig | undefined {
  return hubs.find(h => h.id === id);
}
