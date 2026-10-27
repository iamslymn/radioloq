/**
 * Prints all site and courses copy as JSON, so the translation table can be built from the
 * real content files. Used by scripts/i18n.py. Run from site/: node scripts/i18n-dump.mjs
 */
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'rolldown'

const out = mkdtempSync(join(tmpdir(), 'radioloq-i18n-'))
try {
  await build({
    input: { content: 'src/content/index.ts', courses: 'src/content/courses.ts' },
    platform: 'node',
    logLevel: 'silent',
    output: { dir: out, format: 'esm', entryFileNames: '[name].mjs' },
  })
  const { content } = await import(pathToFileURL(join(out, 'content.mjs')).href)
  const { coursesContent } = await import(pathToFileURL(join(out, 'courses.mjs')).href)
  process.stdout.write(JSON.stringify({ site: content, courses: coursesContent }))
} finally {
  rmSync(out, { recursive: true, force: true })
}
