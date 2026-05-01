interface MobileNavProps {
  onOpen: () => void;
}

export function MobileNav({ onOpen }: MobileNavProps) {
  return (
    <button onClick={onOpen} className="rounded border border-slate-300 px-3 py-1 text-sm lg:hidden">
      Menu
    </button>
  );
}
