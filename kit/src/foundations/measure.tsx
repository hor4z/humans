import css from './measure.module.css'
import { Mono, Page, Section, Stack, useTokens } from '../kit'

const shell = [
  { token: '--sidebar-w', role: 'sidebar, fijo' },
  { token: '--sidebar-w-collapsed', role: 'sidebar contraído' },
  { token: '--topbar-h', role: 'topbar' },
  { token: '--shell-pad', role: 'padding lateral de toda pantalla' },
  { token: '--nav-item-h', role: 'item de nav' },
  { token: '--nav-item-gap', role: 'entre items de nav' },
  { token: '--nav-sub-indent', role: 'sangría de subitems' },
] as const

const radii = [
  { token: '--radius-xs', cls: css.radiusXs, role: 'lo más chico que se toca: una casilla, un radio. Sobre 18px el escalón siguiente ya se lee redondo' },
  { token: '--radius-sm', cls: css.radiusSm, role: 'marcas hundidas: un kbd, un badge' },
  { token: '--radius-md', cls: css.radiusMd, role: 'controles de 36 px, chips y tooltips' },
  { token: '--radius-lg', cls: css.radiusLg, role: 'controles de 40 y 44 px' },
  { token: '--radius-xl', cls: css.radiusXl, role: 'todo lo que es una superficie: una tarjeta, una fila, un panel flotante, un modal' },
  { token: '--radius-2xl', cls: css.radiusXxl, role: 'superficies amplias que requieren mayor redondeo' },
  { token: '--radius-full', cls: css.radiusFull, role: 'lo que es redondo de verdad: un avatar, un punto, un pulgar' },
] as const

/** Los diez pasos, con el rol que los justifica. El rol es lo que hay que leer. */
const spacing = [
  { px: 2, role: 'el pelo: el inset de una pista, el aire de un punto' },
  { px: 4, role: 'adentro de una marca: un badge, un kbd' },
  { px: 8, role: 'lo que separa dos cosas de la misma fila' },
  { px: 12, role: 'lo que separa dos filas, y el aire de un control chico' },
  { px: 16, role: 'el padding de una pieza chica, y la separación entre dos piezas' },
  { px: 20, role: 'el padding de una tarjeta' },
  { px: 24, role: 'el padding de un panel, y la separación entre dos bloques' },
  { px: 32, role: 'la separación entre dos secciones' },
  { px: 40, role: 'el aire de una pantalla' },
  { px: 48, role: 'el respiro de una portada' },
] as const

