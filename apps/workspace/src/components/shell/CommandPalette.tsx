'use client';

import { useEffect, useState } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

type PaletteItem = { icon: string; name: string; meta?: string; focused?: boolean };
type PaletteSection = { section: string; items: PaletteItem[] };

const paletteResults: PaletteSection[] = [
  { section: 'Records · 4', items: [
    { icon: 'invoice', name: 'INV-2026-0179', meta: 'PT Acme Indonesia · overdue 11d', focused: true },
    { icon: 'invoice', name: 'INV-2026-0184', meta: 'PT Maju Bersama · sent' },
    { icon: 'invoice', name: 'INV-2026-0173', meta: 'CV Bintang Timur · overdue 21d' },
  ]},
  { section: 'Actions', items: [
    { icon: 'plus', name: 'Buat invoice baru', meta: 'C I' },
    { icon: 'download', name: 'Ekspor invoice ke CSV' },
  ]},
  { section: 'Agents', items: [
    { icon: 'bot', name: 'Jalankan "AR Collector" untuk semua overdue', meta: 'A R' },
  ]},
];

export function CommandPalette() {
  const isOpen = useWorkspaceStore((s) => s.commandPaletteOpen);
  const toggle = useWorkspaceStore((s) => s.toggleCommandPalette);
  const [query, setQuery] = useState('invoice');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggle(); }
      if (e.key === 'Escape' && isOpen) toggle();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, toggle]);

  if (!isOpen) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-command)' as string, background: 'var(--bg-overlay)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 96 }}
      onClick={(e) => { if (e.target === e.currentTarget) toggle(); }}
    >
      <div style={{ width: 560, maxWidth: '92vw', background: 'var(--bg-elevated)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, border: 0, outline: 0, background: 'transparent', font: '400 15px/1 var(--font-sans)', color: 'var(--text-primary)' }}
          />
          <span className="kc-kbd">esc</span>
        </div>
        <div style={{ maxHeight: 420, overflow: 'auto', padding: 4 }}>
          {paletteResults.map((section) => (
            <div key={section.section}>
              <div style={{ font: '600 10px/1 var(--font-sans)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 12px 6px' }}>{section.section}</div>
              {section.items.map((item) => (
                <div
                  key={item.name}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--r-sm)', font: '400 13px/1.3 var(--font-sans)', color: 'var(--text-primary)', cursor: 'pointer', background: item.focused ? 'var(--fill-accent-subtle)' : undefined }}
                >
                  <span style={{ width: 16, height: 16, color: item.focused ? 'var(--text-accent)' : 'var(--text-muted)', flexShrink: 0 }}>●</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    {item.meta && !item.focused && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.meta}</div>}
                    {item.meta && item.focused && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.meta}</div>}
                  </div>
                  {item.focused && <span style={{ marginLeft: 'auto', font: '500 11px/1 var(--font-mono)', color: 'var(--text-muted)' }}>↵</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 12, font: '500 11px/1 var(--font-sans)', color: 'var(--text-muted)', background: 'var(--bg-sunken)' }}>
          <span><span className="kc-kbd">↑↓</span> navigate</span>
          <span><span className="kc-kbd">↵</span> open</span>
          <span style={{ marginLeft: 'auto' }}><span className="kc-kbd">esc</span> close</span>
        </div>
      </div>
    </div>
  );
}
