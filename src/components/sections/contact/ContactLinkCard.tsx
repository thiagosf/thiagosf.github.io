import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ContactLink } from './types'

const icons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  globe: Globe,
}
export function ContactLinkCard({
  link,
  onLinkClick,
}: {
  link: ContactLink
  index: number
  isVisible: boolean
  onLinkClick?: (id: string, url: string) => void
}) {
  const key = Object.prototype.hasOwnProperty.call(icons, link.icon)
    ? link.icon
    : 'globe'
  const Icon = icons[key]
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link"
      onClick={(event) => {
        if (onLinkClick) {
          event.preventDefault()
          onLinkClick(link.id, link.url)
        }
      }}
    >
      <span data-icon-name={key} data-testid={`contact-link-icon-${link.id}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <span>
        {link.platform}
        <span className="contact-address">{link.label}</span>
      </span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}
