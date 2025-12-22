import type { Project } from '../../../types/projects'
import { Card, type CardItem } from '../../shared'

interface ProjectCardProps {
  project: Project
  index: number
  isVisible: boolean
}

export function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const cardItem: CardItem = {
    id: project.id,
    title: project.title,
    description: project.description,
    year: project.year,
    type: project.type,
    techStack: project.techStack,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
  }

  return (
    <Card
      item={cardItem}
      index={index}
      isVisible={isVisible}
      variant="project"
    />
  )
}
