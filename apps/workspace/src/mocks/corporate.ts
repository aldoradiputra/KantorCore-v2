import type { AuthUser, Conglomerate } from '@/types/auth';

/**
 * Corporate tree returned by Layer 1 after the NIK UUID is matched against
 * Tenant_User_Mappings + OPA. The context-switcher loads any subset of these
 * branches simultaneously (WHERE company_id IN (...)).
 */
export const mockConglomerate: Conglomerate = {
  id: 'tenant_maju_jaya',
  name: 'PT Maju Jaya Conglomerate',
  companies: [
    {
      id: 'company_A',
      name: 'PT Maju Jaya Distribusi',
      npwp: '01.882.331.7-014.000',
      tier: 'enterprise',
      branches: [
        { id: 'branch_JKT', name: 'Jakarta', code: 'JKT', city: 'DKI Jakarta', role: 'Finance Controller', headcount: 142 },
        { id: 'branch_BDG', name: 'Bandung', code: 'BDG', city: 'Jawa Barat', role: 'Branch Manager', headcount: 64 },
        { id: 'branch_SBY', name: 'Surabaya', code: 'SBY', city: 'Jawa Timur', role: 'Viewer', headcount: 88 },
      ],
    },
    {
      id: 'company_B',
      name: 'PT Maju Jaya Retail',
      npwp: '02.451.908.5-021.000',
      tier: 'business',
      branches: [
        { id: 'branch_MDN', name: 'Medan', code: 'MDN', city: 'Sumatera Utara', role: 'Sales Lead', headcount: 37 },
        { id: 'branch_BAL', name: 'Bali', code: 'BAL', city: 'Bali', role: 'Branch Manager', headcount: 29 },
      ],
    },
  ],
};

export const mockAuthUser: AuthUser = {
  nik: '3174012509900001',
  name: 'Andi Wijaya',
  email: 'andi@majujaya.co.id',
  phone: '+62 812-1100-2345',
  initials: 'AW',
  roles: ['Super Admin', 'Finance Controller'],
  verifiedBy: 'privyid',
};
