'use client';

import { useWorkspaceStore, type ConversationSurface } from '@/stores/useWorkspaceStore';
import { mockThreads, mockMessages } from '@/mocks/conversations';

const surfaceLabels: Record<ConversationSurface, string> = { omni: 'Omnichannel', email: 'Team email', chat: 'Team chat', ticket: 'Helpdesk ticket' };

const channelMarks: Record<string, { bg: string; color: string }> = {
  whatsapp: { bg: '#25D366', color: 'white' },
  email: { bg: '#EA4335', color: 'white' },
  web_chat: { bg: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' },
  sms: { bg: '#9CA6E5', color: 'white' },
};

export default function ConversationsPage() {
  const surface = useWorkspaceStore((s) => s.activeConversationSurface);
  const setSurface = useWorkspaceStore((s) => s.setConversationSurface);
  const selectedThread = useWorkspaceStore((s) => s.selectedThreadId);
  const selectThread = useWorkspaceStore((s) => s.selectThread);

  const activeThread = mockThreads.find((t) => t.id === selectedThread) || mockThreads[0];
  const threadMessages = mockMessages.filter((m) => m.threadId === activeThread.id);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', height: '100%', minHeight: 0 }}>
      {/* Thread list */}
      <div style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', overflow: 'auto' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ font: '700 14px/1 var(--font-sans)' }}>{surfaceLabels[surface]}</div>
          <div style={{ flex: 1 }} />
        </div>
        <div style={{ padding: '8px 12px' }}>
          <input className="kc-input" placeholder="Cari…" style={{ width: '100%' }} />
        </div>
        {/* Surface switcher */}
        <div style={{ display: 'flex', gap: 4, padding: '4px 12px 8px', flexWrap: 'wrap' }}>
          {(Object.keys(surfaceLabels) as ConversationSurface[]).map((s) => (
            <button key={s} className={`kc-chip${surface === s ? ' kc-chip-active' : ''}`} onClick={() => setSurface(s)} style={{ fontSize: 11 }}>{surfaceLabels[s]}</button>
          ))}
        </div>
        {mockThreads.map((t) => {
          const cm = channelMarks[t.channelType] || channelMarks.email;
          return (
            <div
              key={t.id}
              onClick={() => selectThread(t.id)}
              style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'grid', gridTemplateColumns: '32px 1fr', gap: 10, background: t.id === activeThread.id ? 'var(--fill-accent-subtle)' : undefined }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', background: cm.bg, color: cm.color, fontSize: 12, fontWeight: 700 }}>
                {t.channelType.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: t.unread ? 700 : 500 }}>
                  {t.contactName}
                  <span style={{ marginLeft: 'auto', font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)', fontWeight: 500 }}>{t.timestamp}</span>
                </div>
                <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-secondary)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.preview}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                  {t.badges.map((b) => (
                    <span key={b.label} className={`kc-badge${b.variant !== 'default' ? ` kc-badge-${b.variant}` : ''}`} style={{ fontSize: 9 }}>{b.label}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message pane */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: 'var(--bg-surface)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--text-primary)' }}>{activeThread.contactName}</div>
            <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>
              {activeThread.channelType} · linked to {activeThread.linkedRecordId ? 'INV-2026-0179' : 'no record'}
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button className="kc-btn kc-btn-secondary kc-btn-sm">Assign</button>
          <button className="kc-btn kc-btn-secondary kc-btn-sm">Resolve</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--bg-canvas)' }}>
          <div style={{ textAlign: 'center', font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)', padding: '4px 0' }}>23 May · 09:14</div>
          {threadMessages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', gap: 8, maxWidth: '78%', alignSelf: msg.direction === 'outbound' ? 'flex-end' : 'flex-start', flexDirection: msg.direction === 'outbound' ? 'row-reverse' : 'row' }}>
              {msg.direction !== 'outbound' && (
                <div style={{ width: 24, height: 24, borderRadius: msg.senderType === 'agent' ? '50%' : 'var(--r-md)', background: msg.senderType === 'agent' ? 'var(--fill-accent-subtle)' : '#25D366', color: msg.senderType === 'agent' ? 'var(--text-accent)' : 'white', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                  {msg.senderType === 'agent' ? '🤖' : msg.senderInitials?.charAt(0)}
                </div>
              )}
              <div>
                <div style={{
                  background: msg.direction === 'outbound' ? 'var(--accent-600)' : msg.direction === 'internal' ? 'var(--fill-accent-subtle)' : 'var(--bg-surface)',
                  color: msg.direction === 'outbound' ? 'white' : msg.direction === 'internal' ? 'var(--text-accent)' : 'var(--text-primary)',
                  border: msg.direction === 'outbound' ? 'none' : msg.direction === 'internal' ? 'none' : '1px solid var(--border-subtle)',
                  padding: '8px 12px', borderRadius: 'var(--r-lg)', font: '400 13px/1.5 var(--font-sans)',
                }}>
                  {msg.senderType === 'agent' && <strong>AR Collector · internal note</strong>}
                  {msg.senderType === 'agent' && <br />}
                  {msg.content}
                </div>
                <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4, justifyContent: msg.direction === 'outbound' ? 'flex-end' : 'flex-start' }}>
                  {msg.direction === 'outbound' && `${msg.senderName} · `}{msg.timestamp} · {msg.channel}
                  {msg.status === 'read' && ' · ✓✓'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px 16px', background: 'var(--bg-surface)' }}>
          <textarea placeholder={`Reply via ${activeThread.channelType}…`} style={{ width: '100%', border: '1px solid var(--border-subtle)', background: 'var(--bg-sunken)', borderRadius: 'var(--r-md)', padding: '8px 10px', font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-primary)', resize: 'none', outline: 0, minHeight: 60 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            <button className="kc-btn kc-btn-ghost kc-btn-xs">✦ Suggest</button>
            <div style={{ flex: 1 }} />
            <button className="kc-btn kc-btn-secondary kc-btn-sm">Save draft</button>
            <button className="kc-btn kc-btn-primary kc-btn-sm">Send</button>
          </div>
        </div>
      </div>

      {/* Context panel */}
      <aside style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-subtle)', overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="kc-card" style={{ padding: '12px 14px' }}>
          <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 6 }}>Contact</div>
          {[
            ['Name', 'Sinta Wahyuni'],
            ['Title', 'Finance Manager'],
            ['Company', 'PT Acme Indonesia'],
            ['Phone', '+62 812 1144 5566'],
            ['Email', 'sinta@acme.id'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '86px 1fr', gap: 8, padding: '3px 0', fontSize: 12 }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="kc-card" style={{ padding: '12px 14px' }}>
          <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 6 }}>Linked record</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
            <div>
              <div style={{ font: '600 13px/1.3 var(--font-sans)' }}>INV-2026-0179</div>
              <div className="t-caption">Rp 145.000.000 · <span style={{ color: 'var(--state-danger)' }}>overdue 11d</span></div>
            </div>
          </div>
          <button className="kc-btn kc-btn-secondary kc-btn-sm" style={{ width: '100%', marginTop: 6 }}>Open record →</button>
        </div>
      </aside>
    </div>
  );
}
