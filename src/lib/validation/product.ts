import { Currency } from '@prisma/client';
import { z } from 'zod';

export const productInputSchema = z.object({
  name: z.string().min(2).max(120),
  category: z.string().min(2).max(80),
  description: z.string().min(2).max(500),
  supplierId: z.string().cuid(),
  costCurrency: z.nativeEnum(Currency),
  costPrice: z.number().positive(),
  sellingPrice: z.number().positive(),
  moq: z.number().int().positive(),
  unit: z.string().min(1).max(20),
  weightKg: z.number().nonnegative()
});

export type ProductInput = z.infer<typeof productInputSchema>;
