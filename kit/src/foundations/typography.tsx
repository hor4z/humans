import css from './typography.module.css'
import { Table } from '@milo/ui/table'
import { A11y, Page, Rich, Section, Stack, useTokens } from '../kit'

/** Los siete roles, en orden de tamaño. `name` es el token y el resto es lo que documenta. */
const roles = [
  { name: '--type-meta', cls: css.roleMeta, px: 12, lh: 16, ls: '+0.01em', role: 'Metadatos, kbd, contadores, la ayuda de un campo. El piso: nunca para leer.' },
  { name: '--type-label', cls: css.roleLabel, px: 13, lh: 18, ls: '+0.005em', role: 'Rótulos: cabecera de tabla, chip, título de un grupo del menú.' },
  { name: '--type-body', cls: css.roleBody, px: 14, lh: 20, ls: '0', role: 'La interfaz. Si dudás, es este.' },
  { name: '--type-reading', cls: css.roleReading, px: 16, lh: 24, ls: '0', role: 'Lo que se lee de corrido: un enunciado, una consigna, el título de una superficie.' },
  { name: '--type-title', cls: css.roleTitle, px: 20, lh: 28, ls: '-0.01em', role: 'El título de una pantalla.' },
  { name: '--type-heading', cls: css.roleHeading, px: 28, lh: 36, ls: '-0.015em', role: 'El encabezado de una sección larga.' },
  { name: '--type-display', cls: css.roleDisplay, px: 40, lh: 44, ls: '-0.02em', role: 'Portadas.' },
] as const

const weights = [
  ['--font-weight-medium', '380', 'La interfaz.'],
  ['--font-weight-semibold', '430', 'Lo elegido y los títulos. Lo lleva el elegido, no la lista. Es 430 y no 500 porque el 500 ya se lee como negrita.'],
  ['--font-weight-bold', '560', 'Solo portada.'],
] as const

const rules = [
  ['Interlineado', 'Sale del rol y es siempre par, así que apila predecible. 16/24 es el 1,5 de WCAG 1.4.12.'],
  ['Tracking', 'Positivo donde la letra es chica y se empasta, cero en la interfaz, negativo donde es grande.'],
  ['Medida', 'Entre 60 y 75 caracteres para lo que se lee de corrido, en `ch` para que siga al tamaño de la letra.'],
  ['Números', '`.tabular` les da ancho fijo sin cambiar de letra: alcanza para una columna de tabla o una métrica.'],
  ['Suavizado', 'No se toca. `antialiased` no mejora el antialias: lo apaga. Si algo se ve lavado, es el peso o el contraste.'],
] as const

const choose = [
  ['se lee de corrido, en párrafos', '--type-reading'],
  ['es el título de la pantalla', '--type-title'],
  ['nombra una columna, un chip o un grupo', '--type-label'],
  ['es un dato de apoyo que se mira de reojo', '--type-meta'],
  ['es cualquier otra cosa', '--type-body'],
] as const

export function TypographySection() {
  const fonts = useTokens(['--font-sans', '--font-mono'])
  return (
    <Page
      title="Tipografía"
      kind="Fundamentos"
      lead="Una familia (Inter) y siete roles, cada uno con tamaño, interlineado y tracking juntos. La base es 14 y hay un escalón de 16 para lo que se lee de corrido."
    >
      <Section title="Los siete roles" note="El rol escribe los tres valores de una: por separado se despegan.">
        <div tabIndex={0} role="region" aria-label="La escala de texto" className={`${css.roleList} bg-surface`}>
          {roles.map(r => (
            <div key={r.name} className={css.roleRow}>
              <code className={css.roleSize}>{r.px}/{r.lh}</code>
              <span className={`${r.cls} ${css.roleSample}`}>Doce actividades</span>
              <code className={css.roleToken}>{r.name} · {r.ls}</code>
              <span className={css.roleUse}>{r.role}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Cómo se elige" note="En orden: la primera que da verdadera es la que va.">
        <Table label="Qué rol de texto usar" minWidth={420}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Si el texto…</Table.Head>
              <Table.Head>va en</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {choose.map(([q, a]) => (
              <Table.Row key={a}>
                <Table.Cell>{q}</Table.Cell>
                <Table.Cell><code className={css.tokenName}>{a}</code></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section title="Pesos" note="Tres, y la regla pesa más que los tres.">
        <div className={`${css.roleList} bg-surface`}>
          {weights.map(([name, n, use]) => (
            <div key={name} className={css.weightRow}>
              <span className={css.weightSample} style={{ fontWeight: `var(${name})` }}>Aa</span>
              <code className={css.roleToken}>{name} · {n}</code>
              <span className={css.roleUse}>{use}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Reglas" note="Lo que no es un token pero decide cómo se ve un texto.">
        <Table label="Reglas de tipografía" minWidth={420}>
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

      <Section title="La familia" note="Una sola para todo. Inter v4 trae eje óptico (`opsz 14..32`): la letra se redibuja según el tamaño, más abierta a 12px y más cerrada a 40px, sin un segundo archivo.">
        <Stack>
          {[['--font-sans', 'la interfaz y las portadas'], ['--font-mono', 'tokens, valores y atajos']].map(([t, role]) => (
            <div key={t} className={`${css.monoRow} bg-surface`}>
              <div className={css.monoMeta}>
                <code className={css.monoToken}>{t}</code>
                <span className={css.monoRole}>{role}</span>
              </div>
              <code className={css.monoValue}>{fonts[t]}</code>
            </div>
          ))}
        </Stack>
      </Section>

      <A11y>
        <A11y.Item>El piso es 12px y es un rol con nombre (`--type-meta`), para que se note cuándo se usa por debajo de lo que corresponde.</A11y.Item>
        <A11y.Item>Los tamaños van en `rem`: la preferencia de tamaño de fuente del navegador se respeta, además del zoom.</A11y.Item>
        <A11y.Item>La jerarquía nunca se apoya solo en el tamaño: un título lleva tamaño y peso, y lo accionable lleva su rol semántico en el HTML.</A11y.Item>
      </A11y>
    </Page>
  )
}
