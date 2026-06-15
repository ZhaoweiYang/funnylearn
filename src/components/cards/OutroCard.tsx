import { useFeed } from '../../context/FeedContext'

/** 结尾卡：展示本次「战绩」，鼓励再刷一轮 */
export function OutroCard({
  active,
  onRestart,
}: {
  active: boolean
  onRestart: () => void
}) {
  const { learned, liked, saved, totalWords } = useFeed()
  const show = active ? 'rise-in' : 'opacity-0'

  const stats = [
    { icon: '📚', label: '学过的词', value: `${learned.count}/${totalWords}` },
    { icon: '❤️', label: '点赞的梗', value: liked.count },
    { icon: '🔖', label: '生词本', value: saved.count },
  ]

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 px-8 pt-20 pb-16 text-center">
      <div className={`${active ? 'pop-in' : 'opacity-0'} text-7xl`}>🎉</div>

      <div className={show}>
        <h2 className="text-3xl font-black">这一轮刷完啦！</h2>
        <p className="mt-2 text-white/70">记住一个梗，就记住一个词 ✨</p>
      </div>

      <div className={`${show} grid w-full max-w-xs grid-cols-3 gap-3`} style={{ animationDelay: '0.1s' }}>
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 py-4">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-1 text-xl font-black text-white">{s.value}</div>
            <div className="text-[11px] text-white/60">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className={`${show} rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500 px-8 py-3.5 text-base font-bold text-white shadow-lg transition active:scale-95`}
        style={{ animationDelay: '0.2s' }}
      >
        ↻ 再刷一轮
      </button>

      <p className={`${show} max-w-xs text-xs leading-relaxed text-white/45`} style={{ animationDelay: '0.28s' }}>
        想加入你自己的单词梗？编辑 <code className="text-white/70">src/data/words.ts</code> 即可。
      </p>
    </div>
  )
}
