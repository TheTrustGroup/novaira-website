/**
 * Cloudflare Turnstile verifier.
 *
 * Design: verification is a no-op when `TURNSTILE_SECRET_KEY` is unset, so the
 * form stays unblocked while the Cloudflare account is provisioned. Once the
 * secret is present, a missing or invalid token causes a 400.
 *
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export type TurnstileResult =
  | { ok: true; disabled: boolean }
  | { ok: false; reason: string }

export async function verifyTurnstile(
  token: string | undefined | null,
  ip: string | undefined | null
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return { ok: true, disabled: true }

  if (!token) return { ok: false, reason: 'missing-token' }

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'unknown') body.set('remoteip', ip)

    const res = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      // Turnstile's endpoint is fast; we still cap the wait so a stalled
      // verify can't hold the request open indefinitely.
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      return { ok: false, reason: `verify-http-${res.status}` }
    }

    const json = (await res.json()) as {
      success: boolean
      'error-codes'?: string[]
    }

    if (!json.success) {
      const codes = json['error-codes']?.join(',') || 'verify-failed'
      return { ok: false, reason: codes }
    }

    return { ok: true, disabled: false }
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'verify-error'
    return { ok: false, reason }
  }
}
