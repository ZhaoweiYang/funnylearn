import { useEffect, useRef, useState } from 'react'

const WIDGET_JS = 'https://youglish.com/public/emb/widget.js'

/**
 * 嵌入 YouGlish 的「真实影视/真人用法」播放器。
 *
 * 思路:
 * - 默认收起,点一下才加载(省流量、一屏只开一个)。
 * - 用 YouGlish 官方的声明式 widget(`.youglish-widget` 锚点 + widget.js):
 *   脚本会把锚点替换成内嵌播放器。为了让动态插入的锚点也被转换,每次展开时
 *   追加一个新的 widget.js <script> 触发重新扫描。
 * - 无论嵌入是否成功,都提供一个一定可用的深链按钮(在 YouGlish 打开该词)。
 *
 * 注意: 影视画面版权归原平台, 这里是嵌入 YouTube(由 YouGlish/YouTube 处理版权),
 * 不在本站存储任何视频。
 */
export function YouglishPlayer({
  word,
  accent,
  active,
}: {
  word: string
  accent: string
  active: boolean
}) {
  const [open, setOpen] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)

  // 离开这张卡时收起,释放 YouTube iframe
  useEffect(() => {
    if (!active) setOpen(false)
  }, [active])

  // 展开后加载 / 重新扫描 widget 脚本
  useEffect(() => {
    if (!open) return
    const s = document.createElement('script')
    s.src = WIDGET_JS
    s.async = true
    document.body.appendChild(s)
    return () => {
      s.remove()
    }
  }, [open, word])

  const deepLink = `https://youglish.com/pronounce/${encodeURIComponent(word)}/english`

  return (
    <div className="w-full max-w-sm">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition active:scale-[0.99]"
          style={{ borderColor: accent, color: accent, background: `${accent}14` }}
        >
          ▶ 看真人 / 影视里怎么用「{word}」
        </button>
      ) : (
        <div
          ref={hostRef}
          className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
        >
          {/* YouGlish 官方声明式 widget 锚点 */}
          <a
            className="youglish-widget"
            data-query={word}
            data-lang="english"
            data-zones="us,uk"
            data-components="9415"
            data-bkg-color="dark"
            data-auto-start="true"
            rel="nofollow"
            href={deepLink}
            style={{ display: 'block', minHeight: 220, color: '#9aa', padding: 16, textAlign: 'center' }}
          >
            正在加载真实影视片段…若未显示,请点下方按钮在 YouGlish 打开。
          </a>
        </div>
      )}

      <a
        href={deepLink}
        target="_blank"
        rel="noreferrer"
        className="mt-2 block text-center text-xs text-white/50 underline-offset-2 hover:underline"
      >
        在 YouGlish 打开「{word}」的真实视频用例 ↗
      </a>
    </div>
  )
}
