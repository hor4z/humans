import { useState } from 'react'
import { TaskList, type Task } from '@milo/ui/blocks/editor/task-list'
import { A11y, Demo, Note, Page, Practices, Props, Section } from '../kit'

const initial: Task[] = [
  { id: 'leer', label: 'Leer la consigna entera antes de empezar', done: true },
  { id: 'medir', label: 'Medir los tres objetos y anotar los valores', done: true },
  { id: 'graficar', label: 'Hacer el gráfico con los datos' },
  { id: 'concluir', label: 'Escribir qué pasó y por qué' },
]

export function TaskListStory() {
  const [tasks, setTasks] = useState(initial)

  return (
    <Page
      title="TaskList"
      kind="Editor"
      imports="import { TaskList } from '@milo/ui/blocks/editor/task-list'"
      lead="Cosas para hacer que se marcan al hacerlas: los pasos de una entrega, lo que falta de una actividad, el checklist de un experimento."
    >
      <Section title="La pieza" note="Marcá y desmarcá: lo hecho se apaga y se tacha, que son dos avisos y no uno.">
        <Demo width="lg" fill code={`<TaskList value={tasks} onValueChange={setTasks} label="Pasos del experimento" />`}>
          <TaskList value={tasks} onValueChange={setTasks} label="Pasos del experimento" />
        </Demo>
      </Section>

      <Section
        title="Solo de lectura"
        note="Sin `onValueChange`, o con `readOnly`: la consigna de otro, una entrega ya cerrada."
      >
        <Demo width="lg" fill code={`<TaskList value={steps} label="Pasos, ya cerrados" />`}>
          <TaskList value={initial} label="Pasos, ya cerrados" />
        </Demo>
      </Section>

      <Note title="TaskList o Checkbox suelto">
        Un `Checkbox` solo es una decisión dentro de un formulario: se confirma con un botón. Una
        `TaskList` es una lista de cosas que se van haciendo, y cada marca vale sola en el momento.
        Si al final hay un "Guardar", son casillas; si no, es esta lista.
      </Note>

      <Section title="Props">
        <Props of={['TaskList', 'Task']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`label` dice de qué es: sin eso un lector anuncia "lista, cuatro elementos".</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La lista lleva nombre: "lista, cuatro elementos" no dice de qué.</A11y.Item>
          <A11y.Item>Cada casilla se nombra con su propio texto, y el texto es zona de click, que es la mitad del área útil del control.</A11y.Item>
          <A11y.Item>Lo hecho se dice con el tachado además del gris: quien no separa el gris del negro ve igual que la línea está cruzada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
