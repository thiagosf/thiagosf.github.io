import type { Project } from '../../../types/projects'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
    projects: Project[]
    isVisible: boolean
    onDemoClick?: (id: string) => void
    onSourceClick?: (id: string) => void
}

export function ProjectGrid({
    projects,
    isVisible,
    onDemoClick,
    onSourceClick
}: ProjectGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isVisible={isVisible}
                    onDemoClick={onDemoClick}
                    onSourceClick={onSourceClick}
                />
            ))}
        </div>
    )
}
