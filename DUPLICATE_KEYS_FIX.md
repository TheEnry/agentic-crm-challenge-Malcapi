# Duplicate Keys Warning Fix

## Issue

When opening the companies dropdown in the "New Contact" form, React was throwing multiple warnings about duplicate keys:

```
Encountered two children with the same key, `7`. Keys should be unique...
Encountered two children with the same key, `8`. Keys should be unique...
Encountered two children with the same key, `5`. Keys should be unique...
```

## Root Cause

The companies dropdown was being populated by mapping over all contacts:

```typescript
// Before (INCORRECT):
const companies = mockContacts.map((contact) => ({
  value: contact.id,
  label: contact.company,
  logo: contact.logo as string,
}));
```

**Problem:** Multiple contacts can work for the same company (e.g., "Acme Corp"). When creating the companies list, each contact would create an entry, leading to:
- Duplicate company names in the dropdown
- Duplicate keys (contact IDs 5, 6, 7, 8, etc. appearing multiple times)
- React warnings about non-unique keys

## Solution

Deduplicate the companies list based on company name using a Map:

```typescript
// After (CORRECT):
const companies = Array.from(
  new Map(
    mockContacts
      .filter((contact) => contact.company) // Filter out contacts without company
      .map((contact) => [
        contact.company, // Use company name as key for uniqueness
        {
          value: contact.company as string,
          label: contact.company as string,
          logo: contact.logo as string,
        },
      ])
  ).values()
);
```

### How It Works

1. **Filter:** Remove contacts without a company name
2. **Map to [key, value] pairs:** Use company name as the Map key
3. **Map deduplication:** The Map automatically keeps only one entry per unique company name (the last one encountered)
4. **Convert back to array:** Extract the values from the Map

### Benefits

- Each company appears only once in the dropdown
- No duplicate keys = no React warnings
- Cleaner user experience (no duplicate company names)
- Uses the company name as both the key and value (consistent data model)

## Files Changed

- `src/crm/pages/contacts/new-contact-sheet.tsx`

## Testing

**Validation Performed:**
- ✅ ESLint: 0 errors, 0 warnings
- ✅ TypeScript compilation: Successful
- ✅ Vite build: Successful
- ✅ No React warnings about duplicate keys

## Impact

Users can now open the companies dropdown without seeing console warnings. The dropdown shows each company only once, making selection cleaner and more intuitive.

## Commit Information

**Commit Hash:** 9bb454f
**Commit Message:** Fix duplicate key warning by deduplicating companies list

**Statistics:**
- Lines added: 15
- Lines removed: 5
- Net change: +10 lines

## Example

Before: If 3 contacts worked at "TechCorp", the dropdown would show "TechCorp" 3 times with keys "1", "2", "3"

After: The dropdown shows "TechCorp" only once with key "TechCorp"

This is the correct behavior for a company selector.
