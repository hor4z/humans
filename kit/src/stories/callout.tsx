import s from './callout.module.css'
import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { Callout } from '@milo/ui/callout'
import { Icon } from '@milo/ui/icon'
import { A11y, Anatomy, Demo, Frame, Hero, Page, Practices, Props, Section, Stack } from '../kit'

export function CalloutStory() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <Page
      title="Callout"
      kind="Avisos"
      imports="import { Callout } from '@milo/ui/callout'"
      lead="Destaca una aclaración o un aviso persistente. El tono distingue información, éxito, advertencia y error."
    >
      <Hero>
        <Stack width="xl">
          <Callout icon="lightbulb" color="blue">
            <Callout.Title>Para acordarse</Callout.Title>
            La velocidad límite no depende de la masa: depende de la forma y del aire.
          </Callout>
          <Callout tone="warn">
            <Callout.Title>Tres entregas vencen mañana</Callout.Title>
            <Callout.Actions>
              <Button size="sm" variant="muted">Ver las entregas</Button>
            </Callout.Actions>
          </Callout>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Superficie" required>{'Gris sin nada; `color` la tiñe con la familia de categorías y `tone` con el de estado. Sin borde.'}</Anatomy.Part>
        <Anatomy.Part name="Glifo">{'`icon`. Con `tone` viene solo, uno por tono; `icon={null}` lo saca.'}</Anatomy.Part>
        <Anatomy.Part name="Título">`Callout.Title`: lo que se entiende de un vistazo.</Anatomy.Part>
        <Anatomy.Part name="Texto" required>Lo que va suelto adentro. Puede entrar solo en una línea, sin título ni glifo.</Anatomy.Part>
        <Anatomy.Part name="Acciones">`Callout.Actions`: lo que se puede hacer al respecto.</Anatomy.Part>
        <Anatomy.Part name="Cerrar">Con `onDismiss`, una X para sacarlo.</Anatomy.Part>
      </Anatomy>

      <Section title="Contenido" note="Sin `tone`: parte de lo que se lee, y sigue ahí aunque nadie haga nada.">
        <Demo label="Con título y glifo, y sin ninguno" code={`<Callout icon="lightbulb" color="blue">
  <Callout.Title>Para acordarse</Callout.Title>
  La velocidad límite no depende de la masa: depende de la forma y del aire.
</Callout>
<Callout icon="science" color="green">
  <Callout.Title>Probalo</Callout.Title>
  Soltá una hoja abierta y la misma hoja hecha un bollo. Cronometrá las dos.
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
      </Section>

      <Section title="Avisos" note="Con `tone`: algo que pasó. Cada tono trae su glifo, porque un color de estado sin forma ni texto no dice nada a quien no distingue colores.">
        <Demo fill label="Los cuatro tonos" code={`<Callout tone="info">
  <Callout.Title>La corrección automática está en prueba</Callout.Title>
  Podés desactivarla desde Ajustes mientras la probamos.
</Callout>
<Callout tone="ok">
  <Callout.Title>Se publicó en los siete espacios</Callout.Title>
</Callout>
<Callout tone="warn">
  <Callout.Title>Tres entregas vencen mañana</Callout.Title>
  Después de esa fecha los estudiantes ya no pueden subir nada.
  <Callout.Actions>
    <Button size="sm" variant="muted">Ver las entregas</Button>
  </Callout.Actions>
</Callout>
<Callout tone="bad" onDismiss={dismiss}>
  <Callout.Title>No se pudieron traer las entregas</Callout.Title>
  Puede ser la conexión. Lo que ya estaba corregido sigue estando.
  <Callout.Actions>
    <Button size="sm" variant="muted" iconStart={<Icon name="refresh" />}>Reintentar</Button>
  </Callout.Actions>
</Callout>`}>
          <Stack>
            <Callout tone="info">
              <Callout.Title>La corrección automática está en prueba</Callout.Title>
              Podés desactivarla desde Ajustes mientras la probamos.
            </Callout>
            <Callout tone="ok">
              <Callout.Title>Se publicó en los siete espacios</Callout.Title>
            </Callout>
            <Callout tone="warn">
              <Callout.Title>Tres entregas vencen mañana</Callout.Title>
              Después de esa fecha los estudiantes ya no pueden subir nada.
              <Callout.Actions>
                <Button size="sm" variant="muted">Ver las entregas</Button>
              </Callout.Actions>
            </Callout>
            {dismissed
              ? <Button size="sm" variant="muted" iconStart={<Icon name="undo" />} onClick={() => setDismissed(false)}>Mostrarlo de nuevo</Button>
              : (
                <Callout tone="bad" onDismiss={() => setDismissed(true)}>
                  <Callout.Title>No se pudieron traer las entregas</Callout.Title>
                  Puede ser la conexión. Lo que ya estaba corregido sigue estando.
                  <Callout.Actions>
                    <Button size="sm" variant="muted" iconStart={<Icon name="refresh" />}>Reintentar</Button>
                  </Callout.Actions>
                </Callout>
              )}
          </Stack>
        </Demo>

        <Demo fill label="El glifo de un aviso" code={`<Callout tone="info" icon="schedule">
  <Callout.Title>Cierra el viernes a las 23:59</Callout.Title>
</Callout>
<Callout tone="info" icon={null}>
  <Callout.Title>Cuatro entregas nuevas desde ayer</Callout.Title>
</Callout>`}>
          <Frame width="lg">
            <Stack>
              <Callout tone="info" icon="schedule">
                <Callout.Title>Cierra el viernes a las 23:59</Callout.Title>
              </Callout>
              <Callout tone="info" icon={null}>
                <Callout.Title>Cuatro entregas nuevas desde ayer</Callout.Title>
              </Callout>
            </Stack>
          </Frame>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Callout" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Un bloque de contenido va con `color`, de la familia de categorías: distingue un bloque de otro cuando hay varios en una página.</Practices.Do>
          <Practices.Dont>No le pongas `tone` a un bloque de contenido: uno en rojo diría "error" sin que haya ninguno.</Practices.Dont>
          <Practices.Do>Un aviso va fijo en la pantalla, donde pasó la cosa, y con una salida en `Callout.Actions`: sin nada para tocar deja al lector solo con el problema.</Practices.Do>
          <Practices.Dont>No lo uses para acusar recibo de lo que la persona acaba de hacer: eso es un [Toast](#toast), que se va solo. Un error importante que desaparece solo es un error que nadie leyó.</Practices.Dont>
          <Practices.Do>Adentro de un panel denso va en `size="sm"`.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Sin tono lleva `role="note"`: se anuncia como una nota al margen sin sumar una región. Con once bloques en una página, once regiones dejarían la lista de saltos inservible.</A11y.Item>
          <A11y.Item>Con tono, el error va como `role="alert"` y el resto como `role="status"`: solo lo urgente interrumpe lo que se está leyendo, y algo fijo no interrumpe cada vez que se monta.</A11y.Item>
          <A11y.Item>El estado y el tema están en el texto y en el glifo, no solo en el color. El glifo es decorativo.</A11y.Item>
          <A11y.Item>La X se nombra sola y no es la única salida: el aviso se puede leer entero sin tocarla.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
