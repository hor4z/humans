import { useState } from 'react'
import { SumTable, type SumCell } from '@milo/ui/blocks/task/sum-table'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

const expenses = [
  { id: 'materia', label: 'Materia prima o productos' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'publicidad', label: 'Publicidad' },
]

const loaded: Record<string, SumCell> = {
  materia: { qty: '30', price: '2000' },
  herramientas: { qty: '1', price: '12000' },
  packaging: { qty: '30', price: '300' },
}

export function SumTableStory() {
  const [value, setValue] = useState<Record<string, SumCell>>(loaded)

  return (
    <Page
      title="SumTable"
      kind="Consigna"
      imports="import { SumTable } from '@milo/ui/blocks/task/sum-table'"
      lead="Una tabla que se completa y se suma sola: un presupuesto, una lista de materiales, un costeo. El total no se escribe, y por eso no puede estar mal sumado."
    >
      <Hero>
        <Stack width="md">
          <SumTable rows={expenses} value={value} onValueChange={setValue} cap={100000}>
            <SumTable.Prompt>Repartí los $100.000</SumTable.Prompt>
            <SumTable.Hint>No hace falta gastarlos todos: lo que sobra es lo que te banca el primer mes flojo.</SumTable.Hint>
          </SumTable>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Enunciado" required>`SumTable.Prompt`: qué se reparte o se cuenta.</Anatomy.Part>
        <Anatomy.Part name="Aclaración">`SumTable.Hint`: cómo completar la tabla.</Anatomy.Part>
        <Anatomy.Part name="Renglón" required>Un concepto con su cantidad y su precio. Suma recién cuando tiene los dos números, así que una cantidad sin precio no cuenta como cero.</Anatomy.Part>
        <Anatomy.Part name="Subtotal">Cantidad por precio, calculado por la pieza.</Anatomy.Part>
        <Anatomy.Part name="Total" required>La suma de los subtotales: no se escribe.</Anatomy.Part>
        <Anatomy.Part name="Aviso del tope">Con `cap`: dice cuánto queda, y cuando te pasás dice de cuánto.</Anatomy.Part>
      </Anatomy>
      <Section title="Con tope y sin tope">
        <Panel>
          <Variant
            name="con tope"
            note="Cambiá una cantidad y mirá el aviso: dice cuánto queda, y cuando te pasás dice de cuánto."
            code={`<SumTable rows={expenses} value={value} onValueChange={setValue} cap={100000}>
  <SumTable.Prompt>Repartí los $100.000</SumTable.Prompt>
  <SumTable.Hint>No hace falta gastarlos todos: lo que sobra es lo que te banca el primer mes flojo.</SumTable.Hint>
</SumTable>`}
          >
            <Stack width="md">
              <SumTable rows={expenses} value={value} onValueChange={setValue} cap={100000}>
                <SumTable.Prompt>Repartí los $100.000</SumTable.Prompt>
                <SumTable.Hint>No hace falta gastarlos todos: lo que sobra es lo que te banca el primer mes flojo.</SumTable.Hint>
              </SumTable>
            </Stack>
          </Variant>
          <Variant
            name="sin tope"
            code={`<SumTable rows={expenses} value={loaded}>
  <SumTable.Prompt>Lo que salió armar el primer lote</SumTable.Prompt>
</SumTable>`}
          >
            <Stack width="md">
              <SumTable rows={expenses} value={loaded}>
                <SumTable.Prompt>Lo que salió armar el primer lote</SumTable.Prompt>
              </SumTable>
            </Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="SumTable" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Escribí los conceptos vos: una tabla donde el que responde inventa las filas deja de poder compararse con la de al lado.</Practices.Do>
          <Practices.Do>Dejá una fila de "Otros": sin ella, lo que no entra en tus categorías se mete en la que menos se le parece.</Practices.Do>
          <Practices.Do>Dejá que el aviso del tope sea de tono `warn` y no `bad`: pasarse del presupuesto en un ejercicio es algo para volver a mirar, no una falta, y el rojo está reservado para lo que no tiene vuelta.</Practices.Do>
          <Practices.Dont>No le pidas que escriba el total: el total es la cuenta que la pieza hace, y pedirlo convierte un ejercicio de criterio en uno de sumar.</Practices.Dont>
          <Practices.Dont>No la uses para datos que no se multiplican: para cinco mediciones sueltas va una `Table`, que no finge que hay una cantidad y un precio.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Cada campo dice de qué renglón es: "Cantidad de Packaging", no "Cantidad". Con seis filas eso es la diferencia entre poder completarla y no.</A11y.Item>
          <A11y.Item>El subtotal y el total son texto de la tabla, no un atributo: se leen recorriéndola como cualquier celda.</A11y.Item>
          <A11y.Item>El aviso del tope dice el número, así que no depende de ver que el total se puso de otro color.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
