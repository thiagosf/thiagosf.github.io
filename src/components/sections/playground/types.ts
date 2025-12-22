/**
 * Represents a single code experiment or repository in the playground.
 */
export interface PlaygroundItem {
    /** Unique identifier for the item */
    id: string
    /** The name of the repository or experiment */
    title: string
    /** A concise explanation of the experiment */
    description: string
    /** The year or date of the experiment */
    year: string
    /** Category (e.g., "Library", "Demo", "Utility") */
    type: string
    /** List of primary technologies used */
    techStack: string[]
    /** Link to the source code on GitHub */
    githubUrl?: string
    /** Optional link to a live demo or documentation */
    demoUrl?: string
    /** Number of stars if applicable */
    stars?: number
    /** Primary programming language */
    language?: string
}

/**
 * Props for the Playground Section component.
 */
export interface PlaygroundSectionProps {
    items: PlaygroundItem[]
}
