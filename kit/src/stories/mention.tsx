import s from './mention.module.css'
import { Mention } from '@milo/ui/blocks/editor/mention'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'
import { face } from '../fixtures'

export function MentionStory() {
  return (
    <Page
      title="Mention"
      kind="Editor"
      imports="import { Mention } from '@milo/ui/blocks/editor/mention'"
      lead="Identifica a una persona o un recurso dentro de un texto."
    >
      <Hero>
        <p className={s.paragraphText}>
          Para el jueves, <Mention name="Ana Pérez" src={face(1)} href="#avatar" /> y{' '}
          <Mention name="Matemática · 4.º A" icon="folder" href="#folder" /> tienen que leer{' '}
          <Mention name="Fracciones equivalentes" icon="description" /> antes de la clase.
        </p>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Foto o inicial">Una persona lleva su foto (`src`) o la inicial de su nombre.</Anatomy.Part>
        <Anatomy.Part name="Icono">`icon`: lo que no es una persona lleva un glifo en su lugar.</Anatomy.Part>
        <Anatomy.Part name="Nombre" required>`name`: el texto que se lee dentro de la oración. Con `href` es un enlace subrayado.</Anatomy.Part>
      </Anatomy>
      <Section title="En un párrafo y sueltas">
        <Demo label="En un párrafo" width="xl" fill code={`<p>
  Para el jueves, <Mention name="Ana Pérez" src={face(1)} href="#avatar" /> y{' '}
  <Mention name="Bruno Díaz" src={face(2)} href="#avatar" /> tienen que subir el informe
  del experimento a <Mention name="Ciencias · 5.º B" icon="folder" href="#folder" />. Si
  algo no se entiende, escríbanlo en el bloque de dudas y lo vemos en clase: la consigna
  entera está en <Mention name="Empuje y flotación" icon="description" href="#book" />, y
  la parte de las mediciones la explicó <Mention name="Carla Sosa" src={face(3)} /> el
  martes.
</p>`}>
          <p className={s.paragraphText}>
            Para el jueves, <Mention name="Ana Pérez" src={face(1)} href="#avatar" /> y{' '}
            <Mention name="Bruno Díaz" src={face(2)} href="#avatar" /> tienen que subir el informe
            del experimento a <Mention name="Ciencias · 5.º B" icon="folder" href="#folder" />. Si
            algo no se entiende, escríbanlo en el bloque de dudas y lo vemos en clase: la consigna
            entera está en <Mention name="Empuje y flotación" icon="description" href="#book" />, y
            la parte de las mediciones la explicó <Mention name="Carla Sosa" src={face(3)} /> el
            martes.
          </p>
        </Demo>
        <Demo label="Sueltas" className={s.looseStrip} code={`<Mention name="Ana Pérez" src={face(1)} href="#avatar" />
<Mention name="Elena Vega" />
<Mention name="Matemática · 4.º A" icon="folder" href="#folder" />
<Mention name="Fracciones equivalentes" icon="description" />`}>
          <Mention name="Ana Pérez" src={face(1)} href="#avatar" />
          <Mention name="Elena Vega" />
          <Mention name="Matemática · 4.º A" icon="folder" href="#folder" />
          <Mention name="Fracciones equivalentes" icon="description" />
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Mention" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Usala adentro de una oración: los renglones tienen que seguir a la misma distancia, por eso no lleva la caja de un `Chip`. En una barra o una fila, con algo que se saca con una cruz, va el `Chip`.</Practices.Do>
          <Practices.Do>Pasale `href` solo cuando lleva a algún lado: sin `href` es texto, y una mención que no lleva a ningún lado no se finge enlace.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Sin `href` es texto: no promete un lugar al que ir ni recibe el foco.</A11y.Item>
          <A11y.Item>La foto va con `alt` vacío: el nombre está escrito al lado, y anunciarlo dos veces es ruido.</A11y.Item>
          <A11y.Item>Con `href` es un enlace de verdad, así que aparece en la lista de enlaces de la página con el nombre como texto.</A11y.Item>
          <A11y.Item>Y lleva subrayado, como todo enlace del sistema: adentro de un párrafo, el fondo teñido lo distingue solo por color, y eso no le llega a quien no separa el azul del negro.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
