import { Quote } from '@milo/ui/blocks/editor/quote'
import { A11y, Demo, Note, Page, Practices, Props, Section } from '../kit'

export function QuoteStory() {
  return (
    <Page
      title="Quote"
      kind="Editor"
      imports="import { Quote } from '@milo/ui/blocks/editor/quote'"
      lead="Palabras de otro: lo que dijo alguien, un fragmento de un texto, la respuesta de un estudiante que vale leer en clase."
    >
      <Section
        title="La pieza"
        note="La barra va del lado de la lectura y no alrededor, y en el azul de marca: lo que tiene que hacer es cortar la lectura, no cerrar una caja."
      >
        <Demo label="Con de quién es" width="xl" fill code={`<Quote>
  <Quote.Source>Ana, 6.º B</Quote.Source>
  Me di cuenta de que si dibujaba el triángulo adentro del rectángulo, la mitad se veía
  sola y no hacía falta la fórmula.
</Quote>`}>
          <Quote>
            <Quote.Source>Ana, 6.º B</Quote.Source>
            Me di cuenta de que si dibujaba el triángulo adentro del rectángulo, la mitad se veía
            sola y no hacía falta la fórmula.
          </Quote>
        </Demo>
        <Demo label="Sin fuente" width="xl" fill code={`<Quote>Lo que no se mide no se puede mejorar, pero no todo lo que importa se puede medir.</Quote>`}>
          <Quote>Lo que no se mide no se puede mejorar, pero no todo lo que importa se puede medir.</Quote>
        </Demo>
      </Section>

      <Section title="Con la fuente declarada">
        <Demo width="xl" fill code={`<Quote cite="https://es.wikipedia.org/wiki/Principio_de_Arquímedes">
  <Quote.Source>Principio de Arquímedes</Quote.Source>
  Todo cuerpo sumergido en un fluido experimenta un empuje vertical hacia arriba igual al
  peso del fluido que desaloja.
</Quote>`}>
          <Quote cite="https://es.wikipedia.org/wiki/Principio_de_Arquímedes">
            <Quote.Source>Principio de Arquímedes</Quote.Source>
            Todo cuerpo sumergido en un fluido experimenta un empuje vertical hacia arriba igual al
            peso del fluido que desaloja.
          </Quote>
        </Demo>
      </Section>

      <Note title="Quote o Callout">
        La `Quote` son palabras de otro y por eso lleva de quién. El `Callout` son palabras de quien
        escribe, puestas aparte para que no se pasen de largo. Si lo que va adentro se puede
        atribuir, es una cita; si es una aclaración propia, no.
      </Note>

      <Section title="Props">
        <Props of="Quote" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Pasale `cite` cuando la cita sale de un lugar que se puede visitar: no se ve, y es lo que permite que alguien la recupere.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es un `blockquote` de verdad, no un párrafo con un borde a la izquierda: quien navega por elementos lo encuentra como cita.</A11y.Item>
          <A11y.Item>La fuente va en un `figcaption` atado a la cita, no suelta abajo, así que se sabe de qué cita habla.</A11y.Item>
          <A11y.Item>La barra de la izquierda es decorativa. Lo que dice que es una cita es el markup, no la línea.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
