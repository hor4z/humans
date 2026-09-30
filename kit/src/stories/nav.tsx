import cls from './nav.module.css'
import { useState } from 'react'
import { Icon } from '@milo/ui/icon'
import { Nav } from '@milo/ui/nav'
import { A11y, Example, Page, Practices, Props, Section } from '../kit'

export function NavStory() {
  const [active, setActive] = useState('explorar')

  return (
    <Page
      title="Nav"
      kind="Navegación"
      imports="import { Nav } from '@milo/ui/nav'"
      lead="El riel de una app y sus items. `Nav.Item` es un botón; para el link de un router van `Nav.itemClass` y `Nav.Body`, que son las mismas dos mitades por separado."
    >
      <Section
        title="El item"
        note="El activo se marca con la barra de la izquierda y el azul suave. En un riel de doce items, un activo en gris hay que buscarlo."
      >
        <div className={cls.itemRail}>
          <Nav label="Principal" className={cls.itemList}>
            {[
              { id: 'explorar', icon: 'explore', label: 'Explorar' },
              { id: 'recursos', icon: 'layers', label: 'Recursos', badge: '84' },
              { id: 'guardadas', icon: 'favorite', label: 'Guardadas' },
            ].map(i => (
              <Nav.Item key={i.id} icon={i.icon as 'explore'} badge={i.badge} current={active === i.id} onClick={() => setActive(i.id)}>
                {i.label}
              </Nav.Item>
            ))}

            <div className={cls.railHeading}>Mis espacios</div>

            {([
              { id: 'ciencias', color: 'green', label: 'Ciencias · 5.º B' },
              { id: 'mate', color: 'orange', label: 'Matemática · 4.º A' },
            ] as const).map(s => (
              <Nav.Item key={s.id} glyph={<Icon.Folder color={s.color} size={20} />} current={active === s.id} onClick={() => setActive(s.id)}>
                {s.label}
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </Section>

      <Section title="Subitems" note="Sangría de 48: la columna del texto del padre, para que las etiquetas queden alineadas entre sí.">
        <div className={cls.subitemRail}>
          <Nav label="Explorar" className={cls.subitemList}>
            <Nav.Item icon="explore" current>Explorar</Nav.Item>
            <Nav.SubItem current>Recetas</Nav.SubItem>
            <Nav.SubItem>Publicadas</Nav.SubItem>
          </Nav>
        </div>
      </Section>

      <Section title="Contraído" note="A 72 de ancho el item se centra y pierde etiqueta y badge; el `title` pasa a ser lo único que dice qué es.">
        <div className={cls.collapsedRail}>
          <Nav label="Contraído" className={cls.collapsedList}>
            <Nav.Item icon="explore" current collapsed>Explorar</Nav.Item>
            <Nav.Item icon="layers" collapsed>Recursos</Nav.Item>
          </Nav>
        </div>
      </Section>

      <Section title="Cómo se escribe">
        <Example code={`<Nav label="Principal">
  <Nav.Item icon="dashboard" badge="3" current>Dashboard</Nav.Item>
  <Nav.Item icon="layers">Recursos</Nav.Item>
</Nav>

<NavLink to="/recursos" className={({ isActive }) => Nav.itemClass({ current: isActive })}>
  <Nav.Body icon="layers">Recursos</Nav.Body>
</NavLink>`} />
      </Section>

      <Section title="Props">
        <Props of={['Nav', 'Nav.Item', 'Nav.Body']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El activo se marca con la barra de 2px: sin fondo y sin borde.</Practices.Do>
          <Practices.Dont>No alternes la clase del icono entre estados: cambia el peso de la fuente y el glifo se mueve adentro de su caja.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El item activo lo dice con aria-current, no solo con el fondo.</A11y.Item>
          <A11y.Item>El texto de un item inactivo va en tinta: en gris, una lista de siete espacios parece deshabilitada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
