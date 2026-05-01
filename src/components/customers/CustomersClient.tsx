'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CUSTOMER_STATUSES, CUSTOMER_TAGS, CUSTOMER_TYPES } from './constants';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';

const requiredFields = ['contactName', 'phone', 'email', 'customerType', 'deliveryAddressLine1', 'deliveryPostalCode', 'deliveryCountry'];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CustomersClient({ customers }: { customers: any[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false); const [editing, setEditing] = useState<any>(null); const [msg, setMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<any>({ customerType: 'SCHOOL', status: 'LEAD', tags: [], billingSame: true });

  const validateClient = () => {
    const errors: Record<string, string> = {};
    if (!form.contactName?.trim()) errors.contactName = 'Contact person is required.';
    if (!form.phone?.trim()) errors.phone = 'Phone number is required.';
    if (!form.email?.trim()) errors.email = 'Email is required.';
    else if (!emailRegex.test(form.email)) errors.email = 'Enter a valid email address.';
    if (!form.customerType) errors.customerType = 'Customer type is required.';
    if (!form.deliveryAddressLine1?.trim()) errors.deliveryAddressLine1 = 'Delivery address line 1 is required.';
    if (!form.deliveryPostalCode?.trim()) errors.deliveryPostalCode = 'Delivery postal code is required.';
    if (!form.deliveryCountry?.trim()) errors.deliveryCountry = 'Delivery country is required.';
    return errors;
  };

  const save = async () => {
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setMsg('Please fill in the required fields highlighted below.');
      return;
    }

    const method = editing ? 'PATCH' : 'POST'; const url = editing ? `/api/customers/${editing.id}` : '/api/customers';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { setFieldErrors(data.fieldErrors ?? {}); setMsg(data.message || data.error || 'Unable to save customer.'); return; }
    setMsg(data.warning ?? 'Saved'); setFieldErrors({}); setOpen(false); router.refresh();
  };

  const onField = (key: string, value: any) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setForm((f: any) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) {
      const next = { ...fieldErrors }; delete next[key]; setFieldErrors(next);
    }
  };

  const fieldClass = (key: string, optional = false) => {
    const show = !optional && (fieldErrors[key] || (touched[key] && validateClient()[key]));
    return `border rounded px-3 py-2 text-sm w-full ${show ? 'border-red-500' : 'border-slate-300'}`;
  };

  return <section className="space-y-4"><PageHeader title="Customers" description="Manage customer contacts, addresses, reminders, and account status." primaryActionLabel="Add Customer" />
    <div className="rounded-lg border bg-white p-3 flex gap-2"><input className="border rounded px-3 py-2 text-sm" placeholder="Search organisation, contact, phone" onKeyDown={(e)=>{if(e.key==='Enter'){router.push(`/customers?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`)}}}/><select className="border rounded px-3 py-2 text-sm" onChange={(e)=>router.push(`/customers?type=${e.target.value}`)}><option value=''>All types</option>{CUSTOMER_TYPES.map(t=><option key={t}>{t}</option>)}</select><button className="border rounded px-3 py-2 text-sm" onClick={()=>setMsg('Excel export will be built later.')}>Excel Export</button><button className="ml-auto bg-slate-900 text-white rounded px-3 py-2 text-sm" onClick={()=>{setEditing(null);setForm({ customerType:'SCHOOL', status:'LEAD', tags:[], billingSame:true });setFieldErrors({});setTouched({});setMsg('');setOpen(true);}}>Add Customer</button></div>
    {msg && <p className='text-sm text-amber-700'>{msg}</p>}
    <div className='overflow-x-auto rounded-lg border bg-white'><table className='w-full min-w-[1200px] text-sm'><thead className='bg-slate-50'><tr>{['Contact','Organisation','Email','Phone','Type','Status','Last order','Total revenue','Outstanding','Created','Actions'].map(h=><th key={h} className='px-3 py-2 text-left'>{h}</th>)}</tr></thead><tbody>{customers.map(c=><tr key={c.id} className='border-t'><td className='px-3 py-2'><Link href={`/customers/${c.id}`} className='font-medium hover:underline'>{c.contactName}</Link></td><td className='px-3 py-2'>{c.companyName || '-'}</td><td className='px-3 py-2'>{c.email}</td><td className='px-3 py-2'>{c.phone}</td><td className='px-3 py-2'>{c.customerType}</td><td className='px-3 py-2'><StatusBadge status={c.status.replace('_',' ')} /></td><td className='px-3 py-2'>-</td><td className='px-3 py-2'>SGD 0.00</td><td className='px-3 py-2'>SGD 0.00</td><td className='px-3 py-2'>{new Date(c.createdAt).toLocaleDateString()}</td><td className='px-3 py-2 space-x-2'><button onClick={()=>{setEditing(c);setForm({...c,billingSame:false});setFieldErrors({});setTouched({});setMsg('');setOpen(true)}}>Edit</button><button onClick={()=>setMsg('Create quotation will be built in a later module.')}>Create quotation</button><button onClick={()=>setMsg('Create customer order will be built in a later module.')}>Create customer order</button><button onClick={()=>setMsg('Create invoice will be built in a later module.')}>Create invoice</button></td></tr>)}</tbody></table></div>
    {open && <div className='fixed inset-0 z-50'><button className='absolute inset-0 bg-black/30' onClick={()=>setOpen(false)} /><aside className='absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white p-5'><h3 className='text-lg font-semibold'>{editing?'Edit':'Add'} Customer</h3>{Object.keys(fieldErrors).length>0 && <p className='mt-2 text-sm text-red-600'>Please fill in the required fields highlighted below.</p>}<div className='mt-4 grid gap-3 md:grid-cols-2'>
      <label className='text-sm'>Contact person *<input className={fieldClass('contactName')} value={form.contactName||''} onChange={e=>onField('contactName',e.target.value)} />{fieldErrors.contactName&&<p className='text-xs text-red-600'>{fieldErrors.contactName}</p>}</label>
      <label className='text-sm'>Organisation name (optional)<input className={fieldClass('companyName',true)} value={form.companyName||''} onChange={e=>onField('companyName',e.target.value)} /></label>
      <label className='text-sm'>Phone *<input className={fieldClass('phone')} value={form.phone||''} onChange={e=>onField('phone',e.target.value)} />{fieldErrors.phone&&<p className='text-xs text-red-600'>{fieldErrors.phone}</p>}</label>
      <label className='text-sm'>Email *<input className={fieldClass('email')} value={form.email||''} onChange={e=>onField('email',e.target.value)} />{fieldErrors.email&&<p className='text-xs text-red-600'>{fieldErrors.email}</p>}</label>
      <label className='text-sm'>Customer type *<select className={fieldClass('customerType')} value={form.customerType||'SCHOOL'} onChange={e=>onField('customerType',e.target.value)}>{CUSTOMER_TYPES.map(t=><option key={t}>{t}</option>)}</select>{fieldErrors.customerType&&<p className='text-xs text-red-600'>{fieldErrors.customerType}</p>}</label>
      <label className='text-sm'>Status (optional)<select className={fieldClass('status',true)} value={form.status||'LEAD'} onChange={e=>onField('status',e.target.value)}><option value=''>Default LEAD</option>{CUSTOMER_STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
      <label className='text-sm md:col-span-2'>Delivery address line 1 *<input className={fieldClass('deliveryAddressLine1')} value={form.deliveryAddressLine1||''} onChange={e=>onField('deliveryAddressLine1',e.target.value)} />{fieldErrors.deliveryAddressLine1&&<p className='text-xs text-red-600'>{fieldErrors.deliveryAddressLine1}</p>}</label>
      <label className='text-sm md:col-span-2'>Delivery address line 2 (optional)<input className={fieldClass('deliveryAddressLine2',true)} value={form.deliveryAddressLine2||''} onChange={e=>onField('deliveryAddressLine2',e.target.value)} /></label>
      <label className='text-sm'>Delivery postal code *<input className={fieldClass('deliveryPostalCode')} value={form.deliveryPostalCode||''} onChange={e=>onField('deliveryPostalCode',e.target.value)} />{fieldErrors.deliveryPostalCode&&<p className='text-xs text-red-600'>{fieldErrors.deliveryPostalCode}</p>}</label>
      <label className='text-sm'>Delivery country *<input className={fieldClass('deliveryCountry')} value={form.deliveryCountry||''} onChange={e=>onField('deliveryCountry',e.target.value)} />{fieldErrors.deliveryCountry&&<p className='text-xs text-red-600'>{fieldErrors.deliveryCountry}</p>}</label>
      <label className='text-sm md:col-span-2'><input type='checkbox' checked={form.billingSame??true} onChange={e=>onField('billingSame',e.target.checked)}/> Billing address same as delivery address</label>
      <label className='text-sm'>Billing address line 1 (optional)<input className={fieldClass('billingAddressLine1',true)} value={form.billingAddressLine1||''} onChange={e=>onField('billingAddressLine1',e.target.value)} /></label>
      <label className='text-sm'>Billing address line 2 (optional)<input className={fieldClass('billingAddressLine2',true)} value={form.billingAddressLine2||''} onChange={e=>onField('billingAddressLine2',e.target.value)} /></label>
      <label className='text-sm'>Billing postal code (optional)<input className={fieldClass('billingPostalCode',true)} value={form.billingPostalCode||''} onChange={e=>onField('billingPostalCode',e.target.value)} /></label>
      <label className='text-sm'>Billing country (optional)<input className={fieldClass('billingCountry',true)} value={form.billingCountry||''} onChange={e=>onField('billingCountry',e.target.value)} /></label>
      <label className='text-sm md:col-span-2'>Notes (optional)<textarea className={fieldClass('notes',true)} value={form.notes||''} onChange={e=>onField('notes',e.target.value)} /></label>
      <div className='md:col-span-2 grid grid-cols-2 gap-2'>{CUSTOMER_TAGS.map(tag=><label key={tag} className='text-xs'><input type='checkbox' checked={(form.tags||[]).includes(tag)} onChange={e=>onField('tags',e.target.checked?[...(form.tags||[]),tag]:(form.tags||[]).filter((x:string)=>x!==tag))}/> {tag}</label>)}</div>
    </div><div className='mt-4 flex justify-end gap-2'><button className='border rounded px-3 py-2' onClick={()=>setOpen(false)}>Cancel</button><button className='bg-slate-900 text-white rounded px-3 py-2' onClick={save}>Save</button></div></aside></div>}
  </section>;
}
