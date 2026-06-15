// ---------------------------------------------------------------------------
// ECDICT → 梗词 词库导入脚本
//
// 从 ECDICT(https://github.com/skywind3000/ECDICT, MIT)按 "CET4 + 词频" 筛词,
// 生成 src/data/cet4.ts(一批 movie 影视台词卡, 每个词都能用 YouGlish 看真实用法)。
//
// 用法:
//   node scripts/import-ecdict.mjs            # 自动下载 ecdict.csv 到 /tmp 并生成
//   node scripts/import-ecdict.mjs path.csv   # 用本地 csv
//   LIMIT=80 TAG=cet6 node scripts/import-ecdict.mjs
// ---------------------------------------------------------------------------
import fs from 'node:fs'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { parse } from 'csv-parse'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const CSV_URL =
  'https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv'
const TAG = process.env.TAG || 'cet4'
const LIMIT = Number(process.env.LIMIT || 60)
const OUT = path.join(ROOT, 'src/data/cet4.ts')
const ACCENTS = ['sunset', 'ocean', 'grape', 'forest', 'candy', 'gold', 'mono']

// 已在 words.ts 里精心编排过的词, 避免重复
const EXCLUDE = new Set([
  'abandon', 'ambulance', 'transport', 'agony', 'pregnant', 'sting', 'pest',
  'economy', 'telescope', 'ambition', 'soar', 'morose', 'flee', 'predict',
  'ponderous', 'blossom', 'force', 'offer', 'hope', 'chocolate',
])

const POS_MAP = {
  n: 'n.', v: 'v.', vt: 'v.', vi: 'v.', a: 'adj.', adj: 'adj.', ad: 'adv.',
  adv: 'adv.', prep: 'prep.', conj: 'conj.', pron: 'pron.', art: 'art.',
  num: 'num.', int: 'int.', aux: 'aux.',
}

function firstSense(translation) {
  return (translation || '').split('\\n')[0].trim()
}
function derivePos(seg) {
  const m = seg.match(/^([a-z]+)\./i)
  return (m && POS_MAP[m[1].toLowerCase()]) || ''
}
function cleanMeaning(seg) {
  const s = seg.replace(/^[a-z]+\.\s*/i, '').trim()
  const parts = s.split(/[,，;；]/).map((x) => x.trim()).filter(Boolean)
  let out = parts.slice(0, 3).join('，')
  if (out.length > 18) out = out.slice(0, 18) + '…'
  return out || s.slice(0, 18)
}

async function getCsvStream(localPath) {
  if (localPath && fs.existsSync(localPath)) {
    console.log('reading local csv:', localPath)
    return fs.createReadStream(localPath)
  }
  const cached = '/tmp/ecdict.csv'
  if (fs.existsSync(cached)) {
    console.log('reading cached csv:', cached)
    return fs.createReadStream(cached)
  }
  console.log('downloading ECDICT csv …', CSV_URL)
  const res = await fetch(CSV_URL)
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(cached, buf)
  console.log('saved', buf.length, 'bytes to', cached)
  return Readable.from(buf)
}

async function main() {
  const stream = await getCsvStream(process.argv[2])
  const rows = []
  await new Promise((resolve, reject) => {
    stream
      .pipe(parse({ columns: true, relax_quotes: true, skip_records_with_error: true }))
      .on('data', (r) => rows.push(r))
      .on('end', resolve)
      .on('error', reject)
  })
  console.log('parsed rows:', rows.length)

  const picked = rows
    .filter((r) => {
      const w = (r.word || '').toLowerCase()
      return (
        (r.tag || '').split(/\s+/).includes(TAG) &&
        /^[a-z]{2,15}$/.test(w) &&
        !EXCLUDE.has(w) &&
        r.translation &&
        Number(r.frq) > 0
      )
    })
    // 按词频升序(数字越小越高频)
    .sort((a, b) => Number(a.frq) - Number(b.frq))
    // 同一拼写去重
    .filter((r, i, arr) => arr.findIndex((x) => x.word.toLowerCase() === r.word.toLowerCase()) === i)
    .slice(0, LIMIT)

  const cards = picked.map((r, i) => {
    const seg = firstSense(r.translation)
    return {
      id: `cet4-${r.word.toLowerCase()}`,
      type: 'movie',
      accent: ACCENTS[i % ACCENTS.length],
      word: r.word.toLowerCase(),
      phonetic: r.phonetic ? `/${r.phonetic}/` : '',
      pos: derivePos(seg),
      meaning: cleanMeaning(seg),
      tags: ['CET4', `高频#${i + 1}`],
    }
  })

  const banner =
    `// ⚠️ 自动生成, 请勿手改 —— 由 \`npm run import:ecdict\` 生成。\n` +
    `// 数据来源: ECDICT https://github.com/skywind3000/ECDICT (MIT)\n` +
    `// 筛选: tag=${TAG}, 按词频(frq)升序取前 ${LIMIT} 个高频词。\n` +
    `import type { Card } from '../types'\n\n` +
    `export const CET4_CARDS: Card[] = ${JSON.stringify(cards, null, 2)}\n`

  fs.writeFileSync(OUT, banner, 'utf8')
  console.log(`✓ wrote ${cards.length} cards → ${path.relative(ROOT, OUT)}`)
  console.log('sample:', cards.slice(0, 5).map((c) => `${c.word}(${c.meaning})`).join(', '))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
