import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const customer = await prisma.customer.update({ where: { id: params.id }, data });
  await prisma.customerActivity.create({ data: { customerId: params.id, type: 'CUSTOMER_EDITED', description: 'Customer updated' } });
  return NextResponse.json(customer);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const linked = await prisma.customer.findUnique({ where: { id: params.id }, include: { quotations: true, salesOrders: true } });
  if (!linked) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (linked.quotations.length > 0 || linked.salesOrders.length > 0) {
    return NextResponse.json({ error: 'This customer has linked quotations or customer orders. Archive the customer instead.' }, { status: 400 });
  }
  await prisma.customer.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
