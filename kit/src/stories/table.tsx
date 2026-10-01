import cls from './table.module.css'
import { useState } from 'react'
import { Avatar } from '@humans/ui/avatar'
import { Button } from '@humans/ui/button'
import { Checkbox } from '@humans/ui/checkbox'
import { Chip } from '@humans/ui/chip'
import { EmptyState } from '@humans/ui/empty-state'
import { Filter } from '@humans/ui/filter'
import { Icon } from '@humans/ui/icon'
import { IconButton } from '@humans/ui/icon-button'
import { timeAgo } from '@humans/ui/lib/time'
import { useTable } from '@humans/ui/lib/use-table'
import { Pagination } from '@humans/ui/pagination'
import { Search } from '@humans/ui/search'
import { Sheet } from '@humans/ui/sheet'
import { Table } from '@humans/ui/table'
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

type Activity = typeof all[number]
const columns = [
  { id: 'actividad', label: 'Actividad', locked: true },
  { id: 'estado', label: 'Estado' },
  { id: 'estudiantes', label: 'Estudiantes' },
  { id: 'docente', label: 'Docente' },
  { id: 'entregas', label: 'Entregas' },
  { id: 'acciones', label: 'Acciones' },
]
const defaultColumns = ['actividad', 'estado', 'entregas', 'acciones']
const searchActivity = (a: Activity) => `${a.name} ${a.space} ${a.teacher.name}`
const fields = { estado: (a: Activity) => a.status, materia: (a: Activity) => a.space.split(' · ')[0], docente: (a: Activity) => a.teacher.name }
const sorters = { actividad: (a: Activity, b: Activity) => a.name.localeCompare(b.name, 'es'), entregas: (a: Activity, b: Activity) => a.total - b.total }

