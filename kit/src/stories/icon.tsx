import cls from './icon.module.css'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { EmptyState } from '@milo/ui/empty-state'
import { Icon, type IconName, type IconWeight } from '@milo/ui/icon'
import { iconNames } from '@milo/ui/icons'
import { fold } from '@milo/ui/lib/cx'
import { Segmented } from '@milo/ui/segmented'
import { Slider } from '@milo/ui/slider'
import { TextField } from '@milo/ui/text-field'
import { iconTags } from '@milo/ui/icons.meta'
import { A11y, Anatomy, Cluster, Demo, Footnote, Hero, Mono, Page, Panel, Practices, Props, Section, Variant } from '../kit'

const sizes = [
  { px: 12, role: 'un badge, la cruz de un chip' },
  { px: 14, role: 'la marca de un Select, un tilde' },
  { px: 16, role: 'adentro de un control chico' },
  { px: 18, role: 'detalles de densidad intermedia' },
  { px: 20, role: 'el default: la interfaz' },
  { px: 22, role: 'el glifo de una marca de lista' },
  { px: 24, role: 'adentro de un control de 44' },
] as const

const weights = [
  { value: '300', label: '300' }, { value: '400', label: '400' },
  { value: '500', label: '500' }, { value: '700', label: '700' },
] as const

