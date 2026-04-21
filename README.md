# NOVAIRA

Marketing site and lead-capture surface for NOVAIRA — a menstrual hygiene
disposal product for institutional spaces (hotels, hospitals, schools,
offices). The site is deliberately quiet: one hero, a credentials strip,
four-step explanation, founding-partner scarcity, founder line, and a
single consultation form.

Production: https://www.novairaworld.com

## Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript** in `strict` mode
- **Tailwind CSS** with brand tokens in `tailwind.config.js`
- **Cormorant Garamond** (display) + **Jost** (sans) via `next/font`
- **Supabase** (Postgres) for lead storage — service-role only, RLS locks anon
- **Resend** for the consultation notification email
- **PostHog** for product analytics (EU host by default)
- Dynamic OG image, favicon, and Apple icon via Next `ImageResponse`
- Hosted on **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local    # then fill the values
npm run dev                   # http://localhost:3000
```

## Scripts

| Command          | Purpose                          |
| ---------------- | -------------------------------- |
| `npm run dev`    | Dev server                       |
| `npm run build`  | Production build                 |
| `npm run start`  | Serve the production build       |
| `npm run lint`   | ESLint (next/core-web-vitals)    |

## Environment variables

See [`.env.example`](./.env.example). Short list:

| Variable                         | Used by                   | Notes                                           |
| -------------------------------- | ------------------------- | ----------------------------------------------- |
| `SUPABASE_URL`                   | `lib/supabase-admin.ts`   | Server only                                     |
| `SUPABASE_SERVICE_KEY`           | `lib/supabase-admin.ts`   | Server only; bypasses RLS                       |
| `RESEND_API_KEY`                 | `lib/email.ts`            | Missing = emails silently skipped, `skipped` row in `notifications` |
| `NOTIFICATION_EMAIL`             | `lib/email.ts`            | Inbox for consultation alerts                   |
| `RESEND_FROM_EMAIL`              | `lib/email.ts`            | Must be a verified Resend domain                |
| `NEXT_PUBLIC_POSTHOG_KEY`        | `lib/posthog.ts`          | Client; optional                                |
| `NEXT_PUBLIC_POSTHOG_HOST`       | `lib/posthog.ts`          | Client; use `https://eu.i.posthog.com` for EU   |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `components/ConsultationForm.tsx` | Optional; render Cloudflare Turnstile on the form |
| `TURNSTILE_SECRET_KEY`           | `lib/turnstile.ts`        | Optional; when set the server requires a valid token |
| `RESEND_WEBHOOK_SECRET`          | `app/api/webhooks/resend/route.ts` | Svix signing secret; without it the webhook returns 503 |
| `ADMIN_USER` / `ADMIN_PASSWORD`  | `middleware.ts`           | HTTP Basic credentials for `/admin/*`; fail-closed if unset |
| `UPSTASH_REDIS_REST_URL`         | `lib/rate-limit.ts`       | Optional; enables global rate limiting across lambdas       |
| `UPSTASH_REDIS_REST_TOKEN`       | `lib/rate-limit.ts`       | Optional; pairs with the REST URL                           |

## Project layout

