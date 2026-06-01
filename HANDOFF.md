# KantorCore — Engineering Handoff

This document tells a developer (or coding agent) how to turn this UI package into a working application. It assumes you have read [`README.md`](./README.md).

The package is the **visual + interaction contract**. Below: the recommended stack, how each screen maps to data and services, and a phased build plan.

---

## 1. Recommended stack

This is a guideline, not a mandate — the UI is framework-agnostic plain HTML/CSS.

| Concern | Recommendation | Why |
|---|---|---|
| Front-end | **React + TypeScript + Vite** | Component model fits the screen decomposition below |
| Styling | **Keep `design-tokens.css` + `components.css` verbatim**; add Tailwind only if you want utilities | Tokens are the source of truth; don't re-derive colours |
| State / data | **TanStack Query** against the Layer-1 REST/GraphQL API | The whole product is read-model + mutations over the ERP core |
| Backend (Layer 1) | **Headless ERP** (Odoo / a custom service) exposing REST **and** GraphQL | The wireframes assume `res.*` / `stock.*` / `account.*` models |
| Workflow engine (Layer 2) | Event-driven orchestrator (Temporal / n8n-style / custom) | Drives the Logic Orchestrator UI |
| Auth | OIDC + 2FA (see `screens/auth.html`) | Login, 2FA, invite, reset flows already designed |
| Realtime | WebSocket / SSE | Event Logs console + agent inbox stream |

**Do not** hardcode hex colours, font sizes, spacing, or radii in components — every value exists as a token in `design-tokens.css`. See `DESIGN-SYSTEM.md` for names.

---

## 2. Layer 1 — Data model (build this first)

The UI references these ERP models. Treat them as the initial schema. Field counts are indicative; exact fields are shown in `platform-engine.html → API & Data Core → Database Schemas`.

| Model | Purpose | Key relations seen in UI |
|---|---|---|
| `res.users` | People / accounts | manager_id → res.users |
| `res.partner` | Customers & vendors | — |
| `res.invoice` | Customer/vendor invoices | partner_id, manager_id, lines, payments, agent_runs |
| `account.move` | Journal entries / ledger | invoice_id |
| `res.expense` | Expense claims | category_id, employee_id, attachment_ids |
| `stock.quant` | Inventory on hand | location |
| `sale.order` | Sales orders | partner_id |
| `product.tmpl` | Products | — |

Each model must be exposed through the **API Gateway** with:
- **REST**: `GET/POST/PUT/DELETE /api/v1/{model}` and action endpoints (e.g. `POST /api/v1/invoices/:id/post`).
- **GraphQL** for read-heavy screens (lists, pivots).
- **Webhooks** on lifecycle events (`invoice.created`, `invoice.posted`, `partner.updated`, `order.confirmed`, `stock.moved`).
- **Event bus** publishing the same events for the Logic Orchestrator and the Event Logs console.

The Event Logs console (`platform-engine.html`) shows the exact request shape to emit: `timestamp · METHOD · path · status · latency · source`.

---

## 3. Layer 2 — Logic & composition

### Logic Orchestrator (`platform-engine.html → Logic Orchestrator`)
A visual workflow builder. Each workflow is a graph of typed nodes:

- **Trigger** — binds to a model + event (`res.invoice` / `on_create`) with an optional filter expression.
- **Condition** — boolean expression over the record; branches to other nodes.
- **Approval** — assigns an approver (often `record.manager_id`), a channel, an SLA, and a timeout escalation.
- **Action · API** — calls a Layer-1 endpoint with a templated payload (`{{run.user}}`, `{{record.*}}`).
- **Notify** — posts to a workspace app (e.g. IS-CHAT channel).

Node property schemas are in `platform-views.js → window.KC_NODES`. Persist a workflow as `{ nodes[], edges[], type: deterministic|hybrid|probabilistic }`. The `type` badge maps 1:1 to a flag on the workflow record.

### No-Code App Builder (`platform-engine.html → No-Code App Builder`)
Lets a citizen developer compose an internal app from components and **bind each component to a Layer-1 schema field**.

- Component library → field/display widgets (Text, Number, Dropdown, Date, Upload, Toggle, Data Table, Button, Record Card, Chart).
- Each placed element stores `{ kind, label, bind: "<model.field>", validation, required, readonly }`.
- On submit, the app writes back through the API Gateway to the bound model (e.g. `res.expense`).

Persist an app as `{ screens[]: { elements[] } }`. The binding panel in the UI is the editor for one element's `bind` + validation.

