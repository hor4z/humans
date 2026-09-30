import { useState } from 'react'
import { DatePicker } from '@milo/ui/date-picker'
import { Field } from '@milo/ui/field'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section, Stack } from '../kit'

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function DatePickerStory() {
  const [due, setDue] = useState('')
  const [from, setFrom] = useState(today())
  const [loose, setLoose] = useState('2026-03-09')
  const [bounded, setBounded] = useState('')

  return (
    <Page
      title="DatePicker"
      kind="Formularios"
      imports="import { DatePicker } from '@milo/ui/date-picker'"
      lead="Un campo que abre un mes para elegir un día. El valor es el texto `AAAA-MM-DD` y no un `Date`: una fecha de entrega no tiene hora ni zona, y un `Date` arrastra las dos."
    >
      <Hero>
        <DatePicker value={loose} onValueChange={setLoose} label="Fecha del examen" width={260} />
        <DatePicker value={bounded} onValueChange={setBounded} min={today()} label="Nueva entrega" placeholder="No se puede antes de hoy" width={260} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Campo" required>Muestra la fecha en palabras, o el `placeholder` mientras no hay una. Al tocarlo abre el mes.</Anatomy.Part>
        <Anatomy.Part name="Icono">El calendario al final del campo: dice que se abre y no que se escribe.</Anatomy.Part>
        <Anatomy.Part name="Cabecera del mes">El mes y el año, con las flechas para cambiar de mes.</Anatomy.Part>
        <Anatomy.Part name="Días">La grilla del mes, con la semana desde el lunes. Hoy lleva un punto, lo elegido va en relleno y lo que queda afuera de `min` y `max` se apaga.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="En un campo" code={`<Field.Set>
  <Field.Legend>Cuándo</Field.Legend>
  <Field>
    <Field.Label>Abre</Field.Label>
    <Field.Hint>Desde cuándo se puede entregar</Field.Hint>
    <DatePicker value={from} onValueChange={setFrom} />
  </Field>
  <Field>
    <Field.Label>Vence</Field.Label>
    <Field.Hint>Después de esta fecha no entra nada</Field.Hint>
    <DatePicker value={due} onValueChange={setDue} min={from} placeholder="Sin fecha de cierre" />
  </Field>
</Field.Set>`}>
          <Stack gap="xl" width="md">
            <Field.Set>
              <Field.Legend>Cuándo</Field.Legend>
              <Field>
                <Field.Label>Abre</Field.Label>
                <Field.Hint>Desde cuándo se puede entregar</Field.Hint>
                <DatePicker value={from} onValueChange={setFrom} />
              </Field>
              <Field>
                <Field.Label>Vence</Field.Label>
                <Field.Hint>Después de esta fecha no entra nada</Field.Hint>
                <DatePicker value={due} onValueChange={setDue} min={from} placeholder="Sin fecha de cierre" />
              </Field>
            </Field.Set>
          </Stack>
        </Demo>
        <Demo label="Suelto y acotado" code={`<DatePicker value={loose} onValueChange={setLoose} label="Fecha del examen" width={260} />
<DatePicker
  value={bounded}
  onValueChange={setBounded}
  min={today()}
  label="Nueva entrega"
  placeholder="No se puede antes de hoy"
  width={260}
/>`}>
          <DatePicker value={loose} onValueChange={setLoose} label="Fecha del examen" width={260} />
          <DatePicker value={bounded} onValueChange={setBounded} min={today()} label="Nueva entrega" placeholder="No se puede antes de hoy" width={260} />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="DatePicker" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`min` y `max` acotan, y apagan lo que queda afuera en vez de esconderlo: un día apagado dice que existe y que no se puede elegir. Para un vencimiento, `min` es hoy.</Practices.Do>
          <Practices.Do>Sin `Field` alrededor, nombralo con `label`. El campo dice la fecha en palabras porque 03/09/2026 quiere decir dos cosas distintas según de dónde sea quien lo lee.</Practices.Do>
          <Practices.Do>La semana empieza el lunes y no sale de la configuración del navegador: una grilla que a veces arranca el domingo se lee mal justo cuando hay que contar días.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Cada día se nombra entero ("lunes, 9 de marzo de 2026") en vez de leerse como un número suelto sin contexto.</A11y.Item>
          <A11y.Item>El mes entero se recorre con el teclado: flechas de a un día y de a una semana, Re Pág y Av Pág de a un mes, con Shift de a un año, Inicio y Fin a los extremos de la semana.</A11y.Item>
          <A11y.Item>Una sola parada de tabulación en la grilla (el día del cursor) en vez de treinta para llegar al final del mes. Escape cierra y el foco vuelve al campo.</A11y.Item>
          <A11y.Item>El mes se anuncia al cambiar: con el teclado lo único que cambia es el título, y sin `aria-live` el salto es mudo.</A11y.Item>
          <A11y.Item>Hoy lleva un punto además del color, y lo elegido va en relleno: dos señales distintas para dos cosas distintas.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
