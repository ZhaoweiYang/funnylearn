import type { MnemonicCard as MnemonicCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { WordTitle } from '../ui/WordTitle'
import { ExampleBlock } from '../ui/ExampleBlock'
import { Tags } from '../ui/Tags'

/** 谐音梗 / 段子卡 —— App 的核心玩法 */
export function MnemonicCard({
  card,
  active,
}: {
  card: MnemonicCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      <div className={`${active ? 'pop-in' : 'opacity-0'} text-7xl float`}>{card.emoji}</div>

      <div className={show} style={{ animationDelay: '0.05s' }}>
        <WordTitle
          word={card.word}
          phonetic={card.phonetic}
          pos={card.pos}
          accent={theme.accent}
        />
      </div>

      {/* 谐音钩子：高亮的「读起来像」 */}
      <div className={`${show} flex flex-col items-center gap-1`} style={{ animationDelay: '0.15s' }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
          读起来像
        </span>
        <span
          className="text-3xl font-black"
          style={{ color: theme.accent, textShadow: `0 0 28px ${theme.glow}` }}
        >
          「{card.hook}」
        </span>
      </div>

      {/* 段子 */}
      <p
        className={`${show} max-w-sm text-[15px] leading-relaxed text-white/85`}
        style={{ animationDelay: '0.25s' }}
      >
        {card.story}
      </p>

      {/* 释义 */}
      <div className={show} style={{ animationDelay: '0.32s' }}>
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-base font-bold text-white">
          {card.meaning}
        </span>
      </div>

      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.4s' }}>
        <ExampleBlock example={card.example} accent={theme.accent} />
      </div>

      <div className={show} style={{ animationDelay: '0.48s' }}>
        <Tags tags={card.tags} accent={theme.accent} />
      </div>
    </div>
  )
}
