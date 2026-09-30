import { Button } from '@milo/ui/button'
import { Dropdown } from '@milo/ui/dropdown'
import { Icon } from '@milo/ui/icon'
import { IconButton } from '@milo/ui/icon-button'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function DropdownStory() {
  return (
    <Page
      title="Dropdown"
      lead="Un menú de cuatro items escrito como lista. No lleva velo: el velo va para lo que pide leerse entero, y un menú corto no lo pide."
      kind="Acciones"
      imports="import { Dropdown } from '@milo/ui/dropdown'"
    >
      <Hero>
        <Dropdown
          width={220}
          items={[
            { label: 'Mi perfil', icon: 'person' },
            { label: 'Plan', icon: 'credit_card' },
            { label: 'Ajustes', icon: 'tune' },
            { label: 'Salir', icon: 'logout' },
          ]}
          trigger={props => (
            <Button {...props} variant="muted" iconEnd={<Icon name="keyboard_arrow_down" />}>Abrir menú</Button>
          )}
        />
        <Dropdown
          label="Más opciones"
          items={[
            { label: 'Duplicar', icon: 'content_copy', onSelect: () => {} },
            { label: 'Eliminar', icon: 'delete', danger: true, onSelect: () => {} },
          ]}
          trigger={props => <IconButton {...props} icon="more_horiz" label="Más opciones" />}
        />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Disparador" required>`trigger`: cualquier botón del sistema, que recibe `onClick`, `ref` y `aria-expanded`.</Anatomy.Part>
        <Anatomy.Part name="Panel">La lista que se abre anclada al disparador, alineada al comienzo o al final.</Anatomy.Part>
        <Anatomy.Part name="Opción" required>Un `DropdownItem` de `items`: su `label` y su `onSelect`.</Anatomy.Part>
        <Anatomy.Part name="Icono">`icon`: el glifo de la izquierda, en gris.</Anatomy.Part>
        <Anatomy.Part name="Atajo">`shortcut`: la tecla, a la derecha, en un `Kbd`.</Anatomy.Part>
      </Anatomy>

      <Section title="Disparador y opciones">
        <Panel>
          <Variant
            name="con un botón y con un IconButton"
            note="El disparador puede ser cualquier botón del sistema. `align` elige de qué lado se ancla el panel."
            code={`<Dropdown
  width={220}
  items={[
    { label: 'Mi perfil', icon: 'person' },
    { label: 'Plan', icon: 'credit_card' },
    { label: 'Ajustes', icon: 'tune' },
    { label: 'Salir', icon: 'logout' },
  ]}
  trigger={props => (
    <Button {...props} variant="muted" iconEnd={<Icon name="keyboard_arrow_down" />}>Abrir menú</Button>
  )}
/>
<Dropdown
  label="Más opciones"
  items={[
    { label: 'Duplicar', icon: 'content_copy', onSelect: duplicate },
    { label: 'Eliminar', icon: 'delete', danger: true, onSelect: remove },
  ]}
  trigger={props => <IconButton {...props} icon="more_horiz" label="Más opciones" />}
/>`}
          >
            <Dropdown
              width={220}
              items={[
                { label: 'Mi perfil', icon: 'person' },
                { label: 'Plan', icon: 'credit_card' },
                { label: 'Ajustes', icon: 'tune' },
                { label: 'Salir', icon: 'logout' },
              ]}
              trigger={props => (
                <Button {...props} variant="muted" iconEnd={<Icon name="keyboard_arrow_down" />}>Abrir menú</Button>
              )}
            />
            <Dropdown
              label="Más opciones"
              items={[
                { label: 'Duplicar', icon: 'content_copy', onSelect: () => {} },
                { label: 'Eliminar', icon: 'delete', danger: true, onSelect: () => {} },
              ]}
              trigger={props => <IconButton {...props} icon="more_horiz" label="Más opciones" />}
            />
          </Variant>
          <Variant
            name="con atajos y una peligrosa"
            note="Un glifo adelante, el atajo de teclado a la derecha y el rojo de lo que no se deshace."
            code={`<Dropdown
  align="start"
  width={240}
  items={[
    { label: 'Duplicar', icon: 'content_copy', shortcut: '⌘D' },
    { label: 'Descargar', icon: 'download', shortcut: '⌘S' },
    { label: 'Archivar', icon: 'inventory_2', disabled: true },
    { label: 'Borrar', icon: 'delete', danger: true },
  ]}
  trigger={props => (
    <Button {...props} variant="muted" iconStart={<Icon name="more_horiz" />}>Acciones</Button>
  )}
/>`}
          >
            <Dropdown
              align="start"
              width={240}
              items={[
                { label: 'Duplicar', icon: 'content_copy', shortcut: '⌘D' },
                { label: 'Descargar', icon: 'download', shortcut: '⌘S' },
                { label: 'Archivar', icon: 'inventory_2', disabled: true },
                { label: 'Borrar', icon: 'delete', danger: true },
              ]}
              trigger={props => (
                <Button {...props} variant="muted" iconStart={<Icon name="more_horiz" />}>Acciones</Button>
              )}
            />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of={['Dropdown', 'DropdownItem']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El disparador recibe `onClick`, `ref` y `aria-expanded`: pasáselos enteros o el panel no se ancla.</Practices.Do>
          <Practices.Dont>Si la lista pide leerse entera, va un `Popover` con velo y no un menú de cuatro items.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El panel es role="menu" y cada opción un menuitem.</A11y.Item>
          <A11y.Item>Las flechas recorren las opciones y dan la vuelta; Home y End van a los extremos, y las dos saltean lo apagado.</A11y.Item>
          <A11y.Item>El disparador dice si está abierto con `aria-expanded`, y al cerrar el foco vuelve a él.</A11y.Item>
          <A11y.Item>Escape cierra solo este menú y deja abierto lo que haya detrás, por la pila global.</A11y.Item>
          <A11y.Item>Cierra con pointerdown y no con click: el mismo gesto que abre otro menú no lo reabre.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
