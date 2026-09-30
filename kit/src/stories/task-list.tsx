import { useState } from 'react'
import { TaskList, type Task } from '@humans/ui/blocks/editor/task-list'
import { A11y, Anatomy, Demo, Grid, Hero, Page, Practices, Props, Section, Stack } from '../kit'

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
      imports="import { TaskList } from '@humans/ui/blocks/editor/task-list'"
      lead="Organiza tareas que se pueden marcar como completadas."
    >
      <Hero>
        <Stack width="lg">
          <TaskList value={tasks} onValueChange={setTasks} label="Pasos del experimento" />
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Casilla" required>Una por tarea: marca lo hecho con el tilde.</Anatomy.Part>
        <Anatomy.Part name="Texto de la tarea" required>Se apaga y se tacha cuando la tarea está hecha, y es parte de la zona de click.</Anatomy.Part>
        <Anatomy.Part name="Nombre de la lista" required>`label`: no se ve, pero dice de qué es la lista.</Anatomy.Part>
      </Anatomy>
      <Section title="Editable y de solo lectura">
        <Grid>
          <Demo label="Marcá y desmarcá" fill code={`<TaskList value={tasks} onValueChange={setTasks} label="Pasos del experimento" />`}>
            <TaskList value={tasks} onValueChange={setTasks} label="Pasos del experimento" />
          </Demo>
          <Demo label="Solo de lectura" fill code={`<TaskList value={steps} label="Pasos, ya cerrados" />`}>
            <TaskList value={initial} label="Pasos, ya cerrados" />
          </Demo>
        </Grid>
      </Section>

      <Section title="Props">
        <Props of={['TaskList', 'Task']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Usala para cosas que se van haciendo y cuya marca vale sola. Si al final hay un "Guardar", son casillas de un formulario: un `Checkbox` es una decisión que se confirma con un botón.</Practices.Do>
          <Practices.Do>Sin `onValueChange`, o con `readOnly`, es de solo lectura: la consigna de otro, una entrega ya cerrada.</Practices.Do>
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
