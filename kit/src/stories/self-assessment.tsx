import { useState } from 'react'
import { SelfAssessment, type Criterion } from '@humans/ui/blocks/rubric/self-assessment'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const criteria: Criterion[] = [
  {
    id: 'idea',
    label: 'La idea',
    weight: 3,
    color: 'green',
    levels: [
      'Poco clara: no se entiende qué vende ni a quién',
      'Se entiende qué vende, pero no por qué alguien lo compraría',
      'Clara y posible: se entiende qué vende, a quién y por qué',
      'Clara, posible y propia: hace algo que los que ya están no hacen',
    ],
  },
  {
    id: 'cuentas',
    label: 'Las cuentas',
    weight: 5,
    color: 'blue',
    levels: [
      'No logra resolverlas',
      'Resuelve algunas y necesita ayuda para el resto',
      'Resuelve bien costos, precio y ganancia',
      'Resuelve todo y llega al punto de equilibrio sin que se lo pidan dos veces',
    ],
  },
  {
    id: 'equipo',
    label: 'El trabajo en equipo',
    weight: 2,
    color: 'teal',
    levels: [
      'Lo hizo una sola persona',
      'Alguien quedó afuera de las decisiones',
      'Todos participan y cada uno puede contar lo que hizo el resto',
      'Todos participan y se repartieron el trabajo por lo que cada uno sabe hacer',
    ],
  },
]

export function SelfAssessmentStory() {
  const [value, setValue] = useState<Record<string, number>>({ idea: 2 })

  return (
    <Page
      title="SelfAssessment"
      kind="Rúbrica"
      imports="import { SelfAssessment } from '@humans/ui/blocks/rubric/self-assessment'"
      lead="Permite revisar el propio trabajo contra los criterios de una rúbrica."
    >
      <Hero>
        <Stack width="sm">
          <SelfAssessment criteria={criteria} value={value} onValueChange={setValue}>
            <SelfAssessment.Title>Dónde estás</SelfAssessment.Title>
          </SelfAssessment>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Cabecera" required>`SelfAssessment.Title` con el botón que pliega el panel y cuántos aspectos se ubicaron.</Anatomy.Part>
        <Anatomy.Part name="Barra">Cuenta aspectos ubicados, no niveles alcanzados: es el progreso de llenar la autoevaluación. Es de un solo color.</Anatomy.Part>
        <Anatomy.Part name="Aspecto">Una tarjeta plegable por aspecto que dice en cuál quedó o que está sin ubicar.</Anatomy.Part>
        <Anatomy.Part name="Niveles">Los cuatro renglones del aspecto, con opción única.</Anatomy.Part>
      </Anatomy>
      <Section title="A medio ubicar">
        <Panel>
          <Variant
            name="a medio ubicar"
            note="El mismo marco y el mismo `CriterionCard` que el panel del docente, con los mismos `Criterion`: acá no se corrige, se dice dónde estoy. Elegí un nivel en otro aspecto: el de arriba se cierra y el tramo de la barra se llena."
            code={`<SelfAssessment criteria={criteria} value={value} onValueChange={setValue}>
  <SelfAssessment.Title>Dónde estás, a medio ubicar</SelfAssessment.Title>
</SelfAssessment>`}
          >
            <Stack width="sm">
              <SelfAssessment
                criteria={criteria}
                value={value}
                onValueChange={setValue}
              >
                <SelfAssessment.Title>Dónde estás, a medio ubicar</SelfAssessment.Title>
              </SelfAssessment>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="SelfAssessment" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Dejá los cuatro niveles como opción única: son descripciones del mismo estado y solo una es cierta. Nadie logra Inicial camino a Excelente, así que marcar uno no puede dejar marcados los de arriba. Para lo que se cumple de a pasos está `Checklist`.</Practices.Do>
          <Practices.Do>Pasale los mismos aspectos que la rúbrica del docente: en cuanto los textos se separan, el estudiante se prepara para otra cosa de la que lo van a mirar.</Practices.Do>
          <Practices.Do>Dejala abierta antes de entregar y no después: sirve para corregir el trabajo, no para adivinar la nota.</Practices.Do>
          <Practices.Dont>No la uses para corregir: lo que acá se elige es de quien entrega, y mezclarlo con lo que puso el docente borra de quién era cada cosa. Para corregir está `RubricReview`.</Practices.Dont>
          <Practices.Dont>No le pongas un número al final: son cuatro descripciones, y la cifra las reemplaza por algo que se lee solo.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El panel entero se pliega desde su cabecera, y cada aspecto desde la suya: las dos son botones con `aria-expanded` y `aria-controls` que toman su nombre del título de al lado.</A11y.Item>
          <A11y.Item>Los niveles son un `radiogroup` nombrado con el aspecto: una sola parada de tabulación y las flechas mueven entre ellos.</A11y.Item>
          <A11y.Item>Plegado, el aspecto dice en cuál quedó o que está sin ubicar, así que no hace falta abrirlo para saberlo.</A11y.Item>
          <A11y.Item>La barra de arriba es decorativa: lo que cuenta está escrito al lado, en "3 aspectos".</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
