'use client';

import { useState } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

type PortalView = 'directory' | 'detail' | 'builder';
type PortalKey = 'customer' | 'vendor' | 'kms' | 'careers';
type DetailTab = 'general' | 'branding' | 'access' | 'domain' | 'analytics';
type Device = 'desktop' | 'tablet' | 'mobile';

interface PortalData {
  name: string;
  url: string;
  desc: string;
  audience: string;
  status: 'Live' | 'Draft';
  icon: React.ReactNode;
}

const PORTALS: Record<PortalKey, PortalData> = {
  customer: {
    name: 'Customer Portal',
    url: 'acme.kantor.id',
    desc: 'Self-service home — invoices, support tickets and the knowledge base for your clients.',
    audience: 'Clients',
    status: 'Live',
    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  },
  vendor: {
    name: 'Vendor Portal',
    url: 'vendor.acme.kantor.id',
    desc: 'PO acknowledgement, delivery scheduling and payment status for your suppliers.',
    audience: 'Vendors',
    status: 'Live',
    icon: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
  },
  kms: {
    name: 'Knowledge Base',
    url: 'help.acme.kantor.id',
    desc: 'Public help center — searchable articles in Bahasa Indonesia, no login required.',
    audience: 'Public',
    status: 'Live',
    icon: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  },
  careers: {
    name: 'Careers',
    url: '— not published',
    desc: 'Public job board and application intake for applicants. Drafted, not yet live.',
    audience: 'Applicants',
    status: 'Draft',
    icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  },
};

const PORTAL_KEYS: PortalKey[] = ['customer', 'vendor', 'kms', 'careers'];
const DETAIL_TABS: { id: DetailTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'branding', label: 'Branding' },
  { id: 'access', label: 'Access Control' },
  { id: 'domain', label: 'Domain' },
  { id: 'analytics', label: 'Analytics' },
];

const ACCENT = 'var(--teal-500)';
const TINT = 'var(--teal-50)';

