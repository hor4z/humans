import s from './kit.module.css'
import { Children, createContext, isValidElement, useContext, useEffect, useState, type ReactElement, type ReactNode } from 'react'
import { Chip } from '@milo/ui/chip'
import { CopyButton } from '@milo/ui/copy-button'
import { Tabs } from '@milo/ui/tabs'
import { useClipboard } from '@milo/ui/lib/use-clipboard'
import type { LabelColor } from '@milo/ui/lib/colors'
import { toneIcon, toneInk, toneSurface, type Tone } from '@milo/ui/lib/tone'
import { Icon, type IconName } from '@milo/ui/icon'
import { cx } from '@milo/ui/lib/cx'
import { propsByComponent as packageProps } from '@milo/ui/props'
import { sitePropsByComponent } from './demo/props.gen'
import { highlight, type Lang, type Token, type TokenKind } from './highlight'

const propsByComponent = { ...packageProps, ...sitePropsByComponent }

export function useTokens(names: readonly string[]) {
  const [vals, setVals] = useState<Record<string, string>>({})
  const key = names.join('|')

  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      const next: Record<string, string> = {}
      for (const n of key.split('|')) next[n] = cs.getPropertyValue(n).trim()
      setVals(next)
    }
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [key])

  return vals
}

/** El texto del sitio: los backticks salen como código, `**` como énfasis y `[texto](destino)` como link. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((t, i) => {
        if (t.startsWith('`') && t.endsWith('`')) return <InlineCode key={i}>{t.slice(1, -1)}</InlineCode>
        if (t.startsWith('**') && t.endsWith('**')) return <strong key={i} className={s.inlineStrong}>{t.slice(2, -2)}</strong>
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(t)
        if (link) {
          const external = link[2].startsWith('http')
          return (
            <a
              key={i}
              href={link[2]}
              className={s.inlineLink}
              {...(external && { target: '_blank', rel: 'noreferrer' })}
            >
              {link[1]}
            </a>
          )
        }
        return t
      })}
    </>
  )
}

type PageProps = {
  /** El nombre de la pieza, tal como se importa. */
  title: string
  /** Una línea: qué es y cuándo se usa. */
  lead: string
  /** Lo que hay que escribir para traerla. */
  imports?: string
  /** Categoría, para ubicarla de un vistazo. */
  kind?: string
  children: ReactNode
}

/** Un color por grupo, el mismo que separa al riel: la categoría se reconoce antes de leerla. */
const kindColor: Record<string, LabelColor> = {
  Fundamentos: 'teal',
  Editor: 'purple',
  Acciones: 'blue',
  Formularios: 'green',
  'Navegación': 'orange',
  Datos: 'blue',
  Avisos: 'pink',
  Superficies: 'purple',
  Consigna: 'green',
  'Rúbrica': 'orange',
  Medios: 'pink',
  'Del sitio': 'teal',
}

const InPiece = createContext(false)
const SectionLevel = createContext<'h2' | 'h3'>('h2')

type Titled = ReactElement<{ title?: string; note?: string; children?: ReactNode }>

const isPart = (node: ReactNode, part: unknown): node is ReactElement<{ children?: ReactNode }> =>
  isValidElement(node) && node.type === part

const isSection = (node: ReactNode, title: string): node is Titled =>
  isValidElement(node) && node.type === Section && (node.props as { title?: string }).title === title

