import { useState } from 'react'
import { Checkbox } from '@milo/ui/checkbox'
import { Field } from '@milo/ui/field'
import { Select } from '@milo/ui/select'
import { Switch } from '@milo/ui/switch'
import { TextField } from '@milo/ui/text-field'
import { Textarea } from '@milo/ui/textarea'
import { A11y, Anatomy, Demo, Frame, Hero, Page, Panel, Practices, Props, Section, Stack } from '../kit'

export function FieldStory() {
  const [overdue, setOverdue] = useState(true)
  const [notify, setNotify] = useState(true)
  const [name, setName] = useState('')
  const [space, setSpace] = useState('Matemática · 4.º A')
  const [touched, setTouched] = useState(false)
  const error = touched && !name.trim() ? 'Poné un nombre para la actividad' : undefined

  return (
    <Page
      title="Field"
      kind="Formularios"
      imports="import { Field } from '@milo/ui/field'"
      lead="Un campo suelto no es un formulario: le falta el nombre, la ayuda y el error, y los tres tienen que estar atados al control para que un lector de pantalla los lea con él. `Field` hace ese trabajo una vez y en un solo lugar."
    >
      <Hero>
        <Stack gap="xl" width="md">
          <Field required>
            <Field.Label>Nombre de la actividad</Field.Label>
            <Field.Hint>Lo ven los estudiantes</Field.Hint>
            <Field.Error>{error}</Field.Error>
            <TextField
              value={name}
              onValueChange={setName}
              onBlur={() => setTouched(true)}
              placeholder="Fracciones equivalentes"
            />
          </Field>
          <Field>
            <Field.Label>Espacio</Field.Label>
            <Select value={space} onValueChange={setSpace} options={['Matemática · 4.º A', 'Lengua · 6.º']} />
          </Field>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Etiqueta" required>`Field.Label`: el nombre del control; tocarla lo enfoca.</Anatomy.Part>
        <Anatomy.Part name="Asterisco">Con `required`, la marca de lo obligatorio, que para el lector se dice con la palabra.</Anatomy.Part>
        <Anatomy.Part name="Ayuda">`Field.Hint`: una línea de apoyo debajo de la etiqueta.</Anatomy.Part>
        <Anatomy.Part name="Error">`Field.Error`: lo que está mal, con su glifo; reemplaza a la ayuda.</Anatomy.Part>
        <Anatomy.Part name="Control" required>El campo del sistema que va adentro, que toma el `id` y la descripción solo.</Anatomy.Part>
        <Anatomy.Part name="Grupo">`Field.Set` con su `Field.Legend`: agrupa los campos que van juntos bajo un título.</Anatomy.Part>
      </Anatomy>

      <Section title="Con cualquier control y en grupo">
        <Panel>
        <Demo code={`<Field required>
  <Field.Label>Nombre de la actividad</Field.Label>
  <Field.Hint>Lo ven los estudiantes</Field.Hint>
  <Field.Error>{error}</Field.Error>
  <TextField
    value={name}
    onValueChange={setName}
    onBlur={() => setTouched(true)}
    placeholder="Fracciones equivalentes"
  />
</Field>
<Field>
  <Field.Label>Consigna</Field.Label>
  <Field.Hint>Podés pegar el texto que ya tenías</Field.Hint>
  <Textarea rows={3} maxRows={8} placeholder="Escribí la consigna…" />
</Field>`} label="Nombre, ayuda y error: tocá el nombre y salí sin escribir">
          <Stack gap="xl" width="md">
            <Field required>
              <Field.Label>Nombre de la actividad</Field.Label>
              <Field.Hint>Lo ven los estudiantes</Field.Hint>
              <Field.Error>{error}</Field.Error>
              <TextField
                value={name}
                onValueChange={setName}
                onBlur={() => setTouched(true)}
                placeholder="Fracciones equivalentes"
              />
            </Field>
            <Field>
              <Field.Label>Consigna</Field.Label>
              <Field.Hint>Podés pegar el texto que ya tenías</Field.Hint>
              <Textarea rows={3} maxRows={8} placeholder="Escribí la consigna…" />
            </Field>
          </Stack>
        </Demo>
        <Demo label="El select, el switch y la casilla toman el id solos" code={`<Field required>
  <Field.Label>Espacio</Field.Label>
  <Field.Hint>Dónde se publica</Field.Hint>
  <Select value={space} onValueChange={setSpace} options={['Matemática · 4.º A', 'Lengua · 6.º']} />
</Field>
<Field>
  <Field.Label>Entregas fuera de fecha</Field.Label>
  <Field.Hint>Permitir que entreguen después del cierre</Field.Hint>
  <Switch checked={overdue} onCheckedChange={setOverdue} />
</Field>
<Field>
  <Field.Label>Avisar al publicar</Field.Label>
  <Checkbox checked={notify} onCheckedChange={setNotify} />
</Field>`}>
          <Stack gap="xl" width="md">
            <Field required>
              <Field.Label>Espacio</Field.Label>
              <Field.Hint>Dónde se publica</Field.Hint>
              <Select value={space} onValueChange={setSpace} options={['Matemática · 4.º A', 'Lengua · 6.º']} />
            </Field>
            <Field>
              <Field.Label>Entregas fuera de fecha</Field.Label>
              <Field.Hint>Permitir que entreguen después del cierre</Field.Hint>
              <Switch checked={overdue} onCheckedChange={setOverdue} />
            </Field>
            <Field>
              <Field.Label>Avisar al publicar</Field.Label>
              <Checkbox checked={notify} onCheckedChange={setNotify} />
            </Field>
          </Stack>
        </Demo>
        <Demo label="Field.Set: en un formulario de tres campos sobra, en uno de doce lo hace legible" code={`<Field.Set>
  <Field.Legend>Lo básico</Field.Legend>
  <Field required>
    <Field.Label>Nombre</Field.Label>
    <TextField placeholder="Fracciones equivalentes" />
  </Field>
  <Field>
    <Field.Label>Consigna</Field.Label>
    <Field.Hint>Se puede editar después de publicar</Field.Hint>
    <Textarea rows={3} maxRows={8} />
  </Field>
</Field.Set>`}>
          <Frame width="md">
            <Field.Set>
              <Field.Legend>Lo básico</Field.Legend>
              <Field required>
                <Field.Label>Nombre</Field.Label>
                <TextField placeholder="Fracciones equivalentes" />
              </Field>
              <Field>
                <Field.Label>Consigna</Field.Label>
                <Field.Hint>Se puede editar después de publicar</Field.Hint>
                <Textarea rows={3} maxRows={8} />
              </Field>
            </Field.Set>
          </Frame>
        </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Field" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>La etiqueta va en `Field.Label`, el apoyo en `Field.Hint` y lo que está mal en `Field.Error`.</Practices.Do>
          <Practices.Do>El control de adentro toma el id solo: no le pongas `label` también, se nombra dos veces.</Practices.Do>
          <Practices.Do>`Field` es para un formulario que se completa y se envía. Un ajuste que se guarda solo al tocarlo, con la etiqueta a la izquierda y el switch a la derecha, es un [Row](#row).</Practices.Do>
          <Practices.Dont>El error reemplaza al hint, no se apila: dos líneas de apoyo compiten por la misma mirada.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La etiqueta usa htmlFor: tocarla enfoca el campo, que además agranda el blanco del click.</A11y.Item>
          <A11y.Item>La ayuda y el error se anuncian como descripción del control, no como texto suelto al lado.</A11y.Item>
          <A11y.Item>Con error, el campo queda aria-invalid y el mensaje lleva su glifo: no depende del color rojo.</A11y.Item>
          <A11y.Item>Lo obligatorio se dice con texto además del asterisco.</A11y.Item>
          <A11y.Item>Los siete controles del sistema toman el id del Field: ninguno queda con la etiqueta colgando.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
