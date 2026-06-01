'use client';

import { useRouter } from 'next/navigation';
import { mockDeals } from '@/mocks/deals';

const stageStyles: Record<string, { bg: string; color: string }> = {
  qualified: { bg: 'var(--neutral-200)', color: 'var(--text-secondary)' },
  proposal: { bg: 'var(--state-info-bg)', color: 'var(--state-info)' },
  negotiation: { bg: 'var(--state-warn-bg)', color: 'var(--state-warn)' },
  closed_won: { bg: 'var(--state-success-bg)', color: 'var(--state-success)' },
  closed_lost: { bg: 'var(--state-danger-bg)', color: 'var(--state-danger)' },
};

const stageLabels: Record<string, string> = {
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed_won: 'Closed-won',
  closed_lost: 'Closed-lost',
};

const scoreVariants: Record<string, string> = {
  High: 'kc-badge-success',
  Med: 'kc-badge-info',
  Low: '',
};

function formatRupiah(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export function ListView() {
  const router = useRouter();

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', padding: '10px var(--gutter, 24px)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
        <button className="kc-chip kc-chip-active">Stage ≠ Closed-lost <span className="kc-x">×</span></button>
        <button className="kc-chip kc-chip-active">Owner: AW, FN, HP <span className="kc-x">×</span></button>
        <button className="kc-chip kc-chip-active">Close date: this Q <span className="kc-x">×</span></button>
        <button className="kc-chip">+ Filter</button>
        <div style={{ flex: 1 }} />
        <span className="kc-mono kc-muted" style={{ fontSize: 11 }}>42 of 87</span>
      </div>
      <div style={{ overflow: 'auto', flex: 1, background: 'var(--bg-surface)' }}>
        <table className="kc-table">
          <thead>
            <tr>
              <th style={{ width: 28 }}><input type="checkbox" className="kc-check" readOnly /></th>
              <th>Deal</th>
              <th>Stage</th>
              <th>Account</th>
              <th>Owner</th>
              <th className="kc-th-num">Value</th>
              <th>Close date</th>
              <th>AI score</th>
              <th>Last activity</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((d) => {
              const ss = stageStyles[d.stage] || stageStyles.qualified;
              return (
                <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/crm/${d.id}`)}>
                  <td><input type="checkbox" className="kc-check" readOnly /></td>
                  <td>
                    <strong>{d.title}</strong>
                    {d.subtitle && <div className="kc-caption">{d.subtitle}</div>}
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', font: '500 12px/1 var(--font-sans)', padding: '3px 8px', borderRadius: 'var(--r-full)', background: ss.bg, color: ss.color }}>
                      {stageLabels[d.stage]}
                    </span>
                  </td>
                  <td>{d.accountName}</td>
                  <td><div className="kc-avatar kc-avatar-xs">{d.ownerInitials}</div></td>
                  <td className="kc-td-num kc-mono">{formatRupiah(d.value)}</td>
                  <td className="kc-mono">{d.closeDate}</td>
                  <td><span className={`kc-badge ${scoreVariants[d.aiScoreLabel] || ''}`}>{d.aiScoreLabel} · {d.aiScore}</span></td>
                  <td className="kc-mono kc-muted">{d.lastActivity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '10px var(--gutter, 24px)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <span className="kc-mono kc-muted" style={{ fontSize: 11 }}>Page 1 of 4</span>
      </div>
    </>
  );
}
