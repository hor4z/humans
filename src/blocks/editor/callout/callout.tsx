import type { ReactNode } from 'react'
import { Alert } from '../../../alert/alert'
import type { IconName } from '../../../icon/icon'
import type { LabelColor } from '../../../lib/colors'
import { takePart } from '../../../lib/parts'

type CalloutProps = {
  /** El glifo de la izquierda. Elegilo por lo que dice el bloque, no por el color. */
  icon?: IconName
  /** El color del papel. Sale de la familia de categorías y no de los tonos de estado: un bloque de contenido no está avisando de nada. */
  color?: LabelColor | 'neutral'
  children: ReactNode
  className?: string
}

const Title = Alert.Title

function Root({ icon, color = 'neutral', children, className }: CalloutProps) {
  const [title, text] = takePart(children, Title)
  return (
    <Alert role="note" color={color} icon={icon ?? null} className={className}>
      {title}
      <Alert.Body>{text}</Alert.Body>
    </Alert>
  )
}

/** Un bloque de contenido que pide detenerse: una aclaración, una pista, algo para recordar. */
export const Callout = Object.assign(Root, { Title })
