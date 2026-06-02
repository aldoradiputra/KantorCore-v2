'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockConglomerate } from '@/mocks/corporate';
import { companyContextIds, makeContextId, resolveContexts } from '@/lib/corporate';
import { Checkbox } from '@/components/ui/Checkbox';

const shortCompany = (name: string) => name.replace(/^PT\s+/, '');

export function ContextSwitcher() {
  const router = useRouter();
  const selected = useWorkspaceStore((s) => s.selectedContexts);
  const toggleContext = useWorkspaceStore((s) => s.toggleContext);
  const setContextGroup = useWorkspaceStore((s) => s.setContextGroup);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const resolved = resolveContexts(mockConglomerate, selected);
  const count = resolved.length;
  const mark = shortCompany(mockConglomerate.name).charAt(0);

  let primary: string;
  let secondary: string;
  if (count === 0) {
    primary = 'Pilih workspace';
    secondary = 'Tidak ada environment';
  } else if (count === 1) {
    primary = shortCompany(resolved[0].company.name);
    secondary = resolved[0].branch.name;
  } else {
    primary = shortCompany(mockConglomerate.name).replace(/ Conglomerate$/, '');
    secondary = `${count} environments`;
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button type="button" className="kc-tb-btn kc-tb-workspace" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="kc-tb-workspace-mark">{mark}</span>
        <div className="kc-tb-workspace-name">
          <span>{primary}</span>
          <span className="kc-tb-workspace-env">{secondary}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><polyline points="6 9 12 15 18 9" /></svg>
      </button>

      {open && (
        <div
          className="kc-popover"
          style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: 320, zIndex: 'var(--z-popover)' as React.CSSProperties['zIndex'], padding: 0, maxHeight: 'min(72vh, 540px)', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ font: '600 12px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{mockConglomerate.name}</div>
            <div style={{ font: '400 11px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>Aktifkan beberapa entitas sekaligus</div>
          </div>

          <div style={{ overflow: 'auto', padding: 4, flex: 1 }}>
            {mockConglomerate.companies.map((company) => {
              const ids = companyContextIds(company);
              const selCount = ids.filter((id) => selected.includes(id)).length;
              const allSel = selCount === ids.length;
              const someSel = selCount > 0 && !allSel;
              return (
                <div key={company.id} style={{ marginBottom: 2 }}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setContextGroup(ids, !allSel)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setContextGroup(ids, !allSel); } }}
                    className="kc-menu-item"
                    style={{ gap: 10 }}
                  >
                    <Checkbox checked={allSel} indeterminate={someSel} onChange={() => setContextGroup(ids, !allSel)} onClick={(e) => e.stopPropagation()} />
                    <span style={{ flex: 1, font: '600 12px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{shortCompany(company.name)}</span>
                    <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{selCount}/{ids.length}</span>
                  </div>
                  {company.branches.map((branch) => {
                    const ctx = makeContextId(company.id, branch.id);
                    const checked = selected.includes(ctx);
                    return (
                      <div
                        key={branch.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleContext(ctx)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleContext(ctx); } }}
                        className="kc-menu-item"
                        style={{ gap: 10, paddingLeft: 28 }}
                      >
                        <Checkbox checked={checked} onChange={() => toggleContext(ctx)} onClick={(e) => e.stopPropagation()} />
                        <span style={{ flex: 1, font: '400 13px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{branch.name}</span>
                        <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{branch.city}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{count} aktif</span>
            <button
              type="button"
              onClick={() => { setOpen(false); router.push('/onboarding'); }}
              className="kc-btn kc-btn-ghost kc-btn-sm"
              style={{ marginLeft: 'auto' }}
            >
              Kelola di onboarding →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
