'use client';

import { useEffect } from 'react';
import { BentoLauncher } from '@/components/shell/BentoLauncher';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockTenant } from '@/mocks/tenant';
import { mockAuthUser } from '@/mocks/corporate';
import { makeContextId } from '@/lib/corporate';
import { TRIAL_DAYS, addDays } from '@/lib/trial';

export default function PortalsLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
    <>
      {children}
      <BentoLauncher />
    </>
  );
}
