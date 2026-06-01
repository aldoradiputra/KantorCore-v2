const kpis = [
  { label: 'Posisi kas', value: 'Rp 8.420.000.000', delta: '▲ Rp 240 jt minggu ini', up: true },
  { label: 'AR overdue', value: 'Rp 70.180.000', delta: '▲ 4 faktur baru', up: false },
  { label: 'Karyawan aktif', value: '218', delta: '▲ 3 onboarding minggu ini', up: true },
  { label: 'Pipeline', value: 'Rp 1,84 mi', delta: '7 deals at Negotiation', up: true },
];

export function KpiStrip() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {kpis.map((kpi) => (
        <div className="kc-card" key={kpi.label} style={{ padding: '14px 16px' }}>
          <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>{kpi.label}</div>
          <div style={{ font: '700 22px/1.1 var(--font-sans)', letterSpacing: '-0.02em', color: kpi.up ? 'var(--text-primary)' : 'var(--state-danger)', fontVariantNumeric: 'tabular-nums' }}>{kpi.value}</div>
          <div style={{ font: '500 11px/1 var(--font-sans)', color: kpi.up ? 'var(--state-success)' : 'var(--state-danger)', marginTop: 4 }}>{kpi.delta}</div>
        </div>
      ))}
    </div>
  );
}
