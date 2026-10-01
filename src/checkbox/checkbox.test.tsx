import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('alterna con click y con espacio, y se nombra', async () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onCheckedChange={onChange} label="Acepto" />)
    const cb = screen.getByRole('checkbox', { name: 'Acepto' })
    await userEvent.click(cb)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('expone aria-checked', () => {
    render(<Checkbox checked onCheckedChange={() => {}} label="x" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('con texto, tocar el texto la marca y el texto es su nombre', async () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onCheckedChange={onChange}>Entregó a tiempo</Checkbox>)
    await userEvent.click(screen.getByText('Entregó a tiempo'))
    expect(onChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole('checkbox', { name: 'Entregó a tiempo' })).toBeInTheDocument()
  })
})
