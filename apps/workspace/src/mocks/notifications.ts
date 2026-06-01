import type { Notification } from '@/types/notification';

export const mockNotifications: Notification[] = [
  { id: 'n001-0000-0000-0000-000000000001', title: 'AR Collector finished a run', description: 'Sent 18 reminders, 5 customers responded.', timestamp: '2 min ago', unread: true, icon: 'bot', iconVariant: 'accent', category: 'agent' },
  { id: 'n001-0000-0000-0000-000000000002', title: 'Dewi mentioned you in PO-2026-0091', description: '"@Andi please check the over-budget line for IT hire."', timestamp: '8 min ago', unread: true, icon: 'message', iconVariant: 'default', category: 'mention' },
  { id: 'n001-0000-0000-0000-000000000003', title: 'Approval needed · INV-2026-0179', description: 'Rp 145.000.000 · over your default threshold.', timestamp: '2 hours ago', unread: false, icon: 'check', iconVariant: 'default', category: 'approval' },
  { id: 'n001-0000-0000-0000-000000000004', title: 'CoreTax DJP sync failed', description: 'Timeout contacting upstream endpoint. Will retry in 30 min.', timestamp: '3 hours ago', unread: false, icon: 'warning', iconVariant: 'warn', category: 'all' },
  { id: 'n001-0000-0000-0000-000000000005', title: 'Deal closed · PT Anugerah Bumi', description: 'Fitri Nurhaliza · Rp 178.000.000', timestamp: 'Yesterday', unread: false, icon: 'trend', iconVariant: 'default', category: 'all' },
];
