'use client';

import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockNotifications } from '@/mocks/notifications';

export function NotificationPanel() {
  const isOpen = useWorkspaceStore((s) => s.notificationPanelOpen);
  const toggle = useWorkspaceStore((s) => s.toggleNotificationPanel);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) toggle();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, toggle]);

  const variantStyles: Record<string, React.CSSProperties> = {
    accent: { background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' },
    warn: { background: 'var(--state-warn-bg)', color: 'var(--state-warn)' },
    danger: { background: 'var(--state-danger-bg)', color: 'var(--state-danger)' },
    success: { background: 'var(--state-success-bg)', color: 'var(--state-success)' },
    default: { background: 'var(--fill-subtle)', color: 'var(--text-muted)' },
  };

  return (
    <div
      style={{
        position: 'fixed', top: 'var(--topbar-h)', right: 0, width: 380, bottom: 0,
        background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-lg)', zIndex: 'var(--z-popover)' as string,
        display: isOpen ? 'flex' : 'none', flexDirection: 'column',
      }}
    >
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--text-primary)' }}>Notifications</div>
        <div style={{ flex: 1 }} />
        <button className="kc-btn kc-btn-ghost kc-btn-xs">Mark all read</button>
      </div>
      <div style={{ display: 'flex', padding: '8px 8px 0', gap: 4, borderBottom: '1px solid var(--border-subtle)' }}>
        {['All', 'Mentions', 'Approvals', 'Agents'].map((tab, i) => (
          <div key={tab} style={{ padding: '6px 10px', borderRadius: 'var(--r-sm)', font: '500 12px/1 var(--font-sans)', color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', borderBottom: i === 0 ? '2px solid var(--accent-500)' : '2px solid transparent', marginBottom: -1, cursor: 'pointer', fontWeight: i === 0 ? 600 : 500 }}>
            {tab}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {mockNotifications.map((n) => (
          <div
            key={n.id}
            style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10, cursor: 'pointer', background: n.unread ? 'var(--fill-accent-subtle)' : undefined }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', ...variantStyles[n.iconVariant] }}>
              <span style={{ fontSize: 14 }}>●</span>
            </div>
            <div>
              <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)' }}>{n.title}</div>
              <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-secondary)', marginTop: 2 }}>{n.description}</div>
              <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 4 }}>{n.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
