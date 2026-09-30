import { Button } from '@milo/ui/button'
import { Icon } from '@milo/ui/icon'
import { useEffect, useRef, useState } from 'react'
import { A11y, Anatomy, Demo, Grid, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

/** Dos respuestas de verdad, una más rápida que la espera y otra más lenta, para ver que la corta no dibuja nada y la larga no se corta. */
function TryLoading() {
  const [running, setRunning] = useState<'' | 'short' | 'long'>('')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const run = (which: 'short' | 'long', ms: number) => {
    setRunning(which)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setRunning(''), ms) as unknown as number
  }
  return (
    <Demo label="Tocá los dos: uno responde enseguida y el otro tarda" code={`<Button variant="brand" iconStart={<Icon name="save" />} loading={saving} onClick={saveFast}>
  Guardar
</Button>
<Button variant="brand" iconStart={<Icon name="save" />} loading={saving} onClick={saveSlow}>
  Guardar
</Button>`}>
      <Button variant="brand" iconStart={<Icon name="save" />} loading={running === 'short'} onClick={() => run('short', 80)}>
        Guardar
      </Button>
      <Button variant="brand" iconStart={<Icon name="save" />} loading={running === 'long'} onClick={() => run('long', 900)}>
        Guardar
      </Button>
    </Demo>
  )
}

export function ButtonStory() {
  return (
    <Page
      title="Button"
      kind="Acciones"
      imports="import { Button } from '@milo/ui/button'"
      lead="Dispara una acción. Lo que elegís con `variant` es cuánto pesa en la pantalla, y el color sale de eso. El texto va un escalón arriba del de su entorno: con el mismo tamaño de letra no se lee como accionable."
    >
      <Hero>
        <Button variant="brand">Crear actividad</Button>
        <Button variant="muted">Crear actividad</Button>
        <Button variant="ghost">Crear actividad</Button>
        <Button variant="bad">Eliminar</Button>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Etiqueta" required>Lo que dice qué va a pasar, como hijo del botón.</Anatomy.Part>
        <Anatomy.Part name="Icono al comienzo">`iconStart`: cualquier nodo, en una caja fija para que el botón mida lo mismo sea lo que sea.</Anatomy.Part>
        <Anatomy.Part name="Icono al final">`iconEnd`, con la misma caja que el del comienzo.</Anatomy.Part>
        <Anatomy.Part name="Spinner">Con `loading` ocupa el lugar del icono del comienzo y el botón deja de aceptar clicks.</Anatomy.Part>
      </Anatomy>

      <Section title="Variantes y tamaños">
        <Panel>
          <Variant
            name="brand · solid · muted · ghost · bad"
            note="**brand** es la acción que manda. **solid** es la misma en tinta, para una pantalla donde el azul no se puede usar. **muted** es lo secundario: relleno claro y sin color, así que no compite. **ghost** es lo terciario y no dibuja caja hasta el hover. **bad** es lo que no se puede deshacer."
            code={`<Button variant="brand">Crear actividad</Button>
<Button variant="solid">Crear actividad</Button>
<Button variant="muted">Crear actividad</Button>
<Button variant="ghost">Crear actividad</Button>
<Button variant="bad">Eliminar</Button>`}
          >
            <Button variant="brand">Crear actividad</Button>
            <Button variant="solid">Crear actividad</Button>
            <Button variant="muted">Crear actividad</Button>
            <Button variant="ghost">Crear actividad</Button>
            <Button variant="bad">Eliminar</Button>
          </Variant>
          <Variant
            name="sm · 36 · md · 40 · lg · 44"
            note="`sm` en una fila densa, `md` en un panel, `lg` en la acción principal: cae en 44, que es el objetivo táctil."
            code={`<Button size="sm" variant="brand">Guardar</Button>
<Button size="md" variant="brand">Guardar</Button>
<Button size="lg" variant="brand">Guardar</Button>`}
          >
            <Button size="sm" variant="brand">Guardar</Button>
            <Button size="md" variant="brand">Guardar</Button>
            <Button size="lg" variant="brand">Guardar</Button>
          </Variant>
        </Panel>
      </Section>

      <Section title="Con icono, ancho completo y deshabilitado">
        <Grid>
          <Demo label="Iconos y deshabilitado" code={`<Button variant="muted" iconStart={<Icon name="folder" />}>Nuevo espacio</Button>
<Button variant="muted" iconEnd={<Icon name="chevron_right" />}>Siguiente</Button>
<Button variant="brand" disabled>Guardar</Button>`}>
            <Button variant="muted" iconStart={<Icon name="folder" />}>Nuevo espacio</Button>
            <Button variant="muted" iconEnd={<Icon name="chevron_right" />}>Siguiente</Button>
            <Button variant="brand" disabled>Guardar</Button>
          </Demo>
          <Demo label="Ocupando el ancho" code={`<Button variant="brand" block>Entrar</Button>`}>
            <Button variant="brand" block>Entrar</Button>
          </Demo>
        </Grid>
      </Section>

      <Section title="Cargando">
        <Panel>
          <Variant
            name="antes y mientras carga"
            note="El spinner aparece recién a los 120ms (`--duration-fast`), porque una respuesta más rápida no alcanza a leerse, y una vez que apareció se queda 280 (`--duration-content`). Mientras carga, el botón no se deja tocar de nuevo."
            code={`<Button variant="brand" iconStart={<Icon name="folder" />}>Nuevo espacio</Button>
<Button variant="brand" iconStart={<Icon name="folder" />} loading>Nuevo espacio</Button>
<Button size="sm" variant="muted" loading>Guardar</Button>
<Button size="lg" variant="bad" loading>Eliminar</Button>`}
          >
            <Button variant="brand" iconStart={<Icon name="folder" />}>Nuevo espacio</Button>
            <Button variant="brand" iconStart={<Icon name="folder" />} loading>Nuevo espacio</Button>
            <Button size="sm" variant="muted" loading>Guardar</Button>
            <Button size="lg" variant="bad" loading>Eliminar</Button>
          </Variant>
        </Panel>
        <TryLoading />
      </Section>

      <Section title="Props">
        <Props of="Button" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>La acción que manda va en `variant="brand"`, y hay una sola por pantalla: si hay dos, ninguna manda.</Practices.Do>
          <Practices.Do>El texto dice qué va a pasar (`Publicar`, `Archivar`), no `Aceptar`.</Practices.Do>
          <Practices.Do>`muted` para lo secundario y `ghost` para lo terciario: la que manda no tiene que competir con ellas.</Practices.Do>
          <Practices.Do>`lg` donde se toca con el dedo: cae en 44, que es el objetivo táctil.</Practices.Do>
          <Practices.Dont>`bad` es para lo que no tiene vuelta, no para lo que asusta: el rojo lo lleva la acción que borra y no el mensaje.</Practices.Dont>
          <Practices.Dont>No pongas `solid` y `brand` juntos: son el mismo rol en dos tintas, va uno o el otro.</Practices.Dont>
          <Practices.Dont>No uses un botón para navegar: eso es un `Link`, y con el botón se pierde abrir en otra pestaña.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es un <button> real: entra en el orden de tabulación y responde a Enter y Espacio.'}</A11y.Item>
          <A11y.Item>El anillo de foco se dibuja por fuera de la caja, con dos píxeles de superficie de por medio: no mueve el botón ni empuja a los de al lado.</A11y.Item>
          <A11y.Item>Deshabilitado deja de recibir el puntero y baja a 45% de opacidad, pero conserva su texto legible.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
