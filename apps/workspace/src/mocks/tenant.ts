import type { TenantContext } from '@/types/tenant';

export const mockTenant: TenantContext = {
  company: {
    id: 'c0a80101-0000-0000-0000-000000000001',
    name: 'PT Acme Indonesia',
    npwp: '01.123.456.7-001.000',
    code: 'IS-PLAT',
    environment: 'production',
  },
  branches: [
    { id: 'b0a80101-0000-0000-0000-000000000001', companyId: 'c0a80101-0000-0000-0000-000000000001', name: 'Jakarta HQ', code: 'JKT' },
    { id: 'b0a80101-0000-0000-0000-000000000002', companyId: 'c0a80101-0000-0000-0000-000000000001', name: 'Surabaya', code: 'SBY' },
  ],
  activeBranchIds: ['b0a80101-0000-0000-0000-000000000001'],
  brandColor: '#3B4FC4',
  customDomain: 'kantor.acme.id',
};
