import { ExportMenu } from './ExportMenu';

export function FilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 lg:flex-row lg:items-center">
      <input className="rounded-md border border-slate-300 px-3 py-2 text-sm lg:w-80" placeholder="Search..." />
      <div className="flex flex-1 gap-2">
        <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Status</button>
        <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Date</button>
        <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Customer/Supplier</button>
      </div>
      <ExportMenu />
    </div>
  );
}
