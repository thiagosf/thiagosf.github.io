import type { ProjectsSectionProps } from '../../../types/projects'
import { ProjectGrid } from './ProjectGrid'

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="projects-section page-width">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Selected work</p>
          <h2>Ideas, shipped.</h2>
        </div>
        <p>
          Personal projects, useful tools, and things
          <br />I wanted to see in the world.
        </p>
      </div>
      {projects?.length ? (
        <ProjectGrid projects={projects} isVisible />
      ) : (
        <p>No projects to display at the moment.</p>
      )}
    </section>
  )
}
