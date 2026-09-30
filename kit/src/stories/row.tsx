import cls from './row.module.css'
import { useState } from 'react'
import { Button } from '@milo/ui/button'
import { Row } from '@milo/ui/row'
import { Select } from '@milo/ui/select'
import { Switch } from '@milo/ui/switch'
import { A11y, Demo, Note, Page, Practices, Props, Section } from '../kit'

export function RowStory() {
  const [suggest, setSuggest] = useState(true)
  const [listed, setListed] = useState(false)
  const [level, setLevel] = useState('Todo el equipo')
  const [notify, setNotify] = useState(true)

  return (
    <Page
      title="Row"
      kind="Superficies"
      imports="import { Row } from '@milo/ui/row'"
      lead="La fila de un panel de ajustes: qué es a la izquierda, con qué se cambia a la derecha. 56 de alto y padding 16/24, iguales en todas, que es lo que hace que una lista de ocho se lea como una sola cosa."
    >
      <Section
        title="Una lista de ajustes"
        note="Las filas se separan con una línea entre una y la siguiente, no debajo de todas: la última no deja una línea suelta contra el fondo del panel."
      >
        <Demo fill code={`<Row>
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
</Row>`}>
          <div className={cls.settingsList}>
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
          </div>
        </Demo>
      </Section>

      <Section
        title="La etiqueta enfoca el control"
        note="Tocá el texto: prende el switch."
      >
        <Demo fill code={`<Row>
  <Row.Label>Avisos por mail</Row.Label>
  <Row.Hint>Cuando llega una entrega</Row.Hint>
  <Switch checked={notify} onCheckedChange={setNotify} />
</Row>`}>
          <div className={cls.labelFocusList}>
            <Row>
              <Row.Label>Avisos por mail</Row.Label>
              <Row.Hint>Cuando llega una entrega</Row.Hint>
              <Switch checked={notify} onCheckedChange={setNotify} />
            </Row>
          </div>
        </Demo>
      </Section>

      <Section
        title="Lo que va a la derecha no siempre es un control"
        note="Un valor que no se edita acá, un botón que lleva a otro lado: la fila sirve igual."
      >
        <Demo fill code={`<Row>
  <Row.Label>Correo</Row.Label>
  <span>melina@milo.app</span>
</Row>
<Row>
  <Row.Label>Contraseña</Row.Label>
  <Row.Hint>La última vez que la cambiaste fue en marzo</Row.Hint>
  <Button size="sm" variant="muted" onClick={changePassword}>Cambiar</Button>
</Row>`}>
          <div className={cls.rightSideList}>
            <Row>
              <Row.Label>Correo</Row.Label>
              <span className={cls.accountEmail}>melina@milo.app</span>
            </Row>
            <Row>
              <Row.Label>Contraseña</Row.Label>
              <Row.Hint>La última vez que la cambiaste fue en marzo</Row.Hint>
              <Button size="sm" variant="muted">Cambiar</Button>
            </Row>
          </div>
        </Demo>
      </Section>

      <Note title="Row o Field">
        La fila es para un ajuste que se guarda solo al tocarlo. Si lo que hay es un formulario que
        se completa y se envía (con su ayuda, su error y su asterisco) eso es un
        [Field](#field), que es otra pieza y
        otra forma de leer.
      </Note>

      <Section title="Props">
        <Props of="Row" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>{'El texto va en `Row.Label`, que es un `<label>` de verdad: tocarlo acciona el control.'}</Practices.Do>
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
