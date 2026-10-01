import { useState } from 'react'
import { Field } from '@humans/ui/field'
import { useDebounce } from '@humans/ui/lib/use-debounce'
import { Search } from '@humans/ui/search'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const activities = ['Fracciones equivalentes', 'Fracciones en la recta', 'El texto instructivo', 'Ángulos y triángulos', 'Proporcionalidad directa']

export function SearchStory() {
  const [heroEmpty, setHeroEmpty] = useState('')
  const [heroFilled, setHeroFilled] = useState('fracciones')
  const [first, setFirst] = useState('')
  const [three, setThree] = useState('')
  const [large, setLarge] = useState('')
  const [empty, setEmpty] = useState('')
  const [filled, setFilled] = useState('6.º B')
  const [query, setQuery] = useState('')
  const [short, setShort] = useState('fr')
  const searched = useDebounce(query, 250)
  const results = activities.filter(a => a.toLowerCase().includes(searched.trim().toLowerCase()))

  return (
    <Page
      title="Search"
      kind="Formularios"
      lead="Permite buscar contenido y limpiar la consulta con una acción visible."
      imports="import { Search } from '@humans/ui/search'"
    >
      <Hero>
        <Search size="md" value={heroEmpty} onValueChange={setHeroEmpty} shortcut="/" placeholder="Buscar una actividad" />
        <Search size="md" value={heroFilled} onValueChange={setHeroFilled} shortcut="/" placeholder="Buscar una actividad" />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Lupa">El icono de la izquierda, que dice qué es el campo.</Anatomy.Part>
        <Anatomy.Part name="Campo" required>El texto que se escribe, con su `placeholder`.</Anatomy.Part>
        <Anatomy.Part name="Atajo">`shortcut`: la tecla que recuerda cómo llegar, cuando el campo está vacío.</Anatomy.Part>
        <Anatomy.Part name="Cruz">Aparece con algo escrito, en el mismo lugar del atajo, y vacía el campo.</Anatomy.Part>
      </Anatomy>

      <Section title="Alturas, atajo y lista">
        <Panel>
          <Variant
            name="sm · md · lg"
            note="`sm` en la barra de una tabla, `md` en la de una pantalla, `lg` cuando el buscador **es** la pantalla."
            code={`<Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />
<Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />
<Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />`}
          >
            <Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />
            <Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />
            <Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />
          </Variant>
          <Variant
            name="atajo o cruz"
            note="Escribí en el primero y borrá el segundo para ver cómo se turnan el mismo lugar."
            code={`<Search size="md" value={empty} onValueChange={setEmpty} shortcut="/" placeholder="Buscar" />
<Search size="md" value={filled} onValueChange={setFilled} shortcut="/" placeholder="Buscar" />`}
          >
            <Search size="md" value={empty} onValueChange={setEmpty} shortcut="/" placeholder="Buscar" />
            <Search size="md" value={filled} onValueChange={setFilled} shortcut="/" placeholder="Buscar" />
          </Variant>
          <Variant
            name="Apagado"
            note="No se escribe ni recibe el foco, y va en gris."
            code={`<Search value="" onValueChange={setShort} aria-label="Buscar en un curso archivado" placeholder="Buscar en un curso archivado" disabled />`}
          >
            <Stack gap="md" width="sm">
              <Search value="" onValueChange={setShort} aria-label="Buscar en un curso archivado" placeholder="Buscar en un curso archivado" disabled />
            </Stack>
          </Variant>
          <Variant
            name="Con error"
            note="`Field.Error` pinta la línea del campo en rojo y dice qué falta para buscar."
            code={`<Field>
  <Field.Label>Buscar una actividad</Field.Label>
  <Search value={short} onValueChange={setShort} placeholder="Fracciones, ángulos, proporciones" />
  <Field.Error>Escribí al menos tres letras para buscar.</Field.Error>
</Field>`}
          >
            <Stack gap="md" width="sm">
              <Field>
                <Field.Label>Buscar una actividad</Field.Label>
                <Search value={short} onValueChange={setShort} placeholder="Fracciones, ángulos, proporciones" />
                <Field.Error>Escribí al menos tres letras para buscar.</Field.Error>
              </Field>
            </Stack>
          </Variant>
          <Demo label="Contra una lista: filtra recién cuando dejás de escribir" note="Va arriba de una lista que ya está en pantalla, como las actividades de un curso, para achicarla sin cambiar de página. Escribí fracciones y quedan dos." width="md" code={`const [query, setQuery] = useState('')
const searched = useDebounce(query, 250)
const results = activities.filter(a => a.toLowerCase().includes(searched.trim().toLowerCase()))

<Search value={query} onValueChange={setQuery} placeholder="Buscar una actividad" />
<ul>
  {results.map(a => <li key={a}>{a}</li>)}
</ul>`}>
            <Stack gap="md">
              <Search value={query} onValueChange={setQuery} placeholder="Buscar una actividad" />
              <ul>
                {results.map(a => <li key={a}>{a}</li>)}
              </ul>
            </Stack>
          </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Search" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El atajo y la cruz ocupan el mismo lugar: vacío hace falta saber cómo llegar, y con algo escrito, cómo salir. Nunca los dos a la vez.</Practices.Do>
          <Practices.Do>Es controlado: el texto lo guarda quien lo usa, y `onValueChange` recibe vacío al limpiar.</Practices.Do>
          <Practices.Do>Para filtrar contra datos, pasá el valor por `useDebounce` antes de buscar.</Practices.Do>
          <Practices.Dont>`shortcut` es un recordatorio, no la tecla: el atajo lo escucha quien lo pone.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'La cruz devuelve el foco al campo al vaciarlo: se desmonta al desaparecer, y sin eso el foco se cae al `<body>`.'}</A11y.Item>
          <A11y.Item>El atajo no se apropia de una tecla global: el evento lo escucha quien pone el buscador.</A11y.Item>
          <A11y.Item>`ref` va al `input` y no al contenedor: es lo que un atajo necesita para enfocarlo desde afuera.</A11y.Item>
          <A11y.Item>El campo se nombra con `aria-label` o con un `Field` alrededor: un placeholder desaparece al escribir y deja de nombrar nada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
