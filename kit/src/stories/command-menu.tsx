import cls from './command-menu.module.css'
import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { CommandMenu, type CommandGroup, type CommandItem } from '@milo/ui/blocks/editor/command-menu'
import { Kbd } from '@milo/ui/kbd'
import { Popover } from '@milo/ui/popover'
import { A11y, Anatomy, Cluster, Demo, Frame, Hero, Page, Panel, Practices, Props, Section, Stack } from '../kit'

const blocks: CommandGroup[] = [
  {
    label: 'Texto',
    items: [
      { id: 'h1', label: 'Título', hint: 'Abre una sección', icon: 'format_h1', shortcut: '#' },
      { id: 'h2', label: 'Subtítulo', hint: 'Divide una sección', icon: 'format_h2', shortcut: '##' },
      { id: 'quote', label: 'Cita', icon: 'format_quote', keywords: ['comilla', 'textual'] },
      { id: 'callout', label: 'Bloque destacado', hint: 'Una pista, algo para recordar', icon: 'lightbulb', keywords: ['callout', 'aviso'] },
    ],
  },
  {
    label: 'Listas',
    items: [
      { id: 'ul', label: 'Lista', icon: 'format_list_bulleted', shortcut: '-' },
      { id: 'ol', label: 'Lista numerada', icon: 'format_list_numbered', shortcut: '1.' },
      { id: 'todo', label: 'Lista de tareas', hint: 'Con casillas para marcar', icon: 'checklist', keywords: ['checklist', 'pendientes'] },
    ],
  },
  {
    label: 'Material',
    items: [
      { id: 'img', label: 'Imagen', icon: 'image', keywords: ['foto', 'dibujo'] },
      { id: 'video', label: 'Video', icon: 'videocam' },
      { id: 'audio', label: 'Audio', hint: 'Una consigna grabada', icon: 'mic', keywords: ['grabación', 'voz'] },
      { id: 'table', label: 'Tabla', icon: 'table_rows' },
      { id: 'formula', label: 'Fórmula', hint: 'Matemática en línea o en bloque', icon: 'functions', keywords: ['ecuación', 'latex'] },
      { id: 'chart', label: 'Gráfico', icon: 'bar_chart', keywords: ['datos', 'curva'] },
      { id: 'divider', label: 'Separador', icon: 'horizontal_rule' },
      { id: 'embed', label: 'Simulación', hint: 'Todavía no', icon: 'science', disabled: true },
    ],
  },
]

export function CommandMenuStory() {
  const [picked, setPicked] = useState<CommandItem | null>(null)

  return (
    <Page
      title="CommandMenu"
      kind="Editor"
      imports="import { CommandMenu } from '@milo/ui/blocks/editor/command-menu'"
      lead="Permite buscar y ejecutar comandos con el teclado o el puntero."
    >
      <Hero>
        <Stack align="start">
          <Frame width="md">
            <CommandMenu groups={blocks} onSelect={setPicked} />
          </Frame>
          <p className={cls.pickedNote}>
            {picked ? <>Elegiste <strong className={cls.emphasis}>{picked.label}</strong>.</> : 'Elegí uno para ver qué devuelve.'}
          </p>
        </Stack>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Buscador">{'El campo donde se escribe; filtra por nombre y por `keywords`, así que "foto" encuentra Imagen. Con `search={false}` se va y la lista filtra por `query`.'}</Anatomy.Part>
        <Anatomy.Part name="Grupo">Un encabezado y sus items; si se queda sin resultados, se va con todo.</Anatomy.Part>
        <Anatomy.Part name="Item" required>Un comando: `label`, con `icon`, `hint` y `shortcut` opcionales. Con `disabled` se saltea.</Anatomy.Part>
        <Anatomy.Part name="Atajo">`shortcut`: la tecla que hace lo mismo, a la derecha.</Anatomy.Part>
        <Anatomy.Part name="Vacío">Cuando no queda nada se dice con palabras.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Panel>
        <Demo label="Sin buscador: lo que se escribe ya está afuera" code={`<CommandMenu groups={blocks} onSelect={setPicked} search={false} query="lis" />`}>
          <Cluster gap="xl" align="start">
            <div className={`${cls.queryStrip} bg-surface`}>
              <span className={cls.queryLead}>Escribí</span>
              <Kbd>/</Kbd>
              <span className={cls.queryTail}>y después</span>
              <span className={cls.queryText}>lis</span>
            </div>
            <Frame width="md">
              <CommandMenu groups={blocks} onSelect={setPicked} search={false} query="lis" />
            </Frame>
          </Cluster>
        </Demo>

        <Demo label="Anclado a su disparador con un `Popover`" code={`<Popover
  align="start"
  width={380}
  trigger={props => <Button {...props} variant="muted">Insertar un bloque</Button>}
>
  {close => (
    <CommandMenu
      autoFocus
      groups={blocks}
      maxHeight={280}
      onSelect={item => { setPicked(item); close() }}
    />
  )}
</Popover>`}>
          <Cluster gap="lg" align="center">
            <Popover
              align="start"
              width={380}
              trigger={props => <Button {...props} variant="muted">Insertar un bloque</Button>}
            >
              {close => (
                <CommandMenu
                  autoFocus
                  groups={blocks}
                  maxHeight={280}
                  onSelect={item => { setPicked(item); close() }}
                />
              )}
            </Popover>
            <span className={cls.anchoredNote}>Abrí, escribí, movete con las flechas y elegí con Enter.</span>
          </Cluster>
        </Demo>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of={['CommandMenu', 'CommandGroup', 'CommandItem']} />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>La pieza es la lista y nada más: no se posiciona ni se cierra sola, el cierre lo decide quien la usa. Adentro de un `Modal` es la paleta de atajos de la app.</Practices.Do>
          <Practices.Do>El `id` de cada item es lo que se anuncia y lo que vuelve al elegir: tiene que ser único en toda la lista.</Practices.Do>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El buscador es un `combobox` y la lista un `listbox`. Lo marcado viaja por `aria-activedescendant`, así que el foco no se mueve y lo que se escribe sigue llegando al campo.</A11y.Item>
          <A11y.Item>Flechas para moverse, Home y End para los extremos, Enter para elegir. Lo apagado se saltea.</A11y.Item>
          <A11y.Item>Al cambiar lo buscado, la marca vuelve al primero: dejarla donde estaba marca algo que ya no se está mirando.</A11y.Item>
          <A11y.Item>Un grupo que se queda sin resultados no deja su encabezado solo, y cuando no queda nada se dice con palabras.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
