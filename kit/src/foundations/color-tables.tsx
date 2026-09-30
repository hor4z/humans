import cls from './color-tables.module.css'
import { Chip } from '@milo/ui/chip'
import { contrast } from '@milo/ui/lib/contrast'
import { Table } from '@milo/ui/table'
import { Rich, useTokens } from '../kit'

export type ContrastRow = {
  /** Qué se lee: "Texto principal". */
  what: string
  /** El color de adelante. */
  fg: string
  /** El de atrás. */
  bg: string
  /** El umbral: 4,5 para texto, 3 para un control. */
  min: 3 | 4.5
  /** Solo en una excepción: por qué se acepta. */
  why?: string
}

const fmt = (n: number) => n.toFixed(2).replace('.', ',')

/** Los pares de color y su contraste, calculado con los tokens del tema puesto: no hay un número escrito a mano que se despegue del valor. */
export function ContrastTable({ label, rows }: { label: string; rows: readonly ContrastRow[] }) {
  const vals = useTokens(rows.flatMap(r => [r.fg, r.bg]))
  const showWhy = rows.some(r => r.why)
  return (
    <Table label={label} minWidth={showWhy ? 680 : 520}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Par</Table.Head>
          <Table.Head>Muestra</Table.Head>
          <Table.Head>Contraste</Table.Head>
          <Table.Head>Umbral</Table.Head>
          {showWhy && <Table.Head>Por qué se acepta</Table.Head>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map(r => {
          const value = contrast(vals[r.fg] ?? '', vals[r.bg] ?? '')
          const passes = value !== undefined && value >= r.min
          return (
            <Table.Row key={`${r.fg}${r.bg}`}>
              <Table.Cell>
                {r.what}
                <code className={cls.pair}>{r.fg} sobre {r.bg}</code>
              </Table.Cell>
              <Table.Cell>
                <span className={cls.sample} style={{ color: `var(${r.fg})`, background: `var(${r.bg})` }}>Aa</span>
              </Table.Cell>
              <Table.Cell>
                <span className="tabular">{value === undefined ? '-' : `${fmt(value)}:1`}</span>{' '}
                {value !== undefined && (
                  <Chip size="sm" color={passes ? 'ok' : 'warn'}>{passes ? 'llega' : 'no llega'}</Chip>
                )}
              </Table.Cell>
              <Table.Cell><span className="tabular">{fmt(r.min)}:1</span></Table.Cell>
              {showWhy && <Table.Cell><Rich text={r.why ?? ''} /></Table.Cell>}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export type RoleRow = { token: string; use: string }

/** Los roles de un grupo: la muestra, el token, el valor en el tema puesto y para qué sirve. */
export function RoleTable({ label, rows }: { label: string; rows: readonly RoleRow[] }) {
  const vals = useTokens(rows.map(r => r.token))
  return (
    <Table label={label} minWidth={520}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Rol</Table.Head>
          <Table.Head>Valor</Table.Head>
          <Table.Head>Para qué</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map(r => (
          <Table.Row key={r.token}>
            <Table.Cell>
              <span className={cls.role}>
                <span className={cls.swatch} style={{ background: `var(${r.token})` }} />
                <code>{r.token}</code>
              </span>
            </Table.Cell>
            <Table.Cell><code className="tabular">{vals[r.token] || '-'}</code></Table.Cell>
            <Table.Cell>{r.use}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
