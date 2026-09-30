import css from './relief.module.css'
import { Note, Page, Section, Stack } from '../kit'

const recipes = [
  {
    cls: 'inset-relief',
    back: css.plateInset,
    token: '--relief-inset',
    role: 'lo hundido que no es una marca',
    detail: 'canto arriba y nada más: no tiene tono propio ni cae hacia afuera',
    used: 'Kbd · Nav · EmptyState · SettingsModal',
  },
  {
    cls: 'mark',
    back: css.plateMark,
    token: '--relief-mark',
    role: 'una marca de fila o la inicial de un avatar',
    detail: 'contorno interior tenue en el tono de la marca, sin degradado ni sombra exterior',
    used: 'Avatar · Chip · List',
  },
] as const

const layers = [
  { token: '--relief-card', role: 'una tarjeta apoyada', used: 'Card · List' },
  { token: '--relief-toolbar', role: 'una barra flotante', used: 'Toolbar · Card · List' },
  { token: '--relief-popover', role: 'lo que flota sobre todo', used: 'trece piezas, de Tooltip a Modal' },
] as const

export function ReliefSection() {
  return (
    <Page
      title="Relieve"
      kind="Fundamentos"
      lead="Bordes discretos y sombras cortas separan las superficies. Reservá las sombras para elementos flotantes."
    >
      <Section title="Las recetas que se tocan">
        <div className={css.recipeGrid}>
          {recipes.map(r => (
            <div key={r.token} className={`${css.recipeCard} bg-surface`}>
              <div className={`${r.cls} ${r.back} ${css.recipeSample}`}>
                {r.role}
              </div>
              <Stack gap="xs">
                <code className={css.recipeToken}>{r.token}</code>
                <span className={css.recipeDetail}>{r.detail}</span>
                <span className={css.used}>{r.used}</span>
              </Stack>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="La elevación en capas"
        note="Alpha bajo y spread negativo. Cuanto más alto flota algo, más difusa y más lejos cae su sombra."
      >
        <div className={css.layerGrid}>
          {layers.map(c => (
            <div key={c.token} className={css.layerCard}>
              <div className={`${css.layerBox} bg-surface`} style={{ boxShadow: `var(${c.token})` }} />
              <div className={css.layerMeta}>
                <code className={css.layerToken}>{c.token}</code>
                <span className={css.layerRole}>{c.role}</span>
                <span className={css.used}>{c.used}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Dos cosas que costaron"
        note="La separación depende del contexto, no de agregar más sombra."
      >
        <div className={css.lessonGrid}>
          <div className={`${css.edgeCard} bg-surface`}>
            <span className={css.edgeTitle}>Un borde antes que una sombra</span>
            <p className={css.edgeText}>
              <code className={css.tokenName}>--border</code> separa las superficies con una línea discreta.
              La sombra acompaña a los paneles elevados; los controles se reconocen por su forma,
              su relleno y su estado.
            </p>
          </div>
          <div className={`${css.sunkenCard} bg-surface`}>
            <span className={css.sunkenTitle}>Hundido son dos cosas distintas</span>
            <p className={css.sunkenText}>
              Una marca usa un contorno en su propio tono. Una tecla usa un borde neutro y una
              sombra interior suave. El color identifica a la primera y el relieve distingue
              a la segunda sin competir con el contenido.
            </p>
          </div>
        </div>
      </Section>


      <Note title="Un campo no lleva relieve">
        El relieve dice "esto sobresale" o "esto se aprieta", y un campo no es ninguna de las dos: es un
        lugar donde apoyar texto. Los cuatro campos del sistema se dibujan con un fondo y una línea, y
        al enfocarse se les tiñe el borde que ya tenían.
      </Note>
    </Page>
  )
}
