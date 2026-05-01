# EvoGear ERP Design System

## Design direction
- Modern SaaS dashboard inspired by operational finance tools.
- Core palette: black, white, gray with subtle borders and whitespace.
- Low-clutter UI optimized for fast entry and tracking work.

## Navigation structure
- Dashboard
- Customers
- Products
- Suppliers
- Quotations
- Customer Orders
- Supplier Orders
- Shipping
- Invoices
- Reports
- Settings

Navigation supports desktop collapsible sidebar and mobile menu drawer behavior.

## Dashboard structure
1. Today’s Tasks (action-first queue)
2. Summary stats
3. Recent activity
4. Priority queue

## Reusable component rules
- `Sidebar`: collapsible, active state, icon + label pattern.
- `Topbar`: compact controls and operational context.
- `PageHeader`: title, short description, primary action.
- `FilterBar`: search + filter placeholders + exports entry point.
- `ExportMenu`: reserved buttons for Excel/CSV/PDF variants.
- `TaskCard` / `StatCard`: concise metric blocks.
- `DataTablePlaceholder`: table-first shell with empty-state fallback.
- `SlideInDrawer`: right-side drawer pattern for future forms.
- `EmptyState`: simple action-oriented zero-data message.

## Status badge rules
Supported status styles:
Draft, Sent, Accepted, Rejected, Expired, Paid, Unpaid, Partially Paid, Overdue,
Pending, Confirmed, In Production, Shipped, Completed, Cancelled, In Transit,
Delivered, Delayed.

## Table pattern
- Table-first module pages.
- Search/filter/export controls above table.
- Row clickability reserved for future detail navigation.
- Horizontal overflow supported for mobile.

## Drawer form pattern
- Create/edit flows should open in right slide-in drawer.
- Keep full-page context visible while editing.

## Responsive rules
- Laptop: persistent collapsible sidebar.
- Phone: compact top menu + off-canvas sidebar.
- Tables remain usable with horizontal scrolling.

## Next recommended build step
Build **Customers module CRUD** using server actions + validation schemas + Prisma, wired into this layout and table/filter/drawer structure.
