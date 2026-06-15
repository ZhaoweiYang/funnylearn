import { useCallback, useEffect, useRef, useState } from 'react'
import { CARDS } from '../data/words'
import { isWordCard } from '../types'
import { useFeed } from '../context/FeedContext'
import { Reel } from './Reel'
import { TopBar } from './TopBar'

/** 竖向吸附滚动的「信息流」，每屏一条，模拟刷短视频 */
export function Feed() {
  const { learned } = useFeed()
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const total = CARDS.length

  const scrollToIndex = useCallback((i: number) => {
    const el = containerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(total - 1, i))
    el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' })
  }, [total])

  // 滚动 → 计算当前激活的卡片
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const idx = Math.round(el.scrollTop / el.clientHeight)
        setActive((prev) => (prev === idx ? prev : idx))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // 刷到某个单词卡 → 记为「已学」
  useEffect(() => {
    const card = CARDS[active]
    if (card && isWordCard(card)) learned.add(card.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // 桌面端：方向键 / 空格 翻页
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        scrollToIndex(active + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        scrollToIndex(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, scrollToIndex])

  const progress = total > 1 ? active / (total - 1) : 1

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-md overflow-hidden bg-black">
      <TopBar progress={progress} />
      <div
        ref={containerRef}
        className="no-scrollbar h-full w-full snap-y snap-mandatory overflow-y-scroll"
      >
        {CARDS.map((card, i) => (
          <Reel
            key={card.id}
            card={card}
            active={i === active}
            onRestart={() => scrollToIndex(0)}
          />
        ))}
      </div>
    </div>
  )
}
