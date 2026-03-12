interface SectionLabelProps {
  text: string
  className?: string
  showDot?: boolean
}

export default function SectionLabel({
  text,
  className = '',
  showDot = true,
}: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-body text-[11px] font-medium text-flame uppercase tracking-[0.24em] backdrop-blur-sm ${className}`}
    >
      {showDot && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-flame shrink-0" />
      )}
      {text}
    </div>
  )
}
