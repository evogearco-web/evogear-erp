# ERP Foundation Review (Pre-Customer/Product Build)

## What is solid
- Route/module skeleton and shared layout are clear and extensible.
- Prisma schema covers requested entities and status enums.
- Business calculation helpers are isolated and testable.

## Design issues identified and addressed
1. **No shared Prisma client singleton** would cause excessive connections in dev/hot reload.
   - Added `src/lib/prisma.ts` singleton pattern for Next.js server runtime.

2. **No server-side input contracts for first data modules** increases risk of inconsistent writes.
   - Added `zod` schemas for `Customer` and `Product` inputs in `src/lib/validation/*` for immediate reuse in server actions.

3. **Seed script was not re-runnable** due to unique keys (`quotationNumber`, `salesOrderNumber`, `supplierOrderNumber`) and direct `create` calls.
   - Updated seed script to clear dependent tables first, then seed deterministic base data.

## Remaining recommendations before building modules
- Add database indexes for common filters/search (`companyName`, `name`, status/date fields).
- Add `Decimal.js` conversion helpers when reading/writing Prisma Decimal values in UI/server actions.
- Introduce a minimal repository/service layer per module once CRUD starts to avoid fat route handlers.
