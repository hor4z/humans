import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { Field } from '@milo/ui/field'
import { Icon } from '@milo/ui/icon'
import { Select } from '@milo/ui/select'
import { Sheet } from '@milo/ui/sheet'
import { Switch } from '@milo/ui/switch'
import { TextField } from '@milo/ui/text-field'
import { Textarea } from '@milo/ui/textarea'
import { useToast } from '@milo/ui/toast'
import { A11y, Demo, Note, Page, Practices, Props, Section } from '../kit'

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
      imports="import { Sheet } from '@milo/ui/sheet'"
      lead="El panel que entra de costado, para un formulario largo que no justifica cambiar de pantalla. Lo de atrás se queda donde estaba y al cerrar seguís en el mismo lugar, con el scroll donde lo dejaste."
    >
      <Section
        title="Un formulario entero"
        note="Cabecera, cuerpo y pie: el cuerpo scrollea y el pie con las acciones no, así que guardar queda siempre a la vista."
      >
        <Demo code={`<Button variant="brand" onClick={() => setOpen(true)}>Nueva actividad</Button>

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
      </Section>

      <Section
        title="De qué lado entra"
        note="El izquierdo es para lo que acompaña a la navegación (un filtro, un índice) y no para un formulario: entrar por donde está el menú se lee como que el menú creció."
      >
        <Demo code={`<Button variant="muted" iconStart={<Icon name="filter_list" />} onClick={() => setLeftOpen(true)}>Filtros</Button>

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
      </Section>

      <Note title="Sheet o Modal">
        El [Modal](#modal) interrumpe y pide una
        decisión corta: confirmá, elegí, mirá esto. El panel lateral es para trabajar un rato: un
        formulario de seis campos en un modal centrado tapa la pantalla y no deja ver aquello sobre
        lo que estás escribiendo.
      </Note>

      <Section title="Props">
        <Props of="Sheet" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre sale de `Sheet.Title`. `label` queda para el panel sin título a la vista.</Practices.Do>
          <Practices.Do>Va para un formulario largo: un modal centrado de seis campos tapa lo que estás mirando.</Practices.Do>
          <Practices.Dont>No lo anides adentro de un modal: son dos capas que compiten por el mismo Escape.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un role="dialog" modal con su nombre, y atrapa el foco mientras está abierto.</A11y.Item>
          <A11y.Item>Escape cierra por la pila global: cierra el panel de arriba y no todos los que haya detrás.</A11y.Item>
          <A11y.Item>Al cerrar, el foco vuelve al botón que lo abrió.</A11y.Item>
          <A11y.Item>Se enfoca el contenedor y no el primer campo, así que el panel no abre corrido con la primera fila tapada.</A11y.Item>
          <A11y.Item>Bloquea el scroll del fondo compensando el ancho de la barra, así que la página no salta al abrir.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
