import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Table } from './table'

describe('Table', () => {
  it('las acciones de una celda no activan también la fila', async () => {
    const row = vi.fn(), action = vi.fn()
    render(<Table label="Actividades"><Table.Body><Table.Row onClick={row}><Table.Cell><button onClick={action}>Abrir menú</button></Table.Cell></Table.Row></Table.Body></Table>)
    expect(screen.getByRole('table', { name: 'Actividades' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menú' }))
    await userEvent.keyboard('{Enter}')
    expect(action).toHaveBeenCalledTimes(2)
    expect(row).not.toHaveBeenCalled()
  })

  it('el encabezado anuncia el orden y permite cambiarlo', async () => {
    const onSort = vi.fn()
    render(<Table><Table.Header><Table.Row><Table.Head sort="ascending" onSort={onSort}>Nombre</Table.Head></Table.Row></Table.Header></Table>)
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending')
    await userEvent.click(screen.getByRole('button', { name: /Nombre/ }))
    expect(onSort).toHaveBeenCalledOnce()
  })

  it('las columnas fijas no pueden ocultarse y se restablece la configuración', async () => {
    const change = vi.fn()
    render(<Table.Columns columns={[{ id: 'name', label: 'Nombre', locked: true }, { id: 'state', label: 'Estado' }]} value={['name']} onValueChange={change} />)
    await userEvent.click(screen.getByRole('button', { name: /Columnas/ }))
    expect(screen.getByRole('checkbox', { name: 'Nombre' })).toBeDisabled()
    await userEvent.click(screen.getByRole('checkbox', { name: 'Estado' }))
    expect(change).toHaveBeenLastCalledWith(['name', 'state'])
    await userEvent.click(screen.getByRole('button', { name: 'Restablecer' }))
    expect(change).toHaveBeenLastCalledWith(['name', 'state'])
  })

  it('arma la grilla con su pie', () => {
    render(
      <Table>
        <Table.Header><Table.Row><Table.Head>Nombre</Table.Head></Table.Row></Table.Header>
        <Table.Body><Table.Row><Table.Cell>Ana</Table.Cell></Table.Row></Table.Body>
        <Table.Foot><Table.Row><Table.Cell>Total</Table.Cell></Table.Row></Table.Foot>
      </Table>,
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Ana')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('la franja del footer queda fuera del scroller', () => {
    const { container } = render(
      <Table><Table.Footer><div data-testid="franja">pie</div></Table.Footer>
        <Table.Body><Table.Row><Table.Cell>x</Table.Cell></Table.Row></Table.Body>
      </Table>,
    )
    const scroller = [...container.querySelectorAll('div')]
      .find(d => getComputedStyle(d).overflowX === 'auto' || /_scroller_/.test(d.className))!
    expect(scroller.contains(screen.getByTestId('franja'))).toBe(false)
  })

  it('una fila que se toca se toca también con el teclado', async () => {
    const onOpen = vi.fn()
    render(
      <Table>
        <Table.Body><Table.Row onClick={onOpen}><Table.Cell>Ana</Table.Cell></Table.Row></Table.Body>
      </Table>,
    )
    const row = screen.getByText('Ana').closest('tr')!
    expect(row).toHaveAttribute('tabindex', '0')
    row.focus()
    await userEvent.keyboard('{Enter}')
    expect(onOpen).toHaveBeenCalledOnce()
    await userEvent.keyboard(' ')
    expect(onOpen).toHaveBeenCalledTimes(2)
  })

  it('una fila que no hace nada no es una parada de tabulación', () => {
    render(
      <Table>
        <Table.Body><Table.Row><Table.Cell>Ana</Table.Cell></Table.Row></Table.Body>
      </Table>,
    )
    expect(screen.getByText('Ana').closest('tr')).not.toHaveAttribute('tabindex')
  })

  it('los encabezados dicen a qué columna encabezan', () => {
    render(
      <Table>
        <Table.Header><Table.Row><Table.Head>Nombre</Table.Head></Table.Row></Table.Header>
        <Table.Body><Table.Row><Table.Cell>Ana</Table.Cell></Table.Row></Table.Body>
      </Table>,
    )
    expect(screen.getByText('Nombre')).toHaveAttribute('scope', 'col')
  })
})
