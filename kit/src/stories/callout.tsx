import s from './callout.module.css'
import { Callout } from '@milo/ui/blocks/editor/callout'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section, Stack } from '../kit'

export function CalloutStory() {
  return (
    <Page
      title="Callout"
      kind="Editor"
      imports="import { Callout } from '@milo/ui/blocks/editor/callout'"
      lead="Un bloque de contenido que pide detenerse: una aclaración, una pista, algo para recordar. Lo escribe quien arma el material, no el sistema."
    >
      <Hero>
        <Stack width="xl">
          <Callout icon="lightbulb" color="blue">
            <Callout.Title>Para acordarse</Callout.Title>
            La velocidad límite no depende de la masa: depende de la forma y del aire.
          </Callout>
          <Callout icon="science" color="green">
            <Callout.Title>Probalo</Callout.Title>
            Soltá una hoja abierta y la misma hoja hecha un bollo. Cronometrá las dos.
          </Callout>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Superficie" required>El papel teñido con el color de la familia de categorías, sin borde.</Anatomy.Part>
        <Anatomy.Part name="Glifo">`icon`: decorativo, en la tinta del color.</Anatomy.Part>
        <Anatomy.Part name="Título">`Callout.Title`: lo que el bloque es, en una palabra o dos.</Anatomy.Part>
        <Anatomy.Part name="Contenido" required>El texto, en tamaño de lectura. Puede entrar solo en una línea, sin título ni glifo.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
        <Demo label="Con título y glifo, y sin ninguno" code={`<Callout icon="lightbulb" color="blue">
  <Callout.Title>Para acordarse</Callout.Title>
  La velocidad límite no depende de la masa: depende de la forma y del aire.
</Callout>
<Callout icon="science" color="green">
  <Callout.Title>Probalo</Callout.Title>
  Soltá una hoja abierta y la misma hoja hecha un bollo. Cronometrá las dos.
</Callout>
<Callout icon="visibility" color="orange">
  <Callout.Title>Ojo con esto</Callout.Title>
  Dos figuras con el mismo perímetro pueden tener áreas muy distintas.
</Callout>
<Callout>Todo lo que sigue supone que el rozamiento es despreciable.</Callout>`}>
          <Stack width="xl">
            <Callout icon="lightbulb" color="blue">
              <Callout.Title>Para acordarse</Callout.Title>
              La velocidad límite no depende de la masa: depende de la forma y del aire.
            </Callout>
            <Callout icon="science" color="green">
              <Callout.Title>Probalo</Callout.Title>
              Soltá una hoja abierta y la misma hoja hecha un bollo. Cronometrá las dos.
            </Callout>
            <Callout icon="visibility" color="orange">
              <Callout.Title>Ojo con esto</Callout.Title>
              Dos figuras con el mismo perímetro pueden tener áreas muy distintas.
            </Callout>
            <Callout>Todo lo que sigue supone que el rozamiento es despreciable.</Callout>
          </Stack>
        </Demo>

        <Demo label="Los colores" code={`<Callout color="neutral" icon="label">neutral</Callout>
<Callout color="blue" icon="label">blue</Callout>
<Callout color="green" icon="label">green</Callout>
<Callout color="teal" icon="label">teal</Callout>
<Callout color="purple" icon="label">purple</Callout>
<Callout color="pink" icon="label">pink</Callout>
<Callout color="orange" icon="label">orange</Callout>`}>
          <div className={s.colorGrid}>
            {(['neutral', 'blue', 'green', 'teal', 'purple', 'pink', 'orange'] as const).map(c => (
              <Callout key={c} color={c} icon="label">{c}</Callout>
            ))}
          </div>
        </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Callout" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El color sale de la familia de categorías, no de los tonos de estado: un bloque de contenido no avisa de nada.</Practices.Do>
          <Practices.Do>Los colores distinguen un bloque de otro cuando hay varios en una página, no dicen si algo está bien o mal.</Practices.Do>
          <Practices.Dont>No lo uses para un error ni para algo que pasa: eso es un [Alert](#alert). El `Callout` es parte de lo que se lee y sigue ahí aunque nadie haga nada; por eso no usa los tonos de estado, un bloque en rojo diría "error" sin que haya ninguno.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Lleva `role="note"`: se anuncia como una nota al margen sin sumar una región. Con once bloques en una página, once regiones dejarían la lista de saltos inservible.</A11y.Item>
          <A11y.Item>El glifo es decorativo. Lo que el bloque dice está en su texto, así que sacarlo no pierde nada.</A11y.Item>
          <A11y.Item>El color nunca es la única diferencia: el título y el glifo dicen de qué se trata.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
