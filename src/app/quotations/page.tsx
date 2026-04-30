import { DataTablePlaceholder } from '@/components/ui/DataTablePlaceholder';
import { PageHeader } from '@/components/ui/PageHeader';
import { moduleCopy } from '@/lib/module-content';

export default function QuotationsPage() {
  const moduleTitle = 'Quotations';

  return (
    <section className="space-y-6">
      <PageHeader title={moduleTitle} description={moduleCopy[moduleTitle]} />
      <DataTablePlaceholder
        title={
          moduleTitle + ' foundation'
        }
        message="This module is scaffolded for Prisma-backed listing, filters, and future actions."
      />
    </section>
  );
}
