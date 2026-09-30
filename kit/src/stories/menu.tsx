import { useState } from 'react'
import { Button } from '@humans/ui/button'
import { Divider } from '@humans/ui/divider'
import { Icon } from '@humans/ui/icon'
import { Menu } from '@humans/ui/menu'
import { Popover } from '@humans/ui/popover'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function MenuStory() {
  const [view, setView] = useState<'grilla' | 'lista'>('grilla')

  return (
    <Page
      title="Menu"
      kind="Acciones"
      imports="import { Menu } from '@humans/ui/menu'"
      lead="Agrupa acciones con iconos, atajos, separadores y rótulos de sección."
    >
      <Hero>
        <Menu label="Acciones de la actividad" width={260}>
          <Menu.Label>Esta actividad</Menu.Label>
          <Menu.Item icon="edit">Editar<Menu.Shortcut>E</Menu.Shortcut></Menu.Item>
          <Menu.Item icon="grid_view" checked={view === 'grilla'} onSelect={() => setView('grilla')}>
            Grilla
          </Menu.Item>
          <Menu.Item icon="view_list" checked={view === 'lista'} onSelect={() => setView('lista')}>
            Lista
          </Menu.Item>
          <Divider />
          <Menu.Item icon="delete" danger>Eliminar</Menu.Item>
        </Menu>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Panel" required>`Menu`: la caja, con su `label` y su ancho.</Anatomy.Part>
        <Anatomy.Part name="Opción" required>`Menu.Item`: una fila, que se elige con el mouse o con las flechas.</Anatomy.Part>
        <Anatomy.Part name="Icono">`icon`: a la izquierda de la opción, en gris.</Anatomy.Part>
        <Anatomy.Part name="Atajo">`Menu.Shortcut`: la tecla, a la derecha, en un `Kbd`.</Anatomy.Part>
        <Anatomy.Part name="Apoyo">`Menu.Hint`: una línea corta a la derecha, como una cantidad.</Anatomy.Part>
        <Anatomy.Part name="Tilde">Con `checked`, marca la opción que está puesta.</Anatomy.Part>
        <Anatomy.Part name="Chevron">Con `submenu`, avisa que hay otro nivel.</Anatomy.Part>
        <Anatomy.Part name="Rótulo">`Menu.Label`: el nombre de un grupo de opciones.</Anatomy.Part>
        <Anatomy.Part name="Separador">Un `Divider` entre grupos.</Anatomy.Part>
      </Anatomy>

      <Section title="Armado y en un Popover">
        <Panel>
          <Variant
            name="armado entero"
            note="El rótulo va en tinta y no en gris: apagado, obliga a buscar de qué es cada grupo. La opción destructiva es la única que cambia de color, icono incluido."
            code={`<Menu label="Acciones con grupos" width={260}>
  <Menu.Label>Esta actividad</Menu.Label>
  <Menu.Item icon="edit">Editar<Menu.Shortcut>E</Menu.Shortcut></Menu.Item>
  <Menu.Item icon="group">Compartir<Menu.Hint>7</Menu.Hint></Menu.Item>
  <Menu.Item icon="folder" submenu>Mover a</Menu.Item>
  <Divider />
  <Menu.Label>Vista</Menu.Label>
  <Menu.Item icon="grid_view" checked={view === 'grilla'} onSelect={() => setView('grilla')}>
    Grilla
  </Menu.Item>
  <Menu.Item icon="view_list" checked={view === 'lista'} onSelect={() => setView('lista')}>
    Lista
  </Menu.Item>
  <Divider />
  <Menu.Item icon="inventory_2" disabled>Archivar</Menu.Item>
  <Menu.Item icon="delete" danger>Eliminar</Menu.Item>
</Menu>`}
          >
            <Menu label="Acciones con grupos" width={260}>
              <Menu.Label>Esta actividad</Menu.Label>
              <Menu.Item icon="edit">Editar<Menu.Shortcut>E</Menu.Shortcut></Menu.Item>
              <Menu.Item icon="group">Compartir<Menu.Hint>7</Menu.Hint></Menu.Item>
              <Menu.Item icon="folder" submenu>Mover a</Menu.Item>
              <Divider />
              <Menu.Label>Vista</Menu.Label>
              <Menu.Item icon="grid_view" checked={view === 'grilla'} onSelect={() => setView('grilla')}>
                Grilla
              </Menu.Item>
              <Menu.Item icon="view_list" checked={view === 'lista'} onSelect={() => setView('lista')}>
                Lista
              </Menu.Item>
              <Divider />
              <Menu.Item icon="inventory_2" disabled>Archivar</Menu.Item>
              <Menu.Item icon="delete" danger>Eliminar</Menu.Item>
            </Menu>
          </Variant>
          <Variant
            name="adentro de un Popover: abrí y probá Escape"
            note="El `Menu` es la caja y el `Popover` el comportamiento: se arman juntos, y cada uno sirve solo."
            code={`<Popover
  align="start"
  trigger={props => (
    <Button {...props} variant="muted" iconEnd={<Icon name="keyboard_arrow_down" />}>
      Acciones
    </Button>
  )}
>
  {close => (
    <Menu label="Acciones de la fila" width={240}>
      <Menu.Item icon="edit" onSelect={close}>Editar<Menu.Shortcut>E</Menu.Shortcut></Menu.Item>
      <Menu.Item icon="link" onSelect={close}>Copiar enlace<Menu.Shortcut>⌘L</Menu.Shortcut></Menu.Item>
      <Divider />
      <Menu.Item icon="delete" danger onSelect={close}>Eliminar</Menu.Item>
    </Menu>
  )}
</Popover>`}
          >
            <Popover
              align="start"
              trigger={props => (
                <Button {...props} variant="muted" iconEnd={<Icon name="keyboard_arrow_down" />}>
                  Acciones
                </Button>
              )}
            >
              {close => (
                <Menu label="Acciones de la fila" width={240}>
                  <Menu.Item icon="edit" onSelect={close}>Editar<Menu.Shortcut>E</Menu.Shortcut></Menu.Item>
                  <Menu.Item icon="link" onSelect={close}>Copiar enlace<Menu.Shortcut>⌘L</Menu.Shortcut></Menu.Item>
                  <Divider />
                  <Menu.Item icon="delete" danger onSelect={close}>Eliminar</Menu.Item>
                </Menu>
              )}
            </Popover>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Menu" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>A la derecha hay un solo lugar: el atajo, una línea de apoyo, el tilde o el chevron, y nunca dos, porque compiten por el mismo significado.</Practices.Do>
          <Practices.Do>`label` dice qué menú es: sin eso un lector anuncia "menú" y nada más.</Practices.Do>
          <Practices.Do>Cerrar el panel es de quien lo abrió, así que llamá a `close` en el `onSelect`.</Practices.Do>
          <Practices.Dont>Lo que no se deshace va con `danger`, y nada más va con `danger`.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>`role="menu"` con `menuitem`, y las opciones que se marcan son `menuitemradio` con `aria-checked`.</A11y.Item>
          <A11y.Item>Las flechas recorren las opciones y dan la vuelta; Home y End van a los extremos, y las dos saltean lo apagado. Un `role="menu"` promete eso y hay que cumplirlo.</A11y.Item>
          <A11y.Item>El rótulo de grupo va como presentation: no es una fila que se pueda enfocar.</A11y.Item>
          <A11y.Item>Lo peligroso va en el rojo de tinta, no en el del relleno: sobre el papel, el relleno no llega a AA.</A11y.Item>
          <A11y.Item>Escape cierra solo el menú, no lo que haya detrás.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
