import { SplitButton } from '@milo/ui/split-button'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SplitButtonStory() {
  return (
    <Page
      title="SplitButton"
      kind="Acciones"
      imports="import { SplitButton } from '@milo/ui/split-button'"
      lead="La acción que se hace casi siempre, y al lado las que casi nunca. El que manda queda a un clic y el resto a dos: evita una fila de cinco botones donde cuatro no se tocan nunca."
    >
      <Hero>
        <SplitButton size="sm">
          <SplitButton.Action onClick={() => {}}>Publicar</SplitButton.Action>
          <SplitButton.Item icon="draft" onSelect={() => {}}>Guardar como borrador</SplitButton.Item>
          <SplitButton.Item icon="schedule" onSelect={() => {}}>Programar</SplitButton.Item>
        </SplitButton>
        <SplitButton size="sm" variant="muted">
          <SplitButton.Action onClick={() => {}}>Exportar</SplitButton.Action>
          <SplitButton.Item onSelect={() => {}}>Como PDF</SplitButton.Item>
          <SplitButton.Item onSelect={() => {}}>Como planilla</SplitButton.Item>
        </SplitButton>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Acción principal" required>`SplitButton.Action`: la mitad ancha, la que se toca directo.</Anatomy.Part>
        <Anatomy.Part name="Flecha">La mitad angosta: abre el menú y tiene su propio nombre, "Más opciones de" seguido de la acción.</Anatomy.Part>
        <Anatomy.Part name="Opciones" required>`SplitButton.Item`: las que casi nunca, adentro del menú que abre la flecha.</Anatomy.Part>
      </Anatomy>

      <Section title="Variantes">
        <Panel>
          <Variant
            name="brand · muted · disabled"
            note="`brand` es la acción que manda de una pantalla; `muted`, lo secundario: exportar, descargar, compartir. Las dos mitades se apagan juntas."
            code={`<SplitButton size="sm">
  <SplitButton.Action onClick={publish}>Publicar</SplitButton.Action>
  <SplitButton.Item icon="draft" onSelect={saveDraft}>Guardar como borrador</SplitButton.Item>
  <SplitButton.Item icon="schedule" onSelect={schedule}>Programar</SplitButton.Item>
</SplitButton>
<SplitButton size="sm" variant="muted">
  <SplitButton.Action onClick={exportAll}>Exportar</SplitButton.Action>
  <SplitButton.Item onSelect={exportPdf}>Como PDF</SplitButton.Item>
  <SplitButton.Item onSelect={exportSheet}>Como planilla</SplitButton.Item>
</SplitButton>
<SplitButton size="sm" variant="muted" disabled>
  <SplitButton.Action onClick={publish}>Publicar</SplitButton.Action>
  <SplitButton.Item icon="draft" onSelect={saveDraft}>Guardar como borrador</SplitButton.Item>
</SplitButton>`}
          >
            <SplitButton size="sm">
              <SplitButton.Action onClick={() => {}}>Publicar</SplitButton.Action>
              <SplitButton.Item icon="draft" onSelect={() => {}}>Guardar como borrador</SplitButton.Item>
              <SplitButton.Item icon="schedule" onSelect={() => {}}>Programar</SplitButton.Item>
            </SplitButton>
            <SplitButton size="sm" variant="muted">
              <SplitButton.Action onClick={() => {}}>Exportar</SplitButton.Action>
              <SplitButton.Item onSelect={() => {}}>Como PDF</SplitButton.Item>
              <SplitButton.Item onSelect={() => {}}>Como planilla</SplitButton.Item>
            </SplitButton>
            <SplitButton size="sm" variant="muted" disabled>
              <SplitButton.Action onClick={() => {}}>Publicar</SplitButton.Action>
              <SplitButton.Item icon="draft" onSelect={() => {}}>Guardar como borrador</SplitButton.Item>
            </SplitButton>
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="SplitButton" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>La acción de adelante es la que se hace casi siempre; el resto va al menú.</Practices.Do>
          <Practices.Dont>Si las dos acciones pesan lo mismo, van dos botones y se acabó.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Las dos mitades van en un role="group" con el nombre de la acción principal.</A11y.Item>
          <A11y.Item>La flecha lleva aria-haspopup="menu" y aria-expanded, así que se anuncia como lo que es.</A11y.Item>
          <A11y.Item>La flecha tiene su propio nombre ("Más opciones de Publicar"): dos botones sin nombre al lado no se distinguen de oído.</A11y.Item>
          <A11y.Item>Apagar el componente apaga las dos mitades, no una sola.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
