import cls from './popover.module.css'
import { Button } from '@milo/ui/button'
import { Popover } from '@milo/ui/popover'
import { A11y, Demo, Grid, Page, Practices, Props, Section } from '../kit'

export function PopoverStory() {
  return (
    <Page
      title="Popover"
      lead="El panel anclado. Cierra con `pointerdown` y no con `click`: con click, el mismo gesto que abre otro panel lo cierra y lo reabre, y parpadea. Y el scroll de la página lo cierra, pero el de su propio contenido no: el listener va en captura y se filtra por origen."
      kind="Superficies"
      imports="import { Popover } from '@milo/ui/popover'"
    >
      <Section title="Vivo" note="El panel lo dibujás vos: `Popover` pone la posición, el cierre y el velo, no el aspecto.">
        <Grid min={300}>
          <Demo label="sin velo" code={`<Popover
  width={320}
  trigger={props => <Button {...props} variant="muted">Panel anclado</Button>}
>
  {close => (
    <div className={s.panel}>
      <div>Un panel de 320</div>
      <p>Cierra con Escape, con un click afuera, o al scrollear la página, pero no al scrollear su propio contenido. Un resize sí lo cierra siempre.</p>
      <Button size="sm" variant="muted" onClick={close}>Cerrar</Button>
    </div>
  )}
</Popover>`}>
            <Popover
              width={320}
              trigger={props => <Button {...props} variant="muted">Panel anclado</Button>}
            >
              {close => (
                <div className={`${cls.plainPanel} ui-pop bg-popover`}>
                  <div className={cls.plainTitle}>Un panel de 320</div>
                  <p className={cls.plainText}>
                    Cierra con Escape, con un click afuera, o al scrollear la página, pero no al
                    scrollear su propio contenido. Un resize sí lo cierra siempre.
                  </p>
                  <div className={cls.plainActions}><Button size="sm" variant="muted" onClick={close}>Cerrar</Button></div>
                </div>
              )}
            </Popover>
          </Demo>

          <Demo label="veil" code={`<Popover
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
        </Grid>
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
          <A11y.Item>El disparador declara aria-expanded, así que se anuncia si está abierto.</A11y.Item>
          <A11y.Item>Escape cierra el de arriba y no todos.</A11y.Item>
          <A11y.Item>El scroll de la página lo cierra; el de su propio contenido, no.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
