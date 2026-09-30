import cls from './accessibility.module.css'
import { Button } from '@milo/ui/button'
import { Chip } from '@milo/ui/chip'
import { Field } from '@milo/ui/field'
import { TextField } from '@milo/ui/text-field'
import { Table } from '@milo/ui/table'
import { A11y, Page, Rich, Section } from '../kit'
import { ContrastTable, type ContrastRow } from './color-tables'

/** Las reglas del sistema, no las de cada pieza: lo de cada pieza está en su vista. */
const rules = [
  ['Contraste', 'AA (4,5:1) para texto, en los dos temas. Los tests leen los tokens y calculan el ratio.'],
  ['Teclado', 'Todo se alcanza con Tab, se activa con Enter o espacio y se cierra con Escape, que cierra solo lo de más arriba. Las listas se recorren con flechas, Home y End.'],
  ['Foco', 'Un anillo azul, el mismo en todo el sistema, que se ve siempre y es uno solo.'],
  ['Color', 'Nunca viaja solo: cada estado trae su glifo y su texto.'],
  ['Texto', 'La escala va en rem, así que se respeta la preferencia del navegador. Las cajas chicas usan alto mínimo.'],
  ['Movimiento', 'Con `prefers-reduced-motion` las animaciones se van; lo que informa por moverse baja de velocidad y no se congela.'],
] as const

const targets = [
  ['sm', 36, 'Una fila densa, con mouse.'],
  ['md', 40, 'La acción dentro de un panel.'],
  ['lg', 44, 'La acción principal. Llega al tamaño por defecto de Apple.'],
] as const

const exceptions: ContrastRow[] = [
  { what: 'Naranja de aviso sobre su pista', fg: '--warn', bg: '--track', min: 3, why: 'El valor nunca lo lleva solo el color: la barra trae su rótulo y su número.' },
  { what: 'Borde de un campo sobre el papel', fg: '--field-border', bg: '--surface', min: 3, why: 'El campo se hunde contra su superficie y trae su etiqueta. Con 3:1 cada campo sería una caja dibujada.' },
]

export function AccessibilitySection() {
  return (
    <Page
      title="Accesibilidad"
      kind="Fundamentos"
      lead="Criterios de contraste, navegación por teclado y semántica para construir interfaces accesibles."
    >
      <Section title="Las reglas">
        <Table label="Las reglas de accesibilidad del sistema" minWidth={520}>
          <Table.Body>
            {rules.map(([name, how]) => (
              <Table.Row key={name}>
                <Table.Cell><strong>{name}</strong></Table.Cell>
                <Table.Cell><Rich text={how} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="El foco" note="Dos píxeles de papel y después el azul, para que se vea también sobre un botón azul. Hacé Tab acá adentro.">
        <div className={`${cls.ringCard} bg-surface`}>
          <Button variant="brand">Guardar</Button>
          <Button variant="brand">Publicar</Button>
          <Button variant="muted">Cancelar</Button>
        </div>
      </Section>

      <Section title="El tamaño del objetivo" note="WCAG 2.2 pide 24×24. Con `pointer: coarse` `sm` y `md` suben a 44. Falta el checkbox, el radio, el switch y la X de un chip: son compactos a propósito y subirlos es una decisión, no un arreglo.">
        <Table label="Alturas de los controles" minWidth={420}>
          <Table.Body>
            {targets.map(([size, px, use]) => (
              <Table.Row key={size}>
                <Table.Cell><code>{size}</code></Table.Cell>
                <Table.Cell><span className="tabular">{px}px</span></Table.Cell>
                <Table.Cell><Chip size="sm" color="ok">≥ 24</Chip></Table.Cell>
                <Table.Cell><Rich text={use} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="Lo obligatorio se dice con la palabra" note="El asterisco va `aria-hidden` y al lado viaja un &quot;(obligatorio)&quot; solo para el lector de pantalla.">
        <div className={`${cls.requiredCard} bg-surface`}>
          <Field required>
            <Field.Label>Nombre de la actividad</Field.Label>
            <Field.Hint>Lo que van a ver los aprendices en su lista.</Field.Hint>
            <TextField placeholder="Informe del experimento" />
          </Field>
        </div>
      </Section>

      <Section title="Lo que no llega a 3:1" note="Las excepciones escritas del sistema, con el contraste calculado en el tema puesto.">
        <ContrastTable label="Pares que no llegan al umbral y por qué se aceptan" rows={exceptions} />
      </Section>

      <A11y>
        <A11y.Item>El piso es AA (4,5:1) y el texto secundario lo supera con margen en los dos temas.</A11y.Item>
        <A11y.Item>Un error va como `role="alert"` y interrumpe; todo lo demás va como `role="status"` y espera su turno.</A11y.Item>
        <A11y.Item>Un menú abierto marca `region` en axe porque su panel vive en un portal: se acepta, porque una landmark por menú llenaría la lista de saltos.</A11y.Item>
        <A11y.Item>{'El sitio declara `lang="es"` y el riel es un `<nav>` con nombre y `aria-current`.'}</A11y.Item>
      </A11y>
    </Page>
  )
}
