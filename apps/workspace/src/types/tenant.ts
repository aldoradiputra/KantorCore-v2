import { z } from 'zod';

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  npwp: z.string().optional(),
  code: z.string(),
  environment: z.enum(['production', 'staging', 'sandbox']),
});

export const BranchSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string(),
  code: z.string(),
});

export const TenantContextSchema = z.object({
  company: CompanySchema,
  branches: z.array(BranchSchema),
  activeBranchIds: z.array(z.string().uuid()),
  brandColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  logoUrl: z.string().url().optional(),
  customDomain: z.string().optional(),
});

export type Company = z.infer<typeof CompanySchema>;
export type Branch = z.infer<typeof BranchSchema>;
export type TenantContext = z.infer<typeof TenantContextSchema>;
