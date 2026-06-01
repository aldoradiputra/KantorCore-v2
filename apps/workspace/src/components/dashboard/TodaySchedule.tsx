const events = [
  { time: '09:00', title: 'Standup mingguan', subtitle: 'Engineering · Google Meet' },
  { time: '11:00', title: 'Review Q2 forecast', subtitle: 'Lestari, Andi' },
  { time: '14:30', title: 'Demo · PT Anugerah Bumi', subtitle: 'Closing call · Fitri' },
];

export function TodaySchedule() {
  return (
    <div className="kc-card">
      <div className="kc-card-head">
        <div className="kc-card-title">Hari ini</div>
        <span className="kc-mono kc-muted" style={{ fontSize: 11 }}>Sen 23 Mei</span>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((e) => (
          <div key={e.time} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 12, alignItems: 'start' }}>
            <span className="kc-mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.time}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{e.title}</div>
              <div className="kc-caption">{e.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
