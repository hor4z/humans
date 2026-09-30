import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SelfAssessment, type Criterion } from './self-assessment'

const criteria: Criterion[] = [
  {
    id: 'idea',
    label: 'La idea',
    weight: 3,
    color: 'green',
    levels: ['Poco clara', 'Se entiende qué vende', 'Clara y posible', 'Clara, posible y propia'],
  },
  {
    id: 'cuentas',
    label: 'Las cuentas',
    weight: 5,
    color: 'blue',
    levels: ['No logra resolverlas', 'Resuelve algunas', 'Resuelve bien', 'Resuelve todo'],
  },
]

const setup = (props: Record<string, unknown> = {}) => {
  const onValueChange = vi.fn()
  render(
    <SelfAssessment criteria={criteria} value={{}} onValueChange={onValueChange} {...props}>
      <SelfAssessment.Title>Dónde estás</SelfAssessment.Title>
    </SelfAssessment>,
  )
  return { onValueChange }
}

describe('SelfAssessment', () => {
  it('dice qué falta y no cuánto va: lo que sirve es el pendiente', () => {
    setup()
    expect(screen.getByText('2 aspectos')).toBeInTheDocument()
  })

  it('con todos ubicados lo dice sin números', () => {
    setup({ value: { idea: 2, cuentas: 0 } })
    expect(screen.getByText('lista')).toBeInTheDocument()
  })

  it('el plural sale bien con uno solo', () => {
    setup({ value: { idea: 2 } })
    expect(screen.getByText('1 aspecto')).toBeInTheDocument()
  })

  it('plegado, cada aspecto dice en cuál quedó', () => {
    setup({ value: { idea: 2 } })
    expect(screen.getAllByText('Bueno').length).toBeGreaterThan(0)
    expect(screen.getByText('sin ubicar')).toBeInTheDocument()
  })

  it('el panel entero se pliega, como el del docente', async () => {
    setup()
    const header = screen.getByRole('button', { name: 'Dónde estás' })
    expect(header).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(header)
    expect(header).toHaveAttribute('aria-expanded', 'false')
  })

  it('los niveles son un grupo de opción única, nombrado con el aspecto', () => {
    setup()
    expect(screen.getByRole('radiogroup', { name: /La idea/ })).toBeInTheDocument()
  })

  it('elegir devuelve el aspecto y el nivel', async () => {
    const { onValueChange } = setup()
    const group = screen.getByRole('radiogroup', { name: /La idea/ })
    await userEvent.click(within(group).getByRole('radio', { name: /Clara y posible/ }))
    expect(onValueChange).toHaveBeenCalledWith({ idea: 2 })
  })

  it('solo uno queda marcado: son cuatro descripciones del mismo estado', () => {
    setup({ value: { idea: 2 } })
    const group = screen.getByRole('radiogroup', { name: /La idea/ })
    const checkedIds = within(group).getAllByRole('radio').filter(r => r.getAttribute('aria-checked') === 'true')
    expect(checkedIds).toHaveLength(1)
  })

  it('una sola abierta por vez: la rúbrica se lee de arriba abajo', async () => {
    setup()
    const closed = screen.getByRole('button', { name: /Las cuentas/ })
    expect(closed).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(closed)
    expect(closed).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /La idea/ })).toHaveAttribute('aria-expanded', 'false')
  })

  it('sin cuatro renglones no hay nombre de nivel que poner, así que dice cuál es', () => {
    render(
      <SelfAssessment criteria={[{ ...criteria[0], levels: ['a', 'b', 'c'] }]} value={{ idea: 1 }} onValueChange={() => {}}>
        <SelfAssessment.Title>Dónde estás</SelfAssessment.Title>
      </SelfAssessment>,
    )
    expect(screen.getByText('nivel 2')).toBeInTheDocument()
  })
})
