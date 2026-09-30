import cls from './card.module.css'
import { Button } from '@milo/ui/button'
import { Card } from '@milo/ui/card'
import { Chip } from '@milo/ui/chip'
import { Icon } from '@milo/ui/icon'
import { Progress } from '@milo/ui/progress'
import { A11y, Demo, Grid, Note, Page, Practices, Props, Section } from '../kit'

export function CardStory() {
  return (
    <Page
      title="Card"
      kind="Superficies"
      imports="import { Card } from '@milo/ui/card'"
      lead="La superficie de una grilla: una cosa por tarjeta, y la tarjeta entera es la unidad que se escanea. Radio 16 con 8 de padding, así que lo que va adentro lleva 8: la regla del anidado, no un número elegido a ojo."
    >
      <Section
        title="Se arma con partes"
        note="Las partes traen el espaciado y la tipografía del sistema, así que dos tarjetas vecinas no terminan con tres tamaños de título distintos."
      >
        <Grid min={340}>
          <Demo label="Con partes" code={`<Card>
  <Card.Header>
    <div>
      <Card.Title>Entregas de la semana</Card.Title>
      <Card.Hint>De todos tus espacios</Card.Hint>
    </div>
    <Chip size="sm" color="ok">84%</Chip>
  </Card.Header>
  <Card.Body>
    <Progress value={18} max={24}>
      <Progress.Label>Corregidas</Progress.Label>
      <Progress.Hint>18 de 24</Progress.Hint>
    </Progress>
  </Card.Body>
  <Card.Footer>
    <Button size="sm" variant="ghost" iconEnd={<Icon name="chevron_right" />}>Ver todas</Button>
  </Card.Footer>
</Card>`}>
            <Card className={cls.partsCard}>
              <Card.Header>
                <div className={cls.partsHeading}>
                  <Card.Title>Entregas de la semana</Card.Title>
                  <Card.Hint>De todos tus espacios</Card.Hint>
                </div>
                <Chip size="sm" color="ok">84%</Chip>
              </Card.Header>
              <Card.Body>
                <Progress value={18} max={24}>
                  <Progress.Label>Corregidas</Progress.Label>
                  <Progress.Hint>18 de 24</Progress.Hint>
                </Progress>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" variant="ghost" iconEnd={<Icon name="chevron_right" />}>Ver todas</Button>
              </Card.Footer>
            </Card>
          </Demo>

          <Demo label="Con contenido suelto" code={`<Card>
  <Card.Header>
    <Card.Title>Sin partes</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>La tarjeta sigue aceptando cualquier contenido suelto para lo que no tiene esa forma, una portada, un gráfico, una grilla de fotos.</p>
  </Card.Body>
</Card>`}>
            <Card className={cls.looseCard}>
              <Card.Header>
                <Card.Title>Sin partes</Card.Title>
              </Card.Header>
              <Card.Body>
                <p className={cls.looseText}>
                  La tarjeta sigue aceptando cualquier contenido suelto para lo que no tiene esa forma,
                  una portada, un gráfico, una grilla de fotos.
                </p>
              </Card.Body>
            </Card>
          </Demo>
        </Grid>
      </Section>

      <Section
        title="Quieta, y sin acciones escondidas"
        note="`interactive` es para la tarjeta que es un link entero: sube la sombra sin mover el contenido."
      >
        <Grid min={300}>
          <Demo label="Quieta" code={`<Card>
  <div className={cover} />
  <div>El barrio como mapa</div>
  <div>Geografía · 6.º · Indagación</div>
</Card>`}>
            <Card className={cls.stillCard}>
              <div className={cls.stillCover} style={{ height: 120 }} />
              <div className={cls.stillBody}>
                <div className={cls.stillTitle}>El barrio como mapa</div>
                <div className={cls.stillMeta}>Geografía · 6.º · Indagación</div>
              </div>
            </Card>
          </Demo>
          <Demo label="Con `interactive`" code={`<Card interactive>
  <div className={cover} />
  <div>Con interactive</div>
  <div>Sube la sombra en hover, sin moverse</div>
</Card>`}>
            <Card className={cls.hoverCard} interactive>
              <div className={cls.hoverCover} style={{ height: 120 }} />
              <div className={cls.hoverBody}>
                <div className={cls.hoverTitle}>Con interactive</div>
                <div className={cls.hoverMeta}>Sube la sombra en hover, sin moverse</div>
              </div>
            </Card>
          </Demo>
        </Grid>
      </Section>

      <Section
        title="Papel o hueco"
        note="`paper` es una cosa apoyada arriba; `muted` es un hueco para lo que agrupa sin ser protagonista, un resumen o un bloque de ayuda."
      >
        <Grid min={300}>
          <Demo label="paper" code={`<Card surface="paper">
  <div>paper</div>
  <div>Sobresale. El default.</div>
</Card>`}>
            <Card className={cls.paperCard} surface="paper">
              <div className={cls.paperTitle}>paper</div>
              <div className={cls.paperMeta}>Sobresale. El default.</div>
            </Card>
          </Demo>
          <Demo label="muted" code={`<Card surface="muted">
  <div>muted</div>
  <div>Un hueco, para lo que agrupa.</div>
</Card>`}>
            <Card className={cls.mutedCard} surface="muted">
              <div className={cls.mutedTitle}>muted</div>
              <div className={cls.mutedMeta}>Un hueco, para lo que agrupa.</div>
            </Card>
          </Demo>
        </Grid>
      </Section>

      <Note title="Card o Row">
        La tarjeta es para una grilla de cosas que se comparan de reojo. Si lo que hay es una lista
        de ajustes (etiqueta a la izquierda, control a la derecha) eso es un
        [Row](#row) adentro de un panel, y
        no seis tarjetas apiladas.
      </Note>

      <Section title="Props">
        <Props of="Card" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Se arma con sus partes: `Card.Header`, `Card.Title`, `Card.Body`.</Practices.Do>
          <Practices.Dont>No la muevas en hover ni le pongas acciones flotando encima: una grilla que salta hace temblar la vista, y un botón que aparece con el mouse no se descubre sin mouse.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'`Card.Title` es un <h3>: la tarjeta entra en el esquema de encabezados de la página en vez de ser texto en negrita.'}</A11y.Item>
          <A11y.Item>La tarjeta no se mueve en hover ni esconde acciones detrás del puntero, así que se descubre igual sin mouse.</A11y.Item>
          <A11y.Item>Con interactive, lo que se toca sigue siendo un control de verdad (un link o un botón) y no un div con onClick.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
