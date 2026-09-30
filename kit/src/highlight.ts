/** Qué es cada pedazo de código, que es de lo que sale su color. */
export type TokenKind =
  | 'keyword' | 'component' | 'tag' | 'attr' | 'string' | 'number'
  | 'fn' | 'param' | 'property' | 'token' | 'brace' | 'punct' | 'comment' | 'plain'

/** Un pedazo de código con su tipo. */
export type Token = { text: string; kind: TokenKind }

/** Los lenguajes que muestra el sitio: ejemplos de uso, tokens y comandos. */
export type Lang = 'tsx' | 'css' | 'sh'

const keywords = new Set([
  'const', 'let', 'var', 'import', 'from', 'export', 'default', 'return', 'function', 'as',
  'typeof', 'new', 'if', 'else', 'type', 'await', 'async', 'of', 'in', 'satisfies',
])

const values = new Set(['true', 'false', 'null', 'undefined'])

const exprBefore = new Set(['', '(', ',', '=>', '{', '[', '=', '?', ':', '&&', '||', '??', 'return', '!', 'jsx', ';'])

type Frame =
  | { mode: 'js'; depth: number; closer: 'root' | 'tag' | 'children' | 'template' }
  | { mode: 'tag'; closing: boolean; named: boolean }
  | { mode: 'children' }
  | { mode: 'template' }

const ident = /^[A-Za-z_$][\w$]*/
const number = /^\d+(?:\.\d+)?/

