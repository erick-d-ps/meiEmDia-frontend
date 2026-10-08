---
name: Fiscal Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7b6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2d'
  primary: '#006b2c'
  on-primary: '#ffffff'
  primary-container: '#00873a'
  on-primary-container: '#f7fff2'
  inverse-primary: '#62df7d'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#8d4b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#b15f00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ffc97'
  primary-fixed-dim: '#62df7d'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for microentrepreneurs (MEIs) navigating daily financial compliance and tax health. The brand personality is encouraging, dependable, frictionless, and reassuringly structured. For self-employed workers and micro-business owners, managing tax deadlines like DAS (Documento de Arrecadação do Simples Nacional) and tracking annual revenue limits often generates friction and anxiety. The visual interface replaces that anxiety with calm transparency, crisp numbers, and immediate feedback.

The aesthetic blends **Modern Corporate** with **Clean Nordic SaaS**:
- **Purity and Air:** A crisp canvas with off-white and cool ice-gray backdrops (`#F8FAFC`), giving precedence to metrics and cards.
- **Affirmative Fiscal Signals:** Deep, vibrant emerald green acts as the core driver for primary calls-to-action, success badges, and on-schedule status flags.
- **Friendly Guardrails:** Gentle warm amber and soft saffron tones signal upcoming deadlines (such as the monthly 20th DAS due date) and ceiling warning limits without inducing panic.
- **Modular Card Architecture:** All units of data live within clean white containers framed by delicate 1px borders, subtle soft-corner geometry, and lightweight internal padding.

## Colors

The color palette centers on fiscal integrity, clarity, and rapid visual scanning:

- **Primary (`#16A34A`):** The operational core. Used for main action buttons ("+ Adicionar Receita"), affirmative status tags ("Em dia"), progress completions, and primary brand accents. Supported by `#DCFCE7` (primary-container) for gentle active states, subtle banner tints, and badge backgrounds.
- **Secondary (`#0284C7`):** Professional information blue, reserved for secondary operational chips, informational tips ("Dica rápida"), and auxiliary interactive links.
- **Tertiary / Warning (`#D97706`):** Amber accent dedicated to fiscal reminders, DAS maturity notifications (e.g., "Dia 20 se aproxima"), and approaching annual revenue thresholds. Supported by `#FEF3C7` (tertiary-container) and `#78350F` for accessible contrast text.
- **Surface Hierarchy:**
  - `background`: `#F8FAFC` (pale slate ice, creating subtle depth against pure white).
  - `surface`: `#FFFFFF` (pure white for all cards, panels, inputs, and modals).
  - `surface-variant`: `#F1F5F9` (neutral hover and divider fills).
- **Outlines & Dividers:**
  - `outline`: `#E2E8F0` (ultra-soft borders defining card perimeters without visual noise).
  - `outline-variant`: `#CBD5E1` (active input focus rings and toggle states).
- **Text & Contrast:**
  - `text-primary`: `#0F172A` (deep slate navy for headline hierarchy and primary metrics).
  - `text-secondary`: `#64748B` (neutral slate for metadata, axis marks, and secondary labels).
  - `text-tertiary`: `#94A3B8` (placeholders and inactive icons).

## Typography

The typography leverages **Plus Jakarta Sans** across all hierarchies. Its clean geometric build, rounded terminals, and spacious counter forms make financial figures instantly legible on both mobile viewports and desktop monitors.

- **Financial Numerals:** Monetary values (e.g., `R$ 2.950,23`, `R$ 81.000,00`) utilize `metric-display` or `headline-xl` with bold weight (`700`) and slight negative tracking (`-0.03em`), providing confident, anchor-point presence on dashboard cards.
- **Table & Row Scannability:** Data labels, column headers, and secondary timestamps leverage `label-md` and `body-sm` in slate tones (`#64748B`) to create a clear reading contrast against bold numeric data.
- **Hierarchy Rules:** Never use decorative serif typefaces in administrative flows. Maintain rigid vertical rhythm where headings strictly align to 4px multiples.

## Layout & Spacing

The layout is built around a flexible grid architecture designed for dashboards and operational portals:

- **Desktop (1024px+):** Fixed lateral navigation bar (240px wide) coupled with an adaptive 12-column content grid. Gutters are fixed at `1.5rem` (24px) with outer canvas margin set to `2rem` (32px). Cards span contextual subdivisions (e.g., 8-columns for chart history, 4-columns for quick stats, 4-columns for metric trios).
- **Tablet (768px - 1023px):** 8-column layout. Sidebar collapses into an expandable rail or header bar. Gutters tighten to `1.25rem` (20px).
- **Mobile (< 768px):** Single-column stacked flow. Outer canvas margin drops to `1rem` (16px), and card elements condense padding internally to `1rem`. Action buttons span full container width for tactile thumb accessibility.
- **Vertical Rhythm:** A strict 4px / 8px baseline rhythm dictates spacing between sub-elements:
  - `space-xs` (4px): Gap between icon and label, or metric label and value descriptor.
  - `space-sm` (8px): Distance between metric title and numerical value.
  - `space-md` (16px): Standard internal card padding and stack gaps.
  - `space-lg` (24px): Inter-card margins and sectional block separators.

