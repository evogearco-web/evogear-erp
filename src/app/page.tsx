import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TaskCard } from '@/components/ui/TaskCard';

const tasks = [
  ['Unpaid balances', '8', 'Overdue'], ['Quotations expiring soon', '4', 'Sent'], ['Supplier order delays', '3', 'Delayed'], ['Shipment delays', '2', 'Delayed'],
  ['Low stock', '6', 'Pending'], ['Orders requiring deposit', '5', 'Unpaid'], ['Orders requiring balance payment', '7', 'Partially Paid']
] as const;

const stats = [
  ['Revenue this month', 'SGD 142,100'], ['Gross profit this month', 'SGD 41,860'], ['Open quotations', '15'], ['Confirmed customer orders', '19'],
  ['Pending supplier orders', '9'], ['Shipments in transit', '6'], ['Unpaid invoice amount', 'SGD 28,400']
] as const;

export default function DashboardPage() {
  return <section className="space-y-5"><PageHeader title="Dashboard" description="Today-first operations overview for tasks, order flow, and status tracking." primaryActionLabel="New Task" />
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{tasks.map(([title,count,status]) => <TaskCard key={title} title={title} count={count} status={status} />)}</div>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}</div>
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-4"><h3 className="font-semibold">Recent activity</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>SO-2026-0012 moved to <StatusBadge status="Confirmed" /></li><li>Invoice INV-0009 marked <StatusBadge status="Partially Paid" /></li><li>Shipment SHP-0051 updated to <StatusBadge status="In Transit" /></li></ul></div>
      <div className="rounded-lg border border-slate-200 bg-white p-4"><h3 className="font-semibold">Priority queue</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>Follow up 3 overdue invoices</li><li>Resolve 2 delayed supplier orders</li><li>Review 4 quotations expiring within 48h</li></ul></div>
    </div>
  </section>;
}
