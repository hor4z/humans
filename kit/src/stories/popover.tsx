import cls from './popover.module.css'
import { Button } from '@humans/ui/button'
import { Popover } from '@humans/ui/popover'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section } from '../kit'

export function PopoverStory() {
  return (
    <Page
      title="Popover"
      lead="Muestra contenido contextual junto a su disparador, sin cambiar de página."
      kind="Superficies"
      imports="import { Popover } from '@humans/ui/popover'"
    >
      <Hero>
        <Popover
          width={320}
          trigger={props => <Button {...props} variant="muted">Panel anclado</Button>}
        >
          {close => (
            <div className={`${cls.plainPanel} ui-pop bg-popover`}>
              <div className={cls.plainTitle}>Un panel de 320</div>
              <p className={cls.plainText}>
                Cierra con Escape, con un click afuera, o al scrollear la página, pero no al
                scrollear su propio contenido.
              </p>
              <div className={cls.plainActions}><Button size="sm" variant="muted" onClick={close}>Cerrar</Button></div>
            </div>
          )}
        </Popover>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Disparador" required>`trigger`: recibe las props que tiene que llevar el botón (`aria-expanded`, el click) y lo dibujás vos.</Anatomy.Part>
        <Anatomy.Part name="Panel" required>Lo que devuelven los hijos, que reciben `close`. La pieza pone la posición y el cierre; el aspecto es tuyo.</Anatomy.Part>
        <Anatomy.Part name="Velo">Con `veil`, apaga el resto de la pantalla, sin blur.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Demo label="Con `veil`" note="Para un panel que hay que leer antes de decidir, como la lista de entregas pendientes de un curso." code={`<Popover
  width={340}
  veil
  trigger={props => <Button {...props} variant="muted">Con velo</Button>}
>
  {close => (
    <div className={s.panel}>
      <div>Una lista que pide leerse entera</div>
      <p>El resto de la pantalla se atenúa para ganar la mirada. Un menú de cuatro items no necesita esto.</p>
      <Button size="sm" variant="muted" onClick={close}>Cerrar</Button>
    </div>
  )}
</Popover>`}>
            <Popover
              width={340}
              veil
              trigger={props => <Button {...props} variant="muted">Con velo</Button>}
            >
              {close => (
                <div className={`${cls.veiledPanel} ui-pop bg-popover`}>
                  <div className={cls.veiledTitle}>Una lista que pide leerse entera</div>
                  <p className={cls.veiledText}>
                    El resto de la pantalla se atenúa para ganar la mirada. Un menú de cuatro items
                    no necesita esto.
                  </p>
                  <div className={cls.veiledActions}><Button size="sm" variant="muted" onClick={close}>Cerrar</Button></div>
                </div>
              )}
            </Popover>
          </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Popover" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El velo va cuando la lista pide leerse entera; un menú de cuatro items no lo necesita.</Practices.Do>
          <Practices.Dont>No lo uses para un texto de ayuda de una línea: eso es un `Tooltip`.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El disparador declara `aria-expanded`, así que se anuncia si está abierto.</A11y.Item>
          <A11y.Item>Cierra con `pointerdown` y no con `click`: con click, el mismo gesto que abre otro panel lo cierra y lo reabre, y parpadea.</A11y.Item>
          <A11y.Item>Escape cierra el de arriba y no todos.</A11y.Item>
          <A11y.Item>El scroll de la página lo cierra; el de su propio contenido, no: el listener va en captura y se filtra por origen.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
