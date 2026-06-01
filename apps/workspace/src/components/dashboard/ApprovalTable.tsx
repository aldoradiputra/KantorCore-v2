const approvals = [
  { from: 'Dewi Rahmawati', initials: 'DR', item: 'PO-2026-0091', module: 'IS-PURCH', amount: 'Rp 12.450.000', age: '2h' },
  { from: 'Surya Saputra', initials: 'SS', item: 'EXP-2026-0418', module: 'IS-EXP', amount: 'Rp 3.890.000', age: '5h' },
  { from: 'Rizky Hidayat', initials: 'RH', item: 'INV-2026-0179', module: 'IS-FIN', amount: 'Rp 145.000.000', age: '1d' },
  { from: 'Putri Setiawan', initials: 'PS', item: 'Cuti tahunan', module: 'IS-HR', amount: '5 hari', age: '3h' },
  { from: 'Fitri Nurhaliza', initials: 'FN', item: 'SO-2026-0218 · diskon 8%', module: 'IS-SALES', amount: 'Rp 197.580.000', age: '6h' },
];

export function ApprovalTable() {
  return (
    <div className="kc-card">
      <div className="kc-card-head">
        <div>
          <div className="kc-card-title">Persetujuan tertunda</div>
          <div className="kc-card-sub">12 menunggu Anda</div>
        </div>
        <button className="kc-btn kc-btn-ghost kc-btn-sm">Lihat semua</button>
      </div>
      <table className="kc-table kc-table-compact">
        <thead>
          <tr><th>Dari</th><th>Item</th><th>Modul</th><th className="kc-th-num">Jumlah</th><th>Umur</th><th></th></tr>
        </thead>
        <tbody>
          {approvals.map((a) => (
            <tr key={a.item}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div className="kc-avatar kc-avatar-xs">{a.initials}</div>
                  {a.from}
                </div>
              </td>
              <td className="kc-mono">{a.item}</td>
              <td><span className="kc-tag">{a.module}</span></td>
              <td className="kc-td-num kc-mono">{a.amount}</td>
              <td className="kc-mono kc-muted">{a.age}</td>
              <td><button className="kc-btn kc-btn-secondary kc-btn-xs">Tinjau</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
