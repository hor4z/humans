import { Icon } from '@milo/ui/icon'
import { IconButton } from '@milo/ui/icon-button'
import { Indicator } from '@milo/ui/indicator'
import { A11y, Demo, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function IndicatorStory() {
  return (
    <Page
      title="Indicator"
      kind="Datos"
      lead="Una marca chica pegada a la esquina de otra cosa. No es una pieza en sí: envuelve a la que sí lo es (un botón, un avatar, una carpeta) y le agrega un punto, un contador o un glifo sin cambiarla."
      imports="import { Indicator } from '@milo/ui/indicator'"
    >
      <Section
        title="Tres formas de marcar"
        note="El punto dice 'hay algo', el contador dice cuánto y el glifo dice qué pasó."
      >
        <Panel>
          <Variant name="punto" code={`<Indicator dot label="Hay avisos sin leer">
  <IconButton icon="notifications" label="Avisos" size="lg" />
</Indicator>`}>
            <Indicator dot label="Hay avisos sin leer">
              <IconButton icon="notifications" label="Avisos" size="lg" />
            </Indicator>
          </Variant>
          <Variant name="contador" code={`<Indicator count={3} label="3 avisos sin leer">
  <IconButton icon="inbox" label="Entregas" size="lg" />
</Indicator>
<Indicator count={148} label="148 sin leer">
  <IconButton icon="mail" label="Mensajes" size="lg" />
</Indicator>`}>
            <Indicator count={3} label="3 avisos sin leer">
              <IconButton icon="inbox" label="Entregas" size="lg" />
            </Indicator>
            <Indicator count={148} label="148 sin leer">
              <IconButton icon="mail" label="Mensajes" size="lg" />
            </Indicator>
          </Variant>
          <Variant name="glifo" code={`<Indicator icon="check" tone="ok" label="Corregida">
  <IconButton icon="inbox" label="Entregas" size="lg" />
</Indicator>
<Indicator icon="lock" tone="neutral" label="Cerrado">
  <IconButton icon="folder" label="Espacio" size="lg" />
</Indicator>`}>
            <Indicator icon="check" tone="ok" label="Corregida">
              <IconButton icon="inbox" label="Entregas" size="lg" />
            </Indicator>
            <Indicator icon="lock" tone="neutral" label="Cerrado">
              <IconButton icon="folder" label="Espacio" size="lg" />
            </Indicator>
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Los tonos"
        note="El acento es el default y dice 'mirá esto'. Los otros cuatro significan lo mismo que en un `Alert` o en un `Chip`."
      >
        <Panel>
          <Variant name="tonos" code={`<Indicator dot tone="accent" label="accent">
  <IconButton icon="notifications" label="Avisos accent" size="lg" />
</Indicator>
<Indicator dot tone="ok" label="ok">
  <IconButton icon="notifications" label="Avisos ok" size="lg" />
</Indicator>
<Indicator dot tone="warn" label="warn">
  <IconButton icon="notifications" label="Avisos warn" size="lg" />
</Indicator>
<Indicator dot tone="bad" label="bad">
  <IconButton icon="notifications" label="Avisos bad" size="lg" />
</Indicator>
<Indicator dot tone="neutral" label="neutral">
  <IconButton icon="notifications" label="Avisos neutral" size="lg" />
</Indicator>`}>
            {(['accent', 'ok', 'warn', 'bad', 'neutral'] as const).map(t => (
              <Indicator key={t} dot tone={t} label={t}>
                <IconButton icon="notifications" label={`Avisos ${t}`} size="lg" />
              </Indicator>
            ))}
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Un glifo suelto"
        note="Sin botón alrededor, la marca se apoya en la esquina del glifo y no hace falta correrla."
      >
        <Panel>
          <Variant name="sin botón" code={`<Indicator dot tone="warn" inset={0} label="Vence mañana">
  <Icon name="calendar_month" size={24} />
</Indicator>`}>
            <Indicator dot tone="warn" inset={0} label="Vence mañana">
              <Icon name="calendar_month" size={24} />
            </Indicator>
          </Variant>
        </Panel>
      </Section>

      <Section
        title="Sobre un botón md"
        note="El default de `inset` es el de un `IconButton` `lg`; sobre uno `md` va en 6."
      >
        <Demo code={`<Indicator dot label="Hay avisos sin leer" inset={6}>
  <IconButton icon="notifications" label="Novedades" />
</Indicator>`}>
          <Indicator dot label="Hay avisos sin leer" inset={6}>
            <IconButton icon="notifications" label="Novedades" />
          </Indicator>
        </Demo>
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
