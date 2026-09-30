import cls from './nav.module.css'
import { useState } from 'react'
import { Icon } from '@milo/ui/icon'
import { Nav } from '@milo/ui/nav'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function NavStory() {
  const [active, setActive] = useState('explorar')

  return (
    <Page
      title="Nav"
      kind="Navegación"
      imports="import { Nav } from '@milo/ui/nav'"
      lead="El riel de una app y sus items. `Nav.Item` es un botón; para el link de un router van `Nav.itemClass` y `Nav.Body`, que son las mismas dos mitades por separado."
    >
      <Hero>
        <div className={cls.itemRail}>
          <Nav label="Vista previa de la navegación" className={cls.itemList}>
            <Nav.Item icon="explore" current={active === 'explorar'} onClick={() => setActive('explorar')}>Explorar</Nav.Item>
            <Nav.Item icon="layers" badge="84" current={active === 'recursos'} onClick={() => setActive('recursos')}>Recursos</Nav.Item>
            <Nav.Item icon="favorite" current={active === 'guardadas'} onClick={() => setActive('guardadas')}>Guardadas</Nav.Item>
          </Nav>
        </div>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Riel" required>{'`Nav`: un `<nav>` con su nombre, y los items uno debajo del otro.'}</Anatomy.Part>
        <Anatomy.Part name="Item" required>`Nav.Item`: un botón por destino. El activo se marca con la barra de la izquierda.</Anatomy.Part>
        <Anatomy.Part name="Icono">El glifo del set con `icon`, o uno propio con `glyph`, como la carpeta de color de un espacio.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta" required>El texto del item, que se esconde al contraer el riel.</Anatomy.Part>
        <Anatomy.Part name="Contador">El `badge`: hundido como un `Kbd`, porque un contador no es accionable.</Anatomy.Part>
        <Anatomy.Part name="Subitem">`Nav.SubItem`: debajo de su padre, con la sangría de la columna del texto para que las etiquetas queden alineadas.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="Completo: items, encabezado y espacios" code={`<Nav label="Principal del ejemplo">
  <Nav.Item icon="explore" current={active === 'explorar'} onClick={() => setActive('explorar')}>Explorar</Nav.Item>
  <Nav.Item icon="layers" badge="84" current={active === 'recursos'} onClick={() => setActive('recursos')}>Recursos</Nav.Item>
  <Nav.Item icon="favorite" current={active === 'guardadas'} onClick={() => setActive('guardadas')}>Guardadas</Nav.Item>
  <div>Mis espacios</div>
  <Nav.Item
    glyph={<Icon.Folder color="green" size={20} />}
    current={active === 'ciencias'}
    onClick={() => setActive('ciencias')}
  >
    Ciencias · 5.º B
  </Nav.Item>
  <Nav.Item
    glyph={<Icon.Folder color="orange" size={20} />}
    current={active === 'mate'}
    onClick={() => setActive('mate')}
  >
    Matemática · 4.º A
  </Nav.Item>
</Nav>`}>
          <div className={cls.itemRail}>
            <Nav label="Principal del ejemplo" className={cls.itemList}>
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
        </Demo>
        <Demo label="Subitems y contraído" code={`<Nav label="Explorar">
  <Nav.Item icon="explore" current>Explorar</Nav.Item>
  <Nav.SubItem current>Recetas</Nav.SubItem>
  <Nav.SubItem>Publicadas</Nav.SubItem>
</Nav>

<Nav label="Contraído">
  <Nav.Item icon="explore" current collapsed>Explorar</Nav.Item>
  <Nav.Item icon="layers" collapsed>Recursos</Nav.Item>
</Nav>`}>
          <div className={cls.subitemRail}>
            <Nav label="Explorar" className={cls.subitemList}>
              <Nav.Item icon="explore" current>Explorar</Nav.Item>
              <Nav.SubItem current>Recetas</Nav.SubItem>
              <Nav.SubItem>Publicadas</Nav.SubItem>
            </Nav>
          </div>
          <div className={cls.collapsedRail}>
            <Nav label="Contraído" className={cls.collapsedList}>
              <Nav.Item icon="explore" current collapsed>Explorar</Nav.Item>
              <Nav.Item icon="layers" collapsed>Recursos</Nav.Item>
            </Nav>
          </div>
        </Demo>
        <Demo label="Con el link de un router" code={`<Nav label="Con links">
  <a href="#nav" className={Nav.itemClass({ current: true })} aria-current="page">
    <Nav.Body icon="explore">Explorar</Nav.Body>
  </a>
  <a href="#nav" className={Nav.itemClass()}>
    <Nav.Body icon="layers" badge="84">Recursos</Nav.Body>
  </a>
</Nav>`}>
          <div className={cls.subitemRail}>
            <Nav label="Con links" className={cls.subitemList}>
              <a href="#nav" className={Nav.itemClass({ current: true })} aria-current="page">
                <Nav.Body icon="explore">Explorar</Nav.Body>
              </a>
              <a href="#nav" className={Nav.itemClass()}>
                <Nav.Body icon="layers" badge="84">Recursos</Nav.Body>
              </a>
            </Nav>
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Nav" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El activo se marca con la barra de 2px: sin fondo y sin borde. En un riel de doce items, un activo en gris hay que buscarlo.</Practices.Do>
          <Practices.Do>Contraído, a 72 de ancho, el item se centra y pierde etiqueta y contador: el `title` pasa a ser lo único que dice qué es.</Practices.Do>
          <Practices.Do>{'Para un `NavLink` o un `<a>`, `Nav.itemClass` le pone las clases del item y `Nav.Body` dibuja lo de adentro.'}</Practices.Do>
          <Practices.Dont>No alternes la clase del icono entre estados: cambia el peso de la fuente y el glifo se mueve adentro de su caja.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El item activo lo dice con `aria-current`, no solo con el fondo.</A11y.Item>
          <A11y.Item>El texto de un item inactivo va en tinta: en gris, una lista de siete espacios parece deshabilitada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
