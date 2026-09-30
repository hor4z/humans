import { Icon } from '@milo/ui/icon'
import { IconButton } from '@milo/ui/icon-button'
import { Indicator } from '@milo/ui/indicator'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function IndicatorStory() {
  return (
    <Page
      title="Indicator"
      kind="Datos"
      lead="Añade un punto, un contador o un icono de estado a otro elemento."
      imports="import { Indicator } from '@milo/ui/indicator'"
    >
      <Hero>
        <Indicator dot label="Hay avisos sin leer">
          <IconButton icon="notifications" label="Avisos" size="lg" />
        </Indicator>
        <Indicator count={3} label="3 avisos sin leer">
          <IconButton icon="inbox" label="Entregas" size="lg" />
        </Indicator>
        <Indicator icon="check" tone="ok" label="Corregida">
          <IconButton icon="folder" label="Espacio" size="lg" />
        </Indicator>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Contenido" required>Lo que se marca: un icono, un botón, un avatar. Sigue siendo lo que se toca.</Anatomy.Part>
        <Anatomy.Part name="Punto">`dot`: dice "hay algo".</Anatomy.Part>
        <Anatomy.Part name="Contador">`count`: dice cuánto. En 0 no dibuja nada y arriba de 99 dice `99+`.</Anatomy.Part>
        <Anatomy.Part name="Glifo">`icon`: dice qué pasó, con un check, un candado o una alerta.</Anatomy.Part>
        <Anatomy.Part name="Anillo">`ring`: separa la marca de lo que tiene atrás, del color de ese fondo.</Anatomy.Part>
      </Anatomy>

      <Section title="Tonos y posición">
        <Panel>
          <Variant
            name="tonos"
            note="El acento es el default y dice 'mirá esto'. Los otros cuatro significan lo mismo que en un `Callout` o en un `Chip`."
            code={`{(['accent', 'ok', 'warn', 'bad', 'neutral'] as const).map(t => (
  <Indicator key={t} dot tone={t} label={t}>
    <IconButton icon="notifications" label={\`Avisos \${t}\`} size="lg" />
  </Indicator>
))}`}
          >
            {(['accent', 'ok', 'warn', 'bad', 'neutral'] as const).map(t => (
              <Indicator key={t} dot tone={t} label={t}>
                <IconButton icon="notifications" label={`Avisos ${t}`} size="lg" />
              </Indicator>
            ))}
          </Variant>
          <Variant
            name="inset"
            note="El default es el de un `IconButton` `lg`. Sobre uno `md` va en 6; sobre un glifo suelto, en 0."
            code={`<Indicator dot label="Hay avisos sin leer" inset={6}>
  <IconButton icon="notifications" label="Novedades" />
</Indicator>
<Indicator dot tone="warn" inset={0} label="Vence mañana">
  <Icon name="calendar_month" size={24} />
</Indicator>`}
          >
            <Indicator dot label="Hay avisos sin leer" inset={6}>
              <IconButton icon="notifications" label="Novedades" />
            </Indicator>
            <Indicator dot tone="warn" inset={0} label="Vence mañana">
              <Icon name="calendar_month" size={24} />
            </Indicator>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Indicator" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El contador va solo cuando el número cambia la decisión: entre 'hay 3' y 'hay 148' sí, entre 'hay avisos' y 'hay 3' no.</Practices.Do>
          <Practices.Do>El `inset` lo escribe el call site, porque la pieza no sabe el relleno de lo que envuelve.</Practices.Do>
          <Practices.Do>El anillo es del color de lo que hay atrás, así que también sale del call site.</Practices.Do>
          <Practices.Dont>No la uses para envolver cualquier cosa: marca un icono, y sobre un avatar cada caso pide su propio número.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Con `label`, la marca se anuncia como `role="status"` y el texto va en `sr-only`: quien no la ve se entera igual, y una sola vez.</A11y.Item>
          <A11y.Item>Sin `label` la marca es decorativa y va `aria-hidden`, porque lo que significa ya está en el nombre de lo que envuelve.</A11y.Item>
          <A11y.Item>La marca no recibe el puntero: lo que se toca sigue siendo la pieza de abajo, con su mismo objetivo de siempre.</A11y.Item>
          <A11y.Item>El contador no es la única forma de enterarse: el número también está en el nombre accesible de lo que marca.</A11y.Item>
          <A11y.Item>Ningún tono se dice solo con color: el glifo es la forma, y el punto y el contador viven pegados a una pieza que ya se nombra sola.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
