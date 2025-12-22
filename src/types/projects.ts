export interface Project {
    id: string
    title: string
    description: string
    year: string
    type: string
    techStack: string[]
    previewUrl: string
    demoUrl?: string
    githubUrl?: string
}

export interface ProjectsSectionProps {
    projects: Project[]
    onViewDetails?: (id: string) => void
}
