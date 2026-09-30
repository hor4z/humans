import cls from './color.module.css'
import { Chip } from '@milo/ui/chip'
import { Table } from '@milo/ui/table'
import { Page, Ramp, Rich, Section, Stack } from '../kit'
import { ContrastTable, RoleTable, type ContrastRow, type RoleRow } from './color-tables'

const blue = ['--blue-050', '--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500', '--blue-600', '--blue-700', '--blue-800', '--blue-900'] as const
const yellow = ['--yellow-050', '--yellow-100', '--yellow-200', '--yellow-300', '--yellow-400', '--yellow-500', '--yellow-600', '--yellow-700', '--yellow-800', '--yellow-900'] as const
const gray = ['--shade-01', '--shade-02', '--shade-03', '--shade-04', '--shade-05', '--shade-06', '--shade-07', '--shade-08', '--shade-09'] as const
const amber = ['--accent-050', '--accent-500', '--accent-600'] as const

const marks = ['--mark-green', '--mark-purple', '--mark-orange', '--mark-blue', '--mark-pink'] as const
const labels = ['--label-green', '--label-teal', '--label-blue', '--label-purple', '--label-pink', '--label-orange'] as const
const spaces = ['--space-green', '--space-purple', '--space-orange', '--space-blue', '--space-pink'] as const

const which = [
  ['La acción principal de una pantalla', '`--brand` o `--solid`', 'El botón que manda, y uno solo por pantalla'],
  ['Algo que el sistema quiere que mires', '`--accent`', 'El punto de "hay algo nuevo"'],
  ['Cómo salió algo que pasó', 'los cuatro de estado', 'Corregida, vence mañana, sin entregar'],
  ['A qué grupo pertenece algo', 'una familia de categoría', 'La materia de una actividad, el espacio de una carpeta'],
  ['Cuánto de algo está hecho', '`--chart-*` sobre `--track`', 'Una barra, una celda de una grilla'],
  ['Todo lo demás', 'la rampa neutra', 'Fondos, líneas, texto, iconos'],
]

const roles: RoleRow[] = [
  { token: '--canvas', use: 'El escritorio: la página' },
  { token: '--surface', use: 'El papel: una tarjeta, un panel' },
  { token: '--surface-muted', use: 'Un hueco, una bandeja' },
  { token: '--border', use: 'El divisor de siempre' },
  { token: '--field-border', use: 'La línea de un campo' },
  { token: '--text', use: 'Lo que se lee' },
  { token: '--text-muted', use: 'Lo que acompaña' },
  { token: '--icon-muted', use: 'Un icono, un paso más oscuro que el texto' },
  { token: '--brand', use: 'El relleno del botón que manda' },
  { token: '--accent', use: 'El punto que señala' },
  { token: '--ok', use: 'Salió bien' },
  { token: '--warn', use: 'Cuidado' },
  { token: '--bad', use: 'Se rompió' },
  { token: '--track', use: 'Lo que había para hacer, en una barra' },
  { token: '--chart-fill', use: 'Lo hecho, en una barra' },
]

const pairs: ContrastRow[] = [
  { what: 'Texto principal', fg: '--text', bg: '--surface', min: 4.5 },
  { what: 'Texto secundario', fg: '--text-muted', bg: '--surface', min: 4.5 },
  { what: 'Texto sugerido de un campo', fg: '--text-placeholder', bg: '--field-bg', min: 4.5 },
  { what: 'Botón que manda', fg: '--on-brand', bg: '--brand', min: 4.5 },
  { what: 'Botón en tinta', fg: '--on-solid', bg: '--solid', min: 4.5 },
  { what: 'Botón que borra', fg: '--on-bad', bg: '--bad', min: 4.5 },
  { what: 'Tinta sobre el amarillo', fg: '--on-yellow', bg: '--yellow', min: 4.5 },
  { what: 'Tinta sobre lo elegido', fg: '--brand-ink', bg: '--brand-soft', min: 4.5 },
  { what: 'Icono', fg: '--icon-muted', bg: '--surface', min: 3 },
]

