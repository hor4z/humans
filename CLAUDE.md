# milo · design system

La identidad de milo en tokens, las piezas que la usan y el sitio donde se ve todo funcionando.
Cada pieza es el componente real, con su teclado, sus estados y sus tests. **El repo es del design
system y de nada más**: el producto se arma aparte, consumiendo el paquete.

Lo que se decide acá se porta a `~/melu/packages/ui`, que es otro repo y todavía se llama `melu`.
Este es `milo` (`hor4z/milo`). Lo que falta está en `ROADMAP.md`.

```sh
npm install
npm run dev           # el sitio en http://localhost:5190, con la caché de vite limpia
npm run typecheck     # el paquete y el sitio
npm test              # vitest y testing-library
npm run test:changed  # solo lo que toca el cambio
npm run test:guards   # solo los guardianes que leen el repo entero
npm run build         # el paquete a dist/: js, css y tipos
npm run kit           # el sitio a kit/dist
npm run props         # la tabla de props, desde los tipos
npm run paths         # el paths de tsconfig.json y el exports de cada familia de bloques
npm run icons -- …    # search · add · check · refresh (ver Iconos)
npm run mascotas      # los archivos de una mascota (hay una skill para eso)
```

Ningún número de este archivo cuenta piezas, tests ni iconos: se desactualizan. Los cuenta el
comando.

## Cómo se escribe

- **Ni raya larga ni comillas angulares, en ningún lado**: código, interfaz, commits, PRs y
  respuestas. Delatan un texto escrito por una máquina. Van los dos puntos, la coma, el paréntesis
  y las comillas dobles. Hay un test.
- **El código va en inglés y lo que se lee en castellano.** Identificadores, tipos, props y clases
  en inglés; comentarios, textos de la interfaz, nombres de los tests y contenido de ejemplo en
  castellano. No hay una tercera categoría.
- **El código no lleva comentarios.** Solo el docblock `/** */` de una línea por export y por prop,
  que es lo que lee `npm run props` y lo que muestra el editor. El porqué de una decisión va acá o
  en la nota de su vista del kit. Hay un test.

## Las dos capas

- **La base** (`src/<pieza>`) es lo primitivo: botones, campos, overlays, avisos, superficies,
  tabla, gráfico. Se importa `@milo/ui/button`.
- **Los bloques** (`src/blocks/<familia>/<pieza>`) son lo complementario: piezas armadas con la
  base que ponen al sistema en su uso real. Las familias son `editor`, `task` (la consigna),
  `rubric` y `media`. Se importa `@milo/ui/blocks/editor/callout`.
- **La base nunca importa un bloque, y un bloque no escribe en `:root`.** Sus custom properties
  (`--band`, `--icon-size`) son locales a su clase. Si la base necesita algo de un bloque, eso no era
  un bloque; si a un bloque le falta un rol, el rol es de la base. Hay dos tests.
- **Dónde va una pieza nueva**: a la base si su forma se repite en cualquier producto; a un bloque
  si lo que la define es el contexto que resuelve.
- Lo que es del sitio y no del sistema (`settings-modal`, `prefs`, `folder`) vive en
  `kit/src/demo/`, con su test, y no sale en el paquete.

`scripts/pieces.mjs` es la única lista de piezas: la leen el build, `paths`, `props` y los
guardianes. Una pieza nueva es una carpeta nueva y nada más.

## Arquitectura

React 19 y Vite, y **ninguna librería de estilo**: CSS nativo en módulos, contra tokens que también
son CSS nativo.

```
src/styles/tokens/primitives.css   los valores crudos: la rampa, los tintes, el azul
src/styles/tokens/semantic.css     los roles: --surface, --border, --text, --relief-*
src/styles/tokens/scales.css       radios, medidas, tipografía, pesos, movimiento
src/styles/reset.css · base.css    lo que el navegador trae de más, y las clases globales
src/theme.css                      el orden de las capas y los imports de arriba
<pieza>/<pieza>.module.css         el estilo de esa pieza y de ninguna otra
```

