# EvoGear ERP Design Specification

## 1) Design goals

EvoGear ERP UI must be:
- **Clean and modern**: minimal visual noise, clear hierarchy, balanced whitespace.
- **Businesslike and trustworthy**: neutral palette, consistent components, predictable behavior.
- **Fast for operations work**: optimized for repetitive data-entry and order-tracking tasks.
- **Readable under pressure**: high text contrast, concise labels, obvious states.
- **Scalable**: patterns must support new modules without redesign.

Primary priorities:
1. Fast data entry
2. Clear order tracking
3. Low visual clutter
4. Clear status labels
5. Strong readability
6. Easy supplier and customer management

---

## 2) Target users

### Core users
- **Operations staff**: enters customer requests, builds quotations, updates order/shipment/payment statuses.
- **Operations manager**: reviews throughput, bottlenecks, margins, overdue items.
- **Sales/admin support**: tracks customer communication and order progression.

### User context assumptions
- Desktop-first usage during working hours.
- Frequent context switching between Customers, Quotations, Sales Orders, Supplier Orders, Shipping, and Payments.
- Users need quick scanning more than decorative UI.

---

## 3) Layout rules

### Global shell
- Fixed app shell with:
  - **Left sidebar** (primary navigation)
  - **Top header** (context, quick actions, user/role, filters)
  - **Main content area** (page content)
- Keep layout visually stable between routes to reduce cognitive load.

### Content width and rhythm
- Use a comfortable max content width on very large screens (e.g., ~1440px) while preserving table utility.
- Page structure order:
  1. Page header (title + short intent)
  2. Primary actions (Add, Export, Filter)
  3. KPI strip (if relevant)
  4. Main table/form/cards

### Sticky behavior
- Sticky top header on scroll for long pages.
- Keep table actions/filter bars visible when practical.

---

## 4) Sidebar navigation rules

### Structure
- Ordered menu:
  1. Dashboard
  2. Customers
  3. Products
  4. Quotations
  5. Sales Orders
  6. Suppliers
  7. Supplier Orders
  8. Shipping
  9. Payments
  10. Settings

### Interaction rules
- Active route must be visually obvious (filled background + stronger text).
- Hover states should be subtle and consistent.
- Use concise labels; avoid wrapping where possible.
- Preserve fixed placement of navigation items across modules.

### Visual rules
- Sidebar background should contrast softly with content area.
- Icons optional; if added later, maintain consistent size and stroke.

---

## 5) Dashboard design rules

### Purpose
Dashboard is an **operational snapshot**, not a full analytics suite.

### Required stat cards
- Total Revenue
- Gross Profit
- Open Quotations
- Pending Supplier Orders
- Unpaid Payments
- Active Shipments

### Rules
- Show 6 KPI cards in a responsive grid.
- Card content: label (small), value (prominent), optional trend/meta line.
- Avoid dense charts initially; prioritize immediate scanability.
- Add a “work queue” section later (overdue payments, delayed shipments, expiring quotes).

---

## 6) Table design rules

### Table behavior
- Tables are primary for Customers, Products, Quotations, Orders, Suppliers, Shipping, Payments.
- Sticky header row for long lists.
- Consistent row height and cell padding.
- First column should anchor identity (e.g., customer name/order number).

### Data readability
- Left-align text; right-align numeric/currency columns.
- Format monetary values consistently with currency prefix.
- Dates should use one standard format (e.g., `YYYY-MM-DD` or locale-standard but consistent).
- Truncate overly long text with tooltip/view details pattern.

### Table controls
- Place search, filters, and sort controls above table.
- Filters should favor status/date/customer/supplier fields.
- Row actions should be clear and predictable (View, Edit, Update Status).

---

## 7) Form design rules

### Form layout
- Use 1-column forms for simple pages and 2-column layout for dense desktop forms.
- Group fields by business meaning:
  - Customer details
  - Pricing/costing
  - Delivery/shipping
  - Payment terms

### Input rules
- Labels always visible; placeholders are supportive, not primary labels.
- Required fields clearly marked.
- Inline validation messages shown beneath field.
- Keep tab order logical for rapid keyboard entry.

### Fast entry patterns
- Use sensible defaults (currency, status, common units).
- Support quick-add flows (e.g., add customer from quotation flow in future).
- Auto-calculate derived fields where possible (line totals, margins, totals).

---

## 8) Button styles

