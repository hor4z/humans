import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Field } from '../field/field'
import { Switch } from './switch'

describe('Switch', () => {
  it('alterna y expone su estado', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={onChange} label="Oscuro" />)
    const sw = screen.getByRole('switch', { name: 'Oscuro' })
    expect(sw).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(sw)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('la barra de espacio lo prende, que es lo que hace un botón', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={onChange} label="Oscuro" />)
    screen.getByRole('switch').focus()
    await userEvent.keyboard(' ')
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('apagado no se toca', async () => {
    const onChange = vi.fn()
    render(<Switch checked onCheckedChange={onChange} label="Oscuro" disabled />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('adentro de un Field toma su id y se nombra con la etiqueta', () => {
    render(
      <Field>
        <Field.Label>Entregas fuera de fecha</Field.Label>
        <Field.Hint>Después del cierre</Field.Hint>
        <Switch checked onCheckedChange={() => {}} />
      </Field>,
    )
    const sw = screen.getByRole('switch', { name: 'Entregas fuera de fecha' })
    expect(sw).toHaveAccessibleDescription('Después del cierre')
  })

  it('adentro de un form no manda el form', async () => {
    const onSubmit = vi.fn(e => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Switch checked={false} onCheckedChange={() => {}} label="Oscuro" />
      </form>,
    )
    await userEvent.click(screen.getByRole('switch'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('con texto, tocar el texto lo prende y el texto es su nombre', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onCheckedChange={onChange}>Sugerencias</Switch>)
    await userEvent.click(screen.getByText('Sugerencias'))
    expect(onChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole('switch', { name: 'Sugerencias' })).toBeInTheDocument()
  })
})
