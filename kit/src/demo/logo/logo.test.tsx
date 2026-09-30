import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Logo } from './logo'

describe('Logo', () => {
  it('al lado del nombre es decorativa y el lector no la anuncia', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('sola lleva su nombre', () => {
    render(<Logo label="humans" />)
    expect(screen.getByRole('img', { name: 'humans' })).toBeInTheDocument()
  })

  it('toma el color del texto, así sirve en los dos temas', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('path')).toHaveAttribute('fill', 'currentColor')
  })
})
