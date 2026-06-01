'use client';

import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const sidebarConfig: Record<string, { title: string; code: string; groups: { heading: string; items: { label: string; count?: number; icon?: string; active?: boolean }[] }[] }> = {
  workspace: {
    title: 'Workspace', code: 'IS-PLAT',
    groups: [
      { heading: 'Today', items: [
        { label: 'Home', icon: 'home', active: true },
        { label: 'Inbox', icon: 'inbox', count: 8 },
        { label: 'My tasks', icon: 'check-circle', count: 5 },
        { label: 'Approvals', icon: 'check', count: 12 },
        { label: 'Agent inbox', icon: 'bot', count: 3 },
      ]},
      { heading: 'Recent', items: [
        { label: 'INV-2026-0179', icon: 'invoice' },
        { label: 'PO-2026-0091', icon: 'cart' },
        { label: 'PT Maju Bersama', icon: 'building-2' },
        { label: 'Deal · Anugerah ‑ Q2', icon: 'briefcase' },
      ]},
      { heading: 'Saved views', items: [
        { label: 'Overdue invoices', count: 23 },
        { label: 'This-quarter deals' },
        { label: 'Stalled > 14d' },
      ]},
    ],
  },
  finance: {
    title: 'Finance', code: 'IS-FIN',
    groups: [
      { heading: 'Receivables', items: [
        { label: 'Invoices', count: 186, active: true },
        { label: 'Payments' },
        { label: 'Credit notes' },
      ]},
      { heading: 'Payables', items: [
        { label: 'Bills', count: 24 },
        { label: 'Vendors' },
      ]},
      { heading: 'Accounting', items: [
        { label: 'Ledger' },
        { label: 'CoreTax · e-Faktur' },
      ]},
    ],
  },
  crm: {
    title: 'CRM', code: 'IS-CRM',
    groups: [
      { heading: 'Pipeline', items: [
        { label: 'Deals', count: 42, active: true },
        { label: 'Leads', count: 14 },
        { label: 'Companies' },
        { label: 'Contacts' },
      ]},
      { heading: 'Saved views', items: [
        { label: 'My pipeline' },
        { label: 'Closing this Q' },
        { label: 'Stalled > 14d' },
      ]},
    ],
  },
};

export function Sidebar() {
  const activeModule = useWorkspaceStore((s) => s.activeModule);
  const config = sidebarConfig[activeModule] || sidebarConfig.workspace;

  return (
    <aside className="kc-side">
      <div className="kc-side-top">
        <div className="kc-side-title">{config.title}</div>
        <span className="kc-side-code">{config.code}</span>
      </div>
      {config.groups.map((group) => (
        <div className="kc-side-group" key={group.heading}>
          <div className="kc-side-h">{group.heading}</div>
          {group.items.map((item) => (
            <a
              key={item.label}
              className={`kc-side-item${item.active ? ' is-active' : ''}`}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className="kc-side-count">{item.count}</span>
              )}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}
