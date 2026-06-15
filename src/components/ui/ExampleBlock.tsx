import type { Example } from '../../types'
import { useSpeech } from '../../hooks/useSpeech'

interface Props {
  example: Example
  accent: string
}

/** 例句区：英文 + 中文，点一下读出整句 */
export function ExampleBlock({ example, accent }: Props) {
  const { supported, speak } = useSpeech()

  return (
    <button
      type="button"
      onClick={() => supported && speak(example.en)}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition active:scale-[0.99]"
    >
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
        <span>例句</span>
        {supported && <span className="text-white/40">· 点击朗读 🔊</span>}
      </div>
      <p className="text-[15px] font-medium leading-snug text-white">{example.en}</p>
      <p className="mt-1 text-sm text-white/60">{example.zh}</p>
    </button>
  )
}
