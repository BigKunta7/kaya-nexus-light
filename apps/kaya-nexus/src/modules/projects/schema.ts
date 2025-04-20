import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3),
  status: z.enum(['active', 'archived', 'pending']),
  description: z.string().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/**
 * Type guard pour ProjectInput
 */
export function isProjectInput(obj: unknown): obj is ProjectInput {
  const parse = projectSchema.safeParse(obj);
  return parse.success;
}
