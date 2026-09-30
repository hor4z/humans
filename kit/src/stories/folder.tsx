import cls from './folder.module.css'
import { Card } from '@milo/ui/card'
import { Folder } from '../demo/folder/folder'
import { Icon } from '@milo/ui/icon'
import { A11y, Demo, Footnote, Mono, Page, Practices, Props, Section, Stack } from '../kit'
import { person } from '../fixtures'

export function FolderStory() {
  return (
    <Page
      title="Folder"
      kind="Del sitio"
      imports="import { Folder } from './demo/folder/folder'"
      lead="Una carpeta que se abre. Cerrada es una silueta limpia; al pasar por encima las hojas suben desde adentro y se abanican, y ahí se ve qué hay sin tener que entrar."
    >
      <Section
        title="Pasá el mouse"
        note="Lo que se mueve es el contenido y no la pieza: la carpeta no cambia de tamaño ni de lugar, así que la grilla se queda quieta, y lo que se gana es cuántas hojas hay."
      >
        <Demo code={`<Folder onClick={open}>
  <Folder.Label>Onboarding</Folder.Label>
  <Folder.Meta>15 archivos</Folder.Meta>
</Folder>
<Folder onClick={open}>
  <Folder.Label>Matemática · 4.º A</Folder.Label>
  <Folder.Meta>8 actividades</Folder.Meta>
</Folder>
<Folder sheets={2} onClick={open}>
  <Folder.Label>Sin abrir</Folder.Label>
  <Folder.Meta>2 archivos</Folder.Meta>
</Folder>`}>
          <Card surface="muted" className={cls.hoverShelf}>
            <Folder onClick={() => {}}>
              <Folder.Label>Onboarding</Folder.Label>
              <Folder.Meta>15 archivos</Folder.Meta>
            </Folder>
            <Folder onClick={() => {}}>
              <Folder.Label>Matemática · 4.º A</Folder.Label>
              <Folder.Meta>8 actividades</Folder.Meta>
            </Folder>
            <Folder sheets={2} onClick={() => {}}>
              <Folder.Label>Sin abrir</Folder.Label>
              <Folder.Meta>2 archivos</Folder.Meta>
            </Folder>
          </Card>
        </Demo>
      </Section>

      <Section title="El tamaño">
        <Demo code={`<Folder size={88} />
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
        <Footnote>
          Adentro no hay un px suelto: todo va en por ciento del ancho, así que el mismo dibujo
          sirve a 88 y a 220.
        </Footnote>
      </Section>

      <Section
        title="El amarillo sale de una regla"
        note="El amarillo de la carpeta es propio y no el de `warn`: una carpeta no está avisando de nada."
      >
        <Demo code={`<Folder>
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
        <Footnote>
          Se elige <strong className={cls.emphasis}>un solo color</strong>, el del cuerpo:
          la pestaña y el canto salen de él con color relativo, así que la carpeta queda pintada
          entera. Antes solo se teñía el cuerpo y quedaba con la oreja amarilla, que se veía como un
          error. Sirve igual para distinguir una carpeta puntual y no para pintar una grilla entera:
          doce carpetas de doce colores es un arcoíris, que es lo mismo que dice la nota de los
          tintes.
        </Footnote>
      </Section>

      <Section
        title="Con avatares"
        note="Es un `Avatar.Group`, así que hereda todo lo suyo: tres caras como máximo y el resto en un círculo neutro."
      >
        <Demo code={`<Folder avatars={[person('Ana Pérez', 1), person('Bruno Díaz', 2)]}>
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
          <Card surface="muted" className={cls.avatarShelf}>
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
        <Footnote>
          El anillo de los avatares va del color del cuerpo y no del papel: acá están apoyados sobre
          la carpeta, no sobre la página, y con el anillo blanco se ven recortados. El tamaño sale
          del ancho de la carpeta, como todo lo demás.
        </Footnote>
      </Section>

      <Section
        title="No reemplaza a Icon.Folder"
        note="`Icon.Folder` es el glifo de 20 que identifica un espacio en una lista de siete. Esto es la pieza grande: una carpeta que se mira, no una que se lee de reojo."
      >
        <Demo code={`<Folder size={88} />
<Icon.Folder color="blue" size={20} />`}>
          <Folder size={88} />
          <Icon.Folder color="blue" size={20} />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Folder" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El nombre va en `Folder.Label` y la línea de apoyo en `Folder.Meta`.</Practices.Do>
          <Practices.Dont>El color sale de un token, nunca de un hex escrito a mano.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El color identifica el espacio de un vistazo, pero el nombre está siempre escrito.</A11y.Item>
          <A11y.Item>El dibujo es aria-hidden: no se anuncia una carpeta dibujada.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
