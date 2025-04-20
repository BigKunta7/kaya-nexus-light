import { z } from 'zod';

export const analyticsEventSchema = z.object({
  type: z.string(),
  timestamp: z.string(),
  userId: z.string().optional(),
  details: z.any().optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

/**
 * Type guard pour AnalyticsEventInput
 */
export function isAnalyticsEventInput(obj: unknown): obj is AnalyticsEventInput {
  const parse = analyticsEventSchema.safeParse(obj);
  return parse.success;
}
