import { useFeed } from '../context/FeedContext'

/** 顶部状态条：品牌 + 进度 + 已学计数 */
export function TopBar({ progress }: { progress: number }) {
  const { learned, liked, totalWords } = useFeed()

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-black tracking-tight text-white drop-shadow">
          梗<span className="text-fuchsia-400">词</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-white/85">
          <span className="rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
            📚 已学 {learned.count}/{totalWords}
          </span>
          <span className="rounded-full bg-black/35 px-2.5 py-1 backdrop-blur">
            ❤️ {liked.count}
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400 transition-[width] duration-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  )
}
