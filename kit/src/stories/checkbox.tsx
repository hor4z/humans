import { useState } from 'react'
import { Checkbox } from '@humans/ui/checkbox'
import { Field } from '@humans/ui/field'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function CheckboxStory() {
  const [spaces, setSpaces] = useState<string[]>(['Ciencias'])
  const [partial, setPartial] = useState(false)
  const [checked, setChecked] = useState(true)
  const [unchecked, setUnchecked] = useState(false)
  const [shared, setShared] = useState(true)
  const [reviewed, setReviewed] = useState(false)
  const [sizes, setSizes] = useState(true)

  return (
    <Page
      title="Checkbox"
      kind="Formularios"
      imports="import { Checkbox } from '@humans/ui/checkbox'"
      lead="Permite activar una opción independiente o seleccionar varias opciones de una lista."
    >
      <Hero>
        <Stack gap="sm">
          <Checkbox checked={partial} indeterminate={!partial} onCheckedChange={setPartial}>Todo el curso</Checkbox>
          <Checkbox checked={checked} onCheckedChange={setChecked}>Ciencias</Checkbox>
          <Checkbox checked={unchecked} onCheckedChange={setUnchecked}>Geografía</Checkbox>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Caja" required>El cuadrado de 20, o de 16 y 24 con `size`. Apagada es una caja vacía con su línea, del color del campo que la rodea.</Anatomy.Part>
        <Anatomy.Part name="Marca">El tilde en blanco sobre el azul cuando está marcada, o la raya cuando es `indeterminate`.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta">El texto que la nombra, como hijo: se toca junto con la caja y la caja se centra contra el primer renglón. Sin texto a la vista, `label` le da el nombre.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant
            name="Apagadas"
            note="No se tocan ni reciben el foco, y van en el gris de la rampa: marcada o vacía, la caja dice su estado sin el azul."
            code={`<Checkbox checked onCheckedChange={() => {}} disabled>Ciencias, que la eligió la escuela</Checkbox>
<Checkbox checked={false} onCheckedChange={() => {}} disabled>Educación Física, que ya cerró</Checkbox>`}
          >
            <Stack gap="sm">
              <Checkbox checked onCheckedChange={() => {}} disabled>Ciencias, que la eligió la escuela</Checkbox>
              <Checkbox checked={false} onCheckedChange={() => {}} disabled>Educación Física, que ya cerró</Checkbox>
            </Stack>
          </Variant>
          <Variant
            name="Con error"
            note="Lo pone `Field.Error`: la caja pasa a rojo y el texto de abajo dice qué hacer para seguir."
            code={`<Field>
  <Field.Label>Revisé las notas del trimestre</Field.Label>
  <Checkbox checked={reviewed} onCheckedChange={setReviewed} />
  <Field.Error>Marcá la casilla para cerrar el trimestre.</Field.Error>
</Field>`}
          >
            <Field>
              <Field.Label>Revisé las notas del trimestre</Field.Label>
              <Checkbox checked={reviewed} onCheckedChange={setReviewed} />
              <Field.Error>Marcá la casilla para cerrar el trimestre.</Field.Error>
            </Field>
          </Variant>
          <Variant
            name="En una lista"
            note="El texto va como hijo: así también es zona de toque, que es la mitad del área útil. Si ocupa dos renglones, la caja queda contra el primero."
            code={`<Checkbox checked={shared} onCheckedChange={setShared}>
  Compartir la receta con el equipo, para que cada docente la adapte a su curso
</Checkbox>
{['Geografía', 'Ciencias', 'Matemática'].map(space => (
  <Checkbox
    key={space}
    checked={spaces.includes(space)}
    onCheckedChange={on => setSpaces(list => (on ? [...list, space] : list.filter(n => n !== space)))}
  >
    {space}
  </Checkbox>
))}`}
          >
            <Stack gap="sm" width="sm">
              <Checkbox checked={shared} onCheckedChange={setShared}>
                Compartir la receta con el equipo, para que cada docente la adapte a su curso
              </Checkbox>
              {['Geografía', 'Ciencias', 'Matemática'].map(space => (
                <Checkbox
                  key={space}
                  checked={spaces.includes(space)}
                  onCheckedChange={on => setSpaces(list => (on ? [...list, space] : list.filter(n => n !== space)))}
                >
                  {space}
                </Checkbox>
              ))}
            </Stack>
          </Variant>
          <Variant
            name="sm · md · lg"
            note="La caja mide el interlineado de su texto: `sm` va con la letra chica de una tabla, `md` con la del cuerpo y `lg` con la de lectura. El texto toma la letra de su tamaño solo."
            code={`<Checkbox size="sm" checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>
<Checkbox checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>
<Checkbox size="lg" checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>`}
          >
            <Stack gap="md">
              <Checkbox size="sm" checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>
              <Checkbox checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>
              <Checkbox size="lg" checked={sizes} onCheckedChange={setSizes}>Entregó a tiempo</Checkbox>
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
          <A11y.Item>{'El texto de al lado es su nombre, porque va en un `<label>` de verdad. Sin texto a la vista, `label` lo nombra; sin ninguno de los dos, un cuadrado tildado no dice de qué es.'}</A11y.Item>
          <A11y.Item>Espacio lo alterna, como cualquier casilla nativa.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
