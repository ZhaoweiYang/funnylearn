/** 开场引导卡：解释玩法，第一屏就营造「刷起来」的氛围 */
export function IntroCard({ active }: { active: boolean }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-8 pt-20 pb-16 text-center">
      <div className={active ? 'rise-in' : 'opacity-0'}>
        <div className="float text-7xl">🤓</div>
        <h1 className="mt-4 text-4xl font-black tracking-tight">
          梗<span className="text-fuchsia-400">词</span>
        </h1>
        <p className="mt-2 text-lg font-semibold text-white/90">
          像刷短视频一样背单词
        </p>
      </div>

      <div
        className="mt-8 max-w-xs space-y-3 text-left text-sm text-white/75"
        style={{ animationDelay: '0.15s' }}
      >
        {[
          ['🎭', '每一条都是一个把单词讲成「段子」的小卡片'],
          ['👆', '上滑看下一个梗，下滑回看上一个'],
          ['🔊', '点单词旁的小喇叭，听地道发音'],
          ['❤️', '右侧给喜欢的梗点赞、收藏到生词本'],
        ].map(([icon, text], i) => (
          <div
            key={text}
            className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 ${active ? 'rise-in' : 'opacity-0'}`}
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <span className="text-xl">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center text-white/60">
        <span className="swipe-hint text-3xl">👆</span>
        <span className="mt-1 text-sm font-medium">上滑开始</span>
      </div>
    </div>
  )
}
