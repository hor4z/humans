import cls from './radio.module.css'
import { useState } from 'react'
import { Checkbox } from '@humans/ui/checkbox'
import { Field } from '@humans/ui/field'
import { Radio } from '@humans/ui/radio'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function RadioStory() {
  const [compared, setCompared] = useState(true)
  const [one, setOne] = useState<'a' | 'b'>('b')
  const [mode, setMode] = useState<'todas' | 'abiertas' | 'cerradas'>('abiertas')
  const [loose, setLoose] = useState<'si' | 'no'>('si')
  const [withHint, setWithHint] = useState(true)
  const [locked, setLocked] = useState<'nota' | 'concepto'>('nota')
  const [grading, setGrading] = useState<'' | 'nota' | 'concepto'>('')

  return (
    <Page
      title="Radio"
      kind="Formularios"
      imports="import { Radio } from '@humans/ui/radio'"
      lead="Permite elegir una única opción dentro de un grupo."
    >
      <Hero>
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
        <Radio.Group
          label="Avisos"
          value={loose}
          onValueChange={setLoose}
          options={[{ value: 'si', label: 'Sí, avisarme' }, { value: 'no', label: 'No hace falta' }]}
        />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Grupo" required>`Radio.Group` reparte las opciones, lleva el nombre del conjunto y le da el teclado.</Anatomy.Part>
        <Anatomy.Part name="Anillo" required>El círculo de 20, o de 16 y 24 con `size`. Apagado es una caja vacía con su línea; elegido pasa al azul.</Anatomy.Part>
        <Anatomy.Part name="Disco">El punto blanco de adentro cuando está elegido. El azul va afuera: con el relleno afuera, la elegida se ve de una en toda la fila.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta">El texto de cada opción, al lado del anillo: en `Radio.Group` sale de `options`, y un `Radio` suelto lo lleva como hijo. Se toca junto con el anillo.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant
            name="El grupo"
            note="Las opciones van sueltas sobre el papel, cada una con su texto al lado."
            code={`<Radio.Group
  label="Dos opciones"
  value={one}
  onValueChange={setOne}
  options={[{ value: 'a', label: 'La primera' }, { value: 'b', label: 'La segunda' }]}
/>`}
          >
            <Radio.Group
              label="Dos opciones"
              value={one}
              onValueChange={setOne}
              options={[{ value: 'a', label: 'La primera' }, { value: 'b', label: 'La segunda' }]}
            />
          </Variant>
          <Variant
            name="El checkbox en redondo"
            note="Mismo relleno azul prendido, misma caja vacía apagado, misma medida: 20, o 16 y 24 con `size`. Lo único que cambia es la marca de adentro: un tilde o un disco."
            code={`<Radio checked={withHint} onCheckedChange={() => setWithHint(true)}>Prendido</Radio>
<Radio checked={!withHint} onCheckedChange={() => setWithHint(false)}>Apagado</Radio>
<Checkbox checked={compared} onCheckedChange={setCompared} label="Checkbox prendido" />
<Checkbox checked={!compared} onCheckedChange={on => setCompared(!on)} label="Checkbox apagado" />`}
          >
            <Radio checked={withHint} onCheckedChange={() => setWithHint(true)}>Prendido</Radio>
            <Radio checked={!withHint} onCheckedChange={() => setWithHint(false)}>Apagado</Radio>
            <span className={cls.checkboxPair}>
              <Checkbox checked={compared} onCheckedChange={setCompared} label="Checkbox prendido" />
              <Checkbox checked={!compared} onCheckedChange={on => setCompared(!on)} label="Checkbox apagado" />
            </span>
          </Variant>
          <Variant
            name="Apagado"
            note="Con `disabled` en el grupo se apagan todas las opciones juntas: no se eligen ni reciben el foco, y van en gris."
            code={`<Radio.Group
  label="Cómo se corrigió"
  value={locked}
  onValueChange={setLocked}
  disabled
  options={[{ value: 'nota', label: 'Con nota' }, { value: 'concepto', label: 'Con concepto' }]}
/>`}
          >
            <Radio.Group
              label="Cómo se corrigió"
              value={locked}
              onValueChange={setLocked}
              disabled
              options={[{ value: 'nota', label: 'Con nota' }, { value: 'concepto', label: 'Con concepto' }]}
            />
          </Variant>
          <Variant
            name="Con error"
            note="`Field.Error` pinta los anillos en rojo y dice qué elegir para seguir."
            code={`<Field>
  <Field.Label>Cómo se corrige</Field.Label>
  <Radio.Group
    value={grading}
    onValueChange={setGrading}
    options={[{ value: 'nota', label: 'Con nota' }, { value: 'concepto', label: 'Con concepto' }]}
  />
  <Field.Error>Elegí cómo se corrige antes de publicar la actividad.</Field.Error>
</Field>`}
          >
            <Field>
              <Field.Label>Cómo se corrige</Field.Label>
              <Radio.Group
                value={grading}
                onValueChange={setGrading}
                options={[{ value: 'nota', label: 'Con nota' }, { value: 'concepto', label: 'Con concepto' }]}
              />
              <Field.Error>Elegí cómo se corrige antes de publicar la actividad.</Field.Error>
            </Field>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Radio" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Van adentro de un `Radio.Group`, que es lo que le da el roving al teclado.</Practices.Do>
          <Practices.Do>Cada opción con su propio texto va en un radio; opciones cortas que se comparan de un vistazo son un [Segmented](#segmented).</Practices.Do>
          <Practices.Dont>Con más de cinco opciones va un `Select`: cinco radios ocupan media pantalla.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Una sola parada de tabulación para todo el grupo, y las flechas mueven y eligen a la vez.</A11y.Item>
          <A11y.Item>`role="radio"` con `aria-checked` y nombre propio.</A11y.Item>
          <A11y.Item>El anillo del control sin elegir va en tinta y no en gris: sobre un tinte, el gris se ve sucio.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
