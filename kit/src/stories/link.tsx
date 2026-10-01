import cls from './link.module.css'
import { Link } from '@humans/ui/link'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function LinkStory() {
  return (
    <Page
      title="Link"
      kind="Superficies"
      imports="import { Link } from '@humans/ui/link'"
      lead="Navega a otra página o recurso. Usá un botón cuando la interacción ejecuta una acción."
    >
      <Hero>
        <p className={cls.paragraphText}>
          Las entregas se cierran en la fecha que elijas. Podés cambiarla desde{' '}
          <Link href="#link">los ajustes de la actividad</Link> mientras siga abierta.
        </p>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Texto" required>Azul y subrayado, las dos señales. Dice a dónde lleva.</Anatomy.Part>
        <Anatomy.Part name="Glifo de externo">Con `external` suma un icono al final y abre en otra pestaña.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="El de afuera avisa" note="Suelto o adentro de un párrafo, para un recurso de otro sitio que se suma a la consigna, como un video o un simulador." code={`<Link href="https://m3.material.io/styles/icons" external>Material Symbols</Link>
<p>
  El set sale de <Link href="https://fonts.google.com/icons" external>Google Fonts</Link>, subseteado
  a los 160 que usamos.
</p>`} className={cls.vertical}>
          <Link href="https://m3.material.io/styles/icons" external>Material Symbols</Link>
          <p className={cls.paragraphText}>
            El set sale de <Link href="https://fonts.google.com/icons" external>Google Fonts</Link>, subseteado
            a los 160 que usamos.
          </p>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Link" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Si navega, es un `Link`: se puede abrir en otra pestaña y copiar la dirección.</Practices.Do>
          <Practices.Do>Con una URL de verdad, link: un link que borra no se puede abrir en otra pestaña sin borrar, y un botón que navega no se puede copiar ni guardar.</Practices.Do>
          <Practices.Do>Marcá el de afuera con `external`: abrir una pestaña sin avisar rompe el botón de volver, el control que más se usa del navegador.</Practices.Do>
          <Practices.Dont>Si dispara una acción, es un `Button` aunque parezca un link.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El subrayado no depende del color: en monocromo o en alto contraste el enlace se sigue reconociendo.</A11y.Item>
          <A11y.Item>Un link externo dice "se abre en otra pestaña" además de mostrar el glifo.</A11y.Item>
          <A11y.Item>El texto dice a dónde lleva: "los ajustes de la actividad" y no "hacé click acá", que fuera de la frase no significa nada.</A11y.Item>
          <A11y.Item>El foco se ve con el mismo anillo azul que el resto del sistema.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
