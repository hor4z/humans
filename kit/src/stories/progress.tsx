import { Progress } from '@milo/ui/progress'
import { A11y, Demo, Note, Page, Practices, Props, Section, Stack } from '../kit'

export function ProgressStory() {
  return (
    <Page
      title="Progress"
      kind="Datos"
      imports="import { Progress } from '@milo/ui/progress'"
      lead="Cuánto va hecho de algo que tiene un final. La pista es el resto y va clarísima: con el mismo peso que el relleno, la barra se lee como dos datos apilados en vez de como una parte de un todo."
    >
      <Section
        title="La barra y su rótulo"
        note="El `Progress.Hint` es el número a la vista: '18 de 24' dice más que '75%' cuando lo que falta se cuenta."
      >
        <Demo fill code={`<Progress value={18} max={24}>
  <Progress.Label>Corregidas</Progress.Label>
  <Progress.Hint>18 de 24</Progress.Hint>
</Progress>
<Progress value={62}>
  <Progress.Label>Subida del archivo</Progress.Label>
  <Progress.Hint>62%</Progress.Hint>
</Progress>
<Progress value={7} max={7} tone="ok">
  <Progress.Label>Actividades publicadas</Progress.Label>
  <Progress.Hint>listo</Progress.Hint>
</Progress>`}>
          <Stack gap="xl">
            <Progress value={18} max={24}>
              <Progress.Label>Corregidas</Progress.Label>
              <Progress.Hint>18 de 24</Progress.Hint>
            </Progress>
            <Progress value={62}>
              <Progress.Label>Subida del archivo</Progress.Label>
              <Progress.Hint>62%</Progress.Hint>
            </Progress>
            <Progress value={7} max={7} tone="ok">
              <Progress.Label>Actividades publicadas</Progress.Label>
              <Progress.Hint>listo</Progress.Hint>
            </Progress>
          </Stack>
        </Demo>
      </Section>

      <Section
        title="El tono dice algo, no decora"
        note="`warn` y `bad` van solo cuando llenar la barra es el problema: una cuota, un espacio que se acaba."
      >
        <Demo fill code={`<Progress value={92} max={100} tone="warn">
  <Progress.Label>Espacio usado</Progress.Label>
  <Progress.Hint>92%</Progress.Hint>
</Progress>
<Progress value={100} max={100} tone="bad">
  <Progress.Label>Cuota de la cuenta</Progress.Label>
  <Progress.Hint>llena</Progress.Hint>
</Progress>`}>
          <Stack gap="xl">
            <Progress value={92} max={100} tone="warn">
              <Progress.Label>Espacio usado</Progress.Label>
              <Progress.Hint>92%</Progress.Hint>
            </Progress>
            <Progress value={100} max={100} tone="bad">
              <Progress.Label>Cuota de la cuenta</Progress.Label>
              <Progress.Hint>llena</Progress.Hint>
            </Progress>
          </Stack>
        </Demo>
      </Section>

      <Note title="Progress o Spinner">
        La barra necesita saber cuánto falta. Si eso no se sabe (una búsqueda, una consulta que
        puede tardar dos segundos o veinte) la barra miente, y lo honesto es un
        [Spinner](#spinner). Una barra que
        se queda en el 90% es la forma más cara de perder la confianza de quien mira.
      </Note>

      <Section title="Props">
        <Props of="Progress" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`Progress.Label` dice qué mide: es lo que anuncia el lector con el número, y lo que distingue tres barras apiladas.</Practices.Do>
          <Practices.Do>El default es para todo lo que avanza, y `ok` para lo que se completó.</Practices.Do>
          <Practices.Dont>No pintes cada barra de una lista con un tono distinto: se lee como un semáforo y deja de leerse como progreso.</Practices.Dont>
          <Practices.Dont>La pista es el resto, no un segundo dato: no metas dos números en la misma barra.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un role="progressbar" con aria-valuenow, aria-valuemin, aria-valuemax y su nombre.</A11y.Item>
          <A11y.Item>El número está a la vista además de en el atributo: no hay que pasar el mouse para saber cuánto va.</A11y.Item>
          <A11y.Item>El valor se recorta al rango: un 30 de 24 dibuja la barra llena y no se sale de la pista.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
