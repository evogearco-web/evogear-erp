import { parseCustomerPayload } from '@/lib/customer-payload';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const raw = await req.json();
  const parsed = parseCustomerPayload(raw);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const data = parsed.data!;
  const duplicatePhone = await prisma.customer.findUnique({ where: { phone: data.phone } });
  if (duplicatePhone) return NextResponse.json({ error: 'Phone number already exists.' }, { status: 400 });

  const duplicateEmail = await prisma.customer.findUnique({ where: { email: data.email } });
  if (duplicateEmail) return NextResponse.json({ error: 'Email already exists.' }, { status: 400 });

  const duplicateOrg = data.companyName ? await prisma.customer.findFirst({ where: { companyName: data.companyName } }) : null;

  const customer = await prisma.customer.create({ data });
  await prisma.customerActivity.create({ data: { customerId: customer.id, type: 'CUSTOMER_CREATED', description: 'Customer created' } });

  return NextResponse.json({ customer, warning: duplicateOrg ? 'Organisation name already exists. Saved anyway.' : null });
}
