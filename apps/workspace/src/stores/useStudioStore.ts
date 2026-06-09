import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

export type FieldType = 'string' | 'number' | 'currency' | 'date' | 'relation';

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
}

export interface Model {
  id: string;
  name: string;
  fields: BlueprintField[];
}

export interface Blueprint {
  blueprint_name: string;
  schema_def: {
    fields: Array<{ id: string; type: FieldType; label: string; required: boolean }>;
  };
}

interface StudioState {
  models: Model[];
  activeModelId: string | null;
  activeFieldId: string | null;

  createModel: (name: string) => void;
  selectModel: (id: string | null) => void;
  addField: (modelId: string, type: FieldType) => void;
  reorderFields: (modelId: string, oldIndex: number, newIndex: number) => void;
  updateField: (id: string, patch: Partial<Omit<BlueprintField, 'id'>>) => void;
  deleteField: (id: string) => void;
  setActiveField: (id: string | null) => void;
}

const DEFAULT_LABELS: Record<FieldType, string> = {
  string: 'New Text Field',
  number: 'New Number Field',
  currency: 'New Currency Field',
  date: 'New Date Field',
  relation: 'New Relation',
};

const MOCK_MODELS: Model[] = [
  {
    id: 'model_crm',
    name: 'CRM Leads',
    fields: [
      { id: 'f_crm_1', type: 'string',   label: 'Contact Name',   required: true },
      { id: 'f_crm_2', type: 'string',   label: 'Company',        required: false },
      { id: 'f_crm_3', type: 'currency', label: 'Deal Value',     required: false },
      { id: 'f_crm_4', type: 'date',     label: 'Expected Close', required: false },
    ],
  },
  {
    id: 'model_inv',
    name: 'Invoices',
    fields: [
      { id: 'f_inv_1', type: 'string',   label: 'Invoice Number', required: true },
      { id: 'f_inv_2', type: 'relation', label: 'Customer',       required: true },
      { id: 'f_inv_3', type: 'currency', label: 'Total Amount',   required: true },
      { id: 'f_inv_4', type: 'date',     label: 'Due Date',       required: false },
      { id: 'f_inv_5', type: 'number',   label: 'Line Items',     required: false },
    ],
  },
];

export const useStudioStore = create<StudioState>((set) => ({
  models: MOCK_MODELS,
  activeModelId: null,
  activeFieldId: null,

  createModel: (name) => {
    const id = crypto.randomUUID();
    set((s) => ({
      models: [...s.models, { id, name, fields: [] }],
      activeModelId: id,
      activeFieldId: null,
    }));
  },

  selectModel: (id) => set({ activeModelId: id, activeFieldId: null }),

  addField: (modelId, type) => {
    const id = crypto.randomUUID();
    const field: BlueprintField = { id, type, label: DEFAULT_LABELS[type], required: false };
    set((s) => ({
      models: s.models.map((m) =>
        m.id === modelId ? { ...m, fields: [...m.fields, field] } : m,
      ),
      activeFieldId: id,
    }));
  },

  reorderFields: (modelId, oldIndex, newIndex) =>
    set((s) => ({
      models: s.models.map((m) =>
        m.id === modelId ? { ...m, fields: arrayMove(m.fields, oldIndex, newIndex) } : m,
      ),
    })),

  updateField: (id, patch) =>
    set((s) => ({
      models: s.models.map((m) => ({
        ...m,
        fields: m.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      })),
    })),

  deleteField: (id) =>
    set((s) => ({
      models: s.models.map((m) => ({
        ...m,
        fields: m.fields.filter((f) => f.id !== id),
      })),
      activeFieldId: s.activeFieldId === id ? null : s.activeFieldId,
    })),

  setActiveField: (id) => set({ activeFieldId: id }),
}));

export function selectBlueprint(state: StudioState): Blueprint | null {
  const model = state.models.find((m) => m.id === state.activeModelId);
  if (!model) return null;
  return {
    blueprint_name: model.name,
    schema_def: {
      fields: model.fields.map(({ id, type, label, required }) => ({
        id, type, label, required,
      })),
    },
  };
}
