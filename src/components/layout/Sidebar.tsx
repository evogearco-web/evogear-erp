'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/lib/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:w-64">
      <div className="border-b border-slate-200 p-4">
        <h1 className="text-lg font-semibold">EvoGear ERP</h1>
      </div>
      <nav className="p-3">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
