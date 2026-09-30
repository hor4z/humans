import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Choice } from './choice'

const choices = [
  { id: 'fria', label: 'La del agua fría' },
  { id: 'sin', label: 'La que no tenía azúcar' },
  { id: 'doble', label: 'La del doble de azúcar' },
]

const QuestionFixture = (props: Partial<Parameters<typeof Choice>[0]> = {}) => (
  <Choice options={choices} value={[]} onValueChange={() => {}} {...props}>
    <Choice.Prompt>¿Cuál infló menos?</Choice.Prompt>
  </Choice>
)

describe('Choice', () => {
  it('el enunciado nombra al grupo: sin eso un lector dice "grupo de radios" y nada más', () => {
    render(<QuestionFixture />)
    expect(screen.getByRole('radiogroup', { name: '¿Cuál infló menos?' })).toBeInTheDocument()
  })

  it('cada tarjeta se nombra con su propio texto', () => {
    render(<QuestionFixture />)
    expect(screen.getByRole('radio', { name: 'La que no tenía azúcar' })).toBeInTheDocument()
  })

  it('devuelve lo marcado y no el id que se tocó', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture onValueChange={onValueChange} />)
    await userEvent.click(screen.getByText('La del agua fría'))
    expect(onValueChange).toHaveBeenCalledWith(['fria'])
  })

  it('eligiendo una sola, la nueva reemplaza a la anterior', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture value={['fria']} onValueChange={onValueChange} />)
    await userEvent.click(screen.getByText('La del doble de azúcar'))
    expect(onValueChange).toHaveBeenCalledWith(['doble'])
  })

  it('eligiendo una sola, volver a tocar la elegida no la apaga', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture value={['fria']} onValueChange={onValueChange} />)
    await userEvent.click(screen.getByText('La del agua fría'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('con multiple se suman, y son casillas y no opciones únicas', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture multiple value={['fria']} onValueChange={onValueChange} />)
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    await userEvent.click(screen.getByText('La que no tenía azúcar'))
    expect(onValueChange).toHaveBeenCalledWith(['fria', 'sin'])
  })

  it('con multiple, volver a tocar una saca esa y deja las demás', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture multiple value={['fria', 'sin']} onValueChange={onValueChange} />)
    await userEvent.click(screen.getByText('La del agua fría'))
    expect(onValueChange).toHaveBeenCalledWith(['sin'])
  })

  it('las flechas mueven entre opciones únicas, que es una sola parada de tabulación', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture value={['fria']} onValueChange={onValueChange} />)
    await userEvent.tab()
    expect(screen.getByRole('radio', { name: 'La del agua fría' })).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(onValueChange).toHaveBeenCalledWith(['sin'])
  })

  it('sin revelar no corrige a nadie: marcar no dice si estuvo bien', () => {
    render(<QuestionFixture value={['fria']} correct={['sin']} />)
    expect(screen.queryByText(/es una de las que iban/)).not.toBeInTheDocument()
  })

  it('al revelar dice cuáles iban, en texto y no solo en color', () => {
    render(<QuestionFixture value={['fria']} correct={['sin']} revealed />)
    expect(screen.getByRole('radio', { name: /La que no tenía azúcar, es una de las que iban/ })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /La del agua fría, esta no iba/ })).toBeInTheDocument()
  })

  it('revelar sin saber cuáles iban no marca nada: no tener la respuesta no es que todo esté mal', () => {
    render(<QuestionFixture value={['fria']} revealed />)
    expect(screen.queryByText(/esta no iba/)).not.toBeInTheDocument()
    expect(screen.queryByText(/es una de las que iban/)).not.toBeInTheDocument()
  })

  it('lo marcado de más también lleva glifo, porque el color no dice nada solo', () => {
    const { container } = render(<QuestionFixture value={['fria']} correct={['sin']} revealed />)
    expect(container.querySelectorAll('[class*=Mark]')).toHaveLength(2)
  })

  it('una pregunta corregida no se vuelve a responder', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture value={['fria']} correct={['sin']} revealed onValueChange={onValueChange} />)
    await userEvent.click(screen.getByText('La del doble de azúcar'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('apagada se lee y no se toca', async () => {
    const onValueChange = vi.fn()
    render(<QuestionFixture readOnly onValueChange={onValueChange} />)
    expect(screen.getByRole('radio', { name: 'La del agua fría' })).toBeDisabled()
    await userEvent.click(screen.getByText('La del agua fría'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('la línea de apoyo es opcional y no deja el hueco cuando no está', () => {
    const { container } = render(<QuestionFixture />)
    expect(container.querySelectorAll('p')).toHaveLength(1)
  })
})
