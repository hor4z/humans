import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { Choice } from '@milo/ui/blocks/task/choice'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const places = [
  { id: 'patio', label: 'El patio en el recreo' },
  { id: 'biblioteca', label: 'La biblioteca a las 11' },
  { id: 'pasillo', label: 'El pasillo entre horas' },
  { id: 'aula', label: 'El aula con la puerta cerrada' },
]

const care = [
  { id: 'aparato', label: 'Usar siempre el mismo teléfono' },
  { id: 'hora', label: 'Medir a la misma hora en todos los lugares' },
  { id: 'app', label: 'Cambiar de app si una mide más lindo' },
  { id: 'contexto', label: 'Anotar qué estaba pasando alrededor' },
]

export function ChoiceStory() {
  const [one, setOne] = useState<string[]>([])
  const [many, setMany] = useState<string[]>(['aparato'])
  const [revealed, setRevealed] = useState(false)
  const toggleRevealed = () => setRevealed(v => !v)

  return (
    <Page
      title="Choice"
      kind="Consigna"
      imports="import { Choice } from '@milo/ui/blocks/task/choice'"
      lead="Presenta una pregunta con opciones de respuesta. La selección y la corrección son estados independientes."
    >
      <Hero>
        <Stack width="md" gap="lg">
          <Choice options={places} value={one} onValueChange={setOne}>
            <Choice.Prompt>¿Dónde esperás que dé más alto?</Choice.Prompt>
            <Choice.Hint>Todavía no midieron nada: se contesta con lo que cada uno cree.</Choice.Hint>
          </Choice>
          <Choice multiple options={care} value={many} onValueChange={setMany}>
            <Choice.Prompt>¿Qué hay que cuidar para que los números se puedan comparar?</Choice.Prompt>
          </Choice>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Enunciado" required>`Choice.Prompt`: la pregunta, que nombra al grupo de opciones.</Anatomy.Part>
        <Anatomy.Part name="Aclaración">`Choice.Hint`: lo que conviene saber antes de contestar, como que hay más de una correcta.</Anatomy.Part>
        <Anatomy.Part name="Tarjeta de opción" required>Una por opción, y toda la tarjeta es zona de toque. Es un círculo con una sola correcta y una casilla con `multiple`.</Anatomy.Part>
        <Anatomy.Part name="Veredicto">Al revelar, cada tarjeta dice en texto si iba, con el tilde en las que iban y la raya amarilla en las marcadas de más.</Anatomy.Part>
      </Anatomy>
      <Section title="Una o varias">
        <Demo label="Con multiple las tarjetas pasan a ser casillas" code={`<Choice options={places} value={one} onValueChange={setOne}>
  <Choice.Prompt>¿Dónde esperás que dé más alto?</Choice.Prompt>
</Choice>
<Choice multiple options={care} value={many} onValueChange={setMany}>
  <Choice.Prompt>¿Qué hay que cuidar para que los números se puedan comparar?</Choice.Prompt>
</Choice>`}>
          <Stack width="sm">
            <Choice options={places} value={one} onValueChange={setOne}>
              <Choice.Prompt>¿Dónde esperás que dé más alto?</Choice.Prompt>
            </Choice>
            <Choice multiple options={care} value={many} onValueChange={setMany}>
              <Choice.Prompt>¿Qué hay que cuidar para que los números se puedan comparar?</Choice.Prompt>
            </Choice>
          </Stack>
        </Demo>
      </Section>

      <Section title="Corregir es otro momento">
        <Panel>
          <Variant
            name="antes y después"
            note="Al revelar, las que iban quedan con el tilde y las marcadas de más con la raya amarilla, que es el tono de un consejo."
            code={`<Choice
  multiple
  options={care}
  value={many}
  onValueChange={setMany}
  correct={['aparato', 'hora', 'contexto']}
  revealed={revealed}
>
  <Choice.Prompt>¿Qué hay que cuidar para que los números se puedan comparar?</Choice.Prompt>
</Choice>
<Button size="sm" variant="ghost" onClick={toggleRevealed}>
  {revealed ? 'Volver a antes' : 'Mostrar cuáles iban'}
</Button>`}
          >
            <Stack width="sm">
              <Choice
                multiple
                options={care}
                value={many}
                onValueChange={setMany}
                correct={['aparato', 'hora', 'contexto']}
                revealed={revealed}
              >
                <Choice.Prompt>¿Qué hay que cuidar para que los números se puedan comparar?</Choice.Prompt>
              </Choice>
              <Button size="sm" variant="ghost" onClick={toggleRevealed}>
                {revealed ? 'Volver a antes' : 'Mostrar cuáles iban'}
              </Button>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Choice" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Escribí el enunciado como pregunta y las opciones como respuestas enteras: una tarjeta que dice "todas las anteriores" no se puede leer sin volver arriba.</Practices.Do>
          <Practices.Do>Si hay más de una correcta, decilo en el `Choice.Hint` antes de que empiecen: descubrirlo al corregir se lee como una trampa.</Practices.Do>
          <Practices.Do>Guardá `correct` en la consigna y revelalo cuando el docente decida: la pieza no elige ese momento por vos.</Practices.Do>
          <Practices.Dont>No la uses para una opinión ni para un autoreporte: en cuanto hay `correct`, la pregunta tiene una respuesta buena, y preguntar cómo te sentiste no la tiene.</Practices.Dont>
          <Practices.Dont>No pintes de rojo lo marcado de más: el amarillo dice lo mismo sin convertir un intento en una falta.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El enunciado nombra al grupo con `aria-labelledby`, así que un lector dice la pregunta antes de la primera opción.</A11y.Item>
          <A11y.Item>Con una sola correcta es un `radiogroup`: una parada de tabulación y las flechas mueven, como cualquier grupo de opción única.</A11y.Item>
          <A11y.Item>Con varias es un `group` de casillas, cada una con su parada, porque marcar una no descarta a las otras.</A11y.Item>
          <A11y.Item>Toda la tarjeta es zona de toque, no solo el círculo de 18.</A11y.Item>
          <A11y.Item>Al revelar, cada opción dice en texto si iba o no: el resultado no depende de ver el color ni el tilde.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
