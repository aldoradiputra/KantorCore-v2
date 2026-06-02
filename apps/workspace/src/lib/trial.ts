/** 15-day self-service free trial of the Business tier. */
export const TRIAL_DAYS = 15;

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Whole days left until the trial ends (floored, never negative). Compute on
 * the client only to avoid SSR/hydration drift from Date.now(). */
export function daysRemaining(endsAtISO: string | null, now: number = Date.now()): number {
  if (!endsAtISO) return 0;
  const ms = new Date(endsAtISO).getTime() - now;
  return Math.max(0, Math.floor(ms / 86_400_000));
}

export function formatTrialDate(date: Date): string {
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
