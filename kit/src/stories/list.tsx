import { Icon, type IconName } from '@humans/ui/icon'
import { type MarkColor } from '@humans/ui/lib/colors'
import { List } from '@humans/ui/list'
import { useState } from 'react'
import { A11y, Anatomy, Demo, Frame, Hero, Page, Practices, Props, Section } from '../kit'

const onboarding: { icon: IconName; color: MarkColor; title: string; hint: string }[] = [
  { icon: 'check', color: 'green', title: 'Completá tu perfil', hint: 'Una foto y en qué materias das clase.' },
  { icon: 'menu_book', color: 'purple', title: 'Armá tu primera actividad', hint: 'Con una consigna y un método alcanza para empezar.' },
  { icon: 'calendar_month', color: 'orange', title: 'Elegí cuándo se cierra', hint: 'Después de esa fecha nadie puede entregar.' },
  { icon: 'check', color: 'green', title: 'Invitá a tu primer grupo', hint: 'Con un link que podés revocar cuando quieras.' },
  { icon: 'lightbulb', color: 'blue', title: 'Mirá lo que hicieron otros', hint: 'Actividades públicas de docentes de tu área.' },
]

const spaces: { icon: IconName; color: MarkColor; title: string; hint: string }[] = [
  { icon: 'adjust', color: 'orange', title: 'Matemática · 4.º A', hint: 'Doce actividades · cuatro sin mirar' },
  { icon: 'menu_book', color: 'purple', title: 'Lengua · 6.º', hint: 'Ocho actividades · todas al día' },
  { icon: 'explore', color: 'blue', title: 'Ciencias · 5.º B', hint: 'Cinco actividades · dos abiertas' },
]

export function ListStory() {
  const [current, setCurrent] = useState('Invitá a tu primer grupo')
  return (
    <Page
      title="List"
      kind="Datos"
      imports="import { List } from '@humans/ui/list'"
      lead="Agrupa elementos con título, información de apoyo y acciones."
    >
      <Hero>
        <Frame width="md">
          <List>
            <List.Item icon="check" color="green">
              <List.Title>En reposo</List.Title>
              <List.Hint>Fondo apagado, sin sombra.</List.Hint>
            </List.Item>
            <List.Item icon="menu_book" color="purple" active={current !== 'Se toca'}>
              <List.Title>Elegida</List.Title>
              <List.Hint>Hundida un paso.</List.Hint>
            </List.Item>
            <List.Item icon="star_shine" color="blue" active={current === 'Se toca'} onClick={() => setCurrent('Se toca')}>
              <List.Title>Se toca</List.Title>
              <List.Hint>Seleccioná la fila para ver su estado activo.</List.Hint>
            </List.Item>
          </List>
        </Frame>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Marca" required>La marca de color con su glifo (`icon` y `color`): es lo que identifica la fila de reojo.</Anatomy.Part>
        <Anatomy.Part name="Título" required>`List.Title`, en 16: es lo que se lee primero.</Anatomy.Part>
        <Anatomy.Part name="Línea de apoyo">`List.Hint`, debajo del título.</Anatomy.Part>
        <Anatomy.Part name="Contenido final">`List.Trailing`, a la derecha: un chevron, una acción.</Anatomy.Part>
        <Anatomy.Part name="Fila elegida">Con `active` queda hundida y no teñida, porque el color ya lo gasta la marca.</Anatomy.Part>
      </Anatomy>

      <Section title="Elegir y navegar">
        <Demo label="Tocá una fila para elegirla" note="Para una serie de pasos u opciones donde se elige una sola, como lo que falta para empezar a usar el aula." code={`<List>
  {onboarding.map(i => (
    <List.Item key={i.title} icon={i.icon} color={i.color} active={i.title === current} onClick={() => setCurrent(i.title)}>
      <List.Title>{i.title}</List.Title>
      <List.Hint>{i.hint}</List.Hint>
    </List.Item>
  ))}
</List>`}>
          <Frame width="md">
            <List>
              {onboarding.map(i => (
                <List.Item key={i.title} icon={i.icon} color={i.color} active={i.title === current} onClick={() => setCurrent(i.title)}>
                  <List.Title>{i.title}</List.Title>
                  <List.Hint>{i.hint}</List.Hint>
                </List.Item>
              ))}
            </List>
          </Frame>
        </Demo>

        <Demo label="Como índice: el color identifica el espacio, no el estado" note="Como entrada a los espacios de un docente: el chevron dice que la fila lleva a otra pantalla, y el `List.Hint` resume qué hay adentro." code={`<List>
  {spaces.map(e => (
    <List.Item key={e.title} icon={e.icon} color={e.color} active={current === e.title} onClick={() => setCurrent(e.title)}>
      <List.Title>{e.title}</List.Title>
      <List.Hint>{e.hint}</List.Hint>
      <List.Trailing><Icon name="chevron_right" size={20} className="icon-muted" /></List.Trailing>
    </List.Item>
  ))}
</List>`}>
          <Frame width="md">
            <List>
              {spaces.map(e => (
                <List.Item key={e.title} icon={e.icon} color={e.color} active={current === e.title} onClick={() => setCurrent(e.title)}>
                  <List.Title>{e.title}</List.Title>
                  <List.Hint>{e.hint}</List.Hint>
                  <List.Trailing><Icon name="chevron_right" size={20} className="icon-muted" /></List.Trailing>
                </List.Item>
              ))}
            </List>
          </Frame>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="List" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre va en `List.Title` y la línea de apoyo en `List.Hint`.</Practices.Do>
          <Practices.Dont>Un contador no va en `List.Trailing`: el número ya está en el `hint`, y repetirlo obliga a leer dos veces.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Una fila con `onClick` es un `<button>`; sin él es un `<div>` que no se puede enfocar.'}</A11y.Item>
          <A11y.Item>La marca de color no es la única señal: el título dice de qué es la fila.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
