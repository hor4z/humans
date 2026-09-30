import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { NumberAnswer } from '@milo/ui/blocks/task/number-answer'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function NumberAnswerStory() {
  const [value, setValue] = useState('')
  const [revealed, setRevealed] = useState(false)
  const toggleRevealed = () => setRevealed(v => !v)

  return (
    <Page
      title="NumberAnswer"
      kind="Consigna"
      imports="import { NumberAnswer } from '@milo/ui/blocks/task/number-answer'"
      lead="Recoge una respuesta numérica y permite evaluar un margen de tolerancia."
    >
      <Hero>
        <Stack width="sm">
          <NumberAnswer value={value} onValueChange={setValue} unit="dB" expected={72.3} tolerance={0.2}>
            <NumberAnswer.Prompt>El promedio del patio en los tres momentos</NumberAnswer.Prompt>
            <NumberAnswer.Hint>Sumá los tres valores de la fila y dividí por tres.</NumberAnswer.Hint>
          </NumberAnswer>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Enunciado" required>`NumberAnswer.Prompt`: qué cuenta hay que hacer.</Anatomy.Part>
        <Anatomy.Part name="Aclaración">`NumberAnswer.Hint`: de dónde sale el número.</Anatomy.Part>
        <Anatomy.Part name="Campo" required>Acepta la coma y el punto: se escribe 72,3 y el teclado del celular manda un punto.</Anatomy.Part>
        <Anatomy.Part name="Unidad">`unit`: al final del campo, para que 40 y 40 dB no sean dos respuestas distintas.</Anatomy.Part>
        <Anatomy.Part name="Veredicto">Al revelar dice en texto si cae adentro del margen o cuál era el valor.</Anatomy.Part>
      </Anatomy>
      <Section title="Calculando y corrigiendo">
        <Panel>
          <Variant
            name="antes y después"
            code={`<NumberAnswer
  value={value}
  onValueChange={setValue}
  unit="dB"
  expected={72.3}
  tolerance={0.2}
  revealed={revealed}
>
  <NumberAnswer.Prompt>El promedio del patio en los tres momentos</NumberAnswer.Prompt>
  <NumberAnswer.Hint>Sumá los tres valores de la fila y dividí por tres.</NumberAnswer.Hint>
</NumberAnswer>
<Button size="sm" variant="ghost" onClick={toggleRevealed}>
  {revealed ? 'Volver a antes' : 'Corregir'}
</Button>`}
          >
            <Stack width="sm">
              <NumberAnswer
                value={value}
                onValueChange={setValue}
                unit="dB"
                expected={72.3}
                tolerance={0.2}
                revealed={revealed}
              >
                <NumberAnswer.Prompt>El promedio del patio en los tres momentos</NumberAnswer.Prompt>
                <NumberAnswer.Hint>Sumá los tres valores de la fila y dividí por tres.</NumberAnswer.Hint>
              </NumberAnswer>
              <Button size="sm" variant="ghost" onClick={toggleRevealed}>
                {revealed ? 'Volver a antes' : 'Corregir'}
              </Button>
            </Stack>
          </Variant>
          <Variant
            name="sin margen"
            note="Sin `tolerance` la respuesta es exacta: para lo que sale de una resta entre dos números dados."
            code={`<NumberAnswer value="21" unit="dB" expected={22} revealed>
  <NumberAnswer.Prompt>El salto del recreo en el patio</NumberAnswer.Prompt>
</NumberAnswer>`}
          >
            <Stack width="sm">
              <NumberAnswer value="21" unit="dB" expected={22} revealed>
                <NumberAnswer.Prompt>El salto del recreo en el patio</NumberAnswer.Prompt>
              </NumberAnswer>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="NumberAnswer" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Decí en el `Hint` de dónde sale el número: qué cuenta, con qué datos. La pregunta es si sabe armarla, no si adivina qué querías.</Practices.Do>
          <Practices.Do>Poné la unidad aunque parezca obvia: sin ella, 40 y 40 dB son dos respuestas distintas para el que corrige.</Practices.Do>
          <Practices.Dont>No la uses para un número que no sale de una cuenta: una fecha va en `DatePicker` y una cantidad elegida, en `Slider`.</Practices.Dont>
          <Practices.Dont>No dejes el margen en cero cuando el dato se midió: ahí el que se equivoca por un decimal no se equivocó en nada.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El enunciado nombra al campo con `aria-labelledby`.</A11y.Item>
          <A11y.Item>El campo va con `inputMode="decimal"`, así que en un teléfono aparece el teclado con la coma.</A11y.Item>
          <A11y.Item>Al corregir, el veredicto está escrito: cae adentro del margen, o cuál era el valor. No depende de ver el tilde ni el color.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
