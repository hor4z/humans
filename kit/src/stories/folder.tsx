import { useToast } from '@milo/ui/toast'
import cls from './folder.module.css'
import { Card } from '@milo/ui/card'
import { Folder } from '../demo/folder/folder'
import { Icon } from '@milo/ui/icon'
import { A11y, Anatomy, Demo, Hero, Mono, Page, Panel, Practices, Props, Section, Stack } from '../kit'
import { person } from '../fixtures'

export function FolderStory() {
  const { toast } = useToast()
  return (
    <Page
      title="Folder"
      kind="Del sitio"
      imports="import { Folder } from './demo/folder/folder'"
      lead="Representa un espacio con sus archivos y participantes. La vista previa se despliega al pasar el puntero."
    >
      <Hero>
        <Card surface="muted" className={cls.shelf}>
          <Folder onClick={() => toast({ title: 'Carpeta seleccionada', body: 'Vista previa del componente Folder.' })}>
            <Folder.Label>Onboarding</Folder.Label>
            <Folder.Meta>15 archivos</Folder.Meta>
          </Folder>
          <Folder onClick={() => toast({ title: 'Carpeta seleccionada', body: 'Vista previa del componente Folder.' })}>
            <Folder.Label>Matemática · 4.º A</Folder.Label>
            <Folder.Meta>8 actividades</Folder.Meta>
          </Folder>
          <Folder sheets={2} onClick={() => toast({ title: 'Carpeta seleccionada', body: 'Vista previa del componente Folder.' })}>
            <Folder.Label>Sin abrir</Folder.Label>
            <Folder.Meta>2 archivos</Folder.Meta>
          </Folder>
        </Card>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Cuerpo" required>La carpeta, pintada de un solo color; la pestaña y el canto salen de él. Todo va en por ciento del ancho, así que el mismo dibujo sirve a 88 y a 220.</Anatomy.Part>
        <Anatomy.Part name="Hojas">Suben y se abanican en hover; `sheets` fija cuántas hay.</Anatomy.Part>
        <Anatomy.Part name="Etiqueta" required>`Folder.Label`: el nombre.</Anatomy.Part>
        <Anatomy.Part name="Línea de apoyo">`Folder.Meta`: cuántas cosas hay adentro.</Anatomy.Part>
        <Anatomy.Part name="Avatares">`avatars`: un `Avatar.Group` de tres caras como máximo y el resto en un círculo neutro, con el anillo del color del cuerpo.</Anatomy.Part>
        <Anatomy.Part name="Insignias">`badges`: un icono suelto sobre la carpeta.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
          <Demo label="Tamaños" code={`<Folder size={88} />
  <Folder size={128} />
  <Folder size={168} />
  <Folder size={220} />`}>
            <Card surface="muted" className={cls.layersShelf}>
              {[88, 128, 168, 220].map(s => (
                <Stack key={s} gap="xs" align="center">
                  <Folder size={s} />
                  <Mono>{s}</Mono>
                </Stack>
              ))}
            </Card>
          </Demo>

          <Demo label="Colores" code={`<Folder>
    <Folder.Label>Amarillo</Folder.Label>
    <Folder.Meta>el default</Folder.Meta>
  </Folder>
  <Folder color="var(--label-blue)">
    <Folder.Label>Azul</Folder.Label>
    <Folder.Meta>--label-blue</Folder.Meta>
  </Folder>
  <Folder color="var(--label-purple)">
    <Folder.Label>Púrpura</Folder.Label>
    <Folder.Meta>--label-purple</Folder.Meta>
  </Folder>
  <Folder color="var(--label-pink)">
    <Folder.Label>Rosa</Folder.Label>
    <Folder.Meta>--label-pink</Folder.Meta>
  </Folder>`}>
            <Card surface="muted" className={cls.colorShelf}>
              <Folder>
                <Folder.Label>Amarillo</Folder.Label>
                <Folder.Meta>el default</Folder.Meta>
              </Folder>
              <Folder color="var(--label-blue)">
                <Folder.Label>Azul</Folder.Label>
                <Folder.Meta>--label-blue</Folder.Meta>
              </Folder>
              <Folder color="var(--label-purple)">
                <Folder.Label>Púrpura</Folder.Label>
                <Folder.Meta>--label-purple</Folder.Meta>
              </Folder>
              <Folder color="var(--label-pink)">
                <Folder.Label>Rosa</Folder.Label>
                <Folder.Meta>--label-pink</Folder.Meta>
              </Folder>
            </Card>
          </Demo>

          <Demo label="Con avatares y un icono" code={`<Folder avatars={[person('Ana Pérez', 1), person('Bruno Díaz', 2)]}>
    <Folder.Label>Con dos</Folder.Label>
    <Folder.Meta>6 archivos</Folder.Meta>
  </Folder>
  <Folder avatars={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]}>
    <Folder.Label>Con cinco</Folder.Label>
    <Folder.Meta>24 archivos</Folder.Meta>
  </Folder>
  <Folder avatars={[person('Irene Lopez'), person('Julián Cruz'), person('Karen Ortiz')]}>
    <Folder.Label>Sin foto</Folder.Label>
    <Folder.Meta>9 archivos</Folder.Meta>
  </Folder>
  <Folder color="var(--label-blue)" avatars={[person('Mora Tello', 6), person('Nico Arce', 7)]}>
    <Folder.Label>Teñida</Folder.Label>
    <Folder.Meta>3 archivos</Folder.Meta>
  </Folder>
  <Folder badges={<Icon name="attach_file" size={16} />}>
    <Folder.Label>Con un icono</Folder.Label>
    <Folder.Meta>4 archivos</Folder.Meta>
  </Folder>`}>
            <Card surface="muted" className={cls.shelf}>
              <Folder avatars={[person('Ana Pérez', 1), person('Bruno Díaz', 2)]}>
                <Folder.Label>Con dos</Folder.Label>
                <Folder.Meta>6 archivos</Folder.Meta>
              </Folder>
              <Folder avatars={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]}>
                <Folder.Label>Con cinco</Folder.Label>
                <Folder.Meta>24 archivos</Folder.Meta>
              </Folder>
              <Folder avatars={[person('Irene Lopez'), person('Julián Cruz'), person('Karen Ortiz')]}>
                <Folder.Label>Sin foto</Folder.Label>
                <Folder.Meta>9 archivos</Folder.Meta>
              </Folder>
              <Folder color="var(--label-blue)" avatars={[person('Mora Tello', 6), person('Nico Arce', 7)]}>
                <Folder.Label>Teñida</Folder.Label>
                <Folder.Meta>3 archivos</Folder.Meta>
              </Folder>
              <Folder badges={<Icon name="attach_file" size={16} className={cls.badgeIcon} />}>
                <Folder.Label>Con un icono</Folder.Label>
                <Folder.Meta>4 archivos</Folder.Meta>
              </Folder>
            </Card>
          </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Folder" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre va en `Folder.Label` y la línea de apoyo en `Folder.Meta`.</Practices.Do>
          <Practices.Do>El amarillo es propio y no el de `warn`: una carpeta no está avisando de nada.</Practices.Do>
          <Practices.Do>Elegí un solo color, el del cuerpo, para distinguir una carpeta puntual; doce carpetas de doce colores son un arcoíris.</Practices.Do>
          <Practices.Do>Lo que se mueve es el contenido y no la pieza: la grilla se queda quieta y lo que se gana es cuántas hojas hay.</Practices.Do>
          <Practices.Dont>No la uses para identificar un espacio en una lista de siete: eso es `Icon.Folder`, el glifo de 20.</Practices.Dont>
          <Practices.Dont>El color sale de un token, nunca de un hex escrito a mano.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El color identifica el espacio de un vistazo, pero el nombre está siempre escrito.</A11y.Item>
          <A11y.Item>El dibujo es `aria-hidden`: no se anuncia una carpeta dibujada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
