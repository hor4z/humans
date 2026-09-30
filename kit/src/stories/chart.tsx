import cls from './chart.module.css'
import { Avatar } from '@humans/ui/avatar'
import { Card } from '@humans/ui/card'
import { BarChart } from '@humans/ui/chart'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'
import { face } from '../fixtures'

const week = [
  { label: 'Lunes', value: 18, total: 24, caption: 'Actividades corregidas' },
  { label: 'Martes', value: 6, total: 14, caption: 'Actividades corregidas' },
  { label: 'Miércoles', value: 27, total: 29, caption: 'Actividades corregidas' },
  {
    label: 'Jueves', value: 16, total: 32, caption: 'Actividades corregidas',
    detail: (
      <>
        <span className={`${cls.tooltipValue} tabular`}>50%</span>
        <Avatar.Group
          size={18}
          max={3}
          people={[
            { name: 'Ana Pérez', src: face(1) },
            { name: 'Bruno Díaz', src: face(2) },
            { name: 'Carla Sosa', src: face(3) },
          ]}
        />
      </>
    ),
  },
  { label: 'Viernes', value: 17, total: 17, caption: 'Actividades corregidas' },
]

const months = [
  { label: 'Ene', value: 31, total: 42 }, { label: 'Feb', value: 49, total: 58 },
  { label: 'Mar', value: 24, total: 51 }, { label: 'Abr', value: 64, total: 64 },
  { label: 'May', value: 12, total: 47 }, { label: 'Jun', value: 40, total: 73 },
]

export function ChartStory() {
  return (
    <Page
      title="BarChart"
      kind="Datos"
      imports="import { BarChart } from '@humans/ui/chart'"
      lead="Compara cantidades con barras. Cuando hay un total, muestra el avance dentro de ese total."
    >
      <Hero>
        <Card className={cls.plainCard}>
          <BarChart label="Corregidas sobre entregadas, por mes" data={months} height={160} />
        </Card>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Barra" required>El total en gris y, adentro, lo hecho en azul (`total` y `value` de cada dato).</Anatomy.Part>
        <Anatomy.Part name="Etiqueta" required>El `label` del dato, debajo de la barra.</Anatomy.Part>
        <Anatomy.Part name="Barra destacada">Con `highlight` una barra lleva la etiqueta más pesada, sin agregar un tercer tono.</Anatomy.Part>
        <Anatomy.Part name="Tooltip">Aparece con el mouse y con el foco: `caption` dice qué se mide y `detail` suma lo que haga falta.</Anatomy.Part>
      </Anatomy>

      <Section
        title="Vivo"
        note="Pasá el mouse por las barras, y después tabulá hasta ellas: el tooltip aparece igual con el teclado. El jueves lleva `detail`."
      >
        <Demo fill code={`const week = [
  { label: 'Lunes', value: 18, total: 24, caption: 'Actividades corregidas' },
  { label: 'Martes', value: 6, total: 14, caption: 'Actividades corregidas' },
  { label: 'Miércoles', value: 27, total: 29, caption: 'Actividades corregidas' },
  {
    label: 'Jueves', value: 16, total: 32, caption: 'Actividades corregidas',
    detail: (
      <>
        <span className="tabular">50%</span>
        <Avatar.Group
          size={18}
          max={3}
          people={[
            { name: 'Ana Pérez', src: '/avatars/01.webp' },
            { name: 'Bruno Díaz', src: '/avatars/02.webp' },
            { name: 'Carla Sosa', src: '/avatars/03.webp' },
          ]}
        />
      </>
    ),
  },
  { label: 'Viernes', value: 17, total: 17, caption: 'Actividades corregidas' },
]

<BarChart label="Corregidas sobre entregadas, por día" data={week} highlight={3} />`}>
          <Card className={cls.liveCard}>
            <div className={cls.cardHead}>
              <div className={cls.cardTitle}>Corregidas esta semana</div>
              <div className={cls.cardNote}>El azul es lo corregido; el gris, lo que entró ese día</div>
            </div>
            <BarChart label="Corregidas sobre entregadas, por día" data={week} highlight={3} />
          </Card>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of={['BarChart', 'BarDatum']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Abajo del gráfico va la tabla con los mismos datos: no todo el mundo lee una barra.</Practices.Do>
          <Practices.Do>`highlight` marca la barra de la que habla la pantalla. Cuando lo que importa es la forma de la serie y no un mes, se deja afuera.</Practices.Do>
          <Practices.Dont>Si son más de dos series o hay que comparar valores exactos, va una tabla y no un gráfico.</Practices.Dont>
          <Practices.Dont>No le pidas eje Y ni grilla: con cinco barras y el tooltip, una grilla es tinta que no es dato.</Practices.Dont>
          <Practices.Dont>Dos medidas de escalas distintas son dos gráficos, no uno con dos ejes.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Cada barra es un `<button>` que se enfoca y muestra el mismo tooltip que con el mouse.'}</A11y.Item>
          <A11y.Item>Cada barra se anuncia como "Miércoles: 27 de 29".</A11y.Item>
          <A11y.Item>Los valores viven además en una tabla `sr-only`: una altura no se lee.</A11y.Item>
          <A11y.Item>El tono sube con la altura, así que el tamaño y el color dicen lo mismo.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
