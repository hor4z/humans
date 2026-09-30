import cls from './mountain.module.css'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Chip } from '@milo/ui/chip'
import { Icon } from '@milo/ui/icon'
import { IconButton } from '@milo/ui/icon-button'
import { cx } from '@milo/ui/lib/cx'
import { FACTS, PHOTOS, PLACES, facing, meters, neighbor, smoothCurve, th, type Photo, type Tone } from './mountain-data'

const LEVELS = 13
const STEPS = 120
const MARKS = 96
const DASHES = 40
const AUTO = 0.00035
const KIND = { contour: 0, ring: 1, tick: 2, longTick: 3, trail: 4 } as const
const FLOATS = 9

const shape = (a: number) => 1 + 0.16 * Math.sin(3 * a + 0.7) + 0.08 * Math.cos(5 * a + 2.1) + 0.05 * Math.sin(9 * a)

const surface = (a: number, level: number): [number, number, number] => {
  const rad = shape(a) * Math.sqrt(-Math.log(Math.max(level, 0.001))) * 0.55
  return [rad * Math.cos(a), level, rad * Math.sin(a)]
}

const path = (u: number) => surface(th(u), 0.04 + u * 0.93)

/** Los segmentos de la montaña: las curvas de nivel, el anillo de la base con sus marcas y los tramos del sendero. Cada uno lleva sus dos puntas en 3D, de qué tipo es y dos datos más: el nivel, o dónde empieza y termina el tramo. */
export function mountainSegments() {
  const out: number[] = []
  const push = (a: number[], b: number[], kind: number, x: number, y: number) => out.push(...a, ...b, kind, x, y)
  for (let k = 1; k < LEVELS; k++) {
    const level = k / LEVELS
    for (let i = 0; i < STEPS; i++) {
      push(surface(i / STEPS * Math.PI * 2, level), surface((i + 1) / STEPS * Math.PI * 2, level), KIND.contour, level, k)
    }
  }
  for (let k = 0; k < MARKS; k++) {
    const a0 = k / MARKS * Math.PI * 2
    const a1 = (k + 1) / MARKS * Math.PI * 2
    push([Math.cos(a0), 0, Math.sin(a0)], [Math.cos(a1), 0, Math.sin(a1)], KIND.ring, 0, 0)
    const long = k % 8 === 0
    const reach = long ? 1.12 : 1.06
    push([Math.cos(a0) * 1.03, 0, Math.sin(a0) * 1.03], [Math.cos(a0) * reach, 0, Math.sin(a0) * reach], long ? KIND.longTick : KIND.tick, 0, 0)
  }
  for (let i = 0; i < DASHES; i++) {
    const u0 = i / DASHES
    const u1 = u0 + 0.55 / DASHES
    push(path(u0), path(u1), KIND.trail, u0, u1)
  }
  return new Float32Array(out)
}

