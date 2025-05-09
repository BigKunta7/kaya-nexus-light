import { z } from 'zod';

export const aiPromptSchema = z.object({
  prompt: z.string().min(5),
  model: z.string(),
  temperature: z.number().min(0).max(1),
});

export type AiPromptInput = z.infer<typeof aiPromptSchema>;

/**
 * Type guard pour AiPromptInput
 */
export function isAiPromptInput(obj: unknown): obj is AiPromptInput {
  const parse = aiPromptSchema.safeParse(obj);
  return parse.success;
}
