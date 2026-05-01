interface PageHeaderProps {
  title: string;
  description: string;
  primaryActionLabel?: string;
}

export function PageHeader({ title, description, primaryActionLabel = 'Create' }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">{primaryActionLabel}</button>
    </div>
  );
}
