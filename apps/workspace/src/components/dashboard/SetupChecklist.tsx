const steps = [
  { label: 'Buat tenant', done: true },
  { label: 'Sambungkan rekening bank', done: true },
  { label: 'Atur Chart of Accounts', done: true },
  { label: 'Hubungkan CoreTax DJP', done: false, cta: true },
  { label: 'Undang anggota tim', done: false },
];

export function SetupChecklist() {
  return (
    <div className="kc-card">
      <div className="kc-card-head">
        <div>
          <div className="kc-card-title">Selesaikan setup</div>
          <div className="kc-card-sub">3 dari 5 langkah</div>
        </div>
        <span className="kc-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>60%</span>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ height: 4, background: 'var(--bg-sunken)', borderRadius: 2, overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--accent-500)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: s.done ? 'var(--text-muted)' : s.cta ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              <span style={{ color: s.done ? 'var(--state-success)' : s.cta ? 'var(--accent-500)' : 'var(--text-muted)' }}>
                {s.done ? '✓' : '○'}
              </span>
              {s.label}
              {s.done && <span className="kc-muted" style={{ marginLeft: 4 }}>· selesai</span>}
              {s.cta && <span style={{ marginLeft: 'auto' }}><button className="kc-btn kc-btn-primary kc-btn-xs">Mulai</button></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
