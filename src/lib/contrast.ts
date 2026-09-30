/** Un color como `[r, g, b]` de 0 a 255, o `undefined` si no es un hex ni un `rgb()`. */
export function parseColor(color: string): [number, number, number] | undefined {
  const c = color.trim()
  const hex = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)?.[1]
  if (hex) {
    const full = hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex
    return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
  }
  const rgb = c.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i)
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : undefined
}

function luminance([r, g, b]: [number, number, number]) {
  const [lr, lg, lb] = [r, g, b].map(v => v / 255).map(s => (s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)))
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

/** El contraste WCAG entre dos colores, de 1 a 21. Con un color que no se puede leer devuelve `undefined`. */
export function contrast(a: string, b: string): number | undefined {
  const [x, y] = [parseColor(a), parseColor(b)]
  if (!x || !y) return undefined
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p)
  return (hi + 0.05) / (lo + 0.05)
}
