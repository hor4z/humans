import cls from './avatar.module.css'
import { Avatar } from '@humans/ui/avatar'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'
import { face, person } from '../fixtures'

export function AvatarStory() {
  return (
    <Page
      title="Avatar"
      kind="Datos"
      imports="import { Avatar } from '@humans/ui/avatar'"
      lead="Identifica a una persona con su foto o sus iniciales. Ambas variantes comparten tamaño y jerarquía."
    >
      <Hero>
        <Avatar name="Horacio Rivero" size={44} />
        <Avatar name="Ana Pérez" src={face(1)} size={44} />
        <Avatar name="Melina Duarte" size={34} />
        <Avatar name="Bruno Díaz" src={face(2)} size={34} />
        <Avatar.Group people={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Inicial" required>Sin foto, un círculo pastel con la inicial en el mismo tono: la familia de las marcas de fila.</Anatomy.Part>
        <Anatomy.Part name="Foto">Con `src`, la etiqueta de color se queda de fondo: es lo que se ve mientras la imagen carga y lo que queda si no carga nunca.</Anatomy.Part>
        <Anatomy.Part name="Grupo">`Avatar.Group`: las caras se montan un tercio y cada una lleva un anillo del color del fondo.</Anatomy.Part>
        <Anatomy.Part name="Sobrante">Pasadas las tres caras, el resto va en un círculo neutro con su cuenta. Con un solo sobrante va la cuarta cara, no un "+1".</Anatomy.Part>
      </Anatomy>

      <Section title="Con y sin foto">
        <Demo code={`<Avatar name="Horacio Rivero" size={24} />
<Avatar name="Horacio Rivero" size={34} />
<Avatar name="Equipo Timonel" size={44} />
<Avatar name="Ana Pérez" src="/avatars/01.webp" size={24} />
<Avatar name="Ana Pérez" src="/avatars/01.webp" size={34} />
<Avatar name="Bruno Díaz" src="/avatars/02.webp" size={44} />`}>
          <Avatar name="Horacio Rivero" size={24} />
          <Avatar name="Horacio Rivero" size={34} />
          <Avatar name="Equipo Timonel" size={44} />
          <Avatar name="Ana Pérez" src={face(1)} size={24} />
          <Avatar name="Ana Pérez" src={face(1)} size={34} />
          <Avatar name="Bruno Díaz" src={face(2)} size={44} />
        </Demo>
      </Section>

      <Section title="El grupo">
        <Demo label="cinco con foto, mezclados (el caso que importa mirar) y cuatro" code={`<Avatar.Group
  people={[
    { name: 'Ana Pérez', src: '/avatars/01.webp' },
    { name: 'Bruno Díaz', src: '/avatars/02.webp' },
    { name: 'Carla Sosa', src: '/avatars/03.webp' },
    { name: 'Damián Ruiz', src: '/avatars/04.webp' },
    { name: 'Elena Vega', src: '/avatars/05.webp' },
  ]}
/>
<Avatar.Group
  people={[
    { name: 'Mora Tello', src: '/avatars/06.webp' },
    { name: 'Nico Arce' },
    { name: 'Olivia Rey', src: '/avatars/07.webp' },
  ]}
/>
<Avatar.Group
  people={[
    { name: 'Irene Lopez' },
    { name: 'Julián Cruz' },
    { name: 'Karen Ortiz' },
    { name: 'Leo Nuñez' },
  ]}
/>`}>
          <Avatar.Group people={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]} />
          <Avatar.Group people={[person('Mora Tello', 6), person('Nico Arce'), person('Olivia Rey', 7)]} />
          <Avatar.Group people={[person('Irene Lopez'), person('Julián Cruz'), person('Karen Ortiz'), person('Leo Nuñez')]} />
        </Demo>
      </Section>

      <Section
        title="Sobre otro fondo"
        note="Fuera del papel hay que pasarle `ring`: un avatar no puede saber sobre qué lo pusieron."
      >
        <Demo label='ring="var(--surface-muted)" arriba, y el anillo por default abajo: se corta contra el fondo' code={`<Avatar.Group
  people={[
    { name: 'Ana Pérez', src: '/avatars/01.webp' },
    { name: 'Bruno Díaz', src: '/avatars/02.webp' },
    { name: 'Carla Sosa', src: '/avatars/03.webp' },
    { name: 'Damián Ruiz', src: '/avatars/04.webp' },
    { name: 'Elena Vega', src: '/avatars/05.webp' },
  ]}
  size={40}
  ring="var(--surface-muted)"
/>
<Avatar.Group
  people={[
    { name: 'Ana Pérez', src: '/avatars/01.webp' },
    { name: 'Bruno Díaz', src: '/avatars/02.webp' },
    { name: 'Carla Sosa', src: '/avatars/03.webp' },
    { name: 'Damián Ruiz', src: '/avatars/04.webp' },
    { name: 'Elena Vega', src: '/avatars/05.webp' },
  ]}
  size={40}
/>`}>
          <span className={cls.ringedPlate}>
            <Avatar.Group
              people={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]}
              size={40}
              ring="var(--surface-muted)"
            />
          </span>
          <span className={cls.defaultRingPlate}>
            <Avatar.Group
              people={[person('Ana Pérez', 1), person('Bruno Díaz', 2), person('Carla Sosa', 3), person('Damián Ruiz', 4), person('Elena Vega', 5)]}
              size={40}
            />
          </span>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Avatar" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Pasale siempre el nombre completo, aunque haya foto: de ahí salen la inicial, el tinte y lo que se anuncia.</Practices.Do>
          <Practices.Do>Sobre un fondo que no es el papel, `ring` va del color de ese fondo: sin anillo, dos vecinos de tonos parecidos se leen como una mancha sola.</Practices.Do>
          <Practices.Dont>En un grupo no subas `max` más allá de tres caras: más no se reconocen, se cuentan.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El grupo publica los nombres completos en texto para quien no ve las caras.</A11y.Item>
          <A11y.Item>Sin foto, la inicial va sobre su color con contraste suficiente.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
