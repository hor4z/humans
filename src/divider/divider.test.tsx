import { render, screen } from '@testing-library/react'
import s from './divider.module.css'
import { describe, expect, it } from 'vitest'
import { Divider } from './divider'

describe('Divider', () => {
  it('se anuncia como separador horizontal', () => {
    render(<Divider />)
    const line = screen.getByRole('separator')
    expect(line).toHaveAttribute('aria-orientation', 'horizontal')
    expect(line).toHaveClass(s.horizontal)
  })

  it('vertical cambia la orientación y el eje que ocupa', () => {
    render(<Divider orientation="vertical" />)
    const line = screen.getByRole('separator')
    expect(line).toHaveAttribute('aria-orientation', 'vertical')
    expect(line).toHaveClass(s.vertical)
  })

  it('con texto, el texto se lee y hay un solo separador', () => {
    render(<Divider>o</Divider>)
    expect(screen.getAllByRole('separator')).toHaveLength(1)
    expect(screen.getByText('o')).toBeVisible()
  })

  it('con el texto al principio, la línea va después', () => {
    render(<Divider align="start">Hoy</Divider>)
    const text = screen.getByText('Hoy')
    expect(text.previousElementSibling).toBeNull()
    expect(screen.getByRole('separator')).toBe(text.nextElementSibling)
  })
})
