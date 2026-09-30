import { ButtonGroup } from '@milo/ui/button-group'
import { IconButton } from '@milo/ui/icon-button'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function ButtonGroupStory() {
  return (
    <Page
      title="ButtonGroup"
      kind="Acciones"
      imports="import { ButtonGroup } from '@milo/ui/button-group'"
      lead="Dos o tres acciones que son la misma cosa, pegadas y con el canto solo en los extremos. Dice que van juntas sin escribirlo."
    >
      <Hero>
        <ButtonGroup label="Paginación">
          <IconButton size="sm" variant="muted" icon="chevron_left" label="Anterior" onClick={() => {}} />
          <IconButton size="sm" variant="muted" icon="chevron_right" label="Siguiente" onClick={() => {}} />
        </ButtonGroup>
        <ButtonGroup label="Historial">
          <IconButton size="sm" variant="muted" icon="undo" label="Deshacer" onClick={() => {}} />
          <IconButton size="sm" variant="muted" icon="redo" label="Rehacer" onClick={() => {}} />
        </ButtonGroup>
        <ButtonGroup label="Mover la fila" vertical>
          <IconButton size="sm" variant="muted" icon="arrow_upward" label="Subir" onClick={() => {}} />
          <IconButton size="sm" variant="muted" icon="arrow_downward" label="Bajar" onClick={() => {}} />
        </ButtonGroup>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Botones" required>Los hijos: dos a cuatro `Button` o `IconButton`, pegados, con el canto solo en los extremos.</Anatomy.Part>
        <Anatomy.Part name="Nombre del grupo" required>`label`: no se ve, es lo que anuncia un lector para saber que los botones van juntos.</Anatomy.Part>
      </Anatomy>

      <Section title="Cuándo va">
        <Panel>
          <Variant
            name="en fila"
            note="Acciones que se ejecutan una detrás de otra: anterior y siguiente, deshacer y rehacer, el transporte de un audio con cuatro acciones y ninguna elegida."
            code={`<ButtonGroup label="Paginación">
  <IconButton size="sm" variant="muted" icon="chevron_left" label="Anterior" onClick={previous} />
  <IconButton size="sm" variant="muted" icon="chevron_right" label="Siguiente" onClick={next} />
</ButtonGroup>
<ButtonGroup label="Reproducción">
  <IconButton size="sm" variant="muted" icon="skip_previous" label="Anterior" onClick={previous} />
  <IconButton size="sm" variant="muted" icon="play_arrow" label="Reproducir" onClick={play} />
  <IconButton size="sm" variant="muted" icon="stop" label="Detener" onClick={stop} />
  <IconButton size="sm" variant="muted" icon="skip_next" label="Siguiente" onClick={next} />
</ButtonGroup>`}
          >
            <ButtonGroup label="Paginación">
              <IconButton size="sm" variant="muted" icon="chevron_left" label="Anterior" onClick={() => {}} />
              <IconButton size="sm" variant="muted" icon="chevron_right" label="Siguiente" onClick={() => {}} />
            </ButtonGroup>
            <ButtonGroup label="Reproducción">
              <IconButton size="sm" variant="muted" icon="skip_previous" label="Anterior" onClick={() => {}} />
              <IconButton size="sm" variant="muted" icon="play_arrow" label="Reproducir" onClick={() => {}} />
              <IconButton size="sm" variant="muted" icon="stop" label="Detener" onClick={() => {}} />
              <IconButton size="sm" variant="muted" icon="skip_next" label="Siguiente" onClick={() => {}} />
            </ButtonGroup>
          </Variant>
          <Variant
            name="apilado"
            note="Cuando el par es de verdad arriba y abajo, como mover una fila en una lista, o cuando la columna es angosta y de a dos no entran."
            code={`<ButtonGroup label="Mover la fila" vertical>
  <IconButton size="sm" variant="muted" icon="arrow_upward" label="Subir" onClick={moveUp} />
  <IconButton size="sm" variant="muted" icon="arrow_downward" label="Bajar" onClick={moveDown} />
</ButtonGroup>`}
          >
            <ButtonGroup label="Mover la fila" vertical>
              <IconButton size="sm" variant="muted" icon="arrow_upward" label="Subir" onClick={() => {}} />
              <IconButton size="sm" variant="muted" icon="arrow_downward" label="Bajar" onClick={() => {}} />
            </ButtonGroup>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="ButtonGroup" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`label` nombra el grupo: sin eso los botones se leen sueltos.</Practices.Do>
          <Practices.Do>Va cuando las acciones son los dos sentidos de lo mismo, o los pasos de una sola.</Practices.Do>
          <Practices.Dont>Para elegir una opción entre varias va `Segmented`: marca la puesta y trae el roving del teclado.</Practices.Dont>
          <Practices.Dont>Para una acción principal con sus variantes al lado va `SplitButton`, que ya arma el grupo.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un role="group" con su nombre: sin eso un lector lee los botones sueltos y no se entera de que van juntos.</A11y.Item>
          <A11y.Item>El foco de un botón se dibuja por encima de sus vecinos, así que el anillo no queda cortado por el de al lado.</A11y.Item>
          <A11y.Item>Cada botón sigue siendo un botón y se llega con Tab: las flechas no lo recorren, porque son acciones y no opciones.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
