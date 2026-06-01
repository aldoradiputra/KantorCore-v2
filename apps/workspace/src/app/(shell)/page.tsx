import { KpiStrip } from '@/components/dashboard/KpiStrip';
import { ApprovalTable } from '@/components/dashboard/ApprovalTable';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AgentInboxCard } from '@/components/dashboard/AgentInboxCard';
import { SetupChecklist } from '@/components/dashboard/SetupChecklist';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';

export default function HomePage() {
  return (
    <>
      <div className="kc-page-head">
        <div>
          <div className="kc-page-title">Selamat pagi, Andi.</div>
          <div className="kc-page-sub">Senin, 23 Mei 2026 · 4 hal yang perlu perhatian Anda hari ini.</div>
        </div>
        <div className="kc-spacer" style={{ flex: 1 }} />
        <div className="kc-page-actions">
          <button className="kc-btn kc-btn-secondary kc-btn-sm">✦ Ringkas hari ini</button>
          <button className="kc-btn kc-btn-primary kc-btn-sm">+ Buat</button>
        </div>
      </div>
      <div style={{ padding: '16px var(--gutter, 24px) 0' }}>
        <KpiStrip />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, padding: '16px var(--gutter, 24px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ApprovalTable />
          <ActivityFeed />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AgentInboxCard />
          <SetupChecklist />
          <TodaySchedule />
        </div>
      </div>
    </>
  );
}
