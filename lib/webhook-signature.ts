/**
 * Verifier for Svix-signed webhooks (Resend, among others).
 *
 * Docs: https://docs.svix.com/receiving/verifying-payloads/how-manual
 *
 * The secret is delivered as `whsec_<base64-bytes>`. Signatures arrive in
 * `svix-signature` as one or more space-separated `v1,<base64>` tuples.
 * We HMAC-SHA256 the canonical string `<id>.<timestamp>.<body>` with the
 * decoded secret and compare any provided signature in constant time.
 *
 * We also reject payloads whose timestamp is more than 5 minutes off the
 * server clock to shut down replay attacks.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'

const TOLERANCE_SECONDS = 5 * 60

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: string }

export type VerifyInput = {
  secret: string
  id: string | null
  timestamp: string | null
  signature: string | null
  payload: string
  nowSeconds?: number
}

export function verifySvixSignature(input: VerifyInput): VerifyResult {
  const { secret, id, timestamp, signature, payload } = input
  if (!id || !timestamp || !signature) return { ok: false, reason: 'missing-headers' }

  const tsNum = Number(timestamp)
  if (!Number.isFinite(tsNum)) return { ok: false, reason: 'bad-timestamp' }
  const now = input.nowSeconds ?? Math.floor(Date.now() / 1000)
  if (Math.abs(now - tsNum) > TOLERANCE_SECONDS) {
    return { ok: false, reason: 'timestamp-out-of-window' }
  }

  const secretBase64 = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret
  let secretBytes: Buffer
  try {
    secretBytes = Buffer.from(secretBase64, 'base64')
  } catch {
    return { ok: false, reason: 'bad-secret' }
  }
  if (secretBytes.length === 0) return { ok: false, reason: 'bad-secret' }

  const expected = createHmac('sha256', secretBytes)
    .update(`${id}.${timestamp}.${payload}`)
    .digest('base64')
  const expectedBuf = Buffer.from(expected, 'utf8')

  // The header may list multiple signatures (Svix rotates secrets by
  // signing with both for a transition window). Match any one.
  const candidates = signature
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('v1,'))
    .map((s) => s.slice('v1,'.length))

  for (const candidate of candidates) {
    const candidateBuf = Buffer.from(candidate, 'utf8')
    if (candidateBuf.length !== expectedBuf.length) continue
    if (timingSafeEqual(candidateBuf, expectedBuf)) return { ok: true }
  }

  return { ok: false, reason: 'signature-mismatch' }
}
