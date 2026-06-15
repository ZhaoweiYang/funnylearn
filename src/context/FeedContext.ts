import { createContext, useContext } from 'react'
import type { useStringSet } from '../hooks/useLocalStorage'

type StringSetApi = ReturnType<typeof useStringSet>

export interface FeedState {
  /** 点赞的卡片 id 集合 */
  liked: StringSetApi
  /** 收藏到生词本的卡片 id 集合 */
  saved: StringSetApi
  /** 已学过（刷到过）的单词 id 集合 */
  learned: StringSetApi
  /** 单词卡总数（不含 intro/outro） */
  totalWords: number
}

export const FeedContext = createContext<FeedState | null>(null)

export function useFeed(): FeedState {
  const ctx = useContext(FeedContext)
  if (!ctx) throw new Error('useFeed 必须在 FeedContext.Provider 内使用')
  return ctx
}
