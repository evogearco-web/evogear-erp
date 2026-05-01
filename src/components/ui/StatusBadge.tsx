const badgeStyles: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700', Sent: 'bg-blue-100 text-blue-700', Accepted: 'bg-emerald-100 text-emerald-700', Rejected: 'bg-rose-100 text-rose-700',
  Expired: 'bg-rose-100 text-rose-700', Paid: 'bg-emerald-100 text-emerald-700', Unpaid: 'bg-amber-100 text-amber-700', 'Partially Paid': 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-rose-100 text-rose-700', Pending: 'bg-slate-100 text-slate-700', Confirmed: 'bg-blue-100 text-blue-700', 'In Production': 'bg-indigo-100 text-indigo-700',
  Shipped: 'bg-cyan-100 text-cyan-700', Completed: 'bg-emerald-100 text-emerald-700', Cancelled: 'bg-rose-100 text-rose-700', 'In Transit': 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700', Delayed: 'bg-rose-100 text-rose-700'
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeStyles[status] ?? 'bg-slate-100 text-slate-700'}`}>{status}</span>;
}
