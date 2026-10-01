import cls from './steps.module.css'
import { useState } from 'react'
import { IconButton } from '@humans/ui/icon-button'
import { Steps } from '@humans/ui/steps'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

const design = [
  { label: 'Empatizar', hint: 'Escuchar a quien tiene el problema' },
  { label: 'Definir', hint: 'Escribir el problema en una frase' },
  { label: 'Idear', hint: 'Muchas ideas antes de elegir' },
  { label: 'Prototipar', hint: 'Lo más barato que se pueda probar' },
  { label: 'Testear', hint: 'Mirar a alguien usarlo' },
]

const handIn = [
  { label: 'Leer la consigna' },
  { label: 'Resolver' },
  { label: 'Revisar' },
  { label: 'Entregar' },
]

export function StepsStory() {
  const [current, setCurrent] = useState(2)
  const [step, setStep] = useState(2)

  return (
    <Page
      title="Steps"
      kind="Navegación"
      imports="import { Steps } from '@humans/ui/steps'"
      lead="Muestra las etapas de un proceso y destaca la etapa actual."
    >
      <Hero>
        <div>
          <Steps steps={design} current={current} label="Etapas del proyecto" />
          <div className={cls.pieceActions}>
            <IconButton size="sm" variant="muted" icon="arrow_back" label="Etapa anterior" disabled={current === 0} onClick={() => setCurrent(n => n - 1)} />
            <IconButton size="sm" variant="muted" icon="arrow_forward" label="Etapa siguiente" disabled={current === design.length - 1} onClick={() => setCurrent(n => n + 1)} />
          </div>
        </div>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Etapa" required>Cada paso de la secuencia, con su número y su nombre. Las anteriores quedan hechas, la actual se marca, las que siguen esperan.</Anatomy.Part>
        <Anatomy.Part name="Marca">El número de la etapa, o el tilde cuando está hecha.</Anatomy.Part>
        <Anatomy.Part name="Nombre" required>El `label` de la etapa.</Anatomy.Part>
        <Anatomy.Part name="Aclaración">El `hint`: una línea abajo para lo que el nombre no dice.</Anatomy.Part>
        <Anatomy.Part name="Línea">El tramo que une una etapa con la siguiente.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo fill label="Acostada, con botones de afuera" note="Para un proyecto que avanza por etapas a lo largo de semanas: la pantalla decide cuándo se pasa a la siguiente." code={`<Steps steps={design} current={current} label="Etapas del proyecto" />
<IconButton size="sm" variant="muted" icon="arrow_back" label="Etapa anterior" disabled={current === 0} onClick={() => setCurrent(n => n - 1)} />
<IconButton size="sm" variant="muted" icon="arrow_forward" label="Etapa siguiente" disabled={current === design.length - 1} onClick={() => setCurrent(n => n + 1)} />`}>
          <div>
            <Steps steps={design} current={current} label="Etapas del proyecto" />
            <div className={cls.pieceActions}>
              <IconButton size="sm" variant="muted" icon="arrow_back" label="Etapa anterior" disabled={current === 0} onClick={() => setCurrent(n => n - 1)} />
              <IconButton size="sm" variant="muted" icon="arrow_forward" label="Etapa siguiente" disabled={current === design.length - 1} onClick={() => setCurrent(n => n + 1)} />
            </div>
          </div>
        </Demo>
        <Demo fill label="Parada, para etapas con su propio texto o una columna angosta" note="Va al costado de una consigna, donde el estudiante ve en qué paso de la entrega está." code={`<Steps orientation="vertical" steps={handIn} current={1} label="Cómo se entrega" />`}>
          <div className={cls.stoppedBox}>
            <Steps orientation="vertical" steps={handIn} current={1} label="Cómo se entrega" />
          </div>
        </Demo>
        <Demo fill label="Navegable: cada etapa es un botón" note="Tocá una etapa para volver a ella: sirve en un recorrido que se puede revisar, como releer la consigna antes de entregar." code={`<Steps steps={handIn} current={step} label="Cómo se entrega, navegable" onSelect={setStep} />`}>
          <Steps steps={handIn} current={step} label="Cómo se entrega, navegable" onSelect={setStep} />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of={['Steps', 'Step']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`onSelect` vuelve cada etapa un botón, y eso solo va cuando volver atrás es de verdad posible. Sin él es un indicador. En pantalla chica la acostada se para sola.</Practices.Do>
          <Practices.Do>`current` es dónde estás parado, que no es lo mismo que lo elegido ni que el cursor del teclado.</Practices.Do>
          <Practices.Dont>No lo uses para un proceso de dos pasos: dos pasos se cuentan solos.</Practices.Dont>
          <Practices.Dont>Si las partes son intercambiables (once de dieciocho entregas), no va `Steps`: va un `Progress`, que dice cuánto de un total está hecho.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es una lista ordenada con nombre: quien la escucha sabe cuántas etapas hay antes de recorrerlas.</A11y.Item>
          <A11y.Item>La etapa en curso lleva `aria-current="step"`, y es una sola.</A11y.Item>
          <A11y.Item>Hecha, en curso y pendiente se dicen con palabras además de con color y con el tilde. El color nunca va solo.</A11y.Item>
          <A11y.Item>Sin `onSelect` no hay botones: una etapa que no lleva a ningún lado no debería recibir el foco.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
