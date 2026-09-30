import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { Field } from '@milo/ui/field'
import { Icon } from '@milo/ui/icon'
import { Modal } from '@milo/ui/modal'
import { SettingsModal } from '../demo/settings-modal/settings-modal'
import { TextField } from '@milo/ui/text-field'
import { A11y, Anatomy, Demo, Grid, Hero, Page, Practices, Props, Section } from '../kit'

export function ModalStory() {
  const [open, setOpen] = useState(false)
  const [heroOpen, setHeroOpen] = useState(false)
  const [narrowOpen, setNarrowOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [name, setName] = useState('Física · 5.º B')

  return (
    <Page
      title="Modal"
      kind="Superficies"
      imports="import { Modal } from '@milo/ui/modal'"
      lead="El diálogo centrado para lo que pide hacer algo: un formulario corto, unos ajustes, elegir. El ancho sale de tres, no de un número suelto."
    >
      <Hero>
        <Button variant="muted" onClick={() => setHeroOpen(true)}>Abrir modal</Button>
        <Modal open={heroOpen} onOpenChange={setHeroOpen} size="sm">
          <Modal.Header>
            <Modal.Title>Un modal</Modal.Title>
            <Modal.Hint>Probá Escape, o tocar el velo.</Modal.Hint>
          </Modal.Header>
          <Modal.Body>El cuerpo es lo que scrollea cuando el contenido no entra.</Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setHeroOpen(false)}>Cancelar</Button>
            <Button variant="brand" onClick={() => setHeroOpen(false)}>Entendido</Button>
          </Modal.Footer>
        </Modal>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Velo" required>Apaga lo que hay atrás; tocarlo cierra.</Anatomy.Part>
        <Anatomy.Part name="Panel" required>Una columna: la cabecera y los botones no se mueven y el cuerpo scrollea. El ancho es `sm` 420, `md` 620 o `lg` 820.</Anatomy.Part>
        <Anatomy.Part name="Cabecera">`Modal.Header`: aloja el título y su línea de apoyo, y pone la X.</Anatomy.Part>
        <Anatomy.Part name="Título">`Modal.Title`: el nombre del diálogo. `Modal.Hint` va debajo, en gris.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`Modal.Body`: el contenido, y lo único que scrollea.</Anatomy.Part>
        <Anatomy.Part name="Pie">`Modal.Footer`: los botones, contra el borde derecho.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Grid min={300}>
          <Demo label="`md` · 620, el de siempre" code={`<Button variant="muted" onClick={() => setOpen(true)}>Abrir modal</Button>
<Modal open={open} onOpenChange={setOpen} size="md">
  <Modal.Header>
    <Modal.Title>Un modal de 620</Modal.Title>
    <Modal.Hint>Lo que el lector anuncia sale de ese título.</Modal.Hint>
  </Modal.Header>
  <Modal.Body>
    El cuerpo es lo que scrollea cuando el contenido no entra. La cabecera y los botones se quedan donde están.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="brand" onClick={() => setOpen(false)}>Entendido</Button>
  </Modal.Footer>
</Modal>`}>
            <Button variant="muted" onClick={() => setOpen(true)}>Abrir modal</Button>
            <Modal open={open} onOpenChange={setOpen} size="md">
              <Modal.Header>
                <Modal.Title>Un modal de 620</Modal.Title>
                <Modal.Hint>Lo que el lector anuncia sale de ese título.</Modal.Hint>
              </Modal.Header>
              <Modal.Body>
                El cuerpo es lo que scrollea cuando el contenido no entra. La cabecera y los botones
                se quedan donde están.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="brand" onClick={() => setOpen(false)}>Entendido</Button>
              </Modal.Footer>
            </Modal>
          </Demo>

          <Demo label="`sm` · 420, una pregunta o un campo" code={`<Button variant="muted" onClick={() => setOpen(true)}>Renombrar</Button>
<Modal open={open} onOpenChange={setOpen} size="sm">
  <Modal.Header>
    <Modal.Title>Renombrar el espacio</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Field>
      <Field.Label>Nombre</Field.Label>
      <Field.Hint>Lo ven los 28 del curso.</Field.Hint>
      <TextField value={name} onValueChange={setName} />
    </Field>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="brand" size="sm" onClick={save}>Guardar</Button>
  </Modal.Footer>
</Modal>`}>
            <Button variant="muted" onClick={() => setNarrowOpen(true)}>Renombrar</Button>
            <Modal open={narrowOpen} onOpenChange={setNarrowOpen} size="sm">
              <Modal.Header>
                <Modal.Title>Renombrar el espacio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Field>
                  <Field.Label>Nombre</Field.Label>
                  <Field.Hint>Lo ven los 28 del curso.</Field.Hint>
                  <TextField value={name} onValueChange={setName} />
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" size="sm" onClick={() => setNarrowOpen(false)}>Cancelar</Button>
                <Button variant="brand" size="sm" onClick={() => setNarrowOpen(false)}>Guardar</Button>
              </Modal.Footer>
            </Modal>
          </Demo>

          <Demo label="`md` · el caso real" code={`<Button variant="muted" iconStart={<Icon name="tune" />} onClick={() => setOpen(true)}>Ajustes</Button>
<SettingsModal
  open={open}
  onOpenChange={setOpen}
  user={{
    name: 'Ana Pérez',
    email: 'ana.perez@ejemplo.edu',
    alias: 'Profe Ana',
    school: 'Escuela N.º 12 · Distrito 7',
  }}
/>`}>
            <Button variant="muted" iconStart={<Icon name="tune" />} onClick={() => setSettingsOpen(true)}>Ajustes</Button>
            <SettingsModal
              open={settingsOpen}
              onOpenChange={setSettingsOpen}
              user={{
                name: 'Ana Pérez',
                email: 'ana.perez@ejemplo.edu',
                alias: 'Profe Ana',
                school: 'Escuela N.º 12 · Distrito 7',
              }}
            />
          </Demo>
        </Grid>
      </Section>

      <Section title="Props">
        <Props of="Modal" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre sale de `Modal.Title`, que se ata solo. `label` es para el modal sin título a la vista.</Practices.Do>
          <Practices.Do>El ancho sale de `sm`, `md` o `lg`: más de 820 deja de ser un diálogo y es una pantalla.</Practices.Do>
          <Practices.Do>Si lo único que hace es preguntar "¿seguro?" y ofrecer dos salidas, usá [ConfirmDialog](#confirm): pone el foco donde corresponde y se anuncia como `alertdialog`.</Practices.Do>
          <Practices.Dont>No armes el interior a mano: el cuerpo es el que scrollea, y eso lo sabe `Modal.Body`.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>`role="dialog"` con `aria-modal`, y el nombre sale del `Modal.Title` por `aria-labelledby`: una sola fuente, y la que se ve es la que se anuncia.</A11y.Item>
          <A11y.Item>Atrapa el foco mientras está abierto y lo devuelve al cerrarse.</A11y.Item>
          <A11y.Item>Se enfoca el contenedor y no el primer control: el navegador scrollea a lo que enfoca, y eso abría el panel corrido.</A11y.Item>
          <A11y.Item>Bloquea el scroll de la página compensando el ancho de la barra, así que nada salta al abrir.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
