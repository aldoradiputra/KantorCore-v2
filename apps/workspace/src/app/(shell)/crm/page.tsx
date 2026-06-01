'use client';

import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { ListView } from '@/components/views/ListView';
import { KanbanView } from '@/components/views/KanbanView';

export default function CrmPage() {
  const activeView = useWorkspaceStore((s) => s.activeView);
  const setActiveView = useWorkspaceStore((s) => s.setActiveView);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="kc-page-head">
        <div>
          <div className="kc-page-title">Deals</div>
          <div className="kc-page-sub">42 active · pipeline Rp 1.84 mi · close rate 31%</div>
        </div>
        <div className="kc-spacer" style={{ flex: 1 }} />
        <div className="kc-page-actions">
          <div className="kc-seg">
            {(['list', 'kanban', 'calendar', 'pivot'] as const).map((v) => (
              <button
                key={v}
                className={`kc-seg-opt${activeView === v ? ' kc-seg-opt-active' : ''}`}
                onClick={() => setActiveView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button className="kc-btn kc-btn-secondary kc-btn-sm">Export</button>
          <button className="kc-btn kc-btn-primary kc-btn-sm">+ New deal</button>
        </div>
      </div>
      {activeView === 'list' && <ListView />}
      {activeView === 'kanban' && <KanbanView />}
      {activeView === 'calendar' && <div style={{ padding: 'var(--gutter, 24px)', color: 'var(--text-muted)' }}>Calendar view — coming soon</div>}
      {activeView === 'pivot' && <div style={{ padding: 'var(--gutter, 24px)', color: 'var(--text-muted)' }}>Pivot view — coming soon</div>}
    </div>
  );
}
