import cls from './tabs.module.css'
import { useState } from 'react'
import { Tabs } from '@milo/ui/tabs'
import { A11y, Demo, Page, Practices, Props, Section } from '../kit'

export function TabsStory() {
  const [range, setRange] = useState('semana')

  return (
    <Page
      title="Tabs"
      kind="Navegación"
      imports="import { Tabs } from '@milo/ui/tabs'"
      lead="Un mismo lugar que muestra contenidos que se comparan entre sí: las entregas, la rúbrica y los ajustes de una actividad. Lo que no se compara no va en solapas: va en una pantalla aparte o en un `Accordion`."
    >
      <Section
        title="Cómo se arma"
        note="El activo se marca con la línea **y** con el azul: unas solapas dicen dónde estás. Un `Segmented` se le parece y no lleva azul, porque ahí se elige un filtro y no un lugar."
      >
        <Demo fill code={`<Tabs defaultValue="entregas">
  <Tabs.List label="Secciones de la actividad">
    <Tabs.Tab value="entregas">Entregas</Tabs.Tab>
    <Tabs.Tab value="rubrica">Rúbrica</Tabs.Tab>
    <Tabs.Tab value="ajustes">Ajustes</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="entregas">
    <p>Dieciocho entregas, cuatro sin mirar.</p>
  </Tabs.Panel>
  <Tabs.Panel value="rubrica">
    <p>Cuatro aspectos, cada uno de 1 a 4.</p>
  </Tabs.Panel>
  <Tabs.Panel value="ajustes">
    <p>Quién puede ver la actividad y hasta cuándo.</p>
  </Tabs.Panel>
</Tabs>`}>
          <Tabs defaultValue="entregas">
            <Tabs.List label="Secciones de la actividad">
              <Tabs.Tab value="entregas">Entregas</Tabs.Tab>
              <Tabs.Tab value="rubrica">Rúbrica</Tabs.Tab>
              <Tabs.Tab value="ajustes">Ajustes</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="entregas">
              <p className={cls.handedText}>Dieciocho entregas, cuatro sin mirar.</p>
            </Tabs.Panel>
            <Tabs.Panel value="rubrica">
              <p className={cls.rubricText}>Cuatro aspectos, cada uno de 1 a 4.</p>
            </Tabs.Panel>
            <Tabs.Panel value="ajustes">
              <p className={cls.accessText}>Quién puede ver la actividad y hasta cuándo.</p>
            </Tabs.Panel>
          </Tabs>
        </Demo>
      </Section>

      <Section
        title="Controlado"
        note="Con `value` y `onValueChange` la decisión es de afuera: cuando la solapa abierta sale de la URL, o cuando algo más de la pantalla la cambia."
      >
        <Demo fill code={`<Tabs value={range} onValueChange={setRange}>
  <Tabs.List label="Rango del panel">
    <Tabs.Tab value="semana">Esta semana</Tabs.Tab>
    <Tabs.Tab value="mes">Este mes</Tabs.Tab>
    <Tabs.Tab value="todo">Todo</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="semana">
    <p>79 entregas en cuatro espacios.</p>
  </Tabs.Panel>
  <Tabs.Panel value="mes">
    <p>312 entregas, 289 corregidas.</p>
  </Tabs.Panel>
  <Tabs.Panel value="todo">
    <p>Desde marzo: 1.204 entregas.</p>
  </Tabs.Panel>
</Tabs>`}>
          <Tabs value={range} onValueChange={setRange}>
            <Tabs.List label="Rango del panel">
              <Tabs.Tab value="semana">Esta semana</Tabs.Tab>
              <Tabs.Tab value="mes">Este mes</Tabs.Tab>
              <Tabs.Tab value="todo">Todo</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="semana">
              <p className={cls.weekText}>79 entregas en cuatro espacios.</p>
            </Tabs.Panel>
            <Tabs.Panel value="mes">
              <p className={cls.monthText}>312 entregas, 289 corregidas.</p>
            </Tabs.Panel>
            <Tabs.Panel value="todo">
              <p className={cls.allText}>Desde marzo: 1.204 entregas.</p>
            </Tabs.Panel>
          </Tabs>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Tabs" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El panel y su solapa se atan por el mismo `value`.</Practices.Do>
          <Practices.Dont>Si son preguntas sueltas que se leen de a una y la mayoría no se va a abrir nunca, no van solapas: va un [Accordion](#accordion).</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La fila de solapas es un tablist y cada panel declara qué solapa lo nombra.</A11y.Item>
          <A11y.Item>Las flechas izquierda y derecha mueven el foco y dan la vuelta al llegar al final.</A11y.Item>
          <A11y.Item>Solo la solapa activa es tabulable: Tab entra al grupo y sale, no recorre las cinco.</A11y.Item>
          <A11y.Item>El panel es tabulable, así que se puede leer con teclado aunque adentro no haya nada que tocar.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