function tsx(code: string): Token[] {
  const out: Token[] = []
  const stack: Frame[] = [{ mode: 'js', depth: 0, closer: 'root' }]
  let i = 0
  let last = ''
  let paramsUntil = -1
  const push = (text: string, kind: TokenKind) => {
    out.push({ text, kind })
    i += text.length
  }
  const top = () => stack[stack.length - 1]
  const rest = () => code.slice(i)
  const openTag = () => {
    push('<', 'punct')
    stack.push({ mode: 'tag', closing: false, named: false })
  }
  const closeTag = () => {
    push('</', 'punct')
    stack.push({ mode: 'tag', closing: true, named: false })
  }
  const endElement = () => {
    last = 'jsx'
  }

  while (i < code.length) {
    const frame = top()
    const r = rest()
    const c = code[i]

    if (frame.mode === 'template') {
      if (c === '`') { push('`', 'string'); stack.pop(); last = 'value'; continue }
      if (r.startsWith('${')) { push('${', 'brace'); stack.push({ mode: 'js', depth: 0, closer: 'template' }); last = '{'; continue }
      const m = /^(?:[^`$]|\$(?!\{))+/.exec(r)!
      push(m[0], 'string')
      continue
    }

    if (frame.mode === 'children') {
      if (r.startsWith('</')) { closeTag(); continue }
      if (c === '<') { openTag(); continue }
      if (c === '{') { push('{', 'brace'); stack.push({ mode: 'js', depth: 0, closer: 'children' }); last = '{'; continue }
      const m = /^[^<{]+/.exec(r)!
      push(m[0], 'plain')
      continue
    }

    if (frame.mode === 'tag') {
      const ws = /^\s+/.exec(r)
      if (ws) { push(ws[0], 'plain'); continue }
      if (!frame.named) {
        frame.named = true
        const name = /^[A-Za-z][\w.-]*/.exec(r)
        if (name) { push(name[0], /^[A-Z]/.test(name[0]) ? 'component' : 'tag'); continue }
      }
      if (r.startsWith('/>')) { push('/>', 'punct'); stack.pop(); endElement(); continue }
      if (c === '>') {
        push('>', 'punct')
        stack.pop()
        if (frame.closing) {
          if (top().mode === 'children') stack.pop()
          endElement()
        } else {
          stack.push({ mode: 'children' })
        }
        continue
      }
      if (c === '{') { push('{', 'brace'); stack.push({ mode: 'js', depth: 0, closer: 'tag' }); last = '{'; continue }
      if (c === '"' || c === "'") { push(quoted(r), 'string'); continue }
      const attr = /^[A-Za-z_][\w-]*/.exec(r)
      if (attr) { push(attr[0], 'attr'); continue }
      push(c, 'punct')
      continue
    }

    const ws = /^\s+/.exec(r)
    if (ws) { push(ws[0], 'plain'); continue }
    if (r.startsWith('//')) { push(/^\/\/[^\n]*/.exec(r)![0], 'comment'); continue }
    if (r.startsWith('/*')) { const end = r.indexOf('*/'); push(end < 0 ? r : r.slice(0, end + 2), 'comment'); continue }
    if (c === '"' || c === "'") { push(quoted(r), 'string'); last = 'value'; continue }
    if (c === '`') { push('`', 'string'); stack.push({ mode: 'template' }); continue }
    if (c === '<' && (exprBefore.has(last) || lineStart(code, i)) && /^<[A-Za-z>]/.test(r)) { openTag(); continue }
    const num = number.exec(r)
    if (num) { push(num[0], 'number'); last = 'value'; continue }
    const id = ident.exec(r)
    if (id) {
      const word = id[0]
      const after = r.slice(word.length)
      const kind: TokenKind = keywords.has(word) ? 'keyword'
        : values.has(word) ? 'number'
        : i < paramsUntil && ['(', ',', '{', '[', '...'].includes(last) ? 'param'
        : /^\s*=>/.test(after) ? 'param'
        : /^\s*\(/.test(after) || /^\s*=\s*(?:async\s*)?\(/.test(after) && last === 'const' ? 'fn'
        : /^\s*(?:\??:|[,}])/.test(after) && (last === '{' || last === ',') && braceDepth(stack) ? 'property'
        : 'plain'
      push(word, kind)
      last = kind === 'keyword' ? word : 'value'
      continue
    }
    if (frame.mode === 'js' && c === '{') { frame.depth++; push('{', 'brace'); last = '{'; continue }
    if (frame.mode === 'js' && c === '}') {
      if (frame.depth > 0) { frame.depth--; push('}', 'brace'); last = 'value'; continue }
      if (frame.closer !== 'root') { push('}', 'brace'); stack.pop(); last = 'value'; continue }
    }
    if (c === '(' && i >= paramsUntil) {
      const close = matching(code, i)
      if (close > 0 && /^\s*(?::[^=\n]*)?=>/.test(code.slice(close + 1))) paramsUntil = close
    }
    const op = /^(?:\.\.\.|=>|===|!==|==|!=|&&|\|\||\?\?|<=|>=|[=+\-*/%!?:<>.,;()[\]{}|&])/.exec(r)
    if (op) { push(op[0], 'punct'); last = op[0] === ')' || op[0] === ']' ? 'value' : op[0]; continue }
    push(c, 'plain')
  }
  return out
}

function braceDepth(stack: Frame[]) {
  const frame = stack[stack.length - 1]
  return frame.mode === 'js' && frame.depth > 0
}

function matching(code: string, open: number) {
  let depth = 0
  for (let j = open; j < code.length; j++) {
    if (code[j] === '(') depth++
    else if (code[j] === ')' && --depth === 0) return j
  }
  return -1
}

function lineStart(code: string, i: number) {
  const before = code.lastIndexOf('\n', i - 1)
  return /^\s*$/.test(code.slice(before + 1, i))
}

function quoted(r: string) {
  const q = r[0]
  let j = 1
  while (j < r.length && r[j] !== q && r[j] !== '\n') j += r[j] === '\\' ? 2 : 1
  return r.slice(0, Math.min(j + 1, r.length))
}

const cssRules: [RegExp, TokenKind][] = [
  [/^\s+/, 'plain'],
  [/^\/\*[\s\S]*?(?:\*\/|$)/, 'comment'],
  [/^--[\w-]+/, 'token'],
  [/^[a-z-]+(?=\s*:)/, 'property'],
  [/^[a-z-]+(?=\()/, 'fn'],
  [/^-?\d*\.?\d+(?:px|rem|em|%|ms|s|ch|vh|vw|deg)?/, 'number'],
  [/^#[0-9a-fA-F]{3,8}\b/, 'number'],
  [/^["'][^"'\n]*["']?/, 'string'],
  [/^[{}();:,]/, 'punct'],
  [/^[^\s{}();:,"']+/, 'plain'],
]

function css(code: string): Token[] {
  const out: Token[] = []
  let i = 0
  while (i < code.length) {
    const r = code.slice(i)
    let token: Token = { text: r[0], kind: 'plain' }
    for (const [re, kind] of cssRules) {
      const m = re.exec(r)
      if (m) { token = { text: m[0], kind }; break }
    }
    out.push(token)
    i += token.text.length
  }
  return out
}

function sh(code: string): Token[] {
  const out: Token[] = []
  for (const [n, line] of code.split('\n').entries()) {
    if (n > 0) out.push({ text: '\n', kind: 'plain' })
    let i = 0
    let first = true
    while (i < line.length) {
      const r = line.slice(i)
      const ws = /^\s+/.exec(r)
      let t: Token
      if (ws) t = { text: ws[0], kind: 'plain' }
      else if (r[0] === '#') t = { text: r, kind: 'comment' }
      else if (r[0] === '"' || r[0] === "'") t = { text: quoted(r), kind: 'string' }
      else {
        const word = /^[^\s"']+/.exec(r)![0]
        t = { text: word, kind: first ? 'fn' : /^--?[\w-]*$/.test(word) ? 'attr' : 'plain' }
        first = false
      }
      out.push(t)
      i += t.text.length
    }
  }
  return out
}

/** Separa el código en renglones de tokens. Lee el texto entero, así un string o un template que cruza renglones no se pierde, y lo que sale es exactamente lo que entró. */
export function highlight(code: string, lang: Lang = 'tsx'): Token[][] {
  const flat = lang === 'css' ? css(code) : lang === 'sh' ? sh(code) : tsx(code)
  const lines: Token[][] = [[]]
  for (const token of flat) {
    token.text.split('\n').forEach((part, n) => {
      if (n > 0) lines.push([])
      if (!part) return
      const line = lines[lines.length - 1]
      const prev = line[line.length - 1]
      if (prev && prev.kind === token.kind) prev.text += part
      else line.push({ text: part, kind: token.kind })
    })
  }
  return lines
}
