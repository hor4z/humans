/** Una pieza del paquete o del sitio. */
export type Piece = {
  name: string
  dir: string
  file: string | undefined
  subpath: string
  entry: string
  layer: 'base' | 'blocks'
  family?: string
}
export function pieces(src: string): Piece[]
export function families(src: string): string[]
export function demos(kitSrc: string): { name: string; dir: string; file: string }[]
