import cls from './table.module.css'
import { useMemo, useState } from 'react'
import { Avatar } from '@milo/ui/avatar'
import { Chip } from '@milo/ui/chip'
import { Dropdown } from '@milo/ui/dropdown'
import { EmptyState } from '@milo/ui/empty-state'
import { Filter } from '@milo/ui/filter'
import { facets } from '@milo/ui/lib/facets'
import { IconButton } from '@milo/ui/icon-button'
import { fold } from '@milo/ui/lib/cx'
import { timeAgo } from '@milo/ui/lib/time'
import { Pagination } from '@milo/ui/pagination'
import { Search } from '@milo/ui/search'
import { Table } from '@milo/ui/table'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'
import { person as p } from '../fixtures'

const NOW = new Date('2026-03-09T15:00:00-03:00')
const ago = (ms: number) => timeAgo(new Date(NOW.getTime() - ms), { now: NOW })
const MIN = 60_000, H = 60 * MIN, D = 24 * H

const tone = { 'Abierta': 'green', 'Corregida': 'blue' } as const

const spaces = [
  {
    name: 'Fracciones equivalentes', space: 'Matemática · 4.º A', status: 'Abierta',
    students: [p('Ana Pérez', 1), p('Bruno Díaz', 2), p('Carla Sosa', 3), p('Damián Ruiz', 4), p('Elena Vega', 5)],
    total: 18,
    teacher: p('Valeria Ochoa', 7), done: 11, when: ago(2 * H)
  },
  {
    name: 'El sistema solar', space: 'Ciencias · 5.º B', status: 'Corregida',
    students: [p('Franco Gil', 6), p('Gabriela Mota', 7), p('Hugo Paz', 8)],
    total: 24,
    teacher: p('Martín Roldán', 6), done: 24, when: ago(D)
  },
  {
    name: 'Cuento policial', space: 'Lengua · 6.º', status: 'Borrador',
    students: [p('Irene Lopez'), p('Julián Cruz'), p('Karen Ortiz'), p('Leo Nuñez')],
    total: 0,
    teacher: p('Valeria Ochoa', 7), done: 0, when: ago(5 * D)
  },
  {
    name: 'Mapa de América', space: 'Sociales · 5.º A', status: 'Abierta',
    students: [p('Mora Tello', 2), p('Nico Arce'), p('Olivia Rey', 4)],
    total: 7,
    teacher: p('Nadia Britos'), done: 3, when: ago(H)
  },
]

const all = [
  ...spaces,
  { name: 'La Revolución de Mayo', space: 'Sociales · 6.º', status: 'Corregida', students: [p('Pablo Vera', 7), p('Rita Coll', 1)], total: 21, teacher: p('Martín Roldán', 6), done: 21, when: ago(3 * D) },
  { name: 'Ecuaciones de primer grado', space: 'Matemática · 6.º', status: 'Abierta', students: [p('Sara Luna', 3), p('Tomás Gil'), p('Ulises Paz', 5), p('Vera Ruiz', 6)], total: 12, teacher: p('Valeria Ochoa', 7), done: 5, when: ago(20 * MIN) },
  { name: 'El ciclo del agua', space: 'Ciencias · 4.º A', status: 'Borrador', students: [p('Wanda Ise'), p('Ximena Roa', 8)], total: 0, teacher: p('Nadia Britos'), done: 0, when: ago(9 * D) },
  { name: 'Poesía de vanguardia', space: 'Lengua · 6.º', status: 'Corregida', students: [p('Yago Prat', 4), p('Zoe Marín', 2), p('Aldo Sanz')], total: 16, teacher: p('Martín Roldán', 6), done: 16, when: ago(4 * H) },
  { name: 'Los climas del mundo', space: 'Sociales · 5.º A', status: 'Abierta', students: [p('Bianca Toro', 6), p('Ciro Vega')], total: 9, teacher: p('Nadia Britos'), done: 2, when: ago(6 * D) },
]

const PAGE_SIZE = 4

