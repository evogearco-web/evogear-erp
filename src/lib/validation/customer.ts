import { z } from 'zod';

export const customerInputSchema = z.object({
  companyName: z.string().min(2).max(120),
  contactName: z.string().min(2).max(120),
  email: z.string().email().max(255),
  phone: z.string().min(6).max(30),
  address: z.string().min(5).max(500),
  notes: z.string().max(1000).optional().or(z.literal(''))
});

export type CustomerInput = z.infer<typeof customerInputSchema>;
