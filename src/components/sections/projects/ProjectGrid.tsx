import type { Project } from '../../../types/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid({
  projects,
  isVisible,
}: {
  projects: Project[]
  isVisible: boolean
}) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}
