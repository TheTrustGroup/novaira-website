/**
 * Server-side PostHog capture over the public ingestion endpoint.
 *
 * Rationale: we already ship `NEXT_PUBLIC_POSTHOG_KEY` to the browser, so
 * the project key is not a secret. Using a thin `fetch` keeps us from
 * adding the `posthog-node` dependency (~60kb including protobufs) for what
 * amounts to five fire-and-forget events per request.
 *
 * Invariants:
 *   - Never throws. Errors are swallowed so analytics can never break a POST.
 *   - No-ops when env vars are missing (local dev, preview without analytics).
 *   - 1s timeout so a slow PostHog doesn't stretch the request.
 *   - `distinct_id` should be echoed from the client when possible so server
 *     events join to the same person in PostHog. Falls back to an `ip:` hash
 *     so we at least keep the event.
 */

const TIMEOUT_MS = 1000

export type ServerCaptureInput = {
  event: string
  distinctId: string | null | undefined
  properties?: Record<string, string | number | boolean | null | undefined>
  /** Optional override if you know the user's identity server-side. */
  ip?: string | null
}

export async function captureServer(input: ServerCaptureInput): Promise<void> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
  if (!key || !host) return

  const distinctId = input.distinctId?.trim() || (input.ip ? `ip:${input.ip}` : 'server')

  // Strip undefined / null so PostHog doesn't render empty columns.
  const props: Record<string, string | number | boolean> = {}
  if (input.properties) {
    for (const [k, v] of Object.entries(input.properties)) {
      if (v === undefined || v === null) continue
      props[k] = v
    }
  }
  props['$lib'] = 'novaira-server'

  const payload = {
    api_key: key,
    event: input.event,
    distinct_id: distinctId,
    properties: props,
    timestamp: new Date().toISOString(),
  }

  try {
    await fetch(`${host.replace(/\/$/, '')}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
      keepalive: true,
    })
  } catch {
    // Intentionally silent — analytics failure must never fail a lead.
  }
}
