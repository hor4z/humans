import { Breadcrumb } from '@milo/ui/breadcrumb'
import { A11y, Demo, Grid, Page, Practices, Props, Section } from '../kit'

export function BreadcrumbStory() {
  return (
    <Page
      title="Breadcrumb"
      kind="Navegación"
      imports="import { Breadcrumb } from '@milo/ui/breadcrumb'"
      lead="Dónde estás parado y cómo volver. Sirve cuando lo que estás mirando vive adentro de algo (una actividad adentro de un espacio) y no sirve cuando la pantalla es un destino suelto: una miga de un solo paso es ruido."
    >
      <Section
        title="De la raíz hasta acá"
        note="El último item es dónde estás y no es un link. Los de atrás sí lo son: son la forma de subir un nivel sin el botón del navegador."
      >
        <Grid min={340}>
          <Demo label="Ruta completa" code={`<Breadcrumb
  label="Ruta completa"
  items={[
    { label: 'Espacios', onClick: openSpaces },
    { label: 'Matemática · 4.º A', onClick: openSpace },
    { label: 'Fracciones equivalentes' },
  ]}
/>`}>
            <Breadcrumb label="Ruta completa" items={[
              { label: 'Espacios', onClick: () => {} },
              { label: 'Matemática · 4.º A', onClick: () => {} },
              { label: 'Fracciones equivalentes' },
            ]} />
          </Demo>
          <Demo label="Ruta corta" code={`<Breadcrumb label="Ruta corta" items={[{ label: 'Espacios', onClick: openSpaces }, { label: 'Lengua · 6.º' }]} />`}>
            <Breadcrumb label="Ruta corta" items={[{ label: 'Espacios', onClick: () => {} }, { label: 'Lengua · 6.º' }]} />
          </Demo>
        </Grid>
      </Section>

      <Section
        title="Con href o con onClick"
        note="`href` cuando hay una URL de verdad: el click del medio abre en otra pestaña. `onClick` cuando la navegación la maneja la app y no hay dirección que dar."
      >
        <Demo code={`<Breadcrumb
  label="Ruta con nombres largos"
  items={[
    { label: 'Espacios', href: '#breadcrumb' },
    { label: 'Ciencias · 5.º B', href: '#breadcrumb' },
    { label: 'El sistema solar' },
  ]}
/>`}>
          <Breadcrumb label="Ruta con nombres largos" items={[
            { label: 'Espacios', href: '#breadcrumb' },
            { label: 'Ciencias · 5.º B', href: '#breadcrumb' },
            { label: 'El sistema solar' },
          ]} />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Breadcrumb" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El último eslabón es dónde estás y no es un enlace.</Practices.Do>
          <Practices.Dont>Más de tres o cuatro pasos no: la fila deja de leerse y se corta en pantalla chica. Si la jerarquía es más profunda, lo que hay que revisar es la jerarquía.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es un <nav> con su nombre, así que un lector lo anuncia como la navegación de la página y lo puede saltear.'}</A11y.Item>
          <A11y.Item>El item actual lleva aria-current="page" y no es un link: no se puede ir a donde ya estás.</A11y.Item>
          <A11y.Item>Los separadores son decorativos y no se leen: entre item e item no se escucha "barra".</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
