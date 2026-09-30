import cls from './radio.module.css'
import { useState } from 'react'
import { Checkbox } from '@milo/ui/checkbox'
import { Radio } from '@milo/ui/radio'
import { A11y, Footnote, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function RadioStory() {
  const [compared, setCompared] = useState(true)
  const [one, setOne] = useState<'a' | 'b'>('b')
  const [mode, setMode] = useState<'todas' | 'abiertas' | 'cerradas'>('abiertas')
  const [loose, setLoose] = useState<'si' | 'no'>('si')
  const [withHint, setWithHint] = useState(true)

  return (
    <Page
      title="Radio"
      kind="Formularios"
      imports="import { Radio } from '@milo/ui/radio'"
      lead="La elección de una entre varias. Es 18, la misma medida del Checkbox y del pulgar del switch, así una fila con los tres queda pareja."
    >
      <Section
        title="El grupo"
        note="Las opciones van sueltas sobre el papel, cada una con su texto al lado. Opciones cortas que se comparan de un vistazo son un `Segmented`."
      >
        <Panel>
          <Variant name="dos opciones" code={`<Radio.Group
  label="Dos opciones"
  value={one}
  onValueChange={setOne}
  options={[{ value: 'a', label: 'La primera' }, { value: 'b', label: 'La segunda' }]}
/>`}>
            <Radio.Group
              label="Dos opciones"
              value={one}
              onValueChange={setOne}
              options={[{ value: 'a', label: 'La primera' }, { value: 'b', label: 'La segunda' }]}
            />
          </Variant>
          <Variant name="tres" code={`<Radio.Group
  label="Tres opciones"
  value={mode}
  onValueChange={setMode}
  options={[
    { value: 'todas', label: 'Todas' },
    { value: 'abiertas', label: 'Abiertas' },
    { value: 'cerradas', label: 'Cerradas' },
  ]}
/>`}>
            <Radio.Group
              label="Tres opciones"
              value={mode}
              onValueChange={setMode}
              options={[
                { value: 'todas', label: 'Todas' },
                { value: 'abiertas', label: 'Abiertas' },
                { value: 'cerradas', label: 'Cerradas' },
              ]}
            />
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Es el checkbox en redondo"
        note="Mismo relleno azul prendido, misma caja vacía apagado, misma medida de 18. Lo único que cambia es la marca de adentro: un tilde o un disco."
      >
        <Panel>
          <Variant name="radio vs checkbox" code={`<Radio checked={withHint} onCheckedChange={() => setWithHint(true)} label="Prendido" />
<Radio checked={!withHint} onCheckedChange={() => setWithHint(false)} label="Apagado" />
<Checkbox checked={compared} onCheckedChange={setCompared} label="Checkbox prendido" />
<Checkbox checked={!compared} onCheckedChange={on => setCompared(!on)} label="Checkbox apagado" />`}>
            <Radio checked={withHint} onCheckedChange={() => setWithHint(true)} label="Prendido" />
            <Radio checked={!withHint} onCheckedChange={() => setWithHint(false)} label="Apagado" />
            <span className={cls.checkboxPair}>
              <Checkbox checked={compared} onCheckedChange={setCompared} label="Checkbox prendido" />
              <Checkbox checked={!compared} onCheckedChange={on => setCompared(!on)} label="Checkbox apagado" />
            </span>
          </Variant>
        </Panel>
        <Footnote>
          El azul va afuera y el blanco adentro: con el relleno afuera, la elegida se ve de una en
          toda la fila.
        </Footnote>
      </Section>

      <Section
        title="Con etiqueta al lado"
        note="El caso para el que existe el radio y no el Segmented: cada opción con su propio texto."
      >
        <Panel>
          <Variant name="con etiqueta" code={`<label>
  <Radio checked={loose === 'si'} onCheckedChange={() => setLoose('si')} label="Sí, avisarme" />
  Sí, avisarme
</label>
<label>
  <Radio checked={loose === 'no'} onCheckedChange={() => setLoose('no')} label="No hace falta" />
  No hace falta
</label>`}>
            <span className={cls.looseGroup}>
              <label className={cls.yesLabel}>
                <Radio checked={loose === 'si'} onCheckedChange={() => setLoose('si')} label="Sí, avisarme" />
                Sí, avisarme
              </label>
              <label className={cls.noLabel}>
                <Radio checked={loose === 'no'} onCheckedChange={() => setLoose('no')} label="No hace falta" />
                No hace falta
              </label>
            </span>
          </Variant>
          <Variant name="deshabilitado" code={`<Radio checked onCheckedChange={select} disabled label="Prendido deshabilitado" />
<Radio checked={false} onCheckedChange={select} disabled label="Apagado deshabilitado" />`}>
            <Radio checked onCheckedChange={() => {}} disabled label="Prendido deshabilitado" />
            <Radio checked={false} onCheckedChange={() => {}} disabled label="Apagado deshabilitado" />
          </Variant>
        </Panel>
      </Section>

      <Section
        title="El teclado"
        note="Una sola parada de tabulación para todo el grupo, y las flechas mueven y eligen a la vez."
      >
        <Panel>
          <Variant name="probalo" code={`<Radio.Group
  label="Probá las flechas"
  value={mode}
  onValueChange={setMode}
  options={[
    { value: 'todas', label: 'Todas' },
    { value: 'abiertas', label: 'Abiertas' },
    { value: 'cerradas', label: 'Cerradas' },
  ]}
/>`}>
            <Radio.Group
              label="Probá las flechas"
              value={mode}
              onValueChange={setMode}
              options={[
                { value: 'todas', label: 'Todas' },
                { value: 'abiertas', label: 'Abiertas' },
                { value: 'cerradas', label: 'Cerradas' },
              ]}
            />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Radio" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Van adentro de un `Radio.Group`, que es lo que le da el roving al teclado.</Practices.Do>
          <Practices.Dont>Con más de cinco opciones va un `Select`: cinco radios ocupan media pantalla.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>role="radio" con aria-checked y nombre propio.</A11y.Item>
          <A11y.Item>El anillo del control sin elegir va en tinta y no en gris: sobre un tinte, el gris se ve sucio.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
