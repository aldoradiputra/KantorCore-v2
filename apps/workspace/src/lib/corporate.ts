import type { Conglomerate, CorporateCompany, CorporateBranch } from '@/types/auth';

/**
 * A "context" is a single active branch encoded as `${companyId}:${branchId}`,
 * e.g. `company_A:branch_JKT`. The workspace store holds an array of these so a
 * user can load multiple entities at once.
 */
export function makeContextId(companyId: string, branchId: string): string {
  return `${companyId}:${branchId}`;
}

export function parseContextId(contextId: string): { companyId: string; branchId: string } {
  const [companyId, branchId] = contextId.split(':');
  return { companyId, branchId };
}

/** Every context id belonging to a company (used for select-all-branches). */
export function companyContextIds(company: CorporateCompany): string[] {
  return company.branches.map((b) => makeContextId(company.id, b.id));
}

export function findCompany(c: Conglomerate, companyId: string): CorporateCompany | undefined {
  return c.companies.find((co) => co.id === companyId);
}

export function findBranch(
  c: Conglomerate,
  companyId: string,
  branchId: string,
): CorporateBranch | undefined {
  return findCompany(c, companyId)?.branches.find((b) => b.id === branchId);
}

export interface ResolvedContext {
  id: string;
  company: CorporateCompany;
  branch: CorporateBranch;
}

/** Turn raw context ids into displayable company/branch pairs, skipping any
 * that no longer resolve. */
export function resolveContexts(c: Conglomerate, contextIds: string[]): ResolvedContext[] {
  return contextIds.flatMap((id) => {
    const { companyId, branchId } = parseContextId(id);
    const company = findCompany(c, companyId);
    const branch = company?.branches.find((b) => b.id === branchId);
    return company && branch ? [{ id, company, branch }] : [];
  });
}

/** All context ids in the conglomerate, in natural tree order. */
export function allContextIds(c: Conglomerate): string[] {
  return c.companies.flatMap((company) => companyContextIds(company));
}

/** Re-order an arbitrary selection to match the conglomerate's tree order. */
export function orderContexts(c: Conglomerate, contextIds: string[]): string[] {
  const selected = new Set(contextIds);
  return allContextIds(c).filter((id) => selected.has(id));
}
