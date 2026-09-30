import { describe, expect, it, vi } from 'vitest'
import { style } from '../__tests__/estilo'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from './search'

describe('Search', () => {
  it('usa el propósito de búsqueda como nombre accesible por defecto', () => {
    render(<Search placeholder="Buscar actividades" value="" onValueChange={() => {}} />)
    expect(screen.getByRole('textbox', { name: 'Buscar actividades' })).toBeInTheDocument()
  })

  it('el atajo se ve mientras está vacío y lo tapa la cruz al escribir', () => {
    const { rerender } = render(<Search placeholder="Buscar una actividad" value="" onValueChange={() => {}} shortcut="/" />)
    expect(screen.getByText('/')).toBeInTheDocument()
    rerender(<Search placeholder="Buscar una actividad" value="frac" onValueChange={() => {}} shortcut="/" />)
    expect(screen.queryByText('/')).toBeNull()
    expect(screen.getByRole('button', { name: 'Limpiar la búsqueda' })).toBeInTheDocument()
  })

  it('la cruz vacía el campo y le devuelve el foco', async () => {
    const onValueChange = vi.fn()
    render(<Search placeholder="Buscar una actividad" value="frac" onValueChange={onValueChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar la búsqueda' }))
    expect(onValueChange).toHaveBeenCalledWith('')
    expect(document.activeElement).toBe(screen.getByRole('textbox'))
  })

  it('la cruz está centrada: es cuadrada y centra su glifo', () => {
    render(<Search placeholder="Buscar una actividad" value="frac" onValueChange={() => {}} />)
    const cross = screen.getByRole('button', { name: 'Limpiar la búsqueda' })
    expect(style(cross)).toContain('justify-content: center')
  })

  it('`inputRef` llega al input: es lo que un atajo necesita para enfocarlo', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Search placeholder="Buscar una actividad" value="" onValueChange={() => {}} ref={ref} />)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })
})
