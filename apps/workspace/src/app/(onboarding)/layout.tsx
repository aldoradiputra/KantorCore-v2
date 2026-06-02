import '@/styles/design-tokens.css';
import '@/styles/components.css';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}
