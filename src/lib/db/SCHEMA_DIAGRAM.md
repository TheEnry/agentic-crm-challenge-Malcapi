# Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CRM SQLite Database                          │
│                     (Browser-based)                              │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│     CONTACTS         │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ email                │
│ phone                │
│ company              │
│ position             │
│ avatar               │
│ address              │
│ city, state, zip     │
│ country              │
│ socialLinks (JSON)   │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│     COMPANIES        │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ domain               │
│ email                │
│ phone                │
│ description          │
│ categoryIds (JSON)   │
│ contactIds (JSON)    │
│ address              │
│ city, state, zip     │
│ country              │
│ socialLinks          │
│ estimatedArrId       │
│ employeeRangeId      │
│ connectionStrengthId │
│ foundedAt            │
│ lastInteractionAt    │
│ badge (JSON)         │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│       DEALS          │
├──────────────────────┤
│ id (PK)              │
│ title                │
│ content              │
│ userName             │
│ companyIds (JSON)    │
│ contactIds (JSON)    │
│ dealIds (JSON)       │
│ assignedContactIds   │
│ status               │
│ priority             │
│ amount               │
│ currency             │
│ paymentDate          │
│ paymentType          │
│ contractNumber       │
│ discount             │
│ dueAt                │
│ completedAt          │
│ completedBy          │
│ comments             │
│ avatar               │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│       TASKS          │
├──────────────────────┤
│ id (PK)              │
│ title                │
│ content              │
│ createdBy            │
│ companyIds (JSON)    │
│ contactIds (JSON)    │
│ dealIds (JSON)       │
│ assignedContactIds   │
│ status               │
│ priority             │
│ dueAt                │
│ completedAt          │
│ completedBy          │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

┌──────────────────────┐
│       NOTES          │
├──────────────────────┤
│ id (PK)              │
│ title                │
│ content              │
│ createdBy            │
│ status               │
│ assignedContactIds   │
│ companyIds (JSON)    │
│ dealIds (JSON)       │
│ dueAt                │
│ completedAt          │
│ completedBy          │
│ logo                 │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

Relationships (via JSON arrays):
────────────────────────

DEALS.contactIds      ──→  CONTACTS.id (many-to-many)
DEALS.companyIds      ──→  COMPANIES.id (many-to-many)
TASKS.contactIds      ──→  CONTACTS.id (many-to-many)
TASKS.companyIds      ──→  COMPANIES.id (many-to-many)
TASKS.dealIds         ──→  DEALS.id (many-to-many)
NOTES.contactIds      ──→  CONTACTS.id (many-to-many)
NOTES.companyIds      ──→  COMPANIES.id (many-to-many)
NOTES.dealIds         ──→  DEALS.id (many-to-many)
COMPANIES.contactIds  ──→  CONTACTS.id (many-to-many)
COMPANIES.categoryIds ──→  Categories (external)

Data Storage:
─────────────

┌─────────────┐      ┌──────────────┐      ┌────────────────┐
│  sql.js     │ ───→ │ SQL Database │ ───→ │ localStorage   │
│  (WASM)     │      │  (in-memory) │      │ (persistent)   │
└─────────────┘      └──────────────┘      └────────────────┘

Auto-save after:
- createContact/Company/Deal/Task/Note
- updateContact/Company/Deal/Task/Note
- deleteContact/Company/Deal/Task/Note

Field Types:
────────────

TEXT    - Strings, JSON arrays/objects
INTEGER - Numbers (comments count)
REAL    - Decimals (amounts, discounts)
DATE    - ISO 8601 strings (converted to/from Date objects)
