interface Props {
  tags?: string[]
  accent: string
}

/** 卡片角标，比如「谐音梗」「词根 · port=搬」 */
export function Tags({ tags, accent }: Props) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border px-2.5 py-1 text-xs font-medium"
          style={{ borderColor: `${accent}55`, color: accent, background: `${accent}14` }}
        >
          #{t}
        </span>
      ))}
    </div>
  )
}
