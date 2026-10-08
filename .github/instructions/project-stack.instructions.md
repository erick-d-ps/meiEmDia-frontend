---
applyTo: "**"
---

# Project Stack and Dependency Guidelines

Official stack for the `mei-em-dia` frontend, based on `package.json` and real codebase usage (September 2026).

Use these versions and practices when generating, editing, or reviewing code. Do not introduce alternative libraries for the same purpose without a clear need.

## Core runtime

| Package | Version | Role |
| --- | --- | --- |
| `next` | `16.2.9` | Framework (App Router) |
| `react` | `19.2.4` | UI |
| `react-dom` | `19.2.4` | React rendering |
| `typescript` | `^5` | Static typing |

### Next.js 16 + App Router

- Prefer the App Router under `src/app/`.
- Use Server Components by default; add `"use client"` only for browser state, effects, event handlers, or client hooks.
- Keep mutation logic and authenticated API integration in Server Actions under `src/actions/`.
- Navigation and redirects: `next/navigation` (`redirect`, `useRouter`, `usePathname`).
- Server cookies/headers: `next/headers`.
- Fonts: `next/font` (e.g. Geist in the root layout).
- Do not assume `middleware.ts` — dashboard route protection is currently server-side in the layout.
- Keep `next.config.ts` typed with `NextConfig`.

### React 19

- Compatible with Next 16 Server Components and Server Actions.
- Prefer simple composition; avoid legacy class components.
- In client components, prefer modern hooks and minimal local state.
- Do not add client-side data-fetching libraries (React Query, SWR, etc.) without an explicit decision — the current flow is Server Actions + server-side fetch.

### TypeScript 5

- `strict: true` is enabled — keep strict typing.
- Import alias: `@/*` → `./src/*`.
- Prefer `type` for props/DTOs unless an extensible `interface` is needed.
- Avoid `any`; use unions and types from `src/lib/types.ts` when available.
- `jsx: react-jsx`, `moduleResolution: bundler` — do not change without a strong reason.

## Styling and design system

| Package | Version | Role |
| --- | --- | --- |
| `tailwindcss` | `^4` | Utility-first CSS |
| `@tailwindcss/postcss` | `^4` | Tailwind 4 PostCSS plugin |
| `tw-animate-css` | `^1.4.0` | Utility CSS animations |
| `shadcn` | `^4.11.0` | shadcn CLI/tooling and styles |
| `radix-ui` | `^1.6.0` | UI primitives (most components) |
| `@base-ui/react` | `^1.5.0` | Primitive used by combobox |
| `class-variance-authority` | `^0.7.1` | Component variants |
| `clsx` | `^2.1.1` | Conditional class composition |
| `tailwind-merge` | `^3.6.0` | Smart Tailwind class merging |
| `cn` | `^0.2.6` | **Legacy/redundant dependency — avoid** |
| `lucide-react` | `^1.18.0` | Icons |
| `next-themes` | `^0.4.6` | Light/dark theme (partially integrated) |

### Tailwind CSS 4

- Configure via CSS (`@import "tailwindcss"`) and tokens in `@theme` inside `src/app/globals.css`.
- PostCSS uses only `@tailwindcss/postcss` — do not reintroduce a Tailwind v3-style `tailwind.config.js` unless necessary.
- Product colors and tokens belong in `@theme` / CSS variables, not scattered hard-coded values.
- Also import `tw-animate-css` and `shadcn/tailwind.css` as in the current globals file.
- Prefer project design-system utilities and tokens (`primary`, `surface`, `text-muted`, etc.).

### shadcn/ui + Radix + Base UI

- Configured in `components.json`: `style: "radix-nova"`, `rsc: true`, `tsx: true`, `iconLibrary: "lucide"`, CSS variables enabled.
- UI components live in `src/components/ui/`.
- Primitive import pattern:
  - Most components: `import { ... } from "radix-ui"` (unified package).
  - Combobox: `import { ... } from "@base-ui/react"`.
- Do not mix in another component library (MUI, Chakra, Ant Design, etc.).
- When adding a shadcn component, keep these aliases:

```text
components → @/components
utils      → @/lib/utils
ui         → @/components/ui
lib        → @/lib
hooks      → @/hooks
```

### Variants and classes