export function TableStory() {
  const [query, setQuery] = useState('')
  const [statuses, setStatuses] = useState<string[]>([])
  const [pickedSpaces, setPickedSpaces] = useState<string[]>([])
  const [pickedPeople, setPickedPeople] = useState<string[]>([])

  const columns = [
    { id: 'actividad', label: 'Actividad', locked: true },
    { id: 'estudiantes', label: 'Estudiantes' },
    { id: 'docente', label: 'Docente' },
    { id: 'estado', label: 'Estado' },
    { id: 'corregidas', label: 'Corregidas' },
    { id: 'entregas', label: 'Entregas' },
    { id: 'acciones', label: 'Acciones' },
  ]
  const [visible, setVisible] = useState(columns.map(c => c.id))
  const view = (id: string) => visible.includes(id)
  const [page, setPage] = useState(0)

  const narrow = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(0) }

  const subject = (a: typeof all[number]) => a.space.split(' · ')[0]

  const people = useMemo(() => {
    const views = new Map<string, { name: string; src?: string }>()
    for (const a of all) for (const e of a.students) if (!views.has(e.name)) views.set(e.name, e)
    return [...views.values()]
  }, [])

  const byText = useMemo(
    () => all.filter(a => !query.trim() || fold(a.name + ' ' + a.space).includes(fold(query))),
    [query],
  )
  const withPeople = (a: typeof all[number]) =>
    !pickedPeople.length || a.students.some(e => pickedPeople.includes(e.name))

  const statusCounts = facets(
    byText.filter(a => (!pickedSpaces.length || pickedSpaces.includes(subject(a))) && withPeople(a)),
    a => a.status,
  )
  const spaceCounts = facets(
    byText.filter(a => (!statuses.length || statuses.includes(a.status)) && withPeople(a)),
    subject,
  )
  const peopleCounts = useMemo(() => {
    const n: Record<string, number> = {}
    for (const a of byText) {
      if (statuses.length && !statuses.includes(a.status)) continue
      if (pickedSpaces.length && !pickedSpaces.includes(subject(a))) continue
      for (const e of a.students) n[e.name] = (n[e.name] ?? 0) + 1
    }
    return n
  }, [byText, statuses, pickedSpaces])

  const list = byText.filter(a =>
    (!statuses.length || statuses.includes(a.status))
    && (!pickedSpaces.length || pickedSpaces.includes(subject(a)))
    && withPeople(a))

  const from = page * PAGE_SIZE
  const onScreen = list.slice(from, from + PAGE_SIZE)
  const hasMore = from + PAGE_SIZE < list.length
  const filtering = query.trim() !== '' || statuses.length > 0 || pickedSpaces.length > 0 || pickedPeople.length > 0
  const clear = () => { setQuery(''); setStatuses([]); setPickedSpaces([]); setPickedPeople([]); setPage(0) }

  return (
    <Page
      title="Table"
      kind="Datos"
      imports="import { Table } from '@milo/ui/table'"
      lead="Piezas que se arman, no un componente que recibe `columns` y `rows`: una tabla de datos y una de personas comparten la grilla y nada más, y una API de columnas termina con un `render` por columna."
    >
      <Hero>
        <Table label="Actividades del espacio" minWidth={640}>
          <Table.Header>
            <Table.Row>
              <Table.Head>Actividad</Table.Head>
              <Table.Head>Estudiantes</Table.Head>
              <Table.Head>Estado</Table.Head>
              <Table.Head align="right">Entregas</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {spaces.slice(0, 3).map(a => (
              <Table.Row key={a.name}>
                <Table.Cell>
                  <Table.Title>{a.name}</Table.Title>
                  <Table.Hint>{a.space}</Table.Hint>
                </Table.Cell>
                <Table.Cell><Avatar.Group people={a.students} /></Table.Cell>
                <Table.Cell><Chip color={tone[a.status as keyof typeof tone]}>{a.status}</Chip></Table.Cell>
                <Table.Num>{a.total || '-'}</Table.Num>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Encabezado" required>`Table.Header` con una `Table.Row` de `Table.Head`; `align="right"` para las columnas de números.</Anatomy.Part>
        <Anatomy.Part name="Cuerpo" required>`Table.Body` con una `Table.Row` por fila. Con `onClick` la fila entera se toca.</Anatomy.Part>
        <Anatomy.Part name="Celda">`Table.Cell`, con `Table.Title` y `Table.Hint` para el nombre y su línea de apoyo. `Table.Num` es la de números, alineada a la derecha.</Anatomy.Part>
        <Anatomy.Part name="Fila de totales">{'`Table.Foot`: el `<tfoot>` con la suma de lo que hay a la vista.'}</Anatomy.Part>
        <Anatomy.Part name="Vacío">`Table.Empty` ocupa la fila entera cuando no hay resultados.</Anatomy.Part>
        <Anatomy.Part name="Franja de abajo">`Table.Footer`: la paginación, adentro del marco y fuera del scroll.</Anatomy.Part>
      </Anatomy>

      <Section
        title="La tabla entera"
        note="Una tabla de trabajo lleva tres cosas más que la grilla: el filtro, el total y la paginación."
      >
        <Demo fill code={`<Filter.Bar>
  <Search
    value={query}
    onValueChange={narrow(setQuery)}
    placeholder="Buscar por actividad o espacio"
  />
  <Filter
    label="Estado"
    value={statuses}
    onValueChange={narrow(setStatuses)}
    options={['Abierta', 'Corregida', 'Borrador'].map(v => ({ value: v, count: statusCounts[v] ?? 0 }))}
  />
  <Filter
    label="Materia"
    value={pickedSpaces}
    onValueChange={narrow(setPickedSpaces)}
    options={['Matemática', 'Ciencias', 'Lengua', 'Sociales'].map(v => ({ value: v, count: spaceCounts[v] ?? 0 }))}
  />
  <Filter
    label="Estudiantes"
    value={pickedPeople}
    onValueChange={narrow(setPickedPeople)}
    options={people.map(p => ({ value: p.name, count: peopleCounts[p.name] ?? 0, person: p }))}
  />
  {filtering && <Filter.Reset onClick={clear} />}
  <Filter icon="view_column" label="Columnas" options={columns.map(c => ({ value: c.id, label: c.label, locked: c.locked }))} value={visible} onValueChange={setVisible} />
</Filter.Bar>

<Table label="Actividades del espacio" minWidth={980}>
  <Table.Footer>
    <Pagination>
      <Pagination.Status
        from={from + 1}
        to={from + onScreen.length}
        total={list.length}
        noun={['actividad', 'actividades']}
      />
      <Pagination.Prev disabled={page === 0} onClick={() => setPage(p => p - 1)} />
      <Pagination.Next disabled={!hasMore} onClick={() => setPage(p => p + 1)} />
    </Pagination>
  </Table.Footer>
  <Table.Header>
    <Table.Row>
      <Table.Head>Actividad</Table.Head>
      {view('estudiantes') && <Table.Head>Estudiantes</Table.Head>}
      {view('docente') && <Table.Head>Docente</Table.Head>}
      {view('estado') && <Table.Head>Estado</Table.Head>}
      {view('corregidas') && <Table.Head align="right">Corregidas</Table.Head>}
      {view('entregas') && <Table.Head align="right">Entregas</Table.Head>}
      {view('acciones') && <Table.Head><span className="sr-only">Acciones</span></Table.Head>}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {onScreen.map(a => (
      <Table.Row key={a.name} onClick={() => open(a)}>
        <Table.Cell>
          <Table.Title>{a.name}</Table.Title>
          <Table.Hint>{a.space}</Table.Hint>
        </Table.Cell>
        {view('estudiantes') && <Table.Cell><Avatar.Group people={a.students} /></Table.Cell>}
        {view('docente') && (
          <Table.Cell>
            <span className={s.teacherCell}>
              <Avatar name={a.teacher.name} src={a.teacher.src} size={24} />
              <span className={s.teacherName}>{a.teacher.name}</span>
            </span>
          </Table.Cell>
        )}
        {view('estado') && <Table.Cell><Chip color={tone[a.status]}>{a.status}</Chip></Table.Cell>}
        {view('corregidas') && (
          <Table.Num>
            {a.total ? <>{a.done}<span className={s.fractionTotal}> / {a.total}</span></> : '-'}
          </Table.Num>
        )}
        {view('entregas') && <Table.Num>{a.total || '-'}</Table.Num>}
        {view('acciones') && (
          <Table.Cell fit>
            <Dropdown
              items={[
                { label: 'Abrir', icon: 'open_in_new' },
                { label: 'Duplicar', icon: 'content_copy' },
                { label: 'Archivar', icon: 'inventory_2' },
              ]}
              trigger={({ onClick, ref, ...rest }) => (
                <IconButton
                  ref={ref}
                  onClick={e => { e.stopPropagation(); onClick() }}
                  {...rest}
                  icon="more_horiz"
                  label={\`Acciones de \${a.name}\`}
                  size="sm"
                />
              )}
            />
          </Table.Cell>
        )}
      </Table.Row>
    ))}
    {onScreen.length === 0 && (
      <Table.Empty colSpan={visible.length}>
        <EmptyState size="sm" icon="search_off">
          <EmptyState.Title>Ninguna actividad con eso</EmptyState.Title>
          <EmptyState.Body>Probá con otras palabras, o sacá alguno de los filtros puestos.</EmptyState.Body>
          <EmptyState.Action><Filter.Reset onClick={clear}>Limpiar los filtros</Filter.Reset></EmptyState.Action>
        </EmptyState>
      </Table.Empty>
    )}
  </Table.Body>
  {onScreen.length > 0 && (
    <Table.Foot>
      <Table.Row>
        <Table.Cell colSpan={1 + ['estudiantes', 'docente', 'estado'].filter(view).length}>
          Total{filtering ? ' de lo filtrado' : ''}
        </Table.Cell>
        {view('corregidas') && <Table.Num>{list.reduce((n, a) => n + a.done, 0)}</Table.Num>}
        {view('entregas') && <Table.Num>{list.reduce((n, a) => n + a.total, 0)}</Table.Num>}
        {view('acciones') && <Table.Cell />}
      </Table.Row>
    </Table.Foot>
  )}
</Table>`}>
          <div>
            <Filter.Bar className={cls.filterGap}>
              <Search
                value={query}
                onValueChange={narrow(setQuery)}
                placeholder="Buscar por actividad o espacio"
              />
              <Filter
                label="Estado"
                value={statuses}
                onValueChange={narrow(setStatuses)}
                options={['Abierta', 'Corregida', 'Borrador'].map(v => ({ value: v, count: statusCounts[v] ?? 0 }))}
              />
              <Filter
                label="Materia"
                value={pickedSpaces}
                onValueChange={narrow(setPickedSpaces)}
                options={['Matemática', 'Ciencias', 'Lengua', 'Sociales'].map(v => ({ value: v, count: spaceCounts[v] ?? 0 }))}
              />
              <Filter
                label="Estudiantes"
                value={pickedPeople}
                onValueChange={narrow(setPickedPeople)}
                options={people.map(p => ({ value: p.name, count: peopleCounts[p.name] ?? 0, person: p }))}
              />
              {filtering && <Filter.Reset onClick={clear} />}
              <Filter
                icon="view_column"
                label="Columnas"
                options={columns.map(c => ({ value: c.id, label: c.label, locked: c.locked }))}
                value={visible}
                onValueChange={setVisible}
              />
            </Filter.Bar>

            <Table
              label="Actividades del espacio"
              minWidth={980}
            >
              <Table.Footer>
                <Pagination>
                    <Pagination.Status
                      from={from + 1}
                      to={from + onScreen.length}
                      total={list.length}
                      noun={['actividad', 'actividades']}
                    />
                    <Pagination.Prev disabled={page === 0} onClick={() => setPage(p => p - 1)} />
                    <Pagination.Next disabled={!hasMore} onClick={() => setPage(p => p + 1)} />
                  </Pagination>
              </Table.Footer>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Actividad</Table.Head>
                  {view('estudiantes') && <Table.Head>Estudiantes</Table.Head>}
                  {view('docente') && <Table.Head>Docente</Table.Head>}
                  {view('estado') && <Table.Head>Estado</Table.Head>}
                  {view('corregidas') && <Table.Head align="right">Corregidas</Table.Head>}
                  {view('entregas') && <Table.Head align="right">Entregas</Table.Head>}
                  {view('acciones') && <Table.Head><span className="sr-only">Acciones</span></Table.Head>}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {onScreen.map(a => (
                  <Table.Row key={a.name} onClick={() => {}}>
                    <Table.Cell>
                      <Table.Title>{a.name}</Table.Title>
                      <Table.Hint>{a.space}</Table.Hint>
                    </Table.Cell>
                    {view('estudiantes') && <Table.Cell><Avatar.Group people={a.students} /></Table.Cell>}
                    {view('docente') && (
                      <Table.Cell>
                        <span className={cls.teacherCell}>
                          <Avatar name={a.teacher.name} src={a.teacher.src} size={24} />
                          <span className={cls.teacherName}>{a.teacher.name}</span>
                        </span>
                      </Table.Cell>
                    )}
                    {view('estado') && <Table.Cell><Chip color={tone[a.status as keyof typeof tone]}>{a.status}</Chip></Table.Cell>}
                    {view('corregidas') && (
                      <Table.Num>
                        {a.total ? <>{a.done}<span className={cls.fractionTotal}> / {a.total}</span></> : '-'}
                      </Table.Num>
                    )}
                    {view('entregas') && <Table.Num>{a.total || '-'}</Table.Num>}
                    {view('acciones') && (
                    <Table.Cell fit>
                      <Dropdown
                        items={[
                          { label: 'Abrir', icon: 'open_in_new' },
                          { label: 'Duplicar', icon: 'content_copy' },
                          { label: 'Archivar', icon: 'inventory_2' },
                        ]}
                        trigger={({ onClick, ref, ...rest }) => (
                          <IconButton
                            ref={ref}
                            onClick={e => { e.stopPropagation(); onClick() }}
                            {...rest}
                            icon="more_horiz"
                            label={`Acciones de ${a.name}`}
                            size="sm"
                          />
                        )}
                      />
                    </Table.Cell>
                    )}
                  </Table.Row>
                ))}
                {onScreen.length === 0 && (
                  <Table.Empty colSpan={visible.length}>
                    <EmptyState size="sm" icon="search_off">
                      <EmptyState.Title>Ninguna actividad con eso</EmptyState.Title>
                      <EmptyState.Body>Probá con otras palabras, o sacá alguno de los filtros puestos.</EmptyState.Body>
                      <EmptyState.Action><Filter.Reset onClick={clear}>Limpiar los filtros</Filter.Reset></EmptyState.Action>
                    </EmptyState>
                  </Table.Empty>
                )}
              </Table.Body>
              {onScreen.length > 0 && (
                <Table.Foot>
                  <Table.Row>
                    <Table.Cell colSpan={1 + ['estudiantes', 'docente', 'estado'].filter(view).length}>
                      Total{filtering ? ' de lo filtrado' : ''}
                    </Table.Cell>
                    {view('corregidas') && <Table.Num>{list.reduce((n, a) => n + a.done, 0)}</Table.Num>}
                    {view('entregas') && <Table.Num>{list.reduce((n, a) => n + a.total, 0)}</Table.Num>}
                    {view('acciones') && <Table.Cell />}
                  </Table.Row>
                </Table.Foot>
              )}
            </Table>
          </div>
        </Demo>
      </Section>

      <Section
        title="La pieza"
        note="Las filas alternan papel: en una tabla ancha, un divisor de un píxel no alcanza para seguir una fila hasta el final."
      >
        <Demo fill code={`<Table label="Entregas por estudiante" minWidth={720}>
  <Table.Header>
    <Table.Row>
      <Table.Head>Actividad</Table.Head>
      <Table.Head>Estudiantes</Table.Head>
      <Table.Head>Estado</Table.Head>
      <Table.Head align="right">Entregas</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {spaces.map(a => (
      <Table.Row key={a.name} onClick={() => open(a)}>
        <Table.Cell>
          <Table.Title>{a.name}</Table.Title>
          <Table.Hint>{a.space}</Table.Hint>
        </Table.Cell>
        <Table.Cell>
          <Avatar.Group people={a.students} />
        </Table.Cell>
        <Table.Cell>
          <Chip color={tone[a.status]}>{a.status}</Chip>
        </Table.Cell>
        <Table.Num>{a.total || '-'}</Table.Num>
      </Table.Row>
    ))}
  </Table.Body>
</Table>`}>
          <Table label="Entregas por estudiante" minWidth={720}>
            <Table.Header>
              <Table.Row>
                <Table.Head>Actividad</Table.Head>
                <Table.Head>Estudiantes</Table.Head>
                <Table.Head>Estado</Table.Head>
                <Table.Head align="right">Entregas</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {spaces.map(a => (
                <Table.Row key={a.name} onClick={() => {}}>
                  <Table.Cell>
                    <Table.Title>{a.name}</Table.Title>
                    <Table.Hint>{a.space}</Table.Hint>
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar.Group people={a.students} />
                  </Table.Cell>
                  <Table.Cell>
                    <Chip color={tone[a.status as keyof typeof tone]}>{a.status}</Chip>
                  </Table.Cell>
                  <Table.Num>{a.total || '-'}</Table.Num>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Table" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>`label` dice de qué es: cuando scrollea se vuelve una región enfocable, y dos regiones con el mismo nombre se leen como una.</Practices.Do>
          <Practices.Do>La paginación va en `Table.Footer`, que vive adentro del marco pero fuera del scroll.</Practices.Do>
          <Practices.Do>La columna de personas es un `Avatar.Group`: el monte, el sobrante y el `ring` sobre otro fondo están en [Avatar](#avatar).</Practices.Do>
          <Practices.Dont>{'`Table.Foot` es el `<tfoot>` y `Table.Footer` es la franja de abajo: no son lo mismo.'}</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>{'Es una <table> de verdad: encabezados con `scope`, filas y celdas con su semántica.'}</A11y.Item>
          <A11y.Item>Una fila que se toca entra en el orden de tabulación y contesta a Enter y a la barra: no es un click y nada más.</A11y.Item>
          <A11y.Item>Cuando las columnas no entran, el scroll lateral es una parada de tabulación con nombre: sin barra a la vista, es la única forma de llegar a la derecha sin mouse.</A11y.Item>
          <A11y.Item>{'La franja de paginación es un <nav> con su nombre y anuncia el tramo con role="status" cuando cambia.'}</A11y.Item>
          <A11y.Item>Las opciones de filtros y columnas se nombran una por una.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
