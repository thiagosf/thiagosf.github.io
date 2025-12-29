import { Grid } from '../../shared'
import type { Project } from '../../../types/projects'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  isVisible: boolean
}

export function ProjectGrid({ projects, isVisible }: ProjectGridProps) {
  return (
    <Grid cols={3} gap={8}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </Grid>
  )
}
