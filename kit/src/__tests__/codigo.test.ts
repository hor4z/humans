import { describe, expect, it } from 'vitest'

const sources = import.meta.glob('../{stories,foundations}/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const prose = [
  /<(A11y\.Item|Practices\.Do|Practices\.Dont|Anatomy\.Part|Footnote|Note)\b[^>]*>([\s\S]*?)<\/\1>/g,
  /\b(?:note|lead|description)=(?:"([^"]*)"|\{'([^']*)'\}|\{"([^"]*)"\})/g,
  /<(?:Demo|Variant)\b[^>]*?\b(?:label|name)=(?:"([^"]*)"|\{'([^']*)'\})/g,
]

const html = 'button|div|span|nav|table|input|details|summary|kbd|h[1-6]|a|p|ul|ol|li|tfoot|thead|label|figcaption|time|dialog|section|main|header|footer|select|option|textarea|form|fieldset|legend|img|video|audio|svg'

const code = [
  /role="[a-z]+"/,
  /(?<![\w-])aria-[a-z]+/,
  new RegExp(`<\\/?(?:${html})(?:\\s[^>]*)?>`),
  /(?<![\w-])--[a-z][\w-]+/,
  /(?<![\w.])on[A-Z]\w*/,
  /(?<![\w-])[a-z][\w-]*="[^"]*"/,
  /\bmenuitem\w*/,
  /\bprefers-[a-z-]+/,
  /\bsr-only\b/,
]

function offenders() {
  const found: string[] = []
  for (const [path, src] of Object.entries(sources)) {
    const file = path.split('/').pop()
    for (const re of prose) {
      for (const m of src.matchAll(re)) {
        const text = (m.slice(1).filter(Boolean).pop() ?? '')
          .replace(/`[^`]*`/g, '')
          .replace(/<(code|Mono|InlineCode)\b[^>]*>[\s\S]*?<\/\1>/g, '')
          .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        for (const c of code) {
          const hit = c.exec(text)
          if (hit) found.push(`${file}: ${hit[0]}`)
        }
      }
    }
  }
  return found
}

describe('el código que nombra el texto', () => {
  it('va entre backticks: un role, un aria, una etiqueta o un token sin marcar se lee como una palabra más', () => {
    expect(offenders()).toEqual([])
  })
})
