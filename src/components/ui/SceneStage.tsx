import type { CSSProperties } from 'react'

/**
 * 动画舞台：根据 scene 渲染不同的纯 CSS「小短片」。
 * 用 playKey 作为 React key 强制重挂载，从而每次都重头播放动画。
 */
export function SceneStage({
  scene,
  playKey,
  accent,
}: {
  scene: 'soar' | 'blossom'
  playKey: number
  accent: string
}) {
  return (
    <div key={playKey} className="absolute inset-0">
      {scene === 'soar' ? <Soar accent={accent} /> : <Blossom accent={accent} />}
    </div>
  )
}

/** soar：雄鹰从左下翱翔到右上 */
function Soar({ accent }: { accent: string }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute right-5 top-4 text-3xl">☀️</div>
      <div className="absolute left-6 top-10 text-2xl opacity-70">☁️</div>
      <div className="absolute right-12 top-20 text-xl opacity-50">☁️</div>
      {/* 上升的轨迹光 */}
      <div
        className="absolute bottom-6 left-8 h-40 w-1 origin-bottom -rotate-45 rounded-full"
        style={{
          background: `linear-gradient(to top, ${accent}00, ${accent}aa)`,
          filter: 'blur(1px)',
        }}
      />
      <div className="soar-fly absolute bottom-8 left-10 text-5xl drop-shadow-lg">🦅</div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}

/** blossom：花瓣从花心向外绽放 */
function Blossom({ accent }: { accent: string }) {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative h-28 w-28">
        {petals.map((rot) => (
          <span
            key={rot}
            className="absolute left-1/2 top-1/2 h-12 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={
              {
                '--rot': `${rot}deg`,
                background: `linear-gradient(180deg, #ffd1e8, ${accent})`,
                animation: `petal-spread 1.4s cubic-bezier(0.22,1,0.36,1) ${rot / 1200 + 0.2}s both`,
                boxShadow: `0 0 18px ${accent}66`,
              } as CSSProperties
            }
          />
        ))}
        {/* 花心 */}
        <span className="blossom-open absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-300 text-2xl">
          🌼
        </span>
      </div>
    </div>
  )
}
