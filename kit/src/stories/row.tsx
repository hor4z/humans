import cls from './row.module.css'
import { useState } from 'react'
import { Button } from '@humans/ui/button'
import { Row } from '@humans/ui/row'
import { Select } from '@humans/ui/select'
import { Switch } from '@humans/ui/switch'
import { A11y, Anatomy, Demo, Hero, Page, Practices, Props, Section } from '../kit'

export function RowStory() {
  const [suggest, setSuggest] = useState(true)
  const [listed, setListed] = useState(false)
  const [level, setLevel] = useState('Todo el equipo')

  return (
    <Page
      title="Row"
      kind="Superficies"
      imports="import { Row } from '@humans/ui/row'"
      lead="Agrupa el nombre, la descripción y el control de un ajuste."
    >
      <Hero>
        <div className={cls.list}>
          <Row>
            <Row.Label>Sugerir mejoras</Row.Label>
            <Row.Hint>Mientras escribís una consigna</Row.Hint>
            <Switch checked={suggest} onCheckedChange={setSuggest} />
          </Row>
          <Row>
            <Row.Label>Quién ve mis recetas</Row.Label>
            <Select value={level} onValueChange={setLevel} width={180} options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link']} />
          </Row>
        </div>
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Etiqueta" required>`Row.Label`: un `label` de verdad que envuelve solo el nombre; tocarlo acciona el control.</Anatomy.Part>
        <Anatomy.Part name="Línea de apoyo">`Row.Hint`: qué cambia el ajuste, en gris.</Anatomy.Part>
        <Anatomy.Part name="Control">Lo que va a la derecha: un interruptor, un selector, un valor o un botón. Uno solo por fila.</Anatomy.Part>
        <Anatomy.Part name="Separador">Una línea entre una fila y la siguiente, no debajo de todas.</Anatomy.Part>
      </Anatomy>

      <Section title="Ejemplos">
        <Demo fill label="Una lista de ajustes, con y sin control" code={`<Row>
  <Row.Label>Sugerir mejoras</Row.Label>
  <Row.Hint>Mientras escribís una consigna</Row.Hint>
  <Switch checked={suggest} onCheckedChange={setSuggest} />
</Row>
<Row>
  <Row.Label>Aparecer en el directorio</Row.Label>
  <Row.Hint>Otras escuelas pueden encontrarte</Row.Hint>
  <Switch checked={listed} onCheckedChange={setListed} />
</Row>
<Row>
  <Row.Label>Quién ve mis recetas</Row.Label>
  <Select value={level} onValueChange={setLevel} width={180} options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link']} />
</Row>
<Row>
  <Row.Label>Correo</Row.Label>
  <span>melina@humans.app</span>
</Row>
<Row>
  <Row.Label>Contraseña</Row.Label>
  <Row.Hint>La última vez que la cambiaste fue en marzo</Row.Hint>
  <Button size="sm" variant="muted" onClick={changePassword}>Cambiar</Button>
</Row>`}>
          <div className={cls.list}>
            <Row>
              <Row.Label>Sugerir mejoras</Row.Label>
              <Row.Hint>Mientras escribís una consigna</Row.Hint>
              <Switch checked={suggest} onCheckedChange={setSuggest} />
            </Row>
            <Row>
              <Row.Label>Aparecer en el directorio</Row.Label>
              <Row.Hint>Otras escuelas pueden encontrarte</Row.Hint>
              <Switch checked={listed} onCheckedChange={setListed} />
            </Row>
            <Row>
              <Row.Label>Quién ve mis recetas</Row.Label>
              <Select value={level} onValueChange={setLevel} width={180} options={['Solo yo', 'Todo el equipo', 'Cualquiera con el link']} />
            </Row>
            <Row>
              <Row.Label>Correo</Row.Label>
              <span className={cls.accountEmail}>melina@humans.app</span>
            </Row>
            <Row>
              <Row.Label>Contraseña</Row.Label>
              <Row.Hint>La última vez que la cambiaste fue en marzo</Row.Hint>
              <Button size="sm" variant="muted">Cambiar</Button>
            </Row>
          </div>
        </Demo>
      </Section>

      <Section title="Props">
        <Props of="Row" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>{'El texto va en `Row.Label`, que es un `<label>` de verdad: tocarlo acciona el control.'}</Practices.Do>
          <Practices.Do>La fila es para un ajuste que se guarda solo al tocarlo. Un formulario que se completa y se envía, con su ayuda, su error y su asterisco, es un [Field](#field).</Practices.Do>
          <Practices.Dont>No metas dos controles en la misma fila: la etiqueta nombra a uno solo.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>La etiqueta envuelve solo el nombre, así que el control se llama "Avisos por mail" y no "Avisos por mailCuando llega una entrega".</A11y.Item>
          <A11y.Item>Tocar la etiqueta acciona el control, que es blanco de click de sobra para el dedo.</A11y.Item>
          <A11y.Item>Las filas no son botones: lo que se toca es lo que hay adentro, y se ve cuál es.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
