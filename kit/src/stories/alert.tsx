import { useState } from 'react'
import { Alert } from '@milo/ui/alert'
import { Button } from '@milo/ui/button'
import { Icon } from '@milo/ui/icon'
import { A11y, Anatomy, Demo, Frame, Hero, Page, Practices, Props, Section, Stack } from '../kit'

export function AlertStory() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const dismiss = (id: string) => setDismissed(c => [...c, id])
  const showing = (id: string) => !dismissed.includes(id)

  return (
    <Page
      title="Alert"
      kind="Avisos"
      imports="import { Alert } from '@milo/ui/alert'"
      lead="El aviso que se queda en la página y forma parte de lo que estás mirando: algo está roto, algo falta, algo está por vencer."
    >
      <Hero>
        <Stack width="lg">
          <Alert tone="info">
            <Alert.Title>La corrección automática está en prueba</Alert.Title>
            <Alert.Body>Podés desactivarla desde Ajustes mientras la probamos.</Alert.Body>
          </Alert>
          <Alert tone="warn">
            <Alert.Title>Tres entregas vencen mañana</Alert.Title>
            <Alert.Actions>
              <Button size="sm" variant="muted">Ver las entregas</Button>
            </Alert.Actions>
          </Alert>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Glifo">{'Uno por tono, que se puede cambiar con `icon` o sacar con `icon={null}`. Un color de estado sin forma ni texto no dice nada a quien no distingue colores.'}</Anatomy.Part>
        <Anatomy.Part name="Título" required>`Alert.Title`: lo que se entiende de un vistazo.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo">`Alert.Body`: lo que hay que explicar.</Anatomy.Part>
        <Anatomy.Part name="Acciones">`Alert.Actions`: lo que se puede hacer al respecto.</Anatomy.Part>
        <Anatomy.Part name="Cerrar">Con `onDismiss`, una X para sacarlo.</Anatomy.Part>
      </Anatomy>

      <Section
        title="Los cuatro tonos"
        note="Cada tono trae su glifo: un color de estado sin forma ni texto no dice nada a quien no distingue colores."
      >
        <Demo fill code={`<Alert tone="info">
  <Alert.Title>La corrección automática está en prueba</Alert.Title>
  <Alert.Body>Podés desactivarla desde Ajustes mientras la probamos.</Alert.Body>
</Alert>
<Alert tone="ok">
  <Alert.Title>Se publicó en los siete espacios</Alert.Title>
</Alert>
<Alert tone="warn">
  <Alert.Title>Tres entregas vencen mañana</Alert.Title>
  <Alert.Body>Después de esa fecha los estudiantes ya no pueden subir nada.</Alert.Body>
  <Alert.Actions>
    <Button size="sm" variant="muted">Ver las entregas</Button>
  </Alert.Actions>
</Alert>
<Alert tone="bad" onDismiss={dismiss}>
  <Alert.Title>No se pudieron traer las entregas</Alert.Title>
  <Alert.Body>Puede ser la conexión. Lo que ya estaba corregido sigue estando.</Alert.Body>
  <Alert.Actions>
    <Button size="sm" variant="muted" iconStart={<Icon name="refresh" />}>Reintentar</Button>
  </Alert.Actions>
</Alert>`}>
          <Stack>
            <Alert tone="info">
              <Alert.Title>La corrección automática está en prueba</Alert.Title>
              <Alert.Body>Podés desactivarla desde Ajustes mientras la probamos.</Alert.Body>
            </Alert>
            <Alert tone="ok">
              <Alert.Title>Se publicó en los siete espacios</Alert.Title>
            </Alert>
            <Alert tone="warn">
              <Alert.Title>Tres entregas vencen mañana</Alert.Title>
              <Alert.Body>Después de esa fecha los estudiantes ya no pueden subir nada.</Alert.Body>
              <Alert.Actions>
                <Button size="sm" variant="muted">Ver las entregas</Button>
              </Alert.Actions>
            </Alert>
            {showing('rojo')
              ? (
                <Alert tone="bad" onDismiss={() => dismiss('rojo')}>
                  <Alert.Title>No se pudieron traer las entregas</Alert.Title>
                  <Alert.Body>Puede ser la conexión. Lo que ya estaba corregido sigue estando.</Alert.Body>
                  <Alert.Actions>
                    <Button size="sm" variant="muted" iconStart={<Icon name="refresh" />}>Reintentar</Button>
                  </Alert.Actions>
                </Alert>
              )
              : <Button size="sm" variant="muted" iconStart={<Icon name="undo" />} onClick={() => setDismissed(c => c.filter(x => x !== 'rojo'))}>Mostrarlo de nuevo</Button>}
          </Stack>
        </Demo>
      </Section>

      <Section
        title="El glifo"
        note="`icon` lo cambia cuando el aviso es de algo concreto (una fecha, un archivo); `null` lo saca adentro de algo que ya tiene su propio icono."
      >
        <Demo fill code={`<Alert tone="info" icon="schedule">
  <Alert.Title>Cierra el viernes a las 23:59</Alert.Title>
</Alert>
<Alert tone="info" icon={null}>
  <Alert.Title>Cuatro entregas nuevas desde ayer</Alert.Title>
</Alert>`}>
          <Frame width="lg">
            <Stack>
              <Alert tone="info" icon="schedule">
                <Alert.Title>Cierra el viernes a las 23:59</Alert.Title>
              </Alert>
              <Alert tone="info" icon={null}>
                <Alert.Title>Cuatro entregas nuevas desde ayer</Alert.Title>
              </Alert>
            </Stack>
          </Frame>
        </Demo>
      </Section>

      <Section title="Props">
          <Props of="Alert" />
      </Section>

      <Section title="Cómo se usa bien">
          <Practices>
            <Practices.Do>Va fijo en la pantalla, donde pasó la cosa.</Practices.Do>
            <Practices.Dont>No lo uses para acusar recibo de lo que la persona acaba de hacer: eso es un [Toast](#toast), que se va solo. Un error importante que desaparece solo es un error que nadie leyó.</Practices.Dont>
            <Practices.Do>Dale una salida en `Alert.Actions`: un aviso sin nada para tocar deja al lector solo con el problema.</Practices.Do>
            <Practices.Do>Adentro de un panel denso va en `size="sm"`.</Practices.Do>
            <Practices.Dont>Solo `tone="bad"` lleva `role="alert"`: algo que está fijo no tiene que interrumpir cada vez que se monta.</Practices.Dont>
          </Practices>
      </Section>

      <Section title="Accesibilidad">
          <A11y>
            <A11y.Item>El error va como role="alert" y el resto como role="status": solo lo urgente interrumpe lo que se está leyendo.</A11y.Item>
            <A11y.Item>El estado está en el texto y en el glifo, no solo en el color.</A11y.Item>
            <A11y.Item>La X se nombra sola y no es la única salida: el aviso se puede leer entero sin tocarla.</A11y.Item>
          </A11y>
      </Section>
    </Page>
  )
}
