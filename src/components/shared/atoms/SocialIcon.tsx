import { type ComponentType } from 'react'

interface SocialIconProps {
  href: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
}

export function SocialIcon({
  href,
  icon: Icon,
  label,
}: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-none border border-white/20 text-stone-400 bg-white/20 dark:bg-black/20 dark:border-stone-800 hover:border-primary-500/70 hover:text-primary-500 transition-all duration-500 overflow-hidden"
    >
      <Icon size={20} strokeWidth={1.5} />
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-500 w-0 group-hover:w-full" />
    </a>
  )
}
