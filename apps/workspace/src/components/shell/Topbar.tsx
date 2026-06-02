'use client';

import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { ContextSwitcher } from '@/components/shell/ContextSwitcher';

export function Topbar() {
  const toggleCommandPalette = useWorkspaceStore((s) => s.toggleCommandPalette);
  const toggleNotificationPanel = useWorkspaceStore((s) => s.toggleNotificationPanel);
  const user = useWorkspaceStore((s) => s.user);

  return (
    <header className="kc-topbar">
      <div className="kc-topbar-left">
        <ContextSwitcher />
      </div>
      <button className="kc-cmdk" onClick={toggleCommandPalette}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Cari atau jalankan…</span>
        <span className="kc-kbd">⌘K</span>
      </button>
      <div className="kc-topbar-right">
        <button className="kc-tb-btn" title="Agent inbox">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><path d="M8 11V9a4 4 0 0 1 8 0v2"/></svg>
          <span className="kc-tb-dot kc-tb-dot-accent">3</span>
        </button>
        <button className="kc-tb-btn" title="Notifications" onClick={toggleNotificationPanel}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="kc-tb-dot">8</span>
        </button>
        <button className="kc-tb-btn kc-tb-user">
          <div className="kc-avatar kc-avatar-sm">{user?.initials ?? 'AW'}</div>
        </button>
      </div>
    </header>
  );
}
