import type { MovieCard as MovieCardData } from '../../types'
import { getTheme } from '../../lib/themes'
import { WordTitle } from '../ui/WordTitle'
import { Tags } from '../ui/Tags'
import { YouglishPlayer } from '../ui/YouglishPlayer'

/** 影视台词卡：真实电影台词 + YouGlish 真实视频片段，看这个词到底怎么用 */
export function MovieCard({
  card,
  active,
}: {
  card: MovieCardData
  active: boolean
}) {
  const theme = getTheme(card.accent)
  const show = active ? 'rise-in' : 'opacity-0'

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-5 px-7 pt-20 pb-24 text-center">
      <div className={show}>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          style={{ background: `${theme.accent}22`, color: theme.accent }}
        >
          🎬 影视台词
        </span>
      </div>

      <div className={show} style={{ animationDelay: '0.06s' }}>
        <WordTitle
          word={card.word}
          phonetic={card.phonetic}
          pos={card.pos}
          accent={theme.accent}
        />
        <div className="mt-3">
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-base font-bold text-white">
            {card.meaning}
          </span>
        </div>
      </div>

      {/* 精选电影台词（可选） */}
      {card.quote && (
        <blockquote
          className={`${show} w-full max-w-sm rounded-2xl border-l-4 bg-white/5 p-4 text-left`}
          style={{ borderColor: theme.accent, animationDelay: '0.14s' }}
        >
          <p className="text-[15px] font-semibold leading-snug text-white">
            “{card.quote.en}”
          </p>
          <p className="mt-1 text-sm text-white/60">{card.quote.zh}</p>
          <footer className="mt-2 text-xs font-medium" style={{ color: theme.accent }}>
            —— 《{card.quote.from}》
          </footer>
        </blockquote>
      )}

      <div className={show} style={{ animationDelay: '0.2s' }}>
        <YouglishPlayer word={card.word} accent={theme.accent} active={active} />
      </div>

      <div className={show} style={{ animationDelay: '0.28s' }}>
        <Tags tags={card.tags} accent={theme.accent} />
      </div>
    </div>
  )
}
