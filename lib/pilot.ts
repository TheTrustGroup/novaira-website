/**
 * Single source of truth for the founding-partner pilot counter.
 *
 * Live value lives in Supabase `site_config` under key `pilot`:
 *   { "total": <n>, "filled": <n> }
 *
 * Ops can update these numbers directly in Supabase Studio without a
 * deploy. Reads happen server-side from page renders only; never from
 * the browser, so the service key stays off the client.
 *
 * The constants below act as a compile-time fallback for build-time
 * rendering (no Supabase env) and as a safety net if the DB is briefly
 * unreachable. Keep them reasonable — they're what users will see in
 * the worst case.
 */
import { supabaseAdmin } from '@/lib/supabase-admin'

export const PILOT_FALLBACK = { total: 10, filled: 3 } as const

export type PilotStatus = {
  total: number
  filled: number
  remaining: number
}

function normalise(raw: unknown): PilotStatus {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const total = Number.isFinite(obj.total) ? Math.max(0, Math.floor(obj.total as number)) : PILOT_FALLBACK.total
  const filled = Number.isFinite(obj.filled) ? Math.max(0, Math.floor(obj.filled as number)) : PILOT_FALLBACK.filled
  // `filled` may exceed `total` during data entry; clamp so the UI never shows negative remaining.
  const clampedFilled = Math.min(filled, total)
  return { total, filled: clampedFilled, remaining: total - clampedFilled }
}

/**
 * Read the live pilot status. Call from server components or API routes
 * only. Falls back to `PILOT_FALLBACK` if Supabase is unreachable or
 * unconfigured (e.g. at `next build` time) so rendering never fails.
 */
export async function getPilotStatus(): Promise<PilotStatus> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_config')
      .select('value')
      .eq('key', 'pilot')
      .maybeSingle()

    if (error) throw error
    return normalise(data?.value)
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // Surface the reason in dev; in prod we stay quiet to avoid log noise.
      console.warn('[pilot] falling back to constants:', err instanceof Error ? err.message : err)
    }
    return normalise(PILOT_FALLBACK)
  }
}
