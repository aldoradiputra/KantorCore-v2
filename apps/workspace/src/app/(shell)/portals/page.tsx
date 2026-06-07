import type { ReactNode } from 'react';

/**
 * Portals surface — external-facing sites (HANDOFF.md §0): what vendors,
 * clients and job applicants see on the web. Landing view that establishes
 * the route as a real navigation target for the Bento Launcher.
 */

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
  return (
    <div>
      <div className="kc-page-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--r-xl)', background: TINT, color: ACCENT, display: 'grid', placeItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10a8 6 0 0116 0v10" /><path d="M9 20v-7a3 2.5 0 016 0v7" /></svg>
          </div>
          <div>
            <div className="kc-page-title">Portals</div>
            <div className="kc-page-sub">External vendor &amp; client sites · the web-facing edge of your workspace</div>
          </div>
        </div>
        <div className="kc-spacer" />
        <span className="kc-badge" style={{ background: TINT, color: ACCENT }}>Public surface</span>
      </div>

      <div className="kc-content">
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
  );
}
