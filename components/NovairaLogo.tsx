import Image from 'next/image'

const LOGO_SRC = '/brand/novaira-logo.png'
/** Intrinsic size of transparent PNG (trimmed from source). */
const LOGO_WIDTH = 730
const LOGO_HEIGHT = 589

type NovairaLogoProps = {
  className?: string
  /** Controls vertical size; width scales with aspect ratio. */
  heightClass?: string
  priority?: boolean
}

/**
 * Official NOVAIRA mark — transparent PNG (no matte); no blend hacks required.
 */
export function NovairaLogo({
  className = '',
  heightClass = 'h-8 sm:h-9',
  priority = false,
}: NovairaLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`gpu-layer w-auto object-contain object-left ${heightClass} ${className}`.trim()}
      priority={priority}
      sizes="(max-width: 768px) 160px, 220px"
      aria-hidden
    />
  )
}
