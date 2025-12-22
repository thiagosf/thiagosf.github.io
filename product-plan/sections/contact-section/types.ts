// =============================================================================
// Data Types
// =============================================================================

export interface ContactLink {
  /** Unique identifier for the contact link */
  id: string
  /** The name of the platform or channel (e.g., 'GitHub', 'Email') */
  platform: string
  /** The display label for the link (e.g., 'github.com/thiago') */
  label: string
  /** The destination URL (e.g., 'https://github.com/thiago' or 'mailto:...') */
  url: string
  /** The identifier for the icon to display */
  icon: "github" | "linkedin" | "twitter" | "mail" | "globe"
  /** Categorization of the link */
  type: "social" | "contact" | "other"
}

// =============================================================================
// Component Props
// =============================================================================

export interface ContactSectionProps {
  /** The list of contact and social links to display */
  contactLinks: ContactLink[]
  /** Called when a user clicks on a contact link */
  onLinkClick?: (id: string, url: string) => void
}