function downloadRows(rows: Activity[]) {
  const cells = [['Actividad', 'Espacio', 'Estado', 'Entregas'], ...rows.map(a => [a.name, a.space, a.status, String(a.total)])]
  const csv = cells.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'actividades.csv'
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

export function TableStory() {
  const data = useTable({ rows: all, search: searchActivity, fields, sorters, pageSize: 5, initialSort: { key: 'actividad', direction: 'asc' } })
  const [visible, setVisible] = useState(defaultColumns)
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<Activity | null>(null)
  const view = (key: string) => visible.includes(key)
  const selectedHere = data.rows.filter(a => selected.includes(a.name)).length
  const sort = (key: string) => data.sort?.key === key ? data.sort.direction === 'asc' ? 'ascending' as const : 'descending' as const : 'none' as const
  const filterFields = Object.entries(fields).map(([key, getter]) => ({
    key, label: { estado: 'Estado', materia: 'Materia', docente: 'Docente' }[key]!,
    options: [...new Set(all.map(getter))].map(value => ({ value, count: data.counts(key)[value] ?? 0 })),
  }))
  const toggleAll = (checked: boolean) => setSelected(current => checked ? [...new Set([...current, ...data.rows.map(a => a.name)])] : current.filter(name => !data.rows.some(a => a.name === name)))

  return <Page title="Table" kind="Datos" imports="import { Table } from '@humans/ui/table'" lead="Datos fáciles de recorrer, comparar y gestionar. Búsqueda, filtros y columnas se adaptan a la tarea.">
    <Hero>
      <div className={cls.workspace}>
        <div className={cls.workspaceHeader}>
          <div><h2 className={cls.workspaceTitle}>Actividades <Chip size="sm">{all.length}</Chip></h2><p className={cls.workspaceHint}>Organizá el trabajo de tus espacios.</p></div>
          <Button size="sm" variant="ghost" iconStart={<Icon name="download" />} disabled={!data.total} onClick={() => downloadRows(data.filteredRows)}>Exportar CSV</Button>
        </div>
        <div className={cls.toolbar}>
          <Search size="sm" value={data.query} onValueChange={data.setQuery} placeholder="Buscar actividad, espacio o docente" block />
          <Table.Columns columns={columns} value={visible} onValueChange={setVisible} defaultValue={defaultColumns} />
        </div>
        <div className={cls.filterBar}><Filter.Builder fields={filterFields} value={data.filters} onValueChange={data.setFilters} /><span className={cls.resultCount} role="status">{data.total} {data.total === 1 ? 'resultado' : 'resultados'}</span></div>
        {selected.length > 0 && <div className={cls.selectionBar}><span>{selected.length} seleccionadas</span><Button size="sm" variant="ghost" onClick={() => downloadRows(all.filter(a => selected.includes(a.name)))}>Exportar selección</Button><Button size="sm" variant="ghost" onClick={() => setSelected([])}>Deseleccionar</Button></div>}
        <Table label="Actividades de tus espacios" minWidth={visible.length > 4 ? 880 : 600}>
          <Table.Header><Table.Row>
            <Table.Head><Checkbox label="Seleccionar esta página" checked={data.rows.length > 0 && selectedHere === data.rows.length} indeterminate={selectedHere > 0 && selectedHere < data.rows.length} disabled={!data.rows.length} onCheckedChange={toggleAll} /></Table.Head>
            <Table.Head sort={sort('actividad')} onSort={() => data.toggleSort('actividad')}>Actividad</Table.Head>
            {view('estado') && <Table.Head>Estado</Table.Head>}
            {view('estudiantes') && <Table.Head>Estudiantes</Table.Head>}
            {view('docente') && <Table.Head>Docente</Table.Head>}
            {view('entregas') && <Table.Head align="right" sort={sort('entregas')} onSort={() => data.toggleSort('entregas')}>Entregas</Table.Head>}
            {view('acciones') && <Table.Head><span className="sr-only">Acciones</span></Table.Head>}
          </Table.Row></Table.Header>
          <Table.Body>
            {data.rows.map(a => <Table.Row key={a.name} active={selected.includes(a.name)} onClick={() => setDetail(a)}>
              <Table.Cell fit><Checkbox label={`Seleccionar ${a.name}`} checked={selected.includes(a.name)} onCheckedChange={checked => setSelected(current => checked ? [...current, a.name] : current.filter(name => name !== a.name))} /></Table.Cell>
              <Table.Cell><Table.Title>{a.name}</Table.Title><Table.Hint>{a.space}</Table.Hint></Table.Cell>
              {view('estado') && <Table.Cell><Chip size="sm" color={tone[a.status as keyof typeof tone]} dot>{a.status}</Chip></Table.Cell>}
              {view('estudiantes') && <Table.Cell><Avatar.Group people={a.students} size={24} /></Table.Cell>}
              {view('docente') && <Table.Cell><span className={cls.teacherCell}><Avatar name={a.teacher.name} src={a.teacher.src} size={24} />{a.teacher.name}</span></Table.Cell>}
              {view('entregas') && <Table.Num>{a.total}</Table.Num>}
              {view('acciones') && <Table.Cell fit><IconButton icon="chevron_right" label={`Ver ${a.name}`} size="sm" onClick={() => setDetail(a)} /></Table.Cell>}
            </Table.Row>)}
            {!data.total && <Table.Empty colSpan={visible.length + 1}><EmptyState size="sm" icon="search_off" bordered={false}><EmptyState.Title>No encontramos actividades</EmptyState.Title><EmptyState.Body>Probá otra búsqueda o quitá algún filtro.</EmptyState.Body><EmptyState.Action><Button size="sm" onClick={data.clear}>Limpiar búsqueda y filtros</Button></EmptyState.Action></EmptyState></Table.Empty>}
          </Table.Body>
          <Table.Footer><Pagination><Pagination.Status from={data.from} to={data.to} total={data.total} noun={['actividad', 'actividades']} /><Pagination.Prev disabled={data.page === 0} onClick={() => data.setPage(data.page - 1)} /><Pagination.Next disabled={data.page >= data.pageCount - 1} onClick={() => data.setPage(data.page + 1)} /></Pagination></Table.Footer>
        </Table>
        <p className={cls.workspaceHint}>Abrí una fila para ver el detalle. Las casillas seleccionan sin abrirla.</p>
      </div>
      <Sheet open={detail !== null} onOpenChange={open => { if (!open) setDetail(null) }}>
        <Sheet.Header><Sheet.Title>{detail?.name}</Sheet.Title></Sheet.Header>
        <Sheet.Body>{detail && <dl className={cls.details}><dt>Espacio</dt><dd>{detail.space}</dd><dt>Estado</dt><dd><Chip color={tone[detail.status as keyof typeof tone]}>{detail.status}</Chip></dd><dt>Docente</dt><dd>{detail.teacher.name}</dd><dt>Entregas</dt><dd>{detail.total}</dd><dt>Revisadas</dt><dd>{detail.done}</dd><dt>Última actividad</dt><dd>{detail.when}</dd></dl>}</Sheet.Body>
        <Sheet.Footer><Button size="sm" onClick={() => setDetail(null)}>Cerrar detalle</Button></Sheet.Footer>
      </Sheet>
    </Hero>

    <Anatomy>
      <Anatomy.Part name="Herramientas">Búsqueda, `Filter.Builder` y `Table.Columns` organizan la vista sin ocultar las condiciones activas.</Anatomy.Part>
      <Anatomy.Part name="Encabezados" required>`Table.Head` identifica cada columna. Con `onSort` y `sort` permite ordenar y anuncia la dirección.</Anatomy.Part>
      <Anatomy.Part name="Filas" required>`Table.Row` conserva la estructura de tabla y permite abrir detalles con Enter o Espacio.</Anatomy.Part>
      <Anatomy.Part name="Celdas">`Table.Title` destaca el dato principal; `Table.Hint` añade contexto; `Table.Num` alinea cifras.</Anatomy.Part>
      <Anatomy.Part name="Pie">`Table.Footer` mantiene la paginación fuera del desplazamiento horizontal.</Anatomy.Part>
    </Anatomy>

    <Section title="Componer una tabla" note="La presentación y los datos son independientes. Usá las piezas que necesite cada pantalla.">
      <Demo label="Estructura mínima" note="Alcanza para una lista corta que se lee de un vistazo, sin búsqueda ni filtros, como las entregas de una actividad." fill code={`<Table label="Actividades" minWidth={480}>
  <Table.Header><Table.Row>
    <Table.Head>Actividad</Table.Head>
    <Table.Head align="right">Entregas</Table.Head>
  </Table.Row></Table.Header>
  <Table.Body><Table.Row>
    <Table.Cell><Table.Title>Fracciones equivalentes</Table.Title>
      <Table.Hint>Matemática · 4.º A</Table.Hint></Table.Cell>
    <Table.Num>18</Table.Num>
  </Table.Row></Table.Body>
</Table>`}>
        <Table label="Ejemplo de estructura" minWidth={300}><Table.Header><Table.Row><Table.Head>Actividad</Table.Head><Table.Head align="right">Entregas</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell><Table.Title>Fracciones equivalentes</Table.Title><Table.Hint>Matemática · 4.º A</Table.Hint></Table.Cell><Table.Num>18</Table.Num></Table.Row></Table.Body></Table>
      </Demo>
      <Demo label="Datos, filtros y columnas" note="Copialo como punto de partida para una lista que se busca y se filtra, como las actividades de todos tus cursos." fill code={`import { useState } from 'react'
import { useTable } from '@humans/ui/lib/use-table'
import { Table } from '@humans/ui/table'
import { Filter } from '@humans/ui/filter'
import { Search } from '@humans/ui/search'

const activities = [
  { name: 'Fracciones equivalentes', status: 'Abierta' },
  { name: 'El sistema solar', status: 'Corregida' },
]
const columns = [{ id: 'name', label: 'Actividad', locked: true },
  { id: 'status', label: 'Estado' }]

function ActivityTable() {
  const [visible, setVisible] = useState(['name', 'status'])
  const data = useTable({ rows: activities, pageSize: 10,
    search: row => row.name,
    fields: { status: row => row.status },
    sorters: { name: (a, b) => a.name.localeCompare(b.name, 'es') },
  })
  return <>
    <Search value={data.query} onValueChange={data.setQuery} placeholder="Buscar actividad" />
    <Filter.Builder value={data.filters} onValueChange={data.setFilters}
      fields={[{ key: 'status', label: 'Estado', options: [
        { value: 'Abierta' }, { value: 'Corregida' },
      ] }]} />
    <Table.Columns columns={columns} value={visible} onValueChange={setVisible} />
    <Table label="Actividades">
      <Table.Header><Table.Row>
        <Table.Head onSort={() => data.toggleSort('name')}
          sort={data.sort?.direction === 'asc' ? 'ascending' : data.sort ? 'descending' : 'none'}>Actividad</Table.Head>
        {visible.includes('status') && <Table.Head>Estado</Table.Head>}
      </Table.Row></Table.Header>
      <Table.Body>{data.rows.map(row => <Table.Row key={row.name}>
        <Table.Cell>{row.name}</Table.Cell>
        {visible.includes('status') && <Table.Cell>{row.status}</Table.Cell>}
      </Table.Row>)}</Table.Body>
    </Table>
  </>
}`}>
        <p className={cls.workspaceHint}>El ejemplo principal usa estas utilidades. El código siguiente muestra cómo combinarlas.</p>
      </Demo>
    </Section>
    <Section title="Props"><Props of={['Table', 'TableColumn']} /></Section>
    <Section title="Cómo se usa bien"><Practices>
      <Practices.Do>Mostrá primero las columnas necesarias para la tarea. Dejá las secundarias en el selector de columnas.</Practices.Do>
      <Practices.Do>Combiná filtros distintos con AND y valores del mismo filtro con OR. Mantené visibles las condiciones elegidas.</Practices.Do>
      <Practices.Do>La búsqueda, los filtros y el orden vuelven a la primera página. La selección se conserva al cambiar de página.</Practices.Do>
      <Practices.Dont>No escondas el estado vacío ni representes cero con un guion: son datos diferentes.</Practices.Dont>
      <Practices.Dont>`useTable` procesa datos en memoria. Para conjuntos grandes, delegá búsqueda, filtros y paginación al servidor y mantené los controles.</Practices.Dont>
    </Practices></Section>
    <Section title="Accesibilidad"><A11y>
      <A11y.Item>La tabla conserva encabezados nativos y un nombre accesible con `label`.</A11y.Item>
      <A11y.Item>Los encabezados ordenables son botones con `aria-sort` en la columna.</A11y.Item>
      <A11y.Item>Las acciones de una celda funcionan sin activar también la fila. El foco permanece visible al recorrerla.</A11y.Item>
      <A11y.Item>En pantallas pequeñas, la región se puede desplazar con teclado y muestra una indicación visible.</A11y.Item>
    </A11y></Section>
  </Page>
}
