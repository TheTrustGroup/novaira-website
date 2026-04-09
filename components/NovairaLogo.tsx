import Image from 'next/image'

const LOGO_SRC = '/brand/novaira-logo.png'
const LOGO_WIDTH = 1024
const LOGO_HEIGHT = 626

type NovairaLogoProps = {
  className?: string
  /** Controls vertical size; width scales with aspect ratio (1024×626). */
  heightClass?: string
  priority?: boolean
  /**
   * Matte black in the PNG becomes visually continuous with --ink (#080509).
   * Turn off if the logo sits on a very light surface.
   */
  blendOnDark?: boolean
}

/**
 * Official NOVAIRA identity. Raster + lighten blend removes the flat PNG matte
 * box on near-black UI; slight contrast lift keeps gold strokes crisp.
 */
export function NovairaLogo({
  className = '',
  heightClass = 'h-8 sm:h-9',
  priority = false,
  blendOnDark = true,
}: NovairaLogoProps) {
  const blend = blendOnDark ? 'mix-blend-lighten' : ''

  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`gpu-layer w-auto object-contain object-left contrast-[1.04] brightness-[1.03] ${blend} ${heightClass} ${className}`.trim()}
      priority={priority}
      sizes="(max-width: 768px) 160px, 220px"
      aria-hidden
    />
  )
}
