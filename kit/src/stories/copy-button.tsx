import { CopyButton } from '@humans/ui/copy-button'
import { TextField } from '@humans/ui/text-field'
import { A11y, Anatomy, Hero, Page, Panel, Practices, Props, Section, Variant } from '../kit'

export function CopyButtonStory() {
  return (
    <Page
      title="CopyButton"
      kind="Acciones"
      imports="import { CopyButton } from '@humans/ui/copy-button'"
      lead="Copia texto al portapapeles y comunica si la operación se completó."
    >
      <Hero>
        <CopyButton value="npm install @humans/ui" />
        <TextField
          readOnly
          value="https://milo.escuela/act/fracciones-equivalentes"
          aria-label="Enlace para compartir"
          suffix={<CopyButton size="sm" value="https://milo.escuela/act/fracciones-equivalentes" label="Copiar el enlace" />}
        />
      </Hero>

      <Anatomy>
        <Anatomy.Part name="Icono" required>El de copiar, que pasa a un tilde cuando el texto ya está en el portapapeles.</Anatomy.Part>
        <Anatomy.Part name="Nombre">`label` y `copiedLabel`: no se ven, son el nombre accesible antes y después de copiar.</Anatomy.Part>
      </Anatomy>

      <Section title="La pieza">
        <Panel>
          <Variant
            name="sm · md · lg y adentro de un campo"
            note="`sm` va adentro de un campo o de una fila y `md` suelto. El caso más común es un enlace para compartir, que se lee y se copia sin seleccionarlo a mano."
            code={`<CopyButton size="sm" value="npm install @humans/ui" />
<CopyButton value="npm install @humans/ui" />
<CopyButton size="lg" value="npm install @humans/ui" />
<TextField
  readOnly
  value="https://milo.escuela/act/fracciones-equivalentes"
  aria-label="Enlace para compartir"
  suffix={<CopyButton size="sm" value="https://milo.escuela/act/fracciones-equivalentes" label="Copiar el enlace" />}
/>`}
          >
            <CopyButton size="sm" value="npm install @humans/ui" />
            <CopyButton value="npm install @humans/ui" />
            <CopyButton size="lg" value="npm install @humans/ui" />
            <TextField
              readOnly
              value="https://milo.escuela/act/fracciones-equivalentes"
              aria-label="Enlace para compartir"
              suffix={<CopyButton size="sm" value="https://milo.escuela/act/fracciones-equivalentes" label="Copiar el enlace" />}
            />
          </Variant>
        </Panel>
      </Section>

      <Section title="Props">
        <Props of="CopyButton" />
      </Section>

      <Section title="Cómo se usa bien">
        <Practices>
          <Practices.Do>Ponelo al lado de lo que se copia, no lejos.</Practices.Do>
          <Practices.Dont>No supongas que copió: si el navegador no deja, la pieza no miente y tampoco tenés que mentir vos.</Practices.Dont>
        </Practices>
      </Section>

      <Section title="Accesibilidad">
        <A11y>
          <A11y.Item>El nombre del botón cambia a "Copiado", así que el estado no depende solo del glifo.</A11y.Item>
          <A11y.Item>Además lo anuncia por la región viva: un cambio de icono no lo ve quien escucha la pantalla.</A11y.Item>
          <A11y.Item>Si copiar falla, no se anuncia nada y el nombre no cambia.</A11y.Item>
        </A11y>
      </Section>
    </Page>
  )
}
