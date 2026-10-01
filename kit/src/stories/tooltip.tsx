import cls from './tooltip.module.css'
import { Button } from '@humans/ui/button'
import { IconButton } from '@humans/ui/icon-button'
import { Tooltip } from '@humans/ui/tooltip'
import { A11y, Anatomy, Cluster, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function TooltipStory() {
  return (
    <Page
      title="Tooltip"
      kind="Avisos"
      imports="import { Tooltip } from '@humans/ui/tooltip'"
      lead="Explica un control al pasar el puntero o enfocarlo con el teclado. No contiene acciones."
    >
      <Hero>
        <Cluster gap="xs" align="center">
          <Tooltip label="Buscar"><IconButton icon="search" label="Buscar" /></Tooltip>
          <Tooltip label="Compartir"><IconButton icon="share" label="Compartir" /></Tooltip>
          <Tooltip label="Se publica para los siete espacios"><Button variant="brand">Publicar</Button></Tooltip>
        </Cluster>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Control" required>El hijo, que se envuelve tal cual: un icono suelto, un botón, un valor truncado.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta" required>`label`: una burbuja que se envuelve a 240 y no lleva nada interactivo adentro.</Anatomy.Part>
      </Anatomy>

      <Section
        title="El retraso se comparte"
        note="El primero tarda medio segundo y el de al lado abre al instante: pasá el mouse por la fila."
      >
        <Demo note="Va en una fila de botones que son solo un glifo, como las acciones de una actividad: cada uno dice su nombre al pasar." code={`<Tooltip label="Buscar"><IconButton icon="search" label="Buscar" /></Tooltip>
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
        title="Texto largo, abajo y contra el borde"
        note="Contra el borde de arriba se va abajo, y contra el costado se pega a 8 del canto en vez de salirse."
      >
        <Demo fill note="Para explicar qué pasa con lo que se toca, como archivar una actividad, sin abrir un diálogo." code={`<Tooltip label="Una actividad archivada sale de la lista pero no se borra: queda en 'Archivadas' y se puede restaurar.">
  <IconButton icon="inventory_2" label="Archivar" variant="muted" />
</Tooltip>
<Tooltip side="bottom" label="Va abajo si entra">
  <IconButton icon="keyboard_arrow_down" label="Abajo" variant="muted" />
</Tooltip>
<Tooltip label="Pegado al borde izquierdo de la ventana">
  <IconButton icon="chevron_left" label="Izquierda" variant="muted" />
</Tooltip>
<Tooltip label="Pegado al borde derecho de la ventana">
  <IconButton icon="chevron_right" label="Derecha" variant="muted" />
</Tooltip>`}>
          <div className={cls.edgeRow}>
            <Tooltip label="Pegado al borde izquierdo de la ventana">
              <IconButton icon="chevron_left" label="Izquierda" variant="muted" />
            </Tooltip>
            <Tooltip label="Una actividad archivada sale de la lista pero no se borra: queda en 'Archivadas' y se puede restaurar.">
              <IconButton icon="inventory_2" label="Archivar" variant="muted" />
            </Tooltip>
            <Tooltip side="bottom" label="Va abajo si entra">
              <IconButton icon="keyboard_arrow_down" label="Abajo" variant="muted" />
            </Tooltip>
            <Tooltip label="Pegado al borde derecho de la ventana">
              <IconButton icon="chevron_right" label="Derecha" variant="muted" />
            </Tooltip>
          </div>
        </Demo>
      </Section>

      <Section title="Posición" note="Elegí el lado con `side`, la alineación con `align` y la separación con `offset`. Si no entra, cambia al lado opuesto y respeta el borde de la ventana.">
        <Demo label="Cuatro lados" note="Arriba es el lado por defecto. Otro va cuando arriba tapa algo que hace falta ver, como la fila de encima en una tabla." code={`<Tooltip label="Arriba" side="top"><Button>Arriba</Button></Tooltip>
<Tooltip label="Abajo" side="bottom"><Button>Abajo</Button></Tooltip>
<Tooltip label="Izquierda" side="left"><Button>Izquierda</Button></Tooltip>
<Tooltip label="Derecha" side="right" align="center" offset={8}><Button>Derecha</Button></Tooltip>`}>
          <Tooltip label="Arriba" side="top"><Button size="sm">Arriba</Button></Tooltip>
          <Tooltip label="Abajo" side="bottom"><Button size="sm">Abajo</Button></Tooltip>
          <Tooltip label="Izquierda" side="left"><Button size="sm">Izquierda</Button></Tooltip>
          <Tooltip label="Derecha" side="right" align="center" offset={8}><Button size="sm">Derecha</Button></Tooltip>
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
          <A11y.Item>Lleva `role="tooltip"` y el control que explica lo referencia con `aria-describedby`.</A11y.Item>
          <A11y.Item>No recibe el puntero, así que nunca se mete entre el mouse y lo que describe.</A11y.Item>
          <A11y.Item>En touch no aparece: lo que diga tiene que estar también en el `aria-label` del control.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
