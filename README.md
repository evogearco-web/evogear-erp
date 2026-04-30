# EvoGear ERP Foundation

## Project overview
Initial foundation for EvoGear's internal ERP web application. It establishes modular routing, reusable UI building blocks, Prisma data models, and seed-ready sample records for sales, procurement, shipping, and payments.

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- npm

## Setup instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Update `DATABASE_URL` in `.env`.
4. Run migrations and generate Prisma client:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```
5. Seed sample data:
   ```bash
   npm run prisma:seed
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

## Environment variables
- `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"`

## Database workflow
- Validate schema: `npm run prisma:validate`
- Create/update migration: `npm run prisma:migrate`
- Seed: `npm run prisma:seed`

## Folder structure
- `src/app`: ERP routes and root layout
- `src/components/layout`: Sidebar and topbar
- `src/components/ui`: Reusable page-level components
- `src/lib`: Navigation, module copy, business calculation helpers
- `prisma`: Prisma schema + seed script

## Next recommended build steps
1. Add server actions and Zod-validated forms for customer/product creation.
2. Replace dashboard mock stats with Prisma aggregate queries.
3. Add authentication (e.g., NextAuth) and enforce `UserRole` authorization in protected routes.
4. Introduce paginated list views with search/filter/sort per module.
