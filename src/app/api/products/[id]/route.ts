import { prisma } from '@/lib/prisma';
import { computeProductCosting } from '@/lib/products/calculations';
import { productPayloadSchema, zodErrors } from '@/lib/products/validation';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { supplier: true, priceTiers: true, sizeVariants: true, attachments: true, activities: { orderBy: { createdAt: 'desc' } }, _count: { select: { quotationItems: true, salesOrderItems: true, supplierOrderItems: true } } } });
  if (!product) return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const parsed = productPayloadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json(zodErrors(parsed.error), { status: 400 });
  const input = parsed.data;
  const calc = computeProductCosting(input.unitCostRmb, input.exchangeRate, input.sellingPriceSgd);

  try {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.productPriceTier.deleteMany({ where: { productId: params.id } });
      await tx.productSizeVariant.deleteMany({ where: { productId: params.id } });
      const product = await tx.product.update({ where: { id: params.id }, data: { ...input, supplierId: input.supplierId || null, unitCostSgd: calc.unitCostSgd, grossProfitPerUnit: calc.grossProfitPerUnit, grossMarginPercentage: calc.grossMarginPercentage, priceTiers: input.priceTiers ? { create: input.priceTiers.map((tier) => ({ ...tier, ...computeProductCosting(tier.unitCostRmb, tier.exchangeRate, tier.sellingPriceSgd) })) } : undefined, sizeVariants: input.sizeVariants ? { create: input.sizeVariants } : undefined } });
      await tx.productActivity.create({ data: { productId: params.id, type: 'PRODUCT_UPDATED', description: 'Product updated.' } });
      return product;
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: 'Unable to update product.' }, { status: 500 });
  }
}
