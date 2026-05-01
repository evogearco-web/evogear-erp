import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  if (!data.contactName || !data.phone || !data.email || !data.customerType || !data.deliveryAddressLine1 || !data.deliveryPostalCode || !data.deliveryCountry) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  const duplicatePhone = await prisma.customer.findUnique({ where: { phone: data.phone } });
  if (duplicatePhone) return NextResponse.json({ error: 'Phone number already exists.' }, { status: 400 });
  const duplicateEmail = await prisma.customer.findFirst({ where: { email: data.email } });
  if (duplicateEmail) return NextResponse.json({ error: 'Email already exists.' }, { status: 400 });
  const duplicateOrg = data.companyName ? await prisma.customer.findFirst({ where: { companyName: data.companyName } }) : null;
  const customer = await prisma.customer.create({ data });
  await prisma.customerActivity.create({ data: { customerId: customer.id, type: 'CUSTOMER_CREATED', description: 'Customer created' } });
  return NextResponse.json({ customer, warning: duplicateOrg ? 'Organisation name already exists. Saved anyway.' : null });
}
