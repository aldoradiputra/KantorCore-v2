import '@/styles/design-tokens.css';
import '@/styles/components.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      <aside style={{ background: 'var(--bg-inverted)', color: 'var(--text-inverted)', padding: '48px 56px', display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/assets/logo-on-dark.svg" alt="KantorCore" style={{ height: 26 }} />
        </div>
        <div>
          <h1 style={{ font: '700 36px/1.15 var(--font-sans)', color: '#fff', letterSpacing: '-0.03em', maxWidth: '14ch', margin: '0 0 16px' }}>Sistem operasi korporat — untuk pekerjaan nyata.</h1>
          <p style={{ font: '400 14px/1.6 var(--font-sans)', color: 'rgba(255,255,255,0.65)', maxWidth: '42ch', margin: 0 }}>
            &ldquo;KantorCore membantu kami menggabungkan pekerjaan finance, HR, dan sales dalam satu OS. Tidak perlu spreadsheet lagi.&rdquo;
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 8 }}>— Lestari Putri, CFO at PT Anugerah Bumi</span>
          </p>
        </div>
      </aside>
      <section style={{ padding: 56, display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
        {children}
      </section>
    </div>
  );
}
