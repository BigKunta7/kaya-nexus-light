import { z } from 'zod';

/**
 * Schéma Zod pour UserProfile
 */
export const userProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['admin', 'manager', 'viewer']),
  createdAt: z.string().datetime(),
});

/**
 * Type TypeScript inféré
 */
export type UserProfile = z.infer<typeof userProfileSchema>;

/**
 * Type guard pour UserProfile
 * @param obj Donnée à valider
 */
export function isUserProfile(obj: unknown): obj is UserProfile {
  return userProfileSchema.safeParse(obj).success;
}
