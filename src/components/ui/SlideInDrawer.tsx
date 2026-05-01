'use client';

import { useState } from 'react';

export function SlideInDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="rounded-md border border-slate-300 px-3 py-2 text-sm" onClick={() => setOpen(true)}>Sample Drawer</button>
      {open && <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} aria-label="Close" /><aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl"><h3 className="text-lg font-semibold">Drawer-ready form area</h3><p className="mt-2 text-sm text-slate-600">Future create/edit forms open here.</p><button className="mt-4 rounded-md bg-slate-900 px-3 py-2 text-white" onClick={() => setOpen(false)}>Close</button></aside></div>}
    </>
  );
}
