import { MobileNav } from './MobileNav';

interface TopbarProps {
  onOpenMobile: () => void;
}

export function Topbar({ onOpenMobile }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <MobileNav onOpen={onOpenMobile} />
      <p className="text-sm text-slate-600">Operations dashboard</p>
      <p className="text-xs text-slate-500">Staff access</p>
    </header>
  );
}
