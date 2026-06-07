'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { APPLICATIONS, currentSurfaceFromPath } from '@/config/surfaces';

/**
 * Global Bento Launcher — the canonical cross-surface navigation.
 * Mounted once in the shell; opened from the rail app-mark (`.kc-rail-logo`).
 * Interaction + motion mirror `bento-launcher.js` 1:1; colours resolve through
 * design tokens. RBAC: employees never see Studio or Administration.
 */
export function BentoLauncher() {
  const isOpen = useWorkspaceStore((s) => s.isBentoOpen);
  const setOpen = useWorkspaceStore((s) => s.setBentoOpen);
  const role = useWorkspaceStore((s) => s.userRole);
  const setRole = useWorkspaceStore((s) => s.setUserRole);
  const pathname = usePathname();
  const current = currentSurfaceFromPath(pathname);

  // Hydrate the RBAC-demo role from localStorage (parity with the prototype).
  useEffect(() => {
    const stored = localStorage.getItem('kc_role');
    if (stored === 'employee' || stored === 'admin') setRole(stored);
  }, [setRole]);

  // Esc closes.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  const visible = APPLICATIONS.filter((s) => s.roles.includes(role));

  return (
    <div
      className={`kc-bento${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Application launcher"
      aria-hidden={!isOpen}
    >
      <div className="kc-bento-scrim" onClick={() => setOpen(false)} />

      <div className="kc-bento-panel">
        <div className="kc-bento-head">
          <div className="kc-bento-logo">K</div>
          <div>
            <div className="kc-bento-ht">KantorCore</div>
            <div className="kc-bento-hs">Jump to surface</div>
          </div>
          <button className="kc-bento-x" onClick={() => setOpen(false)} aria-label="Close launcher">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="kc-bento-grid">
          {visible.map((s, i) => {
            const isCurrent = s.id === current;
            const style = { '--c': s.color, '--tint': s.tint, transitionDelay: `${i * 45}ms` } as React.CSSProperties;
            const body = (
              <>
                <div className="kc-bento-ictile">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <div className="kc-bento-cn">
                  {s.name}
                  {isCurrent && <span className="kc-bento-cur">You are here</span>}
                </div>
                <div className="kc-bento-cd">{s.description}</div>
                <div className="kc-bento-foot">
                  <span className="kc-bento-route">{s.route}</span>
                  {!isCurrent && (
                    <span className="kc-bento-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  )}
                </div>
              </>
            );

            // Current surface: non-interactive, badged "You are here".
            if (isCurrent) {
              return (
                <div key={s.id} className="kc-bento-card is-current" style={style} aria-current="page">
                  {body}
                </div>
              );
            }

            // Other surfaces: router link; overlay closes as we route away.
            return (
              <Link key={s.id} href={s.route} className="kc-bento-card" style={style} onClick={() => setOpen(false)}>
                {body}
              </Link>
            );
          })}
        </div>

        <div className="kc-bento-rolebar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--neutral-300)' }}><circle cx="12" cy="8" r="3.2" /><path d="M5 20v-1c0-3 3-5 7-5s7 2 7 5v1" /></svg>
          <span className="kc-bento-rl">Viewing as <b>{role === 'employee' ? 'Employee' : 'Admin'}</b> <span style={{ opacity: 0.5 }}>· RBAC demo</span></span>
          <div className="kc-bento-seg">
            <button type="button" className={role === 'admin' ? 'is-on' : ''} onClick={() => setRole('admin')}>Admin</button>
            <button type="button" className={role === 'employee' ? 'is-on' : ''} onClick={() => setRole('employee')}>Employee</button>
          </div>
        </div>

        <div className="kc-bento-hint">Esc or click outside to close</div>
      </div>
    </div>
  );
}
