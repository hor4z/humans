import { useState } from 'react'
import { Button } from '@humans/ui/button'
import { ConfirmDialog } from '@humans/ui/confirm-dialog'
import { Icon } from '@humans/ui/icon'
import { useToast } from '@humans/ui/toast'
import { A11y, Anatomy, Demo, Grid, Hero, Page, Practices, Props, Section } from '../kit'

export function ConfirmStory() {
  const [open, setOpen] = useState(false)
  const [heroOpen, setHeroOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const { toast } = useToast()
  return (
    <Page
      title="ConfirmDialog"
      kind="Superficies"
      imports="import { ConfirmDialog } from '@humans/ui/confirm-dialog'"
      lead="Solicita confirmación antes de una acción importante. Explica la consecuencia y ofrece una salida segura."
    >
      <Hero>
        <Button variant="bad" iconStart={<Icon name="delete" />} onClick={() => setHeroOpen(true)}>Borrar la actividad</Button>
        <ConfirmDialog open={heroOpen} onOpenChange={setHeroOpen} onConfirm={() => setHeroOpen(false)} tone="bad">
          <ConfirmDialog.Header>
            <ConfirmDialog.Title>¿Borrar "Fracciones equivalentes"?</ConfirmDialog.Title>
          </ConfirmDialog.Header>
          <ConfirmDialog.Body>
            Se borran también las 18 entregas que ya llegaron. No se puede deshacer.
          </ConfirmDialog.Body>
          <ConfirmDialog.Footer>
            <ConfirmDialog.Cancel />
            <ConfirmDialog.Confirm>Borrar</ConfirmDialog.Confirm>
          </ConfirmDialog.Footer>
        </ConfirmDialog>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Velo" required>Apaga lo que hay atrás; tocarlo cancela.</Anatomy.Part>
        <Anatomy.Part name="Título" required>`ConfirmDialog.Title`: la pregunta, con el nombre de lo que se va a tocar. Va en `ConfirmDialog.Header`, que no lleva X.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`ConfirmDialog.Body`: qué más se lleva puesto.</Anatomy.Part>
        <Anatomy.Part name="Cancelar" required>`ConfirmDialog.Cancel`: la salida segura.</Anatomy.Part>
        <Anatomy.Part name="Confirmar" required>`ConfirmDialog.Confirm`: el verbo de lo que va a pasar. Con `tone="bad"` se pinta de rojo.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Grid min={300}>
          <Demo label='tone="bad"' note="Para borrar algo que se lleva trabajo de los estudiantes con él, como las entregas de una actividad." code={`<Button variant="bad" iconStart={<Icon name="delete" />} onClick={() => setOpen(true)}>Borrar la actividad</Button>
<ConfirmDialog open={open} onOpenChange={setOpen} onConfirm={remove} tone="bad">
  <ConfirmDialog.Header>
    <ConfirmDialog.Title>¿Borrar "Fracciones equivalentes"?</ConfirmDialog.Title>
  </ConfirmDialog.Header>
  <ConfirmDialog.Body>
    Se borran también las 18 entregas que ya llegaron. No se puede deshacer.
  </ConfirmDialog.Body>
  <ConfirmDialog.Footer>
    <ConfirmDialog.Cancel />
    <ConfirmDialog.Confirm>Borrar</ConfirmDialog.Confirm>
  </ConfirmDialog.Footer>
</ConfirmDialog>`}>
            <Button variant="bad" iconStart={<Icon name="delete" />} onClick={() => setOpen(true)}>Borrar la actividad</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={setOpen}
              onConfirm={() => {
                setOpen(false)
                toast({ title: 'Actividad borrada', tone: 'ok' })
              }}
              tone="bad"
            >
              <ConfirmDialog.Header>
                <ConfirmDialog.Title>¿Borrar "Fracciones equivalentes"?</ConfirmDialog.Title>
              </ConfirmDialog.Header>
              <ConfirmDialog.Body>
                Se borran también las 18 entregas que ya llegaron. No se puede deshacer.
              </ConfirmDialog.Body>
              <ConfirmDialog.Footer>
                <ConfirmDialog.Cancel />
                <ConfirmDialog.Confirm>Borrar</ConfirmDialog.Confirm>
              </ConfirmDialog.Footer>
            </ConfirmDialog>
          </Demo>

          <Demo label='tone="neutral"' note="Para una decisión que cambia cómo sigue la actividad pero no borra nada, como publicarla sin fecha de cierre." code={`<Button variant="brand" iconStart={<Icon name="send" />} onClick={() => setOpen(true)}>Publicar sin fecha</Button>
<ConfirmDialog open={open} onOpenChange={setOpen} onConfirm={publish}>
  <ConfirmDialog.Header>
    <ConfirmDialog.Title>¿Publicar sin fecha de cierre?</ConfirmDialog.Title>
  </ConfirmDialog.Header>
  <ConfirmDialog.Body>
    Queda abierta hasta que la cierres a mano, y los estudiantes pueden seguir entregando.
  </ConfirmDialog.Body>
  <ConfirmDialog.Footer>
    <ConfirmDialog.Cancel />
    <ConfirmDialog.Confirm>Publicar</ConfirmDialog.Confirm>
  </ConfirmDialog.Footer>
</ConfirmDialog>`}>
            <Button variant="brand" iconStart={<Icon name="send" />} onClick={() => setPublishOpen(true)}>Publicar sin fecha</Button>
            <ConfirmDialog
              open={publishOpen}
              onOpenChange={setPublishOpen}
              onConfirm={() => {
                setPublishOpen(false)
                toast({ title: 'Actividad publicada', body: 'Queda abierta hasta que la cierres', tone: 'ok' })
              }}
            >
              <ConfirmDialog.Header>
                <ConfirmDialog.Title>¿Publicar sin fecha de cierre?</ConfirmDialog.Title>
              </ConfirmDialog.Header>
              <ConfirmDialog.Body>
                Queda abierta hasta que la cierres a mano, y los estudiantes pueden seguir entregando.
              </ConfirmDialog.Body>
              <ConfirmDialog.Footer>
                <ConfirmDialog.Cancel />
                <ConfirmDialog.Confirm>Publicar</ConfirmDialog.Confirm>
              </ConfirmDialog.Footer>
            </ConfirmDialog>
          </Demo>
        </Grid>
      </Section>

      <Section title="Props">
        <Props of="ConfirmDialog" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Los botones van con `ConfirmDialog.Cancel` y `ConfirmDialog.Confirm`: la regla de foco la ponen ellos, no el call site.</Practices.Do>
          <Practices.Do>Si la acción se puede revertir, va derecho con un [Toast](#toast) que ofrezca "Deshacer": preguntar cuesta un click siempre, deshacer solo cuando alguien se equivocó.</Practices.Do>
          <Practices.Dont>No le pongas una X: la salida segura ya está a la vista y es cancelar.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Va como `role="alertdialog"`: se anuncia con más urgencia que un diálogo común, y el nombre sale del título por `aria-labelledby`.</A11y.Item>
          <A11y.Item>Con `tone="bad"` el foco arranca en Cancelar: con el foco en "Borrar", un Enter de más lo borra. Eso lo resuelven las dos partes de botón, no el call site.</A11y.Item>
          <A11y.Item>El foco no se escapa del diálogo mientras está abierto.</A11y.Item>
          <A11y.Item>Escape cancela, que es la salida segura.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
