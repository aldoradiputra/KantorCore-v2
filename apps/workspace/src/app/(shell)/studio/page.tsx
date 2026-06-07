import type { ReactNode } from 'react';

/**
 * Studio surface — the no-code / low-code environment (HANDOFF.md §0).
 * Landing view that establishes the route as a real navigation target for the
 * Bento Launcher. The individual builders (Logic Orchestrator, App Builder,
 * API & Data Core) are follow-up work; this page frames them.
 */

const ACCENT = 'var(--amber-500)';
const TINT = 'var(--amber-50)';

interface Tool {
  name: string;
  desc: string;
  code: string;
  icon: ReactNode;
}

const tools: Tool[] = [
  {
    name: 'Logic Orchestrator',
    desc: 'Visual workflow builder — triggers, conditions, approvals and actions over your Layer-1 models.',
    code: 'L2 · WORKFLOWS',
    icon: <><circle cx="6" cy="6" r="2.6" /><circle cx="18" cy="6" r="2.6" /><circle cx="12" cy="18" r="2.6" /><path d="M8.5 6h7M6 8.5l4.5 7.5M18 8.5l-4.5 7.5" /></>,
  },
  {
    name: 'No-Code App Builder',
    desc: 'Compose internal apps from components and bind each field to a schema in the data core.',
    code: 'L2 · APPS',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  },
  {
    name: 'API & Data Core',
    desc: 'Database schemas, API keys, webhook health and the live event-log console.',
    code: 'L1 · CORE',
    icon: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  },
  {
    name: 'System Architecture',
    desc: 'A live map of installed modules, workflows and schemas — generated from the registry + binding graph.',
    code: 'L3→L1 · MAP',
    icon: <><rect x="3" y="3" width="18" height="5" rx="1.5" /><rect x="3" y="10" width="18" height="5" rx="1.5" /><rect x="3" y="17" width="18" height="4" rx="1.5" /></>,
  },
];

export default function StudioPage() {
  return (
    <div>
      <div className="kc-page-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-xl)', background: TINT, color: ACCENT, display: 'grid', placeItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.6" /><circle cx="18" cy="6" r="2.6" /><circle cx="12" cy="18" r="2.6" /><path d="M8.5 6h7M6 8.5l4.5 7.5M18 8.5l-4.5 7.5" /></svg>
          </div>
          <div>
            <div className="kc-page-title">Studio</div>
            <div className="kc-page-sub">No-Code app &amp; workflow builder · configure AI logic, design apps, wire schemas</div>
          </div>
        </div>
        <div className="kc-spacer" />
        <span className="kc-badge" style={{ background: TINT, color: ACCENT }}>Admin surface</span>
      </div>

      <div className="kc-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              className="kc-card"
              style={{ ['--c' as string]: ACCENT, padding: 20, cursor: 'pointer', transition: 'border-color var(--d-fast), box-shadow var(--d-fast)' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 'var(--r-lg)', background: TINT, color: ACCENT, display: 'grid', placeItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
              </div>
              <div style={{ margin: '14px 0 4px', font: '700 15px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{t.name}</div>
              <div style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>{t.desc}</div>
              <div style={{ marginTop: 14, font: '600 10px/1 var(--font-mono)', letterSpacing: '0.06em', color: ACCENT, background: TINT, display: 'inline-block', padding: '4px 7px', borderRadius: 'var(--r-sm)' }}>{t.code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
