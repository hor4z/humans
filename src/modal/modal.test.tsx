import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './modal'

function SettingsDialog({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <Modal open onOpenChange={onOpenChange ?? (() => {})}>
      <Modal.Header><Modal.Title>Ajustes</Modal.Title></Modal.Header>
      <Modal.Body><p>El cuerpo</p></Modal.Body>
      <Modal.Footer><button type="button">Guardar</button></Modal.Footer>
    </Modal>
  )
}

describe('Modal', () => {
  it('atrapa el foco, cierra con Escape y no cierra con click adentro', async () => {
    const onOpenChange = vi.fn()
    render(<SettingsDialog onOpenChange={onOpenChange} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await userEvent.click(screen.getByText('El cuerpo'))
    expect(onOpenChange).not.toHaveBeenCalled()

    await userEvent.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalled()
  })

  it('Tab y Shift+Tab desde el contenedor mantienen el foco adentro', async () => {
    const visible = vi.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(document.body)
    try {
      render(<SettingsDialog />)
      const panel = screen.getByRole('dialog')
      panel.focus()
      await userEvent.tab({ shift: true })
      expect(screen.getByRole('button', { name: 'Guardar' })).toHaveFocus()
      await userEvent.tab()
      expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus()
      panel.focus()
      await userEvent.tab()
      expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus()
    } finally {
      visible.mockRestore()
    }
  })

  it('restaura el scroll y el padding originales al cerrar', () => {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '8px'
    const { unmount } = render(<SettingsDialog />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('auto')
    expect(document.body.style.paddingRight).toBe('8px')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  it('el nombre sale del título, no de una prop aparte', () => {
    render(<SettingsDialog />)
    const box = screen.getByRole('dialog')
    const id = box.getAttribute('aria-labelledby')
    expect(id).toBeTruthy()
    expect(document.getElementById(id!)).toHaveTextContent('Ajustes')
    expect(screen.getByRole('dialog', { name: 'Ajustes' })).toBeInTheDocument()
  })

  it('la X del header cierra', async () => {
    const onOpenChange = vi.fn()
    render(<SettingsDialog onOpenChange={onOpenChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onOpenChange).toHaveBeenCalled()
  })

  it('sin título, el nombre lo pone label', () => {
    render(
      <Modal open onOpenChange={() => {}} label="Ajustes">
        <Modal.Body>Sin cabecera</Modal.Body>
      </Modal>,
    )
    expect(screen.getByRole('dialog', { name: 'Ajustes' })).toBeInTheDocument()
  })

  it('cerrado no monta nada', () => {
    render(
      <Modal open={false} onOpenChange={() => {}} label="Ajustes">
        <Modal.Body>Ajustes</Modal.Body>
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
