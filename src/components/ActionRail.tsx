import { useState, type ReactNode } from 'react'
import type { WordCard } from '../types'
import { getTheme } from '../lib/themes'
import { useFeed } from '../context/FeedContext'
import { useSpeech } from '../hooks/useSpeech'

/** TikTok 式右侧操作栏：点赞 / 收藏 / 发音 / 分享 */
export function ActionRail({ card }: { card: WordCard }) {
  const theme = getTheme(card.accent)
  const { liked, saved } = useFeed()
  const { supported, speak } = useSpeech()
  const [toast, setToast] = useState('')
  const [bump, setBump] = useState(false)

  const isLiked = liked.has(card.id)
  const isSaved = saved.has(card.id)

  function onLike() {
    liked.toggle(card.id)
    setBump(true)
    setTimeout(() => setBump(false), 450)
  }

  async function onShare() {
    const text = `${card.word} = ${card.meaning} —— 我在「梗词」上一秒记住了它！`
    try {
      if (navigator.share) {
        await navigator.share({ title: '梗词', text })
        return
      }
      await navigator.clipboard.writeText(text)
      flash('已复制到剪贴板')
    } catch {
      flash('分享失败 🙈')
    }
  }

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 1600)
  }

  return (
    <div className="pointer-events-auto absolute bottom-28 right-3 z-20 flex flex-col items-center gap-5">
      <RailButton
        label={isLiked ? '已赞' : '点赞'}
        active={isLiked}
        activeColor="#ff4d6d"
        onClick={onLike}
      >
        <span className={bump ? 'heart-pop inline-block' : 'inline-block'}>
          {isLiked ? '❤️' : '🤍'}
        </span>
      </RailButton>

      <RailButton
        label={isSaved ? '已收藏' : '收藏'}
        active={isSaved}
        activeColor={theme.accent}
        onClick={() => {
          saved.toggle(card.id)
          flash(isSaved ? '已移出生词本' : '已加入生词本 🔖')
        }}
      >
        {isSaved ? '🔖' : '📑'}
      </RailButton>

      {supported && (
        <RailButton label="发音" onClick={() => speak(card.word)}>
          🔊
        </RailButton>
      )}

      <RailButton label="分享" onClick={onShare}>
        🔗
      </RailButton>

      {toast && (
        <div className="pointer-events-none absolute -left-2 bottom-0 -translate-x-full whitespace-nowrap rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white">
          {toast}
        </div>
      )}
    </div>
  )
}

function RailButton({
  children,
  label,
  onClick,
  active,
  activeColor,
}: {
  children: ReactNode
  label: string
  onClick: () => void
  active?: boolean
  activeColor?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex flex-col items-center gap-1 transition active:scale-90"
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-full bg-black/30 text-2xl backdrop-blur"
        style={active && activeColor ? { boxShadow: `0 0 0 2px ${activeColor}` } : undefined}
      >
        {children}
      </span>
      <span className="text-[11px] font-medium text-white/85">{label}</span>
    </button>
  )
}
