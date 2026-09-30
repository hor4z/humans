import { useState } from 'react'
import { OpenQuestion } from '@milo/ui/blocks/task/open-question'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function OpenQuestionStory() {
  const [text, setText] = useState('')

  return (
    <Page
      title="OpenQuestion"
      kind="Consigna"
      imports="import { OpenQuestion } from '@milo/ui/blocks/task/open-question'"
      lead="Presenta una consigna de respuesta escrita para su posterior revisión."
    >
      <Hero>
        <Stack width="md" gap="lg">
          <OpenQuestion value={text} onValueChange={setText} rows={3} maxLength={240} placeholder="Porque ahí se junta todo el curso y además está el eco del techo">
            <OpenQuestion.Prompt>¿Por qué ese y no otro?</OpenQuestion.Prompt>
            <OpenQuestion.Hint>Dos renglones alcanzan.</OpenQuestion.Hint>
          </OpenQuestion>
          <OpenQuestion value="">
            <OpenQuestion.Prompt>¿Por qué ese y no otro?</OpenQuestion.Prompt>
          </OpenQuestion>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Enunciado" required>`OpenQuestion.Prompt`: la pregunta, que nombra al campo.</Anatomy.Part>
        <Anatomy.Part name="Aclaración">`OpenQuestion.Hint`: qué tiene que aparecer en la respuesta.</Anatomy.Part>
        <Anatomy.Part name="Campo" required>Donde se escribe, con `placeholder` y `rows`. Sin `onValueChange` se convierte en un párrafo de lectura.</Anatomy.Part>
        <Anatomy.Part name="Contador">Con `maxLength`: avisa recién cuando quedan pocos caracteres, en vez de frenar la tecla en silencio.</Anatomy.Part>
        <Anatomy.Part name="Sin responder">Una respuesta vacía en lectura lo dice con todas las letras: una caja en blanco no se distingue de un campo que nadie tocó.</Anatomy.Part>
      </Anatomy>
      <Section title="Respondiendo y ya entregada">
        <Panel>
          <Variant
            name="ya entregada"
            note="Sin `onValueChange` se lee y no se escribe."
            code={`<OpenQuestion value="Porque el buffet junta a los dos turnos al mismo tiempo y el techo es de chapa.">
  <OpenQuestion.Prompt>¿Por qué ese y no otro?</OpenQuestion.Prompt>
</OpenQuestion>`}
          >
            <Stack width="sm">
              <OpenQuestion value="Porque el buffet junta a los dos turnos al mismo tiempo y el techo es de chapa.">
                <OpenQuestion.Prompt>¿Por qué ese y no otro?</OpenQuestion.Prompt>
              </OpenQuestion>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="OpenQuestion" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Poné en el `Hint` qué tiene que aparecer en la respuesta: sin eso, el que escribe adivina cuánto se espera.</Practices.Do>
          <Practices.Do>Dale un tope acorde a lo que pedís: 240 para una justificación de dos renglones, 600 para una conclusión.</Practices.Do>
          <Practices.Dont>No le pidas que sepa la respuesta: no tiene `correct` y no lo va a tener, porque en cuanto una pregunta abierta sabe la respuesta lo que se evalúa es si adivinaste las palabras. Lo que se corrige solo es `Choice`, y lo que mira una persona va con una rúbrica.</Practices.Dont>
          <Practices.Dont>No la uses para un dato que se puede calcular: para un número va `NumberAnswer`, que sabe de unidad y de margen.</Practices.Dont>
          <Practices.Dont>No pongas la respuesta esperada en el `placeholder`: se copia tal cual y deja de decir nada.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El enunciado nombra al campo con `aria-labelledby`, así que un lector dice la pregunta antes de dejar escribir.</A11y.Item>
          <A11y.Item>El contador del campo viaja también por una región viva, así que el aviso de que queda poco no depende de verlo.</A11y.Item>
          <A11y.Item>Leyendo, la respuesta es un párrafo que viene justo después del enunciado, así que se escucha en ese orden. No lleva `aria-labelledby`, que en un párrafo la mayoría de los lectores ignora.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
