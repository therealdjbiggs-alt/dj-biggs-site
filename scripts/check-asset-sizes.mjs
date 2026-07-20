import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

/** Cloudflare Pages max asset size (25 MiB). */
const MAX_BYTES = 25 * 1024 * 1024
const ROOT = join(process.cwd(), 'dist')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
      continue
    }
    if (entry.isFile()) files.push(fullPath)
  }

  return files
}

const files = await walk(ROOT)
const oversized = []

for (const file of files) {
  const { size } = await stat(file)
  if (size > MAX_BYTES) {
    oversized.push({ file: file.replace(`${ROOT}/`, ''), size })
  }
}

if (oversized.length > 0) {
  console.error('Build output contains files over Cloudflare Pages 25 MiB limit:')
  for (const { file, size } of oversized) {
    console.error(`  - ${file} (${(size / (1024 * 1024)).toFixed(1)} MiB)`)
  }
  process.exit(1)
}

console.log(`Asset size check passed (${files.length} files, all <= 25 MiB).`)
