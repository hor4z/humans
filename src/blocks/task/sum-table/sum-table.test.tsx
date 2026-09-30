import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SumTable, type SumCell } from './sum-table'

const rows = [
  { id: 'materia', label: 'Materia prima' },
  { id: 'packaging', label: 'Packaging' },
]

const loaded: Record<string, SumCell> = {
  materia: { qty: '20', price: '2000' },
  packaging: { qty: '20', price: '300' },
}

const BudgetFixture = (props: Partial<Parameters<typeof SumTable>[0]> = {}) => (
  <SumTable rows={rows} value={{}} onValueChange={() => {}} {...props}>
    <SumTable.Prompt>Tu presupuesto inicial</SumTable.Prompt>
  </SumTable>
)

describe('SumTable', () => {
  it('cada celda dice de qué renglón es: "cantidad" a secas no sirve con cinco filas', () => {
    render(<BudgetFixture />)
    expect(screen.getByRole('textbox', { name: 'Cantidad de Materia prima' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Precio de Packaging' })).toBeInTheDocument()
  })

  it('devuelve el renglón entero y no la celda suelta', async () => {
    const onValueChange = vi.fn()
    render(<BudgetFixture onValueChange={onValueChange} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Cantidad de Packaging' }), '5')
    expect(onValueChange).toHaveBeenCalledWith({ packaging: { qty: '5', price: '' } })
  })

  it('el subtotal sale de los dos números, así que con uno solo todavía no hay nada', () => {
    render(<BudgetFixture value={{ materia: { qty: '20', price: '' } }} />)
    expect(screen.getAllByText(/^\$/)).toHaveLength(1)
    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  it('el total no se escribe, y por eso no puede estar mal sumado', () => {
    render(<BudgetFixture value={loaded} />)
    expect(screen.getByText('$46.000')).toBeInTheDocument()
  })

  it('con tope dice cuánto queda, que es lo que hace falta para decidir', () => {
    render(<BudgetFixture value={loaded} cap={100000} />)
    expect(screen.getByText('Te quedan $54.000 de los $100.000.')).toBeInTheDocument()
  })

  it('pasarse lo dice con el número, no con un color', () => {
    render(<BudgetFixture value={loaded} cap={40000} />)
    expect(screen.getByText('Te pasaste por $6.000. El tope es $40.000.')).toBeInTheDocument()
  })

  it('sin tope la tabla suma y no opina', () => {
    render(<BudgetFixture value={loaded} />)
    expect(screen.queryByText(/tope|quedan|pasaste/)).not.toBeInTheDocument()
  })

  it('de solo lectura se lee y no se completa', () => {
    render(<BudgetFixture value={loaded} readOnly />)
    expect(screen.getByRole('textbox', { name: 'Cantidad de Materia prima' })).toHaveAttribute('readonly')
  })

})