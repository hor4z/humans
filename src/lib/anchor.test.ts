import { describe, expect, it } from 'vitest'
import { place } from './anchor'

const box = (top: number, left: number, w = 100, h = 40) =>
  ({ top, left, right: left + w, bottom: top + h, width: w, height: h }) as DOMRect

describe('place', () => {
  it('sitúa el panel a la derecha y lo centra verticalmente', () => {
    expect(place(box(100, 50), 120, 60, { prefer: 'right', align: 'center' })).toEqual({ top: 90, left: 158 })
  })

  it('cambia de lado cuando el borde no deja espacio', () => {
    const right = box(100, window.innerWidth - 110)
    expect(place(right, 120, 60, { prefer: 'right' }).left).toBe(right.left - 128)
    expect(place(box(100, 10), 120, 60, { prefer: 'left' }).left).toBe(118)
  })

  it('respeta alineación y separación para los lados horizontales', () => {
    expect(place(box(100, 300), 120, 60, { prefer: 'left', align: 'end', gap: 12 })).toEqual({ top: 80, left: 168 })
  })

  it('acota también el eje vertical si ninguno de los lados alcanza', () => {
    const result = place(box(-40, 10), 120, window.innerHeight + 20, { prefer: 'right' })
    expect(result.top).toBe(8)
  })

  it('va debajo del disparador si entra', () => {
    expect(place(box(100, 50), 200, 100)).toEqual({ top: 148, left: 50 })
  })

  it('pasa arriba cuando abajo no entra y arriba sí', () => {
    const p = place(box(window.innerHeight - 60, 50), 200, 100)
    expect(p.top).toBe(window.innerHeight - 60 - 8 - 100)
  })

  it('prefer above elige arriba si entra de los dos lados', () => {
    expect(place(box(300, 50), 200, 100, { prefer: 'above' }).top).toBe(192)
  })

  it('alinea al borde final y al centro', () => {
    expect(place(box(100, 400), 200, 100, { align: 'end' }).left).toBe(300)
    expect(place(box(100, 400), 200, 100, { align: 'center' }).left).toBe(350)
  })

  it('nunca sale de la ventana', () => {
    expect(place(box(100, -50), 200, 100).left).toBe(8)
    expect(place(box(100, window.innerWidth), 200, 100).left).toBe(window.innerWidth - 208)
  })
})
