import { useState } from 'react'
import { CriterionCard, type Criterion } from '@milo/ui/blocks/rubric/criterion-card'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const chart: Criterion = {
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
}

const measurement: Criterion = {
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
}

export function CriterionCardStory() {
  const [open, setOpen] = useState<string | null>('grafico')
  const [detailOpen, setDetailOpen] = useState(true)
  const [readOpen, setReadOpen] = useState(true)
  const toggle = (id: string) => setOpen(o => (o === id ? null : id))

  return (
    <Page
      title="CriterionCard"
      kind="Rúbrica"
      imports="import { CriterionCard } from '@milo/ui/blocks/rubric/criterion-card'"
      lead="Un aspecto adentro de una rúbrica: la marca, el nombre y, plegados, sus renglones. Cerrada ocupa una fila, así que una rúbrica de ocho aspectos mide lo mismo que una de dos."
    >
      <Hero>
        <Stack width="sm">
          <CriterionCard criterion={chart} total={15} open={open === 'grafico'} onOpenChange={() => toggle('grafico')} onRemove={() => {}} />
          <CriterionCard criterion={measurement} total={15} open={open === 'medicion'} onOpenChange={() => toggle('medicion')} onRemove={() => {}} />
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Marca" required>El glifo en el color del aspecto, que lo ata con su tramo de la barra. Es decorativa.</Anatomy.Part>
        <Anatomy.Part name="Nombre" required>`label`: lo único que se ve plegada, así que entra en una línea. Tope de 56.</Anatomy.Part>
        <Anatomy.Part name="Flecha" required>Pliega y despliega la tarjeta. Es controlada: quien la contiene decide cuál está abierta.</Anatomy.Part>
        <Anatomy.Part name="Tacho">Con `onRemove`: saca el aspecto. Sin él, la tarjeta es de solo lectura.</Anatomy.Part>
        <Anatomy.Part name="Descripción">`detail`: se lee recién al abrirla, arriba de los renglones. Tope de 220.</Anatomy.Part>
        <Anatomy.Part name="Renglones" required>Los `levels` del aspecto, visibles al abrir.</Anatomy.Part>
      </Anatomy>
      <Section title="Abierta, con descripción y de solo lectura">
        <Panel>
          <Variant
            name="una abierta por vez"
            note="Tocá la flecha de la otra: la primera se cierra sola."
            code={`<CriterionCard
  criterion={chart}
  total={15}
  open={open === 'grafico'}
  onOpenChange={() => toggle('grafico')}
  onRemove={removeChart}
/>
<CriterionCard
  criterion={measurement}
  total={15}
  open={open === 'medicion'}
  onOpenChange={() => toggle('medicion')}
  onRemove={removeMeasurement}
/>`}
          >
            <Stack width="sm">
              <CriterionCard
                criterion={chart}
                total={15}
                open={open === 'grafico'}
                onOpenChange={() => toggle('grafico')}
                onRemove={() => {}}
              />
              <CriterionCard
                criterion={measurement}
                total={15}
                open={open === 'medicion'}
                onOpenChange={() => toggle('medicion')}
                onRemove={() => {}}
              />
            </Stack>
          </Variant>
          <Variant
            name="con descripción y de solo lectura"
            note="`detail` se lee recién al abrirla, arriba de los renglones. Sin `onRemove` no hay tacho: es la misma tarjeta para quien no escribió la rúbrica."
            code={`<CriterionCard criterion={measurement} total={15} open={detailOpen} onOpenChange={setDetailOpen} />
<CriterionCard criterion={chart} total={15} open={readOpen} onOpenChange={setReadOpen} />`}
          >
            <Stack width="sm">
              <CriterionCard criterion={measurement} total={15} open={detailOpen} onOpenChange={setDetailOpen} />
              <CriterionCard criterion={chart} total={15} open={readOpen} onOpenChange={setReadOpen} />
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="CriterionCard" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Dejá el nombre y la descripción como dos campos: se leen en momentos distintos, y `criterionLimits` declara los topes (56 y 220). Un aspecto que necesita más que eso son dos aspectos.</Practices.Do>
          <Practices.Do>Dejá una sola abierta: la rúbrica se lee de arriba abajo y el panel no crece con cada aspecto.</Practices.Do>
          <Practices.Do>Si el nombre no entra en una línea, lo que sobra va en `detail` y no adentro del nombre: plegada la tarjeta muestra el nombre solo, y uno de cuatro renglones deja de ser una fila.</Practices.Do>
          <Practices.Do>Pasale `total` aunque no lo muestres: sin él, el porcentaje que escucha un lector de pantalla sería otro.</Practices.Do>
          <Practices.Dont>No le pongas número a cada renglón: el orden ya lo dice la posición, y el número invita a leer la rúbrica como una nota.</Practices.Dont>
          <Practices.Dont>No la uses suelta como tarjeta de cualquier cosa: es de una rúbrica, y lo que dice en voz alta ("vale 25% de la nota") solo tiene sentido ahí.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La flecha es un botón con `aria-expanded` y `aria-controls`, y toma su nombre del título de al lado.</A11y.Item>
          <A11y.Item>Cerrada, los renglones van con `inert`: no juntan foco ni los lee nadie.</A11y.Item>
          <A11y.Item>El tacho dice a qué aspecto pertenece: "Sacar El gráfico de la rúbrica", no "Sacar".</A11y.Item>
          <A11y.Item>La marca de color es decorativa: el aspecto se reconoce por su nombre, no por su glifo.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
