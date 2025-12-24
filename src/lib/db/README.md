# SQLite Database Module

This module provides a browser-based SQLite database using sql.js for the CRM application.

## Features

- ✅ Browser-based SQLite database (no server required)
- ✅ Persistent storage using localStorage
- ✅ Full CRUD operations for all entities
- ✅ TypeScript support with type-safe interfaces
- ✅ Automatic serialization/deserialization

## Entities

The database supports the following entities:

- **Contacts**: Customer and business contacts
- **Companies**: Organizations and businesses
- **Deals**: Sales deals and opportunities
- **Tasks**: Action items and to-dos
- **Notes**: General notes and memos

## Usage

### Initialize the Database

```typescript
import { initDatabase } from '@/lib/db';

// Initialize the database (call once on app startup)
await initDatabase();
```

### Contacts

```typescript
import {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from '@/lib/db';

// Create
const contact = createContact({
  id: 'contact-1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Read
const contact = getContact('contact-1');
const { data, total } = getAllContacts({ limit: 10, offset: 0 });

// Update
const updated = updateContact('contact-1', { email: 'newemail@example.com' });

// Delete
deleteContact('contact-1');
```

### Companies

```typescript
import {
  createCompany,
  getCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from '@/lib/db';

// Similar API to contacts
const company = createCompany({ ... });
```

### Deals

```typescript
import { createDeal, getDeal, getAllDeals, updateDeal, deleteDeal } from '@/lib/db';

// Similar API to contacts
const deal = createDeal({ ... });
```

### Tasks

```typescript
import { createTask, getTask, getAllTasks, updateTask, deleteTask } from '@/lib/db';

// Similar API to contacts
const task = createTask({ ... });
```

### Notes

```typescript
import { createNote, getNote, getAllNotes, updateNote, deleteNote } from '@/lib/db';

// Similar API to contacts
const note = createNote({ ... });
```

## Query Options

All `getAll*` functions support query options:

```typescript
interface QueryOptions {
  limit?: number; // Number of records to return
  offset?: number; // Number of records to skip
  orderBy?: string; // Column to order by (default: 'createdAt')
  orderDirection?: 'ASC' | 'DESC'; // Order direction (default: 'DESC')
}

// Example
const { data, total } = getAllContacts({
  limit: 20,
  offset: 0,
  orderBy: 'name',
  orderDirection: 'ASC',
});
```

## Utilities

```typescript
import { saveDatabase, clearDatabase } from '@/lib/db';

// Manually save database to localStorage
saveDatabase();

// Clear database and localStorage
clearDatabase();
```

## Data Persistence

The database automatically saves to localStorage after every write operation (create, update, delete). Data persists across browser sessions.

## Testing

A test utility is provided to verify database functionality:

```typescript
import { testDatabase } from '@/lib/db/test-db';

// Run all CRUD tests
await testDatabase();
```

Or use the `DatabaseTest` component in the UI:

```typescript
import { DatabaseTest } from '@/components/database-test';

function App() {
  return <DatabaseTest />;
}
```

## Schema

The database schema is defined in `src/lib/db/schema.ts`. Tables are automatically created on first initialization.

## Notes

- All array and object fields are stored as JSON strings in SQLite
- Dates are stored as ISO 8601 strings
- The database is stored in localStorage with key `sqliteDb`
- Maximum localStorage size varies by browser (typically 5-10 MB)
