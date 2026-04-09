/**
 * WCAG “bypass block”: keyboard users tab here first to jump past the nav
 * straight to the main landmark. It is intentionally invisible until
 * :focus-visible (Tab) so sighted users are not interrupted; screen readers
 * can still list the link in the rotor.
 */
export default function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}
