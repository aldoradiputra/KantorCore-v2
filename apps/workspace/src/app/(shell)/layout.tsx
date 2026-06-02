'use client';

import { useEffect } from 'react';
import { Rail } from '@/components/shell/Rail';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
import { CommandPalette } from '@/components/shell/CommandPalette';
import { NotificationPanel } from '@/components/shell/NotificationPanel';
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
