---
applyTo: "**"
---
---

## applyTo: '**'

# MEI em Dia - Frontend Architecture and Development Guidelines

These instructions define the frontend architecture, coding standards, UI patterns, and development practices for the MEI em Dia project.

Always inspect the existing frontend implementation before introducing new patterns, libraries, components, or architectural changes.

If a specific version of a framework or library is defined in `package.json`, always use the installed version unless an upgrade is explicitly requested.

The frontend is responsible for presentation, user interaction, client-side state, form handling, and communication with the MEI em Dia backend API.

---

# 1. Frontend Technology Stack

The frontend uses:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Radix UI
* Server Actions
* Sonner
* Lucide React
* date-fns
* Next Themes

Use the versions already installed in `package.json`.

Do not introduce another framework or UI library without a clear technical reason.

---

# 2. Frontend Project Structure

The frontend uses the Next.js App Router.

The routing structure is located inside `src/app`.

Follow the existing project structure:

```text
frontend/
└── src/
    ├── app/
    │   ├── login/
    │   ├── register/
    │   └── dashboard/
    │       ├── _components/
    │       ├── accountant/
    │       ├── mei-data/
    │       ├── monthlyHistory/
    │       ├── reports/
    │       └── settings/
    ├── actions/
    ├── components/
    ├── context/
    └── lib/
```

Do not introduce a different folder architecture without a specific reason.

---

# 3. Next.js App Router

Use the Next.js App Router and file-based routing.

Prefer Server Components by default.

Use Client Components only when client-side functionality is required.

Use:

```tsx
"use client";
```

only when necessary for:

* React state
* React effects
* Event handlers
* Browser APIs
* Context
* Client-side interactions
* Libraries that require the browser

Do not add `"use client"` unnecessarily.

---

# 4. Route-Specific Components

Before creating a component, check whether the current route has a `_components` directory.

If a component is only used by one route or feature, place it inside that route's `_components` directory.

Example:

```text
app/
└── dashboard/
    ├── _components/
    │   ├── DashboardHeader.tsx
    │   └── DashboardCard.tsx
    └── page.tsx
```

Use `_components` for route-specific components.

---

# 5. Shared Components

Use `src/components` only for components that are genuinely shared across multiple routes or features.

Examples:

```text
src/
└── components/
    ├── ui/
    ├── Header.tsx
    └── MobileSidebar.tsx
```

Before adding a component to `src/components`, verify whether it is actually reusable.

Do not move route-specific components into global components without a clear reason.

---

# 6. Separation of Concerns

Keep UI, state management, data access, and business logic separated.

React components should primarily handle:

* Rendering UI
* User interactions
* Local UI state
* Calling actions
* Displaying data
* Displaying user-friendly errors

Do not place complex business rules directly inside components.

Do not place Prisma or database logic in the frontend.

Do not implement backend business rules inside React components.

---

# 7. Backend Communication

The frontend communicates with the backend API.

Follow the existing project pattern:

```text
React Component
      ↓
Server Action
      ↓
Backend API
      ↓
Controller
      ↓
Service
      ↓
Prisma
      ↓
PostgreSQL
```

Do not bypass the backend architecture.

Do not connect directly to PostgreSQL or Prisma from the frontend.

When an existing Server Action already performs an operation, reuse it instead of creating another API implementation.

---

# 8. Server Actions

Use Server Actions according to the existing project pattern.

Server Actions may handle:

* Creating records
* Updating records
* Deleting records
* Fetching data when appropriate
* Calling backend endpoints
* Translating frontend input into API requests
* Handling API responses

Server Actions should focus on communication and orchestration.

Do not move backend business rules into Server Actions.

The backend remains responsible for authoritative business logic and data validation.

---

# 9. Forms and Validation

Follow the existing form implementation.

When the project already uses Zod for a form or API operation, reuse the existing schema whenever appropriate.

Do not duplicate validation rules unnecessarily.

Client-side validation improves user experience but does not replace backend validation.

Never assume that data is valid simply because it passed frontend validation.

The backend must always validate external input.

---

# 10. Authentication

The project uses JWT authentication through an HTTP-only cookie.

The frontend must not expose the JWT token to client-side JavaScript.

Do not store authentication tokens in:

* localStorage
* sessionStorage
* React state
* URL parameters

Follow the existing authentication flow:

```text
Login
  ↓
Backend authentication
  ↓
JWT
  ↓
HTTP-only cookie
  ↓
Authenticated request
  ↓
Backend authentication middleware
```

