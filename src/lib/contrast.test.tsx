import { describe, expect, it } from 'vitest'
import { contrast, parseColor } from './contrast'

describe('contrast', () => {
  it('negro sobre blanco es 21', () => {
    expect(contrast('#000', '#ffffff')).toBeCloseTo(21, 5)
  })

  it('no depende del orden', () => {
    expect(contrast('#0b5fff', '#fff')).toBe(contrast('#fff', '#0b5fff'))
  })

  it('lee hex de tres, seis y ocho cifras y rgb()', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255])
    expect(parseColor('#0a141e')).toEqual([10, 20, 30])
    expect(parseColor('#0a141e80')).toEqual([10, 20, 30])
    expect(parseColor('rgb(10, 20, 30)')).toEqual([10, 20, 30])
  })

  it('con algo que no es un color devuelve undefined y no NaN', () => {
    expect(contrast('', '#fff')).toBeUndefined()
    expect(contrast('oklch(0.5 0.1 200)', '#fff')).toBeUndefined()
  })
})
