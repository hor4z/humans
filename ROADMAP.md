# Lo que falta

Lo decidido está en `CLAUDE.md` y en el kit. Esto es lo que todavía no se hizo, y por qué.

## Antes que nada

- **Un consumidor de verdad.** Se instaló desde el propio git en un proyecto de prueba, que prueba
  `prepare` y `files`, pero nadie lo importó en producción. El primero va a encontrar lo que falte.
- **Portar los tokens a `~/melu/packages/ui`**, que es para lo que existe todo esto. Ojo: ese repo
  sigue llamándose `melu`.

## Piezas que faltan, en orden de cuánto las pide un aula

| | por qué todavía no |
|---|---|
| bloque de preguntas y respuestas | del editor. Hoy lo suple un `CompareTable` de una columna, que corta la pregunta: `Table.Title` trunca a propósito. No hay que adaptar `Table` ni `CompareTable` |
| bloque de tabla dinámica | del editor: que quien escribe arme las columnas y las filas. Las dos tablas de hoy reciben su forma por prop |
| campo de fichas | asignar personas a una entrega. `Chip` ya dibuja la ficha; falta el campo que las arma |
| menú contextual | el clic derecho sobre un bloque. `Menu` y `Popover` ya están: falta la posición y la tecla de menú |
| imágenes, como fundamento | `Figure` resuelve la pieza; falta la doctrina de proporción, carga y texto alternativo |
| deshacer | hoy vive en el `Toast` con acción, que alcanza para una acción por vez y no para un editor |
| imprimir | un docente imprime una consigna, y no hay hoja de estilos de impresión |
| de derecha a izquierda | no hay idiomas que lo pidan; si aparece, cambia el layout y no las piezas |

Los dos primeros son bloques del editor, así que antes de escribirlos hay que decidir si van en
`src/blocks/` o en el editor de la plataforma. El corte es el de las dos capas: una forma que se
repite en cualquier producto es de acá; una que define la consigna que resuelve, no.

## Decisiones abiertas

- **El lienzo, antes que los manipulables y que el editor de nodos.** Los dos necesitan pan, zoom,
  selección y el teclado para todo eso. Si se arman por separado, quedan dos sistemas.
- **La gramática de un manipulable**: cómo avisa que se puede agarrar, qué devuelve al moverlo, qué
  pasa sin mouse, y la línea entre explorar y evaluar. Uno donde equivocarse es parte de entender no
  puede usar el rojo de error.
- **Táctil en las piezas compactas.** Los controles llegan a 44 con `pointer: coarse`; `Checkbox`,
  `Radio`, `Switch`, el tachito de `Chip` y de `Search`, `Breadcrumb`, `Segmented`, `Tabs` y `Menu`
  no. Varias son compactas a propósito, así que subirlas es una decisión sobre cómo se siente el
  sistema en un teléfono. Está en Fundamentos › Accesibilidad.
- **Los iconos sin uso.** `npm run icons -- check` los lista. Sacarlos achica la fuente a menos de
  la mitad, pero el editor y los gráficos van a consumir varios, y volver a traer uno es `icons add`.
- **`ss04` y el cero barrado** piden auto-alojar Inter (unos 70 KB subseteada a latín). Se eligió el
  CDN; si una red escolar filtra Google Fonts, se da vuelta.
- **El bundle del sitio** entra en uno solo y `vite build` avisa. La salida es `lazy` por historia
  con un `Skeleton`, al costo de un parpadeo por navegación.
- **El riel del kit no usa `Nav`**: tiene subitems con chevron, que `Nav` no trae. O `Nav` gana
  grupos plegables, o el riel se queda con su `SideLink`.
- **El espaciado del CSS no tiene guardián.** El que había leía utilidades de Tailwind, que ya no
  existen. Medido al sacarlo: unos 36 valores de padding, margin y gap caen fuera de la grilla de
  Medidas (2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48), casi todos de 6 y de 10. Cada uno hay que
  mirarlo en pantalla antes de moverlo, y recién ahí escribir el guardián que lea el CSS.
- **Las notas amarillas del kit** leen la rampa `--yellow-*` directo. El kit es un consumidor y
  puede, pero si otra app quiere la misma nota, eso es un rol que falta.
