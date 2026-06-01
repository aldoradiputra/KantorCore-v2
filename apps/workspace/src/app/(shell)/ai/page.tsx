'use client';

import { useWorkspaceStore, type AISection } from '@/stores/useWorkspaceStore';
import { mockAgentRuns, mockTools, mockMandates, mockProcesses } from '@/mocks/agents';

const sectionLabels: Record<AISection, string> = {
  inbox: 'Agent inbox', conversation: 'Conversation panel', wizard: 'AI field wizard',
  tools: 'Tool catalog', mandates: 'Mandates', runs: 'Run inspector', library: 'Process library',
};

const statusStyles: Record<string, { bg: string; color: string }> = {
  approval: { bg: 'var(--state-warn-bg)', color: 'var(--state-warn)' },
  done: { bg: 'var(--state-success-bg)', color: 'var(--state-success)' },
  failed: { bg: 'var(--state-danger-bg)', color: 'var(--state-danger)' },
  running: { bg: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' },
  review: { bg: 'var(--state-warn-bg)', color: 'var(--state-warn)' },
};

const processTypeStyles: Record<string, { bg: string; color: string; label: string }> = {
  deterministic: { bg: 'var(--state-success-bg)', color: 'var(--state-success)', label: 'DET' },
  hybrid: { bg: 'var(--state-info-bg)', color: 'var(--state-info)', label: 'HYBRID' },
  probabilistic: { bg: 'var(--state-warn-bg)', color: 'var(--state-warn)', label: 'PROB' },
};

export default function AIPage() {
  const section = useWorkspaceStore((s) => s.activeAISection);
  const setSection = useWorkspaceStore((s) => s.setAISection);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Subnav */}
      <div style={{ display: 'flex', gap: 4, padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', overflow: 'auto' }}>
        {(Object.keys(sectionLabels) as AISection[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{ appearance: 'none', border: 0, background: section === s ? 'var(--fill-accent-subtle)' : 'transparent', padding: '6px 12px', borderRadius: 'var(--r-sm)', font: '500 13px/1 var(--font-sans)', color: section === s ? 'var(--text-accent)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: section === s ? 600 : 500, whiteSpace: 'nowrap' }}
          >
            {sectionLabels[s]}
          </button>
        ))}
      </div>

      {/* Sections */}
      {section === 'inbox' && (
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', flex: 1, minHeight: 0 }}>
          <div style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', overflow: 'auto' }}>
            <div style={{ display: 'flex', padding: '10px 12px', gap: 6, borderBottom: '1px solid var(--border-subtle)' }}>
              <button className="kc-chip kc-chip-active">All 12</button>
              <button className="kc-chip">Pending</button>
              <button className="kc-chip">Failed</button>
            </div>
            {mockAgentRuns.map((run, i) => {
              const ss = statusStyles[run.status] || statusStyles.done;
              return (
                <div key={run.id} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10, padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', borderLeft: i === 0 ? '3px solid var(--accent-500)' : '3px solid transparent', background: i === 0 ? 'var(--fill-accent-subtle)' : undefined }}>
                  <div style={{ width: 32, height: 32, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', background: ss.bg, color: ss.color, flexShrink: 0 }}>
                    {run.status === 'failed' ? '⚠' : '🤖'}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {run.agentName}
                      <span style={{ marginLeft: 'auto', font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>{run.timestamp}</span>
                    </div>
                    <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-secondary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{run.summary}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <span className={`kc-badge kc-badge-${run.status === 'done' ? 'success' : run.status === 'failed' ? 'danger' : run.status === 'running' ? 'info' : 'warn'}`} style={{ fontSize: 9 }}>
                        {run.status === 'running' && <span className="kc-dot"></span>}
                        {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                      </span>
                      {run.module && <span className="kc-badge" style={{ fontSize: 9 }}>{run.module}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ overflow: 'auto', padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--r-lg)', background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)', display: 'grid', placeItems: 'center', fontSize: 20 }}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: '700 18px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Lead Triager</div>
                <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>Triages new leads, drafts personalized first responses</div>
              </div>
            </div>
            <div className="kc-banner" style={{ marginBottom: 16 }}>
              <strong>4 leads ready for review.</strong> Drafts are below — approve to send, edit to refine, or skip.
            </div>
            <div className="kc-card" style={{ marginBottom: 12 }}>
              <div className="kc-card-head">
                <div>
                  <div className="kc-card-title">Lead · Bayu Wicaksono · CV Permata Indah</div>
                  <div className="kc-card-sub">From web form · scored <strong style={{ color: 'var(--state-success)' }}>High (0.84)</strong></div>
                </div>
                <span className="kc-badge kc-badge-info"><span className="kc-dot"></span>Draft ready</span>
              </div>
              <div className="kc-card-body">
                <div style={{ marginTop: 12, padding: 12, background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', fontSize: 13, lineHeight: 1.55, color: 'var(--text-primary)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Selamat siang Pak Bayu,</div>
                  Terima kasih telah menghubungi KantorCore. Saya melihat CV Permata Indah tertarik dengan modul HR &amp; Payroll dengan integrasi BPJS — ini area yang kami siapkan khusus untuk perusahaan menengah Indonesia.
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <button className="kc-btn kc-btn-primary kc-btn-sm">Approve &amp; send</button>
                  <button className="kc-btn kc-btn-secondary kc-btn-sm">Edit draft</button>
                  <button className="kc-btn kc-btn-ghost kc-btn-sm">Skip</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {section === 'tools' && (
        <div>
          <div className="kc-page-head">
            <div>
              <div className="kc-page-title">Tool catalog</div>
              <div className="kc-page-sub">86 registered tools across 14 modules</div>
            </div>
            <div className="kc-spacer" style={{ flex: 1 }} />
            <button className="kc-btn kc-btn-primary kc-btn-sm">+ Register tool</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: '16px var(--gutter, 24px)' }}>
            {mockTools.map((t) => (
              <div className="kc-card" key={t.name} style={{ padding: 14 }}>
                <div style={{ font: '600 14px/1.3 var(--font-mono)', color: 'var(--text-primary)', marginBottom: 4 }}>{t.name}</div>
                <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-secondary)', marginBottom: 10 }}>{t.description}</div>
                <div style={{ display: 'flex', gap: 12, font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>{t.module}</span><span>·</span><span>{t.scope}</span><span>·</span><span>{t.invocations7d} / 7d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'mandates' && (
        <div>
          <div className="kc-page-head">
            <div>
              <div className="kc-page-title">Mandates</div>
              <div className="kc-page-sub">Per-agent, per-entity grants · auditable, revocable</div>
            </div>
            <div className="kc-spacer" style={{ flex: 1 }} />
            <button className="kc-btn kc-btn-primary kc-btn-sm">+ Grant mandate</button>
          </div>
          <div className="kc-content" style={{ padding: 'var(--gutter, 24px)' }}>
            <div className="kc-card" style={{ overflow: 'hidden' }}>
              <table className="kc-table kc-table-compact">
                <thead><tr><th>Agent</th><th>Entity</th><th>Actions</th><th>Conditions</th><th>Granted by</th><th>Expires</th></tr></thead>
                <tbody>
                  {mockMandates.map((m) => (
                    <tr key={m.id}>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div className="kc-avatar kc-avatar-xs" style={{ background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' }}>🤖</div>{m.agentName}</div></td>
                      <td className="kc-mono">{m.entity}</td>
                      <td>{m.actions.map((a) => <span key={a.label} className={`kc-badge${a.variant !== 'default' ? ` kc-badge-${a.variant}` : ''}`} style={{ marginRight: 4 }}>{a.label}</span>)}</td>
                      <td className="kc-mono kc-muted" style={{ fontSize: 11 }}>{m.conditions || '—'}</td>
                      <td>{m.grantedBy}</td>
                      <td className="kc-mono">{m.expiresAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {section === 'library' && (
        <div>
          <div className="kc-page-head">
            <div>
              <div className="kc-page-title">Process Library</div>
              <div className="kc-page-sub">Composable workflows · deterministic, probabilistic, or hybrid</div>
            </div>
            <div className="kc-spacer" style={{ flex: 1 }} />
            <button className="kc-btn kc-btn-primary kc-btn-sm">+ New process</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: '16px var(--gutter, 24px)' }}>
            {mockProcesses.map((p) => {
              const pts = processTypeStyles[p.type] || processTypeStyles.deterministic;
              return (
                <div className="kc-card" key={p.id} style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--text-primary)', flex: 1 }}>{p.name}</div>
                    <span style={{ font: '600 10px/1 var(--font-sans)', padding: '2px 6px', borderRadius: 'var(--r-sm)', letterSpacing: '0.04em', textTransform: 'uppercase', background: pts.bg, color: pts.color }}>{pts.label}</span>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ font: '400 12px/1.55 var(--font-sans)', color: 'var(--text-secondary)', marginBottom: 12 }}>{p.description}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                      {p.steps.map((step, i) => (
                        <span key={i}>
                          <span style={{ padding: '3px 6px', background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)', borderRadius: 'var(--r-xs)', font: '500 10px/1 var(--font-mono)' }}>{step}</span>
                          {i < p.steps.length - 1 && <span style={{ color: 'var(--border-strong)', margin: '0 2px' }}>→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-sunken)' }}>
                    <span className="kc-muted" style={{ fontSize: 11 }}>{p.lastRunSummary}</span>
                    <div style={{ flex: 1 }} />
                    <button className="kc-btn kc-btn-secondary kc-btn-xs">▶ Run</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!['inbox', 'tools', 'mandates', 'library'].includes(section) && (
        <div style={{ padding: 'var(--gutter, 24px)', color: 'var(--text-muted)' }}>
          {sectionLabels[section]} — coming soon
        </div>
      )}
    </div>
  );
}
