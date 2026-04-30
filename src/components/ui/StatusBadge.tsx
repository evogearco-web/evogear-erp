interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">{status}</span>;
}
