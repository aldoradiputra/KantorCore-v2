import type { ModuleId } from '@/stores/useWorkspaceStore';

export interface ModuleNavItem {
  name: string;
  kind: '#' | 'record';
}

export interface ModuleNav {
  label: string;
  items: ModuleNavItem[];
}

export const MODULE_NAV: Partial<Record<ModuleId, ModuleNav>> = {
  hr: {
    label: 'HR',
    items: [
      { name: 'Employees', kind: 'record' },
      { name: 'Attendance', kind: 'record' },
      { name: 'Leave Requests', kind: 'record' },
      { name: 'Payroll', kind: 'record' },
      { name: 'Recruitment', kind: 'record' },
    ],
  },
  finance: {
    label: 'Finance',
    items: [
      { name: 'Invoices', kind: 'record' },
      { name: 'Payments', kind: 'record' },
      { name: 'Journal Entries', kind: 'record' },
      { name: 'Chart of Accounts', kind: 'record' },
      { name: 'Reports', kind: 'record' },
    ],
  },
  inventory: {
    label: 'Inventory',
    items: [
      { name: 'Products', kind: 'record' },
      { name: 'Warehouses', kind: 'record' },
      { name: 'Stock Moves', kind: 'record' },
      { name: 'Adjustments', kind: 'record' },
    ],
  },
  procurement: {
    label: 'Procurement',
    items: [
      { name: 'Purchase Orders', kind: 'record' },
      { name: 'Vendors', kind: 'record' },
      { name: 'RFQs', kind: 'record' },
      { name: 'Receipts', kind: 'record' },
    ],
  },
  sales: {
    label: 'Sales',
    items: [
      { name: 'Quotations', kind: 'record' },
      { name: 'Sales Orders', kind: 'record' },
      { name: 'Customers', kind: 'record' },
      { name: 'Price Lists', kind: 'record' },
    ],
  },
  crm: {
    label: 'CRM',
    items: [
      { name: 'Leads', kind: 'record' },
      { name: 'Contacts', kind: 'record' },
      { name: 'Deals', kind: 'record' },
      { name: 'Pipeline', kind: 'record' },
      { name: 'Activities', kind: 'record' },
    ],
  },
  projects: {
    label: 'Projects',
    items: [
      { name: 'All Projects', kind: 'record' },
      { name: 'Tasks', kind: 'record' },
      { name: 'Milestones', kind: 'record' },
      { name: 'Time Logs', kind: 'record' },
    ],
  },
  timesheets: {
    label: 'Timesheets',
    items: [
      { name: 'My Timesheets', kind: 'record' },
      { name: 'Approvals', kind: 'record' },
      { name: 'Reports', kind: 'record' },
    ],
  },
  expenses: {
    label: 'Expenses',
    items: [
      { name: 'My Expenses', kind: 'record' },
      { name: 'Claims', kind: 'record' },
      { name: 'Approvals', kind: 'record' },
      { name: 'Reports', kind: 'record' },
    ],
  },
  chat: {
    label: 'Chat',
    items: [
      { name: 'general', kind: '#' },
      { name: 'pengumuman', kind: '#' },
      { name: 'team', kind: '#' },
      { name: 'Direct Messages', kind: 'record' },
    ],
  },
  omnichannel: {
    label: 'Omnichannel',
    items: [
      { name: 'All Conversations', kind: 'record' },
      { name: 'WhatsApp', kind: 'record' },
      { name: 'Email', kind: 'record' },
      { name: 'Live Chat', kind: 'record' },
    ],
  },
  helpdesk: {
    label: 'Helpdesk',
    items: [
      { name: 'Tickets', kind: 'record' },
      { name: 'SLA Policies', kind: 'record' },
      { name: 'Knowledge Base', kind: 'record' },
      { name: 'Reports', kind: 'record' },
    ],
  },
  documents: {
    label: 'Documents',
    items: [
      { name: 'All Files', kind: 'record' },
      { name: 'Shared', kind: 'record' },
      { name: 'Recent', kind: 'record' },
      { name: 'Templates', kind: 'record' },
    ],
  },
};
