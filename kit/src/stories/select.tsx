import { useEffect, useState } from 'react'
import { Avatar } from '@milo/ui/avatar'
import { Icon } from '@milo/ui/icon'
import { Select } from '@milo/ui/select'
import { A11y, Cluster, Demo, Page, Practices, Props, Section } from '../kit'

export function SelectStory() {
  const [level, setLevel] = useState('6.º grado')
  const [subject, setSubject] = useState('Matemática')
  const [long, setLong] = useState('Cualquiera con el link puede ver y comentar')
  const [withIcon, setWithIcon] = useState('Matemática')
  const [space, setSpace] = useState('Matemática · 4.º A')
  const [teacher, setTeacher] = useState('Melina Rivero')

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setLoading(c => !c), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <Page
      title="Select"
      kind="Formularios"
      imports="import { Select } from '@milo/ui/select'"
      lead="Es un botón con un listbox propio, no un `<select>` nativo. `appearance: none` te saca la flecha, pero la lista desplegada la sigue dibujando el sistema operativo, así que en Linux aparece un control de GTK en medio de la interfaz: el campo se ve 'sin estilo' por más que la caja esté bien."
    >
      <Section
        title="Variantes"
        note="Probalo con el teclado: abrí el de las materias y escribí 'ci'."
      >
        <Cluster align="start">
          <Demo label="width 160" code={`<Select value={level} onValueChange={setLevel} width={160} options={['4.º grado', '5.º grado', '6.º grado', '7.º grado']} />`}>
            <Select value={level} onValueChange={setLevel} width={160} options={['4.º grado', '5.º grado', '6.º grado', '7.º grado']} />
          </Demo>
          <Demo label="al ancho del contenido" code={`<Select value={subject} onValueChange={setSubject} options={['Matemática', 'Lengua', 'Ciencias', 'Geografía', 'Convivencia']} />`}>
            <Select value={subject} onValueChange={setSubject} options={['Matemática', 'Lengua', 'Ciencias', 'Geografía', 'Convivencia']} />
          </Demo>
          <Demo width="sm" label="valor largo · se trunca" code={`<Select
  value={long}
  onValueChange={setLong}
  width={280}
  options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link puede ver y comentar']}
/>`}>
            <Select
              value={long}
              onValueChange={setLong}
              width={280}
              options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link puede ver y comentar']}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Adelante del valor"
        note="`leading` es un nodo y no un `IconName`, al revés que el `icon` del TextField: lo que va adelante del valor es de quien lo usa."
      >
        <Cluster align="start">
          <Demo label="un glifo" code={`<Select
  value={withIcon}
  onValueChange={setWithIcon}
  width={180}
  leading={<Icon name="calculate" size={16} />}
  options={['Matemática', 'Lengua', 'Ciencias']}
/>`}>
            <Select
              value={withIcon}
              onValueChange={setWithIcon}
              width={180}
              leading={<Icon name="calculate" size={16} />}
              options={['Matemática', 'Lengua', 'Ciencias']}
            />
          </Demo>
          <Demo label="una carpeta de color" code={`<Select
  value={space}
  onValueChange={setSpace}
  width={200}
  leading={<Icon.Folder color="blue" size={16} />}
  options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
/>`}>
            <Select
              value={space}
              onValueChange={setSpace}
              width={200}
              leading={<Icon.Folder color="blue" size={16} />}
              options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
            />
          </Demo>
          <Demo label="un avatar" code={`<Select
  value={teacher}
  onValueChange={setTeacher}
  width={190}
  leading={<Avatar name="Melina Rivero" size={20} />}
  options={['Melina Rivero', 'Juan Pérez', 'Ana Gómez']}
/>`}>
            <Select
              value={teacher}
              onValueChange={setTeacher}
              width={190}
              leading={<Avatar name="Melina Rivero" size={20} />}
              options={['Melina Rivero', 'Juan Pérez', 'Ana Gómez']}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section
        title="Mientras los datos no están"
        note="Va `loading` y no un spinner por `leading`: con el spinner suelto el control sigue abriendo una lista vieja. No recibe promesas: el estado lo pasa quien carga."
      >
        <Cluster align="start">
          <Demo label="loading · el spinner es el default" code={`<Select value="Cargando espacios…" width={200} loading options={[]} />`}>
            <Select value="Cargando espacios…" width={200} loading options={[]} />
          </Demo>
          <Demo label="loading con leading propio" code={`<Select
  value="Matemática"
  width={180}
  loading
  leading={<Icon name="calculate" size={16} className="icon-muted" />}
  options={['Matemática', 'Lengua']}
/>`}>
            <Select
              value="Matemática"
              width={180}
              loading
              leading={<Icon name="calculate" size={16} className="icon-muted" />}
              options={['Matemática', 'Lengua']}
            />
          </Demo>
          <Demo label="en vivo · alterna cada 2s" code={`<Select
  value={loading ? 'Buscando espacios…' : space}
  onValueChange={setSpace}
  width={200}
  loading={loading}
  options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
/>`}>
            <Select
              value={loading ? 'Buscando espacios…' : space}
              onValueChange={setSpace}
              width={200}
              loading={loading}
              options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
            />
          </Demo>
        </Cluster>
      </Section>

      <Section title="Props">
        <Props of="Select" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>{'Es un botón con listbox propio y no un `<select>` nativo: la lista del sistema operativo no se puede estilar.'}</Practices.Do>
          <Practices.Dont>Para más de una decena de opciones va un buscador, no una lista larga.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>Flechas para moverse, Enter para elegir, Escape para salir, Home y End a los extremos. La flecha abajo también abre la lista.</A11y.Item>
          <A11y.Item>Teclear salta a la opción que empieza así, sin tildes y sin distinguir mayúsculas: con veinte opciones es la diferencia entre usable y no.</A11y.Item>
          <A11y.Item>El foco se queda en el control y la opción activa se anuncia con `aria-activedescendant`: un lector de pantalla dice cuál está señalada.</A11y.Item>
          <A11y.Item>Las opciones no son paradas de tabulación: Tab sale del control, no recorre las veinte.</A11y.Item>
          <A11y.Item>Escape entra en la pila global: cierra la lista y deja abierto el modal que haya detrás.</A11y.Item>
          <A11y.Item>Con `loading` no abre y avisa `aria-busy`, en vez de mostrar una lista vacía.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
