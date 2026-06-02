'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockAuthUser } from '@/mocks/corporate';
import { NIK_LENGTH } from '@/types/auth';

type Method = 'nik' | 'whatsapp' | 'email';

const METHODS: { id: Method; label: string }[] = [
  { id: 'nik', label: 'NIK' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Email' },
];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useWorkspaceStore((s) => s.setUser);
  const setSelectedContexts = useWorkspaceStore((s) => s.setSelectedContexts);
  const setCustomTenant = useWorkspaceStore((s) => s.setCustomTenant);

  const [method, setMethod] = useState<Method>('nik');
  const [submitting, setSubmitting] = useState(false);

  // NIK
  const [nik, setNik] = useState('');
  const [nikTouched, setNikTouched] = useState(false);
  const nikValid = nik.length === NIK_LENGTH;
  const nikError = nikTouched && !nikValid;

  // WhatsApp
  const [phone, setPhone] = useState('');
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const phoneDigits = phone.replace(/\D/g, '');

  // Email
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function authenticate(nikValue: string) {
    setSubmitting(true);
    // Mock PSrE handshake. A NIK that doesn't match an existing membership is
    // treated as a brand-new registration → forced into the create-tenant wizard.
    const isRegistered = nikValue === mockAuthUser.nik;
    if (isRegistered) {
      setUser({ ...mockAuthUser, nik: nikValue, isNewRegistration: false });
    } else {
      setUser({ nik: nikValue, name: 'Pengguna Baru', initials: 'PB', roles: ['Owner'], isNewRegistration: true });
    }
    // Fresh login starts with no active contexts / in-session tenant.
    setSelectedContexts([]);
    setCustomTenant(null);
    router.push('/onboarding');
  }

  const canSubmit =
    method === 'nik'
      ? nikValid
      : method === 'whatsapp'
        ? otpStage
          ? otp.length === 6
          : phoneDigits.length >= 9
        : Boolean(email && password);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (method === 'nik') {
      setNikTouched(true);
      if (nikValid) authenticate(nik);
      return;
    }
    if (method === 'whatsapp') {
      if (!otpStage) {
        if (phoneDigits.length >= 9) setOtpStage(true);
        return;
      }
      if (otp.length === 6) authenticate(mockAuthUser.nik);
      return;
    }
    if (email && password) authenticate(mockAuthUser.nik);
  }

  const ctaLabel =
    method === 'nik'
      ? 'Lanjutkan dengan NIK'
      : method === 'whatsapp'
        ? otpStage
          ? 'Verifikasi & lanjutkan'
          : 'Kirim OTP via WhatsApp'
        : 'Masuk';

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 400, width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ font: '700 24px/1.2 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Masuk ke KantorCore
        </div>
        <div style={{ marginTop: 6, font: '400 13px/1.55 var(--font-sans)', color: 'var(--text-secondary)' }}>
          Satu identitas nasional untuk semua perusahaan & cabang Anda.
        </div>
      </div>

      {/* Method switcher */}
      <div className="kc-seg" style={{ width: '100%' }}>
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`kc-seg-opt${method === m.id ? ' kc-seg-opt-active' : ''}`}
            style={{ flex: 1, textAlign: 'center' }}
            onClick={() => setMethod(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* NIK */}
      {method === 'nik' && (
        <div className="kc-field">
          <label className="kc-field-label" htmlFor="nik" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Nomor Induk Kependudukan (NIK)</span>
            <span className="kc-mono" style={{ color: nikValid ? 'var(--state-success)' : 'var(--text-muted)' }}>
              {nik.length} / {NIK_LENGTH}
            </span>
          </label>
          <input
            id="nik"
            inputMode="numeric"
            autoComplete="off"
            placeholder="3174 0125 0990 0001"
            className={`kc-input${nikError ? ' is-error' : ''}`}
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, '').slice(0, NIK_LENGTH))}
            onBlur={() => setNikTouched(true)}
            style={{ height: 40, font: '500 15px/1 var(--font-mono)', letterSpacing: '0.14em' }}
          />
          {nikError ? (
            <div className="kc-field-error">NIK harus terdiri dari {NIK_LENGTH} digit angka.</div>
          ) : (
            <div className="kc-field-help">
              16 digit sesuai KTP. Disimpan terenkripsi & diverifikasi via PSrE.{' '}
              <button
                type="button"
                onClick={() => { setNik(mockAuthUser.nik); setNikTouched(false); }}
                style={{ border: 0, background: 'none', padding: 0, font: '500 11px/1.4 var(--font-sans)', color: 'var(--text-link)', cursor: 'pointer' }}
              >
                Pakai NIK contoh
              </button>
              {' · '}
              <button
                type="button"
                onClick={() => { setNik('1234567890123456'); setNikTouched(false); }}
                style={{ border: 0, background: 'none', padding: 0, font: '500 11px/1.4 var(--font-sans)', color: 'var(--text-link)', cursor: 'pointer' }}
              >
                NIK baru (buat organisasi)
              </button>
            </div>
          )}
        </div>
      )}

      {/* WhatsApp OTP */}
      {method === 'whatsapp' && !otpStage && (
        <div className="kc-field">
          <label className="kc-field-label" htmlFor="phone">Nomor WhatsApp</label>
          <div className="kc-input-group">
            <span className="kc-affix">+62</span>
            <input
              id="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="812-1100-2345"
              className="kc-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="kc-field-help">Kode OTP akan dikirim ke WhatsApp Anda.</div>
        </div>
      )}

      {method === 'whatsapp' && otpStage && (
        <div className="kc-field">
          <label className="kc-field-label">Masukkan 6 digit OTP</label>
          <OtpInput value={otp} onChange={setOtp} />
          <div className="kc-field-help" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Dikirim ke +62 {phone || '812-1100-2345'}</span>
            <button
              type="button"
              onClick={() => { setOtpStage(false); setOtp(''); }}
              style={{ border: 0, background: 'none', padding: 0, font: '500 11px/1.4 var(--font-sans)', color: 'var(--text-link)', cursor: 'pointer' }}
            >
              Ganti nomor
            </button>
          </div>
        </div>
      )}

      {/* Email */}
      {method === 'email' && (
        <>
          <div className="kc-field">
            <label className="kc-field-label" htmlFor="email">Email kerja</label>
            <input id="email" type="email" autoComplete="email" placeholder="anda@perusahaan.co.id" className="kc-input" style={{ height: 40 }} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="kc-field">
            <label className="kc-field-label" htmlFor="password" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Kata sandi</span>
              <a href="#" style={{ font: '500 12px/1 var(--font-sans)' }}>Lupa?</a>
            </label>
            <input id="password" type="password" autoComplete="current-password" placeholder="••••••••••••" className="kc-input" style={{ height: 40 }} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </>
      )}

      <button type="submit" className={`kc-btn kc-btn-primary${submitting ? ' kc-btn-loading' : ''}`} disabled={!canSubmit || submitting} style={{ width: '100%', height: 42, fontSize: 14 }}>
        {ctaLabel}
      </button>

      {/* PSrE trust note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '400 11px/1.45 var(--font-sans)', color: 'var(--text-muted)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--state-success)', flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
        Identitas diverifikasi oleh penyedia PSrE (PrivyID / VIDA) sesuai UU ITE.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', font: '500 11px/1 var(--font-sans)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '2px 0' }}>
        <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        atau
        <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      </div>

      <button type="button" onClick={() => authenticate(mockAuthUser.nik)} className="kc-btn kc-btn-secondary" style={{ width: '100%', height: 40 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" /></svg>
        Lanjutkan dengan Google
      </button>

      <div style={{ marginTop: 'auto', paddingTop: 24, font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <span>Belum punya workspace? <a href="#" style={{ fontWeight: 500 }}>Daftar →</a></span>
        <span style={{ marginLeft: 'auto' }}><a href="#">Privasi</a> · <a href="#">Ketentuan</a></span>
      </div>
    </form>
  );
}

/** Six single-digit boxes with auto-advance + backspace navigation. */
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length: 6 }, (_, i) => value[i] ?? '');

  function setAt(index: number, raw: string) {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = chars.slice();
    next[index] = digit;
    onChange(next.join('').slice(0, 6));
    if (digit && index < 5) refs.current[index + 1]?.focus();
  }

  function onKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !chars[index] && index > 0) refs.current[index - 1]?.focus();
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          inputMode="numeric"
          maxLength={1}
          value={c}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          aria-label={`Digit ${i + 1}`}
          className="kc-input"
          style={{ width: 46, height: 50, textAlign: 'center', padding: 0, font: '600 18px/1 var(--font-mono)' }}
        />
      ))}
    </div>
  );
}
