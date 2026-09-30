import cls from './settings-modal.module.css'
import { useId, useState } from 'react'
import { cx } from '@milo/ui/lib/cx'
import { Callout } from '@milo/ui/callout'
import { Button } from '@milo/ui/button'
import { Chip } from '@milo/ui/chip'
import { Row } from '@milo/ui/row'
import { Segmented } from '@milo/ui/segmented'
import { Select } from '@milo/ui/select'
import { Switch } from '@milo/ui/switch'
import { Icon, type IconName } from '@milo/ui/icon'
import { Modal } from '@milo/ui/modal'
import { usePrefs } from '../prefs/prefs'

type SectionId = 'general' | 'perfil' | 'seguridad' | 'avisos'

/** Quién está mirando los ajustes. */
export type SettingsUser = {
  name: string
  email: string
  /** Cómo lo ven los aprendices. */
  alias: string
  school: string
}

const sections: { id: SectionId; label: string; icon: IconName }[] = [
  { id: 'general', label: 'General', icon: 'tune' },
  { id: 'perfil', label: 'Perfil', icon: 'person' },
  { id: 'seguridad', label: 'Seguridad', icon: 'verified_user' },
  { id: 'avisos', label: 'Avisos', icon: 'notifications' },
]

/** Los ajustes en un modal y no en una página. */
export function SettingsModal({ open, onOpenChange, user }: {
  /** Cerrado no monta nada. */
  open: boolean
  /** Al cerrar no hay navegación: seguís donde estabas. */
  onOpenChange: (open: boolean) => void
  /** Quién está mirando los ajustes. */
  user: SettingsUser
}) {
  const [section, setSection] = useState<SectionId>('general')

  return (
    <Modal open={open} onOpenChange={onOpenChange} size="md">
      <Modal.Header>
        <Modal.Title>Ajustes</Modal.Title>
      </Modal.Header>
      <div className={cls.root}>
        <nav className={cls.rail}>
          {sections.map(s => {
            const current = s.id === section
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                aria-current={current ? 'page' : undefined}
                className={cx(
                  cls.railItem,
                  cls.railItemMotion,
                  current
                    ? cls.railItemCurrent
                    : cls.railItemPlain,
                )}
              >
                <span className={cls.railGlyph}>
                  <Icon name={s.icon} size={20} />
                </span>
                {s.label}
              </button>
            )
          })}
        </nav>

        <div className={cls.panel}>
          <header className={cls.panelHeader}>
            <h2 className={cls.panelTitle}>{sections.find(s => s.id === section)!.label}</h2>
          </header>
          <div className={cls.panelBody}>
            {section === 'general' && <GeneralSection user={user} />}
            {section === 'perfil' && <ProfileSection user={user} />}
            {section === 'seguridad' && <SecuritySection />}
            {section === 'avisos' && <NoticesSection />}
          </div>
        </div>
      </div>
    </Modal>
  )
}

function GeneralSection({ user }: { user: SettingsUser }) {
  const { prefs, set } = usePrefs()
  const [language, setLanguage] = useState('Español (AR)')
  return (
    <div>
      <EditableRow label="Nombre" value={user.name} />
      <Row>
        <Row.Label>Correo</Row.Label>
        <span className={cls.accountEmail}>{user.email}</span>
      </Row>
      <Row>
        <Row.Label>Tema</Row.Label>
        <Segmented
          size="sm"
          value={prefs.theme}
          onValueChange={v => set('theme', v)}
          options={[{ value: 'light', label: 'Claro' }, { value: 'dark', label: 'Oscuro' }]}
        />
      </Row>
      <Row>
        <Row.Label>Sugerir consignas mientras escribo</Row.Label>
        <Row.Hint>Aparecen abajo del cursor y se aceptan con Tab.</Row.Hint>
        <Switch checked={prefs.suggest} onCheckedChange={v => set('suggest', v)} label="Sugerir consignas" />
      </Row>
      <Row>
        <Row.Label>Abrir la última actividad al entrar</Row.Label>
        <Switch checked={prefs.resume} onCheckedChange={v => set('resume', v)} label="Abrir la última actividad" />
      </Row>
      <Row>
        <Row.Label>Mostrar el método en las tarjetas</Row.Label>
        <Switch checked={prefs.showLens} onCheckedChange={v => set('showLens', v)} label="Mostrar el método" />
      </Row>
      <Row>
        <Row.Label>Idioma</Row.Label>
        <Select width={148} value={language} onValueChange={setLanguage} options={['Español (AR)', 'Español', 'Português', 'English']} />
      </Row>
    </div>
  )
}

