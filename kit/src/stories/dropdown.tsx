import { Button } from '@milo/ui/button'
import { Dropdown } from '@milo/ui/dropdown'
import { Icon } from '@milo/ui/icon'
import { IconButton } from '@milo/ui/icon-button'
import { A11y, Cluster, Demo, Page, Practices, Props, Section } from '../kit'

export function DropdownStory() {
  return (
    <Page
      title="Dropdown"
      lead="Un menú de cuatro items. No lleva velo: el velo va para lo que pide leerse entero, y un menú corto no lo pide. Cierra con Escape, que usa una pila global: cierra el overlay de arriba y no todos."
      kind="Acciones"
      imports="import { Dropdown } from '@milo/ui/dropdown'"
    >
      <Section title="Vivo" note="El disparador puede ser cualquier botón del sistema.">
        <Cluster align="start">
          <Demo label="align end · width 220" code={`<Dropdown
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
/>`}>
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
          </Demo>
          <Demo label="align start" code={`<Dropdown
  align="start"
  width={200}
  items={[
    { label: 'Duplicar', icon: 'content_copy' },
    { label: 'Descargar', icon: 'download' },
    { label: 'Eliminar', icon: 'delete' },
  ]}
  trigger={props => (
    <Button {...props} variant="muted" iconStart={<Icon name="more_horiz" />}>Acciones</Button>
  )}
/>`}>
            <Dropdown
              align="start"
              width={200}
              items={[
                { label: 'Duplicar', icon: 'content_copy' },
                { label: 'Descargar', icon: 'download' },
                { label: 'Eliminar', icon: 'delete' },
              ]}
              trigger={props => (
                <Button {...props} variant="muted" iconStart={<Icon name="more_horiz" />}>Acciones</Button>
              )}
            />
          </Demo>
          <Demo label="con un IconButton" code={`<Dropdown
  label="Más opciones"
  items={[
    { label: 'Duplicar', icon: 'content_copy', onSelect: duplicate },
    { label: 'Eliminar', icon: 'delete', danger: true, onSelect: remove },
  ]}
  trigger={props => <IconButton {...props} icon="more_horiz" label="Más opciones" />}
/>`}>
            <Dropdown
              label="Más opciones"
              items={[
                { label: 'Duplicar', icon: 'content_copy', onSelect: () => {} },
                { label: 'Eliminar', icon: 'delete', danger: true, onSelect: () => {} },
              ]}
              trigger={props => <IconButton {...props} icon="more_horiz" label="Más opciones" />}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Lo que puede llevar una opción"
        note="Un glifo adelante, el atajo de teclado a la derecha y el rojo de lo que no se deshace."
      >
        <Cluster align="start">
          <Demo label="con atajos y una peligrosa" code={`<Dropdown
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
/>`}>
            <Dropdown
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
          </Demo>
        </Cluster>
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
