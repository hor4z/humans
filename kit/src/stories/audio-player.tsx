import { AudioPlayer } from '@milo/ui/blocks/media/audio-player'
import { IconButton } from '@milo/ui/icon-button'
import { Tooltip } from '@milo/ui/tooltip'
import { A11y, Demo, Note, Page, Panel, Practices, Props, Section, Stack, Variant } from '../kit'

/** Salen de `npm run picos -- kit/public/audio/consigna.mp3 --barras 64`. */
const peaks = [
  0.820, 0.945, 0.954, 0.886, 0.717, 1.000, 0.977, 1.000, 0.211, 0.519, 0.775, 1.000,
  0.206, 0.310, 0.015, 0.368, 0.803, 0.712, 0.488, 0.796, 0.373, 0.637, 0.190, 1.000,
  0.368, 0.297, 0.783, 0.702, 0.041, 0.004, 0.000, 0.000, 0.000, 0.005, 0.609, 0.696,
  0.639, 0.520, 0.671, 0.608, 0.724, 0.095, 0.000, 0.000, 0.000, 0.312, 0.586, 0.651,
  0.704, 0.589, 0.807, 0.481, 0.408, 0.328, 0.000, 0.660, 0.321, 0.756, 0.961, 0.375,
  0.082, 0.010, 0.000, 0.000,
] as const

/** Los del archivo largo, con las mismas sesenta y cuatro. */
const longPeaks = [
  0.730, 0.700, 0.593, 0.562, 0.807, 0.526, 0.878, 0.598, 0.896, 0.200, 0.832, 0.637,
  0.787, 1.000, 0.467, 0.038, 1.000, 0.889, 0.862, 0.851, 0.732, 1.000, 0.763, 0.411,
  0.582, 0.588, 0.442, 0.563, 0.812, 0.503, 0.689, 0.892, 0.482, 0.685, 0.430, 0.403,
  0.058, 0.760, 0.746, 0.639, 0.348, 0.495, 0.885, 0.673, 0.771, 0.031, 0.216, 1.000,
  0.755, 0.477, 0.830, 0.738, 0.873, 0.332, 0.754, 0.629, 0.547, 0.546, 0.551, 0.316,
  0.556, 0.533, 0.469, 0.197,
] as const

const AUDIO = '/audio/consigna.mp3'
const LONG = '/audio/explicacion.mp3'