function ProfileSection({ user }: { user: SettingsUser }) {
  const { prefs, set } = usePrefs()
  return (
    <div>
      <EditableRow label="Cómo te ven los aprendices" value={user.alias} />
      <Row>
        <Row.Label>Rol</Row.Label>
        <Row.Hint>Lo define quien coordina el espacio.</Row.Hint>
        <Chip color="green">Guía</Chip>
      </Row>
      <Row>
        <Row.Label>Escuela</Row.Label>
        <span className={cls.schoolName}>{user.school}</span>
      </Row>
      <Row>
        <Row.Label>Dejar que otros guías vean mis recetas</Row.Label>
        <Row.Hint>Solo las que publiques, nunca los borradores.</Row.Hint>
        <Switch checked={prefs.shareRecipes} onCheckedChange={v => set('shareRecipes', v)} label="Compartir recetas" />
      </Row>
      <Row>
        <Row.Label>Aparecer en el directorio de la escuela</Row.Label>
        <Switch checked={prefs.directory} onCheckedChange={v => set('directory', v)} label="Aparecer en el directorio" />
      </Row>
    </div>
  )
}

function SecuritySection() {
  const { prefs, set } = usePrefs()
  return (
    <div>
      <Row>
        <Row.Label>Ingreso</Row.Label>
        <Row.Hint>Se entra con Google y con nada más.</Row.Hint>
        <Chip color="blue">Google</Chip>
      </Row>
      <Row>
        <Row.Label>Sesiones abiertas</Row.Label>
        <Row.Hint>Chrome en Linux · Safari en iPhone</Row.Hint>
        <Button size="sm">Cerrar las otras</Button>
      </Row>
      <Row>
        <Row.Label>Preguntar antes de borrar una actividad</Row.Label>
        <Row.Hint>Con entregas adentro siempre pregunta; esto es para las vacías.</Row.Hint>
        <Switch checked={prefs.confirmDelete} onCheckedChange={v => set('confirmDelete', v)} label="Preguntar antes de borrar" />
      </Row>
      <Row>
        <Row.Label>Registro de accesos</Row.Label>
        <Button size="sm" variant="ghost" iconEnd={<Icon name="download" />}>Descargar</Button>
      </Row>
      <div className={cls.dangerZone}>
        <Callout tone="bad" size="sm" role="group" aria-label="Borrar la cuenta">
          <Callout.Title>Borrar la cuenta</Callout.Title>
          Se van los espacios que coordinás y las actividades que escribiste. Las entregas de los
          aprendices quedan con su autor, no con vos.
          <Callout.Actions>
            <Button size="sm" variant="bad">Borrar la cuenta</Button>
          </Callout.Actions>
        </Callout>
      </div>
    </div>
  )
}

function NoticesSection() {
  const { prefs, set } = usePrefs()
  const [channel, setChannel] = useState('Correo')
  return (
    <div>
      <Row>
        <Row.Label>Cuando entra una entrega</Row.Label>
        <Switch checked={prefs.notifySubmission} onCheckedChange={v => set('notifySubmission', v)} label="Avisar entregas" />
      </Row>
      <Row>
        <Row.Label>Cuando un aprendiz queda trabado</Row.Label>
        <Row.Hint>Dos intentos sin avanzar en la misma fase.</Row.Hint>
        <Switch checked={prefs.notifyStuck} onCheckedChange={v => set('notifyStuck', v)} label="Avisar trabas" />
      </Row>
      <Row>
        <Row.Label>Resumen de la semana</Row.Label>
        <Row.Hint>Los domingos, con lo que pasó en cada espacio.</Row.Hint>
        <Switch checked={prefs.notifyWeekly} onCheckedChange={v => set('notifyWeekly', v)} label="Resumen semanal" />
      </Row>
      <Row>
        <Row.Label>Novedades del producto</Row.Label>
        <Switch checked={prefs.notifyProduct} onCheckedChange={v => set('notifyProduct', v)} label="Novedades" />
      </Row>
      <Row>
        <Row.Label>Por dónde</Row.Label>
        <Select width={148} value={channel} onValueChange={setChannel} options={['Correo', 'Solo en la app', 'Correo y app']} />
      </Row>
    </div>
  )
}

/** El campo editable inline: se ve como texto hasta que lo tocás. */
function EditableRow({ label, value: initial }: { label: string; value: string }) {
  const inputId = useId()
  const [value, setValue] = useState(initial)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initial)

  const commit = () => { setValue(draft.trim() || value); setEditing(false) }

  return (
    <div className={`${cls.row} group`}>
      <div className={cls.rowLabel}>{label}</div>
      {editing ? (
        <input
          id={inputId}
          aria-label={label}
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') { setDraft(value); setEditing(false) }
          }}
          className={`${cls.rowInput} inset-relief`}
        />
      ) : (
        <button
          type="button"
          onClick={() => { setDraft(value); setEditing(true) }}
          className={cls.rowEdit}
        >
          {value}
          <Icon name="edit" size={16} className={`${cls.rowEditIcon} icon-muted`} />
        </button>
      )}
    </div>
  )
}