- Always compose classes with `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).
- Component variants use `cva` (`class-variance-authority`).

```typescript
// Good
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Avoid
import { cn } from "cn" // redundant npm package; not the project utility
```

Note: there is a known incorrect import in `src/components/ui/alert-dialog.tsx` using `from "cn"`. In new code, or when touching that file, fix it to `@/lib/utils`. Consider removing the `cn` dependency from `package.json` once there are no remaining usages.

### Icons

- Use only `lucide-react`.
- Prefer named icon imports for tree-shaking.
- Size icons with Tailwind classes (`size-4`, etc.), consistent with UI components.

### Themes (`next-themes`)

- Package is installed; `src/components/ui/sonner.tsx` uses `useTheme`.
- The current root layout imports `Toaster` directly from `sonner`, without a configured `ThemeProvider`.
- If enabling real dark mode:
  1. Wrap the app with `ThemeProvider` from `next-themes`.
  2. Prefer the `Toaster` from `@/components/ui/sonner`.
  3. Keep `suppressHydrationWarning` on `<html>` when needed.
- Do not add another theme library.

## UX, dates, and feedback

| Package | Version | Role |
| --- | --- | --- |
| `sonner` | `^2.0.7` | Toasts |
| `date-fns` | `^4.4.0` | Dates/locale |
| `react-day-picker` | `^10.0.1` | Calendar |

### Sonner

- Success/error feedback in forms and dialogs: `toast` from `sonner`.
- Keep a single `Toaster` in the layout.
- Prefer short user-facing messages in pt-BR (product locale).

### Dates

- Formatting, parsing, and locale with `date-fns` (including `pt-BR` when applicable).
- Day calendar UI: `react-day-picker` v10 (already wrapped in `src/components/ui/calendar.tsx`).
- Do not add `moment`, `dayjs`, or `luxon` in parallel.

```typescript
// Good
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
```

## Development tooling

| Package | Version | Role |
| --- | --- | --- |
| `@types/node` | `^20` | Node types |
| `@types/react` | `^19` | React types |
| `@types/react-dom` | `^19` | React DOM types |

Official scripts:

```bash
npm run dev    # next dev
npm run build  # next build
npm run start  # next start
```

- ESLint/Prettier/Vitest/Playwright are not declared in the current `package.json` — do not assume those tools until they are added explicitly.
- When proposing tests or linting, align on a stack decision before installing multiple tools.

## Expected architecture for this stack

```text
src/app/           # App Router routes (RSC by default)
src/actions/       # Server Actions (auth, mei, accountant, revenues)
src/components/    # product UI + forms + dashboard
src/components/ui/ # shadcn/radix/base-ui primitives
src/context/       # shared client state (e.g. selected month)
src/lib/           # api, auth, types, utils (cn)
```

### Layer best practices

1. **Pages (`src/app`)**  
   - Fetch data on the server when possible.  
   - Delegate mutations to Server Actions.  
   - Keep pages thin; put complex UI in components.

2. **Server Actions (`src/actions`)**  
   - Validate input on the server.  
   - Use the project's existing HTTP-only cookie approach.  
   - Return serializable form states (`success`, `error`, data).  
   - Do not expose secrets to the client.

3. **Components**  
   - `ui/`: reusable primitives, no business rules.  
   - `form/` and `dashboard/`: product composition.  
   - Client components only at the interactive edge.

4. **Styling**  
   - Tokens in the CSS theme.  
   - `cn` + `cva` for variants.  
   - Avoid introducing CSS modules/styled-components without a strong reason.

## Do not add without alignment

- Another CSS framework (Bootstrap, full MUI system styling, etc.).
- Heavy global state managers (Redux, Zustand, Jotai) while shared state still fits local React Context.
- Extra HTTP clients if `src/lib/api.ts` + Server Actions are enough.
- Duplicate class utilities (`cn` npm package vs `@/lib/utils`).
- Competing date/icon/toast libraries.

## Quick checklist for new code

- [ ] Next 16 App Router + RSC by default
- [ ] React 19 without unnecessary legacy APIs
- [ ] Strict TypeScript with `@/` imports
- [ ] UI via `src/components/ui` (Radix/shadcn/Base UI)
- [ ] Icons with `lucide-react`
- [ ] Classes with `cn` from `@/lib/utils`
- [ ] Variants with `cva`
- [ ] Dates with `date-fns` / calendar with `react-day-picker`
- [ ] Toasts with `sonner`
- [ ] Mutations in Server Actions
- [ ] No redundant or parallel dependencies outside this stack

## Internal references

- Dependencies and scripts: `package.json`
- Tokens and global CSS: `src/app/globals.css`
- shadcn config: `components.json`
- Functional app context: `FRONTEND_CONTEXT.md`
- Class utility: `src/lib/utils.ts`
