import type { Prisma } from '@prisma/client';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseCustomerPayload(raw: any): { data?: Prisma.CustomerUncheckedCreateInput; error?: string } {
  if (!raw.phone?.trim()) return { error: 'Phone number is required.' };
  if (!raw.email?.trim()) return { error: 'Email is required.' };
  if (!emailRegex.test(raw.email)) return { error: 'Please enter a valid email address.' };
  if (!raw.contactName?.trim()) return { error: 'Contact person is required.' };
  if (!raw.customerType) return { error: 'Customer type is required.' };
  if (!raw.deliveryAddressLine1?.trim() || !raw.deliveryPostalCode?.trim() || !raw.deliveryCountry?.trim()) {
    return { error: 'Delivery address line 1, postal code, and country are required.' };
  }

  const billingSame = Boolean(raw.billingSame);
  const data: Prisma.CustomerUncheckedCreateInput = {
    contactName: raw.contactName,
    companyName: raw.companyName || null,
    email: raw.email,
    phone: raw.phone,
    customerType: raw.customerType,
    status: raw.status ?? 'LEAD',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    deliveryAddressLine1: raw.deliveryAddressLine1,
    deliveryAddressLine2: raw.deliveryAddressLine2 || null,
    deliveryPostalCode: raw.deliveryPostalCode,
    deliveryCountry: raw.deliveryCountry,
    billingAddressLine1: billingSame ? raw.deliveryAddressLine1 : raw.billingAddressLine1 || null,
    billingAddressLine2: billingSame ? raw.deliveryAddressLine2 || null : raw.billingAddressLine2 || null,
    billingPostalCode: billingSame ? raw.deliveryPostalCode : raw.billingPostalCode || null,
    billingCountry: billingSame ? raw.deliveryCountry : raw.billingCountry || null,
    notes: raw.notes || null
  };

  return { data };
}
