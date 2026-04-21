# NOVAIRA — Brand Kit

Canonical logo and mark files for press, social, partnerships, and print.

## Files in this folder

| File                  | Use case                                                              |
| --------------------- | --------------------------------------------------------------------- |
| `mark-dark.svg`       | Primary. Gold gradient mark on dark backgrounds (ink, deep grey).     |
| `mark-light.svg`      | Reverse. Bronze mark on light backgrounds (cream, white).             |
| `mark-mono-gold.svg`  | Monochrome gold. Use for foil stamping, embossing, single-ink print.  |

All files are **SVG** — resolution-independent, editable in any vector tool
(Figma, Illustrator, Affinity), and render crisp at every size from 16px
favicon to wall-size signage.

If you need raster PNGs at specific sizes: open the SVG in your tool and
export. Common targets: 256, 512, 1024, 2048 px.

## The Mark — geometry

The mark is a mathematically precise offset crescent:

- Outer arc radius: `100`
- Inner arc radius: `80`
- Offset (rightward): `28`
- Intersection points: `(78.286, ±62.220)` — solved, not approximated
- ViewBox: `-105 -105 210 210`

## Colour tokens

| Token           | Hex      | Role                                         |
| --------------- | -------- | -------------------------------------------- |
| Ink             | `#09070A`| Primary background, type on light            |
| Cream           | `#F3EBD8`| Primary type on dark, light-reverse bg       |
| Silver Cream    | `#EEE8E0`| Headline type on dark                        |
| Gold            | `#C4956A`| Accent, mark body, rules                     |
| Gold Light      | `#E8C99A`| Mark upper body, highlights                  |
| Gold Dark       | `#8B7050`| Mark shadows, deep accents                   |

The mark's five-stop gradient moves `F2EEE8 → E8C99A → C4956A → D4A87A → EDE4D4`
— cool silver-cream at the tips, warm gold through the body, cooler cream
at the bottom tip. Nova to earth. New star, grounded.

## Typography

| Face                    | Weight | Use                                     |
| ----------------------- | ------ | --------------------------------------- |
| Cormorant Garamond      | 200    | Wordmark "NOVAIRA", display headlines   |
| Cormorant Garamond      | 300    | Body display, pull quotes               |
| Jost                    | 300    | UI labels, captions                     |
| Jost                    | 400    | Body copy                               |

### Wordmark setting

- Face: **Cormorant Garamond**
- Weight: **200** (Light / Extra-Light)
- Case: **UPPERCASE**
- Tracking: **0.32em** (320 / 1000 in Figma, 320 tracking units in Illustrator)
- Colour on dark: `#F3EBD8` (cream) or `#EEE8E0` (silver cream)
- Colour on light: `#09070A` (ink)

## Clear space

Minimum clear space around the mark = **one tip-to-tip diameter** of the
crescent on all sides. Never place type, lines, or imagery inside this zone.

## Minimum size

| Application         | Minimum mark size         |
| ------------------- | ------------------------- |
| Digital (web, app)  | 16 × 16 px                |
| Print (CMYK)        | 8 × 8 mm                  |
| Foil / emboss       | 12 × 12 mm                |

Below these sizes the crescent tips begin to lose definition.

## Do / Don't

- ✅ Use `mark-dark.svg` on any background darker than `#3A3A3A`.
- ✅ Use `mark-light.svg` on any background lighter than `#E8E8E8`.
- ✅ Preserve the aspect ratio. The crescent is asymmetric by design.
- ✅ Pair with Cormorant Garamond or another high-contrast serif if unavailable.
- ❌ Do not add drop shadows, bevels, outlines, or outer strokes.
- ❌ Do not rotate, skew, or stretch the mark.
- ❌ Do not recolour outside the listed tokens.
- ❌ Do not place the mark on a busy photograph without a scrim.

## Questions

hello@novairaworld.com
