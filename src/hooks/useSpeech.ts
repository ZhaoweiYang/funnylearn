import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 用浏览器自带的 Web Speech API 朗读英文单词 / 例句。
 * 完全本地、免费、无需联网，是「听发音」功能的实现。
 */
export function useSpeech() {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window
  const [speaking, setSpeaking] = useState(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  // 挑一个英文(美音优先)的嗓音
  useEffect(() => {
    if (!supported) return
    const pick = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return
      voiceRef.current =
        voices.find((v) => /en[-_]US/i.test(v.lang)) ??
        voices.find((v) => /^en/i.test(v.lang)) ??
        voices[0]
    }
    pick()
    window.speechSynthesis.onvoiceschanged = pick
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [supported])

  const speak = useCallback(
    (text: string, opts?: { rate?: number }) => {
      if (!supported || !text) return
      try {
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.lang = voiceRef.current?.lang ?? 'en-US'
        if (voiceRef.current) u.voice = voiceRef.current
        u.rate = opts?.rate ?? 0.92
        u.pitch = 1
        u.onstart = () => setSpeaking(true)
        u.onend = () => setSpeaking(false)
        u.onerror = () => setSpeaking(false)
        window.speechSynthesis.speak(u)
      } catch {
        setSpeaking(false)
      }
    },
    [supported],
  )

  return { supported, speaking, speak }
}
