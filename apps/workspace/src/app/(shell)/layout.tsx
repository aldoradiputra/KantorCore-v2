'use client';

import { useEffect } from 'react';
import { Rail } from '@/components/shell/Rail';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
import { CommandPalette } from '@/components/shell/CommandPalette';
import { NotificationPanel } from '@/components/shell/NotificationPanel';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockTenant } from '@/mocks/tenant';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const setActiveTenant = useWorkspaceStore((s) => s.setActiveTenant);

  useEffect(() => {
    setActiveTenant(mockTenant);
  }, [setActiveTenant]);

  return (
    <div className="kc-shell" style={{ height: '100vh', overflow: 'hidden' }}>
      <Rail />
      <Sidebar />
      <div className="kc-shell-main">
        <Topbar />
        <div className="kc-shell-content">{children}</div>
      </div>
      <CommandPalette />
      <NotificationPanel />
    </div>
  );
}