export function AudioPlayerStory() {
  return (
    <Page
      title="AudioPlayer"
      kind="Medios"
      imports="import { AudioPlayer } from '@milo/ui/blocks/media/audio-player'"
      lead="Un archivo de audio con su onda: play, una línea de tiempo que se arrastra y el reloj. Para una consigna grabada o la devolución hablada de una corrección."
    >
      <Section
        title="La pieza"
        note="La onda es el archivo, no un adorno: los huecos son las pausas entre frases, así que se puede volver a la segunda sin escuchar la primera."
      >
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/consigna.mp3" title="Consigna · Matemática 4.º A" peaks={peaks} />`}>
          <AudioPlayer src={AUDIO} title="Consigna · Matemática 4.º A" peaks={peaks} />
        </Demo>
      </Section>

      <Section title="Sin los picos" note="Sin `peaks` va una pista pelada: no se inventa una onda que no es la de ese audio.">
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/consigna.mp3" title="Consigna · Matemática 4.º A" />`}>
          <AudioPlayer src={AUDIO} title="Consigna · Matemática 4.º A" />
        </Demo>
      </Section>

      <Section
        title="Los tres talles"
        note="Cambian el botón y el alto de la onda. El ancho lo pone siempre lo que la contiene."
      >
        <Panel>
          <Variant name="sm" code={`<AudioPlayer src="/audio/consigna.mp3" peaks={peaks} size="sm" />`}>
            <Stack width="md"><AudioPlayer src={AUDIO} peaks={peaks} size="sm" /></Stack>
          </Variant>
          <Variant name="md" code={`<AudioPlayer src="/audio/consigna.mp3" peaks={peaks} />`}>
            <Stack width="md"><AudioPlayer src={AUDIO} peaks={peaks} /></Stack>
          </Variant>
          <Variant name="lg" code={`<AudioPlayer src="/audio/consigna.mp3" peaks={peaks} size="lg" />`}>
            <Stack width="md"><AudioPlayer src={AUDIO} peaks={peaks} size="lg" /></Stack>
          </Variant>
        </Panel>
      </Section>

      <Section title="Un archivo largo" note="Cuarenta y nueve segundos con las mismas sesenta y cuatro barras.">
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/explicacion.mp3" title="Explicación grabada" peaks={longPeaks} />`}>
          <AudioPlayer src={LONG} title="Explicación grabada" peaks={longPeaks} />
        </Demo>
      </Section>

      <Section title="Uno por vez" note="Arrancar el segundo pausa el primero.">
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/consigna.mp3" title="Devolución para Ana Pérez" peaks={peaks} size="sm" />
<AudioPlayer src="/audio/explicacion.mp3" title="Devolución para Bruno Díaz" peaks={longPeaks} size="sm" />`}>
          <AudioPlayer src={AUDIO} title="Devolución para Ana Pérez" peaks={peaks} size="sm" />
          <AudioPlayer src={LONG} title="Devolución para Bruno Díaz" peaks={longPeaks} size="sm" />
        </Demo>
      </Section>

      <Section title="Lo que va al costado" note="Descargar, un menú, borrar. Entra por `AudioPlayer.Actions` y no como props propias.">
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/consigna.mp3" title="Devolución para Ana Pérez" peaks={peaks}>
  <AudioPlayer.Actions>
    <Tooltip label="Descargar">
      <IconButton icon="download" label="Descargar el audio" size="sm" />
    </Tooltip>
  </AudioPlayer.Actions>
</AudioPlayer>`}>
          <AudioPlayer src={AUDIO} title="Devolución para Ana Pérez" peaks={peaks}>
            <AudioPlayer.Actions>
              <Tooltip label="Descargar">
                <IconButton icon="download" label="Descargar el audio" size="sm" />
              </Tooltip>
            </AudioPlayer.Actions>
          </AudioPlayer>
        </Demo>
      </Section>

      <Section title="Cuando el archivo no está" note="Lo dice con palabras y apaga lo que no se puede usar.">
        <Demo width="lg" fill code={`<AudioPlayer src="/audio/no-existe.mp3" title="Consigna · Matemática 4.º A" />`}>
          <AudioPlayer src="/audio/no-existe.mp3" title="Consigna · Matemática 4.º A" />
        </Demo>
      </Section>

      <Note title="La línea de tiempo no es el `Slider`">
        El `Slider` dice "elegí un valor"; acá se mira un archivo y se salta a un lugar. Lo que sí
        comparten es el fondo: los dos son un `input type=range` transparente encima de lo que se
        ve, así que el teclado y el arrastre son los del navegador.
      </Note>

      <Section title="Props">
        <Props of="AudioPlayer" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Usala cuando hace falta ver la onda: es lo único que da sobre el reproductor del navegador. Si nadie necesita saltar a una parte, va un `audio` con los controles de siempre.</Practices.Do>
          <Practices.Do>Pasale `title`: mientras suena, play, pausa y salto quedan registrados en el sistema, y el botón del auricular controla este audio y no otra cosa.</Practices.Do>
          <Practices.Dont>No le sumes un control de volumen: lo pone el sistema, y uno adentro compite con el de afuera y pierde.</Practices.Dont>
          <Practices.Dont>No lo hagas arrancar solo: nada suena sin que alguien lo pida, y por eso no hay prop para eso.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El botón cambia de nombre según lo que va a hacer: "Reproducir" y "Pausar".</A11y.Item>
          <A11y.Item>La línea de tiempo es un `slider` de verdad: flechas, Home, End y las dos de página, todas del navegador.</A11y.Item>
          <A11y.Item>El `aria-valuetext` dice "0:45 de 1:30" y no "45": un número suelto no significa nada cuando el rango es un archivo.</A11y.Item>
          <A11y.Item>La onda va `aria-hidden` y el significado lo lleva el slider. Escuchar la forma (lo que un gráfico resolvería con un audio graph) acá ya lo hace el botón de play.</A11y.Item>
          <A11y.Item>Mientras carga hay un `status` que lo anuncia; si el archivo no está, el error va en texto y no solo en el color del borde.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
