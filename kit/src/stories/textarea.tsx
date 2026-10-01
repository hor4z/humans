import { useState } from 'react'
import { Field } from '@humans/ui/field'
import { Textarea } from '@humans/ui/textarea'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function TextareaStory() {
  const [heroText, setHeroText] = useState('')
  const [withCap, setWithCap] = useState(
    'Este campo crece hasta seis filas y después scrollea.\nBorrá líneas y mirá cómo se achica: el alto vuelve, que es la mitad que se olvida.',
  )
  const [noCap, setNoCap] = useState('Sin maxRows crece todo lo que haga falta.')
  const [mode, setMode] = useState('Crece con lo que escribís.')
  const [feedback, setFeedback] = useState('Resolviste bien las dos primeras. En la tercera te falta justificar por qué la pendiente da la mitad de g.')
  const [near, setNear] = useState('Le puse un techo corto para que veas qué pasa al final.')
  const [belowMin, setBelowMin] = useState('Bien')
  const [prompt, setPrompt] = useState('')

  return (
    <Page
      title="Textarea"
      kind="Formularios"
      imports="import { Textarea } from '@humans/ui/textarea'"
      lead="Recoge texto de varias líneas, con límites y contador opcionales."
    >
      <Hero>
        <Stack gap="md" width="sm">
          <Textarea
            aria-label="Consigna de la actividad"
            value={heroText}
            onValueChange={setHeroText}
            placeholder="Escribí la consigna de la actividad…"
            rows={3}
            maxRows={8}
          />
          <Textarea
            aria-label="Devolución para el estudiante"
            value={feedback}
            onValueChange={setFeedback}
            counter
            maxLength={400}
            rows={3}
          />
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Caja" required>El fondo y el borde, iguales a los de `TextField`, que crecen con lo que escribís.</Anatomy.Part>
        <Anatomy.Part name="Texto" required>El `textarea` de adentro, con su `placeholder` cuando está vacío.</Anatomy.Part>
        <Anatomy.Part name="Contador">Con `counter`: en gris mientras sobra lugar, y una frase cerca del techo o abajo del mínimo.</Anatomy.Part>
        <Anatomy.Part name="Tirador">Con `resize="vertical"`, la esquina que se arrastra para cambiar el alto.</Anatomy.Part>
      </Anatomy>

      <Section title="Alto, cuenta y estados">
        <Panel>
          <Variant
            name="crece con lo que escribís"
            note="Un alto fijo queda corto para escribir o largo y vacío. Escribí y borrá en los dos: crecer es la mitad fácil, lo que se olvida es volver."
            code={`<Textarea
  aria-label="Consigna, con techo de seis filas"
  value={withCap}
  onValueChange={setWithCap}
  rows={3}
  maxRows={6}
/>
<Textarea
  aria-label="Consigna, sin techo"
  value={noCap}
  onValueChange={setNoCap}
  rows={2}
/>`}
          >
            <Stack gap="md" width="sm">
              <Textarea
                aria-label="Consigna, con techo de seis filas"
                value={withCap}
                onValueChange={setWithCap}
                rows={3}
                maxRows={6}
              />
              <Textarea
                aria-label="Consigna, sin techo"
                value={noCap}
                onValueChange={setNoCap}
                rows={2}
              />
            </Stack>
          </Variant>
          <Variant
            name="la cuenta: mientras sobra, cerca del techo y abajo del mínimo"
            note="Cuenta en gris mientras sobra lugar; en el último diez por ciento dice cuánto queda, y abajo del mínimo cuánto falta: **un contador informa, una frase orienta**."
            code={`<Textarea
  aria-label="Devolución para el estudiante"
  value={feedback}
  onValueChange={setFeedback}
  counter
  maxLength={400}
  rows={3}
/>
<Textarea
  aria-label="Devolución con techo corto"
  value={near}
  onValueChange={setNear}
  counter
  maxLength={60}
  rows={3}
/>
<Textarea
  aria-label="Devolución con mínimo"
  value={belowMin}
  onValueChange={setBelowMin}
  counter
  minLength={20}
  maxLength={400}
  rows={3}
/>`}
          >
            <Stack gap="md" width="sm">
              <Textarea
                aria-label="Devolución para el estudiante"
                value={feedback}
                onValueChange={setFeedback}
                counter
                maxLength={400}
                rows={3}
              />
              <Textarea
                aria-label="Devolución con techo corto"
                value={near}
                onValueChange={setNear}
                counter
                maxLength={60}
                rows={3}
              />
              <Textarea
                aria-label="Devolución con mínimo"
                value={belowMin}
                onValueChange={setBelowMin}
                counter
                minLength={20}
                maxLength={400}
                rows={3}
              />
            </Stack>
          </Variant>
          <Variant
            name="quién decide el alto: auto, vertical y none"
            note="Tres modos excluyentes: lo decide el contenido, quien arrastra o nadie. Con el tirador y el crecimiento a la vez, la tecla siguiente pisa el alto que arrastraste."
            code={`<Textarea aria-label="Consigna, alto automático" value={mode} onValueChange={setMode} rows={2} maxRows={6} />
<Textarea aria-label="Consigna, alto arrastrable" defaultValue="Arrastrá la esquina." rows={2} resize="vertical" />
<Textarea
  aria-label="Consigna, alto fijo"
  defaultValue={'Alto fijo de dos filas.\\nLo que sobra scrollea y el campo no se mueve.'}
  rows={2}
  resize="none"
/>`}
          >
            <Stack gap="md" width="sm">
              <Textarea aria-label="Consigna, alto automático" value={mode} onValueChange={setMode} rows={2} maxRows={6} />
              <Textarea aria-label="Consigna, alto arrastrable" defaultValue="Arrastrá la esquina." rows={2} resize="vertical" />
              <Textarea
                aria-label="Consigna, alto fijo"
                defaultValue={'Alto fijo de dos filas.\nLo que sobra scrollea y el campo no se mueve.'}
                rows={2}
                resize="none"
              />
            </Stack>
          </Variant>
          <Variant
            name="Apagado"
            note="No se edita ni recibe el foco, y va en el mismo gris que el `TextField`."
            code={`<Textarea
  aria-label="Consigna de una actividad cerrada"
  value="Calculá cuántos litros de agua gasta tu casa en una semana."
  disabled
  rows={2}
/>`}
          >
            <Stack gap="md" width="sm">
              <Textarea
                aria-label="Consigna de una actividad cerrada"
                value="Calculá cuántos litros de agua gasta tu casa en una semana."
                disabled
                rows={2}
              />
            </Stack>
          </Variant>
          <Variant
            name="Con error"
            note="`Field.Error` pinta la línea de la caja en rojo y dice qué falta para seguir."
            code={`<Field>
  <Field.Label>Consigna</Field.Label>
  <Textarea value={prompt} onValueChange={setPrompt} rows={3} maxRows={6} />
  <Field.Error>Escribí la consigna antes de publicar la actividad.</Field.Error>
</Field>`}
          >
            <Stack gap="md" width="sm">
              <Field>
                <Field.Label>Consigna</Field.Label>
                <Textarea value={prompt} onValueChange={setPrompt} rows={3} maxRows={6} />
                <Field.Error>Escribí la consigna antes de publicar la actividad.</Field.Error>
              </Field>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Textarea" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`maxRows` le pone techo al crecimiento, así que la página no se estira sin fin.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Se remide al cambiar el ancho y al cargar la fuente, así que nunca recorta texto sin barra.</A11y.Item>
          <A11y.Item>Al llegar al techo prende el scroll; abajo del techo lo apaga para que no titile.</A11y.Item>
          <A11y.Item>El anillo de foco es de la caja, igual que en `TextField`.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
