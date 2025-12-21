// =============================================================================
// Data Types
// =============================================================================

/**
 * Represents a single side project or technical experiment.
 */
export interface Project {
    /** Unique identifier for the project */
    id: string
    /** The name of the project */
    title: string
    /** A concise explanation of what the project does */
    description: string
    /** The year of development (e.g., "2024") */
    year: string
    /** Category of the project (e.g., "Full-stack App", "Creative Tool") */
    type: string
    /** List of primary technologies used */
    techStack: string[]
    /** Path to a preview image or video */
    previewUrl: string
    /** Link to the live application */
    demoUrl?: string
    /** Link to the source code */
    githubUrl?: string
}

// =============================================================================
// Component Props
// =============================================================================

/**
 * Props for the Projects Section component.
 */
export interface ProjectsSectionProps {
    /** The list of projects to display in the showcase */
    projects: Project[]
    /** Called when user clicks to view project details */
    onViewDetails?: (id: string) => void
    /** Called when user clicks the demo link */
    onDemoClick?: (id: string) => void
    /** Called when user clicks the GitHub source link */
    onSourceClick?: (id: string) => void
}
