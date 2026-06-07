# Portals Admin Management View — Wireframe Prompt

## Objective

Design an HTML/CSS wireframe for the **Portals management view** — the admin-facing interface where platform admins manage external-facing portals (customer portals, vendor portals, career sites, knowledge bases). This is NOT the portal itself; it's the back-office control panel that configures, enables, and monitors them.

## Surface Context

- **KantorCore** is a Headless Sovereign Enterprise OS with 4 top-level surfaces: Workspace, Studio, Portals, Administration
- **Portals** is the third surface (Layer 3) — accessible via the Bento launcher from any other surface
- Color accent: **teal** (`--teal-500: #0F7B6C`, `--teal-50: #EAF7F4`)
- Layout follows the Studio pattern: left sidebar + header + main content (no icon rail — that's Workspace only)
- CSS class prefix: `.kc-*` (e.g. `.kc-studio-side`, `.kc-studio-header`, `.kc-card`)
- Design tokens: Inter font, 4px grid, neutral palette with teal accent

## Layout Structure

```
+--[Sidebar 240px]--+----[Main Content]--------------------+
| KantorCore        | [Bento] / Portals > Overview  [Badge]|
| Portals [PUBLIC]  |--------------------------------------|
|                   |                                      |
| ACTIVE PORTALS    |  h1: Portals                         |
|  Customer Portal  |  p: External sites — the web-facing  |
|  Vendor Portal    |     edge of your workspace.          |
|  Knowledge Base   |                                      |
|                   |  +--[Card Grid]-------------------+  |
| DRAFTS            |  | [icon] Customer Portal  [Live] |  |
|  Careers          |  | Self-service home...           |  |
|                   |  | Audience: Clients              |  |
| SETTINGS          |  +--------------------------------+  |
|  Access & Domains |  | [icon] Vendor Portal    [Live] |  |
|  Portal Settings  |  | PO, delivery, payment...       |  |
|                   |  +--------------------------------+  |
| [Avatar] User     |  | ... more cards                 |  |
+-------------------+--------------------------------------+
```

## Required Views

### 1. Portal Directory (Overview)
The landing view when entering Portals via Bento. Shows:
- Card grid of all portals (existing data shape below)
- Each card: icon, name, status badge (Live/Draft), short description, audience tag
- Quick actions on hover/click: "Open Portal", "Edit Settings", "View Analytics"
- Top-right: "+ New Portal" button
- Search/filter bar above the grid (by status, audience type)

### 2. Portal Detail / Settings
When clicking a portal card, slide into a detail view:
- Header: portal name + status toggle (Live/Draft/Disabled)
- Tabs or sections: General, Branding, Access Control, Domain, Analytics
- **General**: name, description, audience, default language
- **Branding**: logo upload, primary color, custom CSS toggle, favicon
- **Access Control**: authentication method (magic link, SSO, public), IP allowlist, role mapping
- **Domain**: custom domain field, SSL status indicator, DNS verification checklist
- **Analytics**: visitor count, active sessions, most-visited pages (placeholder charts)

### 3. Portal Builder Preview
A split view for previewing the portal:
- Left: configuration panel (compact version of settings)
- Right: live preview iframe-style mock showing the client-facing portal
- Top toolbar: device toggles (desktop/tablet/mobile), "Open in new tab" link

## Existing Data Shape

```typescript
interface Portal {
  name: string;       // e.g. "Customer Portal"
  desc: string;       // Short description
  audience: string;   // "Clients" | "Vendors" | "Applicants" | "Public"
  status: 'Live' | 'Draft';
  icon: ReactNode;    // SVG icon
}
```

Current portals: Customer Portal (Live), Vendor Portal (Live), Careers/Applicant (Draft), Knowledge Base (Live).

## Design Constraints

1. Use the same sidebar + header pattern as Studio (`.kc-studio-side`, `.kc-studio-header`, `.kc-studio-brand`)
2. Accent is teal, not amber — update brand label color and badge accordingly
3. Card component reuses `.kc-card` from `components.css`
4. Badges use `.kc-badge` and `.kc-badge-success`
5. Header has Bento launcher button (grid icon) on the far left, then breadcrumb: `Portals > [current view]`
6. Sidebar nav sections: Active Portals, Drafts, Settings
7. Bottom of sidebar: user avatar + name + role (same as Studio)
8. No Tailwind — all styles in `.kc-*` classes or inline via CSS custom properties
9. Font stack: `var(--font-sans)` = Inter, `var(--font-mono)` = JetBrains Mono
10. Border radius tokens: `--r-xs: 4px`, `--r-sm: 6px`, `--r-md: 8px`, `--r-lg: 12px`

## Connection to Existing Front-End

The portals configured here will later be wired to the existing client-facing landing pages. The client-facing portal wireframe already exists (`screens/portal.html`) with three views:
- **Portal Home**: invoice list, ticket overview, KMS article grid
- **Magic Link Landing**: email verification / passwordless auth
- **KMS Article**: full-page article view with breadcrumbs

This admin view manages the configuration that drives those client-facing pages. The "Open Portal" action should conceptually link to the client-facing URL.

## Output Format

Single HTML file with embedded CSS and inline SVG icons (no external dependencies). Follow the same markup conventions as the existing KantorCore wireframes: semantic HTML, `.kc-*` class naming, CSS custom properties from `design-tokens.css`. The wireframe should be static but show all three views (use anchor links or tabs to switch between them).
