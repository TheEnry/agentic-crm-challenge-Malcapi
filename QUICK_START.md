# Quick Start Guide - SQLite Database

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

Dependencies are already installed! The `sql.js` package was added automatically.

```bash
npm install  # Already done!
```

### Step 2: Initialize Database in Your App

Add this to your main App component:

```typescript
// src/App.tsx or src/main.tsx
import { useEffect } from 'react';
import { initDatabase } from '@/lib/db';

function App() {
  useEffect(() => {
    initDatabase()
      .then(() => console.log('✅ Database ready'))
      .catch(err => console.error('❌ Database error:', err));
  }, []);

  return (
    // Your app content
  );
}
```

### Step 3: Start Using the Database

```typescript
import { 
  createContact, 
  getAllContacts, 
  updateContact,
  deleteContact 
} from '@/lib/db';

// Create
const contact = createContact({
  id: crypto.randomUUID(),
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: '/media/avatars/default.png',
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Read
const { data, total } = getAllContacts({ limit: 20 });
console.log(`Found ${total} contacts`);

// Update
updateContact(contact.id, { 
  email: 'newemail@example.com' 
});

// Delete
deleteContact(contact.id);
```

## 🧪 Test the Database

### Option 1: Run Integration Test

```bash
node test-db-integration.mjs
```

### Option 2: Use UI Test Component

```typescript
import { DatabaseTest } from '@/components/database-test';

// Add to any page
<DatabaseTest />
```

### Option 3: Run Programmatic Test

```typescript
import { testDatabase } from '@/lib/db/test-db';

await testDatabase();
```

## 📚 Learn More

- **API Documentation:** `src/lib/db/README.md`
- **Integration Guide:** `src/lib/db/INTEGRATION.md`
- **Schema Diagram:** `src/lib/db/SCHEMA_DIAGRAM.md`
- **Usage Examples:** `src/lib/db/example.ts`

## 💡 Tips

1. **Always initialize first:** Call `initDatabase()` before using any CRUD functions
2. **Auto-save:** Database automatically saves to localStorage after every write
3. **Type-safe:** All functions are fully typed with TypeScript
4. **Pagination:** Use `{ limit, offset }` options for better performance
5. **Clear database:** Use `clearDatabase()` to reset all data

## �� What's Available

### CRUD Operations for All Entities

- **Contacts:** create, get, getAll, update, delete
- **Companies:** create, get, getAll, update, delete
- **Deals:** create, get, getAll, update, delete
- **Tasks:** create, get, getAll, update, delete
- **Notes:** create, get, getAll, update, delete

### Database Management

- `initDatabase()` - Initialize SQLite in browser
- `saveDatabase()` - Save to localStorage (auto-called)
- `clearDatabase()` - Clear all data

### Query Options

```typescript
interface QueryOptions {
  limit?: number;           // How many records
  offset?: number;          // Skip how many records
  orderBy?: string;         // Sort by column (default: 'createdAt')
  orderDirection?: 'ASC' | 'DESC';  // Sort direction
}
```

## ✅ You're Ready!

The database is fully configured and ready to use. Start building your CRM features!

For detailed documentation, see `TASK_1_COMPLETION_REPORT.md`.
