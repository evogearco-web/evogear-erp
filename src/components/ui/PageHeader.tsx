interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
