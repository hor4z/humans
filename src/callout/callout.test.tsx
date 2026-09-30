import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Callout } from './callout'
import { Button } from '../button/button'

describe('Callout', () => {
  it('sin tono es una nota: contenido al costado del hilo, no un aviso del sistema ni una región más', () => {
    render(<Callout><Callout.Title>Para acordarse</Callout.Title>La velocidad límite no depende de la masa.</Callout>)
    const c = screen.getByRole('note')
    expect(c).toHaveTextContent('Para acordarse')
    expect(c).toHaveTextContent('La velocidad límite no depende de la masa.')
  })

  it('sin título arranca directo con el texto', () => {
    render(<Callout>Solo el cuerpo.</Callout>)
    expect(screen.getByRole('note')).toHaveTextContent('Solo el cuerpo.')
  })

  it('el glifo es decorativo: lo que dice el bloque está en su texto', () => {
    const { container } = render(<Callout icon="lightbulb">Una pista.</Callout>)
    expect(container.querySelector('.ms-icon')).toHaveAttribute('aria-hidden', 'true')
  })

  it('un error se compone con título, texto y acciones, y se anuncia como alerta', () => {
    render(
      <Callout tone="bad">
        <Callout.Title>No se pudo guardar</Callout.Title>
        Revisá la conexión.
        <Callout.Actions><Button size="sm">Reintentar</Button></Callout.Actions>
      </Callout>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo guardarRevisá la conexión.Reintentar')
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()
  })

  it('un aviso que no es error no interrumpe: va como status', () => {
    render(<Callout tone="ok"><Callout.Title>Listo</Callout.Title></Callout>)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('con tono trae el glifo del tono', () => {
    const { container } = render(<Callout tone="warn"><Callout.Title>Vence mañana</Callout.Title></Callout>)
    expect(container.querySelector('.ms-icon')).toBeInTheDocument()
  })

  it('se puede descartar', async () => {
    const onDismiss = vi.fn()
    render(<Callout tone="info" onDismiss={onDismiss}><Callout.Title>Hola</Callout.Title></Callout>)
    await userEvent.click(screen.getByRole('button', { name: 'Descartar' }))
    expect(onDismiss).toHaveBeenCalled()
  })
})
