/**
 * The static site has no image server, so responsive variants are generated ahead
 * of time with ImageMagick, stored in the m-texx-assets repo and served by jsDelivr.
 *
 *   pnpm images --out <m-texx-assets>/optimized
 *                        download the files in image-sources.json and generate variants.
 *                        Needs `magick` on PATH.
 *   pnpm images:check    (runs before every build) fail if the code references an /img
 *                        path with no entry in image-sources.json, which would otherwise
 *                        be a silent 404 in production
 *
 * To add an image, see docs/cloudflare-deployment.md.
 */
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const GITHUB_OWNER = 'Ethereumistic'
const GITHUB_BRANCH = 'main'

// Must match images.deviceSizes + images.imageSizes in next.config.mjs.
const WIDTHS = [128, 256, 384, 640, 1080, 1920]
const QUALITY = 75
// SVGs at or under this size are copied as-is. Larger ones are heavily traced
// artwork (logo 612 KB, map 2.3 MB) that is far smaller as a raster.
const MAX_INLINE_SVG_BYTES = 50 * 1024
const RASTER_SVG_DENSITY = 150
// Added to the assets repo by hand rather than generated from a source.
const HAND_MANAGED = new Set(['hero', 'hero-poster'])

const readSources = async () => JSON.parse(await readFile(join(ROOT, 'scripts/image-sources.json'), 'utf8'))

function githubUrl(source) {
  const [repo, ...path] = source.split('/')
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${repo}/${GITHUB_BRANCH}/${path.join('/')}`
}

async function generate() {
  const outFlag = process.argv.indexOf('--out')
  if (outFlag === -1 || !process.argv[outFlag + 1]) {
    console.error('Usage: pnpm images --out <path to m-texx-assets>/optimized')
    process.exit(1)
  }
  const outDir = resolve(process.argv[outFlag + 1])
  const sources = await readSources()
  const workDir = await mkdtemp(join(tmpdir(), 'optimize-images-'))
  let totalIn = 0
  let totalOut = 0

  for (const source of sources) {
    const res = await fetch(githubUrl(source))
    if (!res.ok) throw new Error(`${res.status} fetching ${source}`)
    const input = Buffer.from(await res.arrayBuffer())
    totalIn += input.length

    const base = join(outDir, source.replace(/\.\w+$/, ''))
    await mkdir(dirname(base), { recursive: true })

    if (source.endsWith('.svg') && input.length <= MAX_INLINE_SVG_BYTES) {
      await writeFile(`${base}.svg`, input)
      totalOut += input.length
      continue
    }

    const inputPath = join(workDir, basename(source))
    await writeFile(inputPath, input)

    // One process per source: decode once, then write every width from a clone.
    // ">" never upscales, so small sources yield identical files, which git
    // deduplicates.
    const outputs = WIDTHS.map((width) => `${base}-${width}.webp`)
    await run('magick', [
      ...(source.endsWith('.svg') ? ['-background', 'none', '-density', String(RASTER_SVG_DENSITY)] : []),
      inputPath,
      '-colorspace', 'sRGB',
      '-strip',
      ...WIDTHS.flatMap((width, i) => [
        '(', '+clone', '-resize', `${width}x>`,
        '-quality', String(QUALITY), '-define', 'webp:method=6',
        '-write', outputs[i], '+delete', ')',
      ]),
      'null:',
    ])
    for (const output of outputs) totalOut += (await stat(output)).size
    await rm(inputPath)
    console.log(source)
  }

  await rm(workDir, { recursive: true })
  console.log(`\n${sources.length} sources, ${(totalIn / 1e6).toFixed(1)} MB in, ${(totalOut / 1e6).toFixed(1)} MB out (all widths)`)
}

async function* sourceFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* sourceFiles(path)
    else if (/\.(tsx?|css)$/.test(entry.name)) yield path
  }
}

async function check() {
  const known = new Set((await readSources()).map((source) => source.replace(/\.\w+$/, '')))
  const missing = new Set()
  const pattern = /\/img\/([\w./-]+)\.(?:webp|svg|webm)/g

  for (const dir of ['app', 'components', 'lib']) {
    for await (const file of sourceFiles(join(ROOT, dir))) {
      for (const [ref, path] of (await readFile(file, 'utf8')).matchAll(pattern)) {
        // Direct references (posters, map pins) name a specific width.
        const base = path.replace(new RegExp(`-(?:${WIDTHS.join('|')})$`), '')
        if (!known.has(base) && !HAND_MANAGED.has(base)) missing.add(`${ref} (in ${file})`)
      }
    }
  }

  if (missing.size) {
    console.error(`Unknown images. Add them to scripts/image-sources.json and regenerate:\n  ${[...missing].join('\n  ')}`)
    process.exit(1)
  }
  console.log('All referenced /img files are known.')
}

await (process.argv.includes('--check') ? check() : generate())
