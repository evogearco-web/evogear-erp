import { EmptyState } from './EmptyState';

export function DataTablePlaceholder({ title }: { title: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-[780px] w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600"><tr><th className="px-4 py-3">Record</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Owner</th><th className="px-4 py-3">Amount</th></tr></thead>
        <tbody><tr><td className="px-4 py-8" colSpan={5}><EmptyState title={`${title} placeholder`} message="Rows will be clickable and support search, filters, and exports." /></td></tr></tbody>
      </table>
    </div>
  );
}
