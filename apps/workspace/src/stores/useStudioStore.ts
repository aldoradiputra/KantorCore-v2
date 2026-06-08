import { create } from 'zustand';

export type FieldType = 'string' | 'number' | 'currency' | 'date' | 'relation';

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
}

export interface Blueprint {
  blueprint_name: string;
  schema_def: {
    fields: Array<{ id: string; type: FieldType; label: string; required: boolean }>;
  };
}

interface StudioState {
  blueprintName: string;
  fields: BlueprintField[];
  activeFieldId: string | null;

  setBlueprintName: (name: string) => void;
  addField: (type: FieldType) => void;
  updateField: (id: string, patch: Partial<Omit<BlueprintField, 'id'>>) => void;
  removeField: (id: string) => void;
  setActiveField: (id: string | null) => void;
}

const DEFAULT_LABELS: Record<FieldType, string> = {
  string: 'New Text Field',
  number: 'New Number Field',
  currency: 'New Currency Field',
  date: 'New Date Field',
  relation: 'New Relation',
};

export const useStudioStore = create<StudioState>((set) => ({
  blueprintName: 'Untitled App',
  fields: [],
  activeFieldId: null,

  setBlueprintName: (name) => set({ blueprintName: name }),

  addField: (type) => {
    const id = crypto.randomUUID();
    set((s) => ({
      fields: [...s.fields, { id, type, label: DEFAULT_LABELS[type], required: false }],
      activeFieldId: id,
    }));
  },

  updateField: (id, patch) =>
    set((s) => ({
      fields: s.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })),

  removeField: (id) =>
    set((s) => ({
      fields: s.fields.filter((f) => f.id !== id),
      activeFieldId: s.activeFieldId === id ? null : s.activeFieldId,
    })),

  setActiveField: (id) => set({ activeFieldId: id }),
}));

export function selectBlueprint(state: StudioState): Blueprint {
  return {
    blueprint_name: state.blueprintName,
    schema_def: {
      fields: state.fields.map(({ id, type, label, required }) => ({
        id, type, label, required,
      })),
    },
  };
}
