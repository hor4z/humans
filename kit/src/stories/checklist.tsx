import { useState } from 'react'
import { Checklist } from '@humans/ui/blocks/editor/checklist'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function ChecklistStory() {
  const [connected, setConnected] = useState(false)
  const [level, setLevel] = useState(2)
  const toggleConnected = () => setConnected(v => !v)

  return (
    <Page
      title="Checklist"
      kind="Editor"
      imports="import { Checklist } from '@humans/ui/blocks/editor/checklist'"
      lead="Presenta una secuencia de tareas con su progreso y detalles expandibles."
    >
      <Hero>
        <Stack width="md">
          <Checklist defaultOpen>
            <Checklist.Title>Los cuatro estados</Checklist.Title>
            <Checklist.Item state="done">Hecho</Checklist.Item>
            <Checklist.Item state="doing">En curso</Checklist.Item>
            <Checklist.Item state="todo">Todavía no</Checklist.Item>
            <Checklist.Item state="blocked" hint="Falta el anterior">Trabado</Checklist.Item>
          </Checklist>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Cabecera" required>`Checklist.Title` con el contador y la barra de cuánto va hecho. Es el botón que pliega y despliega.</Anatomy.Part>
        <Anatomy.Part name="Paso" required>`Checklist.Item` con su marca. `done` ya está, `doing` es el de ahora, `todo` es el que falta y `blocked` el que todavía no se puede hacer.</Anatomy.Part>
        <Anatomy.Part name="Aviso del paso">`hint` de un paso trabado: dice por qué no se puede hacer todavía.</Anatomy.Part>
        <Anatomy.Part name="Pie">`Checklist.Footer`: una aclaración al final, con `hint` para la letra chica.</Anatomy.Part>
      </Anatomy>
      <Section title="Plegada, abierta y compacta">
        <Panel>
          <Variant
            name="plegada"
            note="Una fila: el nombre, cuánto va y nada más. Es como vive el otro 90% del tiempo."
            code={`<Checklist>
  <Checklist.Title>Primeros pasos</Checklist.Title>
  <Checklist.Item state="done">Creá tu primer espacio</Checklist.Item>
  <Checklist.Item state="done">Sumá a tus estudiantes</Checklist.Item>
  <Checklist.Item state="done">Publicá una actividad</Checklist.Item>
  <Checklist.Item state="doing">Ajustá tus preferencias</Checklist.Item>
</Checklist>`}
          >
            <Stack width="md">
              <Checklist>
                <Checklist.Title>Primeros pasos</Checklist.Title>
                <Checklist.Item state="done">Creá tu primer espacio</Checklist.Item>
                <Checklist.Item state="done">Sumá a tus estudiantes</Checklist.Item>
                <Checklist.Item state="done">Publicá una actividad</Checklist.Item>
                <Checklist.Item state="doing">Ajustá tus preferencias</Checklist.Item>
              </Checklist>
            </Stack>
          </Variant>
          <Variant
            name="abierta"
            note="Tocá el segundo paso: el tercero deja de estar trabado."
            code={`<Checklist defaultOpen>
  <Checklist.Title>Primeros pasos</Checklist.Title>
  <Checklist.Item state="done">Creá tu primer espacio</Checklist.Item>
  <Checklist.Item state={connected ? 'done' : 'doing'} onClick={toggleConnected}>
    Conectá tu cuenta de la escuela
  </Checklist.Item>
  <Checklist.Item
    state={connected ? 'todo' : 'blocked'}
    hint={connected ? '' : 'Primero hace falta conectar la cuenta de la escuela'}
  >
    Sumá a tus estudiantes
  </Checklist.Item>
  <Checklist.Item>Ajustá tus preferencias</Checklist.Item>
  <Checklist.Footer>Podés volver acá desde el menú de tu cuenta.</Checklist.Footer>
</Checklist>`}
          >
            <Stack width="md">
              <Checklist defaultOpen>
                <Checklist.Title>Primeros pasos</Checklist.Title>
                <Checklist.Item state="done">Creá tu primer espacio</Checklist.Item>
                <Checklist.Item
                  state={connected ? 'done' : 'doing'}
                  onClick={toggleConnected}
                >
                  Conectá tu cuenta de la escuela
                </Checklist.Item>
                <Checklist.Item
                  state={connected ? 'todo' : 'blocked'}
                  hint={connected ? '' : 'Primero hace falta conectar la cuenta de la escuela'}
                >
                  Sumá a tus estudiantes
                </Checklist.Item>
                <Checklist.Item>Ajustá tus preferencias</Checklist.Item>
                <Checklist.Footer>Podés volver acá desde el menú de tu cuenta.</Checklist.Footer>
              </Checklist>
            </Stack>
          </Variant>
          <Variant
            name="compacta"
            note={'`size="sm"` para un riel angosto: el título y los pasos van los dos en texto de cuerpo.'}
            code={`<Checklist size="sm" defaultOpen>
  <Checklist.Title>Toma de datos</Checklist.Title>
  <Checklist.Item state="done">Una sola medición anotada</Checklist.Item>
  <Checklist.Item>Las tres, sin el error</Checklist.Item>
  <Checklist.Item>Las tres, con el error estimado</Checklist.Item>
</Checklist>`}
          >
            <Stack width="sm">
              <Checklist size="sm" defaultOpen>
                <Checklist.Title>Toma de datos</Checklist.Title>
                <Checklist.Item state="done">Una sola medición anotada</Checklist.Item>
                <Checklist.Item>Las tres, sin el error</Checklist.Item>
                <Checklist.Item>Las tres, con el error estimado</Checklist.Item>
              </Checklist>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Como escalera">
        <Panel>
          <Variant
            name="tres de cuatro"
            note="Con `value` y `onValueChange` cada paso incluye a los de arriba: tocar el tercero marca los tres, y volver a tocarlo desmarca de ahí para abajo. El contador y la barra salen del mismo número."
            code={`<Checklist defaultOpen value={level} onValueChange={setLevel}>
  <Checklist.Title>Toma de datos</Checklist.Title>
  <Checklist.Item>Una sola medición anotada</Checklist.Item>
  <Checklist.Item>Las tres, sin el error</Checklist.Item>
  <Checklist.Item>Las tres, con el error estimado</Checklist.Item>
  <Checklist.Item>Las tres, con el error y de dónde sale</Checklist.Item>
  <Checklist.Footer hint="Cada renglón incluye al anterior: al marcar uno quedan marcados los de arriba.">
    Vale 33% de la nota.
  </Checklist.Footer>
</Checklist>`}
          >
            <Stack width="md">
              <Checklist defaultOpen value={level} onValueChange={setLevel}>
                <Checklist.Title>Toma de datos</Checklist.Title>
                <Checklist.Item>Una sola medición anotada</Checklist.Item>
                <Checklist.Item>Las tres, sin el error</Checklist.Item>
                <Checklist.Item>Las tres, con el error estimado</Checklist.Item>
                <Checklist.Item>Las tres, con el error y de dónde sale</Checklist.Item>
                <Checklist.Footer hint="Cada renglón incluye al anterior: al marcar uno quedan marcados los de arriba.">
                  Vale 33% de la nota.
                </Checklist.Footer>
              </Checklist>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Checklist" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Usala para una secuencia que alguien recorre una sola vez y a su ritmo: configurar un espacio, dejar listo un aula. Si no tiene orden, es una `TaskList`.</Practices.Do>
          <Practices.Do>El contador sale de los pasos, así que no hay un número que pueda despegarse de la lista.</Practices.Do>
          <Practices.Do>Un paso `blocked` lleva `hint`: si no se puede hacer, hay que decir por qué.</Practices.Do>
          <Practices.Do>Cuando los pasos se recorren en orden, pasale `value` y `onValueChange`: la escalera no deja estados imposibles, como el tercero hecho y el segundo no.</Practices.Do>
          <Practices.Dont>No la uses para una secuencia que se hace de corrido: eso es `Steps`.</Practices.Dont>
          <Practices.Dont>Cuando todo está hecho, sacala de la pantalla. Una lista de cuatro tildes verdes ocupa lugar y no dice nada.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La cabecera es un botón con `aria-expanded` y `aria-controls`: se anuncia como lo que es y dice qué abre.</A11y.Item>
          <A11y.Item>El contador se lee "1 de 4 pasos hechos" y no solo el número.</A11y.Item>
          <A11y.Item>El paso en curso lleva `aria-current="step"`, así que quien escucha sabe dónde quedó.</A11y.Item>
          <A11y.Item>El estado no depende del color: cada paso lleva su marca, y el trabado además dice por qué.</A11y.Item>
          <A11y.Item>Un paso trabado es un `div` y no un botón apagado: no para en el tabulador, porque no hay nada que hacer ahí.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
