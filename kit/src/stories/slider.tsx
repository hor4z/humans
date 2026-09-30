import { useState } from 'react'
import { Slider } from '@milo/ui/slider'
import { A11y, Anatomy, Frame, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

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
      lead="Permite ajustar un valor dentro de un rango cuando importa más la aproximación que la precisión."
    >
      <Hero>
        <Frame width="sm">
          <Slider value={volume} onValueChange={setVolume} label="Volumen" />
        </Frame>
        <Frame width="sm">
          <Slider value={steps} onValueChange={setSteps} min={0} max={5} step={1} label="Dificultad" />
        </Frame>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Pista" required>El riel. La parte llena va en el azul de marca y la vacía en gris, las mismas recetas que el `Switch`.</Anatomy.Part>
        <Anatomy.Part name="Pulgar" required>El círculo que se agarra. Sobresale del riel, al revés que el del `Switch`, que corre adentro de su canal.</Anatomy.Part>
        <Anatomy.Part name="Input">Un `input type="range"` de verdad debajo, que es lo que recibe el teclado y el foco.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant
            name="Con pasos"
            note="`step` corta el recorrido en saltos, y las flechas avanzan de a uno. Probalo con el teclado: tabulá hasta el slider y usá las flechas."
            code={`<Slider value={steps} onValueChange={setSteps} min={0} max={5} step={1} label="Dificultad" />`}
          >
            <Frame width="sm">
              <Slider value={steps} onValueChange={setSteps} min={0} max={5} step={1} label="Dificultad" />
            </Frame>
          </Variant>
          <Variant
            name="Extremos y deshabilitado"
            note="En 0 y en 100 el pulgar queda entero adentro de la pista."
            code={`<Slider value={low} onValueChange={setLow} label="En cero" />
<Slider value={high} onValueChange={setHigh} label="En cien" />
<Slider value={40} onValueChange={setValue} disabled label="Deshabilitado" />`}
          >
            <Frame width="sm">
              <Slider value={low} onValueChange={setLow} label="En cero" />
            </Frame>
            <Frame width="sm">
              <Slider value={high} onValueChange={setHigh} label="En cien" />
            </Frame>
            <Frame width="sm">
              <Slider value={40} onValueChange={() => {}} disabled label="Deshabilitado" />
            </Frame>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Slider" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Es el hermano del `Switch` y no tiene recetas propias: los dos son una píldora con una pieza redonda encima, así que el día que cambie el relieve de uno tiene que cambiar el del otro.</Practices.Do>
          <Practices.Do>El azul no se elige acá: el pulgar va en `--switch-on` y `--brand`, el de lo que quien lo usa prendió o confirmó, sin un hex nuevo.</Practices.Do>
          <Practices.Do>Va cuando el valor exacto no importa: lo que se elige es más o menos, no un número.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es un `<input type="range">` de verdad: flechas, Home, End y PageUp funcionan solas.'}</A11y.Item>
          <A11y.Item>El pulgar dibujado toma el foco del input que hay debajo.</A11y.Item>
          <A11y.Item>El `label` lo nombra aunque en pantalla no haya texto al lado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
