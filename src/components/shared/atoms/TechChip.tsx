interface TechChipProps {
  tech: string
  onHover?: (tech: string | null) => void
  onClick?: (tech: string) => void
}

export function TechChip({ tech, onHover, onClick }: TechChipProps) {
  return (
    <span
      onMouseEnter={() => onHover?.(tech)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onClick?.(tech)}
      className="px-0 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-stone-400 dark:text-stone-600 transition-all duration-300"
    >
      {tech}
    </span>
  )
}