export default function PortalsPage() {
  const [view, setView] = useState<PortalView>('directory');
  const [activePortal, setActivePortal] = useState<PortalKey>('customer');
  const [detailTab, setDetailTab] = useState<DetailTab>('general');
  const [device, setDevice] = useState<Device>('desktop');
  const [statusMode, setStatusMode] = useState<'live' | 'draft' | 'off'>('live');
  const setBentoOpen = useWorkspaceStore((s) => s.setBentoOpen);
  const user = useWorkspaceStore((s) => s.user);

  const initials = user?.initials ?? 'RH';
  const portal = PORTALS[activePortal];

  function openDetail(key: PortalKey, tab?: DetailTab) {
    setActivePortal(key);
    setDetailTab(tab ?? 'general');
    setView('detail');
  }

  const crumbLabel =
    view === 'directory' ? 'Overview' :
    view === 'builder' ? 'Builder preview' :
    portal.name;

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
          <span className="kc-badge" style={{ background: TINT, color: ACCENT, fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 600, marginLeft: 'auto' }}>PUBLIC</span>
        </div>

        <nav className="kc-studio-nav">
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Active Portals</div>
            {PORTAL_KEYS.filter((k) => PORTALS[k].status === 'Live').map((k) => (
              <button key={k} className={`kc-studio-nav-item${view === 'detail' && activePortal === k ? ' is-active' : ''}`} onClick={() => openDetail(k)}>
                <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{PORTALS[k].icon}</svg>
                <span>{PORTALS[k].name}</span>
                <span className="kc-nav-st kc-nav-st-live" />
              </button>
            ))}
          </div>
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Drafts</div>
            {PORTAL_KEYS.filter((k) => PORTALS[k].status === 'Draft').map((k) => (
              <button key={k} className={`kc-studio-nav-item${view === 'detail' && activePortal === k ? ' is-active' : ''}`} onClick={() => openDetail(k)}>
                <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{PORTALS[k].icon}</svg>
                <span>{PORTALS[k].name}</span>
                <span className="kc-nav-st kc-nav-st-draft" />
              </button>
            ))}
          </div>
          <div className="kc-studio-nav-section">
            <div className="kc-studio-nav-h">Settings</div>
            <button className="kc-studio-nav-item" onClick={() => { openDetail('customer', 'access'); }}>
              <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></svg>
              <span>Access &amp; Domains</span>
            </button>
            <button className="kc-studio-nav-item" onClick={() => { openDetail('customer', 'general'); }}>
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
      <div className="kc-studio-main">
        <header className="kc-studio-header">
          <button className="kc-studio-bento" title="Open launcher" aria-label="Open application launcher" onClick={() => setBentoOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /></svg>
          </button>
          <div className="kc-studio-divider" />
          <div className="kc-studio-crumb">
            <button className="kc-studio-crumb-root" style={{ border: 0, background: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }} onClick={() => setView('directory')}>Portals</button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><path d="M9 6l6 6-6 6" /></svg>
            <span className="kc-studio-crumb-page">{crumbLabel}</span>
          </div>
          <div style={{ flex: 1 }} />
          <span className="kc-badge" style={{ background: 'var(--state-success-bg)', color: 'var(--state-success)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />3 Live
          </span>
          <span className="kc-badge" style={{ background: 'var(--state-warn-bg)', color: 'var(--state-warn)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />1 Draft
          </span>
          <div className="kc-studio-divider" />
          <button className="kc-btn kc-btn-secondary kc-btn-sm" onClick={() => { setActivePortal('customer'); setView('builder'); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            Preview builder
          </button>
        </header>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {view === 'directory' && <DirectoryView onOpen={openDetail} />}
          {view === 'detail' && <DetailView portal={portal} activePortal={activePortal} detailTab={detailTab} setDetailTab={setDetailTab} statusMode={statusMode} setStatusMode={setStatusMode} onBack={() => setView('directory')} />}
          {view === 'builder' && <BuilderView portal={portal} device={device} setDevice={setDevice} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Directory View ─── */
function DirectoryView({ onOpen }: { onOpen: (k: PortalKey, tab?: DetailTab) => void }) {
  return (
    <div style={{ padding: '24px 28px 48px', maxWidth: 1160, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ font: '700 22px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0 0 4px' }}>Portals</h1>
          <p style={{ font: '400 13.5px/1.55 var(--font-sans)', color: 'var(--text-secondary)', margin: 0, maxWidth: '56ch' }}>
            External sites — the web-facing edge of your workspace. Configure, brand and monitor every portal your clients, vendors and applicants see.
          </p>
        </div>
        <button className="kc-btn kc-btn-primary" style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={() => onOpen('customer')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Portal
        </button>
      </div>

      <div className="kc-ptoolbar">
        <div className="kc-psearch">
          <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input className="kc-input" placeholder="Search portals…" />
        </div>
        <div className="kc-pspacer" />
        <span className="kc-chip kc-chip-active">All</span>
        <span className="kc-chip">Live</span>
        <span className="kc-chip">Draft</span>
      </div>

      <div className="kc-portal-grid">
        {PORTAL_KEYS.map((k) => {
          const p = PORTALS[k];
          return (
            <div key={k} className="kc-portal-card" onClick={() => onOpen(k)}>
              <div className="kc-pc-top">
                <div className="kc-pc-ic" style={p.status === 'Draft' ? { background: 'var(--state-warn-bg)', color: 'var(--state-warn)' } : undefined}>
                  <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="kc-pc-nm">{p.name}</div>
                  <div className="kc-pc-url">{p.url}</div>
                </div>
                <span className={`kc-badge ${p.status === 'Live' ? 'kc-badge-success' : 'kc-badge-warn'}`} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />{p.status}
                </span>
              </div>
              <div className="kc-pc-desc">{p.desc}</div>
              <div className="kc-pc-foot">
                <span className="kc-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                  {p.audience}
                </span>
              </div>
              <div className="kc-pc-actions">
                {p.status === 'Live' ? (
                  <>
                    <a className="kc-btn kc-btn-secondary kc-btn-sm" href="/portals/preview" target="_blank" onClick={(e) => e.stopPropagation()}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Open
                    </a>
                    <button className="kc-btn kc-btn-secondary kc-btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(k); }}>Settings</button>
                    <button className="kc-btn kc-btn-secondary kc-btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(k, 'analytics'); }}>Analytics</button>
                  </>
                ) : (
                  <>
                    <button className="kc-btn kc-btn-primary kc-btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(k); }}>Publish</button>
                    <button className="kc-btn kc-btn-secondary kc-btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(k); }}>Settings</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <button className="kc-portal-card kc-newcard" onClick={() => onOpen('customer')}>
          <div className="kc-nc-ring">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
          <div style={{ font: '600 13px/1.3 var(--font-sans)' }}>New Portal</div>
          <div style={{ font: '400 11.5px/1.4 var(--font-sans)', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '22ch' }}>Start from a template or a blank site</div>
        </button>
      </div>
    </div>
  );
}

/* ─── Detail View ─── */
function DetailView({ portal, activePortal, detailTab, setDetailTab, statusMode, setStatusMode, onBack }: {
  portal: PortalData; activePortal: PortalKey; detailTab: DetailTab;
  setDetailTab: (t: DetailTab) => void; statusMode: string;
  setStatusMode: (s: 'live' | 'draft' | 'off') => void; onBack: () => void;
}) {
  return (
    <div style={{ padding: '24px 28px 48px', maxWidth: 1160, margin: '0 auto' }}>
      <button className="kc-btn kc-btn-ghost kc-btn-sm" onClick={onBack} style={{ marginBottom: 14 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
        All portals
      </button>

      <div className="kc-detail-head">
        <div className="kc-dh-ic">
          <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{portal.icon}</svg>
        </div>
        <div>
          <h1>{portal.name}</h1>
          <div className="kc-dh-url">{portal.url}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="kc-status-seg">
            <button className={statusMode === 'live' ? 'on-live' : ''} onClick={() => setStatusMode('live')}><span className="kc-ss-dot" />Live</button>
            <button className={statusMode === 'draft' ? 'on-draft' : ''} onClick={() => setStatusMode('draft')}>Draft</button>
            <button className={statusMode === 'off' ? 'on-off' : ''} onClick={() => setStatusMode('off')}>Disabled</button>
          </div>
          <button className="kc-btn kc-btn-primary kc-btn-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            Save
          </button>
        </div>
      </div>

      <div className="kc-detail-tabs">
        {DETAIL_TABS.map((t) => (
          <button key={t.id} className={`kc-detail-tab${detailTab === t.id ? ' is-active' : ''}`} onClick={() => setDetailTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {detailTab === 'general' && <GeneralPanel />}
      {detailTab === 'branding' && <BrandingPanel />}
      {detailTab === 'access' && <AccessPanel />}
      {detailTab === 'domain' && <DomainPanel />}
      {detailTab === 'analytics' && <AnalyticsPanel />}
    </div>
  );
}

/* ─── Builder View ─── */
function BuilderView({ portal, device, setDevice }: { portal: PortalData; device: Device; setDevice: (d: Device) => void }) {
  return (
    <div style={{ height: 'calc(100vh - 52px)' }}>
      <div className="kc-builder">
        <div className="kc-builder-cfg">
          <h3>{portal.name}</h3>
          <p className="kc-bc-sub">Quick configuration. Full options in Settings.</p>
          <div className="kc-cfg-group">
            <div className="kc-cfg-label">Identity</div>
            <div className="kc-cfg-field"><div className="kc-cf-fl">Portal name</div><input className="kc-input kc-input-sm" defaultValue={portal.name} /></div>
            <div className="kc-cfg-field"><div className="kc-cf-fl">Tagline</div><input className="kc-input" defaultValue="Halo — welcome back." /></div>
          </div>
          <div className="kc-cfg-group">
            <div className="kc-cfg-label">Brand colour</div>
            <div className="kc-swatches">
              {['#0F7B6C', '#3B4FC4', '#B35A00', '#1A2B5A', '#B42318'].map((c) => (
                <div key={c} className={`kc-swatch${c === '#0F7B6C' ? ' sel' : ''}`} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="kc-cfg-group">
            <div className="kc-cfg-label">Modules shown</div>
            {['Invoices', 'Support tickets', 'Knowledge base', 'Documents'].map((m, i) => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', font: '500 13px/1.3 var(--font-sans)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked={i < 3} style={{ accentColor: ACCENT }} /> {m}
              </label>
            ))}
          </div>
          <button className="kc-btn kc-btn-primary" style={{ width: '100%' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            Apply &amp; save
          </button>
        </div>
        <div className="kc-preview-wrap">
          <div className="kc-preview-bar">
            <div className="kc-device-seg">
              {(['desktop', 'tablet', 'mobile'] as Device[]).map((d) => (
                <button key={d} className={device === d ? 'is-active' : ''} onClick={() => setDevice(d)} title={d}>
                  <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    {d === 'desktop' && <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>}
                    {d === 'tablet' && <rect x="4" y="2" width="16" height="20" rx="2" />}
                    {d === 'mobile' && <rect x="5" y="2" width="14" height="20" rx="2" />}
                  </svg>
                </button>
              ))}
            </div>
            <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{portal.url}</span>
            <div style={{ flex: 1 }} />
            <a className="kc-btn kc-btn-secondary kc-btn-sm" href="/portals/preview" target="_blank">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              Open in new tab
            </a>
          </div>
          <div className="kc-preview-stage">
            <div className={`kc-frame${device !== 'desktop' ? ` ${device}` : ''}`}>
              <div className="mock-top">
                <div className="mock-mk">A</div>
                <div className="mock-tn">PT Acme Indonesia</div>
                <nav><span className="on">Home</span><span>Invoices</span><span>Tickets</span><span>Help</span></nav>
              </div>
              <div className="mock-hero">
                <h2>Halo — welcome back.</h2>
                <p>Pay open invoices, raise a support ticket, or browse help articles in Bahasa Indonesia.</p>
              </div>
              <div className="mock-body">
                <div className="mock-card">
                  <div className="mock-h">Outstanding invoices · 2</div>
                  <div className="mock-line" style={{ width: '90%' }} />
                  <div className="mock-line" style={{ width: '70%' }} />
                  <div className="mock-line" style={{ width: '80%' }} />
                  <span className="mock-pill" style={{ marginTop: 6 }}>Pay now</span>
                </div>
                <div className="mock-card">
                  <div className="mock-h">Your tickets · 1 open</div>
                  <div className="mock-line" style={{ width: '85%' }} />
                  <div className="mock-line" style={{ width: '60%' }} />
                  <div className="mock-line" style={{ width: '75%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Tab Panels ─── */

function GeneralPanel() {
  return (
    <div className="kc-pblock">
      <h3>General</h3>
      <p className="kc-pb-sub">Basic identity and audience for this portal.</p>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Portal name</div><div className="kc-fr-help">Shown in the browser tab and admin lists.</div></div>
        <div className="kc-fr-ctl"><input className="kc-input" defaultValue="Customer Portal" /></div>
      </div>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Description</div><div className="kc-fr-help">Internal note — not shown to visitors.</div></div>
        <div className="kc-fr-ctl"><textarea className="kc-textarea" defaultValue="Self-service account home for PT Acme Indonesia clients — invoices, tickets and KB." /></div>
      </div>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Audience</div><div className="kc-fr-help">Who this portal is intended for.</div></div>
        <div className="kc-fr-ctl"><select className="kc-select" defaultValue="Clients"><option>Clients</option><option>Vendors</option><option>Applicants</option><option>Public</option></select></div>
      </div>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Default language</div><div className="kc-fr-help">Visitors can switch; this is the fallback.</div></div>
        <div className="kc-fr-ctl"><select className="kc-select" defaultValue="Bahasa Indonesia"><option>Bahasa Indonesia</option><option>English</option></select></div>
      </div>
    </div>
  );
}

function BrandingPanel() {
  return (
    <div className="kc-pblock">
      <h3>Branding</h3>
      <p className="kc-pb-sub">Make the portal feel like your client&apos;s own — your logo, your colour.</p>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Logo</div><div className="kc-fr-help">SVG or PNG, shown top-left. Max 1 MB.</div></div>
        <div className="kc-fr-ctl">
          <div className="kc-upload">
            <div className="kc-up-ph"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /></svg></div>
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 12.5px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>acme-logo.svg</div>
              <div style={{ font: '400 11px/1.3 var(--font-sans)', color: 'var(--text-muted)' }}>Uploaded · 24 KB</div>
            </div>
            <button className="kc-btn kc-btn-secondary kc-btn-sm">Replace</button>
          </div>
        </div>
      </div>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Primary colour</div><div className="kc-fr-help">CTA buttons, links and accents.</div></div>
        <div className="kc-fr-ctl">
          <div className="kc-swatches">
            {['#0F7B6C', '#3B4FC4', '#B35A00', '#1A2B5A', '#B42318', '#7A3FAA'].map((c, i) => (
              <div key={c} className={`kc-swatch${i === 0 ? ' sel' : ''}`} style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
      <div className="kc-form-row">
        <div className="kc-fr-lbl"><div className="kc-fr-nm">Custom CSS</div><div className="kc-fr-help">Advanced — inject your own stylesheet.</div></div>
        <div className="kc-fr-ctl" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" style={{ accentColor: 'var(--teal-500)' }} />
          <span style={{ font: '400 12.5px/1.4 var(--font-sans)', color: 'var(--text-secondary)' }}>Disabled — using KantorCore theme</span>
        </div>
      </div>
    </div>
  );
}

function AccessPanel() {
  return (
    <>
      <div className="kc-pblock">
        <h3>Authentication</h3>
        <p className="kc-pb-sub">How visitors prove who they are.</p>
        <div className="kc-radio-row sel"><input type="radio" name="auth" defaultChecked /><div><div className="kc-rr-t">Magic link (passwordless)</div><div className="kc-rr-d">Visitors receive a one-time signed link by email. Recommended for clients.</div></div></div>
        <div className="kc-radio-row"><input type="radio" name="auth" /><div><div className="kc-rr-t">Single sign-on (SSO)</div><div className="kc-rr-d">Delegate to the visitor&apos;s identity provider via SAML / OIDC.</div></div></div>
        <div className="kc-radio-row"><input type="radio" name="auth" /><div><div className="kc-rr-t">Public — no authentication</div><div className="kc-rr-d">Anyone with the URL can view. Use for the public knowledge base only.</div></div></div>
      </div>
      <div className="kc-pblock">
        <h3>IP allowlist</h3>
        <p className="kc-pb-sub">Optional — restrict access to specific networks.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[{ cidr: '103.94.12.0/24', label: 'Jakarta HQ' }, { cidr: '202.158.0.0/16', label: 'Telkom range' }].map((ip) => (
            <div key={ip.cidr} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 11px', background: 'var(--bg-sunken)', borderRadius: 'var(--r-sm)', font: '500 12px/1 var(--font-mono)' }}>
              {ip.cidr}
              <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', font: '400 11px/1 var(--font-sans)' }}>{ip.label}</span>
            </div>
          ))}
        </div>
        <button className="kc-btn kc-btn-secondary kc-btn-sm" style={{ marginTop: 10 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add CIDR range
        </button>
      </div>
      <div className="kc-pblock">
        <h3>Role mapping</h3>
        <p className="kc-pb-sub">Map a portal visitor to a workspace partner record.</p>
        <div className="kc-form-row">
          <div className="kc-fr-lbl"><div className="kc-fr-nm">Visitor role</div><div className="kc-fr-help">Applied to authenticated sessions.</div></div>
          <div className="kc-fr-ctl"><select className="kc-select" defaultValue="Portal Client (read-only)"><option>Portal Client (read-only)</option><option>Portal Vendor</option><option>Portal Editor</option></select></div>
        </div>
      </div>
    </>
  );
}

function DomainPanel() {
  return (
    <>
      <div className="kc-pblock">
        <h3>Custom domain</h3>
        <p className="kc-pb-sub">Serve the portal from your own domain instead of *.kantor.id.</p>
        <div className="kc-form-row">
          <div className="kc-fr-lbl"><div className="kc-fr-nm">Domain</div><div className="kc-fr-help">Point a CNAME at portals.kantor.id.</div></div>
          <div className="kc-fr-ctl" style={{ display: 'flex', gap: 8 }}><input className="kc-input" defaultValue="acme.kantor.id" style={{ flex: 1 }} /><button className="kc-btn kc-btn-secondary kc-btn-sm">Verify</button></div>
        </div>
        <div className="kc-form-row">
          <div className="kc-fr-lbl"><div className="kc-fr-nm">SSL certificate</div><div className="kc-fr-help">Auto-provisioned via Let&apos;s Encrypt.</div></div>
          <div className="kc-fr-ctl">
            <span className="kc-badge kc-badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Active · renews 14 Aug 2026
            </span>
          </div>
        </div>
      </div>
      <div className="kc-pblock">
        <h3>DNS verification</h3>
        <p className="kc-pb-sub">Add these records at your DNS provider, then re-check.</p>
        <div className="kc-dns-row"><span className="kc-dr-k">CNAME</span><span className="kc-dr-v">acme.kantor.id</span><span className="kc-dr-v" style={{ color: 'var(--text-muted)' }}>→ portals.kantor.id</span></div>
        <div className="kc-dns-row"><span className="kc-dr-k">TXT</span><span className="kc-dr-v">_kc-verify</span><span className="kc-dr-v" style={{ color: 'var(--text-muted)' }}>kc-site=8f3a…c1</span></div>
        <div className="kc-checklist" style={{ marginTop: 12 }}>
          <div className="kc-check-row"><span className="kc-ck done"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg></span>CNAME record found<span className="kc-cr-meta">verified 2d ago</span></div>
          <div className="kc-check-row"><span className="kc-ck done"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg></span>TXT ownership record found<span className="kc-cr-meta">verified 2d ago</span></div>
          <div className="kc-check-row"><span className="kc-ck done"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polyline points="20 6 9 17 4 12" /></svg></span>SSL certificate issued<span className="kc-cr-meta">active</span></div>
          <div className="kc-check-row"><span className="kc-ck wait"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></span>CAA record (optional)<span className="kc-cr-meta">not set</span></div>
        </div>
      </div>
    </>
  );
}

function AnalyticsPanel() {
  return (
    <>
      <div className="kc-stat-row">
        <div className="kc-stat"><div className="kc-st-k">Visitors · 30d</div><div className="kc-st-v">12,480</div><div className="kc-st-d kc-st-up">↑ 8.2% vs prev</div></div>
        <div className="kc-stat"><div className="kc-st-k">Active sessions</div><div className="kc-st-v">37</div><div className="kc-st-d" style={{ color: 'var(--text-muted)' }}>live now</div></div>
        <div className="kc-stat"><div className="kc-st-k">Avg. session</div><div className="kc-st-v">4:12</div><div className="kc-st-d" style={{ color: 'var(--text-muted)' }}>min:sec</div></div>
        <div className="kc-stat"><div className="kc-st-k">Bounce rate</div><div className="kc-st-v">28%</div><div className="kc-st-d kc-st-up">↓ 3.1%</div></div>
      </div>
      <div className="kc-pblock">
        <h3>Visitors</h3>
        <p className="kc-pb-sub">Daily unique visitors over the last 14 days.</p>
        <div className="kc-bars">
          {[42, 55, 48, 67, 72, 60, 78, 85, 70, 92, 88, 76, 95, 82].map((h, i) => (
            <div key={i} className="kc-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="kc-pblock">
        <h3>Most-visited pages</h3>
        <p className="kc-pb-sub">Where visitors spend their time.</p>
        <div className="kc-pagelist">
          {[
            { path: '/invoices', pct: 92, n: '4,210' },
            { path: '/tickets', pct: 64, n: '2,940' },
            { path: '/kb/bpjs-sync', pct: 48, n: '2,180' },
            { path: '/ (home)', pct: 36, n: '1,640' },
            { path: '/kb/qris-payment', pct: 22, n: '1,010' },
          ].map((row) => (
            <div key={row.path} className="kc-pl-row">
              <span className="kc-pl-pth">{row.path}</span>
              <span className="kc-pl-meter"><i style={{ width: `${row.pct}%` }} /></span>
              <span className="kc-pl-n">{row.n}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
