import { z } from 'zod';

export const priceTierSchema = z.object({
  minQuantity: z.number().int().positive(),
  unitCostRmb: z.number().min(0),
  exchangeRate: z.number().gt(0),
  sellingPriceSgd: z.number().min(0)
});

export const sizeVariantSchema = z.object({
  size: z.string().min(1),
  skuSuffix: z.string().optional(),
  notes: z.string().optional()
});

export const attachmentSchema = z.object({
  fileName: z.string().min(1),
  fileUrl: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().min(0),
  attachmentType: z.string().min(1),
  description: z.string().optional()
});

export const productPayloadSchema = z.object({
  productName: z.string().min(1),
  productType: z.string().min(1),
  category: z.string().min(1),
  supplierName: z.string().min(1),
  supplierPhone: z.string().min(1),
  costCurrency: z.string().min(1),
  unitCostRmb: z.number().min(0),
  exchangeRate: z.number().gt(0),
  sellingPriceSgd: z.number().min(0),
  moq: z.number().int().gt(0),
  unit: z.string().min(1),
  description: z.string().min(1),
  status: z.string().min(1),
  supplierId: z.string().optional().nullable(),
  supplierContactName: z.string().optional(), supplierEmail: z.string().optional(), supplierCountry: z.string().optional(), supplierNotes: z.string().optional(), supplierProductLink: z.string().optional(), taobaoLink: z.string().optional(), material: z.string().optional(), gsm: z.string().optional(), sizeChart: z.string().optional(), colourOptions: z.string().optional(), printMethod: z.string().optional(), packagingNotes: z.string().optional(), productionLeadTime: z.string().optional(), shippingNotes: z.string().optional(), internalNotes: z.string().optional(), customerFacingDescription: z.string().optional(), weightKg: z.number().optional().nullable(), customFields: z.any().optional().nullable(),
  priceTiers: z.array(priceTierSchema).optional(),
  sizeVariants: z.array(sizeVariantSchema).optional(),
  attachments: z.array(attachmentSchema).optional()
});

export function zodErrors(e: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of e.issues) fieldErrors[String(issue.path[0] ?? 'form')] = issue.message;
  return { message: 'Please fix the highlighted fields before saving.', fieldErrors };
}
