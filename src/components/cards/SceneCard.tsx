import { useEffect, useState } from 'react'
import type { SceneCard as SceneCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { WordTitle } from '../ui/WordTitle'
import { ExampleBlock } from '../ui/ExampleBlock'
import { SceneStage } from '../ui/SceneStage'

/** 动画场景卡：用一小段 CSS 动画把单词「演」出来，像短视频一样直观 */
export function SceneCard({
  card,
  active,
}: {
  card: SceneCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'
  // playKey 变化 = 重新触发动画
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    if (active) setPlayKey((k) => k + 1)
  }, [active])

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      <div className={show}>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          style={{ background: `${theme.accent}22`, color: theme.accent }}
        >
          动画场景
        </span>
      </div>

      {/* 舞台 */}
      <div className="relative h-56 w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <SceneStage scene={card.scene} playKey={playKey} accent={theme.accent} />
        <button
          type="button"
          onClick={() => setPlayKey((k) => k + 1)}
          className="absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition active:scale-95"
        >
          ↻ 重播
        </button>
      </div>

      <p className={`${show} max-w-sm text-base font-semibold text-white/90`} style={{ animationDelay: '0.1s' }}>
        {card.caption}
      </p>

      <div className={show} style={{ animationDelay: '0.18s' }}>
        <WordTitle
          word={card.word}
          phonetic={card.phonetic}
          pos={card.pos}
          accent={theme.accent}
          size="inline"
        />
        <p className="mt-2 text-base font-bold text-white">{card.meaning}</p>
      </div>

      <div className={`${show} w-full max-w-sm`} style={{ animationDelay: '0.26s' }}>
        <ExampleBlock example={card.example} accent={theme.accent} />
      </div>
    </div>
  )
}
