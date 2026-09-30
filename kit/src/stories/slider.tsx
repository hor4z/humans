import { useState } from 'react'
import { Slider } from '@milo/ui/slider'
import { A11y, Footnote, Frame, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SliderStory() {
  const [volume, setVolume] = useState(59)
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(100)
  const [steps, setSteps] = useState(3)

  return (
    <Page
      title="Slider"
      kind="Formularios"
      imports="import { Slider } from '@milo/ui/slider'"
      lead="El hermano del switch, y por eso no tiene recetas propias: la pista llena, la vacía y el pulgar son los del switch. Los dos son una píldora con una pieza redonda encima, así que el día que cambie el relieve de uno tiene que cambiar el del otro."
    >
      <Section
        title="La pieza"
        note="El pulgar sobresale del riel y se agarra, al revés que el del `Switch`, que corre adentro de su canal. Esa es la diferencia entre elegir un valor y prender algo."
      >
        <Panel>
          <Variant name={`valor ${volume}`} code={`<Slider value={volume} onValueChange={setVolume} label="Volumen" />`}>
            <Frame width="sm">
              <Slider value={volume} onValueChange={setVolume} label="Volumen" />
            </Frame>
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Los extremos"
        note="En 0 y en 100 el pulgar queda entero adentro de la pista."
      >
        <Panel>
          <Variant name="en 0" code={`<Slider value={low} onValueChange={setLow} label="En cero" />`}>
            <Frame width="sm">
              <Slider value={low} onValueChange={setLow} label="En cero" />
            </Frame>
          </Variant>
          <Variant name="en 100" code={`<Slider value={high} onValueChange={setHigh} label="En cien" />`}>
            <Frame width="sm">
              <Slider value={high} onValueChange={setHigh} label="En cien" />
            </Frame>
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Con pasos"
        note="`step` corta el recorrido en saltos, y las flechas avanzan de a uno."
      >
        <Panel>
          <Variant name={`${steps} de 5 · step 1, max 5`} code={`<Slider value={steps} onValueChange={setSteps} min={0} max={5} step={1} label="Dificultad" />`}>
            <Frame width="sm">
              <Slider value={steps} onValueChange={setSteps} min={0} max={5} step={1} label="Dificultad" />
            </Frame>
          </Variant>
        </Panel>
        <Footnote>Probalo con el teclado: tabulá hasta el slider y usá las flechas.</Footnote>
      </Section>

      <Section title="Deshabilitado">
        <Panel>
          <Variant name="disabled" code={`<Slider value={40} onValueChange={setValue} disabled label="Deshabilitado" />`}>
            <Frame width="sm">
              <Slider value={40} onValueChange={() => {}} disabled label="Deshabilitado" />
            </Frame>
          </Variant>
        </Panel>
      </Section>

      <Section
        title="El azul no se elige acá"
        note="El pulgar va en `--switch-on` y `--brand`, el azul de lo que el usuario prendió o confirmó, sin un hex nuevo."
      />

      <Section title="Props">
        <Props of="Slider" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Va cuando el valor exacto no importa: lo que se elige es más o menos, no un número.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es un <input type="range"> de verdad: flechas, Home, End y PageUp funcionan solas.'}</A11y.Item>
          <A11y.Item>El pulgar dibujado toma el foco del input que hay debajo.</A11y.Item>
          <A11y.Item>El label lo nombra aunque en pantalla no haya texto al lado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
