import posthog from 'posthog-js'

let initialized = false

export function initPostHog() {
  if (typeof window !== 'undefined' && !initialized) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
    if (key && host) {
      posthog.init(key, {
        api_host: host,
        person_profiles: 'identified_only',
        capture_pageview: false,
      })
      initialized = true
    }
  }
}

export function getPostHog() {
  if (typeof window !== 'undefined' && initialized) {
    return posthog
  }
  return null
}
