import cls from './checkbox.module.css'
import { useState } from 'react'
import { Checkbox } from '@milo/ui/checkbox'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function CheckboxStory() {
  const [spaces, setSpaces] = useState<string[]>(['Ciencias'])
  const [partial, setPartial] = useState(false)
  const [checked, setChecked] = useState(true)
  const [unchecked, setUnchecked] = useState(false)
  const [shared, setShared] = useState(true)

  return (
    <Page
      title="Checkbox"
      kind="Formularios"
      imports="import { Checkbox } from '@milo/ui/checkbox'"
      lead="Permite activar una opción independiente o seleccionar varias opciones de una lista."
    >
      <Hero>
        <Checkbox checked={unchecked} onCheckedChange={setUnchecked} label="Sin marcar" />
        <Checkbox checked={checked} onCheckedChange={setChecked} label="Marcada" />
        <Checkbox checked={partial} indeterminate={!partial} onCheckedChange={setPartial} label="Parcial" />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Caja" required>El cuadrado de 18. Apagada es una caja vacía con su línea, del color del campo que la rodea.</Anatomy.Part>
        <Anatomy.Part name="Marca">El tilde en blanco sobre el azul cuando está marcada, o la raya cuando es `indeterminate`.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta">{'El texto que la nombra, con `label` o envolviendo la casilla en un `<label>`.'}</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant
            name="Deshabilitadas"
            note="Apagadas, no se tocan ni reciben el foco."
            code={`<Checkbox checked onCheckedChange={setChecked} disabled label="Fija" />
<Checkbox checked={false} onCheckedChange={setChecked} disabled label="Fija" />`}
          >
            <Checkbox checked onCheckedChange={() => {}} disabled label="Fija" />
            <Checkbox checked={false} onCheckedChange={() => {}} disabled label="Fija" />
          </Variant>
          <Variant
            name="En una fila"
            note="Envolvé la casilla en un `<label>`: así el texto también es zona de click, que es la mitad del área útil."
            code={`<label>
  <Checkbox checked={shared} onCheckedChange={setShared} />
  Compartir la receta con el equipo
</label>
{['Geografía', 'Ciencias', 'Matemática'].map(space => (
  <label key={space}>
    <Checkbox
      checked={spaces.includes(space)}
      onCheckedChange={on => setSpaces(list => (on ? [...list, space] : list.filter(n => n !== space)))}
    />
    {space}
  </label>
))}`}
          >
            <label className={cls.singleLabel}>
              <Checkbox checked={shared} onCheckedChange={setShared} />
              Compartir la receta con el equipo
            </label>
            <Stack gap="sm">
              {['Geografía', 'Ciencias', 'Matemática'].map(space => (
                <label key={space} className={cls.itemLabel}>
                  <Checkbox
                    checked={spaces.includes(space)}
                    onCheckedChange={on => setSpaces(list => (on ? [...list, space] : list.filter(n => n !== space)))}
                  />
                  {space}
                </label>
              ))}
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Checkbox" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Adentro de un `Field` o de un `Row` no lleva `label`: ya lo nombra la etiqueta de afuera.</Practices.Do>
          <Practices.Dont>Para prender y apagar una preferencia va `Switch`, que se lee como una llave de luz.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un botón con `role="checkbox"` y `aria-checked`, así que un lector lo anuncia con su estado.</A11y.Item>
          <A11y.Item>El `label` lo nombra; sin él, un cuadrado tildado no dice de qué es.</A11y.Item>
          <A11y.Item>Espacio lo alterna, como cualquier casilla nativa.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
