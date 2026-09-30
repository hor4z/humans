import cls from './reorder.module.css'
import { useState } from 'react'
import { Icon, type IconName } from '@milo/ui/icon'
import { Reorder, type ReorderItem } from '@milo/ui/reorder'
import { A11y, Demo, Frame, Page, Practices, Props, Section } from '../kit'

type Block = ReorderItem & { icon: IconName; meta: string }

const initial: Block[] = [
  { id: 'titulo', label: 'Título', icon: 'format_h1', meta: 'Creá tu propio emprendimiento' },
  { id: 'aviso', label: 'Bloque destacado', icon: 'lightbulb', meta: 'La pregunta que hay que contestar' },
  { id: 'presupuesto', label: 'Tabla que se suma', icon: 'table_rows', meta: 'Repartí los $100.000' },
  { id: 'precio', label: 'Respuesta numérica', icon: 'calculate', meta: 'El margen por unidad' },
  { id: 'competencia', label: 'Cuadro comparativo', icon: 'compare_arrows', meta: 'Contra quién competís' },
]

export function ReorderStory() {
  const [blocks, setBlocks] = useState(initial)

  return (
    <Page
      title="Reorder"
      kind="Navegación"
      imports="import { Reorder } from '@milo/ui/reorder'"
      lead="Una lista que cambia de orden: los bloques de una consigna, las etapas de una entrega. Se arrastra con el dedo o el mouse, y se mueve con el teclado: las dos cosas, no una."
    >
      <Section
        title="Los bloques de una consigna"
        note="Agarrá una manija y arrastrá, o tabulá hasta una y usá las flechas: es la misma operación. Lo que se agarra deja su hueco gris abajo, que es donde va a caer."
      >
        <Demo code={`<Reorder items={blocks} onReorder={setBlocks} label="Bloques de la consigna">
  {block => (
    <div>
      <Icon name={block.icon} size={18} className="icon-muted" />
      <span>{block.label}</span>
      <span>{block.meta}</span>
    </div>
  )}
</Reorder>`}>
          <Frame width="lg">
            <Reorder items={blocks} onReorder={setBlocks} label="Bloques de la consigna">
              {block => (
                <div className={cls.blockRow}>
                  <Icon name={block.icon} size={18} className={`${cls.blockIcon} icon-muted`} />
                  <span className={cls.blockLabel}>{block.label}</span>
                  <span className={cls.blockMeta}>{block.meta}</span>
                </div>
              )}
            </Reorder>
          </Frame>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of={['Reorder', 'ReorderItem']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>El teclado es la pieza y el arrastre la comodidad: las flechas mueven la fila.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La manija es un `button` con nombre propio: dice qué mueve y en qué posición está ("Mover Fórmula, posición 3 de 5"), así que se sabe dónde se está antes de mover nada.</A11y.Item>
          <A11y.Item>Las flechas arriba y abajo mueven la fila, y eso está escrito en la descripción de la manija: una tecla que nadie anuncia es una tecla que nadie usa.</A11y.Item>
          <A11y.Item>Cada movimiento se anuncia con `aria-live`, porque el cambio lo produjo el teclado y no hay nada más que lo diga.</A11y.Item>
          <A11y.Item>El foco sigue a la fila movida en vez de quedarse en el lugar: si se queda, la próxima flecha mueve otra fila.</A11y.Item>
          <A11y.Item>En los extremos no pasa nada y no se avisa nada: no hay a dónde ir, y un aviso ahí sería ruido.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
