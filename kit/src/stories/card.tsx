import cls from './card.module.css'
import { Button } from '@milo/ui/button'
import { Card } from '@milo/ui/card'
import { Chip } from '@milo/ui/chip'
import { Icon } from '@milo/ui/icon'
import { Progress } from '@milo/ui/progress'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section } from '../kit'

export function CardStory() {
  return (
    <Page
      title="Card"
      kind="Superficies"
      imports="import { Card } from '@milo/ui/card'"
      lead="La superficie de una grilla: una cosa por tarjeta, y la tarjeta entera es la unidad que se escanea."
    >
      <Hero>
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
        </Card>
        <Card className={cls.surfaceCard} surface="muted">
          <div className={cls.cardTitle}>Un hueco</div>
          <div className={cls.cardMeta}>Para lo que agrupa sin ser protagonista</div>
        </Card>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Superficie" required>El papel con su sombra: radio 16 y 8 de padding, así que lo que va adentro lleva 8.</Anatomy.Part>
        <Anatomy.Part name="Encabezado">`Card.Header`: el título y, a la derecha, lo que lo acompaña, como una etiqueta.</Anatomy.Part>
        <Anatomy.Part name="Título">`Card.Title`, un `h3`. Con `Card.Hint` debajo va la línea de apoyo.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`Card.Body`: el contenido. Acepta cualquier cosa suelta, una portada, un gráfico, una grilla de fotos.</Anatomy.Part>
        <Anatomy.Part name="Pie">`Card.Footer`: la acción que sigue.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Demo label="Completo" code={`<Card>
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

          <Demo label="Quieta y con `interactive`" code={`<Card>
  <div className={cover} />
  <div>El barrio como mapa</div>
  <div>Geografía · 6.º · Indagación</div>
</Card>
<Card interactive>
  <div className={cover} />
  <div>Con interactive</div>
  <div>Sube la sombra en hover, sin moverse</div>
</Card>`}>
            <Card className={cls.plainCard}>
              <div className={cls.cover} style={{ height: 120 }} />
              <div className={cls.coverBody}>
                <div className={cls.cardTitle}>El barrio como mapa</div>
                <div className={cls.cardMeta}>Geografía · 6.º · Indagación</div>
              </div>
            </Card>
            <Card className={cls.plainCard} interactive>
              <div className={cls.cover} style={{ height: 120 }} />
              <div className={cls.coverBody}>
                <div className={cls.cardTitle}>Con interactive</div>
                <div className={cls.cardMeta}>Sube la sombra en hover, sin moverse</div>
              </div>
            </Card>
          </Demo>

          <Demo label="`paper` o `muted`" code={`<Card surface="paper">
  <div>paper</div>
  <div>Sobresale. El default.</div>
</Card>
<Card surface="muted">
  <div>muted</div>
  <div>Un hueco, para lo que agrupa.</div>
</Card>`}>
            <Card className={cls.surfaceCard} surface="paper">
              <div className={cls.cardTitle}>paper</div>
              <div className={cls.cardMeta}>Sobresale. El default.</div>
            </Card>
            <Card className={cls.surfaceCard} surface="muted">
              <div className={cls.cardTitle}>muted</div>
              <div className={cls.cardMeta}>Un hueco, para lo que agrupa.</div>
            </Card>
          </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Card" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Se arma con sus partes: `Card.Header`, `Card.Title`, `Card.Body`.</Practices.Do>
          <Practices.Do>Para una lista de ajustes (etiqueta a la izquierda, control a la derecha) usá [Row](#row) adentro de un panel, no seis tarjetas apiladas: la tarjeta es para una grilla de cosas que se comparan de reojo.</Practices.Do>
          <Practices.Do>`interactive` es para la tarjeta que es un link entero; `muted` para lo que agrupa sin ser protagonista, como un resumen o un bloque de ayuda.</Practices.Do>
          <Practices.Dont>No la muevas en hover ni le pongas acciones flotando encima: una grilla que salta hace temblar la vista, y un botón que aparece con el mouse no se descubre sin mouse.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'`Card.Title` es un `<h3>`: la tarjeta entra en el esquema de encabezados de la página en vez de ser texto en negrita.'}</A11y.Item>
          <A11y.Item>La tarjeta no se mueve en hover ni esconde acciones detrás del puntero, así que se descubre igual sin mouse.</A11y.Item>
          <A11y.Item>{'Con `interactive`, lo que se toca sigue siendo un control de verdad (un link o un botón) y no un `<div>` con `onClick`.'}</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
