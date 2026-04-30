import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';

const stats = [
  { label: 'Total Revenue', value: 'SGD 128,450' },
  { label: 'Gross Profit', value: 'SGD 39,770' },
  { label: 'Open Quotations', value: '12' },
  { label: 'Pending Supplier Orders', value: '5' },
  { label: 'Unpaid Payments', value: '7' },
  { label: 'Active Shipments', value: '4' }
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Dashboard" description="Operational snapshot for EvoGear sales, procurement, and fulfillment." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}
