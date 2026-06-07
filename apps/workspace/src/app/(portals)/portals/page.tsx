'use client';

import type { ReactNode } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const ACCENT = 'var(--teal-500)';
const TINT = 'var(--teal-50)';

interface Portal {
  name: string;
  desc: string;
  audience: string;
  status: 'Live' | 'Draft';
  icon: ReactNode;
}

const portals: Portal[] = [
  {
    name: 'Customer Portal',
    desc: 'Self-service home: invoices, orders and magic-link access for your clients.',
    audience: 'Clients',
    status: 'Live',
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
  },
  {
    name: 'Vendor Portal',
    desc: 'Purchase orders, delivery confirmations and payment status for suppliers.',
    audience: 'Vendors',
    status: 'Live',
    icon: <><rect x="1" y="3" width="15" height="13" rx="1.5" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
  },
  {
    name: 'Careers / Applicant',
    desc: 'Public job board and the applicant tracking landing for new candidates.',
    audience: 'Applicants',
    status: 'Draft',
    icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  },
  {
    name: 'Knowledge Base',
    desc: 'Public KMS articles and help center, scoped per branch and brand.',
    audience: 'Public',
    status: 'Live',
    icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  },
];

export default function PortalsPage() {
  const setBentoOpen = useWorkspaceStore((s) => s.setBentoOpen);
  const user = useWorkspaceStore((s) => s.user);

  const initials = user?.initials ?? 'RH';

  return (
    <div style={{ height: '100vh', display: 'grid', gridTemplateColumns: '248px 1fr', overflow: 'hidden', background: 'var(--bg-canvas)' }}>
      {/* ─── Sidebar ─── */}
      <aside className="kc-studio-side">
        <div className="kc-studio-brand">
          <div className="kc-studio-brand-mark">K</div>
          <div>
            <div className="kc-studio-brand-name">KantorCore</div>
            <div className="kc-studio-brand-label" style={{ color: ACCENT }}>Portals</div>
          </div>
          <span className="kc-badge" style={{ background: TINT, color: ACCENT, fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>PUBLIC</span>
        </div>

        <nav className="kc-studio-nav">
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Active Portals</div>
            {portals.filter((p) => p.status === 'Live').map((p) => (
              <button key={p.name} className="kc-studio-nav-item">
                <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{p.icon}</svg>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Drafts</div>
            {portals.filter((p) => p.status === 'Draft').map((p) => (
              <button key={p.name} className="kc-studio-nav-item">
                <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">{p.icon}</svg>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Settings</div>
            <button className="kc-studio-nav-item">
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></svg>
              <span>Access &amp; Domains</span>
            </button>
            <button className="kc-studio-nav-item">
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              <span>Portal Settings</span>
            </button>
          </div>
        </nav>

        <div className="kc-studio-user">
          <div className="kc-studio-avatar">{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div className="kc-studio-uname">{user?.name ?? 'Rangga H.'}</div>
            <div className="kc-studio-urole">Platform Admin</div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        {/* Header */}
        <header className="kc-studio-header">
          <button className="kc-studio-bento" title="Open launcher" aria-label="Open application launcher" onClick={() => setBentoOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /></svg>
          </button>
          <div className="kc-studio-divider" />
          <div className="kc-studio-crumb">
            <span className="kc-studio-crumb-root">Portals</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><path d="M9 6l6 6-6 6" /></svg>
            <span className="kc-studio-crumb-page">Overview</span>
          </div>
          <div style={{ flex: 1 }} />
          <span className="kc-badge" style={{ background: TINT, color: ACCENT }}>Public surface</span>
        </header>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ font: '700 20px/1.3 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Portals</h1>
              <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>External vendor &amp; client sites — the web-facing edge of your workspace.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {portals.map((p) => (
                <div
                  key={p.name}
                  className="kc-card"
                  style={{ ['--c' as string]: ACCENT, padding: 20, cursor: 'pointer', transition: 'border-color var(--d-fast), box-shadow var(--d-fast)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 'var(--r-lg)', background: TINT, color: ACCENT, display: 'grid', placeItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                    </div>
                    <span className={`kc-badge ${p.status === 'Live' ? 'kc-badge-success' : ''}`} style={p.status === 'Draft' ? { background: 'var(--fill-subtle)', color: 'var(--text-muted)' } : undefined}>{p.status}</span>
                  </div>
                  <div style={{ margin: '14px 0 4px', font: '700 15px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{p.name}</div>
                  <div style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>{p.desc}</div>
                  <div style={{ marginTop: 14, font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>Audience · {p.audience}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
