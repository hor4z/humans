type Rgba = [number, number, number, number]

/** Un color como `[r, g, b, alfa]`, o `undefined` si no es un hex ni un `rgb()`. */
export function parseColor(color: string): Rgba | undefined {
  const c = color.trim()
  const hex = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)?.[1]
  if (hex) {
    const full = hex.length === 3 ? hex.split('').map(x => x + x).join('') : hex
    const [r, g, b, a] = [0, 2, 4, 6].map(i => (full.length > i ? parseInt(full.slice(i, i + 2), 16) : 255))
    return [r, g, b, a / 255]
  }
  const rgb = c.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[\s,/]\s*([\d.]+)(%)?)?\s*\)$/i)
  if (!rgb) return undefined
  const alpha = rgb[4] === undefined ? 1 : rgb[5] ? Number(rgb[4]) / 100 : Number(rgb[4])
  return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), alpha]
}

function over([r, g, b, a]: Rgba, [br, bg, bb]: Rgba): Rgba {
  return [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1]
}

function luminance([r, g, b]: Rgba) {
  const [lr, lg, lb] = [r, g, b].map(v => v / 255).map(s => (s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)))
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

/** El contraste WCAG de `fg` sobre `bg`, de 1 a 21. Un color con alfa se compone antes de medir: `bg` sobre `paper` y `fg` sobre el resultado. Sin `paper`, lo translúcido cae sobre blanco. Con un color que no se puede leer devuelve `undefined`. */
export function contrast(fg: string, bg: string, paper = 'rgb(255 255 255)'): number | undefined {
  const [f, b, p] = [parseColor(fg), parseColor(bg), parseColor(paper)]
  if (!f || !b || !p) return undefined
  const back = over(b, over(p, [255, 255, 255, 1]))
  const [hi, lo] = [luminance(over(f, back)), luminance(back)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