export function IconStory() {
  const [q, setQ] = useState('')
  const [size, setSize] = useState(24)
  const [weight, setWeight] = useState<'300' | '400' | '500' | '700'>('400')
  const [copied, setCopied] = useState<string | null>(null)

  const visible = useMemo(() => {
    const n = fold(q.trim())
    if (!n) return iconNames
    return iconNames.filter(k => fold(k).includes(n) || fold(iconTags[k] ?? '').includes(n))
  }, [q])

  const copy = (name: IconName) => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`)
    setCopied(name)
    setTimeout(() => setCopied(c => (c === name ? null : c)), 1200)
  }

  return (
    <Page
      title="Icon"
      kind="Fundamentos"
      imports="import { Icon } from '@milo/ui/icon'"
      lead="Iconos de Material Symbols Rounded, alojados localmente y con peso base 400."
    >
      <Hero>
        <Icon name="search" size={28} />
        <Icon name="calendar_month" size={28} />
        <Icon name="notifications" size={28} />
        <Icon name="favorite" size={28} />
        <Icon name="search" size={28} className="icon-muted" />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Glifo" required>El símbolo de la fuente, elegido con `name` del manifiesto. Peso y relleno son ejes reales de la fuente: el peso va de 100 a 700 y es continuo, el relleno está clavado en 0.</Anatomy.Part>
        <Anatomy.Part name="Caja">El cuadrado de `size` px, 20 si nadie lo manda. El gris se hereda del ancestro con `icon-muted`.</Anatomy.Part>
        <Anatomy.Part name="Carpeta">`Icon.Folder`: la carpeta de color de un espacio, que se reconoce de reojo en una lista de siete.</Anatomy.Part>
      </Anatomy>

      <Section
        title={`El set · ${iconNames.length} iconos`}
        note="Buscá por nombre o por lo que el icono es. Los tags son los de Google y están en inglés: 'calendar' encuentra `calendar_month`, 'calendario' no encuentra nada."
      >
        <Demo fill code={`<div style={{ '--icon-wght': weight }}>
  {visible.map(name => <Icon key={name} name={name} size={size} />)}
</div>`}>
          <div>
          <Cluster gap="lg" align="center">
            <span className={cls.searchSlot}>
              <TextField icon="search" value={q} onValueChange={setQ} aria-label="Buscar iconos" placeholder="Buscar por nombre o etiqueta" />
            </span>
            <Segmented
              label="Peso del glifo"
              value={weight}
              onValueChange={setWeight}
              options={weights.map(p => ({ value: p.value, label: p.label }))}
              size="sm"
            />
            <span className={cls.sizeSlot}>
              <Slider value={size} onValueChange={setSize} min={12} max={40} label="Tamaño" />
              <Mono>{size}</Mono>
            </span>
          </Cluster>

          {visible.length === 0 ? (
            <div className={cls.emptySlot}>
              <EmptyState size="sm" icon="search_off">
                <EmptyState.Title>Ningún icono con eso</EmptyState.Title>
                <EmptyState.Body>{`Los tags son los de Google y están en inglés. Si no está en el set, buscalo en el catálogo completo: npm run icons -- search ${q.trim() || '…'}`}</EmptyState.Body>
              </EmptyState>
            </div>
          ) : (
            <div
              className={cls.iconGrid}
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
                '--icon-wght': weight,
              } as CSSProperties}
            >
              {visible.map(name => (
                <button
                  key={name}
                  type="button"
                  onClick={() => copy(name)}
                  title={iconTags[name] || name}
                  className={`${cls.iconTile} bg-surface`}
                >
                  <span className={cls.glyphSlot} style={{ height: 40 }}>
                    <Icon name={name} size={size} />
                  </span>
                  <span className={cls.glyphName}>
                    {copied === name ? 'copiado' : name}
                  </span>
                </button>
              ))}
            </div>
          )}
          </div>
        </Demo>
        <Footnote>
          Click en un icono copia <Mono>{'<Icon name="…" />'}</Mono>. El `title` trae los tags con los
          que se puede buscar.
        </Footnote>
      </Section>

      <Section title="Peso, tamaño y gris">
        <Panel>
          <Variant
            name="Peso"
            note="El eje va de 100 a 700."
            code={`{[100, 200, 300, 400, 500, 600, 700].map(weight => (
  <Icon key={weight} name="notifications" size={28} weight={weight} />
))}`}
          >
            {([100, 200, 300, 400, 500, 600, 700] as IconWeight[]).map(w => (
              <span key={w} className={cls.weightSample}>
                <Icon name="notifications" size={28} weight={w} />
                <Mono>{w}</Mono>
              </span>
            ))}
          </Variant>
          <Variant
            name="Tamaño"
            note="Siete pasos, todos pares: con una fuente, un tamaño impar cae en media grilla de píxeles y el glifo se ve borroso."
            code={`{[12, 14, 16, 18, 20, 22, 24].map(px => (
  <Icon key={px} name="calendar_month" size={px} />
))}`}
          >
            {sizes.map(e => (
              <span key={e.px} className={cls.weightSample}>
                <Icon name="calendar_month" size={e.px} />
                <Mono>{e.px}</Mono>
              </span>
            ))}
          </Variant>
          <Variant
            name="Gris"
            note="El peso base es 400, tanto en tinta como en gris. `icon-muted` ajusta el color sin cambiar el trazo ni mover el glifo entre estados."
            code={`<Icon name="search" size={20} />
<Icon name="search" size={20} className="icon-muted" />
<Icon name="search" size={20} className={styles.gray} />`}
          >
            <Icon name="search" size={20} />
            <Icon name="search" size={20} className="icon-muted" />
            <Icon name="search" size={20} className={cls.plainGrayIcon} />
          </Variant>
        </Panel>
      </Section>

      <Section title="Cómo se agrega uno">
        <Demo
          label="Un comando, no un path"
          lang="sh"
          code={`npm run icons -- search notification
npm run icons -- add rocket_launch
npm run icons -- check`}
        >
          <Mono>npm run icons -- add rocket_launch</Mono>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Icon" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El gris se hereda del ancestro con `icon-muted`, no se pasa por prop.</Practices.Do>
          <Practices.Do>Usá 16, 20 y 24 px en controles `sm`, `md` y `lg`. Reservá 12 y 14 px para marcas secundarias.</Practices.Do>
          <Practices.Dont>Buscá con `npm run icons -- search`, agregá con `add` y verificá con `check`. Evitá duplicar iconos o dibujar variantes a mano.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Los glifos van `aria-hidden`: un icono es una imagen del texto que tiene al lado, no una segunda lectura.</A11y.Item>
          <A11y.Item>Un icono sin texto vive dentro de un `IconButton`, que exige su `label`.</A11y.Item>
          <A11y.Item>El glifo lleva `translate="no"`: es texto, y un traductor automático puede reescribirlo.</A11y.Item>
          <A11y.Item>Si alguien desactiva las fuentes de la página (Firefox lo permite, y hay quien lo usa por dislexia o baja visión), los iconos quedan en cuadraditos. Es el precio de que el peso sea un eje real y está dicho, no escondido.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