- **Una app sí puede usar Tailwind**, armando su `@theme` encima de los tokens. Acá adentro, no:
  un estilo se escribe una vez, en el módulo de su pieza.
- **El orden de las capas se declara en `theme.css` y antes que nada**, porque una capa vale por
  dónde se la declara. Por eso `app.css` va en la primera línea de `main.tsx`: las dos veces que
  esto mordió fue el reset ganándole a todo.
- **Una clase global de `base.css` va sin capa, así que le gana a cualquier módulo.** Cuando las
  dos tienen que convivir, la receta se compone en `base.css`, no se pelea desde el módulo.
- **`touch-target`** agranda el blanco de toque a 44 con un `::after`, solo con `pointer: coarse` y
  sin mover la caja. Va solo en un botón: en un campo se quedaría con el tap que iba al `input`,
  así que los campos suben la caja de verdad. La pone la pieza, que sabe de qué tamaño es.
- **`.group` y `.peer` no dibujan nada**: existen para que un módulo cuelgue de ellas con
  `:global(.group)` y estile a un hijo según el estado del padre.

## Reglas al escribir código

- **Solo contra roles.** Una pieza no sabe que existe `--shade-03`, sabe que hay un
  `--surface-muted`. Un hex o un escalón de la rampa en una pieza es un bug. Hay un test.
- **Sin barril.** Cada pieza entra por su subpath. `src/index.ts` existió, ataba cada test a todas
  las piezas y hacía que `vitest --changed` corriera siempre la suite entera.
- **Todo en kebab**, archivo y carpeta, porque el nombre del archivo es el del subpath. Hay un test.
- **Una carpeta por pieza, con su test al lado, y una pieza no vive adentro de otra.** Una carpeta
  con nombre de caso de uso es un cajón: `filter/` llegó a esconder un buscador que terminó
  dibujado a mano en tres lugares.
- **Las partes cuelgan de la raíz**: `Modal.Header`, `Nav.Item`. Se declaran con nombre corto y
  local y se arma el namespace ahí (`Object.assign(Root, { Header })`): `ModalHeader` no existe en
  ningún lado.
- **El contenido va como hijo, nunca en una prop**: `<Progress.Label>` y no `label="…"`. Siguen
  siendo prop lo que no se ve (un `aria-label`, un `src`, un `value`), lo que la pieza necesita
  como string y los datos que vienen en array (`Task`, `DropdownItem`).
- **El handler se llama por lo que controla**: `value` y `onValueChange(value)`, `checked` y
  `onCheckedChange`, `pressed` y `onPressedChange`, `open` y `onOpenChange`. `onChange` queda para
  el evento nativo. Una pieza con un valor compuesto devuelve el valor entero, no la celda. Hay un
  test.
- **Los tamaños son `sm · md · lg`**, las alturas 36 · 40 · 44 y los iconos 16 · 20 · 24. Una pieza
  puede tener menos escalones, no otros nombres; lo que no es un tamaño es una variante
  (`compact`).
- **El gris de un icono es la clase `icon-muted`, y no se alterna entre estados**: también sube el
  peso de la fuente, y el glifo se mueve adentro de su caja. Si el color cambia con el estado, el
  peso va fijo (`weight={400}`) y el color sale del módulo. Por eso `Icon` no escribe
  `--icon-wght` salvo que le pasen `weight`.
- **Un campo no sabe dónde cae.** La superficie que lo contiene escribe `--field-bg`, y el
  `Spinner` con `on="control"` hace lo mismo con `--spinner-bg`.

## Cómo se llama una clase

Inglés y camelCase, sin número al final. Kebab es de las globales (`icon-muted`, `field-focus`), así
que mirando una clase se sabe de dónde sale; y kebab en un módulo apaga a los guardianes, que leen
`[A-Za-z]\w*`. Una clase de módulo no pisa el nombre de una global. Hay tests para las tres cosas.

El nombre sale, en este orden:

1. **de la parte que la pieza expone**: `Card.Header` es `header`;
2. **de lo que contiene, en plural**, y la unidad en singular: `items` e `item`;
3. **de la condición bajo la cual se aplica**, nunca de la prop de la que salió. La del `TaskList`
   se llamaba `readOnly` y se aplicaba cuando **no** era de solo lectura.

