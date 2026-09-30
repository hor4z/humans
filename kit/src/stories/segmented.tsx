import { useState } from 'react'
import { Segmented } from '@milo/ui/segmented'
import { A11y, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SegmentedStory() {
  const [filter, setFilter] = useState<'todas' | 'abiertas'>('todas')
  const [view, setView] = useState<'grilla' | 'lista'>('grilla')
  const [range, setRange] = useState<'semana' | 'mes'>('semana')
  const [compactRange, setCompactRange] = useState<'semana' | 'mes'>('semana')

  return (
    <Page
      title="Segmented"
      kind="Formularios"
      imports="import { Segmented } from '@milo/ui/segmented'"
      lead="Un solo componente para el filtro de texto ('Todas · Abiertas') y para el conmutador de grilla/lista. Que sean la misma pieza y no dos parecidas es el punto: dos implementaciones del mismo control se van separando sola una de la otra con cada cambio, y terminan con dos radios, dos alturas y dos ideas de qué es 'activo'."
    >
      <Section
        title="Tamaños"
        note="El conjunto apoya en la misma línea que un `Button` del mismo talle, así que un segmentado y un botón en la misma fila no se desalinean."
      >
        <Panel>
          <Variant name="md · texto" code={`<Segmented
  label="Filtro"
  value={filter}
  onValueChange={setFilter}
  options={[{ value: 'todas', label: 'Todas' }, { value: 'abiertas', label: 'Abiertas' }]}
/>`}>
            <Segmented label="Filtro" value={filter} onValueChange={setFilter}
              options={[{ value: 'todas', label: 'Todas' }, { value: 'abiertas', label: 'Abiertas' }]} />
          </Variant>
          <Variant name="md · iconos" code={`<Segmented
  label="Vista"
  value={view}
  onValueChange={setView}
  options={[{ value: 'grilla', icon: 'grid_view', title: 'Grilla' }, { value: 'lista', icon: 'layers', title: 'Lista' }]}
/>`}>
            <Segmented label="Vista" value={view} onValueChange={setView}
              options={[{ value: 'grilla', icon: 'grid_view', title: 'Grilla' }, { value: 'lista', icon: 'layers', title: 'Lista' }]} />
          </Variant>
          <Variant name="sm" code={`<Segmented
  size="sm"
  label="Rango"
  value={range}
  onValueChange={setRange}
  options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]}
/>`}>
            <Segmented size="sm" label="Rango" value={range} onValueChange={setRange}
              options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
          </Variant>
          <Variant name="compact · sin pista" code={`<Segmented
  compact
  label="Rango"
  value={compactRange}
  onValueChange={setCompactRange}
  options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes', dot: true }]}
/>`}>
            <Segmented compact label="Rango" value={compactRange} onValueChange={setCompactRange}
              options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes', dot: true }]} />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Segmented" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Es el mismo control para el filtro de texto y para el conmutador de vista: dos implementaciones se separan solas.</Practices.Do>
          <Practices.Dont>Con más de cuatro opciones va un `Select`: el segmentado se estira y deja de leerse.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un radiogroup y no un tablist: elige una de varias, y un tablist sin paneles le promete al lector algo que no existe.</A11y.Item>
          <A11y.Item>Las flechas mueven la elección y dan la vuelta; Tab entra al grupo y sale, porque solo la elegida es tabulable.</A11y.Item>
          <A11y.Item>Con solo iconos, el `title` es el nombre accesible y además la etiqueta del Tooltip: no queda la caja del sistema operativo diciendo lo mismo.</A11y.Item>
          <A11y.Item>Adentro de un Field o de un Row, el grupo se nombra con la etiqueta que ya está escrita.</A11y.Item>
          <A11y.Item>El chip elegido conserva el relieve al enfocarse con el teclado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
