import s from './toolbar.module.css'
import { useState } from 'react'
import { Toolbar } from '@humans/ui/blocks/editor/toolbar'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function ToolbarStory() {
  const [format, setFormat] = useState({ bold: true, italic: false, underline: false })
  const toggle = (k: keyof typeof format) => setFormat(f => ({ ...f, [k]: !f[k] }))

  return (
    <Page
      title="Toolbar"
      kind="Editor"
      imports="import { Toolbar } from '@humans/ui/blocks/editor/toolbar'"
      lead="Agrupa acciones de edición con navegación por teclado."
    >
      <Hero>
        <Toolbar label="Formato del texto">
          <Toolbar.Button icon="format_bold" label="Negrita" pressed={format.bold} onPressedChange={() => toggle('bold')} />
          <Toolbar.Button icon="format_italic" label="Cursiva" pressed={format.italic} onPressedChange={() => toggle('italic')} />
          <Toolbar.Separator />
          <Toolbar.Button icon="link" label="Enlace" />
        </Toolbar>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Barra" required>`Toolbar`: el contenedor con su `label`, una sola parada de tabulación.</Anatomy.Part>
        <Anatomy.Part name="Botón" required>`Toolbar.Button`: un glifo con su `label`. Con `pressed` es un interruptor; sin él, una acción.</Anatomy.Part>
        <Anatomy.Part name="Separador">`Toolbar.Separator`: agrupa los botones que van juntos.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="Completo" note="La barra de formato del editor de consignas. Borrar el bloque va apagado mientras no haya un bloque elegido." className={s.sunken} code={`<Toolbar label="Formato del texto">
  <Toolbar.Button icon="format_bold" label="Negrita" pressed={format.bold} onPressedChange={() => toggle('bold')} />
  <Toolbar.Button icon="format_italic" label="Cursiva" pressed={format.italic} onPressedChange={() => toggle('italic')} />
  <Toolbar.Button icon="format_underlined" label="Subrayado" pressed={format.underline} onPressedChange={() => toggle('underline')} />
  <Toolbar.Separator />
  <Toolbar.Button icon="format_h1" label="Título" onClick={setHeading} />
  <Toolbar.Button icon="format_h2" label="Subtítulo" onClick={setSubheading} />
  <Toolbar.Button icon="format_quote" label="Cita" onClick={setQuote} />
  <Toolbar.Separator />
  <Toolbar.Button icon="link" label="Enlace" onClick={addLink} />
  <Toolbar.Button icon="delete" label="Borrar el bloque" disabled />
</Toolbar>`}>
          <Toolbar label="Formato del texto">
            <Toolbar.Button icon="format_bold" label="Negrita" pressed={format.bold} onPressedChange={() => toggle('bold')} />
            <Toolbar.Button icon="format_italic" label="Cursiva" pressed={format.italic} onPressedChange={() => toggle('italic')} />
            <Toolbar.Button icon="format_underlined" label="Subrayado" pressed={format.underline} onPressedChange={() => toggle('underline')} />
            <Toolbar.Separator />
            <Toolbar.Button icon="format_h1" label="Título" />
            <Toolbar.Button icon="format_h2" label="Subtítulo" />
            <Toolbar.Button icon="format_quote" label="Cita" />
            <Toolbar.Separator />
            <Toolbar.Button icon="link" label="Enlace" />
            <Toolbar.Button icon="delete" label="Borrar el bloque" disabled />
          </Toolbar>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Toolbar" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`label` dice qué controla: dos barras sin nombre en una pantalla se leen igual.</Practices.Do>
          <Practices.Do>Con `pressed` el botón es un interruptor; sin él, una acción que pasa y no queda.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un `toolbar` de verdad: se entra con una sola tabulación y adentro se recorre con las flechas. Con diez botones, llegar a lo de al lado costaría diez tabulaciones.</A11y.Item>
          <A11y.Item>Home y End van a los extremos, y las flechas dan la vuelta salteando lo apagado.</A11y.Item>
          <A11y.Item>Cada botón tiene nombre: adentro solo hay un glifo, y un glifo no se lee.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
