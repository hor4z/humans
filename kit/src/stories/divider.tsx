import cls from './divider.module.css'
import { Avatar } from '@humans/ui/avatar'
import { Button } from '@humans/ui/button'
import { Divider } from '@humans/ui/divider'
import { Icon } from '@humans/ui/icon'
import { Kbd } from '@humans/ui/kbd'
import { A11y, Anatomy, Frame, Hero, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

export function DividerStory() {
  return (
    <Page
      title="Divider"
      kind="Superficies"
      imports="import { Divider } from '@humans/ui/divider'"
      lead="Separa grupos de contenido relacionados cuando el espaciado no alcanza."
    >
      <Hero>
        <Frame width="md">
          <Stack gap="md">
            <Divider align="start">Hoy</Divider>
            <p className={cls.entry}>Lucía Gómez entregó Fracciones equivalentes</p>
            <p className={cls.entry}>Tomás Ruiz entregó Fracciones equivalentes</p>
            <Divider align="start">Ayer</Divider>
            <p className={cls.entry}>Martina Sosa pidió una prórroga</p>
          </Stack>
        </Frame>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Línea" required>Un píxel de `--border`, horizontal o vertical. Lleva `data-divider`, de lo que se agarra un contenedor con padding (un `Menu`, un panel) para estirarla hasta los bordes.</Anatomy.Part>
        <Anatomy.Part name="Texto">El hijo, en el texto chico y gris: corta la línea al medio o la abre al principio con `align="start"`. Solo en horizontal.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Variant
            name="texto al medio"
            note="Entre dos caminos que llevan al mismo lugar: la palabra dice que son alternativas y no pasos."
            code={`<Button variant="muted" iconStart={<Icon name="upload" />}>Subir un archivo</Button>
<Divider>o</Divider>
<Button variant="muted" iconStart={<Icon name="link" />}>Pegar un enlace</Button>`}
          >
            <Stack gap="md" width="sm">
              <Button variant="muted" iconStart={<Icon name="upload" />}>Subir un archivo</Button>
              <Divider>o</Divider>
              <Button variant="muted" iconStart={<Icon name="link" />}>Pegar un enlace</Button>
            </Stack>
          </Variant>
          <Variant
            name="texto al principio"
            note="El nombre del grupo que empieza abajo: una lista larga partida por fecha o por curso."
            code={`<Divider align="start">Hoy</Divider>
<p>Lucía Gómez entregó Fracciones equivalentes</p>
<Divider align="start">Ayer</Divider>
<p>Martina Sosa pidió una prórroga</p>`}
          >
            <Stack gap="md" width="md">
              <Divider align="start">Hoy</Divider>
              <p className={cls.entry}>Lucía Gómez entregó Fracciones equivalentes</p>
              <Divider align="start">Ayer</Divider>
              <p className={cls.entry}>Martina Sosa pidió una prórroga</p>
            </Stack>
          </Variant>
          <Variant
            name="vertical"
            note="Entre datos de una misma línea. Se estira al alto de la fila, así que no hace falta darle medida."
            code={`<span>Matemática</span>
<Divider orientation="vertical" />
<span>4.º A</span>
<Divider orientation="vertical" />
<span>18 entregas</span>`}
          >
            <div className={cls.inlineStrip}>
              <span className={cls.inlineSubject}>Matemática</span>
              <Divider orientation="vertical" />
              <span className={cls.inlineGroup}>4.º A</span>
              <Divider orientation="vertical" />
              <span className={cls.inlineCount}>18 entregas</span>
            </div>
          </Variant>
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
          <Practices.Dont>El texto no es un título: si lo que viene abajo es una sección con su propio peso, va un encabezado y no una línea que habla.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Lleva `role="separator"` con su orientación, así que un lector anuncia el corte en vez de saltearlo.</A11y.Item>
          <A11y.Item>No es tabulable. Con texto, el separador es la línea y el texto queda afuera de él, porque lo que hay adentro de un `separator` no se lee.</A11y.Item>
          <A11y.Item>El gris sale de `--border`, el mismo de todas las líneas del sistema, así que sube y baja con el tema.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
