import cls from './tabs.module.css'
import { useState } from 'react'
import { Tabs } from '@humans/ui/tabs'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function TabsStory() {
  const [range, setRange] = useState('semana')

  return (
    <Page
      title="Tabs"
      kind="Navegación"
      imports="import { Tabs } from '@humans/ui/tabs'"
      lead="Alterna entre secciones de contenido relacionadas dentro de la misma vista."
    >
      <Hero>
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
            <p className={cls.handedText}>Cuatro aspectos, cada uno de 1 a 4.</p>
          </Tabs.Panel>
          <Tabs.Panel value="ajustes">
            <p className={cls.handedText}>Quién puede ver la actividad y hasta cuándo.</p>
          </Tabs.Panel>
        </Tabs>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Lista" required>`Tabs.List` agrupa las solapas y lleva el nombre del conjunto con `label`.</Anatomy.Part>
        <Anatomy.Part name="Solapa" required>`Tabs.Tab`: el botón de cada sección, atado a su panel por `value`.</Anatomy.Part>
        <Anatomy.Part name="Línea activa">La solapa abierta se marca con una línea y con el azul.</Anatomy.Part>
        <Anatomy.Part name="Panel" required>`Tabs.Panel`: el contenido de una solapa. Cerrado sigue montado y oculto.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo fill label="Cómo se arma" code={`<Tabs defaultValue="entregas">
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
              <p className={cls.handedText}>Cuatro aspectos, cada uno de 1 a 4.</p>
            </Tabs.Panel>
            <Tabs.Panel value="ajustes">
              <p className={cls.handedText}>Quién puede ver la actividad y hasta cuándo.</p>
            </Tabs.Panel>
          </Tabs>
        </Demo>
        <Demo fill label="Controlado: la decide la pantalla" code={`<Tabs value={range} onValueChange={setRange}>
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
              <p className={cls.handedText}>79 entregas en cuatro espacios.</p>
            </Tabs.Panel>
            <Tabs.Panel value="mes">
              <p className={cls.handedText}>312 entregas, 289 corregidas.</p>
            </Tabs.Panel>
            <Tabs.Panel value="todo">
              <p className={cls.handedText}>Desde marzo: 1.204 entregas.</p>
            </Tabs.Panel>
          </Tabs>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Tabs" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El activo se marca con la línea **y** con el azul: unas solapas dicen dónde estás. Un [Segmented](#segmented) se le parece y no lleva azul, porque ahí se elige un filtro y no un lugar.</Practices.Do>
          <Practices.Do>Con `value` y `onValueChange` la decisión es de afuera: cuando la solapa abierta sale de la URL, o cuando algo más de la pantalla la cambia.</Practices.Do>
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
