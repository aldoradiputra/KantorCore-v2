'use client';

import { useEffect } from 'react';
import { Rail } from '@/components/shell/Rail';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
import { CommandPalette } from '@/components/shell/CommandPalette';
import { NotificationPanel } from '@/components/shell/NotificationPanel';
import { BentoLauncher } from '@/components/shell/BentoLauncher';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockTenant } from '@/mocks/tenant';
import { mockAuthUser } from '@/mocks/corporate';
import { makeContextId } from '@/lib/corporate';
import { TRIAL_DAYS, addDays } from '@/lib/trial';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Seed identity + context once so direct loads / refreshes are usable even
    // when the user didn't arrive via the login → onboarding flow.
    const s = useWorkspaceStore.getState();
    s.setActiveTenant(mockTenant);
    if (!s.user) s.setUser(mockAuthUser);
    if (s.selectedContexts.length === 0) {
      s.setSelectedContexts([makeContextId('company_A', 'branch_JKT')]);
    }
    if (!s.trialEndsAt) {
      s.setTrialEndsAt(addDays(new Date(), TRIAL_DAYS).toISOString());
    }
  }, []);

  const sidebarCollapsed = useWorkspaceStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useWorkspaceStore((s) => s.toggleSidebar);

  return (
    <div className={`kc-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`} style={{ height: '100vh', overflow: 'hidden' }}>
      <Rail />
      {sidebarCollapsed ? (
        <div className="kc-side-expand">
          <button
            type="button"
            className="kc-side-expand-btn"
            onClick={toggleSidebar}
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      ) : (
        <Sidebar />
      )}
      <div className="kc-shell-main">
        <Topbar />
        <div className="kc-shell-content">{children}</div>
      </div>
      <CommandPalette />
      <NotificationPanel />
      <BentoLauncher />
    </div>
  );
}
