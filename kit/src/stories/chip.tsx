import cls from './chip.module.css'
import { useState } from 'react'
import { Card } from '@milo/ui/card'
import { Chip } from '@milo/ui/chip'
import { labelColors } from '@milo/ui/lib/colors'
import { A11y, Anatomy, Cluster, Demo, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function ChipStory() {
  const [chips, setChips] = useState(['Indagación', 'Proyecto', 'Taller'])
  const [subjects, setSubjects] = useState([{ name: 'Matemática', color: 'blue' as const }, { name: 'Lengua', color: 'pink' as const }])

  return (
    <Page
      title="Chip"
      kind="Datos"
      imports="import { Chip } from '@milo/ui/chip'"
      lead="La marca chica de texto, y hay una sola. Dice en qué estado está una actividad, o nombra una categoría, un método o una persona. Siempre con texto: un punto de color no dice el estado, y menos para quien no distingue colores."
    >
      <Hero>
        <Chip>Borrador</Chip>
        <Chip color="ok" icon="check_circle">Corregida</Chip>
        <Chip color="warn" icon="schedule">Vence mañana</Chip>
        <Chip color="blue" dot>En curso</Chip>
        <Chip avatar={{ name: 'Ana Pérez', src: '/avatars/04.webp' }}>Ana Pérez</Chip>
        <Chip color="pink" onRemove={() => {}}>Lengua</Chip>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Texto" required>Lo que el chip dice. El estado vive acá y no en el color.</Anatomy.Part>
        <Anatomy.Part name="Marca de la izquierda">Un glifo (`icon`), un punto (`dot`) o la cara de una persona (`avatar`).</Anatomy.Part>
        <Anatomy.Part name="Cruz">Con `onRemove`, un botón para quitarlo, con su propio nombre.</Anatomy.Part>
        <Anatomy.Part name="Caja">`sm` mide 20 y va pegado a un título o adentro de una celda; `md` mide 28 y es el default.</Anatomy.Part>
      </Anatomy>

      <Section title="Tamaños y colores">
        <Panel>
          <Variant
            name="sm y md"
            note="Con `avatar`, la marca de la izquierda es la cara de una persona y no un glifo."
            code={`<Chip size="sm">Borrador</Chip>
<Chip size="sm" color="ok" icon="check_circle">Corregida</Chip>
<Chip>Borrador</Chip>
<Chip color="ok" icon="check_circle">Corregida</Chip>
<Chip avatar={{ name: 'Martín Roldán' }}>Martín Roldán</Chip>
<Chip size="sm" avatar={{ name: 'Bruno Díaz', src: '/avatars/05.webp' }}>Bruno Díaz</Chip>`}
          >
            <Chip size="sm">Borrador</Chip>
            <Chip size="sm" color="ok" icon="check_circle">Corregida</Chip>
            <Chip>Borrador</Chip>
            <Chip color="ok" icon="check_circle">Corregida</Chip>
            <Chip avatar={{ name: 'Martín Roldán' }}>Martín Roldán</Chip>
            <Chip size="sm" avatar={{ name: 'Bruno Díaz', src: '/avatars/05.webp' }}>Bruno Díaz</Chip>
          </Variant>
          <Variant
            name="estado y categoría"
            note="Los cuatro de estado significan lo mismo que en `Alert` y en `Toast`. Los seis de categoría van en su **par suave**, porque un chip nunca viene solo."
            code={`<Chip color="info">En prueba</Chip>
<Chip color="ok">Corregida</Chip>
<Chip color="warn">Vence mañana</Chip>
<Chip color="bad">Sin entregar</Chip>
{labelColors.map(c => <Chip key={c} color={c}>{c}</Chip>)}
<Chip>Indagación</Chip>`}
          >
            <Chip color="info">En prueba</Chip>
            <Chip color="ok">Corregida</Chip>
            <Chip color="warn">Vence mañana</Chip>
            <Chip color="bad">Sin entregar</Chip>
            {labelColors.map(c => <Chip key={c} color={c}>{c}</Chip>)}
            <Chip>Indagación</Chip>
          </Variant>
        </Panel>
      </Section>

      <Section title="Lo que lleva y lo que hace">
        <Panel>
          <Variant
            name="icono y punto"
            note="El glifo sirve para reconocerlo de reojo; el punto, para cuando no hay glifo que sirva."
            code={`<Chip color="green" icon="check">Corregida</Chip>
<Chip color="orange" icon="schedule">Vence mañana</Chip>
<Chip color="blue" dot>En curso</Chip>
<Chip color="pink" dot>Borrador</Chip>`}
          >
            <Chip color="green" icon="check">Corregida</Chip>
            <Chip color="orange" icon="schedule">Vence mañana</Chip>
            <Chip color="blue" dot>En curso</Chip>
            <Chip color="pink" dot>Borrador</Chip>
          </Variant>
          <Variant
            name="activo, clickeable y removible"
            note="Sin `onClick` ni `onRemove` es un texto; con uno, un botón; con los dos, dos botones hermanos."
            code={`<Chip active>Elegido</Chip>
<Chip onClick={openFilter}>Se toca</Chip>
{chips.map(c => (
  <Chip key={c} onRemove={() => setChips(cs => cs.filter(x => x !== c))}>{c}</Chip>
))}
{subjects.map(x => (
  <Chip key={x.name} color={x.color} onClick={openSubject} onRemove={() => removeSubject(x)}>{x.name}</Chip>
))}`}
          >
            <Chip active>Elegido</Chip>
            <Chip onClick={() => {}}>Se toca</Chip>
            {chips.map(c => (
              <Chip key={c} onRemove={() => setChips(cs => cs.filter(x => x !== c))}>{c}</Chip>
            ))}
            {subjects.map(x => (
              <Chip key={x.name} color={x.color} onClick={() => {}} onRemove={() => setSubjects(xs => xs.filter(y => y !== x))}>{x.name}</Chip>
            ))}
            {chips.length === 0 && <span className={cls.emptyNote}>se fueron todos: recargá para volver a verlos</span>}
          </Variant>
        </Panel>
      </Section>

      <Section title="Dónde va">
        <Demo label="en la cabecera de una tarjeta" code={`<Card>
  <Card.Header>
    <Card.Title>Fracciones equivalentes</Card.Title>
    <Chip size="sm" color="ok" icon="check_circle">Corregida</Chip>
  </Card.Header>
  <Card.Body>
    <p>Matemática · 4.º A · 24 entregas</p>
  </Card.Body>
</Card>
<Card>
  <Card.Header>
    <Card.Title>Mapa de América</Card.Title>
    <Chip size="sm" color="warn" icon="schedule">Vence mañana</Chip>
  </Card.Header>
  <Card.Body>
    <p>Sociales · 5.º A · 3 de 7</p>
  </Card.Body>
</Card>`}>
          <Cluster gap="lg" align="start">
            <Card className={cls.correctedCard}>
              <Card.Header>
                <Card.Title>Fracciones equivalentes</Card.Title>
                <Chip size="sm" color="ok" icon="check_circle">Corregida</Chip>
              </Card.Header>
              <Card.Body>
                <p className={cls.correctedMeta}>Matemática · 4.º A · 24 entregas</p>
              </Card.Body>
            </Card>
            <Card className={cls.dueCard}>
              <Card.Header>
                <Card.Title>Mapa de América</Card.Title>
                <Chip size="sm" color="warn" icon="schedule">Vence mañana</Chip>
              </Card.Header>
              <Card.Body>
                <p className={cls.dueMeta}>Sociales · 5.º A · 3 de 7</p>
              </Card.Body>
            </Card>
          </Cluster>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Chip" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Los de estado usan los tonos y los de categoría la familia de etiquetas: son dos cosas distintas.</Practices.Do>
          <Practices.Do>Pegalo a lo que describe: una marca lejos de su sujeto obliga a adivinar de qué está hablando. En una tarjeta va en la cabecera, al lado del título; en una fila de tabla, en su columna.</Practices.Do>
          <Practices.Dont>El estado no puede depender solo del color: el texto lo dice también.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El estado está en el texto, no en el color: quien no distingue tonos lee lo mismo.</A11y.Item>
          <A11y.Item>{'Sin onClick ni onRemove es un <span>: no entra en el orden de tabulación algo que no hace nada.'}</A11y.Item>
          <A11y.Item>El glifo es decorativo y no se anuncia dos veces: lo que se lee es el texto.</A11y.Item>
          <A11y.Item>La cruz de quitar es un botón con su propio nombre, así que se puede usar con el teclado.</A11y.Item>
          <A11y.Item>Un chip que se toca y se saca son dos botones hermanos y no uno adentro del otro: anidados, tocar la cruz disparaba también el click del chip.</A11y.Item>
          <A11y.Item>El contraste de cada color contra su fondo está verificado en los dos temas, y hay tests que fallan si alguien lo rompe.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
