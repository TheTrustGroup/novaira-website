import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NotificationStatus } from '@/lib/notifications'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Notifications | NOVAIRA admin',
  robots: { index: false, follow: false },
}

type SearchParams = {
  status?: string
  limit?: string
}

type NotificationRow = {
  id: string
  channel: string
  kind: string
  status: NotificationStatus
  recipient: string | null
  lead_id: string | null
  provider_id: string | null
  error: string | null
  meta: Record<string, unknown> | null
  created_at: string
}

const VALID_STATUSES: NotificationStatus[] = [
  'sent',
  'delivered',
  'failed',
  'bounced',
  'complained',
  'skipped',
]

const STATUS_COLOURS: Record<NotificationStatus, string> = {
  sent: 'bg-cream/10 text-cream',
  delivered: 'bg-emerald-900/40 text-emerald-100',
  failed: 'bg-red-900/50 text-red-100',
  bounced: 'bg-red-900/50 text-red-100',
  complained: 'bg-amber-900/50 text-amber-100',
  skipped: 'bg-cream/5 text-cream/50',
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toISOString().replace('T', ' ').replace(/\.\d+Z$/, 'Z')
}

async function fetchNotifications(
  status: NotificationStatus | null,
  limit: number
): Promise<{ rows: NotificationRow[]; error: string | null }> {
  try {
    let query = supabaseAdmin
      .from('notifications')
      .select('id, channel, kind, status, recipient, lead_id, provider_id, error, meta, created_at')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) return { rows: [], error: error.message }
    return { rows: (data ?? []) as NotificationRow[], error: null }
  } catch (err) {
    return { rows: [], error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

export default async function AdminNotificationsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const requestedStatus = searchParams.status
  const status =
    requestedStatus && (VALID_STATUSES as string[]).includes(requestedStatus)
      ? (requestedStatus as NotificationStatus)
      : null

  const limit = Math.min(Math.max(parseInt(searchParams.limit ?? '100', 10) || 100, 1), 500)
  const { rows, error } = await fetchNotifications(status, limit)

  return (
    <div className="min-h-screen bg-ink text-cream font-sans">
      <header className="border-b border-gold/15 px-6 sm:px-10 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-sans text-[0.7rem] tracking-[0.4em] uppercase text-gold/70">
              Admin
            </p>
            <h1 className="font-display font-light text-2xl sm:text-3xl text-silver-cream mt-1 tracking-[-0.02em]">
              Notifications
            </h1>
          </div>
          <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
            <FilterLink label="All" href="/admin/notifications" active={!status} />
            {VALID_STATUSES.map((s) => (
              <FilterLink
                key={s}
                label={s}
                href={`/admin/notifications?status=${s}`}
                active={status === s}
              />
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-8">
        {error ? (
          <p className="text-sm text-red-300 font-sans">
            Could not read notifications: <span className="font-mono">{error}</span>
          </p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-cream/60 font-sans">
            No notifications match this filter.
          </p>
        ) : (
          <ul className="space-y-2">
            {rows.map((row) => (
              <NotificationItem key={row.id} row={row} />
            ))}
          </ul>
        )}

        <p className="mt-6 text-xs text-cream/45 font-sans">
          Showing up to {limit} most recent rows. For deeper queries use Supabase Studio.
        </p>
      </main>
    </div>
  )
}

function NotificationItem({ row }: { row: NotificationRow }) {
  const hasDetail =
    Boolean(row.provider_id) ||
    Boolean(row.error) ||
    Boolean(row.lead_id) ||
    (row.meta && Object.keys(row.meta).length > 0)

  return (
    <li>
      <details className="group rounded-sm border border-gold/10 bg-ink-muted/20 overflow-hidden">
        <summary
          className={`flex flex-wrap items-center gap-3 px-4 py-3 cursor-pointer list-none ${
            hasDetail ? 'hover:bg-ink-muted/40' : 'cursor-default'
          } transition-colors`}
        >
          <span
            className={`inline-block px-2 py-1 rounded-sm text-[0.7rem] uppercase tracking-[0.08em] ${STATUS_COLOURS[row.status]}`}
          >
            {row.status}
          </span>
          <span className="font-mono text-xs text-cream/70 whitespace-nowrap">
            {formatTimestamp(row.created_at)}
          </span>
          <span className="text-cream/80 text-sm">{row.kind}</span>
          <span className="text-cream/70 text-sm break-all">
            {row.recipient ?? '-'}
          </span>
          {hasDetail ? (
            <span
              aria-hidden
              className="ml-auto text-cream/40 text-xs select-none transition-transform group-open:rotate-90"
            >
              ›
            </span>
          ) : null}
        </summary>

        {hasDetail ? (
          <div className="border-t border-gold/10 px-4 py-3 space-y-3 bg-ink/60">
            <DetailPair label="ID" value={row.id} mono />
            {row.provider_id ? (
              <DetailPair label="Provider id" value={row.provider_id} mono />
            ) : null}
            {row.lead_id ? <DetailPair label="Lead id" value={row.lead_id} mono /> : null}
            {row.error ? (
              <DetailPair label="Error" value={row.error} className="text-red-200" />
            ) : null}
            {row.meta && Object.keys(row.meta).length > 0 ? (
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.08em] text-cream/50 mb-1">
                  Meta
                </p>
                <pre className="text-xs font-mono text-cream/80 bg-ink border border-gold/10 rounded-sm p-3 overflow-x-auto whitespace-pre-wrap break-words">
                  {JSON.stringify(row.meta, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        ) : null}
      </details>
    </li>
  )
}

function DetailPair({
  label,
  value,
  mono,
  className,
}: {
  label: string
  value: string
  mono?: boolean
  className?: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-[0.7rem] uppercase tracking-[0.08em] text-cream/50 sm:w-28 sm:flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-sm break-all ${mono ? 'font-mono text-xs text-cream/80' : 'text-cream/85'} ${className ?? ''}`}
      >
        {value}
      </span>
    </div>
  )
}

function FilterLink({
  label,
  href,
  active,
}: {
  label: string
  href: string
  active: boolean
}) {
  return (
    <a
      href={href}
      className={`px-3 py-1.5 rounded-sm text-[0.7rem] uppercase tracking-[0.08em] font-sans transition-colors ${
        active
          ? 'bg-gold text-ink'
          : 'bg-ink-muted/40 text-cream/70 hover:text-cream hover:bg-ink-muted/70 border border-gold/10'
      }`}
    >
      {label}
    </a>
  )
}
