import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const FOUNDER_CAP = 50

export async function GET() {
  try {
    const [totalRes, founderRes] = await Promise.all([
      supabaseAdmin.from('waitlist').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('waitlist').select('*', { count: 'exact', head: true }).eq('tier', 'founder'),
    ])

    const total = totalRes.count ?? 0
    const founderCount = founderRes.count ?? 0
    const founderSpotsRemaining = Math.max(0, FOUNDER_CAP - founderCount)

    return NextResponse.json({ total, founderSpotsRemaining })
  } catch (e) {
    console.error('Waitlist count error:', e)
    return NextResponse.json(
      { error: 'Failed to fetch count' },
      { status: 500 }
    )
  }
}
