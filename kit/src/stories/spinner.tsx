import cls from './spinner.module.css'
import { Button } from '@humans/ui/button'
import { Spinner } from '@humans/ui/spinner'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SpinnerStory() {
  return (
    <Page
      title="Spinner"
      kind="Avisos"
      imports="import { Spinner } from '@humans/ui/spinner'"
      lead="Indica que una operación está en curso cuando su progreso no se puede medir."
    >
      <Hero>
        <Spinner size={16} />
        <Spinner size={28} />
        <Spinner size={44} />
        <Button variant="brand" loading>Guardar</Button>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Pista" required>El círculo completo, apagado.</Anatomy.Part>
        <Anatomy.Part name="Arco" required>De largo fijo: lo único que hace es girar. El trazo crece con el diámetro, así que se lee igual adentro de un botón chico que en el medio de una pantalla.</Anatomy.Part>
        <Anatomy.Part name="Nombre">`label`: lo que se está cargando, para quien no lo ve.</Anatomy.Part>
      </Anatomy>

      <Section title="Tamaños y contexto">
        <Panel>
          <Variant name="16 · 20 · 28 · 44" note="16 adentro de un botón o de una fila, 20 y 28 en un panel, 44 cuando ocupa solo el medio de una pantalla." code={`<Spinner size={16} />
<Spinner size={20} />
<Spinner size={28} />
<Spinner size={44} />`}>
            <Spinner size={16} />
            <Spinner size={20} />
            <Spinner size={28} />
            <Spinner size={44} />
          </Variant>
          <Variant
            name="en un botón"
            note="Adentro de un botón oscuro va `on=&quot;solid&quot;`, o el filo blanco se ve como un halo."
            code={`<Button variant="solid" aria-busy><Spinner size={16} on="solid" />Guardando</Button>
<Button variant="muted" aria-busy><Spinner size={16} />Guardando</Button>`}
          >
            <Button variant="solid" aria-busy><Spinner size={16} on="solid" />Guardando</Button>
            <Button variant="muted" aria-busy><Spinner size={16} />Guardando</Button>
          </Variant>
          <Variant
            name="en una fila"
            note="Al lado de un texto va en 16, y el texto dice qué se está esperando."
            code={`<Spinner size={16} />
Buscando en siete espacios`}
          >
            <span className={cls.inlineWait}>
              <Spinner size={16} />
              Buscando en siete espacios
            </span>
          </Variant>
        </Panel>
        <Demo label="Con lo que está cargando" note="Cuando va solo en un panel, sin texto al lado, `label` nombra lo que se espera, como las entregas de la actividad." code={`<Spinner label="Cargando las entregas" />`}>
          <Spinner label="Cargando las entregas" />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Spinner" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Adentro de un control va `on="control"`, que pinta el hueco del color del relleno.</Practices.Do>
          <Practices.Dont>Para una pantalla entera va un `Skeleton`: el girador no dice qué está por venir.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Lleva `role="status"` y un nombre, así que un lector dice qué está cargando.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
