import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Rubric, type Criterion } from './rubric'

const criteria: Criterion[] = [
  {
    id: 'datos',
    label: 'Toma de datos',
    weight: 3,
    color: 'green',
    levels: ['Una sola medición', 'Las tres, sin el error', 'Las tres, con el error'],
  },
  {
    id: 'grafico',
    label: 'Gráfico',
    weight: 1,
    color: 'teal',
    levels: ['Altura contra tiempo', 'Altura contra tiempo al cuadrado'],
  },
]

const setup = (props: Record<string, unknown> = {}) => {
  const onAdd = vi.fn()
  const onRemove = vi.fn()
  render(
    <Rubric criteria={criteria} onAdd={onAdd} onRemove={onRemove} {...props}>
      <Rubric.Title>Qué vamos a mirar</Rubric.Title>
    </Rubric>,
  )
  return { onAdd, onRemove }
}

describe('Rubric', () => {
  it('el contador sale de los aspectos y no de una prop', () => {
    setup()
    expect(screen.getByText('2 aspectos')).toBeInTheDocument()
  })

  it('el porcentaje de cada aspecto sale de su peso, para quien no ve la barra', () => {
    setup()
    expect(screen.getByText(', vale 75% de la nota')).toBeInTheDocument()
    expect(screen.getByText(', vale 25% de la nota')).toBeInTheDocument()
  })

  it('la cabecera pliega el cuerpo, y plegado no junta foco', async () => {
    setup()
    const trigger = screen.getByRole('button', { name: 'Qué vamos a mirar' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById(trigger.getAttribute('aria-controls')!))
      .toHaveAttribute('inert')
  })

  it('sacar un aspecto avisa con el aspecto entero, no con su id', async () => {
    const { onRemove } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Sacar Gráfico de la rúbrica' }))
    expect(onRemove).toHaveBeenCalledWith(criteria[1])
  })

  it('el alta abre con el foco en el primer campo y Escape la cierra', async () => {
    setup()
    await userEvent.click(screen.getByRole('button', { name: 'Agregar aspecto' }))

    const field = screen.getByLabelText('Qué vas a mirar')
    expect(field).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Agregar aspecto' })).toHaveFocus()
  })

  it('el alta devuelve lo escrito, y el renglón vacío queda dicho', async () => {
    const { onAdd } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Agregar aspecto' }))
    await userEvent.type(screen.getByLabelText('Qué vas a mirar'), 'Trabajo en equipo')
    await userEvent.type(screen.getByLabelText('Lo mínimo'), 'Trabajó solo')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAdd).toHaveBeenCalledWith({
      label: 'Trabajo en equipo',
      weight: 3,
      levels: [
        'Trabajó solo',
        'Sin escribir: a mitad de camino',
        'Sin escribir: lo pedido',
        'Sin escribir: lo completo',
      ],
    })
  })

  it('sin nombre no agrega nada y el foco vuelve al campo', async () => {
    const { onAdd } = setup()
    await userEvent.click(screen.getByRole('button', { name: 'Agregar aspecto' }))
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Qué vas a mirar')).toHaveFocus()
  })

  it('la barra es una sola parada de tabulación, y cada tramo dice cuánto vale', async () => {
    setup()
    const bar = screen.getByRole('toolbar', { name: 'Cuánto vale cada aspecto' })
    const segments = within(bar).getAllByRole('button')

    expect(segments.map(b => b.getAttribute('aria-label'))).toEqual([
      'Toma de datos, vale 75% de la nota',
      'Gráfico, vale 25% de la nota',
    ])
    expect(segments.filter(b => b.tabIndex === 0)).toHaveLength(1)
  })

  it('el foco en un tramo separa a su aspecto de los demás', () => {
    setup()
    const bar = screen.getByRole('toolbar', { name: 'Cuánto vale cada aspecto' })
    const segments = within(bar).getAllByRole('button')
    const cards = () => screen.getAllByRole('listitem').filter(li => li.className.includes('criterion'))

    expect(cards().filter(li => li.className.includes('criterionDim'))).toHaveLength(0)

    act(() => segments[1].focus())
    const off = cards().filter(li => li.className.includes('criterionDim'))
    expect(off).toHaveLength(1)
    expect(off[0]).toHaveTextContent('Toma de datos')
  })

  it('al enfocar un tramo, su aspecto se trae a la vista', () => {
    setup()
    const bar = screen.getByRole('toolbar', { name: 'Cuánto vale cada aspecto' })
    const card = screen.getAllByRole('listitem')
      .filter(li => li.className.includes('criterion'))[1]
    card.scrollIntoView = vi.fn()

    act(() => within(bar).getAllByRole('button')[1].focus())
    expect(card.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' })
  })

  it('tocar un tramo con la rúbrica plegada la abre en ese aspecto', async () => {
    setup({ defaultOpen: false })
    const trigger = screen.getByRole('button', { name: 'Qué vamos a mirar' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    const bar = screen.getByRole('toolbar', { name: 'Cuánto vale cada aspecto' })
    await userEvent.click(within(bar).getAllByRole('button')[0])
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('sin onAdd ni onRemove la rúbrica se lee y no se edita', () => {
    render(
      <Rubric criteria={criteria}>
        <Rubric.Title>Qué vamos a mirar</Rubric.Title>
      </Rubric>,
    )
    expect(screen.queryByRole('button', { name: 'Agregar aspecto' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Sacar/ })).not.toBeInTheDocument()
  })
})
