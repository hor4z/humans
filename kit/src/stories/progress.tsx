import { Progress } from '@humans/ui/progress'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section, Stack } from '../kit'

export function ProgressStory() {
  return (
    <Page
      title="Progress"
      kind="Datos"
      imports="import { Progress } from '@humans/ui/progress'"
      lead="Muestra el avance de una tarea con un total conocido."
    >
      <Hero>
        <Stack gap="xl" width="md">
          <Progress value={18} max={24}>
            <Progress.Label>Corregidas</Progress.Label>
            <Progress.Hint>18 de 24</Progress.Hint>
          </Progress>
          <Progress value={92} max={100} tone="warn">
            <Progress.Label>Espacio usado</Progress.Label>
            <Progress.Hint>92%</Progress.Hint>
          </Progress>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Pista" required>El total, apagado: es el resto de lo que falta.</Anatomy.Part>
        <Anatomy.Part name="Relleno" required>Lo hecho, en el tono elegido (`tone`).</Anatomy.Part>
        <Anatomy.Part name="Rótulo">`Progress.Label`: qué mide la barra.</Anatomy.Part>
        <Anatomy.Part name="Número">`Progress.Hint`: el número a la vista. "18 de 24" dice más que "75%" cuando lo que falta se cuenta.</Anatomy.Part>
      </Anatomy>

      <Section title="Rótulo y tono">
        <Demo note="Las barras del día a día de un curso: corregir, subir un archivo, publicar y una cuota que se llena." fill code={`<Progress value={18} max={24}>
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
<Progress value={92} max={100} tone="warn">
  <Progress.Label>Espacio usado</Progress.Label>
  <Progress.Hint>92%</Progress.Hint>
</Progress>
<Progress value={100} max={100} tone="bad">
  <Progress.Label>Cuota de la cuenta</Progress.Label>
  <Progress.Hint>llena</Progress.Hint>
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

      <Section title="Props">
        <Props of="Progress" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`Progress.Label` dice qué mide: es lo que anuncia el lector con el número, y lo que distingue tres barras apiladas.</Practices.Do>
          <Practices.Do>El default es para todo lo que avanza, y `ok` para lo que se completó. `warn` y `bad` van solo cuando llenar la barra es el problema: una cuota, un espacio que se acaba.</Practices.Do>
          <Practices.Dont>No pintes cada barra de una lista con un tono distinto: se lee como un semáforo y deja de leerse como progreso.</Practices.Dont>
          <Practices.Dont>Si no se sabe cuánto falta (una búsqueda, una consulta que tarda dos segundos o veinte) no va una barra: miente, y una barra que se queda en el 90% pierde la confianza de quien mira. Va un [Spinner](#spinner).</Practices.Dont>
          <Practices.Dont>La pista es el resto, no un segundo dato: no metas dos números en la misma barra.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un `role="progressbar"` con `aria-valuenow`, `aria-valuemin`, `aria-valuemax` y su nombre.</A11y.Item>
          <A11y.Item>El número está a la vista además de en el atributo: no hay que pasar el mouse para saber cuánto va.</A11y.Item>
          <A11y.Item>El valor se recorta al rango: un 30 de 24 dibuja la barra llena y no se sale de la pista.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
