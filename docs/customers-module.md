# Customers Module

## Overview
Module 1 delivers a working Customers workflow: list/search/filter, add/edit drawers, customer detail page, notes/follow-ups/activity tracking, archive/delete protections, and local image upload support structure.

## Fields
Required: contact person, phone, email, customer type, delivery address line 1, delivery postal code, delivery country.
Optional: organisation, billing address, notes, status, tags, image attachments.

## Statuses
ACTIVE, INACTIVE, LEAD, PROSPECT, REPEAT_CUSTOMER, BLACKLISTED.
Default: LEAD.

## Tags
HIGH_VALUE, FAST_PAYER, SLOW_PAYER, PRICE_SENSITIVE, REQUIRES_FOLLOW_UP, FREQUENT_BUYER, STUDENT_GROUP, CORPORATE.

## Search and filter
Search scope: organisation, contact person, phone.
Filter: customer type.

## Address structure
Delivery and billing are split fields. Billing can mirror delivery using "billing same" in drawer.

## Image upload
Upload endpoint: `/api/uploads/customers`.
Allowed: jpg/jpeg/png/webp.
Limit: 5MB.
Stored under `public/uploads/customers` and URL saved in DB.

## Notes / follow-ups / activity
- Main customer note + timestamped note model.
- Follow-ups with type/status/due date.
- Activity log records create/edit/note/follow-up actions.

## Delete and archive rules
- Archive updates status to INACTIVE.
- Delete is blocked if quotations or customer orders are linked:
  “This customer has linked quotations or customer orders. Archive the customer instead.”

## Known limitations
- Placeholder metrics until Customer Orders and Invoices modules are built.
- Non-built actions (quotation/order/invoice create) show placeholder messages.
- Excel export currently placeholder.

## Next recommended module
Customer Orders module, to power real customer metrics and linked-record tables.
