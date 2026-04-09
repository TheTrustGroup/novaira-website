import Image from 'next/image'

const LOGO_SRC = '/brand/novaira-logo.png'
const LOGO_WIDTH = 1024
const LOGO_HEIGHT = 626

type NovairaLogoProps = {
  className?: string
  /** Controls vertical size; width scales with aspect ratio (1024×626). */
  heightClass?: string
  priority?: boolean
}

/**
 * Official NOVAIRA identity (intersecting circles + pillars). Raster for fidelity at all sizes.
 */
export function NovairaLogo({
  className = '',
  heightClass = 'h-8 sm:h-9',
  priority = false,
}: NovairaLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="NOVAIRA"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`w-auto object-contain object-left ${heightClass} ${className}`.trim()}
      priority={priority}
      sizes="(max-width: 768px) 140px, 200px"
    />
  )
}
