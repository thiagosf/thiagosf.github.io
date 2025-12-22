// =============================================================================
// Data Models
// =============================================================================

export interface Experience {
  /** Unique identifier for the experience record */
  id: string
  /** The professional title or role held */
  role: string
  /** The name of the organization or company */
  company: string
  /** Physical location or 'Remote' */
  location: string
  /** The timeframe of the role (e.g., 'Jan 2022 — Present') */
  period: string
  /** Detailed description of responsibilities and achievements */
  description: string
  /** List of primary technologies and tools used */
  technologies: string[]
  /** Whether this is your current position */
  isCurrent: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface ExperienceSectionProps {
  /** The list of professional experiences to display */
  experiences: Experience[]
  /** Called when a user interacts with a specific experience item for more details */
  onItemClick?: (id: string) => void
  /** Called when a user filters experiences by technology */
  onFilterTech?: (tech: string) => void
}