export function MeasureSection() {
  return (
    <Page
      title="Espaciado y medidas"
      kind="Fundamentos"
      lead="Una escala compartida de espaciados, radios y tamaños para mantener proporciones consistentes."
      >
        <Section title="Medidas del shell">
          <div className={`${css.shellList} bg-surface`}>
            {shell.map(m => <Measure key={m.token} {...m} />)}
          </div>
        </Section>

        <Section
          title="Alturas de control"
          note="Tres alturas y un rol cada una. La de 36 usa cuerpo (14) y radio 10; la de 40 mantiene cuerpo y sube a radio 12; la de 44 usa lectura (16) y radio 12. El peso de las acciones es 600. El espaciado compartido sale de los tokens `--space-*`, en pasos de 4 px."
        >
          <Stack>
            {[
              { h: 36, name: 'sm', role: 'inline en una fila densa' },
              { h: 40, name: 'md', role: 'acciones dentro de un panel' },
              { h: 44, name: 'lg', role: 'la acción principal' },
            ].map(c => (
              <div key={c.h} className={css.heightRow}>
                <span className={css.heightName}><Mono>{c.name}</Mono></span>
                <div className={css.heightBar} style={{ height: c.h, width: 132 }} />
                <span className="tabular"><Mono>{c.h}px</Mono></span>
                <span className={css.heightRole}>{c.role}</span>
              </div>
            ))}
          </Stack>
        </Section>

        <Section
          title="El espaciado: diez pasos"
          note="Usá los tokens `--space-*` para mantener un ritmo de 4 px. Reservá 2 px para detalles internos de los controles."
        >
          <div className={`${css.spaceList} bg-surface`}>
            {spacing.map(e => (
              <div key={e.px} className={css.spaceRow}>
                <span className={css.spaceName}><Mono>{e.px}</Mono></span>
                <span className={css.spaceBar} style={{ width: e.px }} />
                <span className={css.spaceRole}>{e.role}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Lo que la escala no manda"
          note="Las alturas de pieza. Un control de 36, una fila de tabla de 56, una marca de 44: esas salen de la escalera de controles y de lo que la pieza tiene que contener, no de la grilla del aire. Mezclarlas es lo que lleva a subir un padding para arreglar una altura."
        >
          <div className={css.freeGrid}>
            {[[36, 'control sm'], [40, 'control md'], [44, 'control lg'], [44, 'marca de lista'], [56, 'fila de tabla']].map(([px, role]) => (
              <div key={role as string} className={`${css.freeCard} bg-surface`}>
                <span className={css.freeBar} style={{ height: px as number }} />
                <span className={css.freeMeta}>
                  <Mono>{px}</Mono>
                  <span className={css.freeRole}>{role}</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

      <Section
        title="Radios"
        note="Cinco pasos y el círculo. **El radio sigue al alto**: 12 sobre un botón de 40 se lee como un remate, y sobre uno de 32, como una pastilla. Matar el `md` de 10 ('nadie ve dos píxeles') hizo más redondas dieciséis piezas de golpe. La otra regla: el radio de un hijo es el del padre menos su padding."
      >
        <Section title="La escala">
          <div className={`${css.radiusList} bg-surface`}>
            {radii.map(r => (
              <div key={r.token} className={css.radiusRow}>
                <span className={`${css.radiusSample} ${r.cls}`} />
                <span className={css.radiusName}><Mono>{r.token.replace('--radius-', '')}</Mono></span>
                <Value token={r.token} />
                <span className={css.radiusRole}>{r.role}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="La regla del anidado"
          note="Un contenedor de 24 con 8 de padding pide 16 adentro. Si el hijo repite el radio del padre, la curva se ve doble; si queda más cuadrado, se ven dos curvas distintas."
        >
          <div className={css.nestGrid}>
            <NestDemo child={css.radiusXl} label="24 − 8 = 16" verdict="bien" ok />
            <NestDemo child={css.radiusXxl} label="24 con hijo de 24" verdict="curva doble" />
            <NestDemo child={css.radiusSm} label="24 con hijo de 6" verdict="dos curvas distintas" />
          </div>
        </Section>
      </Section>
    </Page>
  )
}

function Measure({ token, role }: { token: string; role: string }) {
  const values = useTokens([token])
  const raw = values[token] ?? ''
  const px = Number.parseInt(raw, 10)
  return (
    <div className={css.measureRow}>
      <span className={css.measureName}><Mono>{token}</Mono></span>
      <span className={`${css.measureRaw} tabular`}><Mono>{raw || '-'}</Mono></span>
      <span className={css.measureBar} style={{ width: Math.min(Number.isNaN(px) ? 0 : px, 220) }} />
      <span className={css.measureRole}>{role}</span>
    </div>
  )
}

function Value({ token }: { token: string }) {
  const values = useTokens([token])
  return <span className={`${css.measureValue} tabular`}><Mono>{values[token] ?? ''}</Mono></span>
}

function NestDemo({ child, label, verdict, ok }: { child: string; label: string; verdict: string; ok?: boolean }) {
  return (
    <Stack gap="sm">
      <div className={css.nestParent}>
        <div className={`${css.nestedChild} ${child}`} />
      </div>
      <Mono>{label}</Mono>
      <span className={ok ? css.verdictGood : css.verdictBad}>{verdict}</span>
    </Stack>
  )
}
