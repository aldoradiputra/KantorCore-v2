'use client';

import { mockInvoice } from '@/mocks/invoices';

const pipeStages = ['Draft', 'Sent', 'Overdue', 'Paid', 'Closed'];
const activeStageIndex = 2;

function formatRp(n: number) {
  return n.toLocaleString('id-ID');
}

export function RecordDetail() {
  const inv = mockInvoice;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Record header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '14px var(--gutter, 24px) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--text-muted)', padding: '3px 6px', background: 'var(--fill-subtle)', borderRadius: 'var(--r-sm)' }}>{inv.number}</span>
          <span style={{ font: '700 22px/1.25 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{inv.customerName}</span>
          <span className="kc-badge kc-badge-danger" style={{ fontSize: 11 }}><span className="kc-dot"></span>Overdue · {inv.daysOverdue}d</span>
          <div style={{ flex: 1 }} />
          <button className="kc-btn kc-btn-secondary kc-btn-sm">Unduh PDF</button>
          <button className="kc-btn kc-btn-secondary kc-btn-sm">Kirim reminder</button>
          <button className="kc-btn kc-btn-primary kc-btn-sm">Catat pembayaran</button>
        </div>

        {/* Pipeline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div className="kc-pipeline" style={{ display: 'flex' }}>
            {pipeStages.map((s, i) => (
              <div key={s} className={`kc-pipe${i < activeStageIndex ? ' kc-pipe-done' : i === activeStageIndex ? ' kc-pipe-active' : ''}`}>{s}</div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <span className="kc-mono kc-muted" style={{ fontSize: 11 }}>Last edited 2 min ago by {inv.ownerName}</span>
        </div>

        {/* Smart buttons */}
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 'minmax(120px, 1fr)', gap: 1, background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', overflow: 'hidden', marginBottom: 12 }}>
          {[
            { val: `Rp ${formatRp(inv.total)}`, lbl: 'Total' },
            { val: String(inv.items.length), lbl: 'Items' },
            { val: String(inv.reminderCount), lbl: 'Reminders sent' },
            { val: inv.linkedPo || '—', lbl: 'Linked PO' },
            { val: String(inv.activityCount), lbl: 'Activity events' },
          ].map((sb) => (
            <div key={sb.lbl} style={{ background: 'var(--bg-surface)', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2, cursor: 'pointer' }}>
              <span style={{ font: '700 18px/1 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }} className="kc-mono">{sb.val}</span>
              <span style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{sb.lbl}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)' }}>
          {['Detail', `Items (${inv.items.length})`, `Payments (${inv.paymentCount})`, `Reminders (${inv.reminderCount})`, 'Attachments (2)', 'Audit trail'].map((t, i) => (
            <div key={t} style={{ padding: '11px 14px', font: '500 13px/1 var(--font-sans)', color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', borderBottom: i === 0 ? '2px solid var(--accent-500)' : '2px solid transparent', marginBottom: -1, cursor: 'pointer', fontWeight: i === 0 ? 600 : 500 }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', flex: 1, minHeight: 0 }}>
        {/* Form */}
        <div style={{ padding: '18px var(--gutter, 24px)', overflow: 'auto' }}>
          {/* Detail section */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, background: 'var(--accent-500)', borderRadius: '50%' }}></span>
              Detail invoice
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: 16 }}>
              {[
                ['Customer', `${inv.customerName} · NPWP ${inv.customerNpwp}`],
                ['Invoice #', inv.number],
                ['Issued', inv.issuedAt],
                ['Due', `${inv.dueDate} · ${inv.daysOverdue}d overdue`],
                ['Term', inv.terms],
                ['PIC', `${inv.picName} · ${inv.picPhone}`],
                ['Linked PO', inv.linkedPo || '—'],
                ['Owner', inv.ownerName],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'baseline', padding: '6px 0' }}>
                  <span style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', paddingTop: 4 }}>{label}</span>
                  <span style={{ font: '500 13px/1.5 var(--font-sans)', color: 'var(--text-primary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line items */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, background: 'var(--accent-500)', borderRadius: '50%' }}></span>
              Line items · {inv.items.length}
            </div>
            <div className="kc-card" style={{ overflow: 'hidden' }}>
              <table className="kc-table kc-table-compact">
                <thead><tr><th style={{ width: 28 }}>#</th><th>Description</th><th className="kc-th-num">Qty</th><th className="kc-th-num">Unit price</th><th className="kc-th-num">Total</th></tr></thead>
                <tbody>
                  {inv.items.map((li) => (
                    <tr key={li.id}>
                      <td className="kc-muted">{li.lineNumber}</td>
                      <td>{li.description}</td>
                      <td className="kc-td-num">{li.quantity}</td>
                      <td className="kc-td-num kc-mono">{formatRp(li.unitPrice)}</td>
                      <td className="kc-td-num kc-mono">{formatRp(li.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr><td colSpan={4} style={{ textAlign: 'right', color: 'var(--text-muted)' }}>Subtotal</td><td className="kc-td-num kc-mono">{formatRp(inv.subtotal)}</td></tr>
                  <tr><td colSpan={4} style={{ textAlign: 'right', color: 'var(--text-muted)' }}>PPN {inv.taxRate}%</td><td className="kc-td-num kc-mono">{formatRp(inv.taxAmount)}</td></tr>
                  <tr style={{ fontWeight: 600 }}><td colSpan={4} style={{ textAlign: 'right', borderTop: '2px solid var(--border-strong)' }}>Total</td><td className="kc-td-num kc-mono" style={{ fontSize: 15, borderTop: '2px solid var(--border-strong)' }}>Rp {formatRp(inv.total)}</td></tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* AI Fields */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, background: 'var(--accent-500)', borderRadius: '50%' }}></span>
              AI insights
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {inv.aiFields.map((af) => (
                <div key={af.label} className="kc-ai-field">
                  <div className="kc-ai-field-head">✦ {af.label}</div>
                  <div className="kc-ai-field-value">{af.value}</div>
                  <div className="kc-ai-field-meta">
                    <span>{af.lastRunAt}</span>
                    <span className="kc-meta-sep">·</span>
                    <span>{af.model}</span>
                    <span className="kc-meta-sep">·</span>
                    <span>{af.trigger}</span>
                    <button className="kc-btn kc-btn-ghost kc-btn-xs" style={{ marginLeft: 'auto' }}>Re-run</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chatter aside */}
        <aside style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-subtle)', overflow: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderBottom: '1px solid var(--border-subtle)', font: '500 11px/1 var(--font-sans)', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <span>Followers · 5</span>
            <div className="kc-avatar-group">
              <div className="kc-avatar kc-avatar-xs">AW</div>
              <div className="kc-avatar kc-avatar-xs">DR</div>
              <div className="kc-avatar kc-avatar-xs">RH</div>
            </div>
            <div style={{ flex: 1 }} />
            <button className="kc-btn kc-btn-ghost kc-btn-xs">+ Follow</button>
          </div>

          <div style={{ padding: '12px 16px' }}>
            {/* Composer */}
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', background: 'var(--bg-surface)', padding: '8px 10px', marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 4, paddingBottom: 4 }}>
                {['Note', 'Log activity', 'Send email'].map((t, i) => (
                  <span key={t} style={{ font: '500 11px/1 var(--font-sans)', color: i === 0 ? 'var(--text-accent)' : 'var(--text-muted)', padding: '4px 8px', borderRadius: 'var(--r-sm)', cursor: 'pointer', background: i === 0 ? 'var(--fill-accent-subtle)' : undefined }}>{t}</span>
                ))}
              </div>
              <textarea placeholder="Tulis catatan internal... (gunakan @ untuk mention)" style={{ width: '100%', border: 0, outline: 0, background: 'transparent', resize: 'none', font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-primary)', minHeight: 40 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button className="kc-btn kc-btn-ghost kc-btn-xs">✦ Draft with AI</button>
                <div style={{ flex: 1 }} />
                <button className="kc-btn kc-btn-primary kc-btn-xs">Log</button>
              </div>
            </div>

            {/* Chatter items */}
            {inv.chatter.map((c) => (
              <div key={c.id} className="kc-chatter-item">
                <div className="kc-avatar kc-avatar-sm" style={
                  c.actorType === 'agent' ? { background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' } :
                  c.actorType === 'system' ? { background: 'var(--neutral-200)' } : undefined
                }>
                  {c.actorType === 'agent' ? '🤖' : c.actorType === 'system' ? '⚙' : c.actorInitials}
                </div>
                <div className="kc-chatter-body">
                  <div className="kc-chatter-head">
                    <span className="kc-chatter-actor">{c.actorName}</span>
                    {c.badges?.map((b) => <span key={b} className="kc-badge" style={{ fontSize: 9, padding: '1px 4px' }}>{b}</span>)}
                    <span className="kc-chatter-action">{c.action}</span>
                    <span className="kc-chatter-time">{c.timestamp}</span>
                  </div>
                  {c.content && <div className={`kc-chatter-content${c.actorType === 'system' ? ' kc-system' : ''}`}>{c.content}</div>}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
