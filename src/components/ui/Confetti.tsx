import { useMemo } from 'react'

/** 答对时的彩色碎屑庆祝，纯 CSS 动画，无依赖 */
export function Confetti({ color }: { color: string }) {
  const palette = ['#fbbf24', '#34d399', '#38bdf8', '#f472b6', '#c084fc', color]
  const pieces = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.25,
        duration: 0.9 + Math.random() * 0.8,
        size: 6 + Math.random() * 7,
        bg: palette[i % palette.length],
        round: Math.random() > 0.5,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/4 z-20 overflow-visible" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.bg,
            borderRadius: p.round ? '50%' : '2px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}
