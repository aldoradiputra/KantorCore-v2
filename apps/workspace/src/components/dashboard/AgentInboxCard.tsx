const agents = [
  { name: 'AR Collector', desc: 'Selesai · 18 reminders, 5 vendor menjawab', status: 'Done', variant: 'success' },
  { name: 'Lead Triager', desc: 'Menunggu persetujuan untuk membalas 4 lead baru', status: 'Approval', variant: 'warn' },
  { name: 'Compliance Auditor', desc: 'Gagal akses endpoint CoreTax (timeout)', status: 'Failed', variant: 'danger' },
  { name: 'Cash Forecaster', desc: 'Memproses 28 model skenario · 4 dari 6 jam', status: 'Running', variant: 'info' },
];

export function AgentInboxCard() {
  return (
    <div className="kc-card">
      <div className="kc-card-head">
        <div>
          <div className="kc-card-title">Agent Inbox</div>
          <div className="kc-card-sub">3 menunggu peninjauan</div>
        </div>
      </div>
      <div>
        {agents.map((a) => (
          <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 'var(--r-md)', background: a.variant === 'danger' ? 'var(--state-danger-bg)' : 'var(--fill-accent-subtle)', color: a.variant === 'danger' ? 'var(--state-danger)' : 'var(--text-accent)', display: 'grid', placeItems: 'center', fontSize: 12, flexShrink: 0 }}>
              {a.variant === 'danger' ? '⚠' : '🤖'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{a.name}</div>
              <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{a.desc}</div>
            </div>
            <span className={`kc-badge kc-badge-${a.variant}`} style={{ fontSize: 10 }}>
              {a.variant === 'info' && <span className="kc-dot"></span>}
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
