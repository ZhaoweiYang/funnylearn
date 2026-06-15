// ---------------------------------------------------------------------------
// 梗词 数据模型
//
// 每个 Card 就是 feed 里的一条「短视频」/一次上滑。不同的 `type` 对应不同的
// 趣味化讲解方式（段子、词根、测验、配对、动画场景……）。想加新内容，只要往
// `src/data/words.ts` 里追加一个对象即可。
// ---------------------------------------------------------------------------

/** 主题配色（决定卡片背景渐变与高亮色），见 src/lib/themes.ts */
export type AccentTheme =
  | 'sunset'
  | 'ocean'
  | 'grape'
  | 'forest'
  | 'candy'
  | 'gold'
  | 'mono'

/** 例句：英文 + 中文翻译 */
export interface Example {
  en: string
  zh: string
}

/** 所有卡片共有的字段 */
interface CardCommon {
  /** 唯一 id，用于点赞/收藏的本地存储键 */
  id: string
  accent?: AccentTheme
  /** 难度 / 分类标签，展示在卡片角落 */
  tags?: string[]
}

/** 跟某个具体单词绑定的卡片共有字段 */
interface WordCardCommon extends CardCommon {
  word: string
  /** 音标，如 /ˈæmbjələns/ */
  phonetic: string
  /** 词性，如 n. / v. / adj. */
  pos: string
  /** 中文释义 */
  meaning: string
}

/** 开场引导卡 */
export interface IntroCard extends CardCommon {
  type: 'intro'
}

/** 结尾总结卡 */
export interface OutroCard extends CardCommon {
  type: 'outro'
}

/** 谐音梗 / 段子卡：核心玩法 */
export interface MnemonicCard extends WordCardCommon {
  type: 'mnemonic'
  /** 大 emoji，做主视觉 */
  emoji: string
  /** 谐音钩子，如「俺不能死」 */
  hook: string
  /** 段子全文 */
  story: string
  example: Example
}

/** 词根拆解卡：可点击的词素 */
export interface EtymologyCard extends WordCardCommon {
  type: 'etymology'
  emoji: string
  /** 词素拆解，按顺序拼成单词 */
  parts: { text: string; mean: string }[]
  /** 同根词家族 */
  family: { word: string; meaning: string }[]
  example: Example
}

/** 小测验卡 */
export interface QuizCard extends WordCardCommon {
  type: 'quiz'
  emoji: string
  question: string
  options: { text: string; correct: boolean }[]
  /** 答完后的解释 */
  explain: string
}

/** 配对小游戏卡：点对应含义的图标 */
export interface MatchCard extends WordCardCommon {
  type: 'match'
  prompt: string
  options: { emoji: string; label: string; correct: boolean }[]
  example: Example
}

/** 动画场景卡：用 CSS 动画演出单词含义，像一小段短视频 */
export interface SceneCard extends WordCardCommon {
  type: 'scene'
  /** 对应 SceneStage 里的某个动画 */
  scene: 'soar' | 'blossom'
  caption: string
  example: Example
}

export type Card =
  | IntroCard
  | OutroCard
  | MnemonicCard
  | EtymologyCard
  | QuizCard
  | MatchCard
  | SceneCard

/** 带单词的卡片（intro / outro 之外）—— 用于点赞、收藏、统计 */
export type WordCard = Exclude<Card, IntroCard | OutroCard>

export function isWordCard(card: Card): card is WordCard {
  return card.type !== 'intro' && card.type !== 'outro'
}
