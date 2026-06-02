'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockConglomerate } from '@/mocks/corporate';
import { allContextIds, companyContextIds, makeContextId } from '@/lib/corporate';
import { Checkbox } from '@/components/ui/Checkbox';
import type { CompanyTier } from '@/types/auth';

const TIER_LABEL: Record<CompanyTier, string> = {
  free: 'Free',
  business: 'Business',
  enterprise: 'Enterprise',
};

function maskNik(nik: string) {
  return `•••• •••• •••• ${nik.slice(-4)}`;
}

export default function OnboardingPage() {
  const router = useRouter();
  const user = useWorkspaceStore((s) => s.user);
  const storedContexts = useWorkspaceStore((s) => s.selectedContexts);
  const setSelectedContexts = useWorkspaceStore((s) => s.setSelectedContexts);

  const everyContextId = useMemo(() => allContextIds(mockConglomerate), []);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(storedContexts));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCompany(ids: string[]) {
    setSelected((prev) => {
      const next = new Set(prev);
      const all = ids.every((id) => next.has(id));
      ids.forEach((id) => (all ? next.delete(id) : next.add(id)));
      return next;
    });
  }

  function enterWorkspace() {
    const ordered = everyContextId.filter((id) => selected.has(id));
    setSelectedContexts(ordered);
    router.push('/');
  }

  const count = selected.size;

  return (
    <>
      {/* Slim top bar */}
      <header style={{ height: 'var(--topbar-h)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 10 }}>
        <img src="/assets/logo.svg" alt="" style={{ width: 22, height: 22 }} />
        <strong style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>KantorCore</strong>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ textAlign: 'right', lineHeight: 1.25 }}>
            <div style={{ font: '600 12px/1.2 var(--font-sans)', color: 'var(--text-primary)' }}>{user?.name ?? 'Pengguna'}</div>
            <div className="kc-mono" style={{ font: '400 10px/1.2 var(--font-mono)', color: 'var(--text-muted)' }}>NIK {user ? maskNik(user.nik) : '—'}</div>
          </div>
          <div className="kc-avatar kc-avatar-md">{user?.initials ?? '–'}</div>
          <a href="/login" style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-secondary)' }}>Keluar</a>
        </div>
      </header>

      {/* Centered selection panel */}
      <main style={{ flex: 1, overflow: 'auto', padding: '40px 24px 120px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="t-micro" style={{ color: 'var(--text-accent)' }}>Langkah 2 dari 2 · Akses Multi-Entitas</div>
            <h1 style={{ font: '700 28px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '8px 0 6px' }}>
              Select Your Workspace Environment
            </h1>
            <p style={{ font: '400 14px/1.6 var(--font-sans)', color: 'var(--text-secondary)', margin: 0, maxWidth: '60ch' }}>
              Identitas Anda memiliki akses ke beberapa perusahaan dan cabang. Pilih satu atau beberapa
              untuk dimuat secara bersamaan — Anda dapat mengubahnya kapan saja dari context switcher.
            </p>
          </div>

          {/* Conglomerate card */}
          <section className="kc-card kc-card-elevated">
            <div className="kc-card-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--accent-600)', color: '#fff', display: 'grid', placeItems: 'center', font: '700 15px/1 var(--font-sans)', flexShrink: 0 }}>
                  {mockConglomerate.name.replace(/^PT\s+/, '').charAt(0)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="kc-card-title">{mockConglomerate.name}</div>
                  <div className="kc-card-sub">{mockConglomerate.companies.length} perusahaan · {everyContextId.length} cabang tersedia</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button type="button" className="kc-btn kc-btn-ghost kc-btn-sm" onClick={() => setSelected(new Set(everyContextId))}>Pilih semua</button>
                <button type="button" className="kc-btn kc-btn-ghost kc-btn-sm" onClick={() => setSelected(new Set())} disabled={count === 0}>Bersihkan</button>
              </div>
            </div>

            <div className="kc-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mockConglomerate.companies.map((company) => {
                const ids = companyContextIds(company);
                const selCount = ids.filter((id) => selected.has(id)).length;
                const allSel = selCount === ids.length;
                const someSel = selCount > 0 && !allSel;
                return (
                  <div key={company.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                    {/* Company header — selects all branches */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleCompany(ids)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCompany(ids); } }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-sunken)', cursor: 'pointer' }}
                    >
                      <Checkbox checked={allSel} indeterminate={someSel} onChange={() => toggleCompany(ids)} onClick={(e) => e.stopPropagation()} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{company.name}</span>
                          {company.tier && <span className="kc-badge kc-badge-outline">{TIER_LABEL[company.tier]}</span>}
                        </div>
                        <div className="kc-mono" style={{ font: '400 11px/1.3 var(--font-mono)', color: 'var(--text-muted)', marginTop: 2 }}>NPWP {company.npwp}</div>
                      </div>
                      <span className="kc-badge" style={{ background: selCount ? 'var(--fill-accent-subtle)' : 'var(--fill-subtle)', color: selCount ? 'var(--text-accent)' : 'var(--text-muted)' }}>
                        {selCount}/{ids.length}
                      </span>
                    </div>

                    {/* Branch rows */}
                    <div>
                      {company.branches.map((branch) => {
                        const ctx = makeContextId(company.id, branch.id);
                        const checked = selected.has(ctx);
                        return (
                          <div
                            key={branch.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => toggle(ctx)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(ctx); } }}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px 10px 16px', borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', background: checked ? 'var(--fill-accent-subtle)' : 'transparent' }}
                          >
                            <Checkbox checked={checked} onChange={() => toggle(ctx)} onClick={(e) => e.stopPropagation()} />
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0, flex: 1 }}>
                              <span style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{branch.name}</span>
                              <span className="kc-mono" style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{branch.code}</span>
                              <span style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--text-muted)' }}>· {branch.city}</span>
                            </div>
                            {branch.headcount !== undefined && (
                              <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{branch.headcount} staf</span>
                            )}
                            <span className="kc-tag">{branch.role}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky action footer */}
      <footer style={{ position: 'sticky', bottom: 0, borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ font: '600 13px/1 var(--font-sans)', color: count ? 'var(--text-primary)' : 'var(--text-muted)' }}>
            {count} environment dipilih
          </span>
          {count > 0 && (
            <button type="button" onClick={() => setSelected(new Set())} className="kc-btn kc-btn-ghost kc-btn-sm">Bersihkan</button>
          )}
        </div>
        <button type="button" onClick={enterWorkspace} disabled={count === 0} className="kc-btn kc-btn-primary kc-btn-lg" style={{ marginLeft: 'auto' }}>
          Enter Selected Workspace
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </footer>
    </>
  );
}
