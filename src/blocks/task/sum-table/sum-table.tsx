import s from './sum-table.module.css'
import { isValidElement, useId, type ReactNode } from 'react'
import { Alert } from '../../../alert/alert'
import { Table } from '../../../table/table'
import { TextField } from '../../../text-field/text-field'
import { cx } from '../../../lib/cx'
import { amount, parseNumber } from '../../../lib/number'
import { takePart } from '../../../lib/parts'

/** El texto del enunciado, para nombrar la tabla. `takePart` devuelve la parte y no lo que dice, así que hay que entrar un nivel. */
function textOf(part: ReactNode): string | undefined {
  if (!isValidElement<{ children?: ReactNode }>(part)) return undefined
  const kids = part.props.children
  return typeof kids === 'string' ? kids : undefined
}

/** Un renglón de la tabla: el concepto, que lo escribe quien arma la consigna. */
export type SumRow = {
  /** Único en la tabla. */
  id: string
  /** En qué se gasta. */
  label: string
  /** Un ejemplo de qué se cuenta acá: bolsas, horas, unidades. */
  qtyExample?: string
  /** Un ejemplo de a cuánto, con la forma que se espera y no con el número que va. */
  priceExample?: string
}

/** Lo que alguien cargó en un renglón, tal cual lo escribió. */
export type SumCell = {
  /** Cuántas unidades. */
  qty: string
  /** Cuánto sale cada una. */
  price: string
}

const empty: SumCell = { qty: '', price: '' }

/** El subtotal de un renglón: sin los dos números, todavía no hay nada que sumar. */
function subtotal(cell: SumCell): number | null {
  const q = parseNumber(cell.qty)
  const p = parseNumber(cell.price)
  return q === null || p === null ? null : q * p
}

/** De qué es la tabla. */
function Prompt({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** La línea de apoyo: de dónde sale cada número, qué no se puede olvidar. */
function Hint({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** Una tabla que se completa y se suma sola: un presupuesto, una lista de materiales, un costeo. El total no se escribe, y por eso no puede estar mal sumado. Con `cap`, además dice cuánto queda o de cuánto se pasaron. */
function Root({
  rows, value, onValueChange, cap, currency = '$', readOnly, children, className,
}: {
  /** Los conceptos, en el orden en que se leen. */
  rows: SumRow[]
  /** Lo cargado hasta ahora, por id de renglón. */
  value: Record<string, SumCell>
  /** Recibe la tabla entera con el renglón nuevo adentro. */
  onValueChange?: (next: Record<string, SumCell>) => void
  /** El tope que no se puede pasar. Sin esto la tabla suma y no opina. */
  cap?: number
  /** Lo que se antepone a cada número. */
  currency?: string
  /** Se lee y no se completa. */
  readOnly?: boolean
  /** El `SumTable.Prompt` y, si hace falta, el `SumTable.Hint`. */
  children: ReactNode
  className?: string
}) {
  const id = useId()
  const promptId = `${id}-prompt`
  const [prompt, rest] = takePart(children, Prompt)
  const [hint] = takePart(rest, Hint)

  const still = readOnly || !onValueChange
  const total = rows.reduce((acc, r) => acc + (subtotal(value[r.id] ?? empty) ?? 0), 0)
  const left = cap === undefined ? null : cap - total

  const write = (r: SumRow, field: keyof SumCell, text: string) =>
    onValueChange?.({ ...value, [r.id]: { ...(value[r.id] ?? empty), [field]: text } })

  const money = (n: number) => `${currency}${amount(n)}`

  return (
    <div className={cx(s.root, className)}>
      <p id={promptId} className={s.prompt}>{prompt}</p>
      {hint.length > 0 && <p className={s.hint}>{hint}</p>}

      <Table label={textOf(prompt[0])} minWidth={460}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Concepto</Table.Head>
            <Table.Head align="right">Cantidad</Table.Head>
            <Table.Head align="right">Precio</Table.Head>
            <Table.Head align="right">Subtotal</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map(r => {
            const cell = value[r.id] ?? empty
            const sub = subtotal(cell)
            return (
              <Table.Row key={r.id}>
                <Table.Cell><Table.Title>{r.label}</Table.Title></Table.Cell>
                <Table.Cell align="right">
                  <TextField
                    size="sm"
                    inputMode="decimal"
                    value={cell.qty}
                    placeholder={r.qtyExample}
                    readOnly={still}
                    aria-label={`Cantidad de ${r.label}`}
                    onChange={e => write(r, 'qty', e.target.value)}
                    className={s.control}
                  />
                </Table.Cell>
                <Table.Cell align="right">
                  <TextField
                    size="sm"
                    inputMode="decimal"
                    value={cell.price}
                    placeholder={r.priceExample}
                    readOnly={still}
                    aria-label={`Precio de ${r.label}`}
                    onChange={e => write(r, 'price', e.target.value)}
                    className={s.control}
                  />
                </Table.Cell>
                <Table.Num>{sub === null ? '' : money(sub)}</Table.Num>
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell><Table.Title>Total</Table.Title></Table.Cell>
            <Table.Cell />
            <Table.Cell />
            <Table.Num>{money(total)}</Table.Num>
          </Table.Row>
        </Table.Foot>
      </Table>

      {left !== null && (
        <Alert size="sm" tone={left < 0 ? 'warn' : 'info'}>
          {left < 0
            ? `Te pasaste por ${money(-left)}. El tope es ${money(cap!)}.`
            : left === 0
              ? `Usaste los ${money(cap!)} enteros.`
              : `Te quedan ${money(left)} de los ${money(cap!)}.`}
        </Alert>
      )}
    </div>
  )
}

export const SumTable = Object.assign(Root, { Prompt, Hint })
