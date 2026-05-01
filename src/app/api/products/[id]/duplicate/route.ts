import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const original = await prisma.product.findUnique({ where: { id: params.id }, include: { priceTiers: true, sizeVariants: true, attachments: true } });
  if (!original) return NextResponse.json({ message: 'Product not found.' }, { status: 404 });

  const { id, createdAt, updatedAt, priceTiers, sizeVariants, attachments, ...base } = original as any;
  const copy = await prisma.product.create({
    data: {
      ...base,
      productName: `${original.productName} Copy`,
      priceTiers: { create: priceTiers.map((x: any) => ({ minQuantity: x.minQuantity, unitCostRmb: x.unitCostRmb, exchangeRate: x.exchangeRate, unitCostSgd: x.unitCostSgd, sellingPriceSgd: x.sellingPriceSgd, grossProfitPerUnit: x.grossProfitPerUnit, grossMarginPercentage: x.grossMarginPercentage })) },
      sizeVariants: { create: sizeVariants.map((x: any) => ({ size: x.size, skuSuffix: x.skuSuffix, notes: x.notes })) },
      attachments: { create: attachments.map((x: any) => ({ fileName: x.fileName, fileUrl: x.fileUrl, mimeType: x.mimeType, sizeBytes: x.sizeBytes, attachmentType: x.attachmentType, description: x.description })) },
      activities: { create: { type: 'PRODUCT_DUPLICATED', description: 'Product duplicated from original product.' } }
    },
    include: { priceTiers: true, sizeVariants: true, attachments: true, activities: true }
  });
  return NextResponse.json(copy, { status: 201 });
}
