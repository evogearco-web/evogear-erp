import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.update({ where: { id: params.id }, data: { status: 'PRICE_NEEDS_UPDATE', activities: { create: { type: 'PRICE_NEEDS_UPDATE', description: 'Product marked as price needs update.' } } } });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
  }
}
