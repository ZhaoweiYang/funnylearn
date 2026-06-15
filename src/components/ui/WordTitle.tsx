import { useSpeech } from '../../hooks/useSpeech'

interface Props {
  word: string
  phonetic: string
  pos: string
  accent: string
  /** 尺寸：feature = 超大主标题，inline = 中号 */
  size?: 'feature' | 'inline'
}

/** 单词标题：单词 + 音标 + 词性 + 点击朗读的小喇叭 */
export function WordTitle({ word, phonetic, pos, accent, size = 'feature' }: Props) {
  const { supported, speaking, speak } = useSpeech()

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-3">
        <h1
          className={
            size === 'feature'
              ? 'text-5xl font-black tracking-tight sm:text-6xl'
              : 'text-3xl font-black tracking-tight'
          }
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
        >
          {word}
        </h1>
        {supported && (
          <button
            type="button"
            aria-label={`朗读 ${word}`}
            onClick={() => speak(word)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl transition active:scale-90"
            style={{ color: accent, boxShadow: speaking ? `0 0 0 3px ${accent}55` : 'none' }}
          >
            <span className={speaking ? 'animate-pulse' : ''}>🔊</span>
          </button>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
        <span
          className="rounded-md px-1.5 py-0.5 font-semibold"
          style={{ background: `${accent}22`, color: accent }}
        >
          {pos}
        </span>
        <span className="font-mono tracking-wide">{phonetic}</span>
      </div>
    </div>
  )
}
