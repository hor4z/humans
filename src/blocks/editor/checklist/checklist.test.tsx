import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checklist } from './checklist'

const setup = (props: Record<string, unknown> = {}, onClick = vi.fn()) => {
  render(
    <Checklist {...props}>
      <Checklist.Title>Primeros pasos</Checklist.Title>
      <Checklist.Item state="done">Creá tu primer espacio</Checklist.Item>
      <Checklist.Item state="doing" onClick={onClick}>Conectá tu cuenta</Checklist.Item>
      <Checklist.Item state="blocked" hint="Hace falta la cuenta conectada" onClick={onClick}>
        Sumá a tus estudiantes
      </Checklist.Item>
      <Checklist.Item>Ajustá tus preferencias</Checklist.Item>
      <Checklist.Footer>Tocá el logo para volver al inicio.</Checklist.Footer>
    </Checklist>,
  )
  return { onClick }
}

describe('Checklist', () => {
  it('el contador sale de los pasos y no de una prop', () => {
    setup()
    const counterEl = screen.getByText((_, el) => el?.className.includes('count') ?? false)
    expect(counterEl).toHaveTextContent('1/4')
    expect(counterEl).toHaveTextContent('pasos hechos')
  })

  it('el botón es la flecha sola, y toma su nombre del título de al lado', () => {
    setup()
    const trigger = screen.getByRole('button', { name: 'Primeros pasos' })
    expect(trigger).not.toHaveTextContent('Primeros pasos')
    expect(trigger).toHaveAttribute('aria-labelledby')
    expect(document.getElementById(trigger.getAttribute('aria-labelledby')!))
      .toHaveTextContent('Primeros pasos')
  })

  it('la barra y el contador quedan afuera del botón: si no, se leen como su nombre', () => {
    setup()
    const trigger = screen.getByRole('button', { name: 'Primeros pasos' })
    expect(trigger).not.toHaveTextContent('1/4')
  })

  it('arranca plegada: la cabecera dice lo mismo sin ocupar la pantalla', () => {
    setup()
    const header = screen.getByRole('button', { name: 'Primeros pasos' })
    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Creá tu primer espacio')).not.toBeInTheDocument()
  })

  it('se abre al tocarla y la cabecera dice a qué apunta', async () => {
    setup()
    const header = screen.getByRole('button', { name: 'Primeros pasos' })
    await userEvent.click(header)
    expect(header).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Creá tu primer espacio')).toBeInTheDocument()
    expect(document.getElementById(header.getAttribute('aria-controls')!)).toBeInTheDocument()
  })

  it('el paso en curso se anuncia como el actual', async () => {
    setup({ defaultOpen: true })
    expect(screen.getByText('Conectá tu cuenta').closest('[data-state]'))
      .toHaveAttribute('aria-current', 'step')
  })

  it('un paso trabado no se puede tocar, aunque le pasen onClick', async () => {
    const { onClick } = setup({ defaultOpen: true })
    const stuck = screen.getByText('Sumá a tus estudiantes').closest('[data-state]')!
    expect(stuck.tagName).toBe('DIV')
    await userEvent.click(stuck)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('el paso que sí se puede tocar es un botón y responde', async () => {
    const { onClick } = setup({ defaultOpen: true })
    await userEvent.click(screen.getByRole('button', { name: /Conectá tu cuenta/ }))
    expect(onClick).toHaveBeenCalled()
  })

  it('sin pasos hechos el contador no divide por cero', () => {
    render(
      <Checklist defaultOpen>
        <Checklist.Title>Vacía</Checklist.Title>
      </Checklist>,
    )
    expect(screen.getByText((_, el) => el?.className.includes('count') ?? false)).toHaveTextContent('0/0')
  })
})
