import cls from './empty-state.module.css'
import { Button } from '@milo/ui/button'
import { EmptyState } from '@milo/ui/empty-state'
import { Filter } from '@milo/ui/filter'
import { A11y, Demo, Page, Practices, Props, Section, Stack } from '../kit'

export function EmptyStateStory() {
  return (
    <Page
      title="EmptyState"
      kind="Avisos"
      imports="import { EmptyState } from '@milo/ui/empty-state'"
      lead="Lo que se ve cuando no hay nada, siempre con una salida: un vacío que no dice qué hacer es una pantalla rota con buena redacción. El icono va adentro de un hueco y en gris: suelto y grande se ve como una imagen que no cargó, que es justo lo que uno teme."
    >
      <Section
        title="Los dos tamaños"
        note="`md` es el de una pantalla vacía; `sm`, el de una búsqueda sin resultados adentro de una pieza, que con el aire del grande empujaría la paginación media pantalla para abajo."
      >
        <Stack gap="lg">
          <Demo label="md · una pantalla" code={`<EmptyState icon="inbox">
  <EmptyState.Title>Todavía no llegó ninguna entrega</EmptyState.Title>
  <EmptyState.Body>Cuando alguien entregue una actividad de este espacio, la vas a ver acá con su estado.</EmptyState.Body>
  <EmptyState.Action><Button variant="brand">Crear una actividad</Button></EmptyState.Action>
</EmptyState>`}>
            <EmptyState icon="inbox">
              <EmptyState.Title>Todavía no llegó ninguna entrega</EmptyState.Title>
              <EmptyState.Body>Cuando alguien entregue una actividad de este espacio, la vas a ver acá con su estado.</EmptyState.Body>
              <EmptyState.Action><Button variant="brand">Crear una actividad</Button></EmptyState.Action>
            </EmptyState>
          </Demo>
          <Demo label="sm · adentro de una pieza" code={`<EmptyState size="sm" icon="search_off">
  <EmptyState.Title>Ninguna actividad con eso</EmptyState.Title>
  <EmptyState.Body>Probá con otras palabras, o sacá alguno de los filtros puestos.</EmptyState.Body>
  <EmptyState.Action><Filter.Reset onClick={clearFilters}>Limpiar los filtros</Filter.Reset></EmptyState.Action>
</EmptyState>`}>
            <div className={`${cls.insetBox} bg-surface`}>
              <EmptyState size="sm" icon="search_off">
                <EmptyState.Title>Ninguna actividad con eso</EmptyState.Title>
                <EmptyState.Body>Probá con otras palabras, o sacá alguno de los filtros puestos.</EmptyState.Body>
                <EmptyState.Action><Filter.Reset onClick={() => {}}>Limpiar los filtros</Filter.Reset></EmptyState.Action>
              </EmptyState>
            </div>
          </Demo>
        </Stack>
      </Section>

      <Section
        title="La caja punteada"
        note="Adentro de algo que ya tiene marco, no va: por eso `sm` la apaga sola."
      >
        <Stack gap="lg">
          <Demo label="bordered · el default de md" code={`<EmptyState icon="folder_open">
  <EmptyState.Title>Este espacio está vacío</EmptyState.Title>
  <EmptyState.Body>Todavía no hay actividades acá.</EmptyState.Body>
</EmptyState>`}>
            <EmptyState icon="folder_open">
              <EmptyState.Title>Este espacio está vacío</EmptyState.Title>
              <EmptyState.Body>Todavía no hay actividades acá.</EmptyState.Body>
            </EmptyState>
          </Demo>
          <Demo label="sin caja, adentro de una tarjeta" code={`<EmptyState bordered={false} icon="folder_open">
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
        </Stack>
      </Section>

      <Section
        title="Sin icono"
        note="Funciona, pero con icono se reconoce de qué tipo de vacío se trata antes de leerlo."
      >
        <Demo label="solo texto" code={`<EmptyState>
  <EmptyState.Title>Acá no hay nada</EmptyState.Title>
  <EmptyState.Body>La dirección existe pero no lleva a ninguna pantalla.</EmptyState.Body>
  <EmptyState.Action><Button variant="muted">Volver</Button></EmptyState.Action>
</EmptyState>`}>
          <EmptyState>
            <EmptyState.Title>Acá no hay nada</EmptyState.Title>
            <EmptyState.Body>La dirección existe pero no lleva a ninguna pantalla.</EmptyState.Body>
            <EmptyState.Action><Button variant="muted">Volver</Button></EmptyState.Action>
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
