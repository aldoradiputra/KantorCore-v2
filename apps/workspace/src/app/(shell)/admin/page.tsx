'use client';

import { useWorkspaceStore, type AdminSection } from '@/stores/useWorkspaceStore';
import { mockUsers } from '@/mocks/users';

const sectionLabels: Record<AdminSection, string> = {
  users: 'Users & groups', security: 'Security', brand: 'Branding', integrations: 'Integrations', 'model-meta': 'ModelMeta studio',
};

const roleStyles: Record<string, { bg: string; color: string }> = {
  admin: { bg: 'var(--state-warn-bg)', color: 'var(--state-warn)' },
  member: { bg: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' },
  guest: { bg: 'var(--fill-subtle)', color: 'var(--text-muted)' },
  autonomous: { bg: 'var(--state-success-bg)', color: 'var(--state-success)' },
};

const integrations = [
  { logo: 'DJP', logoBg: '#1A2B5A', name: 'CoreTax DJP · e-Faktur', desc: 'Submit e-Faktur, sync NPWP records.', status: 'Connected', statusVariant: 'success' },
  { logo: 'BPJS', logoBg: '#006A4E', name: 'BPJS Kesehatan + Ketenagakerjaan', desc: 'Employee enrollment, monthly contributions.', status: 'Connected', statusVariant: 'success' },
  { logo: 'QRIS', logoBg: '#0064D2', name: 'QRIS payment gateway', desc: 'Accept Bank Indonesia QRIS payments.', status: 'Connect', statusVariant: 'button' },
  { logo: 'WA', logoBg: '#2EB67D', name: 'WhatsApp Business · Cloud API', desc: '2-way customer chat for IS-OMNI.', status: 'Auth needed', statusVariant: 'warn' },
  { logo: 'GM', logoBg: '#EA4335', name: 'Gmail · OAuth', desc: 'Send and receive emails via members\' Gmail.', status: 'Connected', statusVariant: 'success' },
  { logo: 'TW', logoBg: '#5865F2', name: 'Voice telephony · Twilio', desc: 'Inbound + outbound calls.', status: 'Connect', statusVariant: 'button' },
];

export default function AdminPage() {
  const section = useWorkspaceStore((s) => s.activeAdminSection);
  const setSection = useWorkspaceStore((s) => s.setAdminSection);

  return (
    <div>
      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        {(Object.keys(sectionLabels) as AdminSection[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{ appearance: 'none', border: 0, background: section === s ? 'var(--fill-accent-subtle)' : 'transparent', padding: '6px 12px', borderRadius: 'var(--r-sm)', font: '500 13px/1 var(--font-sans)', color: section === s ? 'var(--text-accent)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: section === s ? 600 : 500, whiteSpace: 'nowrap' }}
          >
            {sectionLabels[s]}
          </button>
        ))}
      </div>

      {section === 'users' && (
        <div style={{ padding: '16px var(--gutter, 24px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h2 style={{ font: '700 18px/1.2 var(--font-sans)', color: 'var(--text-primary)', margin: 0 }}>Users &amp; groups</h2>
              <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)', margin: '4px 0 0' }}>218 members · 4 roles · <strong>3 invitations pending</strong></p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="kc-btn kc-btn-secondary kc-btn-sm">Import CSV</button>
              <button className="kc-btn kc-btn-primary kc-btn-sm">+ Invite people</button>
            </div>
          </div>
          <div className="kc-card" style={{ overflow: 'hidden' }}>
            <table className="kc-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Groups</th><th>Last active</th><th></th></tr></thead>
              <tbody>
                {mockUsers.map((u) => {
                  const rs = roleStyles[u.role] || roleStyles.member;
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="kc-avatar kc-avatar-sm" style={u.isBot ? { background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)' } : undefined}>
                            {u.isBot ? '🤖' : u.initials}
                          </div>
                          {u.name}
                        </div>
                      </td>
                      <td className="kc-mono">{u.email || '—'}</td>
                      <td>
                        <span style={{ font: '600 10px/1 var(--font-sans)', padding: '2px 7px', borderRadius: 'var(--r-full)', background: rs.bg, color: rs.color }}>
                          {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        </span>
                      </td>
                      <td>{u.groups.join(', ')}</td>
                      <td className="kc-mono kc-muted" style={{ color: u.status === 'invited' ? 'var(--state-warn)' : undefined }}>{u.lastActive}</td>
                      <td><button className="kc-btn kc-btn-ghost kc-btn-xs">⋮</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === 'integrations' && (
        <div style={{ padding: '16px var(--gutter, 24px)' }}>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ font: '700 18px/1.2 var(--font-sans)', color: 'var(--text-primary)', margin: 0 }}>Integrations</h2>
            <p style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)', margin: '4px 0 0' }}>Connect KantorCore to outside services.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {integrations.map((ig) => (
              <div key={ig.name} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 12, padding: '14px 16px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', background: 'var(--bg-surface)', alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: ig.logoBg, color: 'white', display: 'grid', placeItems: 'center', font: '700 14px/1 var(--font-sans)' }}>{ig.logo}</div>
                <div>
                  <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)' }}>{ig.name}</div>
                  <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{ig.desc}</div>
                </div>
                {ig.statusVariant === 'button' ? (
                  <button className="kc-btn kc-btn-secondary kc-btn-sm">{ig.status}</button>
                ) : (
                  <span className={`kc-badge kc-badge-${ig.statusVariant}`}><span className="kc-dot"></span>{ig.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!['users', 'integrations'].includes(section) && (
        <div style={{ padding: 'var(--gutter, 24px)', color: 'var(--text-muted)' }}>
          {sectionLabels[section]} — coming soon
        </div>
      )}
    </div>
  );
}
