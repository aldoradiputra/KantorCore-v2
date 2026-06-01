export default function LoginPage() {
  return (
    <div style={{ maxWidth: 380, width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ font: '700 22px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Welcome back.</div>
      <div style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--text-secondary)' }}>
        Sign in to <strong>PT Acme Indonesia</strong>. Different workspace? <a href="#">Switch →</a>
      </div>

      <button style={{ width: '100%', height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', font: '500 13px/1 var(--font-sans)', color: 'var(--text-primary)', cursor: 'pointer' }}>
        Continue with Google
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', font: '500 11px/1 var(--font-sans)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '4px 0' }}>
        <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        or
        <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      </div>

      <div className="kc-field">
        <label className="kc-field-label">Work email</label>
        <input className="kc-input" type="email" defaultValue="andi@acme.id" />
      </div>
      <div className="kc-field">
        <label className="kc-field-label">Password</label>
        <input className="kc-input" type="password" defaultValue="••••••••••••" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 12px/1 var(--font-sans)', color: 'var(--text-secondary)' }}>
            <input type="checkbox" className="kc-check" /> Remember me
          </label>
          <a href="#" style={{ font: '500 12px/1 var(--font-sans)' }}>Forgot?</a>
        </div>
      </div>

      <div style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', height: 64, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>
        <div style={{ width: 16, height: 16, border: '1.5px solid var(--state-success)', borderRadius: 3, background: 'var(--state-success)', display: 'grid', placeItems: 'center' }}>
          <span style={{ color: 'white', fontSize: 10 }}>✓</span>
        </div>
        Success! You are human.
        <span style={{ marginLeft: 'auto', font: '500 10px/1 var(--font-mono)', color: 'var(--text-muted)' }}>Cloudflare</span>
      </div>

      <button className="kc-btn kc-btn-primary" style={{ width: '100%', height: 40 }}>Sign in</button>

      <div style={{ textAlign: 'center', font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>
        Or <a href="#" style={{ fontWeight: 500 }}>email me a magic link</a> instead.
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        New to KantorCore? <a href="/signup">Create a workspace →</a>
        <span style={{ marginLeft: 'auto' }}><a href="#">Privacy</a> · <a href="#">Terms</a></span>
      </div>
    </div>
  );
}
