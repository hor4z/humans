import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Filter } from './filter'

describe('Filter', () => {
  it('agrega una condición, permite editarla y quitarla', async () => {
    function Demo() {
      const [value, setValue] = useState<Record<string, string[]>>({})
      return <Filter.Builder fields={[{ key: 'status', label: 'Estado', options: [{ value: 'Abierta' }, { value: 'Corregida' }] }, { key: 'subject', label: 'Materia', options: [{ value: 'Matemática' }] }]} value={value} onValueChange={setValue} />
    }
    render(<Demo />)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar filtro' }))
    await userEvent.click(screen.getByRole('button', { name: /Estado/ }))
    await userEvent.click(screen.getByRole('checkbox', { name: 'Abierta' }))
    await userEvent.click(screen.getByRole('button', { name: 'Listo' }))
    expect(screen.getByRole('button', { name: /Estado: Abierta/ })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Estado: Abierta/ }))
    await userEvent.click(screen.getByRole('checkbox', { name: 'Corregida' }))
    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: /Estado: Abierta \+1/ })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Quitar filtro Estado' }))
    expect(screen.queryByRole('button', { name: /Estado: Abierta/ })).not.toBeInTheDocument()
  })

  it('elige varias y las cuenta en el botón', async () => {
    const Demo = () => {
      const [v, setV] = useState<string[]>([])
      return <Filter label="Estado" value={v} onValueChange={setV} options={[{ value: 'Abierta', count: 3 }, { value: 'Cerrada', count: 1 }]} />
    }
    render(<Demo />)
    await userEvent.click(screen.getByRole('button', { name: /Estado/ }))
    await userEvent.click(screen.getByRole('checkbox', { name: /Abierta/ }))
    expect(screen.getByRole('button', { name: /Estado · 1/ })).toBeInTheDocument()
  })

  it('cada opción se nombra para un lector', async () => {
    render(<Filter label="Estado" value={[]} onValueChange={() => {}} options={[{ value: 'Abierta', count: 3 }]} />)
    await userEvent.click(screen.getByRole('button', { name: /Estado/ }))
    expect(screen.getByRole('checkbox', { name: /Abierta/ })).toBeInTheDocument()
  })

  it('cada opción se anuncia una vez, con su número adentro del nombre', async () => {
    render(
      <Filter
        label="Estado"
        options={[{ value: 'Abierta', count: 4 }, { value: 'Corregida', count: 3 }]}
        value={[]}
        onValueChange={() => {}}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Estado' }))
    expect(screen.getByRole('checkbox', { name: 'Abierta, 4' })).toBeInTheDocument()
    expect(screen.queryAllByText('Abierta')).toHaveLength(1)
    expect(screen.getByText('Abierta')).toHaveAttribute('aria-hidden', 'true')
  })

  it('con icon elige columnas y no deja apagar la bloqueada', async () => {
    const Demo = () => {
      const [v, setV] = useState(['a', 'b'])
      return (
        <Filter
          icon="view_column"
          label="Columnas"
          value={v}
          onValueChange={setV}
          options={[{ value: 'a', label: 'Actividad', locked: true }, { value: 'b', label: 'Estado' }]}
        />
      )
    }
    render(<Demo />)
    await userEvent.click(screen.getByRole('button', { name: 'Columnas' }))
    expect(screen.getByRole('checkbox', { name: /Actividad/ })).toBeDisabled()
    await userEvent.click(screen.getByRole('checkbox', { name: /Estado/ }))
    expect(screen.getByRole('checkbox', { name: /Estado/ })).toHaveAttribute('aria-checked', 'false')
  })
})
