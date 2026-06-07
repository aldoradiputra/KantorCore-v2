'use client';

import { useState } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

type StudioView = 'arch' | 'core' | 'orch' | 'builder';
type CoreTab = 'schemas' | 'gateway' | 'events';

const VIEW_LABELS: Record<StudioView, string> = {
  arch: 'System Architecture',
  core: 'API & Data Core',
  orch: 'Logic Orchestrator',
  builder: 'No-Code App Builder',
};

export default function StudioPage() {
  const [view, setView] = useState<StudioView>('arch');
  const [coreTab, setCoreTab] = useState<CoreTab>('schemas');
  const [env, setEnv] = useState('Production');
  const setBentoOpen = useWorkspaceStore((s) => s.setBentoOpen);
  const user = useWorkspaceStore((s) => s.user);

  const initials = user?.initials ?? 'RH';

  return (
    <div className="kc-studio">
      {/* ─── Sidebar ─── */}
      <aside className="kc-studio-side">
        <div className="kc-studio-brand">
          <div className="kc-studio-brand-mark">K</div>
          <div>
            <div className="kc-studio-brand-name">KantorCore</div>
            <div className="kc-studio-brand-label">Studio</div>
          </div>
          <span className="kc-badge" style={{ background: 'var(--teal-50)', color: 'var(--teal-500)', fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>MACH</span>
        </div>

        <nav className="kc-studio-nav">
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Architecture</div>
            <button className={`kc-studio-nav-item${view === 'arch' ? ' is-active' : ''}`} onClick={() => setView('arch')}>
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
              <span>System Architecture</span>
            </button>
          </div>

          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">
              <span className="kc-studio-nav-dot" style={{ background: 'var(--teal-500)' }} />
              Layer 1 · Core
            </div>
            <button className={`kc-studio-nav-item${view === 'core' ? ' is-active' : ''}`} onClick={() => setView('core')}>
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
              <span>API &amp; Data Core</span>
            </button>
            <div className="kc-studio-nav-sub">
              <button className={view === 'core' && coreTab === 'schemas' ? 'is-active' : ''} onClick={() => { setView('core'); setCoreTab('schemas'); }}>Database Schemas</button>
              <button className={view === 'core' && coreTab === 'gateway' ? 'is-active' : ''} onClick={() => { setView('core'); setCoreTab('gateway'); }}>API Gateway &amp; Webhooks</button>
              <button className={view === 'core' && coreTab === 'events' ? 'is-active' : ''} onClick={() => { setView('core'); setCoreTab('events'); }}>Event Logs</button>
            </div>
          </div>

          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">
              <span className="kc-studio-nav-dot" style={{ background: 'var(--amber-500)' }} />
              Layer 2 · Logic
            </div>
            <button className={`kc-studio-nav-item${view === 'orch' ? ' is-active' : ''}`} onClick={() => setView('orch')}>
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6h7M6 8.5l4.5 7.5M18 8.5l-4.5 7.5" /></svg>
              <span>Logic Orchestrator</span>
            </button>
            <button className={`kc-studio-nav-item${view === 'builder' ? ' is-active' : ''}`} onClick={() => setView('builder')}>
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" /></svg>
              <span>No-Code App Builder</span>
            </button>
          </div>

          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Governance</div>
            <button className="kc-studio-nav-item">
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></svg>
              <span>Access &amp; Mandates</span>
            </button>
          </div>
        </nav>

        <div className="kc-studio-user">
          <div className="kc-studio-avatar">{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="kc-studio-uname">{user?.name ?? 'Rangga H.'}</div>
            <div className="kc-studio-urole">Platform Admin</div>
          </div>
          <svg style={{ width: 16, height: 16, color: 'var(--text-muted)', marginLeft: 'auto' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 9l4-4 4 4M8 15l4 4 4-4" /></svg>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="kc-studio-main">
        {/* Header */}
        <header className="kc-studio-header">
          <button className="kc-studio-bento" title="Open launcher" aria-label="Open application launcher" onClick={() => setBentoOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /></svg>
          </button>
          <div className="kc-studio-divider" />
          <div className="kc-studio-crumb">
            <span className="kc-studio-crumb-root">Studio</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><path d="M9 6l6 6-6 6" /></svg>
            <span className="kc-studio-crumb-page">{VIEW_LABELS[view]}</span>
          </div>
          <div style={{ flex: 1 }} />
          <button className="kc-studio-env-btn">
            <span className="kc-studio-env-dot" style={{ background: env === 'Production' ? 'var(--teal-500)' : env === 'Staging' ? 'var(--amber-500)' : 'var(--text-muted)' }} />
            {env}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <div className="kc-studio-divider" />
          <button className="kc-studio-save">Save</button>
          <button className="kc-studio-deploy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            Deploy
          </button>
        </header>

        {/* Content */}
        <div className="kc-studio-content">
          {view === 'arch' && <ArchitectureView setView={setView} />}
          {view === 'core' && <CoreView tab={coreTab} setTab={setCoreTab} />}
          {view === 'orch' && <OrchestratorView />}
          {view === 'builder' && <BuilderView />}
        </div>
      </div>
    </div>
  );
}

/* ─── Architecture View ─── */
function ArchitectureView({ setView }: { setView: (v: StudioView) => void }) {
  return (
    <div style={{ padding: 24, maxWidth: 1140, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ font: '700 20px/1.3 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>System Architecture</h1>
        <p style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4, maxWidth: 640 }}>
          How a user action in the <b style={{ color: 'var(--accent-600)' }}>Workspace (Layer 3)</b> drops into the <b style={{ color: 'var(--amber-500)' }}>Logic engine (Layer 2)</b> and resolves against the <b style={{ color: 'var(--teal-500)' }}>Data &amp; API core (Layer 1)</b>. Every layer is decoupled — MACH: Microservices, API-first, Cloud-native, Headless.
        </p>
      </div>

      {/* Connectivity diagram */}
      <div className="kc-card" style={{ padding: 24, borderRadius: 'var(--r-2xl)' }}>
        <svg viewBox="0 0 1080 260" style={{ width: '100%', maxHeight: 300 }} fill="none" fontFamily="var(--font-sans)">
          {/* Layer 3 */}
          <rect x="40" y="20" width="1000" height="60" rx="12" fill="var(--fill-accent-subtle)" stroke="var(--accent-300)" />
          <text x="540" y="56" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent-600)">Layer 3 · Experience — Workspace</text>
          {/* Layer 2 */}
          <rect x="40" y="110" width="1000" height="60" rx="12" fill="var(--amber-50)" stroke="var(--amber-300)" />
          <text x="540" y="146" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--amber-500)">Layer 2 · Composition — Logic Engine</text>
          {/* Layer 1 */}
          <rect x="40" y="200" width="1000" height="60" rx="12" fill="var(--teal-50)" stroke="var(--teal-300)" />
          <text x="540" y="236" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--teal-500)">Layer 1 · Core — Data &amp; API (Headless ERP)</text>
          {/* Arrows */}
          <path d="M540 80 V110" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#studioArrow)" />
          <path d="M540 170 V200" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#studioArrow)" />
          <defs>
            <marker id="studioArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M1 1L7 4.5L1 8" fill="none" stroke="var(--text-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
        </svg>

        {/* Legend */}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px', font: '500 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--text-primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-500)" strokeWidth="2"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
            Live trace
          </div>
          <span><b style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-600)' }}>Finance</b> submits invoice</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          <span><b style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber-500)' }}>Orchestrator</b> runs approval</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          <span>writes to <b style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal-500)' }}>res.invoice</b> via API</span>
        </div>
      </div>

      {/* Three layer summary cards */}
      <div className="kc-studio-layer-grid" style={{ marginTop: 16 }}>
        <button className="kc-studio-layer-card" onClick={() => setView('core')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="kc-studio-nav-dot" style={{ background: 'var(--teal-500)' }} />
            <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--teal-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 1 · Core</span>
          </div>
          <div style={{ font: '700 15px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>API &amp; Data Core</div>
          <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Headless ERP models, the API gateway and the event bus. The single source of truth.</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>
            <span><b style={{ color: 'var(--text-primary)' }}>43</b> models</span>
            <span><b style={{ color: 'var(--text-primary)' }}>14</b> keys</span>
            <span><b style={{ color: 'var(--text-primary)' }}>99.9%</b> up</span>
          </div>
        </button>

        <button className="kc-studio-layer-card" onClick={() => setView('orch')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="kc-studio-nav-dot" style={{ background: 'var(--amber-500)' }} />
            <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--amber-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 2 · Logic</span>
          </div>
          <div style={{ font: '700 15px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>Logic Orchestrator</div>
          <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Visual workflows that react to events and compose actions across every Layer-1 model.</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>
            <span><b style={{ color: 'var(--text-primary)' }}>27</b> flows</span>
            <span><b style={{ color: 'var(--text-primary)' }}>6</b> triggers</span>
            <span><b style={{ color: 'var(--text-primary)' }}>2.6k</b> runs/d</span>
          </div>
        </button>

        <button className="kc-studio-layer-card" onClick={() => setView('builder')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="kc-studio-nav-dot" style={{ background: 'var(--amber-500)' }} />
            <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--amber-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 2 · Logic</span>
          </div>
          <div style={{ font: '700 15px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>No-Code App Builder</div>
          <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Compose internal apps by dragging UI and binding each element to a Layer-1 schema.</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 16, font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>
            <span><b style={{ color: 'var(--text-primary)' }}>11</b> apps</span>
            <span><b style={{ color: 'var(--text-primary)' }}>48</b> screens</span>
            <span><b style={{ color: 'var(--text-primary)' }}>live</b> bind</span>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ─── API & Data Core View ─── */
const SCHEMAS = [
  { name: 'Invoice', model: 'res.invoice', fields: 28, records: '12.4k', bind: ['Approval WF', 'Portal'], api: 'REST + GQL', core: true },
  { name: 'Partner', model: 'res.partner', fields: 34, records: '8.2k', bind: ['CRM Sync'], api: 'REST + GQL', core: true },
  { name: 'Employee', model: 'hr.employee', fields: 42, records: '1.8k', bind: ['Payroll WF'], api: 'REST + GQL', core: true },
  { name: 'Product', model: 'product.product', fields: 22, records: '6.1k', bind: [], api: 'REST', core: false },
  { name: 'Stock Move', model: 'stock.move', fields: 18, records: '42.6k', bind: ['Warehouse WF'], api: 'REST + GQL', core: false },
  { name: 'Expense', model: 'res.expense', fields: 15, records: '3.2k', bind: ['Expense App'], api: 'REST', core: false },
  { name: 'Journal Entry', model: 'account.move', fields: 31, records: '28.8k', bind: ['Approval WF'], api: 'REST + GQL', core: true },
  { name: 'Project', model: 'project.project', fields: 19, records: '420', bind: [], api: 'REST', core: false },
];

function CoreView({ tab, setTab }: { tab: CoreTab; setTab: (t: CoreTab) => void }) {
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="kc-studio-nav-dot" style={{ background: 'var(--teal-500)' }} />
            <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--teal-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 1 · Core</span>
          </div>
          <h1 style={{ font: '700 20px/1.3 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginTop: 4 }}>API &amp; Data Core</h1>
          <p style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>The headless ERP backbone — for professional developers.</p>
        </div>
        <button className="kc-btn kc-btn-secondary" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          New model
        </button>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-lg)', padding: 4, width: 'fit-content', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
        {(['schemas', 'gateway', 'events'] as CoreTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              appearance: 'none',
              border: 0,
              padding: '6px 12px',
              borderRadius: 'var(--r-md)',
              font: '600 12.5px/1 var(--font-sans)',
              cursor: 'pointer',
              background: tab === t ? 'var(--teal-500)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-muted)',
            }}
          >
            {{ schemas: 'Database Schemas', gateway: 'API Gateway & Webhooks', events: 'Event Logs' }[t]}
          </button>
        ))}
      </div>

      {tab === 'schemas' && <SchemasPanel />}
      {tab === 'gateway' && <GatewayPanel />}
      {tab === 'events' && <EventsPanel />}
    </div>
  );
}

function SchemasPanel() {
  return (
    <div className="kc-card" style={{ overflow: 'hidden', borderRadius: 'var(--r-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', height: 44, borderBottom: '1px solid var(--border-subtle)' }}>
        <span style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>43 models · 312 fields</span>
      </div>
      <table style={{ width: '100%', fontSize: '12.5px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
            {['Model', 'Table', 'Fields', 'Records', 'Layer-2 bindings', 'API'].map((h) => (
              <th key={h} style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 16px', textAlign: h === 'Fields' || h === 'Records' ? 'right' : 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SCHEMAS.map((m) => (
            <tr key={m.model} style={{ borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
              <td style={{ padding: '10px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', background: m.core ? 'var(--teal-50)' : 'var(--fill-subtle)', color: m.core ? 'var(--teal-500)' : 'var(--text-muted)', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /></svg>
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                  {m.core && <span style={{ font: '600 9px/1 var(--font-mono)', color: 'var(--teal-500)', background: 'var(--teal-50)', padding: '2px 6px', borderRadius: 'var(--r-xs)' }}>CORE</span>}
                </div>
              </td>
              <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{m.model}</td>
              <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.fields}</td>
              <td style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{m.records}</td>
              <td style={{ padding: '10px 16px' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {m.bind.length > 0 ? m.bind.map((b) => (
                    <span key={b} style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--amber-500)', background: 'var(--amber-50)', padding: '3px 6px', borderRadius: 'var(--r-xs)' }}>{b}</span>
                  )) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                </div>
              </td>
              <td style={{ padding: '10px 16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '400 11px/1 var(--font-mono)', color: m.api === 'REST + GQL' ? 'var(--teal-500)' : 'var(--text-muted)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 'var(--r-full)', background: m.api === 'REST + GQL' ? 'var(--teal-500)' : 'var(--text-muted)' }} />
                  {m.api}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GatewayPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div className="kc-card" style={{ padding: 16 }}>
        <div style={{ font: '700 14px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>API Traffic</div>
        <div style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 2 }}>requests / minute · last 24h</div>
        <div style={{ height: 120, marginTop: 16, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          {Array.from({ length: 48 }, (_, i) => {
            const h = 20 + Math.random() * 80;
            return <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--teal-500)', borderRadius: '2px 2px 0 0', opacity: 0.7 + Math.random() * 0.3 }} />;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 10px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 8 }}>
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>now</span>
        </div>
      </div>
      <div className="kc-card" style={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        <div>
          <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total · 24h</div>
          <div style={{ font: '700 26px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>1.74M</div>
          <div style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--teal-500)' }}>&#8593; 12% vs yesterday</div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>p95 latency</div>
            <div style={{ font: '700 16px/1.4 var(--font-sans)', color: 'var(--text-primary)' }}>84<span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>ms</span></div>
          </div>
          <div>
            <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Error rate</div>
            <div style={{ font: '700 16px/1.4 var(--font-sans)', color: 'var(--text-primary)' }}>0.3<span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const EVENT_LOGS = [
  { ts: '14:32:01', m: 'POST', path: '/api/v1/invoices', code: 201, ms: 42, src: 'kc-web' },
  { ts: '14:32:00', m: 'GET', path: '/api/v1/partners?page=2', code: 200, ms: 18, src: 'mobile' },
  { ts: '14:31:58', m: 'PUT', path: '/api/v1/invoices/INV-2024-0847', code: 200, ms: 36, src: 'wf-engine' },
  { ts: '14:31:55', m: 'GET', path: '/api/v1/products?category=raw', code: 200, ms: 12, src: 'portal' },
  { ts: '14:31:52', m: 'POST', path: '/api/v1/stock/moves', code: 201, ms: 67, src: 'kc-web' },
  { ts: '14:31:50', m: 'DELETE', path: '/api/v1/expenses/EXP-0093', code: 204, ms: 8, src: 'kc-web' },
  { ts: '14:31:48', m: 'GET', path: '/api/v1/employees/me', code: 200, ms: 5, src: 'mobile' },
  { ts: '14:31:44', m: 'POST', path: '/api/v1/webhooks/invoice.created', code: 200, ms: 124, src: 'event-bus' },
  { ts: '14:31:41', m: 'GET', path: '/api/v1/dashboards/finance', code: 200, ms: 88, src: 'kc-web' },
  { ts: '14:31:38', m: 'POST', path: '/api/v1/auth/refresh', code: 200, ms: 14, src: 'mobile' },
];

function EventsPanel() {
  const methodColor = (m: string) => {
    if (m === 'GET') return 'var(--teal-500)';
    if (m === 'POST' || m === 'PUT') return 'var(--amber-500)';
    return 'var(--state-danger)';
  };
  const codeColor = (c: number) => {
    if (c < 300) return { bg: 'rgba(15,123,108,0.2)', fg: 'var(--teal-500)' };
    if (c < 500) return { bg: 'rgba(179,90,0,0.2)', fg: 'var(--amber-500)' };
    return { bg: 'rgba(239,68,68,0.2)', fg: 'var(--state-danger)' };
  };

  return (
    <div style={{ background: 'var(--bg-inverted)', borderRadius: 'var(--r-xl)', border: '1px solid var(--bg-inverted)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', height: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 'var(--r-full)', background: 'rgba(239,68,68,0.8)' }} />
          <span style={{ width: 10, height: 10, borderRadius: 'var(--r-full)', background: 'rgba(179,90,0,0.8)' }} />
          <span style={{ width: 10, height: 10, borderRadius: 'var(--r-full)', background: 'rgba(15,123,108,0.8)' }} />
        </span>
        <span style={{ font: '400 11px/1 var(--font-mono)', color: 'rgba(255,255,255,0.5)' }}>system-events — streaming</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, font: '400 10px/1 var(--font-mono)', color: 'var(--teal-500)' }}>
          <span style={{ width: 6, height: 6, borderRadius: 'var(--r-full)', background: 'var(--teal-500)', animation: 'pulse 2s infinite' }} />
          LIVE
        </span>
      </div>
      <div style={{ padding: 12, fontFamily: 'var(--font-mono)', fontSize: '11.5px', lineHeight: 1.7 }}>
        {EVENT_LOGS.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 8px', borderRadius: 'var(--r-sm)' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0, width: 64 }}>{l.ts}</span>
            <span style={{ fontWeight: 600, color: methodColor(l.m), flexShrink: 0, width: 48 }}>{l.m}</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.path}</span>
            <span style={{ flexShrink: 0, padding: '1px 6px', borderRadius: 'var(--r-xs)', fontSize: 10, fontWeight: 600, background: codeColor(l.code).bg, color: codeColor(l.code).fg }}>{l.code}</span>
            <span style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0, width: 48, textAlign: 'right' }}>{l.ms}ms</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0, width: 72, textAlign: 'right' }}>{l.src}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Orchestrator View ─── */
function OrchestratorView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="kc-studio-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="kc-studio-nav-dot" style={{ background: 'var(--amber-500)' }} />
          <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--amber-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 2 · Logic</span>
        </div>
        <div className="kc-studio-divider" />
        <span style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--text-primary)' }}>Invoice Approval</span>
        <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--teal-500)', background: 'var(--teal-50)', padding: '3px 6px', borderRadius: 'var(--r-xs)' }}>DETERMINISTIC</span>
        <span style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>v4 · last run 2m ago</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="kc-btn kc-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5v14l11-7z" /></svg>
            Test run
          </button>
          <button style={{ appearance: 'none', border: 0, height: 32, padding: '0 12px', borderRadius: 'var(--r-md)', background: 'var(--amber-500)', color: '#fff', font: '600 12.5px/1 var(--font-sans)', cursor: 'pointer' }}>Publish</button>
        </div>
      </div>

      <div className="kc-studio-canvas-layout">
        {/* Node palette */}
        <div className="kc-studio-palette">
          <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Triggers</div>
          {['Record Created', 'Record Updated', 'Webhook', 'Schedule'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 6, borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', font: '500 12.5px/1 var(--font-sans)', color: 'var(--text-primary)', cursor: 'grab' }}>
              <span style={{ width: 24, height: 24, borderRadius: 'var(--r-md)', background: 'var(--amber-50)', color: 'var(--amber-500)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>
              </span>
              {t}
            </div>
          ))}
          <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 16 }}>Actions</div>
          {['Send Email', 'Update Record', 'API Call', 'Wait / Delay', 'Notify Channel'].map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 6, borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', font: '500 12.5px/1 var(--font-sans)', color: 'var(--text-primary)', cursor: 'grab' }}>
              <span style={{ width: 24, height: 24, borderRadius: 'var(--r-md)', background: 'var(--fill-accent-subtle)', color: 'var(--accent-500)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </span>
              {t}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="kc-studio-canvas" style={{ padding: 40 }}>
          {/* Workflow nodes */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap' }}>
            <WorkflowNode kind="Trigger" title="New Invoice Created" detail="res.invoice · on_create" color="var(--amber-500)" tint="var(--amber-50)" />
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', marginTop: 36 }}>
              <svg width="32" height="16" viewBox="0 0 32 16"><path d="M0 8h28" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M24 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></svg>
            </div>
            <WorkflowNode kind="Condition" title="Amount > Rp 5.000.000?" detail="yes → approve · no → auto-post" color="var(--text-muted)" tint="var(--fill-subtle)" />
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', marginTop: 36 }}>
              <svg width="32" height="16" viewBox="0 0 32 16"><path d="M0 8h28" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M24 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></svg>
            </div>
            <WorkflowNode kind="Approval" title="Request Manager Approval" detail="Budi S. · 24h SLA" color="var(--accent-500)" tint="var(--fill-accent-subtle)" />
          </div>
          <div style={{ position: 'absolute', left: 16, bottom: 16, font: '400 10px/1 var(--font-mono)', color: 'var(--text-muted)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-sm)', padding: '4px 8px' }}>click a node to edit · drag from palette to add</div>
        </div>

        {/* Properties panel placeholder */}
        <div className="kc-studio-props" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--r-xl)', background: 'var(--fill-subtle)', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4 1.65 1.65 0 0 0 14 20.91V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15 1.65 1.65 0 0 0 3.17 14H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9 1.65 1.65 0 0 0 20.91 10H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </div>
          <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)', textAlign: 'center' }}>Select a node on the canvas to edit its properties.</p>
        </div>
      </div>
    </div>
  );
}

function WorkflowNode({ kind, title, detail, color, tint }: { kind: string; title: string; detail: string; color: string; tint: string }) {
  return (
    <div style={{ width: 180, borderRadius: 'var(--r-xl)', background: 'var(--bg-surface)', border: '2px solid var(--border-subtle)', padding: 12, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
      <span style={{ font: '700 9px/1 var(--font-mono)', color, background: tint, padding: '3px 6px', borderRadius: 'var(--r-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kind}</span>
      <div style={{ font: '600 12.5px/1.4 var(--font-sans)', color: 'var(--text-primary)', marginTop: 8 }}>{title}</div>
      <div style={{ font: '400 10.5px/1.3 var(--font-mono)', color: 'var(--text-muted)', marginTop: 4 }}>{detail}</div>
    </div>
  );
}

/* ─── No-Code App Builder View ─── */
function BuilderView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="kc-studio-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="kc-studio-nav-dot" style={{ background: 'var(--amber-500)' }} />
          <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--amber-500)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Layer 2 · Logic</span>
        </div>
        <div className="kc-studio-divider" />
        <span style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--text-primary)' }}>Expense Claim · New Request</span>
        <span style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>screen 1 of 3</span>
        <div style={{ marginLeft: 'auto' }}>
          <button style={{ appearance: 'none', border: 0, height: 32, padding: '0 12px', borderRadius: 'var(--r-md)', background: 'var(--amber-500)', color: '#fff', font: '600 12.5px/1 var(--font-sans)', cursor: 'pointer' }}>Save app</button>
        </div>
      </div>

      <div className="kc-studio-canvas-layout">
        {/* Component library */}
        <div className="kc-studio-palette" style={{ width: 210 }}>
          <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Inputs</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {['Text Field', 'Number', 'Select', 'Date', 'Checkbox', 'Upload'].map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 4px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', font: '500 11px/1.2 var(--font-sans)', color: 'var(--text-secondary)', textAlign: 'center', cursor: 'grab' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 15h10" /></svg>
                {c}
              </div>
            ))}
          </div>
          <div style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Data &amp; Display</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['Table', 'Chart', 'Card', 'Image'].map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 4px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', font: '500 11px/1.2 var(--font-sans)', color: 'var(--text-secondary)', textAlign: 'center', cursor: 'grab' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" /></svg>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="kc-studio-canvas" style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px' }}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-2xl)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
              <div style={{ height: 48, background: 'var(--bg-inverted)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                <span style={{ width: 24, height: 24, borderRadius: 'var(--r-md)', background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', color: '#fff', font: '700 11px/1 var(--font-sans)' }}>E</span>
                <span style={{ color: '#fff', font: '600 13px/1 var(--font-sans)' }}>New Expense Claim</span>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <CanvasField label="Purpose" placeholder="Business trip to Jakarta" bind="res.expense.name" />
                <CanvasField label="Category" placeholder="Travel" kind="select" bind="res.expense.category_id" />
                <CanvasField label="Amount (IDR)" placeholder="0" kind="number" bind="res.expense.amount" />
                <CanvasField label="Receipt" placeholder="Drop file or click to upload" kind="upload" />
                <div style={{ height: 40, borderRadius: 'var(--r-md)', background: 'var(--accent-600)', color: '#fff', display: 'grid', placeItems: 'center', font: '600 13px/1 var(--font-sans)', cursor: 'pointer' }}>Submit Claim</div>
                <div style={{ borderRadius: 'var(--r-lg)', border: '2px dashed var(--border-subtle)', padding: 16, display: 'grid', placeItems: 'center', font: '400 12px/1 var(--font-mono)', color: 'var(--text-muted)' }}>+ drop component here</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data binding panel */}
        <div className="kc-studio-props">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 48, borderBottom: '1px solid var(--border-subtle)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal-500)" strokeWidth="1.8"><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>
            <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--text-primary)' }}>Data Binding</span>
          </div>
          <div style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--r-xl)', background: 'var(--fill-subtle)', display: 'grid', placeItems: 'center', margin: '0 auto 12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.6"><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>
            </div>
            <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>Select a component on the canvas to bind it to a Layer-1 schema.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CanvasField({ label, placeholder, kind = 'text', bind }: { label: string; placeholder: string; kind?: string; bind?: string }) {
  const fieldStyle: React.CSSProperties = {
    height: kind === 'upload' ? 64 : 36,
    padding: '0 12px',
    borderRadius: 'var(--r-md)',
    border: `1px solid ${kind === 'upload' ? 'var(--border-subtle)' : 'var(--border-subtle)'}`,
    borderStyle: kind === 'upload' ? 'dashed' : 'solid',
    background: 'var(--bg-canvas)',
    display: kind === 'upload' ? 'grid' : 'flex',
    placeItems: kind === 'upload' ? 'center' : undefined,
    alignItems: kind === 'upload' ? undefined : 'center',
    justifyContent: kind === 'select' ? 'space-between' : undefined,
    font: `400 12.5px/1 ${kind === 'number' ? 'var(--font-mono)' : 'var(--font-sans)'}`,
    color: 'var(--text-muted)',
  };

  return (
    <div>
      <label style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        {label}
        {bind && (
          <span style={{ color: 'var(--teal-500)', fontWeight: 500, textTransform: 'none', letterSpacing: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>
            {bind}
          </span>
        )}
      </label>
      <div style={fieldStyle}>
        {placeholder}
        {kind === 'select' && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        )}
      </div>
    </div>
  );
}
