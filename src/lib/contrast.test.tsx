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
    expect(parseColor('#fff')).toEqual([255, 255, 255, 1])
    expect(parseColor('#0a141e')).toEqual([10, 20, 30, 1])
    expect(parseColor('#0a141e80')?.[3]).toBeCloseTo(0.5, 2)
    expect(parseColor('rgb(10, 20, 30)')).toEqual([10, 20, 30, 1])
    expect(parseColor('rgb(43 43 45 / 0.28)')).toEqual([43, 43, 45, 0.28])
  })

  it('con algo que no es un color devuelve undefined y no NaN', () => {
    expect(contrast('', '#fff')).toBeUndefined()
    expect(contrast('oklch(0.5 0.1 200)', '#fff')).toBeUndefined()
  })

  it('un color con alfa se compone sobre el papel antes de medir', () => {
    expect(contrast('rgb(0 0 0 / 0.5)', '#fff')).toBeCloseTo(contrast('rgb(128 128 128)', '#fff')!, 1)
    expect(contrast('#000', 'rgb(0 0 0 / 0.08)', '#fff')).toBeLessThan(21)
  })
})
