import { z } from 'zod';

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

/**
 * Schéma Zod et type guard pour HubConfig
 */
export const hubConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  locale: z.string(),
  timezone: z.string(),
  currency: z.string(),
  branding: z.object({
    logoUrl: z.string().url(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
  }),
  enabledModules: z.array(z.string()),
  default: z.boolean(),
});
export type HubConfigZod = z.infer<typeof hubConfigSchema>;

export function isHubConfig(obj: unknown): obj is HubConfigZod {
  return hubConfigSchema.safeParse(obj).success;
}
