import cls from './intro.module.css'
import { useState } from 'react'
import { Avatar } from '@humans/ui/avatar'
import { Button } from '@humans/ui/button'
import { Chip } from '@humans/ui/chip'
import { Icon } from '@humans/ui/icon'
import { Progress } from '@humans/ui/progress'
import { Switch } from '@humans/ui/switch'
import { TextField } from '@humans/ui/text-field'
import { face } from './fixtures'

const paths: { id: string; title: string; body: string; number: string }[] = [
  { id: 'color', title: 'Fundamentos', body: 'Color, tipografía y espaciado. Las decisiones que conectan toda la interfaz.', number: '01' },
  { id: 'button', title: 'Componentes', body: 'Controles, estados y código de uso. Del primer botón al flujo completo.', number: '02' },
  { id: 'accessibility', title: 'Accesibilidad', body: 'Foco visible, navegación por teclado y nombres que se entienden.', number: '03' },
]

const subjects = [
  { image: 'sport', label: 'Movimiento y salud' },
  { image: 'mind', label: 'Bienestar emocional' },
  { image: 'media', label: 'Creación digital' },
  { image: 'math', label: 'Pensamiento lógico' },
  { image: 'economy', label: 'Finanzas personales' },
  { image: 'geography', label: 'Ciudadanía global' },
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
          <span className={cls.eyebrow}>APRENDER CONSTRUYENDO</span>
          <h1 id="intro-title" className={cls.heroTitle}>
            <span className={cls.heroLine}>Ideas <img className={cls.heroImage} src="/intro/realistic/tablet.webp" width="144" height="144" alt="" /> para explorar.</span>{' '}
            <span className={cls.heroLine}>Proyectos <img className={cls.heroImage} src="/intro/realistic/wind-rover.webp" width="144" height="144" alt="" /> para</span>{' '}
            <span className={cls.heroLine}><img className={cls.heroImage} src="/intro/realistic/backpack.webp" width="144" height="144" alt="" /> compartir.</span>
          </h1>
          <p className={cls.heroLead}>Herramientas para diseñar experiencias de aprendizaje. Componentes y fundamentos para acompañar en cada espacio de aprendizaje.</p>
          <div className={cls.actions}>
            <Button size="sm" variant="brand" iconEnd={<Icon name="arrow_forward" />} onClick={() => go('button')}>Explorar componentes</Button>
            <Button size="sm" variant="ghost" onClick={() => go('color')}>Ver fundamentos</Button>
          </div>
        </div>

      </section>

      <section className={cls.subjects} aria-label="Distintas formas de aprender">
        <ul className={cls.subjectList}>
          {subjects.map(subject => <li key={subject.image} className={cls.subjectItem}>
            <img src={`/intro/realistic/${subject.image}.webp`} width="112" height="112" alt="" loading="lazy" />
            <span>{subject.label}</span>
          </li>)}
        </ul>
      </section>

      <section className={cls.practice} aria-labelledby="intro-practice">
        <div className={cls.practiceContent}>
          <span className={cls.eyebrow}>DEL DISEÑO AL AULA</span>
          <h2 id="intro-practice" className={cls.practiceTitle}>Menos pasos.<br />Más tiempo para enseñar.</h2>
          <p className={cls.practiceLead}>Preparar una actividad, acompañar las entregas y compartir una devolución. Cada detalle de la interfaz puede hacer más simple el trabajo de todos los días.</p>
          <span className={cls.practiceHint}><Icon name="arrow_forward" size={20} /> Probá editar y publicar esta actividad.</span>
        </div>
        <div className={cls.playground}>
          <div className={`${cls.activity} bg-surface`}>
            <div className={cls.activityTop}>
              <img className={cls.courseImage} src="/intro/realistic/math.webp" width="40" height="40" alt="" />
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
              <Button size="sm" variant="muted" onClick={reset}>Restablecer</Button>
              <Button size="sm" variant="brand" disabled={published || !title.trim()} iconEnd={<Icon name={published ? 'check' : 'arrow_forward'} />} onClick={() => setPublished(true)}>{published ? 'Publicada' : 'Publicar'}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className={cls.paths} aria-label="Explorar el sistema">
        {paths.map(path => <button type="button" key={path.id} className={cls.pathCard} onClick={() => go(path.id)}>
          <span className={cls.pathNumber}>{path.number}</span>
          <span className={cls.pathTitle}>{path.title}<Icon name="arrow_forward" size={16} /></span>
          <span className={cls.pathBody}>{path.body}</span>
        </button>)}
      </section>

      <section className={cls.examples} aria-labelledby="intro-examples">
        <div className={cls.sectionHeader}><div><span className={cls.eyebrow}>EN CONTEXTO</span><h2 id="intro-examples" className={cls.sectionTitle}>Así se ve en el aula.</h2></div></div>
        <div className={cls.exampleGrid}>
          <button type="button" className={cls.exampleCard} onClick={() => go('dashboard')}>
            <div className={cls.dashboardPreview} aria-hidden="true">
              <div className={cls.miniStats}><span>Entregas<strong>79</strong></span><span>Revisadas<strong>67</strong></span><span>Pendientes<strong>12</strong></span></div>
              <div className={cls.miniChart}>{[45, 65, 52, 88, 70, 100, 80].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            </div>
            <span className={cls.exampleCaption}><span><strong>Una vista de tu semana</strong><span>Entregas, avances y pendientes a la vista.</span></span><Icon name="arrow_forward" size={20} /></span>
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
