import type { NextRequest } from 'next/server'

/**
 * Two-tier rate limiter.
 *
 *   1. If UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set, use
 *      Upstash Redis via its REST API. This is the production path — limits
 *      are global across Vercel lambda instances and survive cold starts.
 *   2. Otherwise, fall back to a per-instance in-memory Map. Useful for dev
 *      and for ship-before-provision safety.
 *
 * Failure mode is fail-open: if Upstash is misconfigured or unreachable,
 * we allow the request. Bot mitigation still relies on the honeypot,
 * time-to-submit, and Turnstile checks in the route handler itself.
 *
 * Callers MUST `await` the result.
 */

type Bucket = { count: number; resetAt: number }

const memoryBuckets = new Map<string, Bucket>()

// Hard ceiling so a chatty attacker cannot grow the Map without bound.
const MAX_ENTRIES = 10_000

// Aggressive timeout — this runs on the request hot path.
const UPSTASH_TIMEOUT_MS = 1500

function clientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]!.trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

export type RateLimitOptions = {
  /** Unique name so different routes don't share quota. */
  key: string
  /** Max requests allowed in `windowMs`. */
  max: number
  /** Window length in milliseconds. */
  windowMs: number
}

export type RateLimitResult =
  | { allowed: true; ip: string; backend: 'upstash' | 'memory' }
  | { allowed: false; ip: string; retryAfterSec: number; backend: 'upstash' | 'memory' }

function upstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return { url, token }
}

async function checkUpstash(
  bucketKey: string,
  options: RateLimitOptions,
  cfg: { url: string; token: string }
): Promise<{ count: number } | null> {
  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        'Content-Type': 'application/json',
      },
      // INCR returns the new counter value. PEXPIRE with NX ensures we only
      // set a TTL on the first hit in a window, so a stream of hits within
      // the window expires at the originally-scheduled reset time.
      body: JSON.stringify([
        ['INCR', bucketKey],
        ['PEXPIRE', bucketKey, options.windowMs.toString(), 'NX'],
      ]),
      signal: AbortSignal.timeout(UPSTASH_TIMEOUT_MS),
      cache: 'no-store',
    })

    if (!res.ok) return null
    const json = (await res.json()) as Array<{ result: number | string | null }>
    const first = json?.[0]?.result
    if (typeof first === 'number') return { count: first }
    if (typeof first === 'string' && /^\d+$/.test(first)) return { count: parseInt(first, 10) }
    return null
  } catch {
    return null
  }
}

function checkMemory(
  bucketKey: string,
  options: RateLimitOptions
): { count: number; resetAt: number } {
  const now = Date.now()

  if (memoryBuckets.size > MAX_ENTRIES) {
    for (const [k, v] of memoryBuckets) {
      if (v.resetAt <= now) memoryBuckets.delete(k)
    }
  }

  const entry = memoryBuckets.get(bucketKey)
  if (!entry || now >= entry.resetAt) {
    const fresh = { count: 1, resetAt: now + options.windowMs }
    memoryBuckets.set(bucketKey, fresh)
    return fresh
  }
  entry.count += 1
  return entry
}

export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const ip = clientIp(request)
  const bucketKey = `rl:${options.key}:${ip}`

  const cfg = upstashConfig()
  if (cfg) {
    const up = await checkUpstash(bucketKey, options, cfg)
    if (up) {
      if (up.count > options.max) {
        const retryAfterSec = Math.ceil(options.windowMs / 1000)
        return { allowed: false, ip, retryAfterSec, backend: 'upstash' }
      }
      return { allowed: true, ip, backend: 'upstash' }
    }
    // Upstash failed — fall through to memory so we still slow naive bots.
  }

  const mem = checkMemory(bucketKey, options)
  if (mem.count > options.max) {
    return {
      allowed: false,
      ip,
      retryAfterSec: Math.ceil((mem.resetAt - Date.now()) / 1000),
      backend: 'memory',
    }
  }
  return { allowed: true, ip, backend: 'memory' }
}
