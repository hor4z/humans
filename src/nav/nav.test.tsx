import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import s from './nav.module.css'
import { Nav } from './nav'

describe('Nav', () => {
  it('es una navegación con nombre', () => {
    render(<Nav label="Principal"><Nav.Item icon="home">Inicio</Nav.Item></Nav>)
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
  })

  it('el item actual lo dice con aria-current, no solo con la barra', () => {
    render(<Nav label="Principal"><Nav.Item icon="home" current>Inicio</Nav.Item><Nav.Item icon="layers">Recursos</Nav.Item></Nav>)
    expect(screen.getByRole('button', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Recursos' })).not.toHaveAttribute('aria-current')
  })

  it('es un botón que responde', async () => {
    const onClick = vi.fn()
    render(<Nav.Item icon="home" onClick={onClick}>Inicio</Nav.Item>)
    await userEvent.click(screen.getByRole('button', { name: 'Inicio' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('contraído esconde la etiqueta y el contador, y el nombre pasa al title', () => {
    render(<Nav.Item icon="home" badge="3" collapsed>Inicio</Nav.Item>)
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument()
    expect(screen.queryByText('3')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('title', 'Inicio')
  })

  it('el glifo propio le gana al icono del set', () => {
    const { container } = render(<Nav.Item icon="home" glyph={<span data-glifo="" />}>Inicio</Nav.Item>)
    expect(container.querySelector('[data-glifo]')).toBeInTheDocument()
    expect(container.querySelector('.ms-icon')).toBeNull()
  })

  it('el inactivo va en tinta, no en gris, y muted es el caso aparte', () => {
    expect(Nav.itemClass()).toContain(s.plain)
    expect(Nav.itemClass()).not.toContain(s.muted)
    expect(Nav.itemClass({ muted: true })).toContain(s.muted)
    expect(Nav.itemClass({ current: true })).toContain(s.current)
  })

  it('el subitem actual se marca igual que su padre', () => {
    render(<Nav.SubItem current>Recetas</Nav.SubItem>)
    expect(screen.getByRole('button', { name: 'Recetas' })).toHaveAttribute('aria-current', 'page')
    expect(Nav.subItemClass({ current: true })).toContain(s.subitemCurrent)
    expect(Nav.subItemClass()).toContain(s.subitemPlain)
  })
})
