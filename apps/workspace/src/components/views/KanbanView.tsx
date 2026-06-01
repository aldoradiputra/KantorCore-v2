'use client';

import { mockDeals } from '@/mocks/deals';
import type { DealStage } from '@/types/record';

const columns: { stage: DealStage; label: string; wip?: string }[] = [
  { stage: 'qualified', label: 'Qualified', wip: 'WIP 14/20' },
  { stage: 'proposal', label: 'Proposal', wip: 'WIP 18/15' },
  { stage: 'negotiation', label: 'Negotiation', wip: 'WIP 7/10' },
  { stage: 'closed_won', label: 'Closed-won' },
];

const stageColors: Record<string, string> = {
  qualified: 'var(--neutral-200)',
  proposal: 'var(--state-info-bg)',
  negotiation: 'var(--state-warn-bg)',
  closed_won: 'var(--state-success-bg)',
};

function shortValue(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'jt';
  return (n / 1_000).toFixed(0) + 'rb';
}

export function KanbanView() {
  return (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 280, gap: 12, padding: '16px var(--gutter, 24px)', overflowX: 'auto', flex: 1, alignItems: 'start', background: 'var(--bg-canvas)' }}>
      {columns.map((col) => {
        const cards = mockDeals.filter((d) => d.stage === col.stage);
        const isOver = col.wip?.includes('18/15');
        return (
          <div key={col.stage} style={{ background: 'var(--bg-sunken)', borderRadius: 'var(--r-lg)', padding: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px' }}>
              <span style={{ font: '600 12px/1 var(--font-sans)', padding: '2px 7px', borderRadius: 'var(--r-full)', background: stageColors[col.stage], color: 'var(--text-secondary)' }}>{col.label}</span>
              <div style={{ flex: 1 }} />
              <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{cards.length}</span>
              {col.wip && (
                <span style={{ font: '500 10px/1 var(--font-mono)', padding: '2px 5px', borderRadius: 'var(--r-sm)', background: isOver ? 'var(--state-warn-bg)' : 'var(--bg-surface)', color: isOver ? 'var(--state-warn)' : 'var(--text-muted)' }}>{col.wip}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflow: 'auto', padding: 2 }}>
              {cards.map((d) => (
                <div key={d.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '10px 12px', boxShadow: 'var(--shadow-xs)', cursor: 'grab' }}>
                  <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 4 }}>{d.title}</div>
                  {d.subtitle && <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginBottom: 8 }}>{d.subtitle}</div>}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span className={`kc-badge ${d.aiScoreLabel === 'High' ? 'kc-badge-success' : d.aiScoreLabel === 'Med' ? 'kc-badge-info' : ''}`} style={{ fontSize: 9 }}>{d.aiScoreLabel} · {d.aiScore}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="kc-avatar kc-avatar-xs">{d.ownerInitials}</div>
                    <div style={{ flex: 1 }} />
                    <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }} className="kc-mono">{shortValue(d.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
