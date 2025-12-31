import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  type LucideIcon,
  Mail,
  Twitter,
} from 'lucide-react'

import { CardOverline, Flex } from '../../shared'
import type { ContactLink } from './types'

interface ContactLinkCardProps {
  link: ContactLink
  index: number
  isVisible: boolean
  onLinkClick?: (id: string, url: string) => void
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  globe: Globe,
}

export function ContactLinkCard({
  link,
  index,
  isVisible,
  onLinkClick,
}: ContactLinkCardProps) {
  const Icon = iconMap[link.icon] ?? Globe
  const resolvedIconKey = Object.prototype.hasOwnProperty.call(
    iconMap,
    link.icon,
  )
    ? link.icon
    : 'globe'

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${400 + index * 100}ms` }}
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (onLinkClick) {
            e.preventDefault()
            onLinkClick(link.id, link.url)
          }
        }}
        className="group relative block p-4 md:p-8 bg-white/20 dark:bg-black/20 border border-stone-200 dark:border-stone-800 hover:border-primary-500/50 dark:hover:border-primary-400/50 transition-all duration-500 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowUpRight className="w-5 h-5 text-primary-500 dark:text-primary-400" />
        </div>

        <Flex align="center" gap={6}>
          <div
            data-icon-name={resolvedIconKey}
            data-testid={`contact-link-icon-${link.id}`}
            className="p-4 bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-500"
          >
            <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <CardOverline className="mb-1 group-hover:text-primary-500/70 transition-colors duration-500">
              {link.platform}
            </CardOverline>
            <div
              className="text-xl font-medium text-stone-900 dark:text-stone-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-500 truncate"
              title={link.label}
            >
              {link.label}
            </div>
          </div>
        </Flex>

        <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-500 w-0 group-hover:w-full" />
      </a>
    </div>
  )
}
