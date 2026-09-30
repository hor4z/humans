import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ConfirmDialog } from './confirm-dialog'

function DeleteDialog({ onOpenChange, onConfirm, tone = 'bad' }: {
  onOpenChange?: (open: boolean) => void
  onConfirm?: () => void
  tone?: 'neutral' | 'bad'
}) {
  return (
    <ConfirmDialog open onOpenChange={onOpenChange ?? (() => {})} onConfirm={onConfirm ?? (() => {})} tone={tone}>
      <ConfirmDialog.Header>
        <ConfirmDialog.Title>¿Borrar "Fracciones equivalentes"?</ConfirmDialog.Title>
      </ConfirmDialog.Header>
      <ConfirmDialog.Body>Se borran también las 18 entregas.</ConfirmDialog.Body>
      <ConfirmDialog.Footer>
        <ConfirmDialog.Cancel />
        <ConfirmDialog.Confirm>{tone === 'bad' ? 'Borrar' : 'Publicar'}</ConfirmDialog.Confirm>
      </ConfirmDialog.Footer>
    </ConfirmDialog>
  )
}

describe('ConfirmDialog', () => {
  it('pregunta, confirma y cancela', async () => {
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()
    render(<DeleteDialog onOpenChange={onOpenChange} onConfirm={onConfirm} />)
    expect(screen.getByRole('alertdialog', { name: /Fracciones equivalentes/ })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Borrar' }))
    expect(onConfirm).toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalled()
  })

  it('el nombre sale del título, no de una prop aparte', () => {
    render(<DeleteDialog />)
    const box = screen.getByRole('alertdialog')
    const id = box.getAttribute('aria-labelledby')
    expect(id).toBeTruthy()
    expect(document.getElementById(id!)).toHaveTextContent('Fracciones equivalentes')
  })

  it('Escape cancela', async () => {
    const onOpenChange = vi.fn()
    render(<DeleteDialog onOpenChange={onOpenChange} />)
    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalled()
  })
})

describe('ConfirmDialog destructivo', () => {
  it('arranca con el foco en la salida segura', async () => {
    render(<DeleteDialog />)
    await waitFor(() => expect(document.activeElement).toHaveTextContent('Cancelar'))
  })

  it('sin peligro arranca en el que confirma', async () => {
    render(<DeleteDialog tone="neutral" />)
    await waitFor(() => expect(document.activeElement).toHaveTextContent('Publicar'))
  })
})
