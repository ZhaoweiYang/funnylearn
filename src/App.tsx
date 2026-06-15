import { useMemo } from 'react'
import { CARDS } from './data/words'
import { isWordCard } from './types'
import { FeedContext, type FeedState } from './context/FeedContext'
import { useStringSet } from './hooks/useLocalStorage'
import { Feed } from './components/Feed'

export default function App() {
  const liked = useStringSet('gengci.liked')
  const saved = useStringSet('gengci.saved')
  const learned = useStringSet('gengci.learned')

  const totalWords = useMemo(() => CARDS.filter(isWordCard).length, [])

  const value: FeedState = { liked, saved, learned, totalWords }

  return (
    <FeedContext.Provider value={value}>
      <Feed />
    </FeedContext.Provider>
  )
}
