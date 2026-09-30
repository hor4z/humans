import cls from './divider.module.css'
import { Avatar } from '@milo/ui/avatar'
import { Divider } from '@milo/ui/divider'
import { Icon } from '@milo/ui/icon'
import { Kbd } from '@milo/ui/kbd'
import { A11y, Anatomy, Frame, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function DividerStory() {
  return (
    <Page
      title="Divider"
      kind="Superficies"
      imports="import { Divider } from '@milo/ui/divider'"
      lead="Separa grupos de contenido relacionados cuando el espaciado no alcanza."
    >
      <Hero>
        <Frame width="md">
          <div className={cls.aboveText}>Doce actividades en siete espacios</div>
          <Divider />
          <div className={cls.belowText}>Cuatro esperan que alguien las mire</div>
        </Frame>
        <div className={cls.inlineStrip}>
          <span className={cls.inlineSubject}>Matemática</span>
          <Divider orientation="vertical" />
          <span className={cls.inlineGroup}>4.º A</span>
          <Divider orientation="vertical" />
          <span className={cls.inlineCount}>18 entregas</span>
        </div>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Línea" required>Un píxel de `--border`, horizontal o vertical. Lleva `data-divider`, de lo que se agarra un contenedor con padding (un `Menu`, un panel) para estirarla hasta los bordes.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant name="una barra" code={`<Icon name="search" size={18} className="icon-muted" />
<span>Buscar</span>
<Divider orientation="vertical" className={s.beforeShortcut} />
<Kbd>⌘K</Kbd>
<Divider orientation="vertical" className={s.afterShortcut} />
<Avatar name="Horacio Rivero" size={24} />`}>
            <div className={`${cls.fakeToolbar} bg-surface`}>
              <Icon name="search" size={18} className="icon-muted" />
              <span className={cls.toolbarLabel}>Buscar</span>
              <Divider orientation="vertical" className={cls.beforeShortcut} />
              <Kbd>⌘K</Kbd>
              <Divider orientation="vertical" className={cls.afterShortcut} />
              <Avatar name="Horacio Rivero" size={24} />
            </div>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Divider" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Separá dos cosas que ya se distinguen; si no se distinguen, lo que falta es aire.</Practices.Do>
          <Practices.Do>Usala entre dos cosas del mismo tipo. Cuando lo de abajo es de otro tipo, el cambio de fondo dice más que una línea.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Lleva `role="separator"` con su orientación, así que un lector anuncia el corte en vez de saltearlo.</A11y.Item>
          <A11y.Item>No es tabulable ni tiene contenido: separa, y nada más.</A11y.Item>
          <A11y.Item>El gris sale de `--border`, el mismo de todas las líneas del sistema, así que sube y baja con el tema.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