/** La cabecera de una pieza y el cuerpo de su página. Una pieza va en tres solapas: Resumen (el uso, la anatomía, las buenas prácticas y los ejemplos), Propiedades y Accesibilidad. Una página sin `Props` es de Fundamentos y va de corrido. */
export function Page({ title, lead, imports, kind, children }: PageProps) {
  const parts = Children.toArray(children)
  const propsSection = parts.find(c => isSection(c, 'Props'))
  const header = (
    <div className={s.pageTitleRow}>
      <h1 className={s.pageTitle}>{title}</h1>
      {kind && <Chip size="sm" color={kindColor[kind] ?? 'blue'}>{kind}</Chip>}
    </div>
  )

  if (!propsSection) {
    return (
      <article className={s.page}>
        <header className={s.pageHeader}>
          {header}
          <p className={s.pageLead}><Rich text={lead} /></p>
          {imports && <Code>{imports}</Code>}
        </header>
        {children}
      </article>
    )
  }

  const hero = parts.find(c => isPart(c, Hero))
  const anatomy = parts.find(c => isPart(c, Anatomy))
  const a11y = parts.find(c => isSection(c, 'Accesibilidad'))
  const practices = parts.find(c => isSection(c, 'Cómo se usa bien'))
  const claimed: ReactNode[] = [hero, anatomy, propsSection, a11y, practices]
  const examples = parts
    .filter(c => !claimed.includes(c))
    .flatMap(c => (isSection(c, 'Ejemplos') ? Children.toArray((c as Titled).props.children) : [c]))
  const inner = (section: ReactNode) => (section as Titled).props

  return (
    <article className={s.page}>
      <header className={s.pageHeaderPiece}>{header}</header>
      <InPiece.Provider value>
        <Tabs defaultValue="overview">
          <Tabs.List label={`Secciones de ${title}`}>
            <Tabs.Tab value="overview">Resumen</Tabs.Tab>
            <Tabs.Tab value="props">Propiedades</Tabs.Tab>
            {a11y && <Tabs.Tab value="a11y">Accesibilidad</Tabs.Tab>}
          </Tabs.List>

          <Tabs.Panel value="overview" keepMounted className={s.overview}>
            {hero}
            <section className={s.section}>
              <h2 className={s.sectionTitle}>Uso</h2>
              <p className={s.pageLead}><Rich text={lead} /></p>
              {imports && <Code>{imports}</Code>}
            </section>
            {anatomy && (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Anatomía</h2>
                {anatomy}
              </section>
            )}
            {practices && (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Buenas prácticas</h2>
                {inner(practices).children}
              </section>
            )}
            {examples.length > 0 && (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Ejemplos</h2>
                <SectionLevel.Provider value="h3">{examples}</SectionLevel.Provider>
              </section>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="props" keepMounted className={s.overview}>
            <section className={s.section}>
              <h2 className={s.sectionTitle}>Propiedades</h2>
              {inner(propsSection).children}
            </section>
          </Tabs.Panel>

          {a11y && (
            <Tabs.Panel value="a11y" keepMounted className={s.overview}>
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Accesibilidad</h2>
                {inner(a11y).children}
              </section>
            </Tabs.Panel>
          )}
        </Tabs>
      </InPiece.Provider>
    </article>
  )
}

/** El ejemplo que abre el Resumen: lo esencial de la pieza en un lienzo grande. Sin código, porque los ejemplos de más abajo lo llevan. */
export function Hero({ children }: { children: ReactNode }) {
  return <div className={s.hero}>{children}</div>
}

/** Las partes de la pieza, una por fila. */
function AnatomyRoot({ children }: { children: ReactNode }) {
  return (
    <table className={s.guide}>
      <thead>
        <tr><th scope="col" className={s.guideHeadName}>Elemento</th><th scope="col">Descripción</th></tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

/** Una parte de la pieza. `required` es la que no puede faltar. */
function AnatomyPart({ name, required, children }: { name: string; required?: boolean; children: ReactNode }) {
  return (
    <tr>
      <th scope="row" className={s.guideName}>{name}</th>
      <td>
        {required && <strong className={s.inlineStrong}>Obligatorio: </strong>}
        {Children.map(children, c => (typeof c === 'string' ? <Rich text={c} /> : c))}
      </td>
    </tr>
  )
}

export const Anatomy = Object.assign(AnatomyRoot, { Part: AnatomyPart })

/** Una línea de código que se puede copiar. */
export function Code({ children }: { children: string }) {
  const { copied, copy } = useClipboard()
  return (
    <button
      type="button"
      onClick={() => copy(children)}
      className={`${s.importBlock} group`}
    >
      <code className={s.importCode}>{paintLine(children)}</code>
      <Icon
        name={copied ? 'check' : 'content_copy'}
        size={14}
        className={`${s.importCopyIcon} icon-muted`}
      />
      <span className="sr-only">{copied ? 'Copiado' : 'Copiar'}</span>
    </button>
  )
}

const tokenClass: Record<TokenKind, string | undefined> = {
  keyword: s.codeKeyword,
  component: s.codeComponent,
  tag: s.codeTag,
  attr: s.codeAttr,
  string: s.codeString,
  number: s.codeNumber,
  fn: s.codeFn,
  param: s.codeParam,
  property: s.codeAttr,
  token: s.codeToken,
  brace: s.codeBrace,
  punct: s.codePunct,
  comment: s.codeComment,
  plain: undefined,
}

function Painted({ tokens }: { tokens: Token[] }) {
  return tokens.map((t, i) => <span key={i} className={tokenClass[t.kind]}>{t.text}</span>)
}

function paintLine(code: string, lang: Lang = 'tsx') {
  return <Painted tokens={highlight(code, lang).flat()} />
}

const looksLikeCode = /[=<>("'`{]|^\.\.\./

/** El código dentro de un texto. Un token de CSS, un componente y una función van en su tinta, lo que tiene forma de código se resalta, y una palabra sola queda en la tinta del texto. */
export function InlineCode({ children }: { children: string }) {
  const pair = /^([a-z][\w-]*)(=)("[^"]*")$/.exec(children)
  const body = pair ? <><span className={s.codeAttr}>{pair[1]}</span><span className={s.codePunct}>{pair[2]}</span><span className={s.codeString}>{pair[3]}</span></>
    : /^(?:aria|data)-[\w-]+$/.test(children) ? <span className={s.codeAttr}>{children}</span>
    : /^--[\w-]+$/.test(children) ? <span className={s.codeToken}>{children}</span>
    : /^(?:true|false|null|undefined|-?\d+(?:[.,]\d+)?)$/.test(children) ? <span className={s.codeNumber}>{children}</span>
    : /^[A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)*$/.test(children) ? <span className={s.codeComponent}>{children}</span>
    : /^[a-z][a-z0-9]*[A-Z][A-Za-z0-9]*$/.test(children) ? <span className={s.codeFn}>{children}</span>
    : looksLikeCode.test(children) ? paintLine(children, /^[a-z-]+:\s/.test(children) ? 'css' : 'tsx')
    : children
  return <code className={s.inlineCode}>{body}</code>
}

/** El código que arma lo que se ve. Lo dibujan `Demo` y `Variant` debajo de su pieza: si la pieza se ve bien y su código no, la API está mal. */
export function Example({ code, lang, className }: { code: string; lang?: Lang; className?: string }) {
  return (
    <div className={cx(s.codeBlock, 'group', className)}>
      <pre className={s.codePre}>
        <code>
          {highlight(code.trim(), lang).map((line, i) => (
            <span key={i} className={s.codeLine}><Painted tokens={line} /></span>
          ))}
        </code>
      </pre>
      <CopyButton value={code.trim()} label="Copiar el ejemplo" size="sm" className={s.codeCopy} />
    </div>
  )
}

/** Un bloque con título, una explicación y lo que se muestra. */
export function Section({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  const Heading = useContext(SectionLevel)
  return (
    <section className={s.section}>
      <Stack gap="sm">
        <Heading className={Heading === 'h2' ? s.sectionTitle : s.sectionSubtitle}><Rich text={title} /></Heading>
        {note && <p className={s.sectionNote}><Rich text={note} /></p>}
      </Stack>
      {children}
    </section>
  )
}

type CanvasProps = {
  children: ReactNode
  className?: string
  /** El aire de adentro. */
  pad?: boolean
  /** Centra lo que hay adentro, para una pieza que se mira sola. */
  center?: boolean
  /** Apila lo de adentro en columna, alineado a la izquierda y con aire entre medio. */
  stack?: boolean
}

/** El lienzo donde se apoya un ejemplo. */
export function Canvas({ children, className, pad = true, center, stack }: CanvasProps) {
  return (
    <div
      className={cx(
        `${s.canvas} bg-surface`,
        pad && s.canvasPad,
        center && s.canvasCenter,
        stack && s.canvasStack,
        className,
      )}
    >
      {children}
    </div>
  )
}

const clusterGaps = { xs: s.clusterXs, sm: s.clusterSm, md: s.clusterMd, lg: s.clusterLg, xl: s.clusterXl }
const clusterAligns = { stretch: '', start: s.clusterStart, center: s.clusterCenter, end: s.clusterEnd }

/** Una fila de piezas que envuelve al llegar al borde. Es `Variant` sin el nombre al costado. */
export function Cluster({ gap = 'md', align = 'stretch', children, className }: {
  /** El aire entre una pieza y la siguiente. */
  gap?: keyof typeof clusterGaps
  /** Cómo se apoyan entre sí las piezas de distinto alto. */
  align?: keyof typeof clusterAligns
  children: ReactNode
  className?: string
}) {
  return <div className={cx(s.cluster, clusterGaps[gap], clusterAligns[align], className)}>{children}</div>
}

const frameWidths = { xs: s.frameXs, sm: s.frameSm, md: s.frameMd, lg: s.frameLg, xl: s.frameXl }
const stackAligns = { stretch: '', start: s.stackStart, center: s.stackCenter }

/** Una columna con aire entre cada cosa. Es `Cluster` de arriba abajo, y comparte su escala de gap. */
export function Stack({ gap = 'md', align = 'stretch', width, children, className }: {
  /** El aire entre una cosa y la siguiente. */
  gap?: keyof typeof clusterGaps
  /** Cómo se alinean entre sí las cosas de distinto ancho. */
  align?: keyof typeof stackAligns
  /** Un tope de ancho, de la misma escala que `Frame`. */
  width?: keyof typeof frameWidths
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cx(s.stack, clusterGaps[gap], stackAligns[align], width && s.frame, width && frameWidths[width], className)}>
      {children}
    </div>
  )
}

/** Le pone un tope de ancho a la pieza y la estira hasta ahí, para que no se lea a lo ancho del lienzo. Estira solo si adentro hay una sola cosa: con varias, cada una se mide sola. */
export function Frame({ width = 'sm', children, className }: {
  /** 280, 320, 420, 520 o 680. */
  width?: keyof typeof frameWidths
  children: ReactNode
  className?: string
}) {
  return <div className={cx(s.frame, frameWidths[width], className)}>{children}</div>
}

/** La aclaración que va debajo de la demo. La de arriba es la `note` de `Section`. */
export function Footnote({ children }: { children: ReactNode }) {
  return (
    <p className={s.footnote}>
      {Children.map(children, c => (typeof c === 'string' ? <Rich text={c} /> : c))}
    </p>
  )
}

type ExampleCardProps = {
  title?: string
  /** Qué es y cuándo va. Sin esto la tarjeta muestra solo el código. */
  description?: string
  /** El código que dibuja lo de adentro, con los mismos props y el mismo contenido. */
  code: string
  /** Cómo se lee el código: `tsx` para un ejemplo de uso, `css` para tokens, `sh` para un comando. */
  lang?: Lang
  width?: keyof typeof frameWidths
  fill?: boolean
  mono?: boolean
  className?: string
  children: ReactNode
}

/** Un ejemplo: la pieza en su lienzo y, debajo, su descripción y el código que la dibuja en dos solapas. */
function ExampleCard({ title, description, code, lang, width, fill, mono, className, children }: ExampleCardProps) {
  return (
    <figure className={s.example}>
      {title && (
        <figcaption className={cx(s.exampleTitle, mono && s.exampleTitleMono)}>
          <Rich text={title} />
        </figcaption>
      )}
      <Canvas className={cx(s.demoCanvas, fill && s.demoFill, className)}>
        {width ? <Frame width={width}>{children}</Frame> : children}
      </Canvas>
      {description ? (
        <Tabs defaultValue="description" className={s.exampleTabs}>
          <Tabs.List label={`Detalle de ${title ?? 'el ejemplo'}`}>
            <Tabs.Tab value="description">Descripción</Tabs.Tab>
            <Tabs.Tab value="code">Código</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="description" keepMounted className={s.exampleDescription}>
            <p><Rich text={description} /></p>
          </Tabs.Panel>
          <Tabs.Panel value="code" keepMounted className={s.exampleCode}>
            <Example code={code} lang={lang} />
          </Tabs.Panel>
        </Tabs>
      ) : (
        <Example code={code} lang={lang} className={s.exampleCodeOnly} />
      )}
    </figure>
  )
}

/** Un ejemplo con su código. */
export function Demo({ label, code, lang, width, fill, children, className }: Omit<ExampleCardProps, 'title' | 'description' | 'mono'> & {
  label?: string
}) {
  return <ExampleCard title={label} code={code} lang={lang} width={width} fill={fill} className={className}>{children}</ExampleCard>
}

/** Varios ejemplos en grilla: se acomodan solos, o en la cantidad de columnas que le pidas. */
export function Grid({ children, min = 320, cols }: {
  children: ReactNode
  /** El ancho mínimo de cada columna, cuando la cantidad la decide el espacio. */
  min?: number
  /** Cuántas columnas, cuando la cantidad es parte de lo que se muestra. */
  cols?: number
}) {
  return (
    <div
      className={s.demoGrid}
      style={{ gridTemplateColumns: cols ? `repeat(${cols}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${min}px, 1fr))` }}
    >
      {children}
    </div>
  )
}

/** Una variante con su nombre, lo que significa y el código que la dibuja. */
export function Variant({ name, note, code, lang, children }: {
  name: string
  /** Qué significa esta variante y cuándo va. */
  note?: string
  /** El código que dibuja lo de adentro, con los mismos props y el mismo contenido. */
  code: string
  /** Cómo se lee el código, como en `Demo`. */
  lang?: Lang
  children: ReactNode
}) {
  return <ExampleCard title={name} description={note} code={code} lang={lang} mono>{children}</ExampleCard>
}

/** Una fila de Fundamentos: como `Variant`, pero sin código, porque lo que muestra es una regla y no una pieza. */
export function Specimen({ name, note, children }: {
  name: string
  /** Qué dice esta fila, al lado. */
  note?: string
  children: ReactNode
}) {
  return (
    <div className={s.variant}>
      <code className={s.variantName}>{name}</code>
      <div className={s.variantItems}>{children}</div>
      {note && <p className={s.variantNote}><Rich text={note} /></p>}
    </div>
  )
}

/** El contenedor de una lista de variantes. */
export function Panel({ children }: { children: ReactNode }) {
  const inPiece = useContext(InPiece)
  return inPiece ? <div className={s.exampleList}>{children}</div> : <Canvas className={s.panelCanvas}>{children}</Canvas>
}

/** Un valor o una llamada en la fuente del código. Si es una llamada o un JSX, se resalta. */
export function Mono({ children }: { children: ReactNode }) {
  const body = typeof children === 'string' && /[(<]/.test(children) ? paintLine(children) : children
  return <code className={s.monoValue}>{body}</code>
}

/** La tabla de props. Las filas salen del código: tipo, default y descripción los escribe la pieza en su docblock y los extrae `scripts/props.mjs`. */
export function Props({ of }: { of: string | readonly string[] }) {
  const pedidos = typeof of === 'string' ? [of] : of
  const names = [...new Set(pedidos.flatMap(pieza => [
    pieza,
    ...Object.keys(propsByComponent).filter(k => k.startsWith(`${pieza}.`)),
  ]))]
  return (
    <Stack gap="lg">
      {names.map(pieza => {
        const info = propsByComponent[pieza]
        const rows = info?.props ?? []
        return (
          <div key={pieza} className={s.propsTable}>
            {names.length > 1 && (
              <div className={s.propsHeader}>
                <code className={s.propsName}>{pieza}</code>
                {info?.doc && <span className={s.propsDoc}><Rich text={info.doc} /></span>}
              </div>
            )}
            {rows.length === 0 ? (
              <p className={s.propsEmpty}>
                No tiene props propias: toma los atributos de un{' '}
                <code className={s.propsEmptyTag}>{paintLine(`<${info?.html ?? 'div'}>`)}</code>.
              </p>
            ) : (
            <table className={s.table}>
              <thead>
                <tr className={s.headRow}>
                  <th scope="col" className={s.headCellName}>Prop</th>
                  <th scope="col" className={s.headCellType}>Tipo</th>
                  <th scope="col" className={s.headCellDefault}>Default</th>
                  <th scope="col" className={s.headCellDoc}>Qué hace</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.name} className={s.row}>
                    <td className={s.cellName}>
                      <span className={s.propNameGroup}>
                        <code className={s.propName}>{r.name}</code>
                        {r.required && (
                          <span className={s.propRequired}>obligatorio</span>
                        )}
                      </span>
                    </td>
                    <td className={s.cellType}><code className={s.propType}>{paintLine(r.type)}</code></td>
                    <td className={s.cellDefault}>
                      <code className={s.propDefault}>{r.def ? paintLine(r.def) : '-'}</code>
                    </td>
                    <td className={s.cellDoc}>
                      {r.doc ? <Rich text={r.doc} /> : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
            {rows.length > 0 && info?.html && (
              <p className={s.propsHtmlNote}>
                Y los atributos de un{' '}
                <code className={s.propsHtmlTag}>{paintLine(`<${info.html}>`)}</code>.
              </p>
            )}
          </div>
        )
      })}
    </Stack>
  )
}

export function Note({ tone, icon, title, children }: {
  /** Sin esto la nota es papel blanco y el glifo gris, que es lo que va para una aclaración. `warn` para lo que se puede romper, `ok` para lo que ya está resuelto. */
  tone?: Tone
  icon?: IconName
  title?: string
  children: ReactNode
}) {
  const glifo = icon ?? (tone ? toneIcon[tone] : 'lightbulb')
  return (
    <div className={cx(s.note, tone && toneSurface[tone])}>
      <Icon name={glifo} size={18} className={cx(s.noteIcon, tone ? toneInk[tone] : s.noteGlyph)} />
      <div className={s.noteBody}>
        {title && <p className={s.noteTitle}><Rich text={title} /></p>}
        <div className={s.noteText}>
          {Children.map(children, c => (typeof c === 'string' ? <Rich text={c} /> : c))}
        </div>
      </div>
    </div>
  )
}

/** Lo que la pieza hace por accesibilidad, en una lista corta. */
function A11yRoot({ children }: { children: ReactNode }) {
  return <ul className={s.a11yList}>{children}</ul>
}

/** Una cosa que la pieza resuelve sola en accesibilidad. */
function A11yItem({ children }: { children: ReactNode }) {
  return (
    <li className={s.a11yItem}>
      <Icon name="check" size={16} className={s.a11yCheck} />
      <span className={s.a11yText}>
        {Children.map(children, c => (typeof c === 'string' ? <Rich text={c} /> : c))}
      </span>
    </li>
  )
}

/** Lo que la pieza resuelve sola, al cierre de cada vista. */
export const A11y = Object.assign(A11yRoot, { Item: A11yItem })

function PracticesRoot({ children }: { children: ReactNode }) {
  return <ul className={s.practices}>{children}</ul>
}

function Practice({ children }: { children: ReactNode }) {
  return (
    <li className={s.practice}>
      {Children.map(children, c => (typeof c === 'string' ? <Rich text={c} /> : c))}
    </li>
  )
}

/** Lo que conviene hacer. Una línea, concreta, con la pieza adentro. */
function Do({ children }: { children: ReactNode }) {
  return <Practice>{children}</Practice>
}

/** Lo que no, y por qué. Sin el porqué es una orden y no una guía. */
function Dont({ children }: { children: ReactNode }) {
  return <Practice>{children}</Practice>
}

/** Cómo se usa bien esta pieza, con el porqué. Es también lo que un agente necesita para no equivocarse con ella. */
export const Practices = Object.assign(PracticesRoot, { Do, Dont })

export function Swatch({ token, note }: { token: string; note?: string }) {
  const vals = useTokens([token])
  const v = vals[token]
  return (
    <div className={s.swatch}>
      <span
        className={s.swatchChip}
        style={{ background: v ? `var(${token})` : undefined }}
      />
      <div className={s.swatchMeta}>
        <code className={s.swatchToken}>{token}</code>
        <code className={s.swatchValue}>{v || '-'}</code>
        {note && <span className={s.swatchNote}>{note}</span>}
      </div>
    </div>
  )
}

export function Ramp({ tokens }: { tokens: readonly string[] }) {
  const vals = useTokens(tokens)
  return (
    <div className={s.ramp}>
      <div className={s.rampBar}>
        {tokens.map(t => (
          <div key={t} className={s.rampStep} style={{ background: `var(${t})` }} />
        ))}
      </div>
      <div className={s.rampLabels}>
        {tokens.map(t => (
          <div key={t} className={s.rampLabel}>
            <code className={s.rampToken}>{t.replace('--', '')}</code>
            <code className={s.rampValue}>{vals[t]}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
