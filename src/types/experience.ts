export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  isCurrent: boolean
}

export interface ExperienceSectionProps {
  experiences: Experience[]
  onItemClick?: (id: string) => void
  onFilterTech?: (tech: string) => void
}
