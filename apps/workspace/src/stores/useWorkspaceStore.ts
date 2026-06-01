import { create } from 'zustand';
import type { TenantContext } from '@/types/tenant';

export type ModuleId = 'workspace' | 'hr' | 'finance' | 'inventory' | 'procurement' | 'sales' | 'crm' | 'projects' | 'timesheets' | 'expenses' | 'chat' | 'omnichannel' | 'helpdesk' | 'documents';
export type ViewMode = 'list' | 'kanban' | 'calendar' | 'pivot';
export type ConversationSurface = 'omni' | 'email' | 'chat' | 'ticket';
export type AISection = 'inbox' | 'conversation' | 'wizard' | 'tools' | 'mandates' | 'runs' | 'library';
export type AdminSection = 'users' | 'security' | 'brand' | 'integrations' | 'model-meta';

interface WorkspaceState {
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
