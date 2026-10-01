import { Breadcrumb } from '@humans/ui/breadcrumb'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function BreadcrumbStory() {
  return (
    <Page
      title="Breadcrumb"
      kind="Navegación"
      imports="import { Breadcrumb } from '@humans/ui/breadcrumb'"
      lead="Muestra la ubicación dentro de una jerarquía y permite volver a sus niveles anteriores."
    >
      <Hero>
        <Breadcrumb label="Ruta completa" items={[
          { label: 'Espacios', onClick: () => {} },
          { label: 'Matemática · 4.º A', onClick: () => {} },
          { label: 'Fracciones equivalentes' },
        ]} />
        <Breadcrumb label="Ruta corta" items={[{ label: 'Espacios', onClick: () => {} }, { label: 'Lengua · 6.º' }]} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Eslabón" required>Cada paso de la ruta, de la raíz hasta acá. Los de atrás son links: la forma de subir un nivel sin el botón del navegador.</Anatomy.Part>
        <Anatomy.Part name="Eslabón actual" required>El último. Es dónde estás y no es un link.</Anatomy.Part>
        <Anatomy.Part name="Separador">El chevron entre un eslabón y el siguiente. Es decorativo.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo
          label="Con `onClick` o con `href`"
          note="Va arriba del título, en una pantalla que vive adentro de un espacio, como una actividad dentro de su curso."
          code={`<Breadcrumb
  label="Ruta con onClick"
  items={[{ label: 'Espacios', onClick: openSpaces }, { label: 'Lengua · 6.º' }]}
/>
<Breadcrumb
  label="Ruta con href"
  items={[
    { label: 'Espacios', href: '#breadcrumb' },
    { label: 'Ciencias · 5.º B', href: '#breadcrumb' },
    { label: 'El sistema solar' },
  ]}
/>`}
        >
          <Breadcrumb label="Ruta con onClick" items={[{ label: 'Espacios', onClick: () => {} }, { label: 'Lengua · 6.º' }]} />
          <Breadcrumb label="Ruta con href" items={[
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
          <Practices.Do>`href` cuando hay una URL de verdad: el click del medio abre en otra pestaña. `onClick` cuando la navegación la maneja la app y no hay dirección que dar.</Practices.Do>
          <Practices.Do>El último eslabón es dónde estás y no es un enlace.</Practices.Do>
          <Practices.Dont>Una pantalla que es un destino suelto no lleva miga: un solo paso es ruido.</Practices.Dont>
          <Practices.Dont>Más de tres o cuatro pasos no: la fila deja de leerse y se corta en pantalla chica. Si la jerarquía es más profunda, lo que hay que revisar es la jerarquía.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es un `<nav>` con su nombre, así que un lector lo anuncia como la navegación de la página y lo puede saltear.'}</A11y.Item>
          <A11y.Item>El item actual lleva `aria-current="page"` y no es un link: no se puede ir a donde ya estás.</A11y.Item>
          <A11y.Item>Los separadores son decorativos y no se leen: entre item e item no se escucha "barra".</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
