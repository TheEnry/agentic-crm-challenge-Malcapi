# PLAN MODE – Companies Smart Filters & Saved Views

Enter **Plan Mode**.

You must analyze the current CRM repository and produce a **technical
implementation plan** for the following feature:

## Feature Goal

Extend the Companies list page with:

- Filters by:
  - Status (multi-select: Active, Prospect, Blocked)
  - Country (single-select)
  - Free text search on company name or code
- Ability to **save the current filter configuration as a named view**
- Ability to **re-apply saved views** from a dropdown
- Persist saved views in **browser localStorage only**

## Constraints

- Browser-only implementation (no backend persistence)
- TypeScript strict
- React 19
- Tailwind CSS v4 (utility-first)
- Use existing UI primitives from `src/components/ui/*`
- Use `@` alias for imports
- Follow all rules defined in `copilot-instructions.md`

## Your Output Must Include

1. **List of impacted files**
   - Existing components to modify
   - New components, hooks or helpers to create

2. **Data models**
   - Suggested TypeScript interfaces for:
     - Filters
     - Saved views

3. **State management strategy**
   - Where filter state should live
   - How it should be propagated to the Companies list

4. **Persistence strategy**
   - How to store and retrieve saved views from localStorage

5. **Step-by-step execution plan**
   - Sequential and incremental steps
   - Each step small enough to be executed in Agent Mode

6. **Main risks or simplifications**
   - What can be safely simplified for a 2-hour workshop
   - What should explicitly be avoided

Important:
- Do **NOT** generate full code.
- Do **NOT** assume non-existing APIs or backend services.
- Focus on feasibility within a short hands-on session.
