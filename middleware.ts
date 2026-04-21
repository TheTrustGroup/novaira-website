import { NextRequest, NextResponse } from 'next/server'

/**
 * Tiny HTTP Basic Auth gate for `/admin/*`.
 *
 * Credentials come from `ADMIN_USER` + `ADMIN_PASSWORD` env vars. If either
 * is unset, the admin routes return 503 rather than being silently
 * unprotected — fail closed.
 *
 * Runs on Edge, so we cannot use `Buffer` or `crypto.timingSafeEqual`.
 * `atob` is globally available and the constant-time compare is inlined.
 */

export const config = {
  matcher: ['/admin/:path*'],
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

function unauthorised(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="NOVAIRA admin", charset="UTF-8"',
    },
  })
}

export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPassword) {
    return new NextResponse('Admin is not configured', { status: 503 })
  }

  const header = request.headers.get('authorization')
  if (!header?.startsWith('Basic ')) return unauthorised()

  let decoded: string
  try {
    decoded = atob(header.slice('Basic '.length).trim())
  } catch {
    return unauthorised()
  }

  const sep = decoded.indexOf(':')
  if (sep === -1) return unauthorised()
  const user = decoded.slice(0, sep)
  const password = decoded.slice(sep + 1)

  const userMatch = constantTimeEqual(user, expectedUser)
  const passMatch = constantTimeEqual(password, expectedPassword)
  if (!(userMatch && passMatch)) return unauthorised()

  return NextResponse.next()
}