```
app/
  admin/
    notifications/ GET: notifications table viewer (Basic Auth)
  api/
    contact/       POST: consultation form → Supabase + Resend
    pilot/spots/   GET:  public pilot counter ({ total, filled, remaining })
    waitlist/      POST: join waitlist; /count GET: totals + founder cap
    webhooks/resend/ POST: Resend deliverability events → notifications
  privacy/        Privacy policy
  terms/          Terms of service
  error.tsx       Route-level error boundary
  global-error.tsx App-level error boundary
  icon.tsx        Favicon (ImageResponse)
  apple-icon.tsx  Apple touch icon (ImageResponse)
  opengraph-image.tsx OG image (ImageResponse)
  twitter-image.tsx   Twitter card (re-exports OG)
  layout.tsx      Root layout + SEO metadata
  page.tsx        Home
  not-found.tsx   404
  robots.ts       /robots.txt
  sitemap.ts      /sitemap.xml

components/
  Navigation, Hero, CredentialsBar, HowItWorks, ProofStrip,
  PilotProgram, FounderSection, ContactSection, ConsultationForm,
  Footer, HomeHashScroll, PosthogProvider, SkipLink

lib/
  supabase-admin.ts    Lazy service-role client
  leads.ts             upsert + lookup helpers
  email.ts             Resend notification template (logs every attempt)
  notifications.ts     Audit writer for the `notifications` table
  posthog.ts           Lazy PostHog init (client)
  posthog-server.ts    Server-side capture helper (fire-and-forget, fail-open)
  rate-limit.ts        Rate limiter — Upstash Redis REST when configured, else in-memory
  pilot.ts             Live pilot counter (Supabase site_config → fallback)
  turnstile.ts         Cloudflare Turnstile server verifier (opt-in)
  webhook-signature.ts Svix HMAC verifier (constant-time, replay-window)
  scrollToSection.ts   Smooth hash-scroll helpers

middleware.ts          HTTP Basic Auth guard for `/admin/*`

hooks/
  useRevealOnScroll.ts       IntersectionObserver-driven class toggle
  usePrefersReducedMotion.ts prefers-reduced-motion media query

supabase/migrations/   Versioned Postgres migrations
```

## Data model

Four tables are live today:

- `leads` — one row per contact (unique by `email`). All form submissions
  upsert here. RLS: **service role only**.
- `waitlist` — founding-partner queue with `tier`, `position`,
  `referral_code`. Referenced via `lead_id` FK. RLS: **service role only**.
- `site_config` — small key/value (JSONB) store so ops can edit the pilot
  counter (`key = 'pilot'`) without a redeploy. RLS: **service role only**.
- `notifications` — append-only audit log of every outbound send (`sent`,
  `failed`, `skipped`) with provider id, error, and optional `lead_id`.
  RLS: **service role only**.

Unused tables from the initial migration (`orders`, `investor_leads`) were
dropped in `supabase/migrations/20260420150000_drop_unused_tables.sql`.

### Analytics

When `NEXT_PUBLIC_POSTHOG_KEY` is configured, the consultation form emits a
funnel of events:

- `consultation_form_viewed` — first render
- `consultation_form_started` — first user input
- `consultation_form_submitted` — successful POST (with `space_type`,
  `timeline`, `time_on_form_ms`, `has_phone`, `has_message`)
- `consultation_form_error` — submit failed or Turnstile was missing
- `consultation_turnstile_failed` — widget expired or errored

The server fires a matching **authoritative** event on accepted submissions:

- `consultation_server_accepted` — fired from `/api/contact` after
  `upsertLead` + email. Joins to the same person as the client events
  because the client echoes `posthog.get_distinct_id()` in the POST body.
  Useful when the client loses the network after POST or PostHog is
  blocked.

`/api/waitlist` emits `waitlist_server_accepted` (first join, with `tier`
and `position`) or `waitlist_server_rejoin` (idempotent re-POST). No UI
currently calls `/api/waitlist`; the endpoint is programmatically
reachable for internal tooling.

No PII (name/email/phone) is sent to PostHog in any event; only coarse
categories and booleans. Server events are fire-and-forget, capped at 1s,
and never affect the HTTP response.

### Running migrations

```bash
# Apply everything in supabase/migrations/ to the linked project
npx supabase db push
```

The pilot counter migration seeds `site_config` with
`{"total": 10, "filled": 3}`. To update: edit the row in Supabase Studio —
the homepage revalidates within 60 seconds.

### Ops surfaces

- `/admin/notifications` — browser view of the most recent notifications,
  filterable by status. Gated by `ADMIN_USER` / `ADMIN_PASSWORD` Basic
  Auth. Fail-closed: missing env vars → 503.
- `/api/pilot/spots` — public JSON counter, safe to embed anywhere.
- `/api/webhooks/resend` — receives Resend deliverability events. Point
  the Resend dashboard webhook at this URL, then paste the Svix signing
  secret into `RESEND_WEBHOOK_SECRET`. Events are deduped against the
  existing `notifications` row by `provider_id` (Resend's `email_id`).

## Security

- CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and
  X-Frame-Options are set in `next.config.js`. PostHog, Supabase, and
  Cloudflare Turnstile hosts are explicitly allow-listed in the CSP.
- API routes validate with Zod, apply a per-IP rate limit, and reject
  sub-second submissions (bot signal). The rate limiter uses Upstash Redis
  (global across lambda instances) when `UPSTASH_REDIS_REST_URL` +
  `UPSTASH_REDIS_REST_TOKEN` are set, and falls back to a per-instance
  in-memory Map otherwise.
- Supabase anon key is never used on the server; only the service-role key is.
- `/api/*` is disallowed in `robots.txt`.
- The consultation form has layered defences: honeypot `website` field,
  mount-time `started_at` timestamp, per-IP rate limit, and — when the
  Turnstile env vars are set — a Cloudflare Turnstile challenge verified
  server-side.

## Deploy

Deploys to Vercel on push. DNS and domain details are in
[`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Conventions

- **One CTA per view** (hero → pilot → form). No secondary nav buttons.
- Copy is direct and non-euphemistic. Words like `disposal`, `waste`, `chamber`
  are fine; we do not substitute cutesy alternatives.
- Do not introduce heavy animation libraries (Framer Motion, Lottie) without
  a specific reason. The site uses CSS + IntersectionObserver on purpose.
- Keep the font set to Cormorant 300 + Jost 300/400. Adding a weight means one
  more font file on every pageload.
