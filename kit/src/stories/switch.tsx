import cls from './switch.module.css'
import { useState } from 'react'
import { Row } from '@milo/ui/row'
import { Switch } from '@milo/ui/switch'
import { A11y, Demo, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SwitchStory() {
  const [on, setOn] = useState(true)
  const [off, setOff] = useState(false)

  return (
    <Page
      title="Switch"
      kind="Formularios"
      imports="import { Switch } from '@milo/ui/switch'"
      lead="Pista de 40×22 con 2 de padding, así que el pulgar es de 18 y viaja 18 exactos. La pista prendida va en el azul de marca, el mismo que el checkbox marcado: el naranja señala algo que pasó y no eligió nadie, y un switch prendido es lo contrario, es una decisión de quien lo usa."
    >
      <Section
        title="Estados"
        note="Se lee como una llave de luz y no como una casilla: va para lo que se aplica al momento, sin un botón de guardar que lo confirme."
      >
        <Panel>
          <Variant name="on" code={`<Switch checked={on} onCheckedChange={setOn} label="Sugerencias" />`}><Switch checked={on} onCheckedChange={setOn} label="Sugerencias" /></Variant>
          <Variant name="off" code={`<Switch checked={off} onCheckedChange={setOff} label="Directorio" />`}><Switch checked={off} onCheckedChange={setOff} label="Directorio" /></Variant>
          <Variant name="disabled" code={`<Switch checked onCheckedChange={toggle} disabled label="Fijo" />
<Switch checked={false} onCheckedChange={toggle} disabled label="Fijo" />`}>
            <Switch checked onCheckedChange={() => {}} disabled label="Fijo" />
            <Switch checked={false} onCheckedChange={() => {}} disabled label="Fijo" />
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Con su etiqueta al lado"
        note="Un switch suelto no dice qué prende. En un panel va dentro de una `Row`, que pone la etiqueta a la izquierda y el control contra el borde derecho; en un formulario va dentro de un `Field`."
      >
        <Demo fill code={`<Row>
  <Row.Label>Avisos por mail</Row.Label>
  <Row.Hint>Cuando llega una entrega nueva</Row.Hint>
  <Switch checked={on} onCheckedChange={setOn} label="Avisos por mail" />
</Row>
<Row>
  <Row.Label>Entregas fuera de fecha</Row.Label>
  <Row.Hint>Después del cierre</Row.Hint>
  <Switch checked={off} onCheckedChange={setOff} label="Entregas fuera de fecha" />
</Row>`}>
          <div className={`${cls.rowBox} bg-surface`}>
            <Row>
              <Row.Label>Avisos por mail</Row.Label>
              <Row.Hint>Cuando llega una entrega nueva</Row.Hint>
              <Switch checked={on} onCheckedChange={setOn} label="Avisos por mail" />
            </Row>
            <Row>
              <Row.Label>Entregas fuera de fecha</Row.Label>
              <Row.Hint>Después del cierre</Row.Hint>
              <Switch checked={off} onCheckedChange={setOff} label="Entregas fuera de fecha" />
            </Row>
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Switch" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Va para lo que se aplica al momento, sin botón de guardar.</Practices.Do>
          <Practices.Dont>Si el cambio necesita confirmarse, va una casilla adentro de un formulario.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>role="switch" con aria-checked: un lector dice "activado" y no "casilla marcada".</A11y.Item>
          <A11y.Item>El `label` lo nombra aunque en pantalla no haya texto al lado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
