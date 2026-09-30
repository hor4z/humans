import { Quote } from '@milo/ui/blocks/editor/quote'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section, Stack } from '../kit'

export function QuoteStory() {
  return (
    <Page
      title="Quote"
      kind="Editor"
      imports="import { Quote } from '@milo/ui/blocks/editor/quote'"
      lead="Destaca una cita y, cuando corresponde, identifica su fuente."
    >
      <Hero>
        <Stack width="xl">
          <Quote>
            <Quote.Source>Ana, 6.º B</Quote.Source>
            Me di cuenta de que si dibujaba el triángulo adentro del rectángulo, la mitad se veía
            sola y no hacía falta la fórmula.
          </Quote>
          <Quote>Lo que no se mide no se puede mejorar, pero no todo lo que importa se puede medir.</Quote>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Barra" required>La línea en el azul de marca, del lado de la lectura: corta el texto en vez de cerrar una caja.</Anatomy.Part>
        <Anatomy.Part name="Texto" required>Las palabras citadas, que van como hijo.</Anatomy.Part>
        <Anatomy.Part name="Fuente">`Quote.Source`: de quién es la cita.</Anatomy.Part>
      </Anatomy>
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

      <Section title="Props">
        <Props of="Quote" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Usala para palabras que se pueden atribuir. Si es una aclaración propia puesta aparte, va un `Callout`: la `Quote` son palabras de otro y por eso lleva de quién.</Practices.Do>
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
