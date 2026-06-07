'use client';

import { useState } from 'react';

type PortalViewMode = 'home' | 'magic' | 'kms';

export default function PortalPreviewPage() {
  const [pview, setPview] = useState<PortalViewMode>('home');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)' }}>
      {/* View switcher */}
      <div style={{ position: 'fixed', top: 16, right: 24, zIndex: 10, display: 'flex', gap: 6 }}>
        {(['home', 'magic', 'kms'] as PortalViewMode[]).map((v) => (
          <button key={v} className={`kc-btn kc-btn-secondary kc-btn-sm${pview === v ? ' kc-btn-primary' : ''}`} onClick={() => setPview(v)} style={pview === v ? { background: 'var(--accent-600)', color: '#fff', borderColor: 'var(--accent-600)' } : undefined}>
            {v === 'home' ? 'Portal home' : v === 'magic' ? 'Magic link' : 'KMS article'}
          </button>
        ))}
      </div>

      {/* ─── HOME ─── */}
      {pview === 'home' && (
        <>
          <header style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '0 32px', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '700 16px/1 var(--font-sans)', color: 'var(--text-primary)' }}>
              <div style={{ width: 32, height: 32, background: 'var(--accent-600)', color: '#fff', borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', font: '700 14px/1 var(--font-sans)' }}>A</div>
              PT Acme Indonesia
            </div>
            <nav style={{ display: 'flex', gap: 4 }}>
              {['Home', 'Invoices', 'Tickets', 'Knowledge base', 'Documents'].map((item, i) => (
                <span key={item} style={{ padding: '6px 12px', borderRadius: 'var(--r-sm)', font: '500 13px/1 var(--font-sans)', color: i === 0 ? 'var(--text-accent)' : 'var(--text-secondary)', background: i === 0 ? 'var(--fill-accent-subtle)' : undefined, fontWeight: i === 0 ? 600 : undefined, cursor: 'pointer' }}>{item}</span>
              ))}
            </nav>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 13px/1 var(--font-sans)', color: 'var(--text-primary)' }}>
              <div className="kc-avatar kc-avatar-sm" style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-600)', color: '#fff', display: 'grid', placeItems: 'center', font: '600 10px/1 var(--font-sans)' }}>SW</div>
              Sinta · sinta@acme.id
            </div>
          </header>

          <div style={{ padding: '64px 48px', background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-canvas) 100%)', borderBottom: '1px solid var(--border-subtle)' }}>
            <h1 style={{ font: '700 36px/1.15 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 8, maxWidth: '18ch' }}>Halo Bu Sinta — welcome back.</h1>
            <p style={{ font: '400 16px/1.55 var(--font-sans)', color: 'var(--text-secondary)', maxWidth: '56ch' }}>This is your account home for PT Acme Indonesia. Pay open invoices, raise a support ticket, or browse our help articles. We&apos;re here Mon–Fri 09:00–18:00 WIB.</p>
          </div>

          <div style={{ padding: '32px 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16, marginBottom: 16 }}>
              <div className="kc-card" style={{ padding: 20 }}>
                <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 4 }}>Outstanding invoices · 2</div>
                <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginBottom: 16 }}>Total <strong style={{ color: 'var(--state-danger)', fontFamily: 'var(--font-mono)' }}>Rp 153.430.000</strong> due</div>

                {[
                  { num: 'INV-2026-0179', meta: 'Issued 12 Apr · due 12 May', overdue: 'overdue 11d', status: 'Overdue', statusClass: 'kc-badge-danger', amt: 'Rp 145.000.000', primary: true },
                  { num: 'INV-2026-0184', meta: 'Issued 28 Apr · due 28 May', status: 'Open', statusClass: 'kc-badge-info', amt: 'Rp 8.430.000', primary: false },
                ].map((inv) => (
                  <div key={inv.num} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center' }}>
                    <div>
                      <div style={{ font: '600 13px/1.3 var(--font-mono)', color: 'var(--text-primary)' }}>{inv.num}</div>
                      <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{inv.meta}{inv.overdue && <> · <strong style={{ color: 'var(--state-danger)' }}>{inv.overdue}</strong></>}</div>
                    </div>
                    <span className={`kc-badge ${inv.statusClass}`} style={{ fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />{inv.status}</span>
                    <div style={{ font: '600 14px/1 var(--font-mono)', color: 'var(--text-primary)' }}>{inv.amt}</div>
                    <button className={`kc-btn ${inv.primary ? 'kc-btn-primary' : 'kc-btn-secondary'} kc-btn-sm`}>{inv.primary ? 'Pay now' : 'Pay'}</button>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}><a href="#" style={{ fontSize: 13, fontWeight: 600 }}>View all invoices →</a></div>
              </div>

              <div className="kc-card" style={{ padding: 20 }}>
                <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 4 }}>Your tickets · 1 open</div>
                <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginBottom: 16 }}>Average response time: 2h 14m</div>
                {[
                  { id: '#KC-2018', title: 'Sync BPJS error', meta: 'Open · awaiting your response · updated 1h ago', status: 'Open', cls: 'kc-badge-warn' },
                  { id: '#KC-2007', title: 'Pricelist multi-currency', meta: 'Resolved · 1d ago', status: 'Resolved', cls: 'kc-badge-success' },
                ].map((tk) => (
                  <div key={tk.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{tk.id} · {tk.title}</div>
                      <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{tk.meta}</div>
                    </div>
                    <span className={`kc-badge ${tk.cls}`} style={{ fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4, alignSelf: 'center' }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />{tk.status}</span>
                  </div>
                ))}
                <button className="kc-btn kc-btn-primary kc-btn-sm" style={{ marginTop: 14, width: '100%' }}>Submit a new ticket</button>
              </div>
            </div>

            <div className="kc-card" style={{ padding: 20 }}>
              <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 4 }}>Knowledge base</div>
              <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginBottom: 16 }}>Quick answers to common questions, in Bahasa Indonesia.</div>
              <input className="kc-input" placeholder="Search articles…" style={{ marginBottom: 12 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { name: 'BPJS sync errors', desc: 'Resolve "NIK needs verification" and other common sync failures.' },
                  { name: 'Payment via QRIS', desc: 'Pay any invoice using your favorite QRIS app — 30-second guide.' },
                  { name: 'e-Faktur for tagged transactions', desc: 'How CoreTax DJP integration auto-generates faktur for taxable items.' },
                ].map((tile) => (
                  <div key={tile.name} className="kc-card" style={{ padding: 16, cursor: 'pointer' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--text-primary)' }}>{tile.name}</div>
                    <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{tile.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── MAGIC LINK ─── */}
      {pview === 'magic' && (
        <>
          <header style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '0 32px', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '700 16px/1 var(--font-sans)', color: 'var(--text-primary)' }}>
              <div style={{ width: 32, height: 32, background: 'var(--accent-600)', color: '#fff', borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', font: '700 14px/1 var(--font-sans)' }}>A</div>
              PT Acme Indonesia
            </div>
          </header>
          <div style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', placeItems: 'center', padding: 48 }}>
            <div style={{ width: 480, maxWidth: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-xl)', padding: 40, textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--fill-accent-subtle)', color: 'var(--text-accent)', display: 'grid', placeItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <h2 style={{ font: '700 22px/1.3 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 8 }}>Welcome, Bu Sinta.</h2>
              <p style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-secondary)', marginBottom: 24 }}>
                You&apos;ve been signed in with a one-time link sent to <strong>sinta@acme.id</strong>. This link expires in <strong>15 minutes</strong>. Click below to access your customer portal.
              </p>
              <button className="kc-btn kc-btn-primary kc-btn-lg" style={{ width: '100%' }}>Continue to portal →</button>
              <div style={{ marginTop: 24, textAlign: 'left', background: 'var(--state-warn-bg)', padding: '12px 16px', borderRadius: 'var(--r-md)', font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-primary)' }}>
                <strong>Warning:</strong> If this wasn&apos;t you, report and revoke this link. Your account has not been compromised — magic links are signed and single-use.
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── KMS ARTICLE ─── */}
      {pview === 'kms' && (
        <>
          <header style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '0 32px', display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '700 16px/1 var(--font-sans)', color: 'var(--text-primary)' }}>
              <div style={{ width: 32, height: 32, background: 'var(--accent-600)', color: '#fff', borderRadius: 'var(--r-md)', display: 'grid', placeItems: 'center', font: '700 14px/1 var(--font-sans)' }}>A</div>
              PT Acme Indonesia
            </div>
            <nav style={{ display: 'flex', gap: 4 }}>
              {['Home', 'Invoices', 'Tickets', 'Knowledge base'].map((item) => (
                <span key={item} style={{ padding: '6px 12px', borderRadius: 'var(--r-sm)', font: '500 13px/1 var(--font-sans)', color: item === 'Knowledge base' ? 'var(--text-accent)' : 'var(--text-secondary)', background: item === 'Knowledge base' ? 'var(--fill-accent-subtle)' : undefined, fontWeight: item === 'Knowledge base' ? 600 : undefined, cursor: 'pointer' }}>{item}</span>
              ))}
            </nav>
          </header>
          <article style={{ maxWidth: 760, margin: '0 auto', padding: '32px 48px' }}>
            <div style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--text-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>BPJS · troubleshooting</div>
            <h1 style={{ font: '700 32px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 16 }}>Resolving &quot;NIK needs verification&quot; during BPJS sync</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)', marginBottom: 24, font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-600)', color: '#fff', display: 'grid', placeItems: 'center', font: '600 10px/1 var(--font-sans)' }}>AW</div>
              <div><div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Andi Wijaya</div><div>Updated 19 May 2026 · 4 min read · 1,847 views</div></div>
            </div>
            <p style={{ font: '400 15px/1.7 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 12 }}>
              BPJS Ketenagakerjaan sync may fail for one or more employees with the error <code style={{ background: 'var(--bg-sunken)', padding: '1px 6px', borderRadius: 'var(--r-xs)', fontSize: 13 }}>NIK needs verification</code>. This happens when Dukcapil flags a NIK for re-verification.
            </p>
            <h2 style={{ font: '700 22px/1.3 var(--font-sans)', color: 'var(--text-primary)', marginTop: 32, marginBottom: 12, letterSpacing: '-0.02em' }}>Why it happens</h2>
            <p style={{ font: '400 15px/1.7 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 12 }}>The BPJS API performs a real-time lookup against Dukcapil on every employee enrollment. If Dukcapil returns <code style={{ background: 'var(--bg-sunken)', padding: '1px 6px', borderRadius: 'var(--r-xs)', fontSize: 13 }}>requires_verification</code>, the API rejects the sync.</p>
            <div style={{ background: 'var(--fill-accent-subtle)', borderLeft: '3px solid var(--accent-500)', padding: '12px 16px', borderRadius: '0 var(--r-md) var(--r-md) 0', margin: '16px 0', fontSize: 14 }}>
              <strong>Note:</strong> This is a Dukcapil-side check — KantorCore cannot bypass it. Re-verification is usually completed within 1–3 business days.
            </div>
            <h2 style={{ font: '700 22px/1.3 var(--font-sans)', color: 'var(--text-primary)', marginTop: 32, marginBottom: 12, letterSpacing: '-0.02em' }}>Fix it in 4 steps</h2>
            <ol style={{ margin: '12px 0 12px 24px' }}>
              {[
                <>Open the affected employee record in <strong>HR → Employees</strong>.</>,
                <>Check the <strong>BPJS Sync</strong> tab — you&apos;ll see the exact rejection reason.</>,
                'Ask the employee to visit their local Disdukcapil office with a current KTP.',
                <>Once updated, come back and click <strong>Retry sync</strong> on the employee record.</>,
              ].map((step, i) => (
                <li key={i} style={{ font: '400 15px/1.7 var(--font-sans)', color: 'var(--text-primary)', marginBottom: 4 }}>{step}</li>
              ))}
            </ol>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <button className="kc-btn kc-btn-primary kc-btn-sm">Submit a ticket</button>
              <button className="kc-btn kc-btn-secondary kc-btn-sm">Chat with us</button>
            </div>
            <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Was this article helpful?</span>
              <button className="kc-btn kc-btn-secondary kc-btn-sm">Yes</button>
              <button className="kc-btn kc-btn-secondary kc-btn-sm">No</button>
            </div>
          </article>
        </>
      )}
    </div>
  );
}
