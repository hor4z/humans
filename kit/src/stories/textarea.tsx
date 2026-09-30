import { useState } from 'react'
import { Textarea } from '@milo/ui/textarea'
import { A11y, Cluster, Demo, Page, Practices, Props, Section } from '../kit'

export function TextareaStory() {
  const [short, setShort] = useState('')
  const [withCap, setWithCap] = useState(
    'Este campo crece hasta seis filas y después scrollea.\nBorrá líneas y mirá cómo se achica: el alto vuelve, que es la mitad que se olvida.',
  )
  const [noCap, setNoCap] = useState('Sin maxRows crece todo lo que haga falta.')
  const [mode, setMode] = useState('Crece con lo que escribís.')
  const [feedback, setFeedback] = useState('Resolviste bien las dos primeras. En la tercera te falta justificar por qué la pendiente da la mitad de g.')
  const [near, setNear] = useState('Le puse un techo corto para que veas qué pasa al final.')
  const [belowMin, setBelowMin] = useState('Bien')

  return (
    <Page
      title="Textarea"
      kind="Formularios"
      imports="import { Textarea } from '@milo/ui/textarea'"
      lead="El campo de varias líneas: el TextField estirado. La misma caja, el mismo borde y la misma marca de foco, porque dos campos que no se parecen se leen como dos sistemas. Lo único que cambia adentro es el interlineado: el 16 fijo aprieta cuando hay varios renglones."
    >
      <Section
        title="Crece con lo que escribís"
        note="Un alto fijo queda corto para escribir o largo y vacío. Escribí y borrá en los dos: crecer es la mitad fácil, lo que se olvida es volver."
      >
        <Cluster align="start">
          <Demo width="sm" fill label="rows 3 · maxRows 6" code={`<Textarea
  aria-label="Consigna, con techo de seis filas"
  value={withCap}
  onValueChange={setWithCap}
  rows={3}
  maxRows={6}
/>`}>
            <Textarea
              aria-label="Consigna, con techo de seis filas"
              value={withCap}
              onValueChange={setWithCap}
              rows={3}
              maxRows={6}
            />
          </Demo>
          <Demo width="sm" fill label="sin techo" code={`<Textarea
  aria-label="Consigna, sin techo"
  value={noCap}
  onValueChange={setNoCap}
  rows={2}
/>`}>
            <Textarea
              aria-label="Consigna, sin techo"
              value={noCap}
              onValueChange={setNoCap}
              rows={2}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="La cuenta, y por qué no es solo un número"
        note="Mientras sobra lugar cuenta en gris; en el último diez por ciento dice cuánto queda, y abajo del mínimo cuánto falta: **un contador informa, una frase orienta**."
      >
        <Cluster align="start">
          <Demo width="sm" fill label="mientras sobra lugar" code={`<Textarea
  aria-label="Devolución para el estudiante"
  value={feedback}
  onValueChange={setFeedback}
  counter
  maxLength={400}
  rows={3}
/>`}>
            <Textarea
              aria-label="Devolución para el estudiante"
              value={feedback}
              onValueChange={setFeedback}
              counter
              maxLength={400}
              rows={3}
            />
          </Demo>
          <Demo width="sm" fill label="cerca del techo" code={`<Textarea
  aria-label="Devolución con techo corto"
  value={near}
  onValueChange={setNear}
  counter
  maxLength={60}
  rows={3}
/>`}>
            <Textarea
              aria-label="Devolución con techo corto"
              value={near}
              onValueChange={setNear}
              counter
              maxLength={60}
              rows={3}
            />
          </Demo>
          <Demo width="sm" fill label="todavía no llega al mínimo" code={`<Textarea
  aria-label="Devolución con mínimo"
  value={belowMin}
  onValueChange={setBelowMin}
  counter
  minLength={20}
  maxLength={400}
  rows={3}
/>`}>
            <Textarea
              aria-label="Devolución con mínimo"
              value={belowMin}
              onValueChange={setBelowMin}
              counter
              minLength={20}
              maxLength={400}
              rows={3}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Vacío y deshabilitado"
        note="El placeholder va en el mismo gris que el del TextField, y el deshabilitado usa la misma opacidad: son el mismo campo."
      >
        <Cluster align="start">
          <Demo width="sm" fill label="con placeholder" code={`<Textarea
  aria-label="Consigna de la actividad"
  value={short}
  onValueChange={setShort}
  placeholder="Escribí la consigna de la actividad…"
  rows={3}
  maxRows={8}
/>`}>
            <Textarea
              aria-label="Consigna de la actividad"
              value={short}
              onValueChange={setShort}
              placeholder="Escribí la consigna de la actividad…"
              rows={3}
              maxRows={8}
            />
          </Demo>
          <Demo width="sm" fill label="disabled" code={`<Textarea aria-label="Consigna no editable" value="No editable" disabled rows={3} />`}>
            <Textarea aria-label="Consigna no editable" value="No editable" disabled rows={3} />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Quién decide el alto"
        note="Tres modos excluyentes: lo decide el contenido, quien arrastra o nadie. Con el tirador y el crecimiento a la vez, la tecla siguiente pisa el alto que arrastraste."
      >
        <Cluster align="start">
          <Demo width="xs" fill label="auto · el default" code={`<Textarea aria-label="Consigna, alto automático" value={mode} onValueChange={setMode} rows={2} maxRows={6} />`}>
            <Textarea aria-label="Consigna, alto automático" value={mode} onValueChange={setMode} rows={2} maxRows={6} />
          </Demo>
          <Demo width="xs" fill label="vertical · el tirador nativo" code={`<Textarea aria-label="Consigna, alto arrastrable" defaultValue="Arrastrá la esquina." rows={2} resize="vertical" />`}>
            <Textarea aria-label="Consigna, alto arrastrable" defaultValue="Arrastrá la esquina." rows={2} resize="vertical" />
          </Demo>
          <Demo width="xs" fill label="none · fijo, y scrollea" code={`<Textarea
  aria-label="Consigna, alto fijo"
  defaultValue={'Alto fijo de dos filas.\\nLo que sobra scrollea y el campo no se mueve.'}
  rows={2}
  resize="none"
/>`}>
            <Textarea
              aria-label="Consigna, alto fijo"
              defaultValue={'Alto fijo de dos filas.\nLo que sobra scrollea y el campo no se mueve.'}
              rows={2}
              resize="none"
            />
          </Demo>
        </Cluster>
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
          <A11y.Item>El anillo de foco es de la caja, igual que en TextField.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
