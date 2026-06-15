import { useEffect, useState } from 'react'
import type { QuizCard as QuizCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { Confetti } from '../ui/Confetti'
import { Tags } from '../ui/Tags'

/** 小测验卡：点选项，即时反馈对错 + 解释 */
export function QuizCard({
  card,
  active,
}: {
  card: QuizCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'
  const [picked, setPicked] = useState<number | null>(null)
  const correctIdx = card.options.findIndex((o) => o.correct)
  const answered = picked !== null
  const gotIt = answered && card.options[picked!].correct

  useEffect(() => {
    if (!active) setPicked(null)
  }, [active])

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      {gotIt && <Confetti color={theme.accent} />}

      <div className={`${active ? 'pop-in' : 'opacity-0'} text-6xl`}>{card.emoji}</div>

      <div className={show} style={{ animationDelay: '0.05s' }}>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          style={{ background: `${theme.accent}22`, color: theme.accent }}
        >
          小测验
        </span>
        <h2 className="mt-3 max-w-sm text-xl font-bold leading-snug text-white">
          {card.question}
        </h2>
      </div>

      <div className={`${show} w-full max-w-sm space-y-2.5`} style={{ animationDelay: '0.15s' }}>
        {card.options.map((opt, i) => {
          const isPicked = picked === i
          const isCorrect = i === correctIdx
          let bg = 'rgba(255,255,255,0.06)'
          let border = 'rgba(255,255,255,0.12)'
          if (answered && isCorrect) {
            bg = 'rgba(52,211,153,0.18)'
            border = '#34d399'
          } else if (answered && isPicked && !isCorrect) {
            bg = 'rgba(248,113,113,0.18)'
            border = '#f87171'
          }
          return (
            <button
              key={opt.text}
              type="button"
              disabled={answered}
              onClick={() => setPicked(i)}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition active:scale-[0.99] ${
                answered && isPicked && !isCorrect ? 'shake' : ''
              }`}
              style={{ background: bg, borderColor: border }}
            >
              <span>{opt.text}</span>
              {answered && isCorrect && <span>✅</span>}
              {answered && isPicked && !isCorrect && <span>❌</span>}
            </button>
          )
        })}
      </div>

      {/* 答完后的反馈 */}
      <div className="h-24 w-full max-w-sm">
        {answered && (
          <div className="rise-in rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="font-bold" style={{ color: gotIt ? '#34d399' : theme.accent }}>
              {gotIt ? '答对了！+10 🎉' : '差一点～再记一次 💪'}
            </p>
            <p className="mt-1 text-sm text-white/75">{card.explain}</p>
          </div>
        )}
      </div>

      <div className={show} style={{ animationDelay: '0.3s' }}>
        <Tags tags={card.tags} accent={theme.accent} />
      </div>
    </div>
  )
}
