import s from './figure.module.css'
import { Figure } from '@milo/ui/blocks/editor/figure'
import { A11y, Demo, Page, Practices, Props, Section } from '../kit'

export function FigureStory() {
  return (
    <Page
      title="Figure"
      kind="Editor"
      imports="import { Figure } from '@milo/ui/blocks/editor/figure'"
      lead="Una imagen con su pie: lo que ilustra una consigna, la foto de un experimento, el gráfico que alguien dibujó a mano."
    >
      <Section
        title="La pieza"
        note="`cover` para una foto, `contain` para un dibujo."
      >
        <Demo fill code={`<Figure src="/avatars/03.webp" alt="Una persona sonriendo, de frente">
  <Figure.Caption>Con una foto va cover: llena el hueco y el borde no importa</Figure.Caption>
</Figure>
<Figure src="/mascotas/otto.webp" alt="Otto, una nutria de pie con un pañuelo azul" fit="contain">
  <Figure.Caption>Con un dibujo va contain: recortar se lleva justo lo que hay que ver</Figure.Caption>
</Figure>`}>
          <div className={s.pieceGrid}>
            <Figure
              src="/avatars/03.webp"
              alt="Una persona sonriendo, de frente"
            >
              <Figure.Caption>Con una foto va cover: llena el hueco y el borde no importa</Figure.Caption>
            </Figure>
            <Figure
              src="/mascotas/otto.webp"
              alt="Otto, una nutria de pie con un pañuelo azul"
              fit="contain"
            >
              <Figure.Caption>Con un dibujo va contain: recortar se lleva justo lo que hay que ver</Figure.Caption>
            </Figure>
          </div>
        </Demo>
      </Section>

      <Section
        title="Las proporciones"
        note="Cuatro, y la elige quien arma la pantalla. Una grilla donde cada imagen trae la suya se ve como una pila de recortes."
      >
        <Demo fill code={`<Figure src="/avatars/01.webp" alt="" ratio="16/9">
  <Figure.Caption>16/9</Figure.Caption>
</Figure>
<Figure src="/avatars/02.webp" alt="" ratio="4/3">
  <Figure.Caption>4/3</Figure.Caption>
</Figure>
<Figure src="/avatars/03.webp" alt="" ratio="3/2">
  <Figure.Caption>3/2</Figure.Caption>
</Figure>
<Figure src="/avatars/04.webp" alt="" ratio="1/1">
  <Figure.Caption>1/1</Figure.Caption>
</Figure>`}>
          <div className={s.ratioGrid}>
            {(['16/9', '4/3', '3/2', '1/1'] as const).map((r, i) => (
              <Figure key={r} src={`/avatars/0${i + 1}.webp`} alt="" ratio={r}>
                <Figure.Caption>{r}</Figure.Caption>
              </Figure>
            ))}
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Figure" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`alt` es qué se ve y `Figure.Caption` es qué hay que mirar: no son lo mismo.</Practices.Do>
          <Practices.Do>`ratio` reserva el hueco, así que la página no salta cuando la imagen carga.</Practices.Do>
          <Practices.Dont>Si la imagen no aporta nada que el texto no diga, `alt` va vacío y queda decorativa.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El `alt` es obligatorio, y vacío es una respuesta válida: dice "esto es decorativo" en vez de dejar que un lector invente el nombre del archivo.</A11y.Item>
          <A11y.Item>El epígrafe va en un `figcaption` atado a la figura, así que quien lo escucha sabe de qué imagen habla.</A11y.Item>
          <A11y.Item>La imagen carga en diferido y el hueco ya tiene su proporción: la página no salta.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
