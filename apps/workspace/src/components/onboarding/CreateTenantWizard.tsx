'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { makeContextId } from '@/lib/corporate';
import { TRIAL_DAYS, addDays, formatTrialDate } from '@/lib/trial';
import { INDUSTRIES, HEADCOUNT_BANDS, REGIONS } from '@/mocks/onboarding';
import type { Conglomerate, TaxType } from '@/types/auth';

const STEPS = [
  { n: 1, label: 'Perusahaan' },
  { n: 2, label: 'Profil Legal' },
  { n: 3, label: 'Mulai Trial' },
];

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'org';
}

export function CreateTenantWizard({ canCancel = false, onCancel }: { canCancel?: boolean; onCancel?: () => void }) {
  const router = useRouter();
  const createTrialTenant = useWorkspaceStore((s) => s.createTrialTenant);

  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [headcount, setHeadcount] = useState('');
  const [taxType, setTaxType] = useState<TaxType>('non_pkp');
  const [region, setRegion] = useState('');
  // Fixed at mount so the displayed date is stable across re-renders.
  const [trialEnd] = useState(() => addDays(new Date(), TRIAL_DAYS));

  const step1Valid = companyName.trim().length > 0 && industry !== '' && headcount !== '';
  const step2Valid = region !== '';

  function launch() {
    const companyId = `company_${slugify(companyName)}`;
    const branchId = 'branch_hq';
    const tenant: Conglomerate = {
      id: `tenant_${slugify(companyName)}`,
      name: companyName.trim(),
      companies: [
        {
          id: companyId,
          name: companyName.trim(),
          npwp: taxType === 'pkp' ? '(menunggu verifikasi PKP)' : 'Non-PKP',
          tier: 'business',
          branches: [{ id: branchId, name: 'Kantor Pusat', code: 'HQ', city: region, role: 'Owner' }],
        },
      ],
    };
    createTrialTenant(tenant, makeContextId(companyId, branchId), trialEnd.toISOString());
    router.push('/');
  }

  return (
    <div style={{ width: '100%', maxWidth: 540, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div className="t-micro" style={{ color: 'var(--text-accent)' }}>Organisasi Baru</div>
        <h1 style={{ font: '700 26px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '8px 0 6px' }}>
          Buat organisasi Anda
        </h1>
        <p style={{ font: '400 14px/1.6 var(--font-sans)', color: 'var(--text-secondary)', margin: 0 }}>
          Tiga langkah singkat untuk meluncurkan workspace KantorCore Anda.
        </p>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {STEPS.map((s, i) => {
          const state = step === s.n ? 'active' : step > s.n ? 'done' : 'todo';
          return (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : '0 0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', display: 'grid', placeItems: 'center',
                  font: '600 11px/1 var(--font-sans)', flexShrink: 0,
                  background: state === 'todo' ? 'var(--fill-subtle)' : 'var(--accent-600)',
                  color: state === 'todo' ? 'var(--text-muted)' : 'var(--text-on-accent)',
                }}>
                  {state === 'done' ? '✓' : s.n}
                </div>
                <span style={{ font: '500 12px/1 var(--font-sans)', color: state === 'active' ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)', margin: '0 10px' }} />}
            </div>
          );
        })}
      </div>

      <div className="kc-card kc-card-elevated">
        <div className="kc-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {step === 1 && (
            <>
              <div className="kc-field">
                <label className="kc-field-label" htmlFor="companyName">Nama perusahaan</label>
                <input id="companyName" className="kc-input" style={{ height: 38 }} placeholder="PT Sumber Makmur Sejahtera" value={companyName} onChange={(e) => setCompanyName(e.target.value)} autoFocus />
              </div>
              <div className="kc-field">
                <label className="kc-field-label" htmlFor="industry">Industri</label>
                <select id="industry" className="kc-select" style={{ height: 38 }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value="" disabled>Pilih industri…</option>
                  {INDUSTRIES.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="kc-field">
                <label className="kc-field-label">Estimasi jumlah karyawan</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {HEADCOUNT_BANDS.map((band) => (
                    <button key={band} type="button" onClick={() => setHeadcount(band)} className={`kc-chip${headcount === band ? ' kc-chip-active' : ''}`}>
                      {band}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="kc-field">
                <label className="kc-field-label">Tipe registrasi pajak</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {([
                    { id: 'non_pkp' as TaxType, title: 'Non-PKP', desc: 'Belum dikukuhkan sebagai Pengusaha Kena Pajak.' },
                    { id: 'pkp' as TaxType, title: 'PKP', desc: 'Wajib memungut & melaporkan PPN (e-Faktur).' },
                  ]).map((opt) => {
                    const active = taxType === opt.id;
                    return (
                      <button key={opt.id} type="button" onClick={() => setTaxType(opt.id)} style={{
                        textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--r-md)', cursor: 'pointer',
                        background: active ? 'var(--fill-accent-subtle)' : 'var(--bg-surface)',
                        border: `1px solid ${active ? 'var(--accent-500)' : 'var(--border-strong)'}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, border: `4px solid ${active ? 'var(--accent-600)' : 'var(--border-strong)'}`, background: 'var(--bg-surface)' }} />
                          <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--text-primary)' }}>{opt.title}</span>
                        </div>
                        <div style={{ font: '400 11px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="kc-field">
                <label className="kc-field-label" htmlFor="region">Wilayah / Provinsi</label>
                <select id="region" className="kc-select" style={{ height: 38 }} value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="" disabled>Pilih wilayah…</option>
                  {REGIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="kc-banner kc-banner-success" style={{ alignItems: 'center' }}>
                <svg className="kc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <div>
                  <div style={{ font: '600 13px/1.4 var(--font-sans)', color: 'var(--text-primary)' }}>
                    Anda akan memulai Free Trial 15 hari KantorCore Business Tier.
                  </div>
                  <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-secondary)', marginTop: 2 }}>
                    Tanpa kartu kredit. Trial berakhir pada <strong>{formatTrialDate(trialEnd)}</strong>.
                  </div>
                </div>
              </div>
              <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 8, columnGap: 16, font: '400 13px/1.4 var(--font-sans)' }}>
                <dt style={{ color: 'var(--text-muted)' }}>Perusahaan</dt>
                <dd style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>{companyName || '—'}</dd>
                <dt style={{ color: 'var(--text-muted)' }}>Industri</dt>
                <dd style={{ margin: 0, color: 'var(--text-primary)', textAlign: 'right' }}>{industry || '—'}</dd>
                <dt style={{ color: 'var(--text-muted)' }}>Karyawan</dt>
                <dd style={{ margin: 0, color: 'var(--text-primary)', textAlign: 'right' }}>{headcount || '—'}</dd>
                <dt style={{ color: 'var(--text-muted)' }}>Pajak</dt>
                <dd style={{ margin: 0, color: 'var(--text-primary)', textAlign: 'right' }}>{taxType === 'pkp' ? 'PKP' : 'Non-PKP'}</dd>
                <dt style={{ color: 'var(--text-muted)' }}>Wilayah</dt>
                <dd style={{ margin: 0, color: 'var(--text-primary)', textAlign: 'right' }}>{region || '—'}</dd>
              </dl>
            </div>
          )}
        </div>

        <div className="kc-card-foot" style={{ justifyContent: 'space-between' }}>
          <div>
            {step > 1 ? (
              <button type="button" className="kc-btn kc-btn-ghost" onClick={() => setStep((s) => s - 1)}>← Kembali</button>
            ) : canCancel ? (
              <button type="button" className="kc-btn kc-btn-ghost" onClick={onCancel}>Batal</button>
            ) : <span />}
          </div>
          {step < 3 ? (
            <button type="button" className="kc-btn kc-btn-primary" disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid)} onClick={() => setStep((s) => s + 1)}>
              Lanjut →
            </button>
          ) : (
            <button type="button" className="kc-btn kc-btn-primary kc-btn-lg" onClick={launch}>
              Luncurkan workspace
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
