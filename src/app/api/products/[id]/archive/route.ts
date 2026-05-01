import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.update({ where: { id: params.id }, data: { status: 'ARCHIVED', activities: { create: { type: 'PRODUCT_ARCHIVED', description: 'Product archived.' } } } });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
  }
}
