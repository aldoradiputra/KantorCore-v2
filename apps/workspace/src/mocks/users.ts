import type { User } from '@/types/user';

export const mockUsers: User[] = [
  { id: 'u001-0000-0000-0000-000000000001', name: 'Andi Wijaya', email: 'andi@acme.id', initials: 'AW', role: 'admin', groups: ['Finance', 'Mgmt'], lastActive: 'just now', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000002', name: 'Lestari Putri', email: 'lestari@acme.id', initials: 'LP', role: 'admin', groups: ['Finance', 'Mgmt'], lastActive: '14m', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000003', name: 'Dewi Rahmawati', email: 'dewi@acme.id', initials: 'DR', role: 'member', groups: ['Procurement'], lastActive: '2h', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000004', name: 'Fitri Nurhaliza', email: 'fitri@acme.id', initials: 'FN', role: 'member', groups: ['Sales'], lastActive: '38m', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000005', name: 'Rizky Hidayat', email: 'rizky@acme.id', initials: 'RH', role: 'member', groups: ['Finance'], lastActive: '2h', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000006', name: 'Surya Saputra', email: 'surya@acme.id', initials: 'SS', role: 'member', groups: ['HR'], lastActive: '5h', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000007', name: 'Putri Setiawan', email: 'putri@acme.id', initials: 'PS', role: 'member', groups: ['HR'], lastActive: '3h', isBot: false, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000008', name: 'Joko Kusuma', email: 'joko@acme.id', initials: 'JK', role: 'member', groups: ['Finance'], lastActive: 'invited 2d', isBot: false, status: 'invited' },
  { id: 'u001-0000-0000-0000-000000000009', name: 'AR Collector', initials: 'AC', role: 'autonomous', groups: ['FIN.* (read)', 'email'], lastActive: '14m', isBot: true, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000010', name: 'Lead Triager', initials: 'LT', role: 'autonomous', groups: ['CRM.Lead'], lastActive: '2m', isBot: true, status: 'active' },
  { id: 'u001-0000-0000-0000-000000000011', name: 'Hadi Pranoto', email: 'hadi@acme.id', initials: 'HP', role: 'member', groups: ['Sales'], lastActive: '1d', isBot: false, status: 'active' },
];
