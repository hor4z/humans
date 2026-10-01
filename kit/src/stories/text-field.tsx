import { useState } from 'react'
import { IconButton } from '@humans/ui/icon-button'
import { Field } from '@humans/ui/field'
import { Kbd } from '@humans/ui/kbd'
import { TextField } from '@humans/ui/text-field'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function TextFieldStory() {
  const [text, setText] = useState('Fracciones con la receta de la abuela')
  const [query, setQuery] = useState('')
  const [name, setName] = useState('')

  return (
    <Page
      title="TextField"
      kind="Formularios"
      imports="import { TextField } from '@humans/ui/text-field'"
      lead="Recoge texto en una línea, con iconos o contenido complementario opcional."
    >
      <Hero>
        <Stack gap="md" width="sm">
          <TextField value={text} onValueChange={setText} aria-label="Nombre de la actividad" />
          <TextField icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
          <TextField aria-label="Duración en minutos" placeholder="Duración" suffix={<Kbd>min</Kbd>} />
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Caja" required>El fondo y la línea de un píxel: tocar cualquier parte enfoca el cursor.</Anatomy.Part>
        <Anatomy.Part name="Icono">`icon`: un glifo a la izquierda, en gris.</Anatomy.Part>
        <Anatomy.Part name="Texto" required>El `input` de adentro, con su `placeholder` cuando está vacío.</Anatomy.Part>
        <Anatomy.Part name="Contenido final">`suffix`: una unidad, un atajo o un botón, a la derecha.</Anatomy.Part>
      </Anatomy>

      <Section title="Variantes y alturas">
        <Panel>
          <Variant
            name="solo · con icono · con suffix"
            note="Con un botón adentro el campo no se enciende: la marca de foco es del botón."
            code={`<TextField value={text} onValueChange={setText} aria-label="Nombre de la actividad" />
<TextField icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
<TextField aria-label="Duración en minutos" placeholder="Duración" suffix={<Kbd>min</Kbd>} />
<TextField
  value={query}
  onValueChange={setQuery}
  aria-label="Buscar"
  placeholder="Buscar…"
  suffix={<IconButton icon="close" label="Limpiar" variant="ghost" size="sm" onClick={() => setQuery('')} />}
/>`}
          >
            <Stack gap="md" width="sm">
              <TextField value={text} onValueChange={setText} aria-label="Nombre de la actividad" />
              <TextField icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
              <TextField aria-label="Duración en minutos" placeholder="Duración" suffix={<Kbd>min</Kbd>} />
              <TextField
                value={query}
                onValueChange={setQuery}
                aria-label="Buscar"
                placeholder="Buscar…"
                suffix={<IconButton icon="close" label="Limpiar" variant="ghost" size="sm" onClick={() => setQuery('')} />}
              />
            </Stack>
          </Variant>
          <Variant
            name="Apagado"
            note="No se edita ni recibe el foco, y va en gris."
            code={`<TextField aria-label="Nombre de la actividad publicada" value="Fracciones equivalentes" disabled />`}
          >
            <Stack gap="md" width="sm">
              <TextField aria-label="Nombre de la actividad publicada" value="Fracciones equivalentes" disabled />
            </Stack>
          </Variant>
          <Variant
            name="Con error"
            note="`Field.Error` pinta la línea del campo en rojo y dice qué hacer para seguir."
            code={`<Field>
  <Field.Label>Nombre de la actividad</Field.Label>
  <TextField value={name} onValueChange={setName} placeholder="Fracciones con la receta de la abuela" />
  <Field.Error>Escribí un nombre para la actividad.</Field.Error>
</Field>`}
          >
            <Stack gap="md" width="sm">
              <Field>
                <Field.Label>Nombre de la actividad</Field.Label>
                <TextField value={name} onValueChange={setName} placeholder="Fracciones con la receta de la abuela" />
                <Field.Error>Escribí un nombre para la actividad.</Field.Error>
              </Field>
            </Stack>
          </Variant>
          <Variant
            name="sm · md · lg"
            note="Las del `Button`: un campo y el botón que lo acompaña en la misma fila miden lo mismo. Solo cambia el padding lateral, porque el texto de un campo arranca a la izquierda."
            code={`<TextField size="sm" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
<TextField size="md" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
<TextField size="lg" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />`}
          >
            <Stack gap="md" width="sm">
              <TextField size="sm" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
              <TextField size="md" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
              <TextField size="lg" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="TextField" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Adentro de un `Field` no lleva `label`: lo toma de la etiqueta de alrededor.</Practices.Do>
          <Practices.Dont>El placeholder no reemplaza a la etiqueta: desaparece justo cuando hace falta.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El área clickeable es la caja entera y no solo la línea de texto de 16px.</A11y.Item>
          <A11y.Item>{'El anillo lo toma el campo y no el `<input>` de adentro, así que no hay dos marcas de foco.'}</A11y.Item>
          <A11y.Item>Con un botón adentro, el campo no se enciende: la marca es del botón que tiene el foco.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
