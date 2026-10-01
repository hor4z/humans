import { useState } from 'react'
import { Segmented } from '@humans/ui/segmented'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function SegmentedStory() {
  const [filter, setFilter] = useState<'todas' | 'abiertas'>('todas')
  const [view, setView] = useState<'grilla' | 'lista'>('grilla')
  const [range, setRange] = useState<'semana' | 'mes'>('semana')
  const [rangeMd, setRangeMd] = useState<'semana' | 'mes'>('semana')
  const [compactRange, setCompactRange] = useState<'semana' | 'mes'>('semana')
  const [inbox, setInbox] = useState<'todas' | 'nuevas'>('todas')
  const [term, setTerm] = useState<'primero' | 'segundo'>('primero')

  return (
    <Page
      title="Segmented"
      kind="Formularios"
      imports="import { Segmented } from '@humans/ui/segmented'"
      lead="Permite elegir entre pocas opciones relacionadas que conviene mantener visibles."
    >
      <Hero>
        <Segmented label="Filtro" value={filter} onValueChange={setFilter}
          options={[{ value: 'todas', label: 'Todas' }, { value: 'abiertas', label: 'Abiertas' }]} />
        <Segmented label="Vista" value={view} onValueChange={setView}
          options={[{ value: 'grilla', icon: 'grid_view', title: 'Grilla' }, { value: 'lista', icon: 'layers', title: 'Lista' }]} />
        <Segmented size="sm" label="Rango" value={range} onValueChange={setRange}
          options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Pista" required>El fondo gris que agrupa las opciones. Con `compact` no hay pista.</Anatomy.Part>
        <Anatomy.Part name="Opción" required>Cada botón del grupo: texto con `label`, o cuadrada con solo el icono.</Anatomy.Part>
        <Anatomy.Part name="Elegida">La opción elegida sube con relieve sobre la pista.</Anatomy.Part>
        <Anatomy.Part name="Icono">El glifo de una opción, solo o junto al texto. Sin texto, `title` es su nombre.</Anatomy.Part>
        <Anatomy.Part name="Punto">Un punto verde al lado de una opción, con `dot`: hay algo nuevo ahí.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo
          label="Tamaños"
          code={`<Segmented
  size="sm"
  label="Rango"
  value={range}
  onValueChange={setRange}
  options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]}
/>
<Segmented
  size="md"
  label="Rango"
  value={rangeMd}
  onValueChange={setRangeMd}
  options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]}
/>`}
        >
          <Segmented size="sm" label="Rango" value={range} onValueChange={setRange}
            options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
          <Segmented size="md" label="Rango" value={rangeMd} onValueChange={setRangeMd}
            options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
        </Demo>
        <Demo
          label="Compacto"
          code={`<Segmented
  compact
  label="Rango"
  value={compactRange}
  onValueChange={setCompactRange}
  options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]}
/>`}
        >
          <Segmented compact label="Rango" value={compactRange} onValueChange={setCompactRange}
            options={[{ value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
        </Demo>
        <Demo
          label="Con un punto"
          code={`<Segmented
  label="Entregas"
  value={inbox}
  onValueChange={setInbox}
  options={[{ value: 'todas', label: 'Todas' }, { value: 'nuevas', label: 'Nuevas', dot: true }]}
/>`}
        >
          <Segmented label="Entregas" value={inbox} onValueChange={setInbox}
            options={[{ value: 'todas', label: 'Todas' }, { value: 'nuevas', label: 'Nuevas', dot: true }]} />
        </Demo>
        <Demo
          label="Apagado"
          code={`<Segmented
  label="Trimestre"
  value={term}
  onValueChange={setTerm}
  disabled
  options={[{ value: 'primero', label: 'Primero' }, { value: 'segundo', label: 'Segundo' }]}
/>`}
        >
          <Segmented label="Trimestre" value={term} onValueChange={setTerm} disabled
            options={[{ value: 'primero', label: 'Primero' }, { value: 'segundo', label: 'Segundo' }]} />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Segmented" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El conjunto apoya en la misma línea que un `Button` del mismo talle, así que un segmentado y un botón en la misma fila no se desalinean.</Practices.Do>
          <Practices.Do>Es el mismo control para el filtro de texto y para el conmutador de vista: dos implementaciones se separan solas y terminan con dos radios, dos alturas y dos ideas de qué es "activo".</Practices.Do>
          <Practices.Dont>Con más de cuatro opciones va un `Select`: el segmentado se estira y deja de leerse.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un radiogroup y no un tablist: elige una de varias, y un tablist sin paneles le promete al lector algo que no existe.</A11y.Item>
          <A11y.Item>Las flechas mueven la elección y dan la vuelta; Tab entra al grupo y sale, porque solo la elegida es tabulable.</A11y.Item>
          <A11y.Item>Con solo iconos, el `title` es el nombre accesible y además la etiqueta del `Tooltip`: no queda la caja del sistema operativo diciendo lo mismo.</A11y.Item>
          <A11y.Item>Adentro de un `Field` o de un `Row`, el grupo se nombra con la etiqueta que ya está escrita.</A11y.Item>
          <A11y.Item>El chip elegido conserva el relieve al enfocarse con el teclado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
