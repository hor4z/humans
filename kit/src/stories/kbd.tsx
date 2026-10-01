import cls from './kbd.module.css'
import { Kbd } from '@humans/ui/kbd'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function KbdStory() {
  return (
    <Page
      title="Kbd"
      kind="Superficies"
      imports="import { Kbd } from '@humans/ui/kbd'"
      lead="Representa una tecla o una combinación de teclas dentro de una instrucción."
    >
      <Hero>
        <Kbd>K</Kbd>
        <Kbd>⌘K</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>min</Kbd>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Tecla" required>La caja hundida con el símbolo, el nombre o la unidad adentro: radio 6, borde neutro y una sombra interior suave.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo label="Dónde aparece" note="Al final de la instrucción, después de decir qué hace: primero se lee la acción y después la tecla." code={`<span>Buscar una pieza <Kbd>/</Kbd></span>
<span>Abrir la paleta <Kbd>⌘K</Kbd></span>
<span>Cerrar <Kbd>Esc</Kbd></span>`}>
          <span className={cls.hint}>
            Buscar una pieza <Kbd>/</Kbd>
          </span>
          <span className={cls.hint}>
            Abrir la paleta <Kbd>⌘K</Kbd>
          </span>
          <span className={cls.hint}>
            Cerrar <Kbd>Esc</Kbd>
          </span>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Kbd" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El símbolo antes que el nombre: <Kbd>⌘</Kbd> y no "Cmd", <Kbd>⇧</Kbd> y no "Shift", porque es lo que está impreso en la tecla. La excepción son las que no tienen símbolo (Esc, Tab, Enter).</Practices.Do>
          <Practices.Do>Es un recordatorio de la tecla, no la tecla: el atajo lo escucha quien lo pone.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Usa el elemento `<kbd>`, que es lo que un lector de pantalla anuncia como una tecla.'}</A11y.Item>
          <A11y.Item>No es un botón: es texto que dice qué apretar, no algo que se toque.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
