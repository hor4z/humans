import { useToast } from '@humans/ui/toast'
import { SplitButton } from '@humans/ui/split-button'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function SplitButtonStory() {
  const { toast } = useToast()
  return (
    <Page
      title="SplitButton"
      kind="Acciones"
      imports="import { SplitButton } from '@humans/ui/split-button'"
      lead="Combina una acción principal con un menú de acciones relacionadas."
    >
      <Hero>
        <SplitButton size="sm">
          <SplitButton.Action onClick={() => toast({ title: 'Acción seleccionada: Publicar', body: 'Demostración del menú de acciones.' })}>Publicar</SplitButton.Action>
          <SplitButton.Item icon="draft" onSelect={() => toast({ title: 'Acción seleccionada: Guardar como borrador', body: 'Demostración del menú de acciones.' })}>Guardar como borrador</SplitButton.Item>
          <SplitButton.Item icon="schedule" onSelect={() => toast({ title: 'Acción seleccionada: Programar', body: 'Demostración del menú de acciones.' })}>Programar</SplitButton.Item>
        </SplitButton>
        <SplitButton size="sm" variant="muted">
          <SplitButton.Action onClick={() => toast({ title: 'Acción seleccionada: Exportar', body: 'Demostración del menú de acciones.' })}>Exportar</SplitButton.Action>
          <SplitButton.Item onSelect={() => toast({ title: 'Acción seleccionada: Como PDF', body: 'Demostración del menú de acciones.' })}>Como PDF</SplitButton.Item>
          <SplitButton.Item onSelect={() => toast({ title: 'Acción seleccionada: Como planilla', body: 'Demostración del menú de acciones.' })}>Como planilla</SplitButton.Item>
        </SplitButton>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Acción principal" required>`SplitButton.Action`: ejecuta la acción principal.</Anatomy.Part>
        <Anatomy.Part name="Flecha">La mitad angosta: abre el menú y tiene su propio nombre, "Más opciones de" seguido de la acción.</Anatomy.Part>
        <Anatomy.Part name="Opciones" required>`SplitButton.Item`: acciones secundarias dentro del menú.</Anatomy.Part>
      </Anatomy>

      <Section title="Variantes">
        <Panel>
          <Variant
            name="brand · muted"
            note="`brand` es la acción que manda de una pantalla; `muted`, lo secundario: exportar, descargar, compartir."
            code={`<SplitButton size="sm">
  <SplitButton.Action onClick={publish}>Publicar</SplitButton.Action>
  <SplitButton.Item icon="draft" onSelect={saveDraft}>Guardar como borrador</SplitButton.Item>
  <SplitButton.Item icon="schedule" onSelect={schedule}>Programar</SplitButton.Item>
</SplitButton>
<SplitButton size="sm" variant="muted">
  <SplitButton.Action onClick={exportAll}>Exportar</SplitButton.Action>
  <SplitButton.Item onSelect={exportPdf}>Como PDF</SplitButton.Item>
  <SplitButton.Item onSelect={exportSheet}>Como planilla</SplitButton.Item>
</SplitButton>`}
          >
            <SplitButton size="sm">
              <SplitButton.Action onClick={() => toast({ title: 'Acción seleccionada: Publicar', body: 'Demostración del menú de acciones.' })}>Publicar</SplitButton.Action>
              <SplitButton.Item icon="draft" onSelect={() => toast({ title: 'Acción seleccionada: Guardar como borrador', body: 'Demostración del menú de acciones.' })}>Guardar como borrador</SplitButton.Item>
              <SplitButton.Item icon="schedule" onSelect={() => toast({ title: 'Acción seleccionada: Programar', body: 'Demostración del menú de acciones.' })}>Programar</SplitButton.Item>
            </SplitButton>
            <SplitButton size="sm" variant="muted">
              <SplitButton.Action onClick={() => toast({ title: 'Acción seleccionada: Exportar', body: 'Demostración del menú de acciones.' })}>Exportar</SplitButton.Action>
              <SplitButton.Item onSelect={() => toast({ title: 'Acción seleccionada: Como PDF', body: 'Demostración del menú de acciones.' })}>Como PDF</SplitButton.Item>
              <SplitButton.Item onSelect={() => toast({ title: 'Acción seleccionada: Como planilla', body: 'Demostración del menú de acciones.' })}>Como planilla</SplitButton.Item>
            </SplitButton>
          </Variant>
          <Variant
            name="Apagado"
            note="Las dos mitades se apagan juntas y van en gris."
            code={`<SplitButton size="sm" variant="muted" disabled>
  <SplitButton.Action onClick={publish}>Publicar</SplitButton.Action>
  <SplitButton.Item icon="draft" onSelect={saveDraft}>Guardar como borrador</SplitButton.Item>
</SplitButton>`}
          >
            <SplitButton size="sm" variant="muted" disabled>
              <SplitButton.Action onClick={() => toast({ title: 'Acción seleccionada: Publicar', body: 'Demostración del menú de acciones.' })}>Publicar</SplitButton.Action>
              <SplitButton.Item icon="draft" onSelect={() => toast({ title: 'Acción seleccionada: Guardar como borrador', body: 'Demostración del menú de acciones.' })}>Guardar como borrador</SplitButton.Item>
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
          <Practices.Dont>Si las acciones tienen la misma importancia, usá dos botones.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Las dos mitades van en un `role="group"` con el nombre de la acción principal.</A11y.Item>
          <A11y.Item>La flecha lleva `aria-haspopup="menu"` y `aria-expanded`, así que se anuncia como lo que es.</A11y.Item>
          <A11y.Item>La flecha tiene su propio nombre ("Más opciones de Publicar"): dos botones sin nombre al lado no se distinguen de oído.</A11y.Item>
          <A11y.Item>Apagar el componente apaga las dos mitades, no una sola.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
