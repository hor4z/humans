import { useEffect, useState } from 'react'
import { Avatar } from '@milo/ui/avatar'
import { Icon } from '@milo/ui/icon'
import { Select } from '@milo/ui/select'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

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
      lead="Permite elegir un valor de una lista desplegable con navegación por teclado."
    >
      <Hero>
        <Select value={level} onValueChange={setLevel} width={160} options={['4.º grado', '5.º grado', '6.º grado', '7.º grado']} />
        <Select
          value={withIcon}
          onValueChange={setWithIcon}
          width={180}
          leading={<Icon name="calculate" size={16} />}
          options={['Matemática', 'Lengua', 'Ciencias']}
        />
        <Select value="Cargando espacios…" width={200} loading options={[]} />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Botón" required>Lo que se ve cerrado: el valor elegido, truncado si no entra.</Anatomy.Part>
        <Anatomy.Part name="Adelante del valor">`leading`: un glifo, una carpeta o un avatar, que es de quien lo usa.</Anatomy.Part>
        <Anatomy.Part name="Chevron">La flecha de la derecha, que dice que hay una lista.</Anatomy.Part>
        <Anatomy.Part name="Lista" required>El panel con las `options`, anclado al botón.</Anatomy.Part>
        <Anatomy.Part name="Tilde">Marca la opción elegida adentro de la lista.</Anatomy.Part>
        <Anatomy.Part name="Spinner">Con `loading` reemplaza al `leading`, si no hay uno propio.</Anatomy.Part>
      </Anatomy>

      <Section title="Variantes">
        <Panel>
          <Variant
            name="ancho fijo, al contenido y valor largo"
            note="Probalo con el teclado: abrí el de las materias y escribí 'ci'. Sin `width` toma el ancho del contenido, y un valor más largo que el ancho se trunca."
            code={`<Select value={level} onValueChange={setLevel} width={160} options={['4.º grado', '5.º grado', '6.º grado', '7.º grado']} />
<Select value={subject} onValueChange={setSubject} options={['Matemática', 'Lengua', 'Ciencias', 'Geografía', 'Convivencia']} />
<Select
  value={long}
  onValueChange={setLong}
  width={280}
  options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link puede ver y comentar']}
/>`}
          >
            <Select value={level} onValueChange={setLevel} width={160} options={['4.º grado', '5.º grado', '6.º grado', '7.º grado']} />
            <Select value={subject} onValueChange={setSubject} options={['Matemática', 'Lengua', 'Ciencias', 'Geografía', 'Convivencia']} />
            <Select
              value={long}
              onValueChange={setLong}
              width={280}
              options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link puede ver y comentar']}
            />
          </Variant>
          <Variant
            name="con un glifo, una carpeta y un avatar"
            note="`leading` es un nodo y no un `IconName`, al revés que el `icon` del `TextField`: lo que va adelante del valor es de quien lo usa."
            code={`<Select
  value={withIcon}
  onValueChange={setWithIcon}
  width={180}
  leading={<Icon name="calculate" size={16} />}
  options={['Matemática', 'Lengua', 'Ciencias']}
/>
<Select
  value={space}
  onValueChange={setSpace}
  width={200}
  leading={<Icon.Folder color="blue" size={16} />}
  options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
/>
<Select
  value={teacher}
  onValueChange={setTeacher}
  width={190}
  leading={<Avatar name="Melina Rivero" size={20} />}
  options={['Melina Rivero', 'Juan Pérez', 'Ana Gómez']}
/>`}
          >
            <Select
              value={withIcon}
              onValueChange={setWithIcon}
              width={180}
              leading={<Icon name="calculate" size={16} />}
              options={['Matemática', 'Lengua', 'Ciencias']}
            />
            <Select
              value={space}
              onValueChange={setSpace}
              width={200}
              leading={<Icon.Folder color="blue" size={16} />}
              options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
            />
            <Select
              value={teacher}
              onValueChange={setTeacher}
              width={190}
              leading={<Avatar name="Melina Rivero" size={20} />}
              options={['Melina Rivero', 'Juan Pérez', 'Ana Gómez']}
            />
          </Variant>
          <Variant
            name="mientras los datos no están"
            note="El del medio alterna cada 2 segundos entre cargando y con datos."
            code={`<Select value="Cargando espacios…" width={200} loading options={[]} />
<Select
  value="Matemática"
  width={180}
  loading
  leading={<Icon name="calculate" size={16} className="icon-muted" />}
  options={['Matemática', 'Lengua']}
/>
<Select
  value={loading ? 'Buscando espacios…' : space}
  onValueChange={setSpace}
  width={200}
  loading={loading}
  options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
/>`}
          >
            <Select value="Cargando espacios…" width={200} loading options={[]} />
            <Select
              value="Matemática"
              width={180}
              loading
              leading={<Icon name="calculate" size={16} className="icon-muted" />}
              options={['Matemática', 'Lengua']}
            />
            <Select
              value={loading ? 'Buscando espacios…' : space}
              onValueChange={setSpace}
              width={200}
              loading={loading}
              options={['Matemática · 4.º A', 'Lengua · 6.º', 'Ciencias · 5.º B']}
            />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="Select" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>{'Es un botón con listbox propio y no un `<select>` nativo: la lista del sistema operativo no se puede estilar.'}</Practices.Do>
          <Practices.Do>Mientras los datos no están va `loading`: no recibe promesas, el estado lo pasa quien carga.</Practices.Do>
          <Practices.Dont>No pongas un spinner por `leading` para simular la carga: el control sigue abriendo una lista vieja.</Practices.Dont>
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
