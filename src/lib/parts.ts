import { Children, Fragment, isValidElement, type ElementType, type ReactNode } from 'react'

/** Una parte sin contenido es como si no estuviera: si no, un `<Menu.Shortcut>{undefined}</Menu.Shortcut>` dibuja el hueco igual. */
function hasContent(node: ReactNode): boolean {
  if (node === null || node === undefined || node === false || node === '') return false
  if (Array.isArray(node)) return node.some(hasContent)
  if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) return hasContent(node.props.children)
  return true
}

/** `Children.toArray` aplana un array pero no un fragment, y una parte adentro de uno desaparecería sin decir nada: pasa eso justo al escribir un condicional. */
function flatten(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(c =>
    isValidElement<{ children?: ReactNode }>(c) && c.type === Fragment
      ? flatten(c.props.children)
      : [c],
  )
}

/** Separa de los hijos los que son de un tipo: una parte que la pieza dibuja en otro lugar del marco. Devuelve `[la parte, el resto]`, y descarta la parte que quedó vacía. */
export function takePart(children: ReactNode, part: ElementType): [ReactNode[], ReactNode[]] {
  const all = flatten(children)
  const isPart = (c: ReactNode) => isValidElement(c) && c.type === part
  return [all.filter(c => isPart(c) && isValidElement<{ children?: ReactNode }>(c) && hasContent(c.props.children)), all.filter(c => !isPart(c))]
}
