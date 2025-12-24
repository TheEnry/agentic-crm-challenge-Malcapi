# Database Integration Guide

This guide explains how to integrate the SQLite database into your CRM application.

## Quick Start

### 1. Initialize Database on App Startup

Add database initialization to your main App component:

```typescript
// src/App.tsx or src/main.tsx
import { useEffect } from 'react';
import { initDatabase } from '@/lib/db';

function App() {
  useEffect(() => {
    async function init() {
      try {
        await initDatabase();
        console.log('Database initialized');
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    }
    
    init();
  }, []);

  return (
    // your app content
  );
}
```

### 2. Create a Database Hook

Create a custom hook for easier database access:

```typescript
// src/hooks/use-database.ts
import { useEffect, useState } from 'react';
import { initDatabase, getAllContacts } from '@/lib/db';
import type { Contact } from '@/crm/types/contact';
import type { QueryOptions } from '@/lib/db';

export function useContacts(options?: QueryOptions) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContacts() {
      try {
        await initDatabase();
        const result = getAllContacts(options);
        setContacts(result.data);
        setTotal(result.total);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadContacts();
  }, [options]);

  return { contacts, total, loading, error };
}
```

### 3. Use in Components

```typescript
// src/crm/pages/contacts/contact-list.tsx
import { useContacts } from '@/hooks/use-database';

export function ContactList() {
  const { contacts, total, loading, error } = useContacts({ limit: 20 });

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Contacts ({total})</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Migration from Mock Data

If you're currently using mock data from `src/crm/mock/*`, here's how to migrate:

### 1. Import Mock Data into Database

```typescript
// src/lib/db/seed.ts
import { initDatabase, createContact, createCompany, createDeal } from '@/lib/db';
import { mockContacts } from '@/crm/mock/contacts';
import { mockCompanies } from '@/crm/mock/companies';
import { mockDeals } from '@/crm/mock/deals';

export async function seedDatabase() {
  await initDatabase();

  // Import contacts
  mockContacts.forEach(contact => {
    createContact(contact);
  });

  // Import companies
  mockCompanies.forEach(company => {
    createCompany(company);
  });

  // Import deals
  mockDeals.forEach(deal => {
    createDeal(deal);
  });

  console.log('Database seeded successfully');
}
```

### 2. Run Seed Once

```typescript
// In your App.tsx
import { seedDatabase } from '@/lib/db/seed';

useEffect(() => {
  async function init() {
    await initDatabase();
    
    // Only seed if database is empty
    const { total } = getAllContacts();
    if (total === 0) {
      await seedDatabase();
    }
  }
  
  init();
}, []);
```

### 3. Replace Mock Imports

Replace all mock data imports with database calls:

```typescript
// Before
import { mockContacts } from '@/crm/mock/contacts';

// After
import { getAllContacts } from '@/lib/db';
const { data: contacts } = getAllContacts();
```

## Best Practices

### 1. Always Initialize First

```typescript
// ❌ Bad
const contact = getContact('123'); // Database not initialized

// ✅ Good
await initDatabase();
const contact = getContact('123');
```

### 2. Handle Errors

```typescript
try {
  await initDatabase();
  const contact = createContact(newContact);
} catch (error) {
  console.error('Database error:', error);
  // Show user-friendly error message
}
```

### 3. Use Pagination

```typescript
// ❌ Bad - loads all records
const { data } = getAllContacts();

// ✅ Good - paginated
const { data } = getAllContacts({ 
  limit: 20, 
  offset: page * 20 
});
```

### 4. Automatic Save

The database automatically saves after every write operation:

```typescript
createContact(contact); // ✅ Auto-saved to localStorage
updateContact(id, updates); // ✅ Auto-saved to localStorage
deleteContact(id); // ✅ Auto-saved to localStorage
```

### 5. Manual Save (Optional)

```typescript
import { saveDatabase } from '@/lib/db';

// Force save (usually not needed)
saveDatabase();
```

## Testing

### UI Testing

Use the provided test component:

```typescript
import { DatabaseTest } from '@/components/database-test';

// Add to your dev/debug page
<DatabaseTest />
```

### Programmatic Testing

```typescript
import { testDatabase } from '@/lib/db/test-db';

// Run all CRUD tests
await testDatabase();
```

## Performance Tips

### 1. Use Indexes (Future Enhancement)

While the current implementation doesn't use indexes, you can add them to the schema:

```sql
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
```

### 2. Batch Operations

For multiple inserts, consider batching:

```typescript
// Instead of
contacts.forEach(c => createContact(c));

// Use transactions (future enhancement)
// db.run('BEGIN TRANSACTION');
// contacts.forEach(c => createContact(c));
// db.run('COMMIT');
```

### 3. LocalStorage Limits

- Maximum size: 5-10 MB (browser-dependent)
- Monitor storage usage
- Implement data cleanup/archiving for large datasets

## Troubleshooting

### Database Not Initializing

```typescript
// Check browser console for errors
await initDatabase(); // Look for sql.js loading errors
```

### WASM File Not Loading

Ensure `/public/sql-wasm/sql-wasm.wasm` exists and is served correctly.

### LocalStorage Full

```typescript
import { clearDatabase } from '@/lib/db';

// Clear and reinitialize
clearDatabase();
await initDatabase();
```

### Data Persistence Issues

Check if localStorage is enabled in the browser:

```typescript
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('LocalStorage is available');
} catch (e) {
  console.error('LocalStorage is not available');
}
```

## Next Steps

1. ✅ Database is set up and ready
2. Create custom hooks for each entity type
3. Migrate mock data to database
4. Update components to use database instead of mocks
5. Add data validation and error handling
6. Implement search and filtering
7. Add database migrations for schema changes
8. Consider IndexedDB for larger datasets (future)

## API Reference

See [README.md](./README.md) for complete API documentation.
