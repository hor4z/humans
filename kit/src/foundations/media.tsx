import cls from './media.module.css'
import { Table } from '@milo/ui/table'
import { A11y, Page, Rich, Section } from '../kit'

const media = [
  ['Imagen', 'Figure', 'Lo que se entiende de un vistazo.', 'Texto alternativo y proporción reservada antes de cargar. Sin texto adentro.'],
  ['Audio', 'AudioPlayer', 'La voz de alguien: llega el tono, que un texto no lleva.', 'Su transcripción y la onda. No arranca solo.'],
  ['Video', 'todavía no hay pieza', 'Lo que pasa en el tiempo: un procedimiento, un experimento.', 'Subtítulos y controles desde el primer cuadro, en su proporción original.'],
  ['Animación', 'todavía no hay pieza', 'Un gesto corto que acompaña y no informa.', 'Con `prefers-reduced-motion` se reemplaza por la imagen quieta, no se atenúa.'],
] as const

const written = [
  ['Subtítulos', 'El diálogo, escrito y sincronizado.'],
  ['Leyendas', 'Todo lo que suena, no solo el diálogo: el golpe, la campana, el silencio que significa algo.'],
  ['Audiodescripción', 'Narra hablado lo que solo se ve. Es la que siempre se olvida y la única que sirve a quien no ve el video.'],
  ['Transcripción', 'El texto completo de lo que se oye y se ve, fuera de la línea de tiempo.'],
] as const

const rules = [
  ['Nada suena sin que alguien lo pida', 'Ni un audio, ni un aviso, ni un efecto. Si dos pueden sonar juntos, arrancar uno detiene al otro.'],
  ['La proporción se reserva antes de cargar', 'Es la del archivo: con las barras negras metidas adentro del cuadro el sistema ya no puede escalar bien.'],
  ['El alt dice para qué está, no qué se ve', 'Decorativa va con `alt=""` y el lector la saltea. Si es contenido y no entra en una línea, era texto.'],
  ['El volumen es del sistema operativo', 'Un control adentro compite con el de afuera y pierde.'],
  ['La velocidad va a la vista', 'Es de quien escucha, y no vive en un menú.'],
  ['Los avisos no suenan', 'Lo que pasa se dice en pantalla, donde se puede volver a mirar.'],
  ['Lo que pesa se mide', 'Una red escolar es el piso. Un video va cuando el tiempo es el contenido y no cuando queda lindo.'],
] as const

export function MediaSection() {
  return (
    <Page
      title="Medios"
      kind="Fundamentos"
      lead="Imagen, audio, video y animación: cuál va cuándo y qué pide cada uno para estar terminado."
    >
      <Section title="Cuatro medios" note="La pregunta no es cuál se ve mejor: es qué parte de lo que hay que entender vive en el tiempo, cuál en el espacio y cuál en el tono de alguien.">
        <Table label="Los cuatro medios" minWidth={640}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Medio</Table.Head>
              <Table.Head>Pieza</Table.Head>
              <Table.Head>Resuelve</Table.Head>
              <Table.Head>Pide</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {media.map(([name, piece, solves, needs]) => (
              <Table.Row key={name}>
                <Table.Cell><strong>{name}</strong></Table.Cell>
                <Table.Cell><code className={cls.piece}>{piece}</code></Table.Cell>
                <Table.Cell>{solves}</Table.Cell>
                <Table.Cell><Rich text={needs} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="Las cuatro formas escritas" note="No se reemplazan entre sí: cada una cubre a alguien que las otras no.">
        <Table label="Las formas escritas de un medio" minWidth={420}>
          <Table.Body>
            {written.map(([name, what]) => (
              <Table.Row key={name}>
                <Table.Cell><strong>{name}</strong></Table.Cell>
                <Table.Cell>{what}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="Las reglas" note="Valen para cualquier medio. Salen de las Human Interface Guidelines, salvo el peso en una red escolar y el silencio de los avisos, que son de acá.">
        <Table label="Reglas de medios" minWidth={420}>
          <Table.Body>
            {rules.map(([name, how]) => (
              <Table.Row key={name}>
                <Table.Cell><strong>{name}</strong></Table.Cell>
                <Table.Cell><Rich text={how} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <A11y>
        <A11y.Item>Nada arranca solo, así que un lector de pantalla nunca compite con un audio del sistema.</A11y.Item>
        <A11y.Item>El botón dice lo que va a hacer, y el tiempo se anuncia como "0:45 de 1:30" y no como un número suelto. La onda va `aria-hidden`.</A11y.Item>
        <A11y.Item>Todo lo hablado tiene su texto, y una animación se reemplaza por su cuadro quieto con `prefers-reduced-motion`.</A11y.Item>
      </A11y>
    </Page>
  )
}
