import s from './toolbar.module.css'
import { useState } from 'react'
import { Toolbar } from '@milo/ui/blocks/editor/toolbar'
import { A11y, Demo, Page, Practices, Props, Section } from '../kit'

export function ToolbarStory() {
  const [format, setFormat] = useState({ bold: true, italic: false, underline: false })
  const toggle = (k: keyof typeof format) => setFormat(f => ({ ...f, [k]: !f[k] }))

  return (
    <Page
      title="Toolbar"
      kind="Editor"
      imports="import { Toolbar } from '@milo/ui/blocks/editor/toolbar'"
      lead="La barra que aparece sobre el texto seleccionado. Una sola parada de tabulación, y adentro se mueve con flechas."
    >
      <Section title="La pieza">
        <Demo className={s.sunken} code={`<Toolbar label="Formato del texto">
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

      <Section
        title="Interruptor o acción"
        note="La diferencia se anuncia: 'negrita, activado' contra 'duplicar, botón'."
      >
        <Demo className={s.sunken} code={`<Toolbar label="Dos clases de botón">
  <Toolbar.Button icon="format_bold" label="Negrita" pressed={format.bold} onPressedChange={() => toggle('bold')} />
  <Toolbar.Button icon="content_copy" label="Duplicar" onClick={duplicate} />
</Toolbar>`}>
          <Toolbar label="Dos clases de botón">
            <Toolbar.Button icon="format_bold" label="Negrita" pressed={format.bold} onPressedChange={() => toggle('bold')} />
            <Toolbar.Button icon="content_copy" label="Duplicar" />
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
