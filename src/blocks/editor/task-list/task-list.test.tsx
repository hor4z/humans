import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TaskList } from './task-list'

const steps = [
  { id: 'leer', label: 'Leer la consigna', done: true },
  { id: 'resolver', label: 'Resolver los tres ejercicios' },
  { id: 'revisar', label: 'Revisar antes de entregar' },
]

describe('TaskList', () => {
  it('es una lista con nombre: "lista, tres elementos" no dice de qué', () => {
    render(<TaskList value={steps} onValueChange={() => {}} label="Pasos de la entrega" />)
    expect(screen.getByRole('list', { name: 'Pasos de la entrega' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('cada casilla se nombra con su propio texto', () => {
    render(<TaskList value={steps} onValueChange={() => {}} label="Pasos" />)
    expect(screen.getByRole('checkbox', { name: 'Resolver los tres ejercicios' })).toBeInTheDocument()
  })

  it('marcar devuelve la lista entera, con la tarea hecha', async () => {
    const onValueChange = vi.fn()
    render(<TaskList value={steps} onValueChange={onValueChange} label="Pasos" />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'Revisar antes de entregar' }))
    expect(onValueChange).toHaveBeenCalledWith(steps.map(s => (s.id === 'revisar' ? { ...s, done: true } : s)))
  })

  it('desmarcar también, y devuelve false', async () => {
    const onValueChange = vi.fn()
    render(<TaskList value={steps} onValueChange={onValueChange} label="Pasos" />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'Leer la consigna' }))
    expect(onValueChange).toHaveBeenCalledWith(steps.map(s => (s.id === 'leer' ? { ...s, done: false } : s)))
  })

  it('el texto también es zona de click, que es la mitad del área útil', async () => {
    const onValueChange = vi.fn()
    render(<TaskList value={steps} onValueChange={onValueChange} label="Pasos" />)
    await userEvent.click(screen.getByText('Resolver los tres ejercicios'))
    expect(onValueChange).toHaveBeenCalledWith(steps.map(s => (s.id === 'resolver' ? { ...s, done: true } : s)))
  })

  it('sin onValueChange se lee y no se toca', () => {
    render(<TaskList value={steps} label="Pasos" />)
    expect(screen.getByRole('checkbox', { name: 'Leer la consigna' })).toBeDisabled()
  })

  it('apagada se lee y no se toca', async () => {
    const onValueChange = vi.fn()
    render(<TaskList value={steps} onValueChange={onValueChange} label="Pasos" readOnly />)
    expect(screen.getByRole('checkbox', { name: 'Leer la consigna' })).toBeDisabled()
    await userEvent.click(screen.getByText('Resolver los tres ejercicios'))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