export function ColorSection() {
  return (
    <Page
      title="Color"
      kind="Fundamentos"
      lead="Un primario, un acento y una rampa casi neutra. Todo lo demás es una familia acotada que contesta una pregunta distinta. El color de una persona sale de su nombre con `colorForName`, en [Utilidades](#utilidades)."
    >
      <Section title="Cuál va" note="La pregunta no es qué color queda bien: es qué está diciendo esto.">
        <Table label="Qué rol usar según qué se quiere decir" minWidth={560}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Qué estás diciendo</Table.Head>
              <Table.Head>Rol</Table.Head>
              <Table.Head>Por ejemplo</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {which.map(([q, r, e]) => (
              <Table.Row key={q}>
                <Table.Cell>{q}</Table.Cell>
                <Table.Cell><Rich text={r} /></Table.Cell>
                <Table.Cell>{e}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="Las rampas" note="Se derivan con una regla, no se eligen a ojo. En oscuro cada escalera se da vuelta.">
        <Stack>
          <Scale title="Azul" note="El 600 está anclado: el blanco encima llega a 4,5:1, y de ahí sale `--brand`." tokens={blue} />
          <Scale title="Amarillo" note="Lleva tinta oscura: contra blanco su mejor paso da 1,31:1. Se ancla en el 100." tokens={yellow} />
          <Scale title="Naranja" note="El acento, acotado a propósito: si aparece en botones y fondos deja de señalar." tokens={amber} />
          <Scale title="Gris" note="Casi neutro: lleva el tono del azul, para no sumar un tercer color." tokens={gray} />
        </Stack>
      </Section>

      <Section title="Roles" note="Una pieza no sabe que existe `--shade-03`: sabe que hay un `--surface-muted`. El valor es el del tema puesto.">
        <RoleTable label="Los roles de color de uso más común" rows={roles} />
      </Section>

      <Section title="Estado" note="Cuatro, y ninguno viaja solo: cada uno trae su glifo y su texto.">
        <div className={`${cls.states} bg-surface`}>
          <Chip size="sm" color="info" icon="info">En prueba</Chip>
          <Chip size="sm" color="ok" icon="check_circle">Corregida</Chip>
          <Chip size="sm" color="warn" icon="schedule">Vence mañana</Chip>
          <Chip size="sm" color="bad" icon="error">Sin entregar</Chip>
        </div>
      </Section>

      <Section title="Categoría" note="Cuatro familias que no se mezclan. Lo que decide cuál va es de qué tamaño es la pieza y qué se apoya encima.">
        <Stack>
          <Family name="mark" usedFor="La marca de 44 de una fila, la inicial de un avatar" tokens={marks} />
          <Family name="label" usedFor="Lo chico: un chip, el cuadradito de una tarjeta" tokens={labels} />
          <Family name="space" usedFor="La carpeta de un espacio" tokens={spaces} />
        </Stack>
      </Section>

      <Section title="Contraste" note="Calculado con los tokens del tema puesto, no escrito a mano. Cambiá de tema para ver el otro. Las excepciones están en [Accesibilidad](#accessibility).">
        <ContrastTable label="Contraste de los pares de uso más común" rows={pairs} />
      </Section>
    </Page>
  )
}

function Scale({ title, note, tokens }: { title: string; note: string; tokens: readonly string[] }) {
  return (
    <div className={cls.scale}>
      <div className={cls.scaleHead}>
        <span className={cls.scaleTitle}>{title}</span>
        <span className={cls.scaleNote}><Rich text={note} /></span>
      </div>
      <Ramp tokens={tokens} />
    </div>
  )
}

function Family({ name, usedFor, tokens }: { name: string; usedFor: string; tokens: readonly string[] }) {
  return (
    <div className={`${cls.familyCard} bg-surface`}>
      <div className={cls.familyMeta}>
        <code className={cls.familyName}>{name}</code>
        <span className={cls.familyUse}>{usedFor}</span>
      </div>
      <div className={cls.familySwatches}>
        {tokens.map(t => (
          <span key={t} className={cls.familySwatch} style={{ background: `var(${t})` }} title={t} />
        ))}
      </div>
    </div>
  )
}
