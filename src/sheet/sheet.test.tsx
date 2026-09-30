import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../button/button'
import { Sheet } from './sheet'

describe('Sheet', () => {
  it('se nombra con el título que se ve, no con una prop aparte', async () => {
    const onClose = vi.fn()
    render(
      <Sheet open onOpenChange={onClose}>
        <Sheet.Header><Sheet.Title>Nueva actividad</Sheet.Title></Sheet.Header>
        <Sheet.Body>contenido</Sheet.Body>
        <Sheet.Footer><Button>Guardar</Button></Sheet.Footer>
      </Sheet>,
    )
    expect(screen.getByRole('dialog', { name: 'Nueva actividad' })).toBeInTheDocument()
    expect(screen.getByText('contenido')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('sin título a la vista, el nombre sale de label', () => {
    render(<Sheet open onOpenChange={() => {}} label="Filtros"><Sheet.Body>x</Sheet.Body></Sheet>)
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeInTheDocument()
  })

  it('cerrado no monta nada', async () => {
    render(<Sheet open={false} onOpenChange={() => {}}><p>hola</p></Sheet>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('al cerrar, sale con su animación y recién después se desmonta', async () => {
    let finish = () => {}
    const finished = new Promise<void>(r => { finish = r })
    Object.defineProperty(HTMLElement.prototype, 'getAnimations', { configurable: true, value: () => [{ finished }] })
    const view = (open: boolean) => <Sheet open={open} onOpenChange={() => {}} label="Filtros"><p>hola</p></Sheet>
    const { rerender } = render(view(true))
    rerender(view(false))
    expect(screen.getByText('hola').closest('[data-closing]')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await act(async () => { finish(); await finished })
    expect(screen.queryByText('hola')).not.toBeInTheDocument()
    delete (HTMLElement.prototype as { getAnimations?: unknown }).getAnimations
  })
  it('si la salida se cancela, igual se desmonta', async () => {
    const finished = Promise.reject(new DOMException('cancelada', 'AbortError'))
    finished.catch(() => {})
    Object.defineProperty(HTMLElement.prototype, 'getAnimations', { configurable: true, value: () => [{ finished }] })
    const view = (open: boolean) => <Sheet open={open} onOpenChange={() => {}} label="Filtros"><p>hola</p></Sheet>
    const { rerender } = render(view(true))
    rerender(view(false))
    await act(async () => { await Promise.allSettled([finished]) })
    expect(screen.queryByText('hola')).not.toBeInTheDocument()
    delete (HTMLElement.prototype as { getAnimations?: unknown }).getAnimations
  })
})
