import { useState } from 'react'
import { Button } from '@humans/ui/button'
import { Field } from '@humans/ui/field'
import { Icon } from '@humans/ui/icon'
import { Select } from '@humans/ui/select'
import { Sheet } from '@humans/ui/sheet'
import { Switch } from '@humans/ui/switch'
import { TextField } from '@humans/ui/text-field'
import { Textarea } from '@humans/ui/textarea'
import { useToast } from '@humans/ui/toast'
import { A11y, Anatomy, Demo, Hero, Page, Panel, Practices, Props, Section } from '../kit'

export function SheetStory() {
  const [late, setLate] = useState(true)
  const [open, setOpen] = useState(false)
  const [leftOpen, setLeftOpen] = useState(false)
  const [space, setSpace] = useState('Matemática · 4.º A')
  const [spaceFilter, setSpaceFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Cualquiera')
  const { toast } = useToast()

  return (
    <Page
      title="Sheet"
      kind="Formularios"
      imports="import { Sheet } from '@humans/ui/sheet'"
      lead="Abre un panel lateral para consultar detalles o completar una tarea sin perder el contexto."
    >
      <Hero>
        <Button variant="brand" onClick={() => setOpen(true)}>Nueva actividad</Button>
        <Button variant="muted" iconStart={<Icon name="filter_list" />} onClick={() => setLeftOpen(true)}>Filtros</Button>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Panel" required>`Sheet`: la caja que entra de un costado, con `side` y `width`.</Anatomy.Part>
        <Anatomy.Part name="Velo">El fondo atenuado: un clic afuera cierra el panel.</Anatomy.Part>
        <Anatomy.Part name="Cabecera" required>`Sheet.Header`: no se mueve, y trae la X para cerrar.</Anatomy.Part>
        <Anatomy.Part name="Título" required>`Sheet.Title`: el nombre que anuncia el lector.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`Sheet.Body`: la parte que scrollea cuando el contenido no entra.</Anatomy.Part>
        <Anatomy.Part name="Pie">`Sheet.Footer`: las acciones, que no scrollean y quedan siempre a la vista.</Anatomy.Part>
      </Anatomy>

      <Section title="Un formulario y un filtro">
        <Panel>
        <Demo label="Un formulario entero: guardar queda siempre a la vista" code={`<Button variant="brand" onClick={() => setOpen(true)}>Nueva actividad</Button>

<Sheet open={open} onOpenChange={setOpen}>
  <Sheet.Header><Sheet.Title>Nueva actividad</Sheet.Title></Sheet.Header>
  <Sheet.Body>
    <Field.Set>
      <Field.Legend>Lo básico</Field.Legend>
      <Field required>
        <Field.Label>Nombre</Field.Label>
        <TextField placeholder="Fracciones equivalentes" />
      </Field>
      <Field>
        <Field.Label>Espacio</Field.Label>
        <Select value={space} onValueChange={setSpace} options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']} />
      </Field>
      <Field>
        <Field.Label>Consigna</Field.Label>
        <Field.Hint>Se puede editar después de publicar</Field.Hint>
        <Textarea rows={4} maxRows={10} />
      </Field>
      <Field>
        <Field.Label>Entregas fuera de fecha</Field.Label>
        <Field.Hint>Permitir que entreguen después del cierre</Field.Hint>
        <Switch checked={late} onCheckedChange={setLate} />
      </Field>
    </Field.Set>
  </Sheet.Body>
  <Sheet.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="brand" onClick={create}>Crear</Button>
  </Sheet.Footer>
</Sheet>`}>
          <Button variant="brand" onClick={() => setOpen(true)}>Nueva actividad</Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <Sheet.Header><Sheet.Title>Nueva actividad</Sheet.Title></Sheet.Header>
            <Sheet.Body>
              <Field.Set>
                <Field.Legend>Lo básico</Field.Legend>
                <Field required>
                  <Field.Label>Nombre</Field.Label>
                  <TextField placeholder="Fracciones equivalentes" />
                </Field>
                <Field>
                  <Field.Label>Espacio</Field.Label>
                  <Select value={space} onValueChange={setSpace} options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']} />
                </Field>
                <Field>
                  <Field.Label>Consigna</Field.Label>
                  <Field.Hint>Se puede editar después de publicar</Field.Hint>
                  <Textarea rows={4} maxRows={10} />
                </Field>
                <Field>
                  <Field.Label>Entregas fuera de fecha</Field.Label>
                  <Field.Hint>Permitir que entreguen después del cierre</Field.Hint>
                  <Switch checked={late} onCheckedChange={setLate} />
                </Field>
              </Field.Set>
            </Sheet.Body>
            <Sheet.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button
                variant="brand"
                onClick={() => {
                  setOpen(false)
                  toast({ title: 'Actividad creada', body: 'Quedó en borrador', tone: 'ok' })
                }}
              >
                Crear
              </Button>
            </Sheet.Footer>
          </Sheet>
        </Demo>
        <Demo label="Del lado izquierdo, para lo que acompaña a la navegación" code={`<Button variant="muted" iconStart={<Icon name="filter_list" />} onClick={() => setLeftOpen(true)}>Filtros</Button>

<Sheet open={leftOpen} onOpenChange={setLeftOpen} side="left" width={360}>
  <Sheet.Header><Sheet.Title>Filtros</Sheet.Title></Sheet.Header>
  <Sheet.Body>
    <Field.Set>
      <Field>
        <Field.Label>Espacio</Field.Label>
        <Select value={spaceFilter} onValueChange={setSpaceFilter} options={['Todos', 'Matemática · 4.º A', 'Lengua · 6.º']} />
      </Field>
      <Field>
        <Field.Label>Estado</Field.Label>
        <Select value={statusFilter} onValueChange={setStatusFilter} options={['Cualquiera', 'Abierta', 'Corregida', 'Borrador']} />
      </Field>
    </Field.Set>
  </Sheet.Body>
  <Sheet.Footer>
    <Button variant="ghost" onClick={clearFilters}>Limpiar</Button>
    <Button variant="brand" onClick={applyFilters}>Aplicar</Button>
  </Sheet.Footer>
</Sheet>`}>
          <Button variant="muted" iconStart={<Icon name="filter_list" />} onClick={() => setLeftOpen(true)}>Filtros</Button>
          <Sheet open={leftOpen} onOpenChange={setLeftOpen} side="left" width={360}>
            <Sheet.Header><Sheet.Title>Filtros</Sheet.Title></Sheet.Header>
            <Sheet.Body>
              <Field.Set>
                <Field>
                  <Field.Label>Espacio</Field.Label>
                  <Select value={spaceFilter} onValueChange={setSpaceFilter} options={['Todos', 'Matemática · 4.º A', 'Lengua · 6.º']} />
                </Field>
                <Field>
                  <Field.Label>Estado</Field.Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter} options={['Cualquiera', 'Abierta', 'Corregida', 'Borrador']} />
                </Field>
              </Field.Set>
            </Sheet.Body>
            <Sheet.Footer>
              <Button variant="ghost" onClick={() => setLeftOpen(false)}>Limpiar</Button>
              <Button variant="brand" onClick={() => setLeftOpen(false)}>Aplicar</Button>
            </Sheet.Footer>
          </Sheet>
        </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Sheet" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre sale de `Sheet.Title`. `label` queda para el panel sin título a la vista.</Practices.Do>
          <Practices.Do>Va para trabajar un rato: un `Modal` interrumpe y pide una decisión corta, y uno centrado con un formulario de seis campos tapa aquello sobre lo que estás escribiendo.</Practices.Do>
          <Practices.Do>`side="left"` es para lo que acompaña a la navegación, un filtro o un índice, y no para un formulario: entrar por donde está el menú se lee como que el menú creció.</Practices.Do>
          <Practices.Dont>No lo anides adentro de un modal: son dos capas que compiten por el mismo Escape.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un `role="dialog"` modal con su nombre, y atrapa el foco mientras está abierto.</A11y.Item>
          <A11y.Item>Escape cierra por la pila global: cierra el panel de arriba y no todos los que haya detrás.</A11y.Item>
          <A11y.Item>Al cerrar, el foco vuelve al botón que lo abrió.</A11y.Item>
          <A11y.Item>Se enfoca el contenedor y no el primer campo, así que el panel no abre corrido con la primera fila tapada.</A11y.Item>
          <A11y.Item>Bloquea el scroll del fondo compensando el ancho de la barra, así que la página no salta al abrir.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
