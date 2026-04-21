'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: '#1a1a1a',
          color: '#f5f1ed',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'Georgia, serif',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.75rem' }}>
          Something went wrong
        </h1>
        <p style={{ fontWeight: 300, marginBottom: '2rem', maxWidth: '28rem', opacity: 0.8 }}>
          The page could not be rendered. Please reload or contact{' '}
          <a href="mailto:office@novairaworld.com" style={{ color: '#d4a5a5' }}>
            office@novairaworld.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#d4a5a5',
            color: '#1a1a1a',
            padding: '0.875rem 2.25rem',
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            border: 0,
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
        {error.digest ? (
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', opacity: 0.45 }}>
            Error ID: {error.digest}
          </p>
        ) : null}
      </body>
    </html>
  )
}
