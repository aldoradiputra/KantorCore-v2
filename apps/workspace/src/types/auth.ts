import { z } from 'zod';

/* ============================================================
   Identity & Multi-Entity contracts
   Mirrors Layer 1's NIK-bound global identity network and the
   Company → Branch corporate hierarchy resolved post-login.
   ============================================================ */

/** Indonesian NIK — exactly 16 numeric digits (UU No. 27/2022 PDP). */
export const NIK_LENGTH = 16;
export const NikSchema = z
  .string()
  .regex(/^\d{16}$/, 'NIK harus terdiri dari 16 digit angka.');

/** Global login surfaces. NIK is the primary sovereign identity. */
export const LoginMethodSchema = z.enum(['nik', 'whatsapp', 'email']);
export type LoginMethod = z.infer<typeof LoginMethodSchema>;

/** PSrE root providers that cryptographically verify the NIK (UU ITE). */
export const PSrEProviderSchema = z.enum(['privyid', 'vida']);
export type PSrEProvider = z.infer<typeof PSrEProviderSchema>;

export const AuthUserSchema = z.object({
  nik: NikSchema,
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  initials: z.string().max(2),
  roles: z.array(z.string()),
  verifiedBy: PSrEProviderSchema.optional(),
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

/* --- Corporate hierarchy (Tenant → Company → Branch) ----------- */

export const CompanyTierSchema = z.enum(['free', 'business', 'enterprise']);
export type CompanyTier = z.infer<typeof CompanyTierSchema>;

export const CorporateBranchSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  city: z.string(),
  /** The authenticated user's role at this specific branch (ABAC). */
  role: z.string(),
  headcount: z.number().int().nonnegative().optional(),
});
export type CorporateBranch = z.infer<typeof CorporateBranchSchema>;

export const CorporateCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  npwp: z.string(),
  tier: CompanyTierSchema.optional(),
  branches: z.array(CorporateBranchSchema),
});
export type CorporateCompany = z.infer<typeof CorporateCompanySchema>;

export const ConglomerateSchema = z.object({
  id: z.string(),
  name: z.string(),
  companies: z.array(CorporateCompanySchema),
});
export type Conglomerate = z.infer<typeof ConglomerateSchema>;
