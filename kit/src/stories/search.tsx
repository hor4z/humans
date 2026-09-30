import { useState } from 'react'
import { useDebounce } from '@milo/ui/lib/use-debounce'
import { Search } from '@milo/ui/search'
import { A11y, Demo, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const activities = ['Fracciones equivalentes', 'Fracciones en la recta', 'El texto instructivo', 'Ángulos y triángulos', 'Proporcionalidad directa']

export function SearchStory() {
  const [first, setFirst] = useState('')
  const [two, setTwo] = useState('fracciones')
  const [three, setThree] = useState('')
  const [large, setLarge] = useState('')
  const [shortcut, setShortcut] = useState('')
  const [empty, setEmpty] = useState('')
  const [filled, setFilled] = useState('6.º B')
  const [query, setQuery] = useState('')
  const searched = useDebounce(query, 250)
  const results = activities.filter(a => a.toLowerCase().includes(searched.trim().toLowerCase()))

  return (
    <Page
      title="Search"
      kind="Formularios"
      lead="Un campo con la lupa y una cruz que aparece cuando hay algo escrito. Es un `TextField` por dentro y no un campo aparte: se dibuja igual que los otros y hereda su inversión contra el fondo."
      imports="import { Search } from '@milo/ui/search'"
    >
      <Section
        title="Las tres alturas"
        note="`sm` en la barra de una tabla, `md` en la de una pantalla, `lg` cuando el buscador **es** la pantalla."
      >
        <Panel>
          <Variant name="sm" code={`<Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />`}>
            <Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />
          </Variant>
          <Variant name="md" code={`<Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />`}>
            <Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />
          </Variant>
          <Variant name="lg" code={`<Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />`}>
            <Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />
          </Variant>
          <Variant name="con texto" code={`<Search placeholder="Buscar una actividad" size="md" value={two} onValueChange={setTwo} />`}>
            <Search placeholder="Buscar una actividad" size="md" value={two} onValueChange={setTwo} />
          </Variant>
          <Variant name="con atajo" code={`<Search size="md" value={shortcut} onValueChange={setShortcut} shortcut="/" placeholder="Buscar" />`}>
            <Search size="md" value={shortcut} onValueChange={setShortcut} shortcut="/" placeholder="Buscar" />
          </Variant>
        </Panel>
      </Section>

      <Section
        title="El atajo y la cruz ocupan el mismo lugar"
        note="Vacío hace falta saber cómo llegar; con algo escrito, cómo salir. Nunca los dos a la vez. Escribí en el primero y borrá el segundo."
      >
        <Panel>
          <Variant name="vacío · el atajo" code={`<Search placeholder="Buscar una actividad" value={empty} onValueChange={setEmpty} shortcut="/" />`}>
            <Search placeholder="Buscar una actividad" value={empty} onValueChange={setEmpty} shortcut="/" />
          </Variant>
          <Variant name="con texto · la cruz" code={`<Search placeholder="Buscar una actividad" value={filled} onValueChange={setFilled} shortcut="/" />`}>
            <Search placeholder="Buscar una actividad" value={filled} onValueChange={setFilled} shortcut="/" />
          </Variant>
        </Panel>
      </Section>

      <Section title="Contra una lista">
        <Demo label="Filtra recién cuando dejás de escribir" width="md" code={`const [query, setQuery] = useState('')
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
      </Section>

      <Section title="Props">
        <Props of="Search" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
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
