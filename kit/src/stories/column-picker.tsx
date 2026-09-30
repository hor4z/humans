import s from './column-picker.module.css'
import { useState } from 'react'
import { ColumnPicker } from '@milo/ui/column-picker'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

const columns = [
  { id: 'actividad', label: 'Actividad', locked: true },
  { id: 'estudiantes', label: 'Estudiantes' },
  { id: 'docente', label: 'Docente' },
  { id: 'estado', label: 'Estado' },
  { id: 'entregas', label: 'Entregas' },
]

export function ColumnPickerStory() {
  const [value, setValue] = useState(['actividad', 'estudiantes', 'estado'])

  return (
    <Page
      title="ColumnPicker"
      kind="Datos"
      imports="import { ColumnPicker } from '@milo/ui/column-picker'"
      lead="Qué columnas de una tabla se ven. Es una pieza propia y no un cajón de `Filter`: una pieza que no se puede encontrar es una pieza que alguien vuelve a escribir a mano."
    >
      <Hero>
        <ColumnPicker columns={columns} value={value} onValueChange={setValue} />
        <span className={s.pickedList}>{value.join(' · ')}</span>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Botón" required>Abre el panel de columnas.</Anatomy.Part>
        <Anatomy.Part name="Opción">Un `checkbox` por columna, con su etiqueta.</Anatomy.Part>
        <Anatomy.Part name="Columna bloqueada">La que va `locked`: se ve tildada y no se puede sacar.</Anatomy.Part>
      </Anatomy>

      <Section title="Cómo se usa">
        <Demo label="Tildá y destildá: abajo queda lo elegido" code={`const [value, setValue] = useState(['actividad', 'estudiantes', 'estado'])

<ColumnPicker
  columns={[
    { id: 'actividad', label: 'Actividad', locked: true },
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'docente', label: 'Docente' },
    { id: 'estado', label: 'Estado' },
    { id: 'entregas', label: 'Entregas' },
  ]}
  value={value}
  onValueChange={setValue}
/>
<span>{value.join(' · ')}</span>`}>
          <ColumnPicker columns={columns} value={value} onValueChange={setValue} />
          <span className={s.pickedList}>{value.join(' · ')}</span>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="ColumnPicker" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>La primera columna va `locked`: una tabla sin la columna que nombra cada fila deja de ser una tabla.</Practices.Do>
          <Practices.Dont>No escondas lo apagado: una opción que desaparece obliga a aprender el menú de nuevo.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Cada opción es un `checkbox` de verdad, así que se recorre y se marca con el teclado sin nada agregado.</A11y.Item>
          <A11y.Item>La columna bloqueada se anuncia como deshabilitada y sigue leyéndose: se entiende por qué no se puede sacar.</A11y.Item>
          <A11y.Item>El panel se cierra con Escape y el foco vuelve al botón que lo abrió.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
