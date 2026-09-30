import cls from './skeleton.module.css'
import { Button } from '@humans/ui/button'
import { Card } from '@humans/ui/card'
import { Icon } from '@humans/ui/icon'
import { Skeleton } from '@humans/ui/skeleton'
import { useEffect, useRef, useState } from 'react'
import { A11y, Anatomy, Cluster, Demo, Hero, Page, Practices, Props, Section, Stack } from '../kit'

function Swap() {
  const [loading, setLoading] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const reload = () => {
    setLoading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLoading(false), 1200) as unknown as number
  }
  return (
    <Demo label="Tocá recargar: el hueco ocupa el lugar del párrafo" code={`{loading ? (
  <div className={s.lines}>
    <Skeleton className={s.lineBone} />
    <Skeleton className={s.lineBone} />
    <Skeleton className={s.lastLineBone} />
  </div>
) : (
  <p>{prompt}</p>
)}`}>
      <Stack gap="lg" width="md">
        {loading ? (
          <div className={cls.lines}>
            <Skeleton className={cls.lineBone} />
            <Skeleton className={cls.lineBone} />
            <Skeleton className={cls.lastLineBone} />
          </div>
        ) : (
          <p>Armá un presupuesto para la feria del colegio: cuánto cuesta cada puesto, cuánto se cobra la entrada y cuántas personas tienen que venir para no perder plata.</p>
        )}
        <Cluster>
          <Button variant="muted" iconStart={<Icon name="refresh" />} onClick={reload} disabled={loading}>Recargar</Button>
        </Cluster>
      </Stack>
    </Demo>
  )
}

export function SkeletonStory() {
  return (
    <Page
      title="Skeleton"
      kind="Datos"
      imports="import { Icon } from '@humans/ui/icon'
import { Skeleton } from '@humans/ui/skeleton'"
      lead="Reserva el espacio del contenido mientras carga para evitar saltos en la página."
    >
      <Hero>
        <Cluster gap="lg" align="start">
          <Stack gap="lg" width="md">
            {[0, 1, 2].map(i => (
              <div key={i} className={cls.row}>
                <Skeleton className={cls.avatarBone} />
                <div className={cls.rowLines}>
                  <Skeleton className={cls.rowTitleBone} />
                  <Skeleton className={cls.rowMetaBone} />
                </div>
              </div>
            ))}
          </Stack>
          <Card className={cls.longCard}>
            <Skeleton className={cls.longCoverBone} />
            <div className={cls.longBody}>
              <Skeleton className={cls.longTitleBone} />
              <Skeleton className={cls.longMetaBone} />
            </div>
          </Card>
        </Cluster>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Hueco" required>Un rectángulo apagado al que quien lo usa le da las medidas del contenido real, con `className`.</Anatomy.Part>
        <Anatomy.Part name="Pulso">Una animación suave que dice que algo está por llegar.</Anatomy.Part>
      </Anatomy>

      <Section title="Copiar la forma">
        <Demo label="Una fila de lista" code={`{[0, 1, 2].map(i => (
  <div key={i} className={s.row}>
    <Skeleton className={s.avatarBone} />
    <div className={s.rowLines}>
      <Skeleton className={s.rowTitleBone} />
      <Skeleton className={s.rowMetaBone} />
    </div>
  </div>
))}`}>
          <Stack gap="lg" width="md">
            {[0, 1, 2].map(i => (
              <div key={i} className={cls.row}>
                <Skeleton className={cls.avatarBone} />
                <div className={cls.rowLines}>
                  <Skeleton className={cls.rowTitleBone} />
                  <Skeleton className={cls.rowMetaBone} />
                </div>
              </div>
            ))}
          </Stack>
        </Demo>

        <Demo label="Una tarjeta, larga y corta" code={`<Card className={s.longCard}>
  <Skeleton className={s.longCoverBone} />
  <div className={s.longBody}>
    <Skeleton className={s.longTitleBone} />
    <Skeleton className={s.longMetaBone} />
  </div>
</Card>
<Card className={s.shortCard}>
  <Skeleton className={s.shortCoverBone} />
  <div className={s.shortBody}>
    <Skeleton className={s.shortTitleBone} />
    <Skeleton className={s.shortMetaBone} />
  </div>
</Card>`}>
          <Cluster gap="lg">
            <Card className={cls.longCard}>
              <Skeleton className={cls.longCoverBone} />
              <div className={cls.longBody}>
                <Skeleton className={cls.longTitleBone} />
                <Skeleton className={cls.longMetaBone} />
              </div>
            </Card>
            <Card className={cls.shortCard}>
              <Skeleton className={cls.shortCoverBone} />
              <div className={cls.shortBody}>
                <Skeleton className={cls.shortTitleBone} />
                <Skeleton className={cls.shortMetaBone} />
              </div>
            </Card>
          </Cluster>
        </Demo>
      </Section>

      <Section title="Cuando llega el contenido">
        <Swap />
      </Section>

      <Section title="Props">
        <Props of="Skeleton" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Ocupa el lugar exacto de lo que viene, así que cuando llega no se mueve nada.</Practices.Do>
          <Practices.Do>En una fila, la segunda barra va más corta: si las dos miden igual, el bloque se lee como un párrafo y no como una fila.</Practices.Do>
          <Practices.Dont>Si no se sabe la forma de lo que viene (una búsqueda que puede traer cero o cien) no va un esqueleto: va un [Spinner](#spinner), que dice "esperá" sin prometer tres filas.</Practices.Dont>
          <Practices.Dont>Para una espera de menos de un segundo no va nada: el parpadeo molesta más que la espera.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Es `aria-hidden`: un lector de pantalla no anuncia rectángulos vacíos.</A11y.Item>
          <A11y.Item>Quien espera datos necesita que se lo diga el contenedor (`aria-busy` en la lista, un aviso al terminar), no cada hueco.</A11y.Item>
          <A11y.Item>El pulso respeta `prefers-reduced-motion`: sin animación, el hueco se ve igual.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
