# KantorCore — Design Tokens & Components

A condensed reference. The authoritative source is **[`design-tokens.css`](./design-tokens.css)** (light + dark + 6 accents) and **[`components.css`](./components.css)**. Use **semantic** tokens in app code — never the primitive ramps.

---

## 1. Theming model

```html
<html data-theme="light|dark" data-accent="indigo|teal|purple|rose|amber|emerald">
```

- `data-theme` and `data-accent` are **independent**; the cascade resolves any combination (e.g. dark + rose).
- Accents alias to `--accent-50 … --accent-950` and `--accent-rgb`, so accent-derived chrome (CTAs, focus rings, active nav, agent avatars) re-skins automatically.
- **Per-tenant brand:** server may set `data-tenant-brand="1"` with inline `--brand-500/600` + `--brand-rgb`; accent tokens remap to the brand. Validate hex for AA contrast server-side; fall back to `--accent-600`.

---

## 2. Brand palette (primitives — for token authors only)

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#1A2B5A` | Core / system chrome, inverted surfaces |
| `--indigo` | `#3B4FC4` | Default accent · Layer 3 (Workspace) |
| `--teal` | `#0F7B6C` | Data / Layer 1 (Core) · success family |
| `--amber` | `#B35A00` | Platform / Layer 2 (Logic) · warn family |
| `--red` | `#B42318` | Danger |

> **Layer colour convention (used across the wireframes & icon set):**
> Layer 3 Workspace → **indigo** · Layer 2 Logic → **amber** · Layer 1 Core → **teal** · system/core UI → **navy**.

---

## 3. Semantic tokens (use these)

### Surfaces
| Token | Light | Dark |
|---|---|---|
| `--bg-canvas` | `#FAFAFA` | `#0B0D12` |
| `--bg-surface` | `#FFFFFF` | `#14171E` |
| `--bg-elevated` | `#FFFFFF` | `#1A1E27` |
| `--bg-sunken` | `#F4F4F5` | `#0B0D12` |
| `--bg-inverted` | `#18181B` | `#FAFAFA` |
| `--bg-overlay` | `rgba(15,15,20,.45)` | `rgba(0,0,0,.65)` |

### Text
| Token | Light | Dark |
|---|---|---|
| `--text-primary` | `#18181B` | `#F4F4F5` |
| `--text-secondary` | `#52525B` | `#A1A1AA` |
| `--text-muted` | `#A1A1AA` | `#71717A` |
| `--text-accent` | `accent-600` | `accent-300` |
| `--text-on-accent` | `#FFFFFF` | `#FFFFFF` |
| `--text-inverted` | `#FAFAFA` | `#18181B` |

### Borders & fills
`--border-subtle`, `--border-strong`, `--border-focus` · `--fill-subtle`, `--fill-hover`, `--fill-active`, `--fill-accent`, `--fill-accent-subtle`

### State (constant — never theme to accent)
| Family | fg / bg / border |
|---|---|
| success | `--state-success` / `--state-success-bg` / `--state-success-border` |
| warn | `--state-warn` / `--state-warn-bg` / `--state-warn-border` |
| danger | `--state-danger` / `--state-danger-bg` / `--state-danger-border` |
| info | `--state-info` / `--state-info-bg` / `--state-info-border` (accent-derived) |

---

## 4. Typography

- **Sans:** Inter (`--font-sans`). **Mono:** JetBrains Mono (`--font-mono`) — used for code, IDs, numeric/tabular surfaces.
- Type scale via utility classes / tokens: `.t-display .t-h1 .t-h2 .t-h3 .t-h4 .t-body-lg .t-body .t-body-sm .t-caption .t-micro`.
- `--micro` style is letter-spaced ALL-CAPS for section labels.
- Numeric/code surfaces: apply `font-feature-settings: var(--tnum)` for tabular figures.

---

## 5. Spacing, radius, elevation, motion

- **Spacing:** `--s-N` where N = px/4 (`--s-4` = 16px); half-steps `--s-1_5` = 6px.
- **Radius:** `--r-xs … --r-3xl`, `--r-full`. Cards typically `--r-lg` (12px); pills `--r-full`.
- **Shadows:** `--shadow-xs … --shadow-xl`, `--shadow-focus` (focus ring). Dark mode uses opacity-based shadows.
- **Motion:** durations `--d-instant|fast|base|slow`; easings `--ease`, `--ease-out`, `--spring`.
- **Z-index (named, not numeric):** `--z-base … --z-rail --z-sticky --z-dropdown --z-popover --z-overlay --z-modal --z-command --z-toast --z-tooltip`.
- **Layout:** `--rail-w`, `--sidebar-w`, `--topbar-h` (48px), `--subnav-h`, `--panel-w`, `--content-gutter`.

---

## 6. Component primitives (`components.css`)

Class convention: `.kc-<component>` · variant `.kc-<component>-<variant>` · state `.is-<state>`.

- **Buttons:** `.kc-btn` + `.kc-btn-primary | -ghost | -sm` …
- **Badges / pills:** `.kc-badge` + `.kc-badge-success | -warn | …`; role pills (`role-admin/member/guest/auto`).
- **Inputs:** `.kc-input`, `.kc-check`, `.kc-radio` (focus via `--shadow-focus`).
- **App shell** (`screens/_shell.css`): `.kc-shell` grid = `.kc-rail` (icon rail) + `.kc-side` (contextual sidebar) + main (`.kc-topbar`, `.kc-subnav`, `.kc-content`).

### AI-native components (the product differentiator)
- **`.kc-ai-field`** — an AI-managed field: shows prompt source (model + trigger), last-run timestamp, retry.
- **`.kc-tool-call`** — inline disclosure of one tool invocation in an agent run (name, args, status).
- **`.kc-agent-msg`** — agent/user message bubble; distinguished by avatar tint, **not** by left/right side.

---

## 7. Icons

Two icon systems ship here:

1. **Workspace UI icons** — `icons.js`, Lucide-style 1.5px-stroke inline SVG. Usage: `<i data-icon="search"></i>` → hydrated to inline SVG with class `.kc-icon`. Used throughout `screens/*`.
2. **Module marks** — `icon-set.html` + `icons-data.js`: 52 duotone module icons on a 48×48 grid (each = one stroke tone + a 15%-opacity body fill), grouped indigo / teal / amber / navy. Render at 22px in the rail.

---

## 8. Do / Don't

```css
/* ❌ Don't reference primitive ramps in app code */
color: var(--indigo-600);
background: var(--neutral-50);

/* ✅ Use semantic tokens — automatically theme-aware */
color: var(--text-accent);
background: var(--bg-canvas);
```

Don't hardcode hex, px, or shadows — every value is a token. Don't theme state colours to the accent. Don't assume left/right for agent vs user messages — use avatar tint.
