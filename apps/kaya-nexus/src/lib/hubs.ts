/**
 * Service de gestion des hubs territoriaux.
 * Permet de charger dynamiquement la configuration des hubs.
 * @module Lib/Hubs
 */

import type { HubConfig } from '../types/hub';

export const isHubConfig = (obj: unknown): obj is HubConfig => {
  if (!obj || typeof obj !== 'object') return false;
  const hub = obj as HubConfig;
  return (
    typeof hub.id === 'string' &&
    typeof hub.name === 'string' &&
    typeof hub.locale === 'string' &&
    typeof hub.timezone === 'string' &&
    typeof hub.currency === 'string' &&
    typeof hub.branding === 'object' &&
    typeof hub.branding.logoUrl === 'string' &&
    typeof hub.branding.primaryColor === 'string' &&
    typeof hub.branding.secondaryColor === 'string' &&
    Array.isArray(hub.enabledModules) &&
    typeof hub.default === 'boolean'
  );
};

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

export const getHubs = (): HubConfig[] => {
  const hubsJson = process.env.NEXT_PUBLIC_HUBS;
  if (!hubsJson) return HUBS;

  try {
    const parsed = JSON.parse(hubsJson);
    if (!Array.isArray(parsed)) return HUBS;
    return parsed.filter(isHubConfig);
  } catch {
    return HUBS;
  }
};

export const getDefaultHub = (): HubConfig | null => {
  const hubs = getHubs();
  return hubs.length > 0 ? hubs[0] : null;
};

export const getHubById = (hubs: HubConfig[], id: string): HubConfig | undefined => {
  return hubs.find(h => h.id === id);
};
