import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Mountain, mountainSegments } from '../mountain'
import { PHOTOS, PLACES, facing, meters, neighbor, smoothCurve, th } from '../mountain-data'

describe('la montaña', () => {
  it('son doce curvas de nivel de 120 tramos, el anillo con sus marcas y los 40 tramos del sendero', () => {
    expect(mountainSegments().length / 9).toBe(12 * 120 + 96 * 2 + 40)
  })

  it('cada curva es más angosta que la de abajo: la cumbre queda arriba', () => {
    const data = mountainSegments()
    const radius = (k: number) => {
      const i = (k - 1) * 120 * 9
      return Math.hypot(data[i], data[i + 2])
    }
    for (let k = 2; k <= 12; k++) expect(radius(k)).toBeLessThan(radius(k - 1))
  })

  it('las paradas van de la más baja a la más alta a lo largo del sendero', () => {
    for (let i = 1; i < PLACES.length; i++) {
      expect(PLACES[i].u).toBeGreaterThan(PLACES[i - 1].u)
      expect(PLACES[i].altitude).toBeGreaterThan(PLACES[i - 1].altitude)
    }
  })

  it('cada parada tiene su foto, y cada foto su autor, su licencia y su fuente', () => {
    for (const l of PLACES) expect(PHOTOS[l.photo]).toBeDefined()
    for (const p of PHOTOS) {
      expect(p.author).not.toBe('')
      expect(p.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//)
      expect(p.source).toMatch(/^https:\/\/commons\.wikimedia\.org\//)
    }
  })

  it('facing deja la parada de frente a la cámara, por el giro más corto', () => {
    for (const l of PLACES) {
      const psi = facing(l.u, 3) - 0.6
      expect(Math.sin(th(l.u) + psi)).toBeCloseTo(1, 4)
    }
    for (const current of [-40, -3, 0, 2.5, 17, 300]) expect(Math.abs(facing(0.5, current) - current)).toBeLessThanOrEqual(Math.PI + 1e-3)
  })

  it('el perfil pasa por las paradas y no se pasa de ninguna', () => {
    const xs = [0, 1, 2, 4]
    const ys = [10, 8, 7.5, 2]
    xs.forEach((x, i) => expect(smoothCurve(xs, ys, x)).toBeCloseTo(ys[i], 4))
    let prev = smoothCurve(xs, ys, 0)
    for (let k = 1; k <= 400; k++) {
      const y = smoothCurve(xs, ys, k / 100)
      expect(y).toBeLessThanOrEqual(prev + 1e-4)
      prev = y
    }
  })

  it('la parada de al lado da la vuelta en las puntas, y los metros llevan el punto de los miles', () => {
    expect(neighbor(0, -1)).toBe(PLACES.length - 1)
    expect(neighbor(PLACES.length - 1, 1)).toBe(0)
    expect(meters(5895)).toBe('5.895')
  })

  it('sin WebGL2 dice por qué no se ve, y la ficha de la montaña sigue ahí', async () => {
    render(<Mountain />)
    expect(screen.getByRole('heading', { name: 'Kilimanjaro' })).toBeInTheDocument()
    expect(screen.getByText('Este navegador no dibuja WebGL2.')).toBeInTheDocument()
    const sheet = screen.getByRole('complementary', { name: 'Ficha del Kilimanjaro' })
    expect(within(sheet).getByText('Tanzania, unos 340 km al sur del ecuador, pegado a la frontera con Kenia')).toBeInTheDocument()
    await userEvent.click(within(sheet).getByRole('button', { name: /Cumbre Uhuru/ }))
    expect(screen.getByRole('complementary', { name: 'Cumbre Uhuru' })).toBeInTheDocument()
  })
})