Si dos reglas dan ganas de numerarlas, lo que las separa es el nombre: `trackRest` y `trackActive`.

| papel | palabras |
|---|---|
| partes | `root` `header` `body` `footer` `title` `hint` `actions` `icon` `trailing` `count` `separator` `swatch` |
| listas | `items` `item` `groupLabel` |
| overlays | `viewport` `veil` `panel` `trigger` `arrow` |
| barras | `track` `fill` `thumb` `tick` |
| campos | `control` `input` `suffix` `chevron` |
| estado | `selected` `active` `current` `disabled` `editable` `interactive` `dragging` `loading` `empty` `placeholder` `danger` `open` `horizontal` `vertical` `compact` `muted` `bordered` |

**`selected`, `active` y `current` son tres cosas**: el valor elegido, dónde está el cursor del
teclado y dónde estás parado en una secuencia. Cada una tiene su complemento: **`idle`** es lo que
no tiene el cursor, **`plain`** lo que no recibió tratamiento de elección ni de tono, y un
interruptor va con **`on`/`off`**.

El vocabulario de la API no se unificó (hay seis palabras para el texto de apoyo), así que las
clases eligieron una y la usan en todas: en `Alert` la clase se llama `text` aunque la parte sea
`Alert.Body`.

## Overlays

Viven en `portal/`, `popover/`, `tooltip/`, `dropdown/`, `modal/`, `sheet/` y `confirm-dialog/`, con
`lib/overlay-hooks`, `lib/esc` y `lib/dismiss` para lo compartido.

- **El `Portal` crea su host durante el render**, no en un effect: si no, el primer render devuelve
  `null` y quien mide o enfoca el contenido no lo encuentra.
- **El foco se pone y se verifica** durante dos frames, porque el nodo puede desprenderse y volver a
  colgarse entre el effect y el frame siguiente.
- **Se enfoca el contenedor del diálogo, no su primer control**, con `preventScroll`: enfocar el
  primero abría el panel corrido. `[data-autofocus]` para el que sí quiere un campo.
- **`Escape` usa una pila global** y cierra el de arriba.
- **El bloqueo de scroll compensa la scrollbar** y cuenta los overlays anidados.
- **Todo lo que se mide contra un disparador y se dibuja en un portal se cierra solo** al scrollear
  la página, con `useDismiss`. El `scroll` en captura se filtra por origen (si no, scrollear la
  lista del propio panel lo cierra) y el filtro pregunta si el target es un `Node` antes de usar
  `contains`. Un `resize` cierra siempre. Hay un test.
- **Se cierra con `pointerdown` y no con `click`**, o el gesto que abre otro panel cierra y reabre.
- **Al cerrar, el foco vuelve al disparador solo si estaba adentro del panel.**
- **El `Select` es un botón con listbox propio**: la lista de un `<select>` nativo la dibuja el
  sistema operativo, y en Linux aparece un control de GTK. El costo es el teclado a mano.

## Dónde está escrito cada porqué

El porqué de una decisión de diseño vive en el kit, que la muestra funcionando y tiene tests que la
sostienen. Si una decisión no está en ninguna vista, todavía no se tomó.

| si vas a tocar | leé | los valores |
|---|---|---|
| la escala de texto y los pesos | Fundamentos › Tipografía | `scales.css` |
| la rampa, el azul, las superficies | Fundamentos › Color | `primitives.css` · `semantic.css` |
| el espaciado y los radios | Fundamentos › Medidas y radios | `scales.css` |
| los cortes y el ancho de lectura | Fundamentos › Layout | `scales.css` |
| las sombras | Fundamentos › Relieve | `semantic.css` |
| hover, foco, vacío, cargando, error | Fundamentos › Estados | |
| contraste, teclado, lectores, táctil | Fundamentos › Accesibilidad | `__tests__/contraste.test.ts` |
| el set de iconos | Fundamentos › Iconos | `scripts/icons.mjs` |
| fechas, números, medios, texto | Fecha y hora · Números · Medios · Cómo se escribe | `lib/time` · `lib/number` |

