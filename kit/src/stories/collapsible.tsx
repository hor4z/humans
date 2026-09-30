import { useState } from 'react'
import { Collapsible } from '@milo/ui/collapsible'
import { Button } from '@milo/ui/button'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

function Plegable() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button variant="muted" size="sm" aria-expanded={open} aria-controls="detalle" onClick={() => setOpen(v => !v)} iconStart={<Collapsible.Chevron open={open} />}>
        Detalle
      </Button>
      <Collapsible open={open} id="detalle">
        <p>Cierra a los diez minutos sin actividad y guarda lo escrito.</p>
      </Collapsible>
    </div>
  )
}

export function CollapsibleStory() {
  return (
    <Page
      title="Collapsible"
      kind="Navegación"
      imports="import { Collapsible } from '@milo/ui/collapsible'"
      lead="Muestra u oculta contenido desde un disparador. Conserva la relación accesible entre ambos."
    >
      <Hero>
        <Plegable />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Cuerpo" required>El contenido plegable: cerrado queda `inert` y conserva su alto para animar.</Anatomy.Part>
        <Anatomy.Part name="Flecha">`Collapsible.Chevron`: a la derecha cerrado, hacia abajo abierto.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="El botón es tuyo: la pieza solo pliega" code={`const [open, setOpen] = useState(false)

<Button aria-expanded={open} aria-controls="detalle" onClick={() => setOpen(v => !v)} iconStart={<Collapsible.Chevron open={open} />}>
  Detalle
</Button>
<Collapsible open={open} id="detalle">
  <p>Cierra a los diez minutos sin actividad y guarda lo escrito.</p>
</Collapsible>`}>
          <Plegable />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Collapsible" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El botón lleva `aria-expanded` y `aria-controls` con el `id` del cuerpo.</Practices.Do>
          <Practices.Dont>Para preguntas y respuestas sueltas usá [Accordion](#accordion), que no necesita estado.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Cerrado, el cuerpo es `inert`: no se recorre con Tab ni lo lee un lector de pantalla.</A11y.Item>
          <A11y.Item>Con `prefers-reduced-motion` el alto salta sin animar.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
