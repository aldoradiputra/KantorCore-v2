# KantorCore — UI Package

A design-token-driven UI for **KantorCore**, an AI-native corporate operating system for Indonesia. It pairs a user-facing **workspace** (Lark-style, Layer 3) with a **headless ERP platform engine** (Odoo-style backend, Layers 1 & 2) under a **MACH** architecture (Microservices, API-first, Cloud-native, Headless).

This package is **UI only** — static HTML/CSS/JS wireframes and a design system. There is no backend. It is the visual contract your application should be built against.

> **Coding agents: read [`HANDOFF.md`](./HANDOFF.md) first.** It maps every screen to the data/services it implies and recommends a build path.

---

## Open it

Everything is static — no build step. Open [`index.html`](./index.html) in a browser as the entry point, or open any file directly:

| File | What it is | Layer |
|---|---|---|
| [`wireframes.html`](./wireframes.html) | Tabbed hub for the **product workspace** — 9 screen groups, light/dark, 6 accents | Layer 3 |
| [`platform-engine.html`](./platform-engine.html) | The **admin / platform console** — architecture map, API & Data Core, Logic Orchestrator, No-Code App Builder | Layers 1 & 2 |
| [`icon-set.html`](./icon-set.html) | **52 module icons** (duotone, 48×48, three colour families) | Brand |

A couple of files pull from a CDN (so they need a network connection on first load):
- `platform-engine.html` uses **Tailwind (CDN)**, **Alpine.js (CDN)** and **Google Fonts**.
- `wireframes.html` and the screens use **Google Fonts** (`@import` in `design-tokens.css`).
- `icon-set.html` is fully self-contained (fonts bundled in `fonts/`).

To run with zero network calls, self-host Tailwind/Alpine and swap the Google Fonts `@import` for the local `fonts/` files.

---

## Architecture at a glance

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3 · EXPERIENCE — Workspace        (wireframes.html)   │
│  What employees see: home, chat, records, dashboards, apps   │
└───────────────┬─────────────────────────────────────────────┘
                │  user actions / events
┌───────────────▼─────────────────────────────────────────────┐
│  LAYER 2 · COMPOSITION — Logic           (platform-engine)   │
│  • Logic Orchestrator  — visual workflows (trigger→action)   │
│  • No-Code App Builder — drag UI, bind to a Layer-1 schema   │
└───────────────┬─────────────────────────────────────────────┘
                │  API calls / writes
┌───────────────▼─────────────────────────────────────────────┐
│  LAYER 1 · CORE — Data & API (headless ERP) (platform-engine)│
│  • Database Schemas (res.invoice, res.partner, stock…)       │
│  • API Gateway & Webhooks  • Event Bus                       │
└─────────────────────────────────────────────────────────────┘
```

The **System Architecture** tab in `platform-engine.html` is a live illustration of this flow — it traces a real example: *Finance submits an invoice (L3) → Approval workflow runs (L2) → writes to `res.invoice` via the API (L1).*

---

## Folder structure

```
KantorCore-UI/
├── index.html              ← entry point / launcher
├── README.md               ← you are here
├── HANDOFF.md              ← build guide for engineers / coding agents
├── DESIGN-SYSTEM.md        ← token & component reference
│
├── wireframes.html         ← Layer-3 workspace hub (loads screens/* in an iframe)
├── platform-engine.html    ← Layer 1+2 admin console (Tailwind + Alpine)
├── platform-views.js       ← data for platform-engine.html (mock datasets, node props)
├── icon-set.html           ← 52-icon showcase
├── icons-data.js           ← icon path data
│
├── design-tokens.css       ← CSS custom properties (light + dark + 6 accents) — SINGLE SOURCE
├── components.css          ← component primitives (.kc-btn, .kc-badge, .kc-ai-field …)
├── icons.js                ← inline SVG icon set used by the workspace screens (data-icon="…")
│
├── screens/                ← one HTML per Layer-3 screen group
│   ├── _shell.css          ← shared app-shell layout (rail + sidebar + topbar)
│   ├── shell.html  auth.html  records.html  views.html  ai.html
│   └── admin.html  conv.html  portal.html  mobile.html
│
├── assets/                 ← logos / wordmarks (SVG)
└── fonts/                  ← Inter + JetBrains Mono (woff2)
```

---

## Tech notes

- **Styling is token-first.** `design-tokens.css` defines everything as CSS custom properties. App code should use **semantic** tokens (`var(--bg-surface)`, `var(--text-accent)`) — not primitive ramps (`var(--indigo-600)`). See `DESIGN-SYSTEM.md`.
- **Theme + accent are independent attributes** on `<html>`: `data-theme="light|dark"` and `data-accent="indigo|teal|purple|rose|amber|emerald"`.
- **`platform-engine.html`** is a self-contained Alpine.js app. All view state (`view`, `env`, `selectedNode`, `selectedEl`) lives in the `platform()` component at the bottom of the file; mock data lives in `platform-views.js`.
- **No framework lock-in.** The wireframes are plain HTML/CSS so you can port the markup into React/Vue/Svelte and keep the CSS tokens verbatim.

## License / usage
Internal design asset for the KantorCore product. Mock data (company names, figures, Indonesian copy) is illustrative only.
