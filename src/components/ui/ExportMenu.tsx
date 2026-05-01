export function ExportMenu() {
  return (
    <div className="flex flex-wrap gap-2">
      {['Excel', 'CSV', 'PDF', 'Quotation PDF', 'Invoice PDF', 'Delivery Order PDF'].map((item) => (
        <button key={item} className="rounded-md border border-slate-300 px-3 py-2 text-xs">
          {item}
        </button>
      ))}
    </div>
  );
}
