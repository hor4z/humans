import { useState } from 'react'
import { ToggleButton } from '@milo/ui/toggle-button'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function ToggleButtonStory() {
  const [bold, setBold] = useState(true)
  const [italic, setItalic] = useState(false)
  const [onlyUngraded, setOnlyUngraded] = useState(false)

  return (
    <Page
      title="ToggleButton"
      kind="Acciones"
      imports="import { ToggleButton } from '@milo/ui/toggle-button'"
      lead="Activa o desactiva una opción y mantiene visible su estado."
    >
      <Hero>
        <ToggleButton size="sm" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
        <ToggleButton size="sm" pressed={italic} onPressedChange={setItalic} icon="format_italic" label="Cursiva" />
        <ToggleButton size="sm" pressed={onlyUngraded} onPressedChange={setOnlyUngraded} icon="filter_alt">
          Solo sin corregir
        </ToggleButton>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Icono">`icon`: el glifo, antes del texto o solo.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta">El texto, como hijo. Si falta, `label` pasa a ser el nombre accesible y es obligatorio.</Anatomy.Part>
        <Anatomy.Part name="Estado hundido">Con `pressed` el fondo se llena; el estado lo guarda quien lo usa.</Anatomy.Part>
      </Anatomy>

      <Section title="Cuándo va">
        <Panel>
          <Variant
            name="solo el glifo · con texto"
            note="El glifo solo es el de una barra de formato; con texto, un filtro que se prende y se apaga: hay un estado, no una opción entre varias."
            code={`<ToggleButton size="sm" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
<ToggleButton size="sm" pressed={italic} onPressedChange={setItalic} icon="format_italic" label="Cursiva" />
<ToggleButton size="sm" pressed={onlyUngraded} onPressedChange={setOnlyUngraded} icon="filter_alt">
  Solo sin corregir
</ToggleButton>`}
          >
            <ToggleButton size="sm" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
            <ToggleButton size="sm" pressed={italic} onPressedChange={setItalic} icon="format_italic" label="Cursiva" />
            <ToggleButton size="sm" pressed={onlyUngraded} onPressedChange={setOnlyUngraded} icon="filter_alt">
              Solo sin corregir
            </ToggleButton>
          </Variant>
          <Variant
            name="sm · 36 · md · 40 · lg · 44 · apagado"
            note="Los tres tamaños del `Button`: `sm` en una barra, `md` suelto, `lg` donde se toca con el dedo. Apagado no responde y se ve que no responde."
            code={`<ToggleButton size="sm" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
<ToggleButton size="md" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
<ToggleButton size="lg" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
<ToggleButton size="sm" pressed={false} disabled icon="format_bold" label="Negrita" />`}
          >
            <ToggleButton size="sm" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
            <ToggleButton size="md" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
            <ToggleButton size="lg" pressed={bold} onPressedChange={setBold} icon="format_bold" label="Negrita" />
            <ToggleButton size="sm" pressed={false} disabled icon="format_bold" label="Negrita" />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="ToggleButton" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Es controlado: el estado lo guarda quien lo usa, y `onPressedChange` recibe el estado nuevo.</Practices.Do>
          <Practices.Dont>Para prender y apagar una preferencia va `Switch`: se lee como una llave, no como una acción.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Lleva `aria-pressed`, así que un lector anuncia "activado" o "no activado" y no solo el nombre.</A11y.Item>
          <A11y.Item>Cuando adentro solo hay un glifo, `label` es obligatorio: sin eso el botón no dice nada.</A11y.Item>
          <A11y.Item>Con texto adentro el nombre sale del texto, así que `label` no lo pisa.</A11y.Item>
          <A11y.Item>Es `type="button"`: adentro de un form no lo manda.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
