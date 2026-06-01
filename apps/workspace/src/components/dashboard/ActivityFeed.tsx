const activities = [
  { actor: 'Dewi Rahmawati', initials: 'DR', type: 'user' as const, text: 'mengajukan PO-2026-0091 untuk persetujuan Anda.', time: '2m', highlight: 'PO-2026-0091' },
  { actor: 'AR Collector', initials: '🤖', type: 'agent' as const, text: 'kirim 18 reminder email pakai template dunning-1.', time: '14m' },
  { actor: 'Fitri Nurhaliza', initials: 'FN', type: 'user' as const, text: 'menutup deal PT Anugerah Bumi · Q2 — Rp 178.000.000', time: '38m' },
  { actor: 'Sistem', initials: '⚙', type: 'system' as const, text: 'menyelesaikan sinkronisasi BPJS Ketenagakerjaan · 218 karyawan.', time: '1h' },
  { actor: 'Rizky Hidayat', initials: 'RH', type: 'user' as const, text: 'menambah catatan pada faktur INV-2026-0179.', time: '2h' },
];

export function ActivityFeed() {
  return (
    <div className="kc-card">
      <div className="kc-card-head">
        <div>
          <div className="kc-card-title">Aktivitas terbaru</div>
          <div className="kc-card-sub">Lintas modul · 5 menit terakhir</div>
        </div>
        <span className="kc-badge kc-badge-success"><span className="kc-dot"></span>Live · 14 online</span>
      </div>
      <div>
        {activities.map((a, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 10, padding: '8px 14px', borderTop: i > 0 ? '1px solid var(--border-subtle)' : undefined, alignItems: 'start' }}>
            <div className="kc-avatar kc-avatar-xs" style={a.type === 'agent' ? { background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' } : a.type === 'system' ? { background: 'var(--neutral-200)' } : undefined}>
              {a.initials}
            </div>
            <div style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-secondary)', minWidth: 0 }}>
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{a.actor}</strong> {a.text}
            </div>
            <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
