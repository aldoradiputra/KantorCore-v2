'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useAvailableTenants } from '@/lib/useTenants';
import { resolveContextsAcross, type ResolvedContext } from '@/lib/corporate';
import { daysRemaining } from '@/lib/trial';

const shortCompany = (name: string) => name.replace(/^PT\s+/, '');

/** Deterministic pseudo-count so each branch's links look distinct but stable. */
function seed(contextId: string): number {
  let h = 0;
  for (let i = 0; i < contextId.length; i++) h = (h * 31 + contextId.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function channelsFor(): string[] {
  return ['general', 'pengumuman', 'finance'];
}

function recordsFor(contextId: string): { label: string; count: number }[] {
  const s = seed(contextId);
  return [
    { label: 'CRM Leads', count: 4 + (s % 18) },
    { label: 'Deals', count: 2 + (s % 11) },
    { label: 'Invoices', count: 12 + (s % 60) },
    { label: 'Tasks', count: 1 + (s % 9) },
  ];
}

export function Sidebar() {
  const tenants = useAvailableTenants();
  const selectedContexts = useWorkspaceStore((s) => s.selectedContexts);
  const tenantStatus = useWorkspaceStore((s) => s.tenantStatus);
  const trialEndsAt = useWorkspaceStore((s) => s.trialEndsAt);

  const resolved = resolveContextsAcross(tenants, selectedContexts);

  // Accordion open-state per context; first active entity expanded by default.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const isOpen = (id: string, idx: number) => expanded[id] ?? idx === 0;
  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !(p[id] ?? false) }));

  return (
    <aside className="kc-side">
      <div className="kc-side-top" style={{ flexShrink: 0 }}>
        <div className="kc-side-title">Workspaces</div>
        <span className="kc-side-code">{resolved.length} aktif</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '6px 0' }}>
        {resolved.length === 0 && (
          <div style={{ padding: '20px 16px', font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>
            Belum ada environment aktif. Pilih dari context switcher di atas.
          </div>
        )}

        {resolved.map((rc, idx) => (
          <AccordionSection key={rc.id} ctx={rc} open={isOpen(rc.id, idx)} onToggle={() => toggle(rc.id)} />
        ))}
      </div>

      {tenantStatus === 'trial' && <TrialBanner endsAt={trialEndsAt} />}
      {tenantStatus === 'expired' && <ExpiredBanner />}
    </aside>
  );
}

function AccordionSection({ ctx, open, onToggle }: { ctx: ResolvedContext; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ padding: '0 8px', marginBottom: 2 }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px',
          border: 0, background: 'transparent', borderRadius: 'var(--r-sm)', cursor: 'pointer', textAlign: 'left',
        }}
        className="kc-side-accordion"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', flexShrink: 0, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform var(--d-fast)' }}><polyline points="9 18 15 12 9 6" /></svg>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ font: '600 12px/1.3 var(--font-sans)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {shortCompany(ctx.company.name)}
          </div>
          <div style={{ font: '500 10px/1.2 var(--font-mono)', color: 'var(--text-muted)' }}>{ctx.branch.name} · {ctx.branch.code}</div>
        </div>
        <span className="kc-tag" style={{ height: 18, fontSize: 10 }}>{ctx.branch.role}</span>
      </button>

      {open && (
        <div style={{ paddingLeft: 8 }}>
          <div className="kc-side-h">Channels</div>
          {channelsFor().map((ch) => (
            <a key={ch} className="kc-side-item" href="#" onClick={(e) => e.preventDefault()}>
              <span className="kc-side-kind" style={{ font: '600 13px/1 var(--font-mono)', color: 'var(--text-muted)' }}>#</span>
              <span>{ch}</span>
            </a>
          ))}
          <div className="kc-side-h">Records</div>
          {recordsFor(ctx.id).map((rec) => (
            <a key={rec.label} className="kc-side-item" href="#" onClick={(e) => e.preventDefault()}>
              <span>{rec.label}</span>
              <span className="kc-side-count">{rec.count}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function TrialBanner({ endsAt }: { endsAt: string | null }) {
  const router = useRouter();
  const [days, setDays] = useState<number | null>(null);

  // Compute on client only to avoid SSR/hydration drift from Date.now().
  useEffect(() => { setDays(daysRemaining(endsAt)); }, [endsAt]);

  return (
    <div style={{ flexShrink: 0, padding: 12, borderTop: '1px solid var(--border-subtle)', background: 'var(--fill-accent-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 11px/1 var(--font-sans)', color: 'var(--text-accent)', letterSpacing: '0.02em' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        Trial Mode
      </div>
      <div style={{ margin: '6px 0 10px', font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-secondary)' }}>
        {days ?? '—'} days remaining
      </div>
      <button type="button" onClick={() => router.push('/onboarding')} className="kc-btn kc-btn-primary kc-btn-sm" style={{ width: '100%' }}>
        Upgrade to Pro
      </button>
    </div>
  );
}

function ExpiredBanner() {
  return (
    <div style={{ flexShrink: 0, padding: 12, borderTop: '1px solid var(--border-subtle)', background: 'var(--state-danger-bg)' }}>
      <div style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--state-danger)' }}>Trial berakhir</div>
      <div style={{ margin: '6px 0 10px', font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-secondary)' }}>Upgrade untuk melanjutkan akses.</div>
      <button type="button" className="kc-btn kc-btn-danger kc-btn-sm" style={{ width: '100%' }}>Upgrade to Pro</button>
    </div>
  );
}
