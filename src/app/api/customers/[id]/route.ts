import { parseCustomerPayload } from '@/lib/customer-payload';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const raw = await req.json();
  const parsed = parseCustomerPayload(raw);
  if (parsed.errors) return NextResponse.json({ message: 'Please fill in the required fields highlighted below.', fieldErrors: parsed.errors }, { status: 400 });

  const data = parsed.data!;
  const duplicatePhone = await prisma.customer.findFirst({ where: { phone: data.phone, NOT: { id: params.id } } });
  if (duplicatePhone) return NextResponse.json({ message: 'Validation failed.', fieldErrors: { phone: 'A customer with this phone number already exists.' } }, { status: 400 });

  const duplicateEmail = await prisma.customer.findFirst({ where: { email: data.email, NOT: { id: params.id } } });
  if (duplicateEmail) return NextResponse.json({ message: 'Validation failed.', fieldErrors: { email: 'A customer with this email already exists.' } }, { status: 400 });

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
