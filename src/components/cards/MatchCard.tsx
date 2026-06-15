import { useEffect, useState } from 'react'
import type { MatchCard as MatchCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { WordTitle } from '../ui/WordTitle'
import { ExampleBlock } from '../ui/ExampleBlock'
import { Confetti } from '../ui/Confetti'

/** 配对小游戏卡：点中与单词含义匹配的图标 */
export function MatchCard({
  card,
  active,
}: {
  card: MatchCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'
  const [picked, setPicked] = useState<number | null>(null)
  const done = picked !== null && card.options[picked].correct

  useEffect(() => {
    if (!active) setPicked(null)
  }, [active])

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      {done && <Confetti color={theme.accent} />}

      <div className={show} style={{ animationDelay: '0.05s' }}>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          style={{ background: `${theme.accent}22`, color: theme.accent }}
        >
          配对小游戏
        </span>
      </div>

      <div className={show} style={{ animationDelay: '0.1s' }}>
        <WordTitle
          word={card.word}
          phonetic={card.phonetic}
          pos={card.pos}
          accent={theme.accent}
        />
      </div>

      <p className={`${show} max-w-sm text-base font-semibold text-white/90`} style={{ animationDelay: '0.18s' }}>
        {card.prompt}
      </p>

      <div className={`${show} grid w-full max-w-sm grid-cols-2 gap-3`} style={{ animationDelay: '0.26s' }}>
        {card.options.map((opt, i) => {
          const isPicked = picked === i
          const reveal = picked !== null
          let border = 'rgba(255,255,255,0.12)'
          let bg = 'rgba(255,255,255,0.05)'
          if (reveal && opt.correct) {
            border = '#34d399'
            bg = 'rgba(52,211,153,0.16)'
          } else if (isPicked && !opt.correct) {
            border = '#f87171'
            bg = 'rgba(248,113,113,0.16)'
          }
          return (
            <button
              key={opt.label}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={`flex flex-col items-center gap-1 rounded-3xl border py-5 transition active:scale-95 ${
                isPicked && !opt.correct ? 'shake' : ''
              }`}
              style={{ borderColor: border, background: bg }}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span className="text-sm font-medium text-white/80">{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="h-16 w-full max-w-sm">
        {picked !== null && (
          <p className="rise-in text-base font-bold" style={{ color: done ? '#34d399' : theme.accent }}>
            {done ? `没错！${card.word} = ${card.meaning} 🎉` : '再想想，看看哪个最贴切～'}
          </p>
        )}
      </div>

      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.34s' }}>
        <ExampleBlock example={card.example} accent={theme.accent} />
      </div>
    </div>
  )
}
