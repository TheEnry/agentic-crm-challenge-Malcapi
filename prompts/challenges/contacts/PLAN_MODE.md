# PLAN MODE – Company Details: Contacts Tab

Enter **Plan Mode**.

You must analyze the CRM repository and produce a **technical
implementation plan** for the following feature:

## Feature Goal

Extend the Company Details page with a new **"Contacts" tab** that allows:

- Viewing a list of contacts associated with the selected company
- Adding a new contact via a form (modal or inline)
- Basic client-side validation:
  - Full name: required
  - Role: required
  - Email: required, valid format
  - Phone: required

Contacts can be stored **in memory or via a simple mock service** for the
workshop. No edit or delete is required.

## Constraints

- Browser-only implementation
- TypeScript strict
- React 19
- Tailwind CSS v4
- Use UI primitives from `src/components/ui/*`
- No real backend or database
- Follow all rules defined in `copilot-instructions.md`

## Your Output Must Include

1. **List of impacted files**
   - Company Details page and tab system
   - New components to create (table, form, modal, etc.)

2. **Contact data model**
   - Suggested TypeScript interface

3. **Contacts storage strategy**
   - How contacts will be stored per company
   - How the selected company ID will be used

4. **UI composition**
   - How the Contacts tab will be integrated
   - Which components should be split

5. **Validation approach**
   - Where validation logic should live
   - How errors should be surfaced in the UI

6. **Step-by-step execution plan**
   - Ordered, incremental steps
   - Suitable for Agent Mode execution

7. **Main risks or simplifications**
   - What can be simplified for the workshop
   - What should not be implemented due to time constraints

Important:
- Do **NOT** generate full code.
- Avoid over-engineering (no complex stores, no premature abstractions).
- Keep the solution consistent with existing project patterns.
