import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  date: z.string(),
  description: z.string().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
