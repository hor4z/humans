import { useState } from 'react'
import { useDebounce } from '@milo/ui/lib/use-debounce'
import { Search } from '@milo/ui/search'
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
  const searched = useDebounce(query, 250)
  const results = activities.filter(a => a.toLowerCase().includes(searched.trim().toLowerCase()))

  return (
    <Page
      title="Search"
      kind="Formularios"
      lead="Un campo con la lupa y una cruz que aparece cuando hay algo escrito. Es un `TextField` por dentro y no un campo aparte: se dibuja igual que los otros y hereda su inversión contra el fondo."
      imports="import { Search } from '@milo/ui/search'"
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
            note="`sm` en la barra de una tabla, `md` en la de una pantalla, `lg` cuando el buscador **es** la pantalla. Escribí en el de atajo y borrá el de la cruz para ver cómo cambian de lugar."
            code={`<Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />
<Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />
<Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />
<Search size="md" value={empty} onValueChange={setEmpty} shortcut="/" placeholder="Buscar" />
<Search size="md" value={filled} onValueChange={setFilled} shortcut="/" placeholder="Buscar" />`}
          >
            <Search size="sm" value={first} onValueChange={setFirst} placeholder="Buscar una actividad" />
            <Search size="md" value={three} onValueChange={setThree} placeholder="Buscar una actividad" />
            <Search size="lg" value={large} onValueChange={setLarge} placeholder="Buscar una actividad" />
            <Search size="md" value={empty} onValueChange={setEmpty} shortcut="/" placeholder="Buscar" />
            <Search size="md" value={filled} onValueChange={setFilled} shortcut="/" placeholder="Buscar" />
          </Variant>
          <Demo label="Contra una lista: filtra recién cuando dejás de escribir" width="md" code={`const [query, setQuery] = useState('')
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
