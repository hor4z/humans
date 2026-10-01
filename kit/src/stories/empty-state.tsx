import { useState } from 'react'
import cls from './empty-state.module.css'
import { Button } from '@humans/ui/button'
import { EmptyState } from '@humans/ui/empty-state'
import { Filter } from '@humans/ui/filter'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section, Stack } from '../kit'

export function EmptyStateStory() {
  const [filtered, setFiltered] = useState(true)
  return (
    <Page
      title="EmptyState"
      kind="Avisos"
      imports="import { EmptyState } from '@humans/ui/empty-state'"
      lead="Explica por qué no hay contenido y ofrece un próximo paso cuando corresponde."
    >
      <Hero>
        <EmptyState icon="inbox">
          <EmptyState.Title>Todavía no llegó ninguna entrega</EmptyState.Title>
          <EmptyState.Body>Cuando alguien entregue una actividad de este espacio, la vas a ver acá con su estado.</EmptyState.Body>
          <EmptyState.Action><Button variant="brand" onClick={() => { window.location.hash = 'documento' }}>Crear una actividad</Button></EmptyState.Action>
        </EmptyState>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Icono">`icon`, adentro de un hueco y en gris: suelto y grande se ve como una imagen que no cargó.</Anatomy.Part>
        <Anatomy.Part name="Título" required>`EmptyState.Title`: qué falta.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`EmptyState.Body`: qué se puede hacer.</Anatomy.Part>
        <Anatomy.Part name="Acción">`EmptyState.Action`: la salida, un botón.</Anatomy.Part>
        <Anatomy.Part name="Caja punteada">El marco del `md`. Adentro de algo que ya tiene marco no va, y `sm` la apaga sola.</Anatomy.Part>
      </Anatomy>

      <Section title="Tamaños y marco">
        <Demo label="`md` y `sm`: una pantalla, y una búsqueda sin resultados adentro de una pieza" code={`<EmptyState icon="inbox">
  <EmptyState.Title>Todavía no llegó ninguna entrega</EmptyState.Title>
  <EmptyState.Body>Cuando alguien entregue una actividad de este espacio, la vas a ver acá con su estado.</EmptyState.Body>
  <EmptyState.Action><Button variant="brand" onClick={() => { window.location.hash = 'documento' }}>Crear una actividad</Button></EmptyState.Action>
</EmptyState>
<EmptyState size="sm" icon="search_off">
  <EmptyState.Title>No hay actividades con esos filtros</EmptyState.Title>
  <EmptyState.Body>Probá con otras palabras o quitá los filtros.</EmptyState.Body>
  <EmptyState.Action><Filter.Reset onClick={() => setFiltered(false)}>Limpiar filtros</Filter.Reset></EmptyState.Action>
</EmptyState>`}>
          <Stack gap="lg">
            <EmptyState icon="inbox">
              <EmptyState.Title>Todavía no llegó ninguna entrega</EmptyState.Title>
              <EmptyState.Body>Cuando alguien entregue una actividad de este espacio, la vas a ver acá con su estado.</EmptyState.Body>
              <EmptyState.Action><Button variant="brand" onClick={() => { window.location.hash = 'documento' }}>Crear una actividad</Button></EmptyState.Action>
            </EmptyState>
            <div className={`${cls.insetBox} bg-surface`}>
              {filtered ? <EmptyState size="sm" icon="search_off">
                <EmptyState.Title>No hay actividades con esos filtros</EmptyState.Title>
                <EmptyState.Body>Probá con otras palabras o quitá los filtros.</EmptyState.Body>
                <EmptyState.Action><Filter.Reset onClick={() => setFiltered(false)}>Limpiar filtros</Filter.Reset></EmptyState.Action>
              </EmptyState> : <Stack><p role="status">Filtros eliminados. Hay 3 actividades disponibles.</p><Button size="sm" variant="muted" onClick={() => setFiltered(true)}>Restablecer ejemplo</Button></Stack>}
            </div>
          </Stack>
        </Demo>

        <Demo label="Sin caja, adentro de una tarjeta" code={`<EmptyState bordered={false} icon="folder_open">
  <EmptyState.Title>Este espacio está vacío</EmptyState.Title>
  <EmptyState.Body>Todavía no hay actividades acá.</EmptyState.Body>
</EmptyState>`}>
          <div className={`${cls.raisedBox} bg-surface`}>
            <EmptyState bordered={false} icon="folder_open">
              <EmptyState.Title>Este espacio está vacío</EmptyState.Title>
              <EmptyState.Body>Todavía no hay actividades acá.</EmptyState.Body>
            </EmptyState>
          </div>
        </Demo>

        <Demo label="Sin icono" code={`<EmptyState>
  <EmptyState.Title>Acá no hay nada</EmptyState.Title>
  <EmptyState.Body>La dirección existe pero no lleva a ninguna pantalla.</EmptyState.Body>
  <EmptyState.Action><Button variant="muted" onClick={() => { window.location.hash = 'intro' }}>Volver al inicio</Button></EmptyState.Action>
</EmptyState>`}>
          <EmptyState>
            <EmptyState.Title>Acá no hay nada</EmptyState.Title>
            <EmptyState.Body>La dirección existe pero no lleva a ninguna pantalla.</EmptyState.Body>
            <EmptyState.Action><Button variant="muted" onClick={() => { window.location.hash = 'intro' }}>Volver al inicio</Button></EmptyState.Action>
          </EmptyState>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="EmptyState" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Siempre conviene que haya una salida: el `EmptyState.Action`.</Practices.Do>
          <Practices.Do>El título dice qué falta y el cuerpo qué se puede hacer.</Practices.Do>
          <Practices.Do>Poné `icon`: no es lo mismo "no hay nada todavía" que "no encontré nada con eso", y el glifo lo dice antes de leer.</Practices.Do>
          <Practices.Dont>Adentro de una tabla o una galería no va en `md` ni con la caja punteada: va en `size="sm"`.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El icono es decorativo y no se anuncia: lo que se lee es el título y el cuerpo.</A11y.Item>
          <A11y.Item>La acción es un botón real, no un texto que parece link.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
