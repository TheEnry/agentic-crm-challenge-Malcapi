# PLAN MODE – Companies CSV Import with Preview & Validation

Enter **Plan Mode**.

You must analyze the CRM repository and produce a **technical
implementation plan** for the following feature:

## Feature Goal

Add a **CSV import capability** to the Companies list page that allows:

- Uploading a CSV file from the browser
- Parsing company records client-side
- Validating each row with basic rules
- Displaying a **preview table** of parsed rows
- Highlighting rows with validation errors
- (Optional) Confirming the import to append valid rows to the in-memory
  Companies list

Assume a simple CSV format with headers:

`name,code,status,country`

## Constraints

- Browser-only parsing (no backend)
- TypeScript strict
- React 19
- Tailwind CSS v4
- No external heavy CSV libraries unless strictly necessary
- Use mock/in-memory Companies list
- Follow all rules defined in `copilot-instructions.md`

## Your Output Must Include

1. **List of impacted files**
   - Companies list page
   - New modal or import components
   - Helper utilities

2. **Imported row data model**
   - Suggested TypeScript interface for an imported row
   - Representation of validation errors

3. **Parsing strategy**
   - How raw CSV text will be read (FileReader)
   - How rows and headers will be parsed

4. **Validation rules**
   - Required fields
   - Allowed status values
   - How errors will be attached to rows

5. **Preview rendering strategy**
   - How valid vs invalid rows will be displayed
   - How errors will be shown in the UI

6. **Import confirmation strategy (optional)**
   - How valid rows will be mapped to Company objects
   - How they will be appended to the current list

7. **Step-by-step execution plan**
   - Sequential steps suitable for Agent Mode
   - Each step small and verifiable

8. **Main risks or simplifications**
   - What can be simplified for a 2-hour workshop
   - What must explicitly be avoided

Important:
- Do **NOT** generate full code.
- Do **NOT** assume any server-side API.
- Focus on clarity, correctness and workshop feasibility.
