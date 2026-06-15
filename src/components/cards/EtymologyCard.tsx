import { useEffect, useState } from 'react'
import type { EtymologyCard as EtymologyCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { WordTitle } from '../ui/WordTitle'
import { ExampleBlock } from '../ui/ExampleBlock'
import { Tags } from '../ui/Tags'

/** 词根拆解卡：点词素看含义，理解「拼出来」的逻辑 */
export function EtymologyCard({
  card,
  active,
}: {
  card: EtymologyCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'
  const [opened, setOpened] = useState<number | null>(null)

  // 离开卡片时收起，再回来是干净状态
  useEffect(() => {
    if (!active) setOpened(null)
  }, [active])

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      <div className={`${active ? 'pop-in' : 'opacity-0'} text-6xl float`}>{card.emoji}</div>

      <div className={show} style={{ animationDelay: '0.05s' }}>
        <WordTitle
          word={card.word}
          phonetic={card.phonetic}
          pos={card.pos}
          accent={theme.accent}
        />
        <p className="mt-3 text-base font-bold text-white">{card.meaning}</p>
      </div>

      {/* 可点击的词素 */}
      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.18s' }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          点一点，拆开记 👇
        </p>
        <div className="flex flex-wrap items-stretch justify-center gap-2">
          {card.parts.map((p, i) => {
            const isOpen = opened === i
            return (
              <button
                key={p.text}
                type="button"
                onClick={() => setOpened(isOpen ? null : i)}
                className="rounded-2xl border px-4 py-3 text-left transition active:scale-95"
                style={{
                  borderColor: isOpen ? theme.accent : 'rgba(255,255,255,0.15)',
                  background: isOpen ? `${theme.accent}1f` : 'rgba(255,255,255,0.05)',
                }}
              >
                <span
                  className="block text-xl font-black"
                  style={{ color: isOpen ? theme.accent : '#fff' }}
                >
                  {p.text}
                </span>
                <span
                  className={`block overflow-hidden text-xs text-white/70 transition-all ${
                    isOpen ? 'mt-1 max-h-12 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {p.mean}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 同根词家族 */}
      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.3s' }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
          同根词家族
        </p>
        <div className="space-y-1.5">
          {card.family.map((f) => (
            <div
              key={f.word}
              className="flex items-baseline justify-between gap-3 rounded-xl bg-white/5 px-3.5 py-2 text-left"
            >
              <span className="font-bold" style={{ color: theme.accent }}>
                {f.word}
              </span>
              <span className="text-sm text-white/70">{f.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.42s' }}>
        <ExampleBlock example={card.example} accent={theme.accent} />
      </div>

      <div className={show} style={{ animationDelay: '0.5s' }}>
        <Tags tags={card.tags} accent={theme.accent} />
      </div>
    </div>
  )
}