Una vista de Fundamentos existe si hay un token, una pieza o un test que la sostenga; si no, es
prosa, y la prosa se despega en silencio.

**Cada vista de pieza sigue la misma plantilla**: la portada con su `import`, las demos, Props,
"Cómo se usa bien" y Accesibilidad, en ese orden. **Cada `Demo` y cada `Variant` lleva el código que
la dibuja**, debajo: es lo que permite revisar la API mirando, y si la pieza se ve bien pero su
código no, la pieza está mal. Cada hecho se dice en un solo lugar: la API en el docblock, la
decisión en "Cómo se usa bien", el comportamiento en Accesibilidad. Una `note` de sección dice qué
hacer en dos líneas. Hay tests para la plantilla.

La referencia externa son las Human Interface Guidelines de Apple, salvo lo que es de una app nativa.
Brainwave 2 (UI8) fue la referencia de arranque y **no está licenciado acá**: se tomaron medidas y
recetas de sombra, no pantallas. No seguir igualándolo: el conjunto armado es lo que UI8 vende.

## Patrones que el sistema da por decididos

- **La acción que manda es `brand`, y hay una por pantalla.** `solid` es el mismo rol en tinta para
  donde el azul no se puede usar: va uno o el otro.
- **Lo que se deshace no va en rojo.** `bad` es para lo que no tiene vuelta: "Cerrar sesión" no.
- **Una superficie es 16** (`--radius-xl`): tarjeta, fila, panel flotante, modal, diálogo.
- **Un radio se elige contra el alto de la pieza, no contra su tipo.** Sobre un item de 40, 16 se
  lee como pastilla: va `lg`, que es el radio del panel menos su relleno.
- **Un item elegido se marca con una barra de 2px a la izquierda**, sin fondo ni borde, en el `Nav`
  y en el riel de Ajustes.
- **Las tarjetas no se mueven en hover** ni tienen acciones que aparecen al pasar el mouse.
- **El movimiento dice de dónde vino algo y adónde se fue.** `--duration-fast` (120) acompaña al
  dedo, `--duration-normal` (190) es lo que aparece o se va, `--duration-content` (280) es contenido
  que se abre. `--ease-out` entra, `--ease-in` sale, y salir es más corto. El anillo de foco y el
  esqueleto no se mueven. Con `prefers-reduced-motion` lo que informa por moverse se queda con
  otra salida: el spinner gira lento, no quieto.
- **Ajustes en un modal, no en una página**: al cerrar seguís donde estabas. Un panel que pide
  leerse entero lleva velo (`Popover` con `veil`), sin blur.
- **Una zona de riesgo es un `Alert tone="bad"`** con `role="group"`: la receta visual se reusa, la
  urgencia de `role="alert"` no.
- **Una confirmación no lleva X**, y con `tone="bad"` el foco arranca en cancelar.
- **Un diálogo se arma con sus partes y el cuerpo es lo que scrollea.** El nombre sale del título
  que se ve.

## Iconos

Salen de Material Symbols, y **el set crece solo por `icons add`**, que antes de bajar nada
pregunta si el nombre existe, si ya lo tenemos y si hay uno parecido en el set (así no se llega a
seis engranajes). `icons check` corre al lado de `typecheck`: falla con un glifo usado que no está,
y lista los que están sin uso. El catálogo está versionado en `scripts/catalog.json` para buscar sin
internet, y sus tags están en inglés.

## Cómo lo consume otro proyecto

No está en npm: se instala desde GitHub, clavado a un tag.

```sh
npm install "@milo/ui@git+ssh://git@github.com/hor4z/milo.git#v0.1.0"
```

- El consumidor necesita acceso de lectura: una clave SSH, o un token por variable de entorno en
  CI. **Un token nunca se escribe en un repo ni en un `package.json`.**
- **El consumidor compila el paquete**: `npm install` corre `prepare`, que es `npm run build`. Si el
  build falla acá, falla su instalación.
