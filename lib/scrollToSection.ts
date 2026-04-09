/**
 * Scroll to an in-page section by id or #hash. Returns false if the element is missing.
 */
export function scrollToSectionId(idOrHash: string): boolean {
  const id = idOrHash.startsWith('#') ? idOrHash.slice(1) : idOrHash
  const decoded = decodeURIComponent(id)
  const el = document.getElementById(decoded)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

/**
 * After mobile menu closes, body overflow is restored in the same React commit cycle;
 * scrolling immediately can be ignored. Defer to the next frame (or two).
 */
export function scrollToSectionIdAfterLayout(idOrHash: string): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSectionId(idOrHash)
    })
  })
}
