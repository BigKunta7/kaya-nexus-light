import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Type guard pour ContactInput
 */
export function isContactInput(obj: unknown): obj is ContactInput {
  const parse = contactSchema.safeParse(obj);
  return parse.success;
}
