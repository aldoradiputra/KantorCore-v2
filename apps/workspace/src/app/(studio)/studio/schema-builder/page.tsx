'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStudioStore, selectBlueprint, type FieldType, type BlueprintField } from '@/stores/useStudioStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const FIELD_TYPES: Array<{ type: FieldType; label: string; bg: string; fg: string }> = [
  { type: 'string',   label: 'Text',     bg: 'var(--accent-50)',  fg: 'var(--accent-600)' },
  { type: 'number',   label: 'Number',   bg: 'var(--teal-50)',    fg: 'var(--teal-500)' },
  { type: 'currency', label: 'Currency', bg: 'var(--amber-50)',   fg: 'var(--amber-500)' },
  { type: 'date',     label: 'Date',     bg: 'var(--purple-50)',  fg: 'var(--purple-500)' },
  { type: 'relation', label: 'Relation', bg: 'var(--rose-50)',    fg: 'var(--rose-500)' },
];

function colorForType(type: FieldType): { bg: string; fg: string } {
  return FIELD_TYPES.find((f) => f.type === type) ?? { bg: 'var(--rose-50)', fg: 'var(--rose-500)' };
}

/* ─── Icons ─── */

function IconText({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></svg>;
}
function IconNumber({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18" /></svg>;
}
function IconCurrency({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>;
}
function IconDate({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function IconRelation({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>;
}

const ICON_MAP: Record<FieldType, (props: { size?: number }) => React.ReactElement> = {
  string: IconText, number: IconNumber, currency: IconCurrency, date: IconDate, relation: IconRelation,
};

const MODEL_COLORS = ['var(--accent-500)', 'var(--teal-500)', 'var(--amber-500)', 'var(--purple-500)', 'var(--rose-500)', 'var(--emerald-500)'];

/* ─── Main page ─── */

export default function SchemaBuilderPage() {
  const setBentoOpen = useWorkspaceStore((s) => s.setBentoOpen);

  return (
    <div className="kc-sb-shell">
      <header className="kc-sb-header">
        <button className="kc-studio-bento" title="Open launcher" onClick={() => setBentoOpen(true)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /></svg>
        </button>
        <div className="kc-studio-divider" />
        <div className="kc-studio-crumb">
          <a href="/studio" className="kc-studio-crumb-root" style={{ textDecoration: 'none' }}>Studio</a>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><path d="M9 6l6 6-6 6" /></svg>
          <span className="kc-studio-crumb-page">Schema Builder</span>
        </div>
        <div style={{ flex: 1 }} />
        <BlueprintPreview />
        <button className="kc-studio-deploy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          Deploy
        </button>
      </header>

      <div className="kc-sb-body">
        <AppManager />
        <Toolbox />
        <SortableCanvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}

/* ─── Blueprint JSON button ─── */

function BlueprintPreview() {
  const blueprint = useStudioStore(selectBlueprint);
  const handleCopy = () => {
    if (blueprint) navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
  };
  return (
    <button className="kc-studio-save" onClick={handleCopy} title="Copy blueprint JSON to clipboard">
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>
        Copy JSON
      </span>
    </button>
  );
}

/* ─── Pane 1: App Manager (Far Left, w-64, dark bg) ─── */

function AppManager() {
  const models = useStudioStore((s) => s.models);
  const activeModelId = useStudioStore((s) => s.activeModelId);
  const createModel = useStudioStore((s) => s.createModel);
  const selectModel = useStudioStore((s) => s.selectModel);

  const handleNewModel = () => {
    const name = prompt('Model name:');
    if (name?.trim()) createModel(name.trim());
  };

  return (
    <aside className="kc-sb-manager">
      <div className="kc-sb-manager-head">
        <span style={{ font: '600 10px/1 var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Models
        </span>
        <button className="kc-sb-new-model-btn" onClick={handleNewModel}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          New
        </button>
      </div>

      <div className="kc-sb-manager-list">
        {models.map((model, i) => (
          <button
            key={model.id}
            className={`kc-sb-model-item${model.id === activeModelId ? ' is-active' : ''}`}
            onClick={() => selectModel(model.id)}
          >
            <span className="kc-sb-model-dot" style={{ background: MODEL_COLORS[i % MODEL_COLORS.length] }} />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{model.name}</span>
            <span className="kc-sb-model-count">{model.fields.length}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <span style={{ font: '400 10px/1.4 var(--font-mono)', color: 'rgba(255,255,255,0.25)' }}>
          {models.length} {models.length === 1 ? 'model' : 'models'}
        </span>
      </div>
    </aside>
  );
}

/* ─── Pane 2: Toolbox (Middle Left, w-48) ─── */

function Toolbox() {
  const activeModelId = useStudioStore((s) => s.activeModelId);
  const addField = useStudioStore((s) => s.addField);

  return (
    <aside className="kc-sb-toolbox">
      <div className="kc-sb-toolbox-head">
        <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Fields
        </span>
      </div>
      <div className="kc-sb-toolbox-grid">
        {FIELD_TYPES.map(({ type, label, bg, fg }) => {
          const Icon = ICON_MAP[type];
          return (
            <button
              key={type}
              className="kc-sb-tool-btn"
              disabled={!activeModelId}
              onClick={() => activeModelId && addField(activeModelId, type)}
              style={!activeModelId ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
            >
              <div className="kc-sb-tool-icon" style={{ background: bg, color: fg }}>
                <Icon size={14} />
              </div>
              {label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

/* ─── Pane 3: Sortable Canvas (Center, flex-1) ─── */

function SortableCanvas() {
  const models = useStudioStore((s) => s.models);
  const activeModelId = useStudioStore((s) => s.activeModelId);
  const activeFieldId = useStudioStore((s) => s.activeFieldId);
  const setActiveField = useStudioStore((s) => s.setActiveField);
  const deleteField = useStudioStore((s) => s.deleteField);
  const reorderFields = useStudioStore((s) => s.reorderFields);

  const activeModel = activeModelId ? models.find((m) => m.id === activeModelId) : null;
  const fieldIds = useMemo(() => activeModel?.fields.map((f) => f.id) ?? [], [activeModel?.fields]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !activeModelId || active.id === over.id) return;
    const oldIndex = fieldIds.indexOf(active.id as string);
    const newIndex = fieldIds.indexOf(over.id as string);
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderFields(activeModelId, oldIndex, newIndex);
    }
  };

  if (!activeModel) {
    return (
      <main className="kc-sb-canvas">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div className="kc-empty">
            <div className="kc-empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" />
              </svg>
            </div>
            <div className="kc-empty-title">Select or create a model to begin.</div>
            <div className="kc-empty-desc">
              Pick a model from the panel on the left, or create a new one.
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kc-sb-canvas" onClick={() => setActiveField(null)}>
      <div className="kc-sb-canvas-inner">
        {/* Model name */}
        <div style={{ marginBottom: 24 }}>
          <div className="kc-sb-name-input" style={{ pointerEvents: 'none' }}>
            {activeModel.name}
          </div>
          <div style={{ font: '400 12px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 6 }}>
            {activeModel.fields.length} {activeModel.fields.length === 1 ? 'field' : 'fields'} · schema blueprint
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 20 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Schema Fields
          </span>
        </div>

        {activeModel.fields.length === 0 ? (
          <div className="kc-empty" style={{ padding: '48px 24px' }}>
            <div className="kc-empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 5v14M5 12h14" /></svg>
            </div>
            <div className="kc-empty-title">No fields yet</div>
            <div className="kc-empty-desc">Click a field type from the toolbox to add your first schema field.</div>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeModel.fields.map((field) => (
                  <SortableFieldCard
                    key={field.id}
                    field={field}
                    isActive={field.id === activeFieldId}
                    onSelect={() => { setActiveField(field.id); }}
                    onDelete={() => deleteField(field.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {activeModel.fields.length > 0 && (
          <div style={{
            marginTop: 12,
            borderRadius: 'var(--r-lg)',
            border: '2px dashed var(--border-subtle)',
            padding: 16,
            display: 'grid',
            placeItems: 'center',
            font: '400 12px/1 var(--font-mono)',
            color: 'var(--text-muted)',
          }}>
            + add more fields from the toolbox
          </div>
        )}
      </div>
    </main>
  );
}

/* ─── Sortable Field Card (dnd-kit) ─── */

function SortableFieldCard({
  field,
  isActive,
  onSelect,
  onDelete,
}: {
  field: BlueprintField;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });
  const { bg, fg } = colorForType(field.type);
  const Icon = ICON_MAP[field.type];

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`kc-sb-field-card${isActive ? ' is-active' : ''}${isDragging ? ' is-dragging' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {/* Drag grip */}
      <div className="kc-sb-field-card-grip" {...attributes} {...listeners}>
        <span /><span /><span />
      </div>
      <div className="kc-sb-field-card-icon" style={{ background: bg, color: fg }}>
        <Icon size={14} />
      </div>
      <span className="kc-sb-field-card-label">{field.label}</span>
      {field.required && <div className="kc-sb-field-card-required" title="Required" />}
      <span className="kc-badge" style={{ background: bg, color: fg, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
        {field.type.toUpperCase()}
      </span>
      <button
        className="kc-sb-field-card-del"
        title="Remove field"
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Pane 4: Properties (Far Right, w-80) ─── */

function PropertiesPanel() {
  const activeFieldId = useStudioStore((s) => s.activeFieldId);
  const models = useStudioStore((s) => s.models);
  const updateField = useStudioStore((s) => s.updateField);
  const deleteField = useStudioStore((s) => s.deleteField);
  const setActiveField = useStudioStore((s) => s.setActiveField);

  const activeField = activeFieldId
    ? models.flatMap((m) => m.fields).find((f) => f.id === activeFieldId)
    : null;

  return (
    <aside className="kc-sb-props">
      <div className="kc-sb-props-head">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
        <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--text-primary)' }}>Properties</span>
      </div>

      {!activeField ? (
        <div className="kc-empty" style={{ padding: '48px 24px' }}>
          <div className="kc-empty-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 15l-2 5L9 9l11 4-5 2z" /><path d="M21 3l-8.5 8.5" />
            </svg>
          </div>
          <div className="kc-empty-desc">Select a field to configure.</div>
        </div>
      ) : (
        <div className="kc-sb-props-body">
          {(() => {
            const { bg, fg } = colorForType(activeField.type);
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="kc-badge" style={{ background: bg, color: fg, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                  {activeField.type.toUpperCase()}
                </span>
                <span style={{ font: '400 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>
                  {activeField.id.slice(0, 8)}
                </span>
              </div>
            );
          })()}

          <div className="kc-field">
            <label className="kc-field-label">Label</label>
            <input
              className="kc-input"
              value={activeField.label}
              onChange={(e) => updateField(activeField.id, { label: e.target.value })}
            />
          </div>

          <div className="kc-field">
            <label className="kc-field-label">Field Type</label>
            <input className="kc-input" value={activeField.type} disabled style={{ textTransform: 'capitalize' }} />
          </div>

          <div className="kc-sb-switch-row">
            <div>
              <div style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--text-secondary)' }}>Required</div>
              <div style={{ font: '400 11px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>Validation at ingestion</div>
            </div>
            <input
              type="checkbox"
              className="kc-switch"
              checked={activeField.required}
              onChange={(e) => updateField(activeField.id, { required: e.target.checked })}
            />
          </div>

          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />

          <button
            className="kc-btn kc-btn-danger kc-btn-sm"
            style={{ width: '100%' }}
            onClick={() => { deleteField(activeField.id); setActiveField(null); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Delete Field
          </button>
        </div>
      )}
    </aside>
  );
}
