import { prisma } from '@/lib/prisma';
import { computeProductCosting } from '@/lib/products/calculations';
import { productPayloadSchema, zodErrors } from '@/lib/products/validation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const status = searchParams.get('status') ?? '';
  const products = await prisma.product.findMany({
    where: { AND: [search ? { productName: { contains: search, mode: 'insensitive' } } : {}, category ? { category: category as any } : {}, status ? { status: status as any } : {}] },
    include: { _count: { select: { priceTiers: true, sizeVariants: true, attachments: true } } },
    orderBy: { updatedAt: 'desc' }
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = productPayloadSchema.safeParse(raw);
    if (!parsed.success) return NextResponse.json(zodErrors(parsed.error), { status: 400 });
    const input = parsed.data;
    const calc = computeProductCosting(input.unitCostRmb, input.exchangeRate, input.sellingPriceSgd);

    const product = await prisma.product.create({
      data: {
        ...input,
        supplierId: input.supplierId || null,
        unitCostSgd: calc.unitCostSgd,
        grossProfitPerUnit: calc.grossProfitPerUnit,
        grossMarginPercentage: calc.grossMarginPercentage,
        priceTiers: input.priceTiers ? { create: input.priceTiers.map((tier) => ({ ...tier, ...computeProductCosting(tier.unitCostRmb, tier.exchangeRate, tier.sellingPriceSgd) })) } : undefined,
        sizeVariants: input.sizeVariants ? { create: input.sizeVariants } : undefined,
        attachments: input.attachments ? { create: input.attachments } : undefined,
        activities: { create: { type: 'PRODUCT_CREATED', description: 'Product created.' } }
      },
      include: { priceTiers: true, sizeVariants: true, attachments: true, activities: true }
    });
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Unable to create product.' }, { status: 500 });
  }
}
