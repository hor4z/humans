import cls from './intro.module.css'
import { useState } from 'react'
import { Avatar } from '@milo/ui/avatar'
import { Button } from '@milo/ui/button'
import { Chip } from '@milo/ui/chip'
import { Icon, type IconName } from '@milo/ui/icon'
import { Progress } from '@milo/ui/progress'
import { Switch } from '@milo/ui/switch'
import { TextField } from '@milo/ui/text-field'
import { face } from './fixtures'

const paths: { id: string; icon: IconName; title: string; body: string; number: string }[] = [
  { id: 'color', icon: 'palette', title: 'Una base compartida', body: 'Color, tipografía y espaciado. Las decisiones que conectan toda la interfaz.', number: '01' },
  { id: 'button', icon: 'touch_app', title: 'Piezas para construir', body: 'Controles, estados y código de uso. Del primer botón al flujo completo.', number: '02' },
  { id: 'accessibility', icon: 'accessibility', title: 'Accesible desde el inicio', body: 'Foco visible, navegación por teclado y nombres que se entienden.', number: '03' },
]

export function Intro({ go }: { go: (id: string) => void }) {
  const [title, setTitle] = useState('Fracciones equivalentes')
  const [notices, setNotices] = useState(true)
  const [published, setPublished] = useState(false)
  const reset = () => { setTitle('Fracciones equivalentes'); setNotices(true); setPublished(false) }

  return (
    <div className={cls.intro}>
      <section className={cls.hero} aria-labelledby="intro-title">
        <div className={cls.heroContent}>
          <span className={cls.eyebrow}><span className={cls.brandDot} /> DISEÑAR CON MILO</span>
          <h1 id="intro-title" className={cls.heroTitle}>El sistema de milo.<br /><span>Todo encaja.</span></h1>
          <p className={cls.heroLead}>Una misma manera de dar forma a cada idea. Componentes, fundamentos y ejemplos para construir con claridad.</p>
          <div className={cls.actions}>
            <Button size="sm" variant="brand" iconEnd={<Icon name="arrow_forward" />} onClick={() => go('button')}>Explorar componentes</Button>
            <Button size="sm" variant="ghost" onClick={() => go('color')}>Ver fundamentos</Button>
          </div>
          <div className={cls.heroNote}><Icon name="deployed_code" size={16} /> Componentes reales. Código listo para usar.</div>
        </div>

        <div className={cls.playground}>
          <div className={cls.previewHeader}><span>EL SISTEMA EN ACCIÓN</span><Chip size="sm" color="info" dot>Interactivo</Chip></div>
          <div className={`${cls.activity} bg-surface`}>
            <div className={cls.activityTop}>
              <span className={cls.courseIcon}><Icon name="menu_book" size={20} /></span>
              <div><p className={cls.courseName}>Matemática</p><p className={cls.meta}>4.º A · Actividad</p></div>
              <span className={cls.status} role="status"><Chip size="sm" color={published ? 'ok' : undefined}>{published ? 'Publicada' : 'Borrador'}</Chip></span>
            </div>
            <label className={cls.fieldLabel} htmlFor="intro-activity-name">Nombre de la actividad</label>
            <TextField id="intro-activity-name" value={title} onValueChange={setTitle} size="sm" disabled={published} />
            <div className={cls.peopleRow}>
              <Avatar.Group people={[{ name: 'Ana Pérez', src: face(1) }, { name: 'Bruno Díaz', src: face(2) }, { name: 'Carla Sosa', src: face(3) }]} />
              <span className={cls.meta}>24 estudiantes</span>
            </div>
            <Progress value={18} max={24}><Progress.Label>Entregas revisadas</Progress.Label><Progress.Hint>18 de 24</Progress.Hint></Progress>
            <div className={cls.setting}><label htmlFor="intro-notices">Avisar al publicar</label><Switch id="intro-notices" checked={notices} onCheckedChange={setNotices} /></div>
            <div className={cls.previewActions}>
              <Button size="sm" variant="ghost" onClick={reset}>Restablecer</Button>
              <Button size="sm" variant="brand" disabled={published || !title.trim()} iconEnd={<Icon name={published ? 'check' : 'arrow_forward'} />} onClick={() => setPublished(true)}>{published ? 'Publicada' : 'Publicar'}</Button>
            </div>
          </div>
          <p className={cls.previewHint}>Probá los controles. Los cambios quedan en esta vista.</p>
        </div>
      </section>

      <section className={cls.paths} aria-label="Explorar el sistema">
        {paths.map(path => <button type="button" key={path.id} className={cls.pathCard} onClick={() => go(path.id)}>
          <span className={cls.pathTop}><Icon name={path.icon} size={24} /><span className={cls.pathNumber}>{path.number}</span></span>
          <span className={cls.pathTitle}>{path.title}<Icon name="arrow_forward" size={16} /></span>
          <span className={cls.pathBody}>{path.body}</span>
        </button>)}
      </section>

      <section className={cls.examples} aria-labelledby="intro-examples">
        <div className={cls.sectionHeader}><div><span className={cls.eyebrow}>EN CONTEXTO</span><h2 id="intro-examples" className={cls.sectionTitle}>De las piezas a la experiencia.</h2></div><p className={cls.sectionLead}>Así se combinan los componentes en una pantalla completa.</p></div>
        <div className={cls.exampleGrid}>
          <button type="button" className={cls.exampleCard} onClick={() => go('dashboard')}>
            <div className={cls.dashboardPreview} aria-hidden="true">
              <div className={cls.miniStats}><span>Entregas<strong>79</strong></span><span>Revisadas<strong>67</strong></span><span>Pendientes<strong>12</strong></span></div>
              <div className={cls.miniChart}>{[45, 65, 52, 88, 70, 100, 80].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            </div>
            <span className={cls.exampleCaption}><span><strong>Una vista de tu semana</strong><span>Datos, filtros y acciones en un dashboard.</span></span><Icon name="arrow_forward" size={20} /></span>
          </button>
          <button type="button" className={cls.exampleCard} onClick={() => go('documento')}>
            <div className={cls.documentPreview} aria-hidden="true"><div className={cls.miniDocument}><span className={cls.documentMeta}>ECONOMÍA · 4.º B</span><strong>Creá tu propio emprendimiento</strong><span className={cls.documentLine} /><span className={cls.documentLineShort} /><span className={cls.documentCallout}><Icon name="lightbulb" size={16} /> Una idea. Muchas posibilidades.</span></div></div>
            <span className={cls.exampleCaption}><span><strong>Un espacio para aprender</strong><span>Contenido, consignas y evaluación.</span></span><Icon name="arrow_forward" size={20} /></span>
          </button>
        </div>
      </section>
    </div>
  )
}
