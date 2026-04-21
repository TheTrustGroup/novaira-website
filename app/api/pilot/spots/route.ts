import { NextResponse } from 'next/server'
import { getPilotStatus } from '@/lib/pilot'

// Public, read-only view of the pilot counter. Safe to call from any
// surface (marketing pages, emails, internal dashboards) without
// exposing the Supabase service key. Values come from `site_config`
// via `getPilotStatus`, which already falls back to compile-time
// constants when the DB is unreachable.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Cache at the edge for 60s, allow a stale response for up to a minute
// while we revalidate. The upstream read is already cheap; this just
// keeps the DB quiet during traffic spikes.
const CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=60'

export async function GET() {
  const pilot = await getPilotStatus()
  return NextResponse.json(pilot, {
    status: 200,
    headers: { 'Cache-Control': CACHE_CONTROL },
  })
}
