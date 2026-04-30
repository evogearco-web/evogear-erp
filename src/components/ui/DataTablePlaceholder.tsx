interface DataTablePlaceholderProps {
  title: string;
  message: string;
}

export function DataTablePlaceholder({ title, message }: DataTablePlaceholderProps) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </div>
  );
}
