import cls from './mountain.module.css'
import { useEffect, useRef, useState } from 'react'

const LEVELS = 13
const STEPS = 120
const MARKS = 96
const AUTO = 0.00035
const TILT = 0.3
const KIND = { contour: 0, ring: 1, tick: 2, longTick: 3 } as const
const FLOATS = 9

const shape = (th: number) => 1 + 0.16 * Math.sin(3 * th + 0.7) + 0.08 * Math.cos(5 * th + 2.1) + 0.05 * Math.sin(9 * th)

const surface = (th: number, level: number): [number, number, number] => {
  const rad = shape(th) * Math.sqrt(-Math.log(Math.max(level, 0.001))) * 0.55
  return [rad * Math.cos(th), level, rad * Math.sin(th)]
}

/** Los segmentos de la montaña: las curvas de nivel, el anillo de la base y sus marcas. Cada uno lleva sus dos puntas en 3D, de qué tipo es y a qué nivel pertenece. */
export function mountainSegments() {
  const out: number[] = []
  const push = (a: number[], b: number[], kind: number, level: number, index: number) => out.push(...a, ...b, kind, level, index)
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
uniform vec2 center;
uniform float base;
uniform vec2 resolution;
uniform float reveal;
uniform vec4 topo;
uniform vec4 ring;
uniform vec4 tick;
out vec4 color;

vec3 project(vec3 p) {
  float s = sin(psi);
  float c = cos(psi);
  float px = p.x * c - p.z * s;
  float pz = p.x * s + p.z * c;
  return vec3(center.x + px * size, base - p.y * height + pz * size * ${TILT.toFixed(2)}, pz);
}

float depth(float z) {
  return 0.35 + 0.65 * clamp((z + 1.0) / 2.0, 0.0, 1.0);
}

void main() {
  vec3 a = project(from);
  vec3 b = project(to);
  vec2 along = normalize(b.xy - a.xy + vec2(1e-6));
  vec2 across = vec2(-along.y, along.x);
  float kind = meta.x;
  float width = kind < 0.5 ? 1.2 : kind < 1.5 ? 1.5 : 1.0;
  vec2 at = mix(a.xy - along * 0.4, b.xy + along * 0.4, corner.x) + across * corner.y * width * 0.5;
  float d = depth((a.z + b.z) / 2.0);
  if (kind < 0.5) {
    float show = clamp(reveal * ${LEVELS.toFixed(1)} - meta.z + 1.0, 0.0, 1.0);
    color = vec4(topo.rgb, topo.a * (0.3 + 0.55 * meta.y) * d * show);
  } else if (kind < 1.5) {
    color = vec4(ring.rgb, ring.a * 0.6 * d);
  } else {
    color = vec4(tick.rgb, tick.a * (kind < 2.5 ? 0.35 : 0.7) * d);
  }
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

function tokenColor(probe: HTMLElement, token: string): [number, number, number, number] {
  probe.style.color = `var(${token})`
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0']
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255, m[3] === undefined ? 1 : Number(m[3])]
}

const settle = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(Math.max(x, 0), 1))