- `.npmignore` existe para que npm no lea `.gitignore`, que ignora `dist/`. Lo que entra lo decide
  `files`: `dist/` y `src/` sin tests.
- **Una rama no es un contrato, un tag sí**: `npm version <patch|minor|major>` y
  `git push --follow-tags`.
- El `exports` resuelve `./lib/*`, `./*` y una entrada por familia de bloques, que escribe
  `npm run paths` porque un patrón con estrella no puede repetir la familia en la ruta.
- El CSS va antes que cualquier estilo de la app y en este orden: `@milo/ui/theme.css` (las capas,
  los tokens y las globales, servido sin compilar) y `@milo/ui/style.css` (las piezas, del build).
  Van juntos o no va ninguno.
- React 19 y `react-dom` 19 son peer dependencies.

## El sitio

`kit/` es una carpeta con su propio `vite.config.ts`, no un paquete. **Consume las piezas como
cualquier app de afuera**: los alias resuelven `@milo/ui/<pieza>` a `src/`, y una ruta relativa
hacia `src/` desde `kit/` es un bug. El riel se parte en Sistema y Bloques, con el dashboard y el
documento al final como la prueba de que las piezas juntas funcionan. Los nombres del riel van en
castellano y el nombre técnico queda como sinónimo de búsqueda.

## Los tests

Prueban comportamiento (teclado, nombres accesibles, estados) y no markup. El de cada pieza vive en
su carpeta. Los guardianes en `src/__tests__` y `kit/src/__tests__` leen el repo entero y fallan si:

- una pieza escribe un color a mano, o un `var()` nombra algo que nadie declara: eso no falla en el
  navegador, invalida la declaración entera en silencio;
- un radio sale de la escala, un tamaño de letra va sin su interlineado y su tracking, o el peso de
  portada aparece fuera del tamaño portada;
- una duración o una curva no sale de un token;
- queda una clase de módulo sin usar, o `s.algo` nombra una que el módulo no declara;
- una clase no dice por qué existe: kebab, un número al final, la etiqueta sola;
- un export no se alcanza por su subpath, un archivo lleva mayúscula, o `paths` o `props.gen` quedaron
  viejos;
- la base importa un bloque, o un bloque declara tokens;
- un handler no se llama por lo que controla;
- el código lleva un comentario, o aparece una raya larga o una comilla angular;
- un `<button>` no tiene `type`, o un panel anclado no usa `useDismiss`;
- una vista se sale de la plantilla, una demo no lleva su código, o un control de una demo no
  responde;
- algo no pasa el contraste, en los dos temas.

Y hay tests que **dibujan** todas las vistas y el sitio entero: una vista que tira al dibujarse, un
`**` que quedó a la vista, una clase literal que no resuelve a nada, un botón de la portada que
manda a una vista que no existe.

**Lo que ninguno ve**: `vitest` corre con `css: false`, así que los CSS Modules son un stub y
`s.loQueSea` nunca es `undefined`. Un bug de CSS que rompe una pieza a la vista no lo agarra ningún
test de comportamiento: lo agarra un guardián que lee el CSS, o se mide en un navegador. Para
asertar sobre estilo, `__tests__/estilo.ts` resuelve la clase contra el módulo del que salió.

**JSX se come el espacio**: un texto que toca un elemento inline a través de un salto de línea se
pega (`el\n<code>Alert</code>` se dibuja "elAlert"). En el corte va `{' '}`. Hay un test.

## El dev server se despega del disco

Lo que se ve en localhost no prueba nada si el servidor lleva rato corriendo: sirve CSS viejo o
módulos que ya no existen, y el síntoma es un valor que no llega o una pantalla en blanco.

- **Después de borrar un archivo o de cambiar de rama, se reinicia el servidor.** `npm run dev` ya
  arranca con `--force`.
- La pestaña que estaba abierta necesita recarga dura (Ctrl+Shift+R).
- Con la pantalla en blanco se mira primero la red, no la consola: un 404 sobre un módulo viejo.
- Un valor nuevo se mide en el navegador (`getComputedStyle`), no se lee en el archivo.
