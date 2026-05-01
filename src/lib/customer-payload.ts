import type { Prisma } from '@prisma/client';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export type CustomerFieldErrors = Record<string, string>;

export function parseCustomerPayload(raw: any): { data?: Prisma.CustomerUncheckedCreateInput; errors?: CustomerFieldErrors } {
  const errors: CustomerFieldErrors = {};

  if (!raw.contactName?.trim()) errors.contactName = 'Contact person is required.';
  if (!raw.phone?.trim()) errors.phone = 'Phone number is required.';
  if (!raw.email?.trim()) errors.email = 'Email is required.';
  else if (!emailRegex.test(raw.email)) errors.email = 'Enter a valid email address.';
  if (!raw.customerType) errors.customerType = 'Customer type is required.';
  if (!raw.deliveryAddressLine1?.trim()) errors.deliveryAddressLine1 = 'Delivery address line 1 is required.';
  if (!raw.deliveryPostalCode?.trim()) errors.deliveryPostalCode = 'Delivery postal code is required.';
  if (!raw.deliveryCountry?.trim()) errors.deliveryCountry = 'Delivery country is required.';

  if (Object.keys(errors).length > 0) return { errors };

  const billingSame = Boolean(raw.billingSame);
  const data: Prisma.CustomerUncheckedCreateInput = {
    contactName: raw.contactName,
    companyName: raw.companyName || null,
    email: raw.email,
    phone: raw.phone,
    customerType: raw.customerType,
    status: raw.status || 'LEAD',
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
