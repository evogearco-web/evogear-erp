import { prisma } from '@/lib/prisma';
import { CustomersClient } from '@/components/customers/CustomersClient';

export default async function CustomersPage({ searchParams }: { searchParams: { q?: string; type?: string } }) {
  const q = searchParams.q ?? '';
  const type = searchParams.type ?? '';
  const customers = await prisma.customer.findMany({
    where: {
      AND: [
        type ? { customerType: type as never } : {},
        q
          ? {
              OR: [
                { companyName: { contains: q, mode: 'insensitive' } },
                { contactName: { contains: q, mode: 'insensitive' } },
                { phone: { contains: q, mode: 'insensitive' } }
              ]
            }
          : {}
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
  return <CustomersClient customers={customers} />;
}
