'use client';

import { useMemo } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockConglomerate } from '@/mocks/corporate';
import type { Conglomerate } from '@/types/auth';

/**
 * The conglomerates the signed-in identity can access. A registered NIK sees
 * the seeded demo conglomerate; a brand-new NIK sees nothing until it creates
 * one via the wizard. Any wizard-created tenant is appended.
 */
export function useAvailableTenants(): Conglomerate[] {
  const isNew = useWorkspaceStore((s) => s.user?.isNewRegistration ?? false);
  const customTenant = useWorkspaceStore((s) => s.customTenant);

  return useMemo(() => {
    const base = isNew ? [] : [mockConglomerate];
    return customTenant ? [...base, customTenant] : base;
  }, [isNew, customTenant]);
}
