import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Collapsible } from './collapsible'

describe('Collapsible', () => {
  it('cerrado no se puede leer ni enfocar, pero sigue montado para animar', () => {
    const { container } = render(<Collapsible open={false} id="c"><button>Adentro</button></Collapsible>)
    expect(container.querySelector('#c')).toHaveAttribute('inert')
  })

  it('abierto se lee', () => {
    render(<Collapsible open id="c"><button>Adentro</button></Collapsible>)
    expect(screen.getByRole('button', { name: 'Adentro' })).toBeInTheDocument()
  })

  it('la flecha es decorativa', () => {
    const { container } = render(<Collapsible.Chevron open />)
    expect(container.querySelector('.ms-icon')).toHaveAttribute('aria-hidden', 'true')
  })
})
