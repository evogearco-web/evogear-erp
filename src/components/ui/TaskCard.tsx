import { StatusBadge } from './StatusBadge';

interface TaskCardProps { title: string; count: string; status: string; }

export function TaskCard({ title, count, status }: TaskCardProps) {
  return <div className="rounded-lg border border-slate-200 bg-white p-4"><div className="flex items-center justify-between"><p className="text-sm text-slate-600">{title}</p><StatusBadge status={status} /></div><p className="mt-3 text-2xl font-semibold">{count}</p></div>;
}