---

## 4. Layer 3 — Workspace screens

Each tab in `wireframes.html` is a screen group. Suggested component decomposition and the data each needs:

| Screen (`screens/…`) | Build as | Reads / writes |
|---|---|---|
| `shell.html` | App shell: rail + sidebar + topbar + command palette (⌘K) + notifications | Nav config, user, notification feed |
| `auth.html` | Login · 2FA · signup · invite · reset (5 toggleable flows) | OIDC / auth service |
| `records.html` | **RecordShell** — form view with pipeline header, smart buttons, AI fields, chatter, relations | One `res.*` record + related |
| `views.html` | List · Kanban · Calendar · Pivot over any model | GraphQL list queries |
| `ai.html` | Agent inbox · conversation · AI-field wizard · tool catalog · mandates · run inspector | Agent runtime, tool calls, mandates |
| `admin.html` | Users · security · branding · integrations · **ModelMeta studio** | Tenant config, schema metadata |
| `conv.html` | Omnichannel · email · team chat · helpdesk ticket | Messaging / inbox service |
| `portal.html` | Customer portal home · magic-link landing · KMS article | Public/portal API (scoped tokens) |
| `mobile.html` | PWA: home, list, form, approval queue, offline state | Same API, offline cache |

### AI-native components (the differentiator — don't skip)
Three classes encode the AI architecture (documented in `DESIGN-SYSTEM.md` / `components.css`):
- **`.kc-ai-field`** — a model-managed field that shows its prompt source (model + trigger), last-run time and a retry control. Back it with a per-field "AI compute" record.
- **`.kc-tool-call`** — inline disclosure of one tool invocation inside an agent run (name, args, status).
- **`.kc-agent-msg`** — agent/user message bubble distinguished by avatar tint, not side.

The **mandate** model (admin screen) governs what autonomous agents may do; the **Autonomous** role pill on a user record reflects it.

---

## 5. Theming contract

```html
<html data-theme="light|dark" data-accent="indigo|teal|purple|rose|amber|emerald">
```

- Both attributes are independent and resolved purely in CSS — flipping them must require **no JS re-render** beyond setting the attribute.
- **Per-tenant brand override:** the server may emit
  `<html data-tenant-brand="1" style="--brand-500:#…; --brand-600:#…; --brand-rgb:… ;">`
  and all accent-derived chrome picks it up. Validate tenant hex for WCAG-AA contrast on white text server-side; fall back to `--accent-600` if it fails.
- State colours (success/warn/danger) are **constant** — never theme them to the accent.

---

## 6. Suggested build order

1. **Foundations.** Drop in `design-tokens.css` + `components.css`. Stand up the `data-theme`/`data-accent` switcher. Port `shell.html` to your framework as the app frame.
2. **Layer 1 read path.** Implement `res.partner` + `res.invoice` over REST/GraphQL. Wire `views.html` (List/Kanban) and `records.html` (RecordShell) to real data.
3. **Layer 1 write path + gateway.** Mutations, API keys, webhooks, event bus. Light up the Event Logs console with real events.
4. **Layer 2 Orchestrator.** Persist/run workflows; start with the *Invoice Approval* example shown in the UI.
5. **Layer 2 App Builder.** Element model + schema binding; ship one app (Expense Claim) end-to-end.
6. **AI surfaces.** Agent inbox, AI fields, mandates (`ai.html`, `admin.html`).
7. **Edges.** Portal, conversations, mobile PWA, offline.

---

## 7. Gotchas & open questions (from the design pass)

- **AI field invalidation** — when a `trigger: on_change` field re-runs, decide whether to show a skeleton on the value or replace atomically (current design assumes atomic).
- **Mandates on groups** — UI shows user→mandate; schema likely allows group→mandate for autonomous agents. Decide before modelling.
- **Process type flag** — the det/hybrid/probabilistic badge must be a stored flag on the workflow, not derived at runtime.
- **Accent vs state collision** — if a tenant picks `amber` as accent it nears `--state-warn`; acceptable for v0.2, revisit.
- **Mobile push** — PWA wireframes show in-app notifications only; OS-level push permission flow is not designed.

---

## 8. What is intentionally NOT here

UI only — no backend, no real auth, no persistence. Mock data lives in `platform-views.js` and inline in each screen. PDF/e-Faktur rendering, chart libraries beyond the pivot hint, email templates, and native mobile shells are out of scope and must be built.
