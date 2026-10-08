// Builds the Agenient browser and search icons from public/favicon.svg (the Agenient emblem, the static v14 medallion
// from the app). Patrick 2026-10-08: Google showed the old Metro Point Technology sun-and-servers icon beside
// agenient.com. Run: node scripts/make-favicons.mjs
//   public/favicon.ico            16, 32 and 48 px (PNG inside ICO). Google wants a square icon in a multiple of 48 px.
//   public/icon-192.png           Android / general
//   public/apple-touch-icon.png   180 px, iOS home screen
//   public/agenient-emblem-512.png  the brand logo in structured data
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const pub = path.join(import.meta.dirname, '..', 'public')
const svg = fs.readFileSync(path.join(pub, 'favicon.svg'))
const png = (size) => sharp(svg, { density: Math.max(72, Math.ceil((72 * size) / 240) * 4) }).resize(size, size).png().toBuffer()

const icoSizes = [16, 32, 48]
const images = await Promise.all(icoSizes.map(png))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(images.length, 4)
let offset = 6 + 16 * images.length
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(icoSizes[i] % 256, 0) // width (0 means 256)
  e.writeUInt8(icoSizes[i] % 256, 1) // height
  e.writeUInt8(0, 2) // palette
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // colour planes
  e.writeUInt16LE(32, 6) // bits per pixel
  e.writeUInt32LE(img.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += img.length
  return e
})
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...entries, ...images]))
fs.writeFileSync(path.join(pub, 'icon-192.png'), await png(192))
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), await png(180))
fs.writeFileSync(path.join(pub, 'agenient-emblem-512.png'), await png(512))
for (const f of ['favicon.ico', 'icon-192.png', 'apple-touch-icon.png', 'agenient-emblem-512.png']) {
  console.log(f, fs.statSync(path.join(pub, f)).size, 'bytes')
}
