import { Accordion } from '@milo/ui/accordion'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function AccordionStory() {
  return (
    <Page
      title="Accordion"
      kind="Navegación"
      imports="import { Accordion } from '@milo/ui/accordion'"
      lead="Agrupa contenido que se puede expandir, como preguntas frecuentes o detalles de una configuración."
    >
      <Hero>
        <Accordion>
          <Accordion.Item defaultOpen>
            <Accordion.Summary>¿Qué pasa si publico sin fecha de cierre?</Accordion.Summary>
            <Accordion.Body>La actividad queda abierta hasta que la cierres a mano. Los estudiantes pueden seguir entregando.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Summary>¿Puedo corregir después de cerrar?</Accordion.Summary>
            <Accordion.Body>Sí. Cerrar solo impide entregas nuevas.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Summary>¿Se avisa a los estudiantes?</Accordion.Summary>
            <Accordion.Body>Al publicar, sí. Al cerrar, no: la fecha ya estaba a la vista desde el principio.</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Fila" required>`Accordion.Item`: una pregunta con su respuesta, que se abre y se cierra sola.</Anatomy.Part>
        <Anatomy.Part name="Resumen" required>`Accordion.Summary`: el texto que se toca.</Anatomy.Part>
        <Anatomy.Part name="Chevron">Gira al abrir, que es lo único que hace falta para saber si una fila está abierta.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo" required>`Accordion.Body`: lo que aparece al abrir la fila.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo fill label="Cómo se arma" code={`<Accordion>
  <Accordion.Item defaultOpen>
    <Accordion.Summary>¿Qué pasa si publico sin fecha de cierre?</Accordion.Summary>
    <Accordion.Body>La actividad queda abierta hasta que la cierres a mano. Los estudiantes pueden seguir entregando.</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Summary>¿Puedo corregir después de cerrar?</Accordion.Summary>
    <Accordion.Body>Sí. Cerrar solo impide entregas nuevas.</Accordion.Body>
  </Accordion.Item>
</Accordion>`}>
          <Accordion>
            <Accordion.Item defaultOpen>
              <Accordion.Summary>¿Qué pasa si publico sin fecha de cierre?</Accordion.Summary>
              <Accordion.Body>La actividad queda abierta hasta que la cierres a mano. Los estudiantes pueden seguir entregando.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Summary>¿Puedo corregir después de cerrar?</Accordion.Summary>
              <Accordion.Body>Sí. Cerrar solo impide entregas nuevas.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Demo>
        <Demo fill label="Varias abiertas a la vez: ninguna cierra a las otras" code={`<Accordion>
  <Accordion.Item defaultOpen>
    <Accordion.Summary>Quién ve la actividad</Accordion.Summary>
    <Accordion.Body>Los espacios en los que la publiques, y nadie más. Cambiarlo después no avisa de nuevo.</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item defaultOpen>
    <Accordion.Summary>Cómo se califica</Accordion.Summary>
    <Accordion.Body>Con la rúbrica que elijas, o con una nota suelta si no elegís ninguna.</Accordion.Body>
  </Accordion.Item>
</Accordion>`}>
          <Accordion>
            <Accordion.Item defaultOpen>
              <Accordion.Summary>Quién ve la actividad</Accordion.Summary>
              <Accordion.Body>Los espacios en los que la publiques, y nadie más. Cambiarlo después no avisa de nuevo.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item defaultOpen>
              <Accordion.Summary>Cómo se califica</Accordion.Summary>
              <Accordion.Body>Con la rúbrica que elijas, o con una nota suelta si no elegís ninguna.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Accordion" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El texto que se toca va en `Accordion.Summary` y lo que aparece en `Accordion.Body`.</Practices.Do>
          <Practices.Dont>No lo uses para esconder algo que hay que leer: lo cerrado no se lee.</Practices.Dont>
          <Practices.Dont>Tres filas que siempre se abren las tres son texto, no un acordeón. Y si las filas se comparan entre sí, van en [Tabs](#tabs).</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es `<details>` y `<summary>`, así que el estado abierto o cerrado lo anuncia el navegador sin ayuda.'}</A11y.Item>
          <A11y.Item>Enter y espacio abren y cierran, y el foco se ve con el mismo anillo que el resto del sistema.</A11y.Item>
          <A11y.Item>El contenido cerrado sigue estando en el documento: Ctrl+F lo encuentra.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
