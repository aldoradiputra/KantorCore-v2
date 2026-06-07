import type { ReactNode } from 'react';

/** The four top-level OS surfaces (HANDOFF.md §0). Mirrors SURFACES in
 *  bento-launcher.js. Accent colours resolve through design-token ramps —
 *  no hardcoded hex (Workspace=indigo, Studio=amber, Portals=teal,
 *  Administration=deep navy/indigo-900). */
export type SurfaceId = 'workspace' | 'studio' | 'portals' | 'admin';
export type UserRole = 'admin' | 'employee';

export interface SurfaceApp {
  id: SurfaceId;
  name: string;
  description: string;
  route: string;
  /** CSS custom-property reference into a design-token ramp. */
  color: string;
  /** Subtle tint behind the surface icon tile. */
  tint: string;
  roles: UserRole[];
  icon: ReactNode;
}

export const APPLICATIONS: SurfaceApp[] = [
  {
    id: 'workspace',
    name: 'Workspace',
    description: 'Daily operations & communications',
    route: '/',
    color: 'var(--indigo-500)',
    tint: 'var(--indigo-50)',
    roles: ['admin', 'employee'],
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.6" />
        <rect x="14" y="3" width="7" height="7" rx="1.6" />
        <rect x="14" y="14" width="7" height="7" rx="1.6" />
        <rect x="3" y="14" width="7" height="7" rx="1.6" />
      </>
    ),
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'No-Code app & workflow builder',
    route: '/studio',
    color: 'var(--amber-500)',
    tint: 'var(--amber-50)',
    roles: ['admin'],
    icon: (
      <>
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="18" cy="6" r="2.6" />
        <circle cx="12" cy="18" r="2.6" />
        <path d="M8.5 6h7M6 8.5l4.5 7.5M18 8.5l-4.5 7.5" />
      </>
    ),
  },
  {
    id: 'portals',
    name: 'Portals',
    description: 'External vendor & client sites',
    route: '/portals',
    color: 'var(--teal-500)',
    tint: 'var(--teal-50)',
    roles: ['admin', 'employee'],
    icon: (
      <>
        <path d="M4 20V10a8 6 0 0116 0v10" />
        <path d="M9 20v-7a3 2.5 0 016 0v7" />
      </>
    ),
  },
  {
    id: 'admin',
    name: 'Administration',
    description: 'Billing, roles, and branch settings',
    route: '/admin',
    color: 'var(--indigo-900)',
    tint: 'var(--indigo-100)',
    roles: ['admin'],
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9.5 12l2 2 3.5-3.5" />
      </>
    ),
  },
];

/** Maps the current route to its owning surface so the launcher can badge
 *  "You are here". Everything that isn't Studio/Portals/Administration is
 *  part of the Workspace surface (CRM, AI, Conversations, …). */
export function currentSurfaceFromPath(pathname: string): SurfaceId {
  if (pathname.startsWith('/studio')) return 'studio';
  if (pathname.startsWith('/portals')) return 'portals';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'workspace';
}
