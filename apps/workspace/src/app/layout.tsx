import type { Metadata } from 'next';
import '@/styles/design-tokens.css';
import '@/styles/components.css';
import '@/styles/shell.css';
import '@/styles/bento.css';
import '@/styles/studio.css';
import '@/styles/portals.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'KantorCore',
  description: 'Headless Sovereign Enterprise OS',
  icons: { icon: '/assets/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-accent="indigo" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
