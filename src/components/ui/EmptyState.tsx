export function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-slate-600">{message}</p></div>;
}
