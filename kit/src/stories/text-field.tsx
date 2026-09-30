import { useState } from 'react'
import { IconButton } from '@milo/ui/icon-button'
import { Kbd } from '@milo/ui/kbd'
import { TextField } from '@milo/ui/text-field'
import { A11y, Cluster, Demo, Page, Practices, Props, Section } from '../kit'

export function TextFieldStory() {
  const [text, setText] = useState('Fracciones con la receta de la abuela')
  const [query, setQuery] = useState('')

  return (
    <Page
      title="TextField"
      kind="Formularios"
      imports="import { TextField } from '@milo/ui/text-field'"
      lead="Plano: un fondo y una línea de un píxel, sin relieve. El volumen se fue a propósito: el relieve dice 'esto sobresale' o 'esto se aprieta', y un campo no es ninguna de las dos. Al enfocarse se le tiñe el borde que ya tenía: el anillo es para una pieza sin borde propio, y acá dibujaba una segunda línea a dos píxeles."
    >
      <Section title="Variantes">
        <Cluster>
          <Demo width="sm" fill label="solo" code={`<TextField value={text} onValueChange={setText} aria-label="Nombre de la actividad" />`}>
            <TextField value={text} onValueChange={setText} aria-label="Nombre de la actividad" />
          </Demo>
          <Demo width="sm" fill label="con icono" code={`<TextField icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />`}>
            <TextField icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
          </Demo>
          <Demo width="sm" fill label="con suffix" code={`<TextField aria-label="Duración en minutos" placeholder="Duración" suffix={<Kbd>min</Kbd>} />`}>
            <TextField aria-label="Duración en minutos" placeholder="Duración" suffix={<Kbd>min</Kbd>} />
          </Demo>
          <Demo width="sm" fill label="disabled" code={`<TextField aria-label="Campo no editable" placeholder="No editable" disabled />`}>
            <TextField aria-label="Campo no editable" placeholder="No editable" disabled />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Las tres alturas"
        note="Las del Button: un campo y el botón que lo acompaña en la misma fila miden lo mismo. Solo cambia el padding lateral, porque el texto de un campo arranca a la izquierda."
      >
        <Cluster>
          <Demo width="sm" fill label="sm" code={`<TextField size="sm" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />`}>
            <TextField size="sm" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
          </Demo>
          <Demo width="sm" fill label="md" code={`<TextField size="md" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />`}>
            <TextField size="md" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
          </Demo>
          <Demo width="sm" fill label="lg" code={`<TextField size="lg" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />`}>
            <TextField size="lg" icon="search" aria-label="Buscar una actividad" placeholder="Buscar una actividad…" />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="El click y el foco"
        note="Tocar cualquier parte del campo enfoca el cursor, no solo la línea de texto: un campo alto no tiene zonas muertas."
      >
        <Cluster>
          <Demo width="sm" fill label="con botón adentro" code={`<TextField
  value={query}
  onValueChange={setQuery}
  aria-label="Buscar"
  placeholder="Buscar…"
  suffix={<IconButton icon="close" label="Limpiar" variant="ghost" size="sm" onClick={() => setQuery('')} />}
/>`}>
            <TextField
              value={query}
              onValueChange={setQuery}
              aria-label="Buscar"
              placeholder="Buscar…"
              suffix={<IconButton icon="close" label="Limpiar" variant="ghost" size="sm" onClick={() => setQuery('')} />}
            />
          </Demo>
        </Cluster>
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
          <A11y.Item>{'El anillo lo toma el campo y no el <input> de adentro, así que no hay dos marcas de foco.'}</A11y.Item>
          <A11y.Item>Con un botón adentro, el campo no se enciende: la marca es del botón que tiene el foco.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
