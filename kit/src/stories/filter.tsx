import s from './filter.module.css'
import { useState } from 'react'
import { Filter } from '@milo/ui/filter'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

const columns = [
  { value: 'actividad', label: 'Actividad', locked: true },
  { value: 'estudiantes', label: 'Estudiantes' },
  { value: 'docente', label: 'Docente' },
  { value: 'estado', label: 'Estado' },
  { value: 'entregas', label: 'Entregas' },
]

const states = [
  { value: 'Abierta', count: 4 },
  { value: 'Corregida', count: 3 },
  { value: 'Cerrada', count: 1 },
]

export function FilterStory() {
  const [picked, setPicked] = useState<string[]>([])
  const [visible, setVisible] = useState(['actividad', 'estudiantes', 'estado'])

  return (
    <Page
      title="Filter"
      kind="Datos"
      imports="import { Filter } from '@milo/ui/filter'"
      lead="Elegir varias opciones de una lista. Con un rótulo filtra filas; con un glifo elige qué columnas se ven. Es una sola pieza: el panel y la lista de opciones son los mismos."
    >
      <Hero>
        <Filter label="Estado" options={states} value={picked} onValueChange={setPicked} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Botón" required>Dice qué filtra y cuántas opciones hay elegidas.</Anatomy.Part>
        <Anatomy.Part name="Opción">Un `checkbox` por valor, con su cuenta o su persona.</Anatomy.Part>
        <Anatomy.Part name="Opción bloqueada">La que va `locked`: se ve tildada y no se puede sacar.</Anatomy.Part>
      </Anatomy>

      <Section title="Cómo se usa">
        <Demo label="Filtrar filas: el botón cuenta lo elegido" code={`const [picked, setPicked] = useState<string[]>([])

<Filter
  label="Estado"
  options={[
    { value: 'Abierta', count: 4 },
    { value: 'Corregida', count: 3 },
    { value: 'Cerrada', count: 1 },
  ]}
  value={picked}
  onValueChange={setPicked}
/>`}>
          <Filter label="Estado" options={states} value={picked} onValueChange={setPicked} />
        </Demo>
        <Demo label="Elegir columnas: con `icon` el botón es solo un glifo" code={`const [visible, setVisible] = useState(['actividad', 'estudiantes', 'estado'])

<Filter
  icon="view_column"
  label="Columnas"
  options={[
    { value: 'actividad', label: 'Actividad', locked: true },
    { value: 'estudiantes', label: 'Estudiantes' },
    { value: 'docente', label: 'Docente' },
    { value: 'estado', label: 'Estado' },
    { value: 'entregas', label: 'Entregas' },
  ]}
  value={visible}
  onValueChange={setVisible}
/>`}>
          <Filter icon="view_column" label="Columnas" options={columns} value={visible} onValueChange={setVisible} />
          <span className={s.pickedList}>{visible.join(' · ')}</span>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Filter" />
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
          <A11y.Item>La opción bloqueada se anuncia como deshabilitada y sigue leyéndose: se entiende por qué no se puede sacar.</A11y.Item>
          <A11y.Item>El panel se cierra con Escape y el foco vuelve al botón que lo abrió.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
