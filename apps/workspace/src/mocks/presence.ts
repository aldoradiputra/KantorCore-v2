export interface OnlineColleague {
  id: string;
  name: string;
  initials: string;
  role: string;
  branch: string;
}

export const mockOnlineColleagues: OnlineColleague[] = [
  { id: 'oc-001', name: 'Lestari Putri', initials: 'LP', role: 'Finance Manager', branch: 'Jakarta HQ' },
  { id: 'oc-002', name: 'Dewi Rahmawati', initials: 'DR', role: 'Procurement Lead', branch: 'Jakarta HQ' },
  { id: 'oc-003', name: 'Fitri Nurhaliza', initials: 'FN', role: 'Sales Lead', branch: 'Surabaya' },
  { id: 'oc-004', name: 'Rizky Hidayat', initials: 'RH', role: 'Finance Analyst', branch: 'Jakarta HQ' },
  { id: 'oc-005', name: 'Surya Saputra', initials: 'SS', role: 'Warehouse Manager', branch: 'Bandung' },
  { id: 'oc-006', name: 'Putri Setiawan', initials: 'PS', role: 'HR Coordinator', branch: 'Jakarta HQ' },
];
