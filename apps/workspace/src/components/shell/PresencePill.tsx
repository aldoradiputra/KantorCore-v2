'use client';

import { useEffect, useRef, useState } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const MAX_VISIBLE = 5;

export function PresencePill() {
  const colleagues = useWorkspaceStore((s) => s.onlineColleagues);
  const [online, setOnline] = useState(true);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

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

  useEffect(() => { if (!online) setOpen(false); }, [online]);

  const count = colleagues.length;
  const visible = colleagues.slice(0, MAX_VISIBLE);
  const overflow = count - MAX_VISIBLE;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="kc-presence-pill"
        onClick={() => { if (online) setOpen((o) => !o); }}
        aria-expanded={open}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '0 10px', height: 26,
          borderRadius: 'var(--r-full)',
          background: online ? 'var(--state-success-bg)' : 'var(--fill-subtle)',
          border: `1px solid ${online ? 'var(--state-success-border)' : 'var(--border-subtle)'}`,
          cursor: online ? 'pointer' : 'default',
          transition: 'background var(--d-fast), border-color var(--d-fast)',
          font: '500 11px/1 var(--font-sans)',
          color: online ? 'var(--state-success)' : 'var(--text-muted)',
        }}
      >
        {online ? (
          <>
            <span className="kc-presence-dot kc-presence-online" />
            <span>Online</span>
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
              <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <span>Connecting…</span>
          </>
        )}
      </button>

      {open && online && (
        <div
          className="kc-popover"
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            width: 280, zIndex: 'var(--z-popover)' as React.CSSProperties['zIndex'],
            padding: 0,
          }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="kc-presence-dot kc-presence-online" />
              <span style={{ font: '600 12px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>
                {count} Colleagues Online
              </span>
            </div>
          </div>

          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center' }}>
            <div className="kc-avatar-group">
              {visible.map((c) => (
                <div key={c.id} className="kc-avatar kc-avatar-sm kc-avatar-presence" title={c.name}>
                  {c.initials}
                </div>
              ))}
              {overflow > 0 && (
                <div
                  className="kc-avatar kc-avatar-sm"
                  style={{ background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)', fontSize: 9, fontWeight: 600 }}
                >
                  +{overflow}
                </div>
              )}
            </div>
          </div>

          <div style={{ overflow: 'auto', maxHeight: 260, padding: 4 }}>
            {colleagues.map((c) => (
              <div
                key={c.id}
                className="kc-menu-item"
                style={{ gap: 10, padding: '8px 10px', cursor: 'default' }}
              >
                <div className="kc-avatar kc-avatar-sm kc-avatar-presence">{c.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: '500 12px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ font: '400 11px/1.3 var(--font-sans)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.role} · {c.branch}
                  </div>
                </div>
                <span className="kc-presence-dot kc-presence-online" style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