### Button hierarchy
- **Primary**: key action on page (e.g., Save, Create Quotation)
- **Secondary**: non-destructive alternative (e.g., Cancel, Back)
- **Tertiary/Ghost**: low-emphasis actions (e.g., View details)
- **Danger**: destructive actions only (delete/cancel irreversible operations)

### Rules
- One dominant primary action per section.
- Button labels should be verb-first and specific.
- Maintain consistent heights and horizontal padding.
- Disabled state must be clearly visible and accessible.

---

## 9) Status badge styles

### Purpose
Status badges are critical for order and payment tracking; must be instantly scannable.

### Badge rules
- Compact rounded badges with medium font weight.
- Use both color and readable text; do not rely on color alone.
- Keep status vocabulary aligned with Prisma enums.

### Suggested semantic mapping
- **Neutral/Gray**: DRAFT, PENDING
- **Info/Blue**: SENT, CONFIRMED, IN_PRODUCTION, IN_TRANSIT
- **Success/Green**: ACCEPTED, COMPLETED, RECEIVED, DELIVERED, PAID
- **Warning/Amber**: PARTIALLY_PAID, SHIPPED (in progress handoff)
- **Danger/Red**: REJECTED, CANCELLED, OVERDUE, DELAYED, EXPIRED

---

## 10) Empty state design

### Empty state components
- Clear title (“No supplier orders yet”)
- One-sentence explanation
- Primary CTA (“Create Supplier Order”)
- Optional secondary CTA (“Import data” in future)

### Tone and intent
- Keep copy practical and action-oriented.
- Empty states should guide first action, not just indicate absence.

---

## 11) Mobile responsiveness rules

### Breakpoint behavior
- Desktop-first, but functional on tablet/mobile.
- Sidebar collapses into drawer/menu on smaller screens.
- Tables may switch to card/list summaries on mobile for readability.

### Mobile priorities
- Preserve critical actions at top of screen.
- Minimize horizontal scrolling where possible.
- Use larger tap targets for status/actions.

### Performance considerations
- Avoid heavy visuals/charts on mobile initial view.
- Prioritize key counts and pending alerts.

---

## 12) Colour usage

### Palette principle
- Neutral base with restrained accent colors.
- High contrast for text and data values.
- Color used intentionally for state and priority.

### Recommended usage
- **Background**: very light neutral
- **Surfaces/cards**: white
- **Borders/dividers**: soft gray
- **Primary accent**: dark slate/navy for main actions and active nav
- **State colors**: green/amber/red/blue mapped to statuses

### Rules
- Avoid decorative gradients for core business screens.
- Keep status color meanings consistent across all modules.

---

## 13) Typography scale

### Type system
- Prefer a modern sans-serif UI font stack.
- Target strong legibility over stylistic display fonts.

### Suggested scale
- Page title: 24–30px, semibold
- Section title: 18–20px, semibold
- Body: 14–16px, regular
- Table text: 13–14px
- Caption/help text: 12–13px
- Badge/button text: 12–14px, medium

### Rules
- Maintain consistent line-height and spacing across modules.
- Use weight changes sparingly to signal hierarchy.

---

## 14) Spacing rules

### Spacing system
- Use an 8px spacing rhythm (4/8/12/16/24/32).
- Keep consistent vertical spacing between page sections.

### Component spacing
- Cards: generous inner padding for readability.
- Forms: consistent gap between label/input/error.
- Tables: balanced cell padding for scanning dense data.

### Density guidance
- Moderate density for desktop ops workflows.
- Avoid overly compressed UI that harms readability.

---

## 15) Module design patterns

Apply a repeatable pattern across each module (Customers, Products, Quotations, Sales Orders, Suppliers, Supplier Orders, Shipping, Payments):

1. **Page header**
   - Title + one-line purpose
2. **Action bar**
   - Primary create action, secondary export/filter
3. **Quick filters**
   - Status/date/search controls relevant to module
4. **Main data view**
   - Table-first design for list pages
5. **Detail flow**
   - Structured detail pages with summary + timeline/status history (future)
6. **Inline status visibility**
   - Standardized status badges in list and detail contexts
7. **Empty state fallback**
   - Actionable guidance when no records exist

### Cross-module consistency rules
- Reuse shared components and spacing tokens.
- Keep button placements predictable.
- Keep naming conventions aligned with business terms.
- Ensure every module supports the “scan -> decide -> update” workflow.

---

## Final UX principle

EvoGear ERP should feel like a **focused operations control panel**: simple, fast, and reliable. Every screen should help users answer three questions quickly:
1. What needs attention now?
2. What is the current status?
3. What action should I take next?
