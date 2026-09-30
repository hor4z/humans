import { Button } from '@milo/ui/button'
import { Icon } from '@milo/ui/icon'
import { useToast } from '@milo/ui/toast'
import { A11y, Anatomy, Cluster, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function ToastStory() {
  const { toast } = useToast()

  return (
    <Page
      title="Toast"
      kind="Avisos"
      imports="import { ToastProvider, useToast } from '@milo/ui/toast'"
      lead="Confirma el resultado de una acción mediante un aviso temporal y una acción opcional."
    >
      <Hero>
        <Cluster gap="sm">
          <Button variant="brand" onClick={() => toast({ title: 'Actividad publicada', body: 'Ya está disponible en los siete espacios.', tone: 'ok' })}>
            Publicar
          </Button>
          <Button variant="muted" onClick={() => toast({ title: 'Borrador guardado', tone: 'ok' })}>
            Guardar
          </Button>
          <Button variant="muted" onClick={() => toast({ title: 'No se pudo subir el archivo', body: 'Elegí un archivo de hasta 20 MB.', tone: 'bad' })}>
            Error
          </Button>
        </Cluster>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Título" required>`title`: lo que pasó, en una línea.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`body`: el detalle, si hace falta.</Anatomy.Part>
        <Anatomy.Part name="Hora">`meta`: cuándo pasó, a la derecha del título.</Anatomy.Part>
        <Anatomy.Part name="Acción">`action`: un botón, casi siempre para deshacer.</Anatomy.Part>
        <Anatomy.Part name="Cerrar">Una X que lo saca antes de que se vaya solo.</Anatomy.Part>
        <Anatomy.Part name="Pila">Se apilan hasta tres: el cuarto empuja al más viejo, y el reloj se pausa mientras el mouse está encima.</Anatomy.Part>
      </Anatomy>

      <Section title="Probalo">
        <Demo label="los casos, y cinco seguidos para ver la pila" code={`const { toast } = useToast()

<Button variant="brand" onClick={() => toast({ title: 'Actividad publicada', body: 'Ya está disponible en los siete espacios.', tone: 'ok' })}>
  Publicar
</Button>
<Button variant="muted" onClick={() => toast({ title: 'Borrador guardado', tone: 'ok' })}>
  Guardar
</Button>
<Button variant="muted" onClick={() => toast({ title: 'No se pudo subir el archivo', body: 'Elegí un archivo de hasta 20 MB.', tone: 'bad' })}>
  Error
</Button>
<Button variant="muted" onClick={() => toast({ title: 'Se archivaron 12 actividades', duration: 0 })}>
  Sin vencimiento
</Button>
<Button variant="muted" onClick={() => toast({ title: 'Resumen de la semana', body: 'El lunes ya está listo.', meta: 'recién' })}>
  Con hora
</Button>
<Button
  variant="muted"
  onClick={() => {
    const names = ['Fracciones', 'El sistema solar', 'Cuento policial', 'Mapa de América', 'Ecosistemas']
    names.forEach((n, i) => setTimeout(() => toast({ title: \`Se corrigió "\${n}"\`, tone: 'ok' }), i * 260))
  }}
>
  Cinco de una
</Button>`}>
          <Cluster gap="sm">
            <Button variant="brand" onClick={() => toast({ title: 'Actividad publicada', body: 'Ya está disponible en los siete espacios.', tone: 'ok' })}>
              Publicar
            </Button>
            <Button variant="muted" onClick={() => toast({ title: 'Borrador guardado', tone: 'ok' })}>
              Guardar
            </Button>
            <Button variant="muted" onClick={() => toast({ title: 'No se pudo subir el archivo', body: 'Elegí un archivo de hasta 20 MB.', tone: 'bad' })}>
              Error
            </Button>
            <Button variant="muted" onClick={() => toast({ title: 'Se archivaron 12 actividades', duration: 0 })}>
              Sin vencimiento
            </Button>
            <Button variant="muted" onClick={() => toast({ title: 'Resumen de la semana', body: 'El lunes ya está listo.', meta: 'recién' })}>
              Con hora
            </Button>
            <Button
              variant="muted"
              onClick={() => {
                const names = ['Fracciones', 'El sistema solar', 'Cuento policial', 'Mapa de América', 'Ecosistemas']
                names.forEach((n, i) => setTimeout(() => toast({ title: `Se corrigió "${n}"`, tone: 'ok' }), i * 260))
              }}
            >
              Cinco de una
            </Button>
          </Cluster>
        </Demo>
      </Section>

      <Section
        title="Deshacer"
        note="Un toast con acción reemplaza al '¿estás seguro?' de lo que se puede revertir."
      >
        <Demo label="con salida" code={`<Button
  variant="muted"
  iconStart={<Icon name="delete" />}
  onClick={() => toast({
    title: 'Se archivó "Fracciones equivalentes"',
    action: { label: 'Deshacer', onClick: unarchive },
    duration: 8000,
  })}
>
  Archivar
</Button>`}>
          <Button
            variant="muted"
            iconStart={<Icon name="delete" />}
            onClick={() => toast({
              title: 'Se archivó "Fracciones equivalentes"',
              action: { label: 'Deshacer', onClick: () => toast({ title: 'Volvió a tus actividades', tone: 'ok' }) },
              duration: 8000,
            })}
          >
            Archivar
          </Button>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of={['ToastOptions', 'ToastProvider']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Es para lo que pasó y no necesita respuesta: aparece, se lee y se va.</Practices.Do>
          <Practices.Do>Lo que se puede revertir va con `action` de deshacer y no con una confirmación antes: preguntar cuesta un click siempre, deshacer solo cuando alguien se equivocó.</Practices.Do>
          <Practices.Dont>Si la persona tiene que seguir viendo el aviso cuando vuelva dentro de un minuto, no es un toast: es un [Callout](#callout) con `tone`, que se queda en la página.</Practices.Dont>
          <Practices.Dont>Con `duration: 0` poné una salida: sin X y sin acción, no hay forma de cerrarlo.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La región es `aria-live="polite"` con su nombre: los avisos se anuncian sin cortar lo que se esté leyendo.</A11y.Item>
          <A11y.Item>El auto-cierre se pausa al enfocar algo adentro, así que quien navega con teclado no pierde el aviso.</A11y.Item>
          <A11y.Item>Cada toast se cierra con un botón que se nombra solo, además de irse por su cuenta.</A11y.Item>
          <A11y.Item>La acción es un botón de verdad y entra en el orden de tabulación mientras el aviso está a la vista.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
