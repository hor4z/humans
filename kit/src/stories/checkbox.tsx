import cls from './checkbox.module.css'
import { useState } from 'react'
import { Checkbox } from '@milo/ui/checkbox'
import { A11y, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

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
      lead="Caja de 18, la medida del pulgar del switch, con el radio `xs`: sobre un cuadrado tan chico, el escalón siguiente deja cuatro píxeles de lado recto por lado y la casilla se lee redonda, que es la forma de la opción única."
    >
      <Section
        title="Estados"
        note="Apagada es una caja vacía con su línea, del color del campo que la rodea. Prendida pasa al azul con el tilde en blanco."
      >
        <Panel>
          <Variant name="off / on" code={`<Checkbox checked={unchecked} onCheckedChange={setUnchecked} label="Sin marcar" />
<Checkbox checked={checked} onCheckedChange={setChecked} label="Marcada" />`}>
            <Checkbox checked={unchecked} onCheckedChange={setUnchecked} label="Sin marcar" />
            <Checkbox checked={checked} onCheckedChange={setChecked} label="Marcada" />
          </Variant>
          <Variant name="indeterminate" code={`<Checkbox checked={partial} indeterminate={!partial} onCheckedChange={setPartial} label="Parcial" />`}><Checkbox checked={partial} indeterminate={!partial} onCheckedChange={setPartial} label="Parcial" /></Variant>
          <Variant name="disabled" code={`<Checkbox checked onCheckedChange={setChecked} disabled label="Fija" />
<Checkbox checked={false} onCheckedChange={setChecked} disabled label="Fija" />`}>
            <Checkbox checked onCheckedChange={() => {}} disabled label="Fija" />
            <Checkbox checked={false} onCheckedChange={() => {}} disabled label="Fija" />
          </Variant>
        </Panel>
      </Section>

      <Section title="En una fila" note="Envolvé la casilla en un `<label>`: así el texto también es zona de click, que es la mitad del área útil.">
        <Panel>
          <Variant name="con etiqueta" code={`<label>
  <Checkbox checked={shared} onCheckedChange={setShared} />
  Compartir la receta con el equipo
</label>`}>
            <label className={cls.singleLabel}>
              <Checkbox checked={shared} onCheckedChange={setShared} />
              Compartir la receta con el equipo
            </label>
          </Variant>
          <Variant name="lista" code={`{['Geografía', 'Ciencias', 'Matemática'].map(space => (
  <label key={space}>
    <Checkbox
      checked={spaces.includes(space)}
      onCheckedChange={on => setSpaces(list => (on ? [...list, space] : list.filter(n => n !== space)))}
    />
    {space}
  </label>
))}`}>
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
          <A11y.Item>Es un botón con role="checkbox" y aria-checked, así que un lector lo anuncia con su estado.</A11y.Item>
          <A11y.Item>El `label` lo nombra; sin él, un cuadrado tildado no dice de qué es.</A11y.Item>
          <A11y.Item>Espacio lo alterna, como cualquier casilla nativa.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
