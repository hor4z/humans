import cls from './tooltip.module.css'
import { Button } from '@milo/ui/button'
import { IconButton } from '@milo/ui/icon-button'
import { Tooltip } from '@milo/ui/tooltip'
import { A11y, Cluster, Demo, Grid, Page, Practices, Props, Section } from '../kit'

export function TooltipStory() {
  return (
    <Page
      title="Tooltip"
      lead="La etiqueta que dice qué hace un control que no lo dice solo. No es un Popover chico: se abre solo (hover o foco de teclado), no recibe el mouse (o taparía justo el botón que explica) y no lleva nada interactivo adentro. Si tiene un link o un botón, es un Popover."
      kind="Avisos"
      imports="import { Tooltip } from '@milo/ui/tooltip'"
    >
      <Section
        title="El retraso se comparte"
        note="El primero tarda medio segundo y el de al lado abre al instante: pasá el mouse por la fila."
      >
        <Demo code={`<Tooltip label="Buscar"><IconButton icon="search" label="Buscar" /></Tooltip>
<Tooltip label="Duplicar"><IconButton icon="content_copy" label="Duplicar" /></Tooltip>
<Tooltip label="Compartir"><IconButton icon="share" label="Compartir" /></Tooltip>
<Tooltip label="Archivar"><IconButton icon="inventory_2" label="Archivar" /></Tooltip>
<Tooltip label="Ajustes"><IconButton icon="tune" label="Ajustes" /></Tooltip>
<Tooltip label="Más"><IconButton icon="more_horiz" label="Más" /></Tooltip>`}>
          <Cluster gap="xs" align="center">
            <Tooltip label="Buscar"><IconButton icon="search" label="Buscar" /></Tooltip>
            <Tooltip label="Duplicar"><IconButton icon="content_copy" label="Duplicar" /></Tooltip>
            <Tooltip label="Compartir"><IconButton icon="share" label="Compartir" /></Tooltip>
            <Tooltip label="Archivar"><IconButton icon="inventory_2" label="Archivar" /></Tooltip>
            <Tooltip label="Ajustes"><IconButton icon="tune" label="Ajustes" /></Tooltip>
            <Tooltip label="Más"><IconButton icon="more_horiz" label="Más" /></Tooltip>
          </Cluster>
        </Demo>
      </Section>

      <Section
        title="Con el teclado"
        note="Tabulá hasta el botón: el tooltip aparece igual, y Escape lo cierra."
      >
        <Grid>
          <Demo label="en un botón con texto" code={`<Tooltip label="Se publica para los siete espacios">
  <Button variant="brand">Publicar</Button>
</Tooltip>`}>
            <Tooltip label="Se publica para los siete espacios">
              <Button variant="brand">Publicar</Button>
            </Tooltip>
          </Demo>
          <Demo label="texto largo · se envuelve a 240" code={`<Tooltip label="Una actividad archivada sale de la lista pero no se borra: queda en 'Archivadas' y se puede restaurar.">
  <IconButton icon="inventory_2" label="Archivar" variant="muted" />
</Tooltip>`}>
            <Tooltip label="Una actividad archivada sale de la lista pero no se borra: queda en 'Archivadas' y se puede restaurar.">
              <IconButton icon="inventory_2" label="Archivar" variant="muted" />
            </Tooltip>
          </Demo>
          <Demo label="abajo" code={`<Tooltip side="bottom" label="Va abajo si entra">
  <IconButton icon="keyboard_arrow_down" label="Abajo" variant="muted" />
</Tooltip>`}>
            <Tooltip side="bottom" label="Va abajo si entra">
              <IconButton icon="keyboard_arrow_down" label="Abajo" variant="muted" />
            </Tooltip>
          </Demo>
        </Grid>
      </Section>

      <Section
        title="Se da vuelta y no se sale"
        note="Contra el borde de arriba se va abajo, y contra el costado se pega a 8 del canto en vez de salirse."
      >
        <Demo fill code={`<Tooltip label="Pegado al borde izquierdo de la ventana">
  <IconButton icon="chevron_left" label="Izquierda" variant="muted" />
</Tooltip>
<Tooltip label="Pegado al borde derecho de la ventana">
  <IconButton icon="chevron_right" label="Derecha" variant="muted" />
</Tooltip>`}>
          <div className={cls.edgeRow}>
            <Tooltip label="Pegado al borde izquierdo de la ventana">
              <IconButton icon="chevron_left" label="Izquierda" variant="muted" />
            </Tooltip>
            <Tooltip label="Pegado al borde derecho de la ventana">
              <IconButton icon="chevron_right" label="Derecha" variant="muted" />
            </Tooltip>
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Tooltip" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Es para un dato de apoyo, no para algo que hace falta para decidir.</Practices.Do>
          <Practices.Dont>No metas un control adentro: con el teclado no se llega y con el dedo no aparece. Si tiene un link o un botón, es un `Popover`.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Aparece con el foco de teclado y no solo con el mouse, pero no con el foco de un click: si no, queda puesto encima de lo que acabás de tocar.</A11y.Item>
          <A11y.Item>Escape lo cierra, por la misma pila que los otros overlays.</A11y.Item>
          <A11y.Item>Lleva role="tooltip" y el control que explica lo referencia con aria-describedby.</A11y.Item>
          <A11y.Item>No recibe el puntero, así que nunca se mete entre el mouse y lo que describe.</A11y.Item>
          <A11y.Item>En touch no aparece: lo que diga tiene que estar también en el aria-label del control.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