Do not introduce Auth.js or another authentication framework unless explicitly requested.

---

# 11. Authorization and User-Owned Data

The frontend must not assume that a user can access arbitrary resources.

When calling protected backend endpoints, use the authenticated session/cookie flow already established by the application.

Never treat a client-provided user ID as proof of ownership.

Ownership and authorization must ultimately be enforced by the backend.

The frontend should display only data returned for the authenticated user.

---

# 12. Dashboard Context

The dashboard uses the existing `DashboardContext` for shared dashboard state.

When working with monthly data, use the selected dashboard date when appropriate.

Example:

```tsx
const { selectedDate } = useContext(DashboardContext);
```

When querying monthly revenue:

```tsx
const month = selectedDate.getMonth() + 1;
const year = selectedDate.getFullYear();
```

Do not create another independent month/date state when the required state already exists in `DashboardContext`.

Do not automatically reset the selected month to the current month when navigating between dashboard pages.

The selected month should remain consistent across dashboard features.

---

# 13. Revenue Features

Revenue is a core feature of MEI em Dia.

Current revenue types are:

```text
VENDA
SERVICO
OUTROS
```

Display them using Portuguese user-facing labels:

```text
VENDA   → Venda
SERVICO → Serviço
OUTROS  → Outros
```

Use Brazilian currency formatting:

```text
R$ 1.500,00
```

Use Brazilian date formatting:

```text
dd/MM/yyyy
```

Revenue calculations should be based on data returned by the backend.

Do not hardcode revenue totals or business values in UI components.

---

# 14. Currency Input

When accepting Brazilian currency values, correctly handle inputs such as:

```text
1.500,50
250,00
99,90
```

Before sending numeric values to the backend, ensure the value is converted correctly according to the API contract.

Do not confuse:

```text
1.500,50
```

with:

```text
1.5005
```

Keep display formatting and API numeric representation separate.

---

# 15. Date Handling

Be careful when handling JavaScript `Date` objects.

Calendar dates must not unexpectedly shift because of timezone conversion.

Avoid unnecessary use of:

```tsx
date.toISOString()
```

when the value represents a calendar date rather than an exact timestamp.

When populating date inputs for editing revenue, preserve the actual date stored by the user.

For example, if the user registered:

```text
06/08/2026
```

the edit form must not display:

```text
07/08/2026
```

because of UTC conversion.

Use appropriate date handling for the API contract.

---

# 16. Loading and Error States

User interactions that communicate with the backend should provide appropriate feedback.

Handle:

* Loading
* Success
* Validation errors
* API errors
* Empty states
* Unexpected failures

Use the project's existing notification system, such as Sonner, where appropriate.

Do not silently ignore failed API requests.

Do not expose internal backend errors or stack traces directly to users.

---

# 17. Delete Operations

Destructive operations must require explicit user confirmation.

For deletion, use the existing AlertDialog pattern where appropriate.

Example flow:

```text
Delete button
      ↓
Confirmation dialog
      ↓
User confirms
      ↓
Server Action
      ↓
Backend DELETE endpoint
      ↓
UI refresh/update
```

Do not show confirmation dialogs for non-destructive operations unless there is a clear UX reason.

---

# 18. UI Components

Use shadcn/ui when an appropriate component already exists.

Use the existing Radix-based component system.

Prefer composition over large configurable components.

Reuse existing UI components instead of creating duplicate versions.

Before creating a new component, search the project for an existing implementation.

---

# 19. Styling

Use Tailwind CSS.

Prefer:

```tsx
<div className="flex items-center gap-4">
```

instead of unnecessary inline styles.

Do not introduce another CSS framework.

Maintain the existing MEI em Dia visual identity.

Keep spacing, typography, borders, cards, buttons, and colors consistent with existing screens.

---

# 20. Responsive Design

Every UI change must consider:

* Desktop
* Tablet where relevant
* Mobile

Avoid:

* Horizontal overflow
* Unnecessary nested scrolling
* Tiny touch targets
* Broken dialogs on mobile
* Desktop-only layouts

Preserve the existing responsive sidebar behavior.

Do not optimize a feature exclusively for desktop.

---

# 21. Component Design

Prefer functional components.

Keep components small and focused.

Avoid large monolithic components.

When a component becomes difficult to understand, consider extracting:

* Smaller components
* Custom hooks
* Utility functions
* Server Actions

Do not extract code unnecessarily when doing so makes the project harder to understand.

---

# 22. React State

Use local state when state is only required by one component.

Use `DashboardContext` for dashboard-wide state that already belongs there.

