import { useState } from 'react'
import { RubricReview, type Criterion, type Mark } from '@milo/ui/blocks/rubric/rubric-review'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const criteria: Criterion[] = [
  {
    id: 'medicion',
    label: 'Cómo midieron',
    detail: 'Se mira que los números se puedan comparar entre sí: el mismo aparato en todas las mediciones, los mismos tres momentos en todos los lugares, y anotado qué estaba pasando alrededor.',
    weight: 5,
    color: 'green',
    levels: [
      'Midieron una sola vez en cada lugar',
      'Midieron los tres momentos, pero no en todos los lugares',
      'Los cinco lugares en los tres momentos, siempre con el mismo teléfono',
      'Todo con el mismo teléfono, y anotado qué estaba pasando alrededor en cada medición',
    ],
  },
  {
    id: 'grafico',
    label: 'El gráfico',
    weight: 4,
    color: 'teal',
    levels: [
      'Los números en una lista, sin gráfico',
      'Un gráfico, pero sin decir qué es cada eje',
      'Con la unidad en el eje y los cinco lugares comparables de un vistazo',
      'Con la unidad, los tres momentos distinguidos y el orden elegido para que se lea algo',
    ],
  },
  {
    id: 'propuesta',
    label: 'La propuesta',
    weight: 4,
    color: 'blue',
    levels: [
      'Dice que hay mucho ruido',
      'Propone algo, sin decir de qué medición sale',
      'Propone algo que se puede hacer el lunes, apoyado en el gráfico',
      'Propone algo para el lunes, dice de qué medición sale y cómo se sabría si funcionó',
    ],
  },
]

const amelia = { name: 'Amelia', assistant: true }
const ana = { name: 'Ana Pérez', src: '/avatars/04.webp' }

const returned: Record<string, Mark> = {
  medicion: {
    level: 2,
    note: { by: amelia, text: 'Los cinco lugares en los tres momentos y siempre el mismo teléfono. Para el de abajo falta anotar qué pasaba alrededor.' },
  },
  grafico: {
    level: 3,
    note: { by: ana, text: 'Impecable: la unidad en el eje y los tres momentos distinguidos.' },
  },
  propuesta: {
    level: 1,
    note: { by: amelia, text: 'Proponés cortinas en la biblioteca, pero no decís de qué medición sale.' },
  },
}

export function RubricReviewStory() {
  const [marks, setMarks] = useState<Record<string, Mark>>({
    medicion: { level: 2 },
  })

  return (
    <Page
      title="RubricReview"
      kind="Rúbrica"
      imports="import { RubricReview } from '@milo/ui/blocks/rubric/rubric-review'"
      lead="Cómo le fue a un trabajo contra su rúbrica: qué cumplió de cada aspecto y qué le dijeron. La misma pieza sirve para corregir y para leer la devolución, porque es la misma información vista desde los dos lados."
    >
      <Hero>
        <Stack width="sm">
          <RubricReview criteria={criteria} value={returned}>
            <RubricReview.Title>Cómo te fue</RubricReview.Title>
          </RubricReview>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Cabecera" required>`RubricReview.Title` con el botón que pliega el panel.</Anatomy.Part>
        <Anatomy.Part name="Barra">Cada tramo es un aspecto y se llena hasta el nivel elegido, sin nota ni puntaje.</Anatomy.Part>
        <Anatomy.Part name="Aspecto">Una tarjeta por aspecto, con "sin corregir" al lado del nombre mientras no se tocó.</Anatomy.Part>
        <Anatomy.Part name="Renglones">Los niveles del aspecto. Corrigiendo se elige uno solo; leyendo, queda marcado el que se eligió.</Anatomy.Part>
        <Anatomy.Part name="Comentario">Al lado del aspecto, con la firma de quien lo escribió: una persona o el asistente.</Anatomy.Part>
      </Anatomy>
      <Section title="Corrigiendo y la devolución">
        <Panel>
          <Variant
            name="a medio corregir"
            note="Se marca un renglón por aspecto: son descripciones del mismo estado y solo una es cierta. Elegí un nivel en El gráfico y mirá cómo se llena su tramo."
            code={`<RubricReview
  criteria={criteria}
  value={marks}
  by={ana}
  onValueChange={setMarks}
>
  <RubricReview.Title>Entrega</RubricReview.Title>
</RubricReview>`}
          >
            <Stack width="sm">
              <RubricReview
                criteria={criteria}
                value={marks}
                by={ana}
                onValueChange={setMarks}
              >
                <RubricReview.Title>Entrega</RubricReview.Title>
              </RubricReview>
            </Stack>
          </Variant>
          <Variant
            name="lo que ve quien entregó"
            note="Sin `onValueChange` es la devolución: en qué renglón quedó cada aspecto y qué le dijeron."
            code={`<RubricReview criteria={criteria} value={returned}>
  <RubricReview.Title>Cómo te fue</RubricReview.Title>
</RubricReview>`}
          >
            <Stack width="sm">
              <RubricReview criteria={criteria} value={returned}>
                <RubricReview.Title>Cómo te fue</RubricReview.Title>
              </RubricReview>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="RubricReview" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Dejá que comenten una persona o un agente sobre el mismo aspecto: cambia la firma y nada más.</Practices.Do>
          <Practices.Do>Comentá al lado del aspecto que lo motiva: un comentario general al final se lee como un veredicto y no como una ayuda.</Practices.Do>
          <Practices.Do>Dejá el aspecto sin tocar mientras no se corrigió: "sin corregir" al lado del nombre es lo que le dice a quien corrige dónde quedó.</Practices.Do>
          <Practices.Do>Firmá siempre lo que escribe un agente: quien lee tiene derecho a saber si eso lo miró una persona.</Practices.Do>
          <Practices.Dont>No la uses para poner una nota: si el producto necesita una cifra, va aparte y no adentro de la devolución.</Practices.Dont>
          <Practices.Dont>No escondas los renglones sin tildar: son los que dicen qué hacer la próxima vez.</Practices.Dont>
          <Practices.Dont>No le agregues un "no cumple" por renglón: el nivel de abajo ya es la descripción negativa, y una pantalla de cruces se lee como un veredicto.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Corrigiendo, los renglones son un grupo de opción única nombrado con el aspecto: una sola parada de tabulación y las flechas mueven entre ellos.</A11y.Item>
          <A11y.Item>Leyendo, el renglón elegido lo dice en un texto que solo alcanza un lector de pantalla: no depende de ver el tilde.</A11y.Item>
          <A11y.Item>La barra es decorativa: lo que dice está escrito en cada aspecto.</A11y.Item>
          <A11y.Item>El campo de comentario dice sobre qué aspecto es, porque hay uno por tarjeta.</A11y.Item>
          <A11y.Item>La firma de un agente se lee como texto ("asistente") y no solo como un glifo.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
