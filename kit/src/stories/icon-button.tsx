import cls from './icon-button.module.css'
import { IconButton } from '@humans/ui/icon-button'
import { Button } from '@humans/ui/button'
import { Indicator } from '@humans/ui/indicator'
import { Tooltip } from '@humans/ui/tooltip'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function IconButtonStory() {
  return (
    <Page
      title="IconButton"
      kind="Acciones"
      imports="import { IconButton } from '@humans/ui/icon-button'
import { Indicator } from '@humans/ui/indicator'"
      lead="Ejecuta una acción mediante un icono. Requiere un nombre accesible que describa esa acción."
    >
      <Hero>
        <IconButton icon="tune" label="Ajustes" />
        <IconButton icon="edit" label="Editar" variant="muted" />
        <IconButton icon="check" label="Aceptar" variant="solid" />
        <IconButton icon="add" label="Nueva actividad" variant="brand" />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Icono" required>`icon`: el glifo, que es todo lo que se ve.</Anatomy.Part>
        <Anatomy.Part name="Nombre">`label`: no se ve, es el nombre accesible del botón.</Anatomy.Part>
      </Anatomy>

      <Section title="Tamaños y variantes">
        <Panel>
          <Variant
            name="sm · md · lg"
            note="`sm` en una barra o adentro de una fila, `md` suelto, `lg` donde se toca con el dedo. Al lado de un `Button` va con el mismo `size`."
            code={`<IconButton icon="tune" label="Ajustes" size="sm" variant="muted" />
<IconButton icon="tune" label="Ajustes" size="md" variant="muted" />
<IconButton icon="tune" label="Ajustes" size="lg" variant="muted" />
<Button size="md" variant="muted">Exportar</Button>
<IconButton icon="tune" label="Ajustes" size="md" variant="muted" />`}
          >
            <IconButton icon="tune" label="Ajustes" size="sm" variant="muted" />
            <IconButton icon="tune" label="Ajustes" size="md" variant="muted" />
            <IconButton icon="tune" label="Ajustes" size="lg" variant="muted" />
            <Button size="md" variant="muted">Exportar</Button>
            <IconButton icon="tune" label="Ajustes" size="md" variant="muted" />
          </Variant>
          <Variant
            name="ghost · muted · solid · brand"
            note="`ghost` en una barra, `muted` cuando tiene que encontrarse solo, `brand` para la acción que manda."
            code={`<IconButton icon="tune" label="Ajustes" />
<IconButton icon="edit" label="Editar" variant="muted" />
<IconButton icon="check" label="Aceptar" variant="solid" />
<IconButton icon="add" label="Nueva actividad" variant="brand" />`}
          >
            <IconButton icon="tune" label="Ajustes" />
            <IconButton icon="edit" label="Editar" variant="muted" />
            <IconButton icon="check" label="Aceptar" variant="solid" />
            <IconButton icon="add" label="Nueva actividad" variant="brand" />
          </Variant>
        </Panel>
      </Section>

      <Section title="Estados">
        <Panel>
          <Variant
            name="active · disabled"
            note="`active` es para el botón cuyo panel está abierto, o el filtro que está puesto. Apagado no responde y se ve que no responde."
            code={`<IconButton icon="filter_alt" label="Filtrar" active />
<IconButton icon="delete" label="Eliminar" disabled />`}
          >
            <IconButton icon="filter_alt" label="Filtrar" active />
            <IconButton icon="delete" label="Eliminar" disabled />
          </Variant>
        </Panel>
      </Section>

      <Section title="Dónde aparece de verdad" note="Casi nunca va suelto: va en una fila, en una cabecera o en una barra.">
        <Panel>
          <Variant
            name="la acción de una fila"
            note="`ghost` y `sm`: la fila ya tiene su marco."
            code={`<IconButton icon="more_horiz" label="Más opciones de Fracciones equivalentes" size="sm" />`}
          >
            <span className={cls.rowSample}>
              <span className={cls.rowText}>Fracciones equivalentes</span>
              <IconButton icon="more_horiz" label="Más opciones de Fracciones equivalentes" size="sm" />
            </span>
          </Variant>
          <Variant
            name="con ayuda y con una marca"
            note="La etiqueta visible la pone `Tooltip` y el puntito lo pone `Indicator`: este botón no tiene una prop para ninguno de los dos."
            code={`<Tooltip label="Exportar a CSV">
  <IconButton icon="download" label="Exportar" variant="muted" onClick={exportCsv} />
</Tooltip>
<Indicator dot label="Hay avisos sin leer" inset={6}>
  <IconButton icon="notifications" label="Novedades" variant="muted" />
</Indicator>`}
          >
            <Tooltip label="Exportar a CSV">
              <IconButton icon="download" label="Exportar" variant="muted" />
            </Tooltip>
            <Indicator dot label="Hay avisos sin leer" inset={6}>
              <IconButton icon="notifications" label="Novedades" variant="muted" />
            </Indicator>
          </Variant>
          <Variant
            name="uno al lado del otro"
            note="En una barra van sin caja y separados por el aire."
            code={`<IconButton icon="undo" label="Deshacer" size="sm" />
<IconButton icon="redo" label="Rehacer" size="sm" />
<IconButton icon="content_copy" label="Duplicar" size="sm" />
<IconButton icon="delete" label="Eliminar" size="sm" />`}
          >
            <IconButton icon="undo" label="Deshacer" size="sm" />
            <IconButton icon="redo" label="Rehacer" size="sm" />
            <IconButton icon="content_copy" label="Duplicar" size="sm" />
            <IconButton icon="delete" label="Eliminar" size="sm" />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="IconButton" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`label` siempre: adentro solo hay un glifo y sin eso el botón no dice nada.</Practices.Do>
          <Practices.Do>Elegí el glifo por lo que hace, no por lo que decora.</Practices.Do>
          <Practices.Dont>No lo uses para la acción principal de una pantalla: un icono solo se reconoce, no se lee.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El `label` es obligatorio y se convierte en el nombre accesible: un icono solo no dice nada.</A11y.Item>
          <A11y.Item>No lleva `title` nativo, que era una segunda caja del sistema operativo diciendo lo mismo.</A11y.Item>
          <A11y.Item>Para la ayuda visual se envuelve en `Tooltip`, que aparece también con el teclado.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