Do not introduce a global state-management library unless explicitly requested.

Avoid duplicating state that can be derived from existing state or backend data.

---

# 23. Custom Hooks

Create custom hooks only when they provide meaningful reuse or encapsulate complex client-side behavior.

Use the `use` prefix:

```tsx
useAuth
useDashboard
useRevenue
```

Do not create hooks simply to move a few lines of code into another file.

---

# 24. TypeScript

Use TypeScript throughout the frontend.

Prefer explicit and meaningful types.

Avoid:

```tsx
any
```

unless there is a strong technical reason.

Define types for:

* Component props
* Form data
* API responses
* Complex state
* Reusable data structures

Prefer type inference when TypeScript can safely infer the type.

---

# 25. Naming Conventions

Use descriptive names.

Prefer:

```tsx
userId
revenueAmount
selectedDate
```

instead of:

```tsx
uid
amt
d
```

Event handlers should use `handle`:

```tsx
handleClick
handleSubmit
handleDelete
handleChange
```

Boolean variables should use descriptive prefixes:

```tsx
isLoading
isAuthenticated
hasError
canSubmit
```

Do not rename existing components or variables unrelated to the task.

---

# 26. Code Reuse

Before creating a new component, hook, action, or utility:

1. Search the existing project.
2. Check for similar functionality.
3. Reuse existing implementations when appropriate.
4. Extend existing functionality when possible.
5. Create a new abstraction only when it provides a clear benefit.

Avoid duplicate implementations.

---

# 27. File Modification Guidelines

When modifying existing frontend code:

* Make the smallest change necessary.
* Preserve unrelated functionality.
* Do not rewrite entire files unnecessarily.
* Do not rename unrelated variables.
* Do not rename existing components without a reason.
* Check imports after moving or renaming files.
* Do not perform unrelated refactoring.

Feature work should remain focused.

---

# 28. Dependencies

Before adding a dependency:

1. Check whether the project already provides the functionality.
2. Check existing dependencies.
3. Determine whether the dependency is actually necessary.
4. Prefer existing project tools.

Do not add a dependency for simple functionality.

Do not upgrade major dependencies unless explicitly requested.

---

# 29. Performance

Prefer Server Components when possible.

Avoid unnecessary client-side JavaScript.

Avoid unnecessary API requests.

Avoid unnecessary re-renders.

Do not introduce premature optimization.

Optimize measurable problems or clear performance bottlenecks.

---

# 30. Security

Frontend code must follow secure practices.

Never:

* Expose JWT tokens
* Expose environment secrets
* Hardcode credentials
* Trust client-side authorization
* Bypass backend authentication
* Assume frontend validation is sufficient
* Expose internal API errors unnecessarily

Remember that frontend security controls are not authoritative.

The backend must enforce authentication, authorization, validation, and data ownership.

---

# 31. Development Workflow

When implementing a frontend feature:

1. Understand the existing frontend architecture.
2. Search for similar components or actions.
3. Identify whether the feature is route-specific or shared.
4. Check whether a `_components` directory exists.
5. Reuse existing UI components.
6. Reuse existing Server Actions where possible.
7. Implement the smallest complete change.
8. Respect the existing `DashboardContext` when working with dashboard state.
9. Check TypeScript errors.
10. Check affected API contracts.
11. Check desktop and mobile behavior.
12. Verify that existing functionality still works.

---

# 32. Frontend/Backend Contract

The frontend and backend are separate applications but form a single system.

When changing an API request or response:

* Check the backend endpoint.
* Check the controller/service behavior.
* Check validation requirements.
* Check all frontend consumers.
* Keep request and response types synchronized.

Do not change the frontend API contract based on assumptions.

If an API contract must change, update both sides deliberately.

---

# 33. Existing Architecture Has Priority

Do not introduce a new architectural pattern simply because it is common in another project.

Before introducing:

* A new state-management library
* A new data-fetching library
* A new authentication system
* A new form library
* A new UI framework
* A new folder architecture

check whether MEI em Dia already has an established solution.

The goal is to keep the frontend:

* Consistent
* Maintainable
* Secure
* Simple
* Type-safe
* Responsive
* Easy to understand

---

# 34. Rule Improvement

If a recurring frontend pattern appears across the project, consider whether it should become:

* A reusable component
* A custom hook
* A utility
* A Server Action
* A development rule

Before creating a new rule, verify that the pattern is actually established in the codebase.

Follow `rules.instructions.md` and `self-improvement.instructions.md` when they exist in the project.
