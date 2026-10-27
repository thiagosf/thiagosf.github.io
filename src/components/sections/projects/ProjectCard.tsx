import { ArrowUpRight } from 'lucide-react'

import type { Project } from '../../../types/projects'

export function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
  isVisible: boolean
}) {
  const artwork =
    project.id === 'proj-huhugames' ? 0 : project.id === 'proj-001' ? 1 : null
  return (
    <article
      className={`project-card ${index < 2 ? 'project-featured' : 'project-compact'}`}
    >
      {artwork !== null && (
        <a
          className={`project-art art-${artwork}`}
          href={project.demoUrl ?? project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Explore ${project.title}`}
        >
          <span className="art-label">
            {project.type} / {project.year}
          </span>
          {artwork === 0 ? (
            <div className="game-art" aria-hidden="true">
              <span className="pixel-spark">✳</span>
              <strong>
                huhu<span>games</span>
              </strong>
              <span className="game-orbit" />
            </div>
          ) : (
            <div className="gift-art" aria-hidden="true">
              <span className="gift-ribbon" />
              <strong>
                Quero
                <br />
                Presente<span>!</span>
              </strong>
              <span className="gift-star">✳</span>
            </div>
          )}
          <span className="art-footer">
            {artwork === 0
              ? 'A little discovery. A lot of play.'
              : 'Good things are better shared.'}
            <ArrowUpRight size={22} />
          </span>
        </a>
      )}
      <div className="project-info">
        <div className="project-meta">
          {project.year} — {project.type}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-bottom">
          <div className="project-tech">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech.toUpperCase()}</span>
            ))}
          </div>
          <div className="project-links">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Demo"
              >
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Source"
              >
                Source <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
