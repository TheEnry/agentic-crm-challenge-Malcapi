# GitHub Copilot Instructions – agentic-crm-challenge

Purpose: Practical and controlled use of GitHub Copilot (Chat, Plan Mode,
Agent Mode) within this React + TypeScript + Vite CRM codebase.

This document defines:
- how Copilot must be used,
- how Plan Mode and Agent Mode are applied,
- which repo conventions must be respected at all times.

---------------------------------------------------------------------

## 1. Setup

- Install extensions:
  - GitHub Copilot
  - GitHub Copilot Chat
- Sign in with GitHub and ensure organization policy allows Copilot.
- VS Code settings:
  - Enable inline suggestions and Chat access to workspace.
  - Allow multi-line completions.
  - Enable format on save.
- Formatting & linting:
  - ESLint enabled.
  - Prettier enabled.
- Policies:
  - Follow Microsoft content policies.
  - Do NOT generate secrets, tokens.

---------------------------------------------------------------------

## 2. Repo Conventions (must be referenced in prompts)

- Language: TypeScript strict.
- Framework: React 19.
- Build tool: Vite.
- Styling: Tailwind CSS v4 (utility-first).
- Imports:
  - Use path alias `@/*` → `src/*`
  - Example:
    `import { x } from '@/lib/utils'`
- ESLint:
  - `rules-of-hooks`
  - `exhaustive-deps`
- Components:
  - Prefer `src/components/ui/*` primitives before creating new ones.
- Data:
  - Browser-only.
  - Use mock data in `src/crm/mock/*`
  - SQLite via `sql.js`.
- Shared logic:
  - Hooks: `src/hooks/*`
  - Utils: `src/lib/*` (pure, typed)

---------------------------------------------------------------------

## 3. Core Working Modes

### 3.1 Plan Mode – Reasoning & Architecture

Plan Mode is used to:
- analyze the existing codebase,
- identify impacted components,
- propose a structured implementation plan,
- highlight risks and dependencies.

Plan Mode MUST:
- include file-level impact,
- avoid generating full code,
- stay within browser-only constraints.

Example prompt:

"Analyze this CRM repository.
I need to implement [USE CASE].
Enter Plan Mode and produce a step-by-step technical implementation plan.
List impacted files, new components, state changes and risks."

The generated plan MUST be reviewed and simplified by the developer before
moving to Agent Mode.

---

### 3.2 Agent Mode – Controlled Execution

Agent Mode is used to:
- implement approved plan steps,
- create or modify files,
- generate functions, hooks and components.

Rules:
- One logical step at a time.
- Developer must approve or reject each proposal.
- Large autonomous rewrites are forbidden.

Example prompt:

"Switch to Agent Mode.
Implement step 1 and 2 of the approved plan.
Follow project conventions, TypeScript strict and Tailwind v4."

---

### 3.3 Refinement Mode

After implementation:
- Use Agent Mode for:
  - refactoring,
  - UX polish,
  - validation improvements,
  - minor test generation.

Example:

"Refactor this implementation for readability and consistency with project
conventions. Do not change behavior."

---------------------------------------------------------------------

## 4. Prompting Best Practices

- Always provide:
  - goal,
  - constraints,
  - file paths,
  - types.
- Always reference:
  - Tailwind v4
  - React 19
  - TypeScript strict
  - `@` import alias
- Ask for:
  - minimal diffs,
  - list of modified files,
  - explanation of assumptions.
- Prefer composition using existing UI primitives.
- After generation:
  - ask Copilot to propose validation and test steps.

---------------------------------------------------------------------

## 5. Common Tasks & Locations

- Feature pages: `src/crm/pages/*`
- Shared UI: `src/components/ui/*`
- Hooks: `src/hooks/*`
- Utilities: `src/lib/*`
- Mock data: `src/crm/mock/*`

---------------------------------------------------------------------

## 6. Safety & Quality Rules

- No secrets or API keys in code.
- Browser-only execution.
- Always run:
  - `npm run lint`
- Copilot can be used for:
  - self code review,
  - ESLint error explanation,
  - refactoring suggestions.

Example review prompt:

"Review this diff against repo conventions.
Check hooks rules, imports, Tailwind usage and state handling."

---------------------------------------------------------------------

## 7. Developer Responsibilities

Even with Agent Mode active:

- Developers remain fully responsible for:
  - correctness,
  - security,
  - maintainability.
- AI suggestions must always be:
  - understood,
  - validated,
  - adapted.
- Blind copy–paste is forbidden.
- If AI proposes non-existing APIs or libraries:
  - reject or explicitly add them.

---------------------------------------------------------------------

## 8. Workshop Operational Flow

1. Open repository and run the CRM UI.
2. Activate Plan Mode and generate an implementation plan.
3. Validate and simplify the plan.
4. Activate Agent Mode and implement step by step.
5. Refine, test and polish.
6. Demo the feature.

---------------------------------------------------------------------

End of Instructions.