## Elevation & Depth

Visual depth is achieved through **low-contrast outlines combined with ambient, diffused micro-shadows**, ensuring a flat, ultra-clean software feel that avoids heavy drop shadows:

- **Surface Level 0 (Canvas):** `#F8FAFC`. Completely flat base with zero elevation.
- **Surface Level 1 (Default Containers & Cards):** Pure white background (`#FFFFFF`) with a 1px solid border (`#E2E8F0`) and a soft ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Surface Level 2 (Hovered Cards & Interactive Rows):** Subtle elevation increase: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)` with border shifting to `#CBD5E1`.
- **Surface Level 3 (Modals, Action Menus & Overlays):** `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` accompanied by a neutral backdrop overlay at `rgba(15, 23, 42, 0.35)`.
- **Alert & Notice Banners:** Zero shadow. Flat background fills with matching tint borders (e.g., `#FEF3C7` background with `#FDE68A` border) to keep warnings integrated into the flow rather than hovering.

## Shapes

The design uses a balanced rounded geometry (`roundedness: 2`):

- **Cards & Data Modules:** `rounded-lg` (16px / 1rem) to `rounded-xl` (20px / 1.25rem) depending on viewport scale. This provides a friendly, approachable structure without feeling cartoonish.
- **Buttons & Standard Inputs:** `rounded-md` (8px to 10px / 0.5rem - 0.625rem), providing a clear clickable target with clean edges.
- **Badges, Status Pills & Micro-tags:** `rounded-full` (9999px) for fiscal tags (e.g., "Em dia", "6 meses"), preserving standard pill conventions.
- **Icon Containers:** Soft squares with `rounded-lg` (10px - 12px) paired with tinted background fills (`#DCFCE7`, `#E0F2FE`, `#FEF3C7`).

## Components

### Buttons
- **Primary CTA:** Solid vibrant green (`#16A34A`), text white (`#FFFFFF`), bold typography (`label-lg`), height 44px (desktop) / 48px (mobile). Hover state: `#15803D`.
- **Secondary CTA:** White background (`#FFFFFF`), border 1px solid (`#E2E8F0`), text dark slate (`#0F172A`). Hover state: background `#F8FAFC`, border `#CBD5E1`.
- **Tertiary / Ghost:** No border, transparent background, text `#16A34A` or `#64748B`. Hover state: background `#F1F5F9`.

### Status Badges & Pills
- **Success ("Em dia"):** Background `#DCFCE7`, text `#15803D`, font weight 600, padding 4px 10px, rounded-full.
- **Warning ("Atenção" / "Prazo"):** Background `#FEF3C7`, text `#B45309`, font weight 600, padding 4px 10px, rounded-full.
- **Filter Selector Pills:** Background `#FFFFFF`, border `#E2E8F0`, padding 6px 12px, caret icon `#64748B`.

### Notification Banners
- **DAS Due Date Banner:** Background `#FEF3C7`, border 1px solid `#FDE68A`, rounded-xl (12px), padding 12px 16px. Left side displays an amber bell/calendar icon; right side houses an inline dismiss or action button ("Entendi").

### Cards & Metric Containers
- **Financial Metric Card:** Pure white `#FFFFFF`, border 1px `#E2E8F0`, padding 16px to 20px. Top row displays category label and micro-icon; center displays large monetary bold value; footer shows percentage change or subtext comparison (e.g., "↑ 12% maior que o mês passado" in `#16A34A`).
- **Revenue Ceiling Gauge Card:** Houses an SVG circular progress indicator (`#16A34A` track over `#E2E8F0` ring), centering the percentage used, paired with stacked values ("Faturado até agora" vs. "Limite anual R$ 81.000,00").

### Navigation Elements
- **Sidebar Desktop Item:** Height 40px, rounded-md, horizontal padding 12px, gap 12px. Default state: text `#64748B`, icon stroke 1.5px. Active state: background `#DCFCE7`, text `#15803D`, icon color `#16A34A`, font weight 600.
- **Mobile Bottom/Header Bar:** Clean `#FFFFFF` header with hamburger toggle, centered logo, and circular profile badge (`#E2E8F0` background with dark initial).

### Form Inputs & Checkboxes
- **Input Fields:** Height 42px, background `#FFFFFF`, border 1px solid `#E2E8F0`, placeholder `#94A3B8`, text `#0F172A`. Focus state: border `#16A34A` with ring `2px rgba(22, 163, 74, 0.15)`.
- **Checkboxes:** 18px x 18px, rounded 4px, border 1.5px `#CBD5E1`. Checked state: background `#16A34A` with white checkmark.