import { create } from 'zustand';
import type { TenantContext } from '@/types/tenant';
import type { AuthUser } from '@/types/auth';

export type ModuleId = 'workspace' | 'hr' | 'finance' | 'inventory' | 'procurement' | 'sales' | 'crm' | 'projects' | 'timesheets' | 'expenses' | 'chat' | 'omnichannel' | 'helpdesk' | 'documents';
export type ViewMode = 'list' | 'kanban' | 'calendar' | 'pivot';
export type ConversationSurface = 'omni' | 'email' | 'chat' | 'ticket';
export type AISection = 'inbox' | 'conversation' | 'wizard' | 'tools' | 'mandates' | 'runs' | 'library';
export type AdminSection = 'users' | 'security' | 'brand' | 'integrations' | 'model-meta';

interface WorkspaceState {
  /* Identity & multi-entity context (NIK-bound global identity) */
  user: AuthUser | null;
  /** Active branches as `${companyId}:${branchId}` ids — the array-based
   * context filter that Layer 1 turns into WHERE company_id IN (...). */
  selectedContexts: string[];

  theme: 'light' | 'dark';
  accent: 'indigo' | 'teal' | 'purple' | 'rose' | 'amber' | 'emerald';
  activeTenant: TenantContext | null;
  activeModule: ModuleId;
  activeView: ViewMode;
  selectedRecordId: string | null;
  commandPaletteOpen: boolean;
  notificationPanelOpen: boolean;
  activeConversationSurface: ConversationSurface;
  selectedThreadId: string | null;
  activeAISection: AISection;
  selectedAgentRunId: string | null;
  activeAdminSection: AdminSection;

  setUser: (user: AuthUser | null) => void;
  setSelectedContexts: (contexts: string[]) => void;
  toggleContext: (contextId: string) => void;
  /** Bulk add/remove a set of contexts (e.g. all branches of one company). */
  setContextGroup: (contextIds: string[], selected: boolean) => void;
  clearContexts: () => void;

  setTheme: (theme: 'light' | 'dark') => void;
  setAccent: (accent: WorkspaceState['accent']) => void;
  setActiveTenant: (tenant: TenantContext) => void;
  setActiveModule: (module: ModuleId) => void;
  setActiveView: (view: ViewMode) => void;
  openRecord: (id: string) => void;
  closeRecord: () => void;
  toggleCommandPalette: () => void;
  toggleNotificationPanel: () => void;
  setConversationSurface: (surface: ConversationSurface) => void;
  selectThread: (id: string | null) => void;
  setAISection: (section: AISection) => void;
  setAdminSection: (section: AdminSection) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  user: null,
  selectedContexts: [],
  theme: 'light',
  accent: 'indigo',
  activeTenant: null,
  activeModule: 'workspace',
  activeView: 'list',
  selectedRecordId: null,
  commandPaletteOpen: false,
  notificationPanelOpen: false,
  activeConversationSurface: 'omni',
  selectedThreadId: null,
  activeAISection: 'inbox',
  selectedAgentRunId: null,
  activeAdminSection: 'users',

  setUser: (user) => set({ user }),
  setSelectedContexts: (contexts) => set({ selectedContexts: contexts }),
  toggleContext: (contextId) =>
    set((s) => ({
      selectedContexts: s.selectedContexts.includes(contextId)
        ? s.selectedContexts.filter((c) => c !== contextId)
        : [...s.selectedContexts, contextId],
    })),
  setContextGroup: (contextIds, selected) =>
    set((s) => {
      const next = new Set(s.selectedContexts);
      if (selected) contextIds.forEach((id) => next.add(id));
      else contextIds.forEach((id) => next.delete(id));
      return { selectedContexts: Array.from(next) };
    }),
  clearContexts: () => set({ selectedContexts: [] }),

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  setAccent: (accent) => {
    document.documentElement.setAttribute('data-accent', accent);
    set({ accent });
  },
  setActiveTenant: (tenant) => set({ activeTenant: tenant }),
  setActiveModule: (module) => set({ activeModule: module }),
  setActiveView: (view) => set({ activeView: view }),
  openRecord: (id) => set({ selectedRecordId: id }),
  closeRecord: () => set({ selectedRecordId: null }),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  toggleNotificationPanel: () => set((s) => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  setConversationSurface: (surface) => set({ activeConversationSurface: surface }),
  selectThread: (id) => set({ selectedThreadId: id }),
  setAISection: (section) => set({ activeAISection: section }),
  setAdminSection: (section) => set({ activeAdminSection: section }),
}));
