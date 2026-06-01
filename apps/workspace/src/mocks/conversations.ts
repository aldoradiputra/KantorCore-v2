import type { Thread, Message } from '@/types/chat';

export const mockThreads: Thread[] = [
  { id: 't001-0000-0000-0000-000000000001', channelType: 'whatsapp', contactName: 'Sinta (PT Acme)', preview: 'Pak Andi, terkait invoice INV-…', timestamp: '2m', unread: true, badges: [{ label: 'WhatsApp', variant: 'warn' }, { label: '@andi', variant: 'default' }], linkedRecordId: 'inv-0000-0000-0000-000000000179' },
  { id: 't001-0000-0000-0000-000000000002', channelType: 'email', contactName: 'Bayu Wicaksono', preview: 'Re: Demo schedule next week', timestamp: '14m', unread: true, badges: [{ label: 'Email', variant: 'default' }] },
  { id: 't001-0000-0000-0000-000000000003', channelType: 'web_chat', contactName: 'Anonymous · web chat', preview: 'Hi, do you support BPJS sync for 200+ employees?', timestamp: '38m', unread: false, badges: [{ label: 'Web chat', variant: 'info' }] },
  { id: 't001-0000-0000-0000-000000000004', channelType: 'sms', contactName: '+62 812 8800 1234', preview: 'Konfirmasi: PO sudah diterima.', timestamp: '1h', unread: false, badges: [{ label: 'SMS', variant: 'default' }] },
  { id: 't001-0000-0000-0000-000000000005', channelType: 'email', contactName: 'CV Bintang Timur · billing', preview: '[Auto] Payment receipt for INV-2026-0173', timestamp: '2h', unread: false, badges: [{ label: 'Resolved', variant: 'success' }] },
];

export const mockMessages: Message[] = [
  { id: 'msg-0001-0000-0000-000000000001', threadId: 't001-0000-0000-0000-000000000001', senderName: 'Sinta Wahyuni', senderInitials: 'S', senderType: 'contact', content: 'Pak Andi, terkait invoice INV-2026-0179, apakah bisa minta perpanjangan sampai akhir Mei? Cashflow kami sedang ketat karena project tertunda di sisi klien.', timestamp: '09:14', direction: 'inbound', channel: 'whatsapp' },
  { id: 'msg-0001-0000-0000-000000000002', threadId: 't001-0000-0000-0000-000000000001', senderName: 'Andi Wijaya', senderInitials: 'AW', senderType: 'user', content: 'Halo Bu Sinta, terima kasih sudah konfirmasi. Saya cek dulu dengan finance — biasanya kami bisa fleksibel untuk pelanggan dengan record bagus seperti Acme. Saya kabari dalam 30 menit ya.', timestamp: '09:18', direction: 'outbound', channel: 'whatsapp', status: 'read' },
  { id: 'msg-0001-0000-0000-000000000003', threadId: 't001-0000-0000-0000-000000000001', senderName: 'AR Collector', senderType: 'agent', content: 'Customer has paid 26/28 invoices on time. Suggested: approve Net 45 extension. Pulled history at 09:20.', timestamp: '09:20', direction: 'internal', channel: 'whatsapp' },
];