const VERTEX = `#version 300 es
in vec2 corner;
in vec3 from;
in vec3 to;
in vec3 meta;
uniform float psi;
uniform float size;
uniform float height;
uniform float cx;
uniform float base;
uniform float tilt;
uniform vec2 focal;
uniform vec2 origin;
uniform float zoom;
uniform vec2 resolution;
uniform float reveal;
uniform vec4 topo;
uniform vec4 ring;
uniform vec4 tick;
uniform vec4 ink;
uniform vec4 accent;
uniform float focusLevel;
uniform float emph;
uniform float dim;
uniform float reach;
out vec4 color;

vec3 project(vec3 p) {
  float s = sin(psi);
  float c = cos(psi);
  float px = p.x * c - p.z * s;
  float pz = p.x * s + p.z * c;
  vec2 raw = vec2(cx + px * size, base - p.y * height + pz * size * tilt);
  return vec3(focal + (raw - origin) * zoom, pz);
}

float depth(float z) {
  return 0.35 + 0.65 * clamp((z + 1.0) / 2.0, 0.0, 1.0);
}

void main() {
  vec3 a = project(from);
  vec3 b = project(to);
  float kind = meta.x;
  vec2 lift = kind > 3.5 ? vec2(0.0, -2.0) : vec2(0.0);
  a.xy += lift;
  b.xy += lift;
  vec2 along = normalize(b.xy - a.xy + vec2(1e-6));
  vec2 across = vec2(-along.y, along.x);
  float d = depth((a.z + b.z) / 2.0);
  float width = 1.0;
  if (kind < 0.5) {
    float near = clamp(1.0 - abs(meta.y - focusLevel) * ${LEVELS.toFixed(1)}, 0.0, 1.0) * emph;
    float show = clamp(reveal * ${LEVELS.toFixed(1)} - meta.z + 1.0, 0.0, 1.0);
    float fade = dim + (1.0 - dim) * near;
    width = 1.2 + 0.6 * near;
    color = vec4(mix(topo.rgb, accent.rgb, near), max(0.3 + 0.55 * meta.y, near * 0.85) * d * show * fade);
  } else if (kind < 1.5) {
    width = 1.5;
    color = vec4(ring.rgb, 0.6 * d * dim);
  } else if (kind < 3.5) {
    color = vec4(tick.rgb, (kind < 2.5 ? 0.35 : 0.7) * d * dim);
  } else {
    bool walked = meta.y < reach;
    width = walked ? 2.0 + 0.8 * emph : 2.0;
    float shown = meta.z > reveal ? 0.0 : 1.0;
    color = vec4(ink.rgb, d * (walked ? 1.0 : 1.0 - 0.75 * emph) * shown);
  }
  float cap = kind > 3.5 ? width * 0.5 : 0.4;
  vec2 at = mix(a.xy - along * cap, b.xy + along * cap, corner.x) + across * corner.y * width * 0.5;
  gl_Position = vec4(at / resolution * 2.0 - 1.0, 0.0, 1.0) * vec4(1.0, -1.0, 1.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision mediump float;
in vec4 color;
out vec4 outColor;
void main() {
  outColor = vec4(color.rgb * color.a, color.a);
}`

function compile(gl: WebGL2RenderingContext) {
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const program = gl.createProgram()!
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  return program
}

function readColor(probe: HTMLElement, value: string): [number, number, number, number] {
  probe.style.color = value
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0']
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255, 1]
}

const toneColor: Record<Tone, string> = { sky: 'var(--label-blue)', coral: 'var(--label-orange)', lime: 'var(--label-green)', ink: 'var(--text)' }
const toneGlyph: Record<Tone, string> = { sky: 'var(--on-label)', coral: 'var(--on-label)', lime: 'var(--on-label)', ink: 'var(--surface)' }

const inOut = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(Math.max(x, 0), 1))
const easeOut = (x: number) => 1 - (1 - Math.min(Math.max(x, 0), 1)) ** 3
const approach = (from: number, to: number, step: number) => from + Math.min(Math.max(to - from, -step), step)
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
const depth = (z: number) => 0.35 + 0.65 * clamp01((z + 1) / 2)