/** Las curvas de nivel de una montaña que gira sola, en WebGL2: aparecen de abajo hacia arriba, se arrastran para girarla y siguen con inercia. Es la de la ruta de Sherpa, sin la ruta. */
export function Mountain() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const probe = useRef<HTMLSpanElement>(null)
  const labels = useRef<(HTMLSpanElement | null)[]>([])
  const [supported] = useState(() => typeof WebGL2RenderingContext !== 'undefined')

  useEffect(() => {
    const el = canvas.current
    const gl = supported ? el?.getContext('webgl2', { antialias: true, premultipliedAlpha: true }) : null
    if (!el || !gl || !probe.current) return
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
    const u = (name: string) => gl.getUniformLocation(program, name)
    const uniforms = {
      psi: u('psi'), size: u('size'), height: u('height'), center: u('center'), base: u('base'),
      resolution: u('resolution'), reveal: u('reveal'), topo: u('topo'), ring: u('ring'), tick: u('tick'),
    }
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const readColors = () => {
      gl.uniform4fv(uniforms.topo, tokenColor(probe.current!, '--text-muted'))
      gl.uniform4fv(uniforms.ring, tokenColor(probe.current!, '--brand'))
      gl.uniform4fv(uniforms.tick, tokenColor(probe.current!, '--text-muted'))
    }
    readColors()
    const theme = new MutationObserver(readColors)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let w = 0
    let h = 0
    const resize = () => {
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

    const state = { angle: 0, target: 0, spin: 0, last: 0, grab: null as number | null, inside: false, start: performance.now() }
    const down = (e: PointerEvent) => { state.grab = e.clientX; el.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => {
      if (state.grab === null) return
      const d = -(e.clientX - state.grab) * 0.008
      state.target += d
      state.spin = state.spin * 0.6 + (d / 16) * 0.4
      state.grab = e.clientX
    }
    const up = () => { state.grab = null }
    const enter = () => { state.inside = true }
    const leave = () => { state.inside = false }
    const keys = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      e.preventDefault()
      state.target += e.key === 'ArrowLeft' ? 0.3 : -0.3
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('keydown', keys)

    let frame = 0
    const draw = (now: number) => {
      const dt = state.last ? Math.min(now - state.last, 100) : 0
      state.last = now
      if (state.grab === null) {
        const rest = still || state.inside ? 0 : AUTO
        state.spin = rest + (state.spin - rest) * Math.exp(-dt / 420)
        state.target += state.spin * dt
      }
      state.angle += (state.target - state.angle) * (1 - Math.exp(-dt / 70))
      const psi = state.angle - 0.6
      const reveal = still ? 1 : settle((now - state.start - 150) / 1600)
      const size = Math.min(w * 0.34, h * 0.6)
      const height = Math.min(h * 0.56, size * 1.1)
      const cx = w / 2
      const base = h - size * TILT * 1.35 - 16
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uniforms.psi, psi)
      gl.uniform1f(uniforms.size, size)
      gl.uniform1f(uniforms.height, height)
      gl.uniform2f(uniforms.center, cx, 0)
      gl.uniform1f(uniforms.base, base)
      gl.uniform2f(uniforms.resolution, w, h)
      gl.uniform1f(uniforms.reveal, reveal)
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count)
      const s = Math.sin(psi)
      const c = Math.cos(psi)
      ;[0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((ang, i) => {
        const x = Math.cos(ang) * 1.2
        const z = Math.sin(ang) * 1.2
        const px = x * c - z * s
        const pz = x * s + z * c
        const label = labels.current[i]
        if (!label) return
        label.style.transform = `translate(${cx + px * size}px, ${base + pz * size * TILT}px) translate(-50%, -50%)`
        label.style.opacity = String(0.35 + 0.65 * Math.min(Math.max((pz + 1) / 2, 0), 1))
      })
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
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('keydown', keys)
      gl.deleteBuffer(corners)
      gl.deleteBuffer(segments)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    }
  }, [supported])

  return (
    <div className={cls.root}>
      <header className={cls.header}>
        <h1 className={cls.title}>Montaña</h1>
        <p className={cls.lead}>Curvas de nivel en WebGL2. Gira sola; arrastrala o usá las flechas para darla vuelta.</p>
      </header>
      <div className={cls.stage}>
        {supported ? (
          <canvas
            ref={canvas}
            tabIndex={0}
            role="img"
            aria-label="Una montaña dibujada en curvas de nivel, sobre un anillo de brújula, que gira despacio"
            className={cls.canvas}
          />
        ) : (
          <p className={cls.fallback}>Este navegador no dibuja WebGL2.</p>
        )}
        {supported && ['N', 'E', 'S', 'O'].map((l, i) => (
          <span key={l} aria-hidden ref={n => { labels.current[i] = n }} className={cls.label}>{l}</span>
        ))}
        <span ref={probe} aria-hidden className={cls.probe} />
      </div>
    </div>
  )
}
