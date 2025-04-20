import { z } from 'zod';

/**
 * Schéma Zod pour SubsidiaryProfile
 */
export const subsidiaryProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  country: z.string().min(2),
  siret: z.string().length(14),
  createdAt: z.string().datetime(),
  active: z.boolean().default(true),
});

/**
 * Type TypeScript inféré
 */
export type SubsidiaryProfile = z.infer<typeof subsidiaryProfileSchema>;

/**
 * Type guard pour SubsidiaryProfile
 * @param obj Donnée à valider
 */
export function isSubsidiaryProfile(obj: unknown): obj is SubsidiaryProfile {
  return subsidiaryProfileSchema.safeParse(obj).success;
}