/** Una clase de geografía sobre el Kilimanjaro: la montaña en curvas de nivel y WebGL2, con la ruta Machame y sus seis paradas encima, y un panel flotante con la ficha de la montaña o la de la parada elegida. Es la de la ruta de Sherpa. */
export function Mountain() {
  const stage = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const probe = useRef<HTMLSpanElement>(null)
  const labels = useRef<(HTMLSpanElement | null)[]>([])
  const pins = useRef<(HTMLDivElement | null)[]>([])
  const hoverCard = useRef<HTMLDivElement>(null)
  const altitude = useRef<HTMLSpanElement>(null)
  const panel = useRef<HTMLElement>(null)
  const orbit = useRef({ focus: null as number | null, shown: 0, hover: null as number | null, turn: (_: number) => {}, focusOn: (_: number) => {}, close: () => {} })
  const [supported] = useState(() => typeof WebGL2RenderingContext !== 'undefined')
  const [focus, setFocus] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [visit, setVisit] = useState(0)

  useEffect(() => {
    orbit.current.hover = hover
  }, [hover])

  orbit.current.focusOn = (n: number) => {
    orbit.current.focus = n
    orbit.current.shown = n
    orbit.current.turn(n)
    setFocus(n)
    setVisit(v => v + 1)
  }
  orbit.current.close = () => {
    orbit.current.focus = null
    setFocus(null)
  }

  useEffect(() => {
    const el = canvas.current
    const box = stage.current
    const gl = supported ? el?.getContext('webgl2', { antialias: true, premultipliedAlpha: true }) : null
    if (!el || !box || !gl || !probe.current) return
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const program = compile(gl)
    gl.useProgram(program)
    const data = mountainSegments()
    const count = data.length / FLOATS
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    const corners = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, corners)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, -1, 1, -1, 0, 1, 1, 1]), gl.STATIC_DRAW)
    const corner = gl.getAttribLocation(program, 'corner')
    gl.enableVertexAttribArray(corner)
    gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 0, 0)
    const segments = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, segments)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
    for (const [name, size, offset] of [['from', 3, 0], ['to', 3, 3], ['meta', 3, 6]] as const) {
      const loc = gl.getAttribLocation(program, name)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, FLOATS * 4, offset * 4)
      gl.vertexAttribDivisor(loc, 1)
    }
    const names = ['psi', 'size', 'height', 'cx', 'base', 'tilt', 'focal', 'origin', 'zoom', 'resolution', 'reveal', 'topo', 'ring', 'tick', 'ink', 'accent', 'focusLevel', 'emph', 'dim', 'reach'] as const
    const u = Object.fromEntries(names.map(n => [n, gl.getUniformLocation(program, n)])) as Record<(typeof names)[number], WebGLUniformLocation | null>
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    let tones: [number, number, number, number][] = []
    const readColors = () => {
      const p = probe.current!
      gl.uniform4fv(u.topo, readColor(p, 'var(--text-muted)'))
      gl.uniform4fv(u.ring, readColor(p, 'var(--brand)'))
      gl.uniform4fv(u.tick, readColor(p, 'var(--text-muted)'))
      gl.uniform4fv(u.ink, readColor(p, 'var(--text)'))
      tones = PLACES.map(l => readColor(p, toneColor[l.tone]))
    }
    readColors()
    const theme = new MutationObserver(readColors)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let w = 0
    let h = 0
    let aside = 0
    const resize = () => {
      const pane = panel.current
      aside = pane && getComputedStyle(pane).position === 'absolute' ? pane.offsetWidth + 16 : 0
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = el.clientWidth
      h = el.clientHeight
      el.width = Math.round(w * dpr)
      el.height = Math.round(h * dpr)
      gl.viewport(0, 0, el.width, el.height)
    }
    resize()
    const sizes = new ResizeObserver(resize)
    sizes.observe(el)
    if (panel.current) sizes.observe(panel.current)

    const s = {
      angle: 0, target: 0, spin: 0, last: 0, grab: null as number | null, inside: false, start: performance.now(),
      f: 0, fGoal: 0, camU: 0, hov: PLACES.map(() => 0), hovGoal: PLACES.map(() => 0),
    }
    orbit.current.turn = (n: number) => {
      s.spin = 0
      s.target = facing(PLACES[n].u, s.target)
    }
    const focusOn = (n: number) => orbit.current.focusOn(n)
    const close = () => orbit.current.close()

    const down = (e: PointerEvent) => {
      if (orbit.current.focus !== null) return
      s.grab = e.clientX
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (s.grab === null) return
      const d = -(e.clientX - s.grab) * 0.008
      s.target += d
      s.spin = s.spin * 0.6 + (d / 16) * 0.4
      s.grab = e.clientX
    }
    const up = () => { s.grab = null }
    const click = () => { if (orbit.current.focus !== null) close() }
    const enter = () => { s.inside = true }
    const leave = () => { s.inside = false }
    const keys = (e: KeyboardEvent) => {
      const focused = orbit.current.focus !== null
      if (e.key === 'Escape' && focused) { e.preventDefault(); close(); return }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if ((e.target as HTMLElement).closest('[data-panel]')) return
      e.preventDefault()
      if (focused) focusOn(neighbor(orbit.current.shown, e.key === 'ArrowLeft' ? -1 : 1))
      else s.target += e.key === 'ArrowLeft' ? 0.3 : -0.3
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('click', click)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    box.addEventListener('keydown', keys)

    let frame = 0
    const draw = (now: number) => {
      const dt = s.last ? Math.min(now - s.last, 100) : 0
      s.last = now
      const o = orbit.current
      const focused = o.focus !== null
      s.fGoal = approach(s.fGoal, focused ? 1 : 0, still ? 1 : dt / 650)
      const f = inOut(s.fGoal)
      PLACES.forEach((_, n) => {
        const goal = o.hover === n && !focused ? 1 : 0
        s.hovGoal[n] = approach(s.hovGoal[n], goal, still ? 1 : dt / 220)
        s.hov[n] = easeOut(s.hovGoal[n])
      })
      if (s.grab === null) {
        const rest = still || s.inside || focused ? 0 : AUTO
        s.spin = rest + (s.spin - rest) * Math.exp(-dt / 420)
        s.target += s.spin * dt
      }
      s.angle += (s.target - s.angle) * (1 - Math.exp(-dt / (focused || f > 0.01 ? 170 : 70)))
      const psi = s.angle - 0.6
      const reveal = still ? 1 : inOut((now - s.start - 150) / 1600)
      const room = w - aside
      const tilt = 0.3 + 0.12 * f
      const size = Math.min(room * 0.4, h * 0.6)
      const height = Math.min(h * 0.56, size * 1.1)
      const cx = room / 2
      const base = h - size * tilt * 1.35 - 16
      const sel = o.shown
      const goal = PLACES[sel].u
      if (f < 0.01) s.camU = goal
      s.camU += (goal - s.camU) * (1 - Math.exp(-dt / 180))
      const travel = Math.min(Math.abs(goal - s.camU) / 0.25, 1)
      const sn = Math.sin(psi)
      const cs = Math.cos(psi)
      const raw = ([x, y, z]: [number, number, number]) => {
        const px = x * cs - z * sn
        const pz = x * sn + z * cs
        return [cx + px * size, base - y * height + pz * size * tilt, pz] as const
      }
      const [spx, spy] = raw(path(s.camU))
      const anchor = [room / 2, h * 0.6]
      const zoom = (1 + 0.7 * f - 0.3 * Math.sin(Math.PI * f)) * (1 - 0.14 * travel * f)
      const focal = [spx + (anchor[0] - spx) * f, spy + (anchor[1] - spy) * f]
      const project = (p: [number, number, number]) => {
        const [x, y, z] = raw(p)
        return [focal[0] + (x - spx) * zoom, focal[1] + (y - spy) * zoom, z] as const
      }
      const att = PLACES.map((_, n) => Math.max(s.hov[n], n === sel ? f : 0))
      let who = sel
      let emph = 0
      att.forEach((a, n) => { if (a > emph) { emph = a; who = n } })
      const dim = 1 - 0.72 * emph
      const whoU = who === sel && focused ? s.camU : PLACES[who].u

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(u.psi, psi)
      gl.uniform1f(u.size, size)
      gl.uniform1f(u.height, height)
      gl.uniform1f(u.cx, cx)
      gl.uniform1f(u.base, base)
      gl.uniform1f(u.tilt, tilt)
      gl.uniform2f(u.focal, focal[0], focal[1])
      gl.uniform2f(u.origin, spx, spy)
      gl.uniform1f(u.zoom, zoom)
      gl.uniform2f(u.resolution, w, h)
      gl.uniform1f(u.reveal, reveal)
      gl.uniform4fv(u.accent, tones[who] ?? [0, 0, 0, 1])
      gl.uniform1f(u.focusLevel, 0.04 + whoU * 0.93)
      gl.uniform1f(u.emph, emph)
      gl.uniform1f(u.dim, dim)
      gl.uniform1f(u.reach, whoU)
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count)

      ;[0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((ang, i) => {
        const [x, y, z] = project([Math.cos(ang) * 1.2, 0, Math.sin(ang) * 1.2])
        const label = labels.current[i]
        if (!label) return
        label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        label.style.opacity = String(depth(z) * dim)
      })

      PLACES.forEach((l, n) => {
        const pin = pins.current[n]
        if (!pin) return
        const [x, y, z] = project(path(l.u))
        const pop = still ? 1 : easeOut((now - s.start - 900 - n * 120) / 450)
        const a = att[n]
        const others = Math.max(emph - a, 0)
        const fade = Math.max(depth(z), a) * (1 - 0.7 * others)
        const pole = (30 + 18 * (n % 2)) * (1 + 0.25 * a)
        const head = Math.max(y - pole * pop, 16)
        const size = 26 * pop * (1 + 0.2 * a)
        pin.style.transform = `translate(${x}px, ${y}px)`
        pin.style.zIndex = String(Math.round((z + 2) * 100))
        pin.style.opacity = String(pop <= 0.01 ? 0 : fade)
        pin.style.setProperty('--pole', `${y - head}px`)
        pin.style.setProperty('--dot', `${size}px`)
        pin.style.setProperty('--ring', String(s.hov[n]))
        pin.style.visibility = pop <= 0.01 ? 'hidden' : 'visible'
      })

      const card = hoverCard.current
      if (card) {
        const n = o.hover
        const show = n === null || focused ? 0 : s.hov[n]
        card.style.opacity = String(show)
        card.style.visibility = show > 0.01 ? 'visible' : 'hidden'
        if (n !== null) {
          const [x, y] = project(path(PLACES[n].u))
          const pole = (30 + 18 * (n % 2)) * (1 + 0.25 * att[n])
          const head = Math.max(y - pole, 16)
          const below = head - 13 - 74 < 4
          const top = below ? head + 21 : head - 13 - 74
          const left = Math.min(Math.max(x - 100, 4), w - 204)
          card.style.transform = `translate(${left}px, ${top + (1 - show) * (below ? -6 : 6)}px)`
        }
      }

      const alt = altitude.current
      if (alt) {
        alt.style.opacity = String(emph)
        alt.style.visibility = emph > 0.01 ? 'visible' : 'hidden'
        const [x, y] = project(path(whoU))
        alt.style.transform = `translate(${x + 10}px, ${y + 6}px)`
        alt.textContent = `${meters(PLACES[who].altitude)} m`
        alt.style.setProperty('--accent', toneColor[PLACES[who].tone])
      }

      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      theme.disconnect()
      sizes.disconnect()
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('click', click)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      box.removeEventListener('keydown', keys)
      gl.deleteBuffer(corners)
      gl.deleteBuffer(segments)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    }
  }, [supported])

  const go = (n: number) => orbit.current.focusOn(n)
  const place = focus === null ? null : PLACES[focus]

  return (
    <div className={cls.root}>
      <header className={cls.header}>
        <span className={cls.eyebrow}>Geografía · Relieve de África</span>
        <h1 className={cls.title}>Kilimanjaro</h1>
        <p className={cls.lead}>La montaña en curvas de nivel, con la ruta Machame encima. Gira sola: arrastrala para darla vuelta, o tocá una parada para acercarte.</p>
      </header>
      <div ref={stage} className={cls.stage}>
        {supported ? (
          <canvas
            ref={canvas}
            tabIndex={0}
            role="img"
            aria-label="El Kilimanjaro dibujado en curvas de nivel, sobre un anillo de brújula, con la ruta Machame y sus seis paradas"
            className={cls.canvas}
          />
        ) : (
          <p className={cls.fallback}>Este navegador no dibuja WebGL2.</p>
        )}
        {supported && ['N', 'E', 'S', 'O'].map((l, i) => (
          <span key={l} aria-hidden ref={n => { labels.current[i] = n }} className={cls.cardinal}>{l}</span>
        ))}
        {supported && PLACES.map((l, n) => (
          <div
            key={l.name}
            ref={d => { pins.current[n] = d }}
            className={cls.pin}
            style={{ '--tone': toneColor[l.tone], '--glyph': toneGlyph[l.tone] } as CSSProperties}
          >
            <span className={cls.pole} />
            <span className={cls.foot} />
            <button
              type="button"
              aria-label={`${l.name}, ${meters(l.altitude)} m, día ${l.day}`}
              aria-pressed={focus === n}
              onClick={() => go(n)}
              onPointerEnter={() => setHover(n)}
              onPointerLeave={() => setHover(h => (h === n ? null : h))}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(h => (h === n ? null : h))}
              className={cls.dot}
            >
              <Icon name={l.icon} size={14} weight={400} />
            </button>
          </div>
        ))}
        {supported && (
          <div ref={hoverCard} aria-hidden className={cls.hoverCard}>
            {hover !== null && (
              <>
                <span className={cls.hoverName}>
                  <span className={cls.hoverSwatch} style={{ background: toneColor[PLACES[hover].tone] }} />
                  {PLACES[hover].name}
                </span>
                <span className={cls.hoverMeta}>{meters(PLACES[hover].altitude)} m · Día {PLACES[hover].day}</span>
                <span className={cls.hoverHint}>Clic para explorar</span>
              </>
            )}
          </div>
        )}
        {supported && <span ref={altitude} aria-hidden className={cls.altitude} />}
        <span ref={probe} aria-hidden className={cls.probe} />

        <aside ref={panel} data-panel aria-label={place ? place.name : 'Ficha del Kilimanjaro'} className={cls.panel}>
          {place && focus !== null
            ? <PlaceCard key={`${focus}-${visit}`} n={focus} onClose={() => orbit.current.close()} onGo={go} />
            : <MountainCard onGo={go} />}
        </aside>
      </div>
    </div>
  )
}

