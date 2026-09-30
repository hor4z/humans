import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Mountain, mountainSegments } from '../mountain'

describe('la montaña', () => {
  it('son doce curvas de nivel de 120 tramos, el anillo de la base y sus marcas', () => {
    const data = mountainSegments()
    expect(data.length / 9).toBe(12 * 120 + 96 * 2)
  })

  it('cada curva es más angosta que la de abajo: la cumbre queda arriba', () => {
    const data = mountainSegments()
    const radius = (k: number) => {
      const i = (k - 1) * 120 * 9
      return Math.hypot(data[i], data[i + 2])
    }
    for (let k = 2; k <= 12; k++) expect(radius(k)).toBeLessThan(radius(k - 1))
  })

  it('sin WebGL2 dice por qué no se ve, en lugar de dejar un hueco', () => {
    render(<Mountain />)
    expect(screen.getByRole('heading', { name: 'Montaña' })).toBeInTheDocument()
    expect(screen.getByText('Este navegador no dibuja WebGL2.')).toBeInTheDocument()
  })
})
