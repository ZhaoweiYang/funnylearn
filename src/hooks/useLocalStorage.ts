import { useCallback, useEffect, useState } from 'react'

/**
 * 把一段状态同步到 localStorage，用于点赞/收藏/已学计数这类需要刷新后还在的数据。
 * 多个组件用同一个 key 时，通过 storage 事件保持同步。
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw != null ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 隐私模式 / 配额满 —— 忽略即可，不影响使用
    }
  }, [key, value])

  // 跨标签页 / 跨组件同步
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key || e.newValue == null) return
      try {
        setValue(JSON.parse(e.newValue) as T)
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue] as const
}

/**
 * 基于 useLocalStorage 的「字符串集合」，方便做收藏/点赞这类 toggle。
 */
export function useStringSet(key: string) {
  const [list, setList] = useLocalStorage<string[]>(key, [])
  const set = new Set(list)

  const has = useCallback((id: string) => set.has(id), [list]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(
    (id: string) => {
      setList((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return [...next]
      })
    },
    [setList],
  )

  const add = useCallback(
    (id: string) => {
      setList((prev) => (prev.includes(id) ? prev : [...prev, id]))
    },
    [setList],
  )

  return { list, count: list.length, has, toggle, add }
}