function Credit({ photo }: { photo: Photo }) {
  return (
    <p className={cls.credit}>
      Foto: <a href={photo.source} target="_blank" rel="noreferrer">{photo.author}</a> ·{' '}
      <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a>
    </p>
  )
}

const POSTCARDS = [0, 1, 3]

function MountainCard({ onGo }: { onGo: (n: number) => void }) {
  const [shot, setShot] = useState(0)
  const photo = PHOTOS[POSTCARDS[shot]]
  return (
    <div className={cls.sheet}>
      <figure className={cls.figure}>
        <img src={photo.src} alt={photo.text} className={cls.photo} />
        <figcaption className={cls.caption}>
          <span className={cls.captionTitle}>{photo.title}</span>
          <Credit photo={photo} />
        </figcaption>
        <div className={cls.shots} role="group" aria-label="Fotos de la montaña">
          {POSTCARDS.map((p, i) => (
            <button
              key={p}
              type="button"
              aria-label={PHOTOS[p].title}
              aria-pressed={i === shot}
              onClick={() => setShot(i)}
              className={cx(cls.shot, i === shot && cls.shotCurrent)}
            />
          ))}
        </div>
      </figure>
      <div className={cls.sheetHead}>
        <h2 className={cls.sheetTitle}>El techo de África</h2>
        <p className={cls.sheetLead}>Una montaña sola en medio de la sabana, que en 6 km de subida pasa del calor del ecuador a la nieve.</p>
      </div>
      <dl className={cls.facts}>
        {FACTS.map(([k, v]) => (
          <div key={k} className={cls.fact}>
            <dt className={cls.factName}>{k}</dt>
            <dd className={cls.factValue}>{v}</dd>
          </div>
        ))}
      </dl>
      <div className={cls.stops}>
        <h3 className={cls.stopsTitle}>La ruta Machame, en seis paradas</h3>
        <ol className={cls.stopList}>
          {PLACES.map((l, n) => (
            <li key={l.name}>
              <button type="button" onClick={() => onGo(n)} className={cls.stop}>
                <span className={cls.stopSwatch} style={{ background: toneColor[l.tone] }} />
                <span className={cls.stopName}>{l.name}</span>
                <span className={cls.stopAlt}>{meters(l.altitude)} m</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Profile({ n, onGo }: { n: number; onGo: (n: number) => void }) {
  const W = 300
  const H = 56
  const lo = 2400
  const hi = 6100
  const xs = PLACES.map(l => 6 + l.u * (W - 12))
  const ys = PLACES.map(l => H - 4 - (l.altitude - lo) / (hi - lo) * (H - 8))
  const points: string[] = []
  for (let x = xs[0]; x <= xs[xs.length - 1]; x += 2) points.push(`${x.toFixed(1)},${smoothCurve(xs, ys, x).toFixed(1)}`)
  const line = points.join(' ')
  const reach = xs[n]
  const walked = points.filter(p => Number(p.split(',')[0]) <= reach + 0.5)
  const tone = toneColor[PLACES[n].tone]
  return (
    <div className={cls.profile}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className={cls.profileSvg} aria-hidden>
        <polygon points={`${xs[0]},${H} ${line} ${xs[xs.length - 1]},${H}`} className={cls.profileArea} />
        <polyline points={line} className={cls.profileRest} />
        <polygon points={`${xs[0]},${H} ${walked.join(' ')} ${reach},${H}`} style={{ fill: tone }} className={cls.profileWalkedArea} />
        <polyline points={walked.join(' ')} style={{ stroke: tone }} className={cls.profileWalked} />
        <line x1={reach} x2={reach} y1={ys[n] + 6} y2={H} style={{ stroke: tone }} className={cls.profileDrop} />
      </svg>
      {PLACES.map((l, i) => (
        <button
          key={l.name}
          type="button"
          aria-label={l.name}
          aria-pressed={i === n}
          onClick={() => i !== n && onGo(i)}
          className={cx(cls.profilePoint, i === n && cls.profilePointCurrent)}
          style={{ left: `${xs[i] / W * 100}%`, top: `${ys[i] / H * 100}%`, '--tone': toneColor[l.tone] } as CSSProperties}
        />
      ))}
    </div>
  )
}

function PlaceCard({ n, onClose, onGo }: { n: number; onClose: () => void; onGo: (n: number) => void }) {
  const l = PLACES[n]
  const photo = PHOTOS[l.photo]
  const prev = PLACES[n - 1]
  return (
    <div className={cls.sheet} style={{ '--tone': toneColor[l.tone] } as CSSProperties}>
      <div className={cx(cls.cardHead, cls.enter)}>
        <span className={cls.cardIcon}><Icon name={l.icon} size={18} weight={400} /></span>
        <span className={cls.cardDay}>
          <span className={cls.cardDayOf}>Día {l.day} de {PLACES.length}</span>
          <span className={cls.cardDate}>{l.date}</span>
        </span>
        <IconButton icon="close" label="Volver a la montaña" size="sm" variant="ghost" onClick={onClose} className={cls.cardClose} />
      </div>
      <figure className={cx(cls.figure, cls.enter)}>
        <img src={photo.src} alt={photo.text} className={cls.photo} />
        <figcaption className={cls.caption}><Credit photo={photo} /></figcaption>
      </figure>
      <div className={cx(cls.sheetHead, cls.enter)}>
        <h2 className={cls.sheetTitle}>{l.name}</h2>
        <p className={cls.sheetLead}>{l.text}</p>
      </div>
      <div className={cx(cls.height, cls.enter)}>
        <span className={cls.heightValue}>{meters(l.altitude)}<span className={cls.heightUnit}>m</span></span>
        <span className={cls.heightDelta}>
          {prev ? <><Icon name="trending_up" size={14} weight={400} className={cls.heightIcon} />+{meters(l.altitude - prev.altitude)} m sobre el día {prev.day}</> : 'Salida desde 1.800 m'}
        </span>
      </div>
      <div className={cls.enter}><Profile n={n} onGo={onGo} /></div>
      <dl className={cx(cls.facts, cls.enter)}>
        {l.data.map(([k, v]) => (
          <div key={k} className={cls.fact}>
            <dt className={cls.factName}>{k}</dt>
            <dd className={cls.factValue}>{k === 'Estado' ? <Chip size="sm" color="ok">{v}</Chip> : v}</dd>
          </div>
        ))}
      </dl>
      <div className={cx(cls.cardFoot, cls.enter)}>
        <IconButton icon="arrow_back" label="Parada anterior" size="sm" variant="muted" onClick={() => onGo(neighbor(n, -1))} />
        <span className={cls.pager} aria-hidden>
          {PLACES.map((p, i) => <span key={p.name} className={cx(cls.pagerDot, i === n && cls.pagerDotCurrent)} />)}
        </span>
        <IconButton icon="arrow_forward" label="Parada siguiente" size="sm" variant="muted" onClick={() => onGo(neighbor(n, 1))} />
      </div>
    </div>
  )
}
