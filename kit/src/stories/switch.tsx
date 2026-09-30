import cls from './switch.module.css'
import { useState } from 'react'
import { Row } from '@milo/ui/row'
import { Switch } from '@milo/ui/switch'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function SwitchStory() {
  const [on, setOn] = useState(true)
  const [off, setOff] = useState(false)

  return (
    <Page
      title="Switch"
      kind="Formularios"
      imports="import { Switch } from '@milo/ui/switch'"
      lead="Activa o desactiva una opción que se aplica de inmediato."
    >
      <Hero>
        <Switch checked={on} onCheckedChange={setOn} label="Sugerencias" />
        <Switch checked={off} onCheckedChange={setOff} label="Directorio" />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Pista" required>La píldora de 40×24. Prendida va en el azul de marca, el mismo que el checkbox marcado.</Anatomy.Part>
        <Anatomy.Part name="Pulgar" required>El círculo de 18 que corre adentro de la pista y viaja 18 exactos.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta">Un switch suelto no dice qué prende: la pone `label` o la `Row` o el `Field` de alrededor.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo
          fill
          label="En una fila, y deshabilitado"
          code={`<Row>
  <Row.Label>Avisos por mail</Row.Label>
  <Row.Hint>Cuando llega una entrega nueva</Row.Hint>
  <Switch checked={on} onCheckedChange={setOn} label="Avisos por mail" />
</Row>
<Row>
  <Row.Label>Entregas fuera de fecha</Row.Label>
  <Row.Hint>Después del cierre</Row.Hint>
  <Switch checked={off} onCheckedChange={setOff} label="Entregas fuera de fecha" />
</Row>
<Row>
  <Row.Label>Copia al director</Row.Label>
  <Switch checked onCheckedChange={toggle} disabled label="Copia al director" />
</Row>`}
        >
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
            <Row>
              <Row.Label>Copia al director</Row.Label>
              <Switch checked onCheckedChange={() => {}} disabled label="Copia al director" />
            </Row>
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Switch" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>En un panel va dentro de una `Row`, que pone la etiqueta a la izquierda y el control contra el borde derecho; en un formulario va dentro de un `Field`.</Practices.Do>
          <Practices.Do>Va para lo que se aplica al momento, sin botón de guardar.</Practices.Do>
          <Practices.Dont>Si el cambio necesita confirmarse, va una casilla adentro de un formulario.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>`role="switch"` con `aria-checked`: un lector dice "activado" y no "casilla marcada".</A11y.Item>
          <A11y.Item>El `label` lo nombra aunque en pantalla no haya texto al lado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
