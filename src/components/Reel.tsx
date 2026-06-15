import type { Card } from '../types'
import { isWordCard } from '../types'
import { getTheme } from '../lib/themes'
import { ActionRail } from './ActionRail'
import { IntroCard } from './cards/IntroCard'
import { OutroCard } from './cards/OutroCard'
import { MnemonicCard } from './cards/MnemonicCard'
import { EtymologyCard } from './cards/EtymologyCard'
import { QuizCard } from './cards/QuizCard'
import { MatchCard } from './cards/MatchCard'
import { SceneCard } from './cards/SceneCard'
import { MovieCard } from './cards/MovieCard'

/** 一个全屏、可吸附的「短视频位」，承载一张卡片 */
export function Reel({
  card,
  active,
  onRestart,
}: {
  card: Card
  active: boolean
  onRestart: () => void
}) {
  const theme = getTheme(card.accent)

  return (
    <section
      data-reel
      className="relative flex h-[100dvh] w-full shrink-0 snap-start snap-always items-center justify-center overflow-hidden"
      style={{ background: theme.background }}
    >
      {/* 顶部柔光 */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 70%)` }}
      />

      {/* 卡片内容：内层可滚动，内容超出一屏时不会被裁切（外层吸附依旧生效） */}
      <div className="no-scrollbar relative z-10 h-full w-full overflow-y-auto">
        <CardBody card={card} active={active} onRestart={onRestart} />
      </div>

      {/* 右侧操作栏：仅单词卡有 */}
      {isWordCard(card) && <ActionRail card={card} />}
    </section>
  )
}

function CardBody({
  card,
  active,
  onRestart,
}: {
  card: Card
  active: boolean
  onRestart: () => void
}) {
  switch (card.type) {
    case 'intro':
      return <IntroCard active={active} />
    case 'outro':
      return <OutroCard active={active} onRestart={onRestart} />
    case 'mnemonic':
      return <MnemonicCard card={card} active={active} />
    case 'etymology':
      return <EtymologyCard card={card} active={active} />
    case 'quiz':
      return <QuizCard card={card} active={active} />
    case 'match':
      return <MatchCard card={card} active={active} />
    case 'scene':
      return <SceneCard card={card} active={active} />
    case 'movie':
      return <MovieCard card={card} active={active} />
  }
}
