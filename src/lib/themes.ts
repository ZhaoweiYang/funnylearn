import type { AccentTheme } from '../types'

/**
 * 每个主题给一张卡片提供：背景渐变 + 高亮文字色 + 柔光色。
 * 颜色统一走暗色调（贴近 TikTok 的沉浸式黑底氛围）。
 */
export interface Theme {
  /** 整张卡的背景渐变 */
  background: string
  /** 主高亮色（按钮、关键词） */
  accent: string
  /** 顶部柔光的颜色（用作 radial-gradient 光晕） */
  glow: string
}

export const THEMES: Record<AccentTheme, Theme> = {
  sunset: {
    background: 'linear-gradient(160deg, #2a1020 0%, #15060f 60%, #0b0b12 100%)',
    accent: '#ff7a59',
    glow: 'rgba(255, 122, 89, 0.35)',
  },
  ocean: {
    background: 'linear-gradient(160deg, #07223a 0%, #0a1430 60%, #0b0b12 100%)',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.32)',
  },
  grape: {
    background: 'linear-gradient(160deg, #2a123f 0%, #170a2b 60%, #0b0b12 100%)',
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.32)',
  },
  forest: {
    background: 'linear-gradient(160deg, #0c2a1f 0%, #08160f 60%, #0b0b12 100%)',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.3)',
  },
  candy: {
    background: 'linear-gradient(160deg, #3a0f2a 0%, #200a22 60%, #0b0b12 100%)',
    accent: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.32)',
  },
  gold: {
    background: 'linear-gradient(160deg, #332208 0%, #1c1305 60%, #0b0b12 100%)',
    accent: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.32)',
  },
  mono: {
    background: 'linear-gradient(160deg, #1c1c26 0%, #121219 60%, #0b0b12 100%)',
    accent: '#a5b4fc',
    glow: 'rgba(165, 180, 252, 0.28)',
  },
}

export function getTheme(accent?: AccentTheme): Theme {
  return THEMES[accent ?? 'mono']
}
