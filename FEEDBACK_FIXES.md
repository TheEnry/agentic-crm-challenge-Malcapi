# Feedback Fixes - Contact CRUD Operations

## Issues Addressed

### Issue 1: Company Field Showing ID Instead of Name
**Problem:** When adding or editing a contact, the company column displayed a number (contact ID) instead of the company name with logo.

**Root Cause:** The company combobox was saving `company.value` (which was the contact ID) instead of `company.label` (the company name).

**Fix Applied:**
- Updated `new-contact-sheet.tsx` to save `company.label` instead of `company.value`
- Also saves the company logo when a company is selected: `form.setValue('logo', company.logo)`
- Updated the combobox trigger to compare by `label` instead of `value` for correct display

**Files Changed:**
- `src/crm/pages/contacts/new-contact-sheet.tsx`

**Code Changes:**
```typescript
// Before:
onSelect={() => field.onChange(company.value)}

// After:
onSelect={() => {
  field.onChange(company.label);
  form.setValue('logo', company.logo);
}}
```

### Issue 2: Delete Button Location
**Problem:** User requested the delete functionality to be moved from the contact list Actions column to the Edit modal.

**Solution:**
1. Removed Delete button from the Actions column in contact list
2. Added Delete button to the Edit Contact modal footer
3. Kept the same confirmation dialog for safety

**Files Changed:**
- `src/crm/pages/contacts/contact-list.tsx` - Removed Delete button from Actions column
- `src/crm/pages/contacts/edit-contact-sheet.tsx` - Added Delete button to modal footer

**UI Changes:**
- Actions column now only shows "Edit" button (width reduced from 120 to 80)
- Edit modal footer now has three buttons:
  - Left: "Delete Contact" (destructive styling)
  - Right: "Cancel" and "Save Changes"

**Code Changes:**
```typescript
// Edit Contact Sheet Footer (edit-contact-sheet.tsx)
<SheetFooter className="flex items-center justify-between border-t py-3.5 px-5 border-border">
  <Button 
    variant="outline" 
    onClick={handleDelete}
    className="text-destructive hover:text-destructive"
  >
    Delete Contact
  </Button>
  <div className="flex items-center gap-2">
    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
    <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
  </div>
</SheetFooter>
```

## Testing

**Validation Performed:**
- ✅ ESLint: 0 errors, 0 warnings
- ✅ TypeScript compilation: Successful
- ✅ Vite build: Successful
- ✅ Removed unused `handleDeleteContact` and `removeContact` from contact-list.tsx

## User Experience Improvements

### Company Field
- Now correctly displays company name in the contact list
- Shows company logo alongside the name
- Consistent display between form selection and table view

### Delete Functionality
- More intuitive placement in Edit modal
- Keeps destructive action grouped with other contact modifications
- Maintains confirmation dialog for safety
- Cleaner contact list table with fewer action buttons

## Commit Information

**Commit Hash:** f42127e
**Commit Message:** Fix company field to show name instead of ID and move delete to edit modal

**Files Modified:**
1. `src/crm/pages/contacts/new-contact-sheet.tsx` - Company field fix
2. `src/crm/pages/contacts/contact-list.tsx` - Remove delete button from Actions
3. `src/crm/pages/contacts/edit-contact-sheet.tsx` - Add delete button to modal

**Statistics:**
- Lines added: 51
- Lines removed: 43
- Net change: +8 lines

## Summary

Both issues have been successfully resolved:
1. Company field now correctly displays the company name with logo
2. Delete button has been moved to a more logical location in the Edit modal

The changes maintain all existing functionality while improving the user experience based on the feedback provided.
